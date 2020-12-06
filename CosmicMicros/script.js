const WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight;

let renderer, scene, camera, stats;

//let raycaster, vector;

let controls;

let earthMesh, uniforms;

var sphereGeometry;

var shouldExplode = false;
var getCloser = false;
var getFurther = true;
var getFurtherForever = false;
var showMirror = false;
var pauseAnimation = false;

var furtherCounter = 0;
var mirrorCounter = 0;
var explodeCounter = 0;

// Text
var textElement = document.getElementById("microtext");

// Earth params
var radius = 5,
    segments = 32,
    rotation = 6;

let verticalMirror;
var textureLoader = new THREE.TextureLoader();

// Zoom out of earth
var text = {
    "AllIEverWanted": {
        "title": "All I Ever Wanted",
        "text": "<p>Because I only ever wanted to be an astronaut, I never cared much for Earth. My head was always in the sky.</p><p>When I finally reached space and looked back at my planet, the urban landscapes looked like constellations.</p><p>Now, as I drift further into the stars, all I want is to be in amongst those city lights.</p>"
    },
    "BigScreen": {
        "text": "<p>I reached the edge of the universe, where there was a mirrored wall.</p><p>I'm not one to reflect on my achievements, so I climbed over.</p><p>Turned out the mirror was one of those two-way ones, like a window from the other side.</p><p>In front of it was a row of aliens, eating popcorn.</p>",
        "title": "Big Screen"
    },
    "BuildingBack": {
        "text": "<p>When I returned from deep space, the globe had shattered into a million pieces.</p><p>Now I circle the Sun, gathering the fragments.</p><p>When I have enough, I will make a mosaic of Earth on the Moon.</p>",
        "title": "Building Back"
    }
};

function addText(key) {
    textElement.innerHTML = text[key]["text"];
    // var text2 = document.createElement('div');
    // text2.id = key;
    // text2.style.position = 'absolute';
    // //text2.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
    // text2.style.width = 50;
    // text2.style.height = 100;
    // //text2.style.backgroundColor = "blue";
    // text2.style.color = "white";
    // text2.innerHTML = text[key]["text"];
    // text2.style.top = top + 'px';
    // text2.style.left = left + 'px';
    // text2.className = "cosmic-micro";
    // document.body.appendChild(text2);
}

function showElement(divID) {
    let micros = document.getElementsByClassName("cosmic-micro");
    for (let i = 0; i < micros.length; i++) {
        micros[i].style.visibility = "none";
    }
    document.getElementById(divID).style.visibility = "visible";
}

function init() {

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 1, 1000);
    camera.position.set(0, 0, 0);
    camera.position.setLength(50);
    //camera.position.z = 1.5;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(WIDTH, HEIGHT);

    scene.add(new THREE.AmbientLight(0x333333));

    var light = new THREE.DirectionalLight(0xffffff, 0.5);
    light.position.set(5, 3, 5);
    scene.add(light);

    let mainLight = new THREE.PointLight(0xffffff, 1.5, 250);
    mainLight.position.y = 60;
    scene.add(mainLight);

    textureLoader.load('images/fair_clouds_4k.png', function(clouds) {
        let cloudMesh = new THREE.Mesh(
            new THREE.SphereGeometry(radius + 0.003, segments, segments),
            new THREE.MeshPhongMaterial({
                map: clouds,
                transparent: true
            })
        );
        cloudMesh.rotation.y = rotation;
        scene.add(cloudMesh);
    });

    textureLoader.load('images/galaxy_starfield.png', function(stars) {
        let starMesh = new THREE.Mesh(
            new THREE.SphereGeometry(90 + 0.003, 64, 64),
            new THREE.MeshPhongMaterial({
                map: stars,
                side: THREE.BackSide
            })
        );
        scene.add(starMesh);
    });

    // Prepare for explode
    sphereGeometry = new THREE.SphereGeometry(radius, segments, segments);
    const tessellateModifier = new THREE.TessellateModifier(8, 6);
    sphereGeometry = tessellateModifier.modify(sphereGeometry);
    sphereGeometry.verticesNeedUpdate = true;
    createMirror();

    textureLoader.load('images/2_no_clouds_4k.jpg', function(clouds) {
        textureLoader.load('images/elev_bump_4k.jpg', function(elev_bump) {
            textureLoader.load('images/water_4k.png', function(water) {
                earthMesh = new THREE.Mesh(
                    sphereGeometry,
                    new THREE.MeshPhongMaterial({
                        map: clouds,
                        bumpMap: elev_bump,
                        bumpScale: 0.005,
                        specularMap: water,
                        specular: new THREE.Color('grey')
                    })
                );

                scene.add(earthMesh);

                renderer = new THREE.WebGLRenderer({ antialias: true });
                renderer.setPixelRatio(window.devicePixelRatio);
                renderer.setSize(WIDTH, HEIGHT);

                const container = document.getElementById('container');
                container.appendChild(renderer.domElement);
                controls = new THREE.TrackballControls(camera, renderer.domElement);

                animate();

                addText("AllIEverWanted");
            });
        });
    });

    window.addEventListener('resize', onWindowResize, false);

}

function createVector(x, y, z, camera = camera, width = WIDTH, height = HEIGHT) {
    var p = new THREE.Vector3(x, y, z);
    var vector = p.project(camera);

    vector.x = (vector.x + 1) / 2 * width;
    vector.y = -(vector.y - 1) / 2 * height;

    return vector;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function createMirror() {
    // reflectors/mirrors
    let geometry = new THREE.PlaneBufferGeometry(100, 100);
    verticalMirror = new THREE.Reflector(geometry, {
        clipBias: 0.003,
        textureWidth: WIDTH * window.devicePixelRatio,
        textureHeight: HEIGHT * window.devicePixelRatio,
        color: 0x889999
    });
    verticalMirror.position.y = 0;
    verticalMirror.position.z = -70;
    scene.add(verticalMirror);
}

function animate() {
    //console.debug("Camera diff from earth: x: " + Math.abs(camera.position.x - earthMesh.position.x) + ", y: " + Math.abs(camera.position.y - earthMesh.position.y) + ", z: " + Math.abs(camera.position.z - earthMesh.position.z));
    //console.debug("Camera: ");
    //console.debug(camera.position);
    // Camera diffs
    var yDistanceDiff = Math.abs(camera.position.y - earthMesh.position.y);
    if (pauseAnimation) {
        console.debug("pausing animation");
    } else if (shouldExplode) {
        explodeCounter += 1;
        console.debug("explode");
        for (var i = 0; i < sphereGeometry.vertices.length - 3; i += 2) {
            var rand = Math.random() > 0.5 ? 1 : -1;
            sphereGeometry.vertices[i].x += rand * 0.00005;
            sphereGeometry.vertices[i].y += rand * 0.0005;
            sphereGeometry.vertices[i].z += rand * 0.000005;
            sphereGeometry.verticesNeedUpdate = true;
            var A = sphereGeometry.vertices[i + 0]
            var B = sphereGeometry.vertices[i + 1]
            var C = sphereGeometry.vertices[i + 2]

            var scale = 1 + Math.random() * 0.05;
            A.multiplyScalar(scale);
            B.multiplyScalar(scale);
            C.multiplyScalar(scale);
        }
        earthMesh.position.x += 0.2;
        if (explodeCounter > 400) {
            getCloser = true;
            explodeCounter = 0;
            shouldExplode = false;
        }
    } else if (getCloser) {
        if (camera.position.y > earthMesh.position.y) {
            camera.position.y -= 0.2;
        } else {
            camera.position.y += 0.2;
        }
        console.debug("Closer");
        if (yDistanceDiff < 1) {
            console.debug("Too close to earth! Reverse direction");
            getCloser = false;
            getFurther = true;
            getFurtherForever = true;
        }
    } else if (getFurther || getFurtherForever) {
        console.debug("Further");
        furtherCounter += 1;
        if (camera.position.y > earthMesh.position.y) {
            camera.position.y += 0.2;
        } else {
            camera.position.y -= 0.2;
        }
        if ((yDistanceDiff > 200 && furtherCounter > 600) && !getFurtherForever) {
            console.debug("Too far from earth! Add mirror");
            getCloser = false;
            getFurther = false;
            showMirror = true;
            furtherCounter = 0;
            addText("BigScreen");
        }
    } else if (showMirror) {
        mirrorCounter += 1;
        rotateAboutPoint(camera, earthMesh.position, new THREE.Vector3(1, 0, 0), THREE.Math.degToRad(-0.1));
        //camera.position.y += 0.5;
        //verticalMirror.position.y += 0.1;
        //y = 100, z = -20, x = 0
        if (mirrorCounter > 1000) {
            console.debug("Explode the earth");
            showMirror = false;
            shouldExplode = true;
            addText("BuildingBack");
            mirrorCounter = 0;
        }
    } else {

    }
    camera.updateProjectionMatrix();
    //earthMesh.rotation.y += 0.005;
    requestAnimationFrame(animate);
    render();
}

function rotateAboutPoint(obj, point, axis, theta, pointIsWorld) {
    pointIsWorld = (pointIsWorld === undefined) ? false : pointIsWorld;

    if (pointIsWorld) {
        obj.parent.localToWorld(obj.position); // compensate for world coordinate
    }

    obj.position.sub(point); // remove the offset
    obj.position.applyAxisAngle(axis, theta); // rotate the POSITION
    obj.position.add(point); // re-add the offset

    if (pointIsWorld) {
        obj.parent.worldToLocal(obj.position); // undo world coordinates compensation
    }

    obj.rotateOnAxis(axis, theta); // rotate the OBJECT
}

function render() {
    controls.update();
    renderer.render(scene, camera);
}

var pauseButton = document.getElementById("pause");
pauseButton.onclick = function() {
    pauseAnimation = !pauseAnimation;
    if (pauseAnimation) {
        pauseButton.innerHTML = "Resume";
    } else {
        pauseButton.innerHTML = "Pause";
    }
}

init();
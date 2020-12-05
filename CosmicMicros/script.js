const WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight;

let renderer, scene, camera, stats;

let controls;

let mesh, uniforms;

var sphereGeometry;

// Earth params
var radius = 5,
    segments = 32,
    rotation = 6;

var textureLoader = new THREE.TextureLoader();

// TODO: fix loading texture for clouds & stars
function createClouds(radius, segments) {
    return new THREE.Mesh(
        new THREE.SphereGeometry(radius + 0.003, segments, segments),
        new THREE.MeshPhongMaterial({
            map: textureLoader.load('images/fair_clouds_4k.png'),
            transparent: true
        })
    );
}

function createStars(radius, segments) {
    return new THREE.Mesh(
        new THREE.SphereGeometry(radius, segments, segments),
        new THREE.MeshBasicMaterial({
            map: textureLoader.load('images/galaxy_starfield.png'),
            side: THREE.BackSide
        })
    );
}

function init() {

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    console.debug("background set: " + scene.background);

    camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 1, 1000);
    camera.position.set(-100, 100, 0);
    //camera.position.z = 1.5;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(WIDTH, HEIGHT);

    scene.add(new THREE.AmbientLight(0x333333));

    var light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 3, 5);
    scene.add(light);

    textureLoader.load('images/fair_clouds_4k.png', function(clouds) {
        let cloudMesh = new THREE.Mesh(
            new THREE.SphereGeometry(radius + 0.003, segments, segments),
            new THREE.MeshPhongMaterial({
                map: clouds,
                transparent: true
            })
        );
        cloudMesh.rotation.y = rotation;
        console.debug("Add clouds");
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
        console.debug("Add stars");
        scene.add(starMesh);
    });


    // var stars = createStars(90, 64);
    // scene.add(stars);


    //
    var sphereGeometry = new THREE.SphereGeometry(radius, segments, segments);

    console.debug(sphereGeometry);


    textureLoader.load('images/2_no_clouds_4k.jpg', function(clouds) {
        textureLoader.load('images/elev_bump_4k.jpg', function(elev_bump) {
            textureLoader.load('images/water_4k.png', function(water) {
                mesh = new THREE.Mesh(
                    sphereGeometry,
                    new THREE.MeshPhongMaterial({
                        map: clouds,
                        bumpMap: elev_bump,
                        bumpScale: 0.005,
                        specularMap: water,
                        specular: new THREE.Color('grey')
                    })
                );


                console.debug(mesh);
                scene.add(mesh);

                renderer = new THREE.WebGLRenderer({ antialias: true });
                renderer.setPixelRatio(window.devicePixelRatio);
                renderer.setSize(WIDTH, HEIGHT);

                const container = document.getElementById('container');
                container.appendChild(renderer.domElement);
                controls = new THREE.TrackballControls(camera, renderer.domElement);

                animate();
            });
        });
    });

    // window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {

    requestAnimationFrame(animate);

    render();

}

function render() {

    const time = Date.now() * 0.001;

    //uniforms.amplitude.value = 1.0 + Math.sin(time * 0.5);

    controls.update();

    renderer.render(scene, camera);

}

init();
//render();
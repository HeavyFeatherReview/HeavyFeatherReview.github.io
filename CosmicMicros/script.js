const WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight;

let renderer, scene, camera, stats;

let controls;

let mesh, uniforms;

var sphereGeometry;

// Earth params
var radius = 0.5,
    segments = 32,
    rotation = 6;

function createClouds(radius, segments) {
    return new THREE.Mesh(
        new THREE.SphereGeometry(radius + 0.003, segments, segments),
        new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('images/fair_clouds_4k.png'),
            transparent: true
        })
    );
}

function createStars(radius, segments) {
    return new THREE.Mesh(
        new THREE.SphereGeometry(radius, segments, segments),
        new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture('images/galaxy_starfield.png'),
            side: THREE.BackSide
        })
    );
}

function init() {

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.01, 1000);
    //camera.position.z = 1.5;
    camera.position.set(-100, 100, 200);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(WIDTH, HEIGHT);

    scene.add(new THREE.AmbientLight(0x333333));

    var clouds = createClouds(radius, segments);
    clouds.rotation.y = rotation;
    scene.add(clouds)

    var stars = createStars(90, 64);
    scene.add(stars);


    //
    var sphereGeometry = new THREE.SphereGeometry(radius, segments, segments);
    let geometry = sphereGeometry;
    // geometry.center();
    const tessellateModifier = new THREE.TessellateModifier(8, 6);
    geometry = tessellateModifier.modify(geometry);

    //

    geometry = new THREE.BufferGeometry().fromGeometry(geometry);

    const numFaces = geometry.attributes.position.count / 3;

    const colors = new Float32Array(numFaces * 3 * 3);
    const displacement = new Float32Array(numFaces * 3 * 3);

    const color = new THREE.Color();

    for (let f = 0; f < numFaces; f++) {

        const index = 9 * f;

        const h = 0.2 * Math.random();
        const s = 0.5 + 0.5 * Math.random();
        const l = 0.5 + 0.5 * Math.random();

        color.setHSL(h, s, l);

        const d = 10 * (0.5 - Math.random());

        for (let i = 0; i < 3; i++) {

            colors[index + (3 * i)] = color.r;
            colors[index + (3 * i) + 1] = color.g;
            colors[index + (3 * i) + 2] = color.b;

            displacement[index + (3 * i)] = d;
            displacement[index + (3 * i) + 1] = d;
            displacement[index + (3 * i) + 2] = d;
        }
    }

    geometry.setAttribute('customColor', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('displacement', new THREE.BufferAttribute(displacement, 3));

    //

    // uniforms = {

    //     amplitude: { value: 0.0 }

    // };

    // const shaderMaterial = new THREE.ShaderMaterial({

    //     uniforms: uniforms,
    //     vertexShader: document.getElementById('vertexshader').textContent,
    //     fragmentShader: document.getElementById('fragmentshader').textContent

    // });

    mesh = new THREE.Mesh(
        sphereGeometry,
        new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('images/2_no_clouds_4k.jpg'),
            bumpMap: THREE.ImageUtils.loadTexture('images/elev_bump_4k.jpg'),
            bumpScale: 0.005,
            specularMap: THREE.ImageUtils.loadTexture('images/water_4k.png'),
            specular: new THREE.Color('grey')
        })
    );

    scene.add(mesh);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(WIDTH, HEIGHT);

    const container = document.getElementById('container');
    container.appendChild(renderer.domElement);

    controls = new THREE.TrackballControls(camera, renderer.domElement);

    // stats = new Stats();
    // container.appendChild(stats.dom);

    //

    window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {

    requestAnimationFrame(animate);

    render();

    stats.update();

}

function render() {

    const time = Date.now() * 0.001;

    //uniforms.amplitude.value = 1.0 + Math.sin(time * 0.5);

    controls.update();

    renderer.render(scene, camera);

}

init();
render();
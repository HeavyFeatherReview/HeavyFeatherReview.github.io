var currentlyHoveredID = null;
var debugMode = true;
var numTimes = 0;

// Rain snakes variables
var c;
var ctx;
var w;
var h;
var clearColor = 'rgba(0, 0, 0, .1)';
var max = 30;
var drops = [];

// Void variables
var vertexHeight = 125000;
var planeDefinition = 20;
var planeSize = 1245000;
var totalObjects = 500;

// Three.js variables
var camera;
var renderer;
var scene;
var center;
var ww = window.innerWidth;
var wh = window.innerHeight;

// Feathers
var featherCamera;
var featherAmount = 400;
var feathers;
var featherTexture,
    mouse = {
        x: -0.007
    };
var position = 0;

// Water
var pointer;
var canvas;

var animationReq;

$("p, div").hover(function() {
        // Mouse enters
        currentlyHoveredID = this.id;
        var className = this.className;
        console.log("Hovered over: " + this.id + className);
        if (currentlyHoveredID == "eggs") {
            cancelAnimations(this);
            createEgg();
        } else if (currentlyHoveredID == "rainsnakes") {
            cancelAnimations(this);
            rain();
        } else if (currentlyHoveredID == "void") {
            cancelAnimations(this);
            createVoid();
        } else if (currentlyHoveredID == "feathers" || currentlyHoveredID == "death") {
            cancelAnimations(this);
            createFeathers();
        }
        else if (currentlyHoveredID == "water"){
            cancelAnimations(this);
            createWater();
        }
        else
        {
            console.log("Unsupported thing hovered, keep doing what we were doing");
            return;
        }
        $(this).css("font-weight", "bold");
    },
    function() {
        // if (debugMode)
        // {
        //     return;
        // }
        // Mouse leaves
        $(this).css("font-weight", "normal");
    });

function cancelAnimations(element) {
    let id = element.id;
    console.log("Cancel for " + id);
    $(".removable").remove();

    // Cancel any animation
    if (animationReq)
        window.cancelAnimationFrame(animationReq);

    if (id == "rainsnakes") {
        window.removeEventListener("resize", resize);
    } else if (id == "feathers" || id == "death") {
        window.removeEventListener("resize", onWindowResize);
        window.removeEventListener("mousemove", onMouseMove);
    }
}

// Egg
function createEgg() {
    $("#eggs").append('<div class = "removable" id="egg">' +
        '<div id="eyeCont">' +
        '<div class="eye a"></div>' +
        '<div class="eye b"></div>' +
        '</div>' +
        '<div id="mouthCont">' +
        '<div class="timido left"></div>' +
        '<div id="mouth" ></div>' +
        '<div class="timido right"></div>' +
        '</div>' +
        '</div>');

    setTimeout(() => {
        console.log("Timed out, hover over eggs")
        $("#egg").addClass("hover");

        setTimeout(() => {
            $("#egg").removeClass("hover");
        }, 2000);
    }, 500);

    $("#egg").mouseleave(function() {
        $("#egg").removeClass("hover");
    });
}


// Crazy rain
function rain() {
    $("body").css("background-color", "black");
    $("#rainsnakes").append('<canvas class = "removable" id="canvas-rain"></canvas>');
    c = document.getElementById("canvas-rain");
    ctx = c.getContext("2d");
    w = c.width = document.body.clientWidth;
    h = c.height = document.body.clientHeight;
    clearColor = 'rgba(0, 0, 0, .1)';
    max = 30;
    drops = [];

    window.addEventListener("resize", resize);
    setup();
    anim();
}

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function O() {}

O.prototype = {
    init: function() {
        this.x = random(0, w);
        this.y = 0;
        this.color = 'hsl(180, 100%, 50%)';
        this.w = 2;
        this.h = 1;
        this.vy = random(4, 5);
        this.vw = 3;
        this.vh = 1;
        this.size = 2;
        this.hit = random(h * .8, h * .9);
        this.a = 1;
        this.va = .96;
    },
    draw: function() {
        if (this.y > this.hit) {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y - this.h / 2);

            ctx.bezierCurveTo(
                this.x + this.w / 2, this.y - this.h / 2,
                this.x + this.w / 2, this.y + this.h / 2,
                this.x, this.y + this.h / 2);

            ctx.bezierCurveTo(
                this.x - this.w / 2, this.y + this.h / 2,
                this.x - this.w / 2, this.y - this.h / 2,
                this.x, this.y - this.h / 2);

            ctx.strokeStyle = 'hsla(180, 100%, 50%, ' + this.a + ')';
            ctx.stroke();
            ctx.closePath();

        } else {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.size, this.size * 5);
        }
        this.update();
    },
    update: function() {
        if (this.y < this.hit) {
            this.y += this.vy;
        } else {
            if (this.a > .03) {
                this.w += this.vw;
                this.h += this.vh;
                if (this.w > 100) {
                    this.a *= this.va;
                    this.vw *= .98;
                    this.vh *= .98;
                }
            } else {
                this.init();
            }
        }

    }
}

function resize() {
    w = c.width = window.innerWidth;
    h = c.height = window.innerHeight;
}

function setup() {
    for (var i = 0; i < max; i++) {
        (function(j) {
            setTimeout(function() {
                var o = new O();
                o.init();
                drops.push(o);
            }, j * 400)
        }(i));
    }
}

function anim() {
    ctx.fillStyle = clearColor;
    ctx.fillRect(0, 0, w, h);
    for (var i in drops) {
        drops[i].draw();
    }
    animationReq = requestAnimationFrame(anim);
}

// Void
function createVoid() {
    $("body").css("background-color", "black");
    $("#void").append("<div class='removable' id='caveVoid'></div>");
    var container = document.getElementById("caveVoid");

    camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 2500000)
    camera.position.z = 670000;
    camera.position.y = 10000;
    camera.lookAt(new THREE.Vector3(0, 6000, 0));


    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 100000, 400000);


    var plane = new THREE.Mesh(new THREE.PlaneGeometry(planeSize, planeSize, planeDefinition, planeDefinition), new THREE.MeshBasicMaterial({ color: 0x555555, wireframe: false }));
    plane.rotation.x -= Math.PI * 1.5;
    plane.position.y = 20000;
    scene.add(plane);

    var plane2 = new THREE.Mesh(new THREE.PlaneGeometry(planeSize, planeSize, planeDefinition, planeDefinition), new THREE.MeshBasicMaterial({ color: 0x555555, wireframe: false }));
    plane2.rotation.x -= Math.PI * .5;
    //plane2.position.z = 100000;
    scene.add(plane2);

    var geometry = new THREE.Geometry();

    for (i = 0; i < totalObjects; i++) {
        var vertex = new THREE.Vector3();
        vertex.x = Math.random() * planeSize - (planeSize * .5);
        vertex.y = (Math.random() * 100000) - 10000;
        vertex.z = Math.random() * planeSize - (planeSize * .5);
        geometry.vertices.push(vertex);
    }

    var material = new THREE.ParticleBasicMaterial({ size: 200 });
    var particles = new THREE.ParticleSystem(geometry, material);

    scene.add(particles);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    updatePlane(plane);
    updatePlane(plane2);

    renderVoid();
}

function updatePlane(obj) {
    for (var i = 0; i < obj.geometry.vertices.length; i++) {
        obj.geometry.vertices[i].z += Math.random() * vertexHeight - vertexHeight;
    }
};

function renderVoid() {
    animationReq = requestAnimationFrame(renderVoid);
    camera.position.z -= 150;
    renderer.render(scene, camera);
}

// Feathers
function createFeathers() {
    if (!featherImage.complete) {
        console.log("Feather image is not yet loaded, bail");
        return;
    }
    let yellowOrange = 0xF5CC70;
    $("#feathers").append("<canvas id='featherScene' class='removable'></canvas>");

    center = new THREE.Vector3(0, 100, 0);
    canvas = document.getElementById("featherScene");
    renderer = new THREE.WebGLRenderer({
        canvas: canvas
    });
    renderer.setSize(ww, wh);
    renderer.setClearColor(yellowOrange);

    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(yellowOrange, 500, 850);

    feathers = new THREE.Object3D()
    for (var i = 0; i < featherAmount; i++) {
        feathers.add(new Feather(i));
    }

    scene.add(feathers);

    featherCamera = new THREE.PerspectiveCamera(50, ww / wh, 1, 10000);
    featherCamera.position.set(0, 0, 500);
    featherCamera.lookAt(center);
    scene.add(featherCamera);

    var light = new THREE.HemisphereLight(yellowOrange, 0xF2676B, 1.5);
    scene.add(light);

    window.addEventListener("resize", onWindowResize);
    window.addEventListener("mousemove", onMouseMove);

    $("body").css("background-color", "#F5CC70");
    animationReq = requestAnimationFrame(renderFeathers);
}

function onWindowResize() {

    ww = window.innerWidth;
    wh = window.innerHeight;

    renderer.setSize(ww, wh);
    featherCamera.aspect = ww / wh;
    featherCamera.updateProjectionMatrix();
}

function onMouseMove(e) {
    mouse.x = (e.clientX - ww / 2) / (ww / 2) / 40;
};

function Feather(i) {
    var size = Math.random() * 50 + 10;
    var geometry = new THREE.PlaneGeometry(size, size, 3);
    var material = new THREE.MeshLambertMaterial({
        side: THREE.DoubleSide,
        map: featherTexture,
        transparent: true,
        color: new THREE.Color("hsl(" + (120 * (i / featherAmount)) + ", 50%, 80%)"),
        alphaTest: 0.8
    });
    var feather = new THREE.Mesh(geometry, material);
    feather.opts = {};

    feather.opts.position = {
        x: (Math.random() - 0.5) * 600,
        y: (Math.random() * 200),
        z: (Math.random() - 0.5) * 600
    }

    feather.opts.rotation = {
        x: Math.random() * (Math.PI * 2),
        y: Math.random() * (Math.PI * 2),
        z: Math.random() * (Math.PI * 2)
    }

    feather.opts.speed = {
        x: (Math.random() - 0.5),
        y: -Math.random(),
        z: (Math.random() - 0.5),
        rx: (Math.random() - 0.5) / 50,
        ry: (Math.random() - 0.5) / 50,
        rz: (Math.random() - 0.5) / 50
    }

    feather.position.set(feather.opts.position.x, feather.opts.position.y, feather.opts.position.z);
    feather.rotation.set(feather.opts.rotation.x, feather.opts.rotation.y, feather.opts.rotation.z);

    return feather;
};

var renderFeathers = function(a) {
    animationReq = requestAnimationFrame(renderFeathers);

    for (var i = 0; i < featherAmount; i++) {
        var feather = feathers.children[i];
        feather.position.x += feather.opts.speed.x;
        feather.position.y += feather.opts.speed.y;
        feather.position.z += feather.opts.speed.z;
        feather.rotation.x += feather.opts.speed.rx;
        feather.rotation.y += feather.opts.speed.ry;
        feather.rotation.z += feather.opts.speed.rz;

        if (feather.position.y <= -250) {
            feather.position.x = (Math.random() - 0.5) * 30;
            feather.position.y = (Math.random() - 0.5) * 10 + 300;
            feather.position.z = (Math.random() - 0.5) * 50;
        }
    }

    position += mouse.x;
    featherCamera.position.x = Math.sin(position) * 800;
    featherCamera.position.z = Math.cos(position) * 800;
    featherCamera.lookAt(center);

    renderer.render(scene, featherCamera);
};

var featherImage = new Image();
var textureLoader = new THREE.TextureLoader();
featherImage.onload = function() {
    textureLoader.load(featherImage.src, function(t) {
        featherTexture = t;
    });
};
featherImage.src = "data:image/png;base64,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";



// Create water

///////////////// worker thread code ///////////////////
const water = noWorkers => {
    "use strict";
    let canvas, ctx;
    let pointer = { x: 0, y: 0, isDown: false };
    let width, height, hwidth, hheight, size, map, oldind, newind;
    let textureBuffer8, textureBuffer32;
    let ripple, rippleBuffer8, rippleBuffer32;
    const window = {
        CP: {
            shouldStopExecution(e) {},
            exitedLoop(e) {}
        }
    };
    // ---- messages from the main thread ----
    const message = e => {
        switch (e.data.msg) {
            case "pointerMove":
                pointer.x = e.data.x | 0;
                pointer.y = e.data.y | 0;
                break;
            case "pointerDown":
                pointer.x = e.data.x | 0;
                pointer.y = e.data.y | 0;
                pointer.isDown = true;
                break;
            case "pointerUp":
                pointer.isDown = false;
                break;
            case "start":
                canvas = e.data.elem;
                width = canvas.width;
                height = canvas.height;
                ctx = canvas.getContext("2d");
                hwidth = width / 2;
                hheight = height / 2;
                size = width * (height + 2) * 2;
                map = new Int16Array(size);
                oldind = width;
                newind = width * (height + 3);
                const textureBuffer = new ArrayBuffer(e.data.imgData.data.length);
                textureBuffer8 = new Uint8ClampedArray(textureBuffer); // 8 bit clamped view
                textureBuffer32 = new Uint32Array(textureBuffer); // 32 bits view
                textureBuffer8.set(e.data.imgData.data);
                // ripple texture
                ripple = e.data.imgData;
                const rippleBuffer = new ArrayBuffer(ripple.data.length);
                rippleBuffer8 = new Uint8ClampedArray(rippleBuffer);
                rippleBuffer32 = new Uint32Array(rippleBuffer);
                // start
                run();
                gloop();
                setInterval(gloop, 4000);
                break;
        }
    };
    // create wave
    function wave(dx, dy, r) {
        for (let j = -r; j < r; j++) {
            for (let k = -r; k < r; k++) {
                if (j * j + k * k < r * r) {
                    const x = dx + k;
                    const y = dy + j;
                    if (y > 0 && y < height && x > 0 && x < width) {
                        map[oldind + y * width + x] += 256;
                    }
                }
            }
        }
    }

    function water() {
        console.log("water called");
        // toggle maps each frame
        let i = oldind;
        oldind = newind;
        newind = i;
        let mapind = oldind;
        const len = width * height;
        for (let i = 0; i < len; i++) {
            const x = (i % width) | 0;
            const y = (i / width) | 0;
            let data =
                ((map[mapind - width] +
                        map[mapind + width] +
                        map[mapind - 1] +
                        map[mapind + 1]) >>
                    1) -
                map[newind + i];
            data -= data >> 6;
            mapind++;
            if (x !== 0) map[newind + i] = data;
            data = 1024 - data;
            // offsets
            let a = ((x - hwidth) * data / 1024 + hwidth) | 0;
            let b = ((y - hheight) * data / 1024 + hheight) | 0;
            // 32 bits pixel copy
            rippleBuffer32[i] = textureBuffer32[a + b * width];
        }
        ripple.data.set(rippleBuffer8);
        ctx.putImageData(ripple, 0, 0);
    }

    function gloop() {
        wave(hwidth, hheight, 16);
    }
    // main loop
    function run() {
        animationReq = requestAnimationFrame(run);
        water();
        if (pointer.isDown) {
            wave(pointer.x, pointer.y, 16);
        }
    }
    // ---- main thread vs. worker
    if (noWorkers) {
        // ---- map postMessage ----
        return {
            postMessage(data) {
                message({ data: data });
            }
        };
    } else {
        // ---- worker messaging ----
        onmessage = message;
    }
};
///////////////// main thread code ///////////////////

function createWater() {
    console.log("Create water");
    $("#water").append("<canvas id='rainWaterCanvas' class='removable'></canvas>");
    $("#water").append("<img id='texture' class='removable' src='data:image/jpg;base64,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'></img>");
    let worker = null;
    const createWorker = fn => {
        const URL = window.URL || window.webkitURL;
        return new Worker(URL.createObjectURL(new Blob(["(" + fn + ")()"])));
    };
    // ---- init canvas ----
    canvas = document.getElementById("rainWaterCanvas")
    // ---- source image ----
    var img = document.getElementById("texture");
    const texture = document.createElement("canvas");
    texture.width = canvas.width;
    texture.height = canvas.height;
    const ctx = texture.getContext("2d");
    ctx.drawImage(img, 0, 0);
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    // ---- instanciate worker ----
    if (window.Worker && window.OffscreenCanvas) {
        worker = createWorker(water);
        const offscreen = canvas.transferControlToOffscreen();
        worker.postMessage({ msg: "start", elem: offscreen, imgData: imgData }, [
            offscreen
        ]);
    } else {
        worker = water(true);
        worker.postMessage({ msg: "start", elem: canvas, imgData: imgData });
    }
    // ---- pointer events ----
    pointer = {
        x: 0,
        y: 0,
        move(e) {
            if (e.targetTouches) {
                e.preventDefault();
                this.x = e.targetTouches[0].clientX;
                this.y = e.targetTouches[0].clientY;
            } else {
                this.x = e.clientX;
                this.y = e.clientY;
            }
            worker.postMessage({
                msg: "pointerMove",
                x: this.x - canvas.offsetLeft,
                y: this.y - canvas.offsetTop
            });
        },
        down(e) {
            this.move(e);
            worker.postMessage({
                msg: "pointerDown",
                x: this.x - canvas.offsetLeft,
                y: this.y - canvas.offsetTop
            });
        },
        up(e) {
            worker.postMessage({
                msg: "pointerUp"
            });
        }
    };
    window.addEventListener("mousemove", e => pointer.move(e), false);
    canvas.addEventListener("touchmove", e => pointer.move(e), false);
    window.addEventListener("mousedown", e => pointer.down(e), false);
    window.addEventListener("touchstart", e => pointer.down(e), false);
    window.addEventListener("mouseup", e => pointer.up(e), false);
    window.addEventListener("touchend", e => pointer.up(e), false);
}
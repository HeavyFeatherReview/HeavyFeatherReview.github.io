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
var camera;
var renderer;
var scene;

var animationReq;

$("p").hover(function()
{
    // Mouse enters
    currentlyHoveredID = this.id;
    console.log("Hovered over: " + this.id);
    if (currentlyHoveredID == "eggs")
    {
        createEgg();
    }
    else if (currentlyHoveredID == "rainsnakes")
    {
        rain();
    }
    else if (currentlyHoveredID == "void")
    {
        createVoid();
    }
    else if (currentlyHoveredID == "feathers")
    {
        createFeathers();
    }
}, 
function()
{
    // if (debugMode)
    // {
    //     return;
    // }
    // Mouse leaves
    cancelAnimations(this);

});

function cancelAnimations(element)
{
    let id = element.id;
    $(element).children(".removable").remove();

    // Cancel any animation
    window.cancelAnimationFrame();

    if (id == "rainsnakes")
    {
        window.removeEventListener("resize", resize);
    }
}

// Egg
function createEgg()
{
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

    $("#egg").mouseleave(function(){        
        $("#egg").removeClass("hover");
    });
}


// Crazy rain
function rain()
{
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

            ctx.strokeStyle = 'hsla(180, 100%, 50%, '+this.a+')';
            ctx.stroke();
            ctx.closePath();
            
        } else {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.size, this.size * 5);
        }
        this.update();
    },
    update: function() {
        if(this.y < this.hit){
            this.y += this.vy;
        } else {
            if(this.a > .03){
                this.w += this.vw;
                this.h += this.vh;
                if(this.w > 100){
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

function resize(){
    w = c.width = window.innerWidth;
    h = c.height = window.innerHeight;
}

function setup(){
    for(var i = 0; i < max; i++){
        (function(j){
            setTimeout(function(){
                var o = new O();
                o.init();
                drops.push(o);
            }, j * 400)
        }(i));
    }
}

function anim() {
    ctx.fillStyle = clearColor;
    ctx.fillRect(0,0,w,h);
    for(var i in drops){
        drops[i].draw();
    }
    animationReq = requestAnimationFrame(anim);
}

// Void
function createVoid()
{
    $("#void").append("<div class='removable' id='caveVoid'></div>");
    var container = document.getElementById("caveVoid");

    camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight,1, 2500000)
    camera.position.z = 670000;
    camera.position.y =10000;
    camera.lookAt( new THREE.Vector3(0,6000,0) );


    scene = new THREE.Scene();
    scene.fog = new THREE.Fog( 0x000000, 100000, 400000 );


    var plane = new THREE.Mesh( new THREE.PlaneGeometry( planeSize, planeSize, planeDefinition, planeDefinition ), new THREE.MeshBasicMaterial( { color: 0x555555, wireframe: false } ) );
    plane.rotation.x -=Math.PI*1.5;
    plane.position.y = 20000;
    scene.add( plane );

    var plane2 = new THREE.Mesh( new THREE.PlaneGeometry( planeSize, planeSize, planeDefinition, planeDefinition ), new THREE.MeshBasicMaterial( { color: 0x555555, wireframe: false } ) );
    plane2.rotation.x -=Math.PI*.5;
    //plane2.position.z = 100000;
    scene.add( plane2 );

    var geometry = new THREE.Geometry();

    for (i = 0; i < totalObjects; i ++) 
    { 
      var vertex = new THREE.Vector3();
      vertex.x = Math.random()*planeSize-(planeSize*.5);
      vertex.y = (Math.random()*100000)-10000;
      vertex.z = Math.random()*planeSize-(planeSize*.5);
      geometry.vertices.push( vertex );
    }

    var material = new THREE.ParticleBasicMaterial( { size: 200 });
    var particles = new THREE.ParticleSystem( geometry, material );

    scene.add( particles ); 

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild( renderer.domElement );

    updatePlane(plane);
    updatePlane(plane2);

    renderVoid();
}

function updatePlane(obj) { 
    for (var i = 0; i < obj.geometry.vertices.length; i++) 
    { 
        obj.geometry.vertices[i].z += Math.random()*vertexHeight -vertexHeight; 
    } 
};

function renderVoid() {
    animationReq = requestAnimationFrame( renderVoid );
    camera.position.z -= 150;
    renderer.render( scene, camera );
}




// Feathers
function createFeathers()
{

}
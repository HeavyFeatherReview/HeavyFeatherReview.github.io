var c;
var SweepWind; 

var w;
var h;
var windAnimationReq;

var drawWind = function(a, b, t) {
  SweepWind.lineWidth = 0.8;
  SweepWind.fillStyle = 'hsla(0, 0%, 0%, 0)';
  SweepWind.fillRect(0, 0, w, h);
  for (var i = -60; i < 60; i += 1) {
    SweepWind.strokeStyle = 'hsla(200, 95%, 15%, .15)';
    SweepWind.beginPath();
    SweepWind.moveTo(0, h / 2);
    for (var j = 0; j < w; j += 10) {
      SweepWind.lineTo(10 * Math.sin(i / 10) +
        j + 0.008 * j * j,
        Math.floor(h / 2 + j / 2 *
          Math.sin(j / 50 - t / 50 - i / 118) +
          (i * 0.9) * Math.sin(j / 25 - (i + t) / 65)));
    };
    SweepWind.stroke();
  }
}
var t = 0;

window.addEventListener('resize', function() {
  c.width = w = document.body.clientWidth;
  c.height = h = document.body.clientHeight;
  SweepWind.fillStyle = 'hsla(277, 95%, 55%, 1)';
}, false);

function runWind() {
  c = document.getElementById('canv');
  if (!c)
    return;
  SweepWind = c.getContext('2d');
  w = c.width = document.body.clientWidth;
  h = c.height = document.body.clientHeight;
  windAnimationReq = window.requestAnimationFrame(runWind);
  t += 5;
  drawWind(33, 52 * Math.sin(t / 2400), t);
};

function cancelWind(){
  window.cancelAnimationFrame(windAnimationReq);
}
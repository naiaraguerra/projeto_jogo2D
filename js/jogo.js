const canvas = $('canvas')[0];
const ctx =  canvas.getContext("2d"); 

let canvasWidth = 1024;
let canvasHeight =  576;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

let prevTime = 0;

animate();












/*functions*/

function animate(){
    window.requestAnimationFrame(animate);
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvasWidth,canvasHeight);
    player.update();
    player2.update();
    let delta = (performance.now() - prevTime) / 1000;
    let fps = 1 / delta;
    
    prevTime = performance.now();
    //console.log('fps: '+fps);
}
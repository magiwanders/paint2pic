var image = new Image()
var canvas
var ctx
var size = 2
var color = "#FFD000"
var isMouseDown = false


function buildP2P(imageAddress, anchor) {
    anchor.innerHTML = ''
    image.src = imageAddress
    anchor.appendChild(_div({id: 'p2p'}, 
        [
            _div({id: 'controls', style: 'display:inline-block'},
                [
                    'You can draw on this image with this color ',
                    _input({type:'color', id:'colorpicker', value:color, onchange: 'colorChange()'}),
                    ', after which you can',
                    _button({id:'clear', onclick: 'reloadImage()'}, 'Clear'),
                    ' it. Sketches will NOT be saved.'
                ]
            ),
            _div({id: 'canvas_container', style:'width: 100%; overflow: scroll;'},
                _canvas({
                    id: 'canvas',
                    height: image.height,
                    width: image.width,
                    style: 'border: 1px solid;'
                })
            )
        ]
    ))
    canvas = document.getElementById('canvas') 
    ctx = canvas.getContext('2d');
    image.onload = function () { ctx.drawImage(image, 0, 0); }
    canvas.addEventListener('mousedown', function(event) {mousedown(canvas, event);});
    canvas.addEventListener('mousemove',function(event) {mousemove(canvas, event);});
    canvas.addEventListener('mouseup',mouseup);
}

function reloadImage() {
    console.log('Reloading Image...')
    ctx.drawImage(image, 0, 0);
}
function colorChange() {
    console.log('Changing color to: ' + document.getElementById('colorpicker').value)
    color = document.getElementById('colorpicker').value;
}

// POSSIBLE FUTURE ADDITIONS
// document.getElementById('controlSize').addEventListener('change', function() {
//     currentSize = this.value;
//     document.getElementById("showSize").innerHTML = this.value;
// });
// document.getElementById('saveToImage').addEventListener('click', function() {
//     downloadCanvas(this, 'canvas', 'masterpiece.png');
// }, false);
// function downloadCanvas(link, canvas, filename) {
//     link.href = document.getElementById(canvas).toDataURL();
//     link.download = filename;
// }

//#region MOUSE

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function mousedown(canvas, evt) {
    isMouseDown=true
    var mousePos = getMousePos(canvas, evt);
    var currentPosition = getMousePos(canvas, evt);
    ctx.moveTo(currentPosition.x, currentPosition.y)
    ctx.beginPath();
    ctx.lineWidth  = size;
    ctx.lineCap = "round";
    ctx.strokeStyle = color;

}

function mousemove(canvas, evt) {
    if(isMouseDown){
        var currentPosition = getMousePos(canvas, evt);
        ctx.lineTo(currentPosition.x, currentPosition.y)
        ctx.stroke();
    }
}

function mouseup() {
    isMouseDown=false
}
//#endregion
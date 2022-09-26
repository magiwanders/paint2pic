var image
var canvas
var ctx
var size = 2
var color = "#FFD000"
var isMouseDown = false


function buildP2P(remoteImage, anchor) {
    anchor.innerHTML = ''
    image = remoteImage
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
                    id: 'canvas_'+anchor.id,
                    height: image.height,
                    width: image.width,
                    style: 'border: 1px solid;'
                })
            )
        ]
    ))
    canvas = document.getElementById('canvas_'+anchor.id) 
    ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0)
    canvas.addEventListener('mousedown', function(event) {mousedown(canvas, event);})
    canvas.addEventListener('mousemove',function(event) {mousemove(canvas, event);})
    canvas.addEventListener('mouseup',mouseup)
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

		// // SAVE FUNCTION

		// function save() {
		// 	localStorage.removeItem("savedCanvas");
		// 	localStorage.setItem("savedCanvas", JSON.stringify(linesArray));
		// 	console.log("Saved canvas!");
		// }

		// // LOAD FUNCTION

		// function load() {
		// 	if (localStorage.getItem("savedCanvas") != null) {
		// 		linesArray = JSON.parse(localStorage.savedCanvas);
		// 		var lines = JSON.parse(localStorage.getItem("savedCanvas"));
		// 		for (var i = 1; i < lines.length; i++) {
		// 			ctx.beginPath();
		// 			ctx.moveTo(linesArray[i-1].x, linesArray[i-1].y);
		// 			ctx.lineWidth  = linesArray[i].size;
		// 			ctx.lineCap = "round";
		// 			ctx.strokeStyle = linesArray[i].color;
		// 			ctx.lineTo(linesArray[i].x, linesArray[i].y);
		// 			ctx.stroke();
		// 		}
		// 		console.log("Canvas loaded.");
		// 	}
		// 	else {
		// 		console.log("No canvas in memory!");
		// 	}
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
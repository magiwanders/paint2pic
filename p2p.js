var anchors = []
var image = {}
var canvas = {}
var ctx = {}
var size = 2
var color = {}
var isMouseDown = false

async function p2pStart(p2p_containers) {
    const loadImage = path => {
        return new Promise((resolve, reject) => {
          const img = new Image()
          img.crossOrigin = 'Anonymous' // to avoid CORS if used with Canvas
          img.src = path
          img.onload = () => {
            resolve(img)
          }
          img.onerror = e => {
            reject(e)
          }
        })
      }
    for (var i=0; i<p2p_containers.length; i++) {
        var p2p_container = p2p_containers.item(i)
        await loadImage(p2p_container.id).then( (image) => {

            buildP2P(image, p2p_container)
        })
    }
}

function buildP2P(remoteImage, anchor) {
    anchor.innerHTML = ''
    anchors.push(anchor)
    var id = anchors[anchors.length-1].id
    image[id] = remoteImage
    color[id] = "#FFD000"
    anchor.appendChild(_div({id: 'p2p'}, 
        [
            _div({id: 'controls', style: 'display:inline-block'},
                [
                    'You can draw on this image with this color ',
                    _input({type:'color', id:'colorpicker_'+id, value:color[id], onchange: 'colorChange(event)'}),
                    ', after which you can',
                    _button({id:'clear_'+id, onclick: 'reloadImage(event)'}, 'Clear'),
                    ' it. Sketches will NOT be saved.'
                ]
            ),
            _div({id: 'canvas_container', style:'width: 100%; overflow: scroll;'},
                _canvas({
                    id: 'canvas_'+id,
                    height: image[id].height,
                    width: image[id].width,
                    style: 'border: 1px solid;'
                })
            )
        ]
    ))
    canvas[id] = document.getElementById('canvas_'+anchor.id) 
    ctx[id] = canvas[id].getContext('2d');
    ctx[id].drawImage(image[id], 0, 0)
    canvas[id].addEventListener('mousedown', function(event) {mousedown(event);})
    canvas[id].addEventListener('mousemove',function(event) {mousemove(event);})
    canvas[id].addEventListener('mouseup',mouseup)
}

function reloadImage(event) {
    var id = event.target.id.substring(6, event.target.id.length)
    console.log('Reloading Image: '+id)
    ctx[id].drawImage(image[id], 0, 0);
}
function colorChange(event) {
    var id = event.target.id.substring(12, event.target.id.length)
    console.log('Changing color to: ' + document.getElementById(event.target.id).value)
    color[id] = document.getElementById(event.target.id).value;
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

function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

function mousedown(event) {
    var id = event.target.id.substring(7, event.target.id.length)
    console.log(id)
    var canvas = event.target
    isMouseDown=true
    var currentPosition = getMousePos(canvas, event);
    ctx[id].moveTo(currentPosition.x, currentPosition.y)
    ctx[id].beginPath();
    ctx[id].lineWidth  = size;
    ctx[id].lineCap = "round";
    ctx[id].strokeStyle = color[id];

}

function mousemove(event) {
    var id = event.target.id.substring(7, event.target.id.length)
    var canvas = event.target
    if(isMouseDown){
        var currentPosition = getMousePos(canvas, event);
        ctx[id].lineTo(currentPosition.x, currentPosition.y)
        ctx[id].stroke();
    }
}

function mouseup() {
    isMouseDown=false
}
//#endregion
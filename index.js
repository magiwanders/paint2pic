document.addEventListener('DOMContentLoaded', () => {
    console.log('Paint to Pic!')
    var image = new Image()
    image.src = './single_cycle_extended.png'
    image.onload = function () { buildP2P(this, document.getElementById('p2p_container')) }
  }
)
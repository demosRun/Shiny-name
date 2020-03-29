function scrollIntoView () {
  window.scrollTo(0, 0)
}

// 阻止微信拖动
document.body.addEventListener('touchmove', function (e) {
  e.preventDefault() // 阻止默认的处理方式(阻止下拉滑动的效果)
}, {passive: false})

// 重力感应
window.addEventListener("deviceorientation", orientationHandler, false);  
function orientationHandler(event) {
  if (!sphere) return
  sphere.rotation.y = -0.2 + event.gamma * 0.005
  sphere.rotation.x = -1.6 + event.beta * 0.005
  sphere.rotation.z = -0 + event.alpha * 0.001
    // text = ""  
    // var arrow = document.getElementById("arrow");  
    // text += "左右旋转：rotate alpha{" + Math.round(event.alpha) + "deg)<br>";  
    // text += "前后旋转：rotate beta{" + Math.round(event.beta) + "deg)<br>";  
    // text += "扭转设备：rotate gamma{" + Math.round(event.gamma) + "deg)<br>";  
    // arrow.innerHTML = text;  
}
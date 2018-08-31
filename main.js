let clock = document.querySelector('#clock')
let ctx = clock.getContext('2d')

var c_width = ctx.canvas.width
var c_height = ctx.canvas.height
var r = c_width / 2
ctx.translate(r, r)
r = r * 0.9
var rem = c_width / 200
setInterval(draw, 1000)

function draw() {
  //每秒都清除一次画布
  ctx.clearRect(0, 0, c_width, c_height)
  var now = new Date()
  var hour = now.getHours()
  var minute = now.getMinutes()
  var second = now.getSeconds()
  //清除后，再画出背景，各指针等
  drawBackground()
  drawHourPointer(hour, minute)
  drawMinutePointer(minute)
  drawSecondPointer(second)
  drawDot()
  ctx.restore()
}
draw()

function drawBackground() {
  ctx.save()
  ctx.beginPath()
  ctx.arc(0, 0, r - (ctx.lineWidth / 2), 0, 2 * Math.PI, false)
  ctx.fillStyle = "#fff"
  ctx.fill()

  //时钟边框渐变效果
  var grad = ctx.createRadialGradient(0, 0, r * 0.95, 0, 0, r * 1.05)
  grad.addColorStop(0, '#333');
  grad.addColorStop(0.5, 'white');
  grad.addColorStop(1, '#333');
  ctx.strokeStyle = grad;
  ctx.lineWidth = r * 0.1;
  ctx.stroke();

  //绘制小时数
  var hourNum = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2]
  ctx.font = 20 * rem + 'px Helvetica'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  hourNum.forEach(function(num, i) {
    var rad = 2 * Math.PI / 12 * i
    var x = Math.cos(rad) * (r - 30 * rem)
    var y = Math.sin(rad) * (r - 30 * rem)
    ctx.fillStyle = "#000"
    ctx.fillText(num, x, y)
  })

  //秒针60个点
  for (let i = 0; i < 60; i++) {
    var rad = 2 * Math.PI / 60 * i
    var x = Math.cos(rad) * (r - 15 * rem)
    var y = Math.sin(rad) * (r - 15 * rem)
    //重置绘图
    ctx.beginPath()
    if (i % 5 === 0) {
      ctx.fillStyle = '#000'
      ctx.arc(x, y, 2 * rem, 0, 2 * Math.PI, false)
    } else {
      ctx.fillStyle = '#ccc'
      ctx.arc(x, y, 2 * rem, 0, 2 * Math.PI, false)
    }
    ctx.fill()
  }
}

function drawHourPointer(hour, minute) {
  //先保存之前的环境，再画时针
  ctx.save()
  ctx.beginPath()
  var rad = 2 * Math.PI / 12 * hour
  var mrad = 2 * Math.PI / 12 / 60 * minute
  ctx.rotate(rad + mrad)
  ctx.moveTo(0, 10 * rem)
  ctx.lineTo(0, -r / 2)
  ctx.lineWidth = 5 * rem
  ctx.strokeStyle = "#000"
  ctx.lineCap = "round"
  ctx.stroke()
  //还原画小时之前的状态
  ctx.restore()
}

function drawMinutePointer(minute) {
  ctx.save()
  ctx.beginPath()
  var rad = 2 * Math.PI / 60 * minute
  ctx.rotate(rad)
  ctx.moveTo(0, 10 * rem)
  ctx.lineTo(0, -r + 30 * rem)
  ctx.lineWidth = 3 * rem
  ctx.strokeStyle = "#000"
  ctx.lineCap = "round"
  ctx.stroke()
  ctx.restore()
}

function drawSecondPointer(second) {
  ctx.save()
  ctx.beginPath()
  ctx.lineWidth = 2 * rem
  ctx.fillStyle = "#c14543"
  var rad = 2 * Math.PI / 60 * second
  ctx.rotate(rad)
  ctx.moveTo(-2 * rem, 20 * rem)
  ctx.lineTo(2 * rem, 20 * rem)
  ctx.lineTo(1 * rem, -r + 18 * rem)
  ctx.lineTo(-1 * rem, -r + 18 * rem)
  ctx.fill()
  ctx.restore()
}

//中心圆点
function drawDot() {
  ctx.beginPath()
  ctx.arc(0, 0, 3 * rem, 0, 2 * Math.PI, false)
  ctx.fillStyle = "#fff"
  ctx.fill()
}

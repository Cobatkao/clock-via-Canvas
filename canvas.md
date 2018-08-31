# Canvas上手

Canvas，正如其英文一样，他就像一块幕布，我们可以通过javascript在上面绘制诸如：

- 各式图表；
- 创建动画；
- 实时视频处理或渲染；

另外，它是HTML5新增的组件。

那么在页面中如何引入这块幕布呢？如下：

```javascript
<canvas id="root" width="300" height="200">
  <p>如果你能看到我，那么你的浏览器就不支持canvas</p>
</canvas>
```

有时我们会在canvas标签内添加一行说明性代码，以防浏览器不支持canvas时，它将显示说明。

# 绘制

## `getContext('2d')`

这个API让我们获取到`CanvasRenderingContext2D`对象，所有的绘图操作都通过这个完成！下面，我们
来画一个圆来熟悉canvas绘图步骤：

```javascript
let clock = document.querySelector('#clock')
let ctx = clock.getContext('2d')

var c_width = ctx.canvas.width
var c_height = ctx.canvas.height
var r = c_width / 2

  !(function drawBackground() {
    ctx.translate(r, r)
    ctx.beginPath()
    ctx.lineWidth = 10
    ctx.arc(0, 0, r - (ctx.lineWidth / 2), 0, 2 * Math.PI, false)
    ctx.stroke()
```

如上代码，

1. 首先获取正方形的长宽与圆的半径；
2. 利用`translate()`将坐标原点从左上移动到中心点，作为圆心；
3. 调用`beginPath)()`来起始一条路径；
4. 设置线条样式——`lineWidth`属性；
5. 调用`arc()`来创建弧线路径；
6. 调用`stroke`来绘制上面已经定义好的路径，（`fill()`填充当前绘图）；

## API

### 移动 `moveTo()` `lineTo()`

前者不创建线条，而是移动路径到指定点；
后者在指定点创建一个新点，然后创建其与最后指定点的线条；

### 文本 `textAlign` `textBaseline` `font`

注意`textAlign`默认值为start，也就是靠右位置；`textBaseline`默认在字母基线上；
![image](http://www.w3school.com.cn/i/textBaseline.gif)

### 上色 `fillStyle` `strokeStyle`

前者用于**填充**绘画的颜色，后者用于为笔触的颜色上色！

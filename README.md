### discardActiveObject  丢弃当前活动的对象和触发事件 

### getActiveobject 返回当前活动的objec 



width: 文字的宽度 

height: 文字的高度 

top: 文字的顶边距离 

left: 文字的左边距离

fill: 文字填充颜色 

fontFamily: 字体

fontSize: 字体大小 

scaleX: X缩放比例，默认为1

scaleY: Y缩放比例，默认为1 

strokeWidth:  边框宽度 

stroke: 边框颜色

textAlign: 对齐方式

textBackgroundColor:'',文字背景颜色

lineHeight: 行高 

fontWeight: 文字粗细

**常用属性**

canvas.isDrawingMode = true; 可以自由绘制

 canvas.selectable = false; 控件不能被选择，不会被操作 

canvas.selection = true; 画板显示选中 

canvas.skipTargetFind = true; 整个画板元素不能被选中

 canvas.freeDrawingBrush.color = "#E34F51" 设置自由绘画笔的颜色

 freeDrawingBrush.width 自由绘笔触宽度

**IText的方法**

selectAll() 选择全部

 getSelectedText() 获取选中的文本 

exitEditing() 退出编辑模式

#### [fabric.Textbox](http://fabricjs.com/docs/fabric.Textbox.html) 

### 文本宽度自适应

```
 canvas.on('text:changed', function(e) {
     // 获取文字的宽度
     String.prototype.visualLength = function(){
     var ruler = $("#addText");
     return ruler[0].offsetWidth;
     };
     var width = e.target.text.visualLength();
     e.target.width = width;
 });
```

 



## 使用笔记

### 常用属性

canvas.isDrawingMode = true; 可以自由绘制
canvas.selectable = false; 控件不能被选择，不会被操作
canvas.selection = true; 画板显示选中
canvas.skipTargetFind = true; 整个画板元素不能被选中
canvas.freeDrawingBrush.color = "#E34F51" 设置自由绘画笔的颜色
freeDrawingBrush.width 自由绘笔触宽度
canvas.setZoom(2); 设置画板缩放比例

------

### 方法

add(object) 添加
insertAt(object,index) 添加
remove(object) 移除
forEachObject 循环遍历 
getObjects() 获取所有对象
item(int) 获取子项
isEmpty() 判断是否空画板
size() 画板元素个数
contains(object) 查询是否包含某个元素
fabric.util.cos
fabric.util.sin
fabric.util.drawDashedLine 绘制虚线
getWidth() setWidth()
getHeight()?
clear() 清空
renderAll() 重绘
requestRenderAll() 请求重新渲染
rendercanvas() 重绘画板?
getCenter().top/left 获取中心坐标
toDatalessJSON() 画板信息序列化成最小的json
toJSON() 画板信息序列化成json
moveTo(object,index) 移动?
dispose() 释放?
setCursor() 设置手势图标
getSelectionContext()获取选中的context
getSelectionElement()获取选中的元素
getActiveObject() 获取选中的对象
getActiveObjects() 获取选中的多个对象
discardActiveObject()取消当前选中对象 
isType() 图片的类型?
setColor(color) = canvas.set("full","");
rotate() 设置旋转角度
setCoords() 设置坐标

------

### 事件

object:added
object:removed
object:modified
object:rotating
object:scaling
object:moving
object:selected 这个方法v2已经废弃，使用selection:created替代，多选不会触发
before:selection:cleared
selection:cleared
selection:updated
selection:created
path:created
mouse:down
mouse:move
mouse:up
mouse:over
mouse:out
mouse:dblclick

------

### IText的方法

selectAll() 选择全部
getSelectedText() 获取选中的文本
exitEditing() 退出编辑模式?

------

### 绘制直线

var line = new fabric.Line([10, 10, 100, 100], {
fill: 'green',
stroke: 'green',	//笔触颜色
strokeWidth: 2,//笔触宽度
});
canvas.add(line);

------

### 绘制虚线

在绘制直线的基础上添加属性strokeDashArray:Array
example：
var line = new fabric.Line([10, 10, 100, 100], {
fill: 'green',
stroke: 'green',
strokeDashArray:[3,1] 
});
canvas.add(line);

strokeDashArray[a,b] =》 每隔a个像素空b个像素。

------

### 可绘制对象

fabric.Circle	圆
fabric.Ellipse	椭圆
fabric.Line 直线
fabric.Polygon
fabric.Polyline
fabric.Rect 矩形
fabric.Triangle 三角形

------

### 图片去掉选中边框和旋转，且只能移动，不可操作

oImg.hasControls = false; 只能移动不能（编辑）操作
oImg.hasBorders = false; 去掉边框，可以正常操作
hasRotatingPoint = false; 不能被旋转
hasRotatingPoint 控制旋转点不可见
scaleToHeight(value, absolute) 缩放图片高度到value 

scaleToWidth(value, absolute) 缩放图片宽度到value

示例代码如下：

```
fabric.Image.fromURL("img.jpg", function (oImg) {
	img.scaleToHeight(400, false);  //缩放图片的高度到400
	img.scaleToWidth(400, false);   //缩放图片的宽度到400
	canvas.add(oImg);
	oImg.hasControls = oImg.hasBorders = false;
});
```

 

 

 
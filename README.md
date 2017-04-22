# colorPicker
a light-weight color picker implemented with SVG
# Introduction

**color picker**


color picker是一个用原生js实现的轻量的拾色器，压缩后仅8KB，能实现选择颜色并返回颜色值（hsv值/rgb值）或者输入颜色值来预览颜色。

使用：

1. 引入colorpicker.js和colorpicker.css
2. 调用colorPicker()并传入一个dom节点，例如：
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>color picker</title>
    <link rel="stylesheet" href="colorpicker.css"></link>
    <script type="text/javascript" src="colorpicker.js"></script>
</head>
<body>

    <div id="someId">
    <script type="text/javascript">
        var someElement = document.getElementById('someId');
        colorPicker(someElement);
    </script>
</body>
</html>
```
demo:
http://yyshhhh.com/colorpicker.html


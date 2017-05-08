function colorPicker(element){

    var colorPickerHTML = [
    '<div id="cont">',
        '<div id="pickers">',
            '<div id="picker">',
                '<svg  xmlns="http://www.w3.org/2000/svg" width="300px" height="300px" version="1.1">',
                    '<defs>',
                        '<linearGradient id="gradient-black" x1="0%" y1="100%" x2="0%" y2="0%">',
                            '<stop offset="0%" stop-color="#000000" stop-opacity="1"></stop>',
                            '<stop offset="100%" stop-color="#ffffff" stop-opacity="0"></stop>',
                        '</linearGradient>',
                        '<linearGradient id="gradient-white" x1="0%" y1="100%" x2="100%" y2="100%">',
                            '<stop offset="0%" stop-color="#ffffff" stop-opacity="1"></stop>',
                            '<stop offset="100%" stop-color="#ffffff" stop-opacity="0"></stop>',
                        '</linearGradient>',
                    '</defs>',
                    '<rect x="0" y="0" width="100%" height="100%" fill="url(#gradient-white)"></rect>',
                    '<rect x="0" y="0" width="100%" height="100%" fill="url(#gradient-black)"></rect>',
                '</svg>',
            '</div>',
            '<div id="picker-indicator"></div>',
        '</div>',

        '<div id="sliders">',
            '<div id="slider">',
                '<svg xmlns="http://www.w3.org/2000/svg" width="30px" height="300px" version="1.1">',
                    '<defs>',
                        '<linearGradient id="gradient-hsv" x1="0%" y1="100%" x2="0%" y2="0%">',
                            '<stop offset="0%" stop-color="#ff0000" stop-opacity="1"></stop>',
                            '<stop offset="8%" stop-color="#ff7f00" stop-opacity="1"></stop>',
                            '<stop offset="17%" stop-color="#ffff00" stop-opacity="1"></stop>',
                            '<stop offset="25%" stop-color="#80ff00" stop-opacity="1"></stop>',
                            '<stop offset="33%" stop-color="#00ff00" stop-opacity="1"></stop>',
                            '<stop offset="42%" stop-color="#00ff80" stop-opacity="1"></stop>',
                            '<stop offset="50%" stop-color="#00ffff" stop-opacity="1"></stop>',
                            '<stop offset="58%" stop-color="#0080ff" stop-opacity="1"></stop>',
                            '<stop offset="67%" stop-color="#0000ff" stop-opacity="1"></stop>',
                            '<stop offset="75%" stop-color="#8000ff" stop-opacity="1"></stop>',
                            '<stop offset="83%" stop-color="#ff00ff" stop-opacity="1"></stop>',
                            '<stop offset="92%" stop-color="#ff007f" stop-opacity="1"></stop>',
                            '<stop offset="100%" stop-color="#ff0000" stop-opacity="1"></stop>',
                        '</linearGradient>',
                    '</defs>',
                    '<rect width="30px" height="300px" fill="url(#gradient-hsv)"></rect>',
                '</svg>',
            '</div>',
            '<div id="slider-indicator"></div>',
        '</div>',

        '<div id="numbers">',
            '<label><span>H</span><input type="" name="" id="h" maxLength="3"> 度</label>',
            '<label><span>S</span><input type="" name="" id="s" maxLength="3"> %</label>',
            '<label><span>B</span><input type="" name="" id="v" maxLength="3"> %</label>',
            '<label><span>R</span><input type="" name="" id="r" maxLength="3"></label>',
            '<label><span>G</span><input type="" name="" id="g" maxLength="3"></label>',
            '<label><span>B</span><input type="" name="" id="b" maxLength="3"></label>',
            '<label><span>#</span><input type="" name="" id="hex" maxLength="6"><button id="copyText">复制</button></label>',
        '</div>',

        '<div id="currentColor"></div>',

    '</div>'

    ].join('');

element.innerHTML = colorPickerHTML;
    var cont = document.getElementById('cont');
    var picker = document.getElementById('picker');
    var silder = document.getElementById('slider');
    var pickers = document.getElementById('pickers');
    var silders = document.getElementById('sliders');
    var sliderIndicator = document.getElementById('slider-indicator');
    var pickerIndicator = document.getElementById('picker-indicator');
    var currentColor = document.getElementById('currentColor');

    function Color(colorObj){
        if(typeof colorObj.h == 'number'){
            this.h = colorObj.h;
            this.s = colorObj.s;
            this.v = colorObj.v;
        }
        if(typeof colorObj.r == 'number'){
            this.r = colorObj.r;
            this.g = colorObj.g;
            this.b = colorObj.b;
        }
        if(typeof colorObj.hex == 'string'){
            this.hex = colorObj.hex;
        }
    }

    Color.prototype = {
        constructor:Color,

        //从hsv到rgb
        hsv2rgb: function(){
            v = this.v;
            h = Math.floor(this.h / 60) % 6;
            f = this.h / 60 - h;
            p = this.v * (1 - this.s);
            q = this.v * (1- f * this.s);
            t = this.v * (1- (1 - f) * this.s);
            R = [v, q, p, p, t, v][h];
            G = [t, v, v, q, p, p][h];
            B = [p, p, t, v, v, q][h];
            r = Math.round( R * 255 );
            g = Math.round( G * 255 );
            b = Math.round( B * 255 );
            this.r = r;
            this.g = g;
            this.b = b;
        },

        //从rgb得到hsv的值
        rgb2hsv: function(){
            var r = this.r / 255,
                b = this.b / 255,
                g = this.g / 255;
            var h, s, v;
            v = Math.max(r, g, b);
            min = Math.min(r, g, b);
            s =  v == 0 ? 0 : (v - min) / v;
            if (v == min ){
                h = 0;
            }
            else if ( v == r && g >= b ){
                h = 60 * ( g - b ) / ( v - min);
            }
            else if ( v == r && g < b ){
                h = 60 * ( g - b ) / ( v - min) + 360;
            }
            else if ( v == g ){
                h = 60 * ( b - r ) / ( v - min) + 120;
            }
            else if ( v == b ){
                h = 60 * ( r - g ) / ( v - min) + 240;
            }
            this.h = h;
            this.s = s;
            this.v = v;
        },

        //rgb和十六进制的转化
        rgb2hex: function(){
            var r16, g16, b16;
            if (this.r > 15)
                {r16 = this.r.toString(16);}
            else{
                r16 = '0' + this.r.toString(16);
            }
            if (this.g > 15)
                {g16 = this.g.toString(16);}
            else{
                g16 = '0' + this.g.toString(16);
            }
            if (this.b > 15)
                {b16 = this.b.toString(16);}
            else{
                b16 = '0' + this.b.toString(16);
            }
            this.hex = r16 + g16 + b16;
        },

        //十六进制到rgb的转化
        hex2rgb: function(){
            var r16, g16, b16;
            r16 = this.hex.slice(0, 2);
            this.r = parseInt(r16, 16);
            g16 = this.hex.slice(2, 4);
            this.g = parseInt(g16, 16);
            b16 = this.hex.slice(4);
            this.b = parseInt(b16, 16);
        },
    }

    //显示颜色值和所取颜色
    function showColor(colorObj){
        document.getElementById('h').value = parseInt(colorObj.h);
        document.getElementById('s').value = parseInt(colorObj.s * 100);
        document.getElementById('v').value = parseInt(colorObj.v * 100);
        document.getElementById('r').value = colorObj.r;
        document.getElementById('g').value = colorObj.g;
        document.getElementById('b').value = colorObj.b;
        document.getElementById('hex').value = colorObj.hex;
        var colorBac = new Color( {h: colorObj.h, s: 1, v: 1});
        colorBac.hsv2rgb();
        colorBac.rgb2hex();
        picker.style.backgroundColor = '#' + colorBac.hex;
        currentColor.style.backgroundColor = '#' + colorObj.hex;
        sliderIndicator.style.top = ((360 - colorObj.h )/ 360 * slider.offsetHeight - sliderIndicator.offsetHeight / 2) + 'px';
        pickerIndicator.style.left = ( colorObj.s * picker.offsetWidth - pickerIndicator.offsetWidth / 2) + 'px';
        pickerIndicator.style.top = ( (1 - colorObj.v ) * picker.offsetHeight - pickerIndicator.offsetHeight / 2) + 'px';
    }


    var color = new Color({h: 56, s: 1, v: 1});
    color.hsv2rgb();
    color.rgb2hex();
    showColor(color);


    //获取鼠标位置
    function mousePosition(evt) {
        // IE:
        if (window.event && window.event.contentOverflow !== undefined) {
            return { x: window.event.offsetX, y: window.event.offsetY };
        }
        // Webkit:
        if (evt.offsetX !== undefined && evt.offsetY !== undefined) {
            return { x: evt.offsetX, y: evt.offsetY };
        }
    }


    //跨浏览器事件处理
    var EventUtil = {

        addHandler: function(element, type, handler){
            if (element.addEventListener){
                element.addEventListener(type, handler, false);
            } else if (element.attachEvent){
                element.attachEvent("on" + type, handler);
            } else {
                element["on" + type] = handler;
            }
        },
        removeHandler: function(element, type, handler){
            if (element.removeEventListener){
                element.removeEventListener(type, handler, false);
            } else if (element.detachEvent){
                element.detachEvent("on" + type, handler);
            } else {
                element["on" + type] = null;
            }
        }

    };

    //根据slide得到色相，并且反应到colorpicker上
    function sliderListener(colorObj){
        return function(evt){
            evt = evt || window.event;
            var mouse = mousePosition(evt);
            colorObj.h = ( 1 - mouse.y / sliders.offsetHeight ) * 360;
            colorObj.hsv2rgb();
            colorObj.rgb2hex();
            showColor(colorObj);
            var colorBac = new Color( {h: colorObj.h, s: 1, v: 1});
            colorBac.hsv2rgb();
            colorBac.rgb2hex();
            picker.style.backgroundColor = '#' + colorBac.hex;
            sliderIndicator.style.top = (mouse.y - sliderIndicator.offsetHeight / 2) + 'px';
        };
    }

    //根据picker的鼠标位置取到颜色值
    function pickerListener(colorObj){
        return function(evt){
            evt = evt || window.event;
            var mouse = mousePosition(evt),
                width = pickers.offsetWidth,
                height = pickers.offsetHeight;
            colorObj.s = mouse.x / width;
            colorObj.v = (height - mouse.y) / height;
            colorObj.hsv2rgb();
            colorObj.rgb2hex();
            showColor(colorObj);
            pickerIndicator.style.top = (mouse.y - pickerIndicator.offsetHeight / 2) + 'px';
            pickerIndicator.style.left = (mouse.x - pickerIndicator.offsetWidth / 2) + 'px';
        };
    }



    //拖动鼠标的事件处理
    function dragging(color, element, listener){
        var mousedown = false;

        EventUtil.addHandler(element, 'mousedown', function(evt){
            evt = evt || window.event;
            mousedown = true;
            if (mousedown){
                listener(evt);
            } })
        EventUtil.addHandler(element, 'mouseup', function(evt){
            evt = evt || window.event;
            mousedown = false; })
        EventUtil.addHandler(element, 'mouseout', function(evt){
            evt = evt || window.event;
            mousedown = false; })
        EventUtil.addHandler(element, 'mousemove', function(evt){
            evt = evt || window.event;
            if (mousedown){
                listener(evt);
            }
        })
    }

    dragging(color, sliders, sliderListener(color));
    dragging(color, pickers, pickerListener(color));

    //输入颜色值颜色改变
    EventUtil.addHandler(document.getElementById('numbers'), 'change', function(evt){
        evt = evt || window.event;
        var target = event.target || event.srcElement;
        if (target == document.getElementById('h')){
            color.h = parseInt(document.getElementById('h').value);
            if ( color.h <= 360){
                color.hsv2rgb();
                color.rgb2hex();
                showColor(color);
            }
            else{
                alert('请输入0~360之间的数值');
            }
        }
        else if ( target == document.getElementById('s')){
            color.s = Number(document.getElementById('s').value / 100);
            if ( color.s <= 1){
                color.hsv2rgb();
                color.rgb2hex();
                showColor(color);

            }
            else{
                alert('请输入0~100之间的数值');
            }
        }
        else if (target == document.getElementById('v')){
            color.v = Number(document.getElementById('v').value / 100);
            if ( color.v <= 1){
                color.hsv2rgb();
                color.rgb2hex();
                showColor(color);

            }
            else{
                alert('请输入0~100之间的数值');
            }
        }
        else if (target == document.getElementById('r')){
            color.r = parseInt(document.getElementById('r').value);
            if ( color.r <= 255){
                color.rgb2hsv();
                color.rgb2hex();
                showColor(color);

            }
            else{
                alert('请输入0~255之间的数值');
            }
        }
        else if (target == document.getElementById('g')){
            color.g = parseInt(document.getElementById('g').value);
            if ( color.g <= 255){
                color.rgb2hsv();
                color.rgb2hex();
                showColor(color);
            }
            else{
                alert('请输入0~255之间的数值');
            }
        }
        else if (target == document.getElementById('b')){
            color.b = parseInt(document.getElementById('b').value);
            if ( color.b <= 255){
                color.rgb2hsv();
                color.rgb2hex();
                showColor(color);
            }
            else{
                alert('请输入0~255之间的数值');
            }
        }
        else if (target == document.getElementById('hex')){
            color.hex = document.getElementById('hex').value;
            if ( parseInt(color.hex, 16) >= 0 && parseInt(color.hex, 16) <= parseInt('ffffff', 16) ){
                color.hex2rgb();
                color.rgb2hsv();
                showColor(color);
            }
            else{
                document.getElementById('hex').value = color.hex;
                alert('请输入000000~ffffff之间的数值');
            }
        }

    });

    function copyText(){
        var copyTextBtn = document.getElementById('copyText');
        EventUtil.addHandler( copyTextBtn, 'click', function(evt){
            document.getElementById('hex').select();
            document.execCommand("Copy");
        })
    }

    copyText();


}



fullpage
========

<a href="http://cody1991.github.io/fullpage/index.html">主页</a>

单页滚屏，主要应用于邀请函的制作

小巧的邀请函模板，里面包括了下滑提示、音乐控件、加载页面等


先放个<a href="http://cody1991.github.io/fullpage/demo/index.html">demo</a>

基于<a href="https://github.com/alvarotrigo/fullPage.js">fullpage.js</a>构建，但是使用的时候它所包含的参数和事件并没有全部用到，有兴趣的可以前去查看。这个库必须引入的js文件有：juqery.js、jquery.easings.min.js和jquery.fullPage.min.js，以及css文件jquery.fullPage.css。另外文件列表中的common.js和style.css则是自定义的样式和事件。

基本结构
========
```html
    <div id="fullpage">

        <div class="section" id="section1">
            <h1>Section 1</h1>
        </div>

        <div class="section" id="section2">
            <div class="slide" id="slide1">
                <h1>Slide 1</h1>
            </div>
            <div class="slide" id="slide2">
                <h1>Slide 2</h1>
            </div>
            <div class="slide" id="slide3">
                <h1>Slide 3</h1>
            </div>
        </div>

        <div class="section" id="section3">
            <h1>Section 3</h1>
        </div>
    </div>
```
上面是基本的fullpage.js框架结构，最外围的div.fullpage作为一个标识传递给fullpage(),在div.fullpage内，每个div.section代表一个页面，而早div.section里面如有div.slide，则代表那一个页面内还有可以左右滚动的页（参考<a href="http://cody1991.github.io/fullpage/demo/index.html">demo</a>的第二页）

在css部分，我们把#fullpage.div的display设为none，然后再js部分引入fullpage.js代码
```js
    $('#fullpage').show().fullpage({
        verticalCentered: false,

        //控制锚和页面切换间效果
        // anchors: ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8'],
        // easing: 'easeOutBack',

        //头部底部的滑动衔接
        continuousVertical: true,
    });

```
一般用到这三个参数，第一个垂直居中不建议使用，设为false，自己来设定页面元素的位置。而anchors参数是你滚动到哪一页就会自动在window.location.url的末尾加上所对应的值，而easing则是使用jquery.easing.js中的动画效果，默认是平缓滑动。最后continuousVertical设置为 true，在第一页到最后一页或者最后一页到第一页的时候，看起来就只是两个相邻页面的切换而已，而不设置为true的话，从第一页到最后一页会经过中间的那些页面，速度比较快，一闪而过。

另外它的导航的css部分，border-radius是使用100%来达到圆形效果的，一部分手机不支持，进行了以下的修改
```css
#fp-nav span, .fp-slidesNav span {
    -webkit-border-radius: 100px;
    -moz-border-radius: 100px;
    border-radius: 100px;
}
```

上滑提示
========
基本邀请函或者单页页面都会有一个上滑的提示，下面是它的基本HTML结构
```html
<div class="swipe_tip">
    <p></p>
</div>
```
样式：
```css
.swipe_tip {
    display: none;
    position: fixed;
    bottom: 0;
    left: 50%;
    width: 50px;
    height: 50px;
    margin-left: -25px;
    z-index: 999999;
}
.swipe_tip p {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -7px 0 0 -14px;
    width: 25px;
    height: 14px;
    background: url(../images/swipe_tip.png) no-repeat left top;
    background-size: 100% 100%;
    -webkit-animation: start 1.5s infinite ease-in-out;
}
@-webkit-keyframes start {
    0% {
        opacity: 0;
        -webkit-transform: translate(0, 10px);
    }
    30% {
        opacity: 0;
        -webkit-transform: translate(0, 10px);
    }
    60% {
        opacity: 1;
        -webkit-transform: translate(0, 0);
    }
    100% {
        opacity: 0;
        -webkit-transform: translate(0, -8px);
    }
}
```

没什么特别的地方，另外一开始swipe_tip也是设定display为none，和上面的div.fullpage（以及后面的div.music_control,音乐控件）一样，主要是后面会加入loading加载页面，在加载完成后移除加载页，然后再把他们显示出来



加载页面
========
加载页面说来也很简单，一开始显示出来，加载的动画元素垂直居中，在window.onload时间完成后移去
<a href="http://cody1991.github.io/PopularFrameworkDemo/loading/">LOADING</a>，在这个库里面放了一些简单loading页面的动画效果

音乐控件
========
这个不在这里赘述了，可以查看代码部分

动画
========

在进入某个页面的时候，这个div.section会增加一个.active类，我们可以给页面内的元素增加

```css
-webkit-animation: bounceInLeft 2s 0.3s ease both;
```

等类似的css3 animation动画，而它的选择器则是

```html
.section.active > h1 
```

等类似的语句，这样就会在进入的时候触发动画

```css
@-webkit-keyframes bounceInLeft {
    0% {
        opacity: 0;
        -webkit-transform: translateX(-2000px);
    }
    60% {
        -webkit-transform: translateX(30px);
    }
    80% {
        -webkit-transform: translateX(-10px);
    }
    100% {
        opacity: 1;
        -webkit-transform: translateX(0);
    }
}
```
注意事项
=======
```css
.before {
    -webkit-animation: sectionBefore 1s ease backwards;
}
@-webkit-keyframes sectionBefore {
    0% {
        -webkit-transform: scale(1);
    }
    100% {
        -webkit-transform: scale(0.8);
    }
}
```
```js
onLeave: function(index, nextIndex, direction) {
    $('.section').removeClass('before');
    $('.section').eq(index - 1).addClass('before');
}
```
页面之间我们可以通过这个方法来加上自己喜欢的切换效果

另外在div.section > div.slide页面内的元素可能会使用到position:absolute;定位，我们一开始最好就给出下面的样式
```css
.section, .slide {
    position: relative;
}
```
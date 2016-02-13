# Linkbar 步骤导航

##介绍
实现百度经验【步骤导航】页面效果  
[Sample](http://jingyan.baidu.com/article/b7001fe17557940e7282dde0.html)  
[Demo](http://sandbox.runjs.cn/show/qw8zeppm)

##功能
1、页面滚动，导航按钮跟随移动  
2、点击导航按钮，跳转该按钮对应的内容

##API
###Configration
- **element** `[jQuery]`：插件外层jQuery对象
- **icoClass** `[string]`：导航按钮样式类名
- **contents** `[Array<string|jQuery|Element>]`：导航内容集合

###Method
- **gotoLink** `gotoLink(index:number):void`：根据索引跳转对应内容
- **resize** `resize():void`：重新定位插件内部元素位置







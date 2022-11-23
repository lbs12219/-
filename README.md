“传智杯”web前端应用创意挑战赛 参赛作品，用于展示项目源码

本项目为前后端分离项目

## back 后端

>本版本为开发版本，小程序上线版本的后端为https协议
创建依赖包

```javascript
npm i
```

启动后端项目

```javascript
node index.js
```

## front前端

1. 本项目使用uniapp编写，请在HBuilder X里打开；
2. 本项目使用了Vant Weapp组件包，需要手动添加；
>本项目使用的vant组件版本为1.10.6
* 在项目中创建一个文件叫wxcomponents，该文件需与page文件平级
* ![image]([https://github.com/MaiEmily/map/blob/master/public/image/20190528145810708.png](https://uploader.shimo.im/f/qW7Nzi9P84XzhqKQ.png!thumbnail?accessToken=eyJhbGciOiJIUzI1NiIsImtpZCI6ImRlZmF1bHQiLCJ0eXAiOiJKV1QifQ.eyJleHAiOjE2NjkyMTAyNzUsImZpbGVHVUlEIjoicG1reFFYblowUmlhTjdBTiIsImlhdCI6MTY2OTIwOTk3NSwiaXNzIjoidXBsb2FkZXJfYWNjZXNzX3Jlc291cmNlIiwidXNlcklkIjozMTgzMTgzOH0.iH_3uTweJrwHhsKUmqv8QFCEv6H85HfpbZwAnP11arw![image](https://user-images.githubusercontent.com/78275353/203558175-65c1e266-9e46-4607-ab59-5721555648a8.png)))


* 在该网站“[https://github.com/youzan/vant-weapp/releases](https://github.com/youzan/vant-weapp/releases)”里下载vant组件压缩包
![图片](data:image/png;https://uploader.shimo.im/f/qW7Nzi9P84XzhqKQ.png!thumbnail?accessToken=eyJhbGciOiJIUzI1NiIsImtpZCI6ImRlZmF1bHQiLCJ0eXAiOiJKV1QifQ.eyJleHAiOjE2NjkyMTAyNzUsImZpbGVHVUlEIjoicG1reFFYblowUmlhTjdBTiIsImlhdCI6MTY2OTIwOTk3NSwiaXNzIjoidXBsb2FkZXJfYWNjZXNzX3Jlc291cmNlIiwidXNlcklkIjozMTgzMTgzOH0.iH_3uTweJrwHhsKUmqv8QFCEv6H85HfpbZwAnP11arw![image](https://user-images.githubusercontent.com/78275353/203558175-65c1e266-9e46-4607-ab59-5721555648a8.png))


* 将该项目的dist文件夹放在步骤一的wxcomponents文件的vant目录下
3. 本项目还缺少uni_modules包
4. 运行到微信开发者工具上（本项目小程序基础调试库版本为2.25.4）

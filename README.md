# webpack2 & Mockjs API Server
用nodejs + express + mockjs 架設 API Server，透過 webpack dev Server 的 proxy 讀取測試 API

mockjs官網 ： [http://mockjs.com/](http://mockjs.com/)
<br/>
express-mockjs : [https://github.com/52cik/express-mockjs](https://github.com/52cik/express-mockjs)
* express-mockjs 是建構在node express 上的 mockjs
<br/>

----

1. 先安裝所有的 package
```
npm i 
```
2. 開啟一個命令提示視窗，啟動 API Server
>啟動之後開啟 http://localhost:3001/ 就可以看到自己寫的api列表
```
node api_server.js
```
3. webpack.config 裡的devServer設定要新增proxy
>proxy 可以幫助devServer啟動跨網域存取API方便開發
```
proxy: {
    '/api/*': {
        target: 'http://localhost:3001/',
        changeOrigin: true,
    }
},
```
4. 接著再開啟一個新的命令提示視窗啟動 webpack dev Server
>開啟 http://localhost:3000/ 可以看到自己的頁面
```
npm run dev
```
5. 在api資料夾裡面寫入mockjs格式的json，每次修改mockjs格式要重新執行 node api_server.js
>更多mockjs格式可以參考官網doc http://mockjs.com/examples.html
```json
/**
 * 測試用讀取的api抬頭
 *
 * @url /admin
 *
 * 參數或其他說明寫在這裡。
 */
{
    "data":{
        "user|4":[
            {
                "name": "@cname",
                "id":"@integer(10000, 99999)",
                "sex":"@cword('男女')",
                "classname":"@cword('一二三四五六七八九十',1)班",
                "grade|":"@cword('一二三四五六七八九十')年级"
            }
        ]
    }
}
```
6 然後只要ajax剛剛設定好的api就好
>這邊我是用jquery的ajax來做，要用axios或其他的工具也是可以的
```javascript
$.ajax({
    url: 'http://localhost:3001/admin',
    type: 'GET',
    dataType: 'json'
})
.done((data)=> {
    console.log('res:',data);
})
.fail((err)=> {
    console.error('err:',err);
})
```
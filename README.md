## 命令
- 下载项目包
- npm i  安装依赖
- npm run dev 运行项目
- npm run build:prod 打包项目
## 难点
#### 隐藏列表的滚动条
- 使用两个div外面的div设置为overflow:hidden，里面的设置为overflow:auto,然后宽度外部设置为width:101%,zhege 0.1就会把滚动条溢出去，达到隐藏的效果。
- 代码 
```css
.content {
  overflow: hidden;
  width: 101%;
  .list {
    overflow: auto;
    text-overflow: ellipsis;
    }
}
 ```



 # 云平台API接口协议

基础URL有测试版和正式版<br />

- 测试版更新速度较快，正式版较为稳定
- 生产环境请使用正式版


<br />正式版: `https://api.ahusmart.com`<br />
<br />测试版: `http://apitest.ahusmart.com`<br />

<a name="5qUD9"></a>
## update 2020.06.14
正式启用https加密接口,测试版则不变<br />
<a name="QyUIs"></a>
## update 2020.06.13
**新增模板接口(增删改查)，**旧有子服务器1周后关闭
<a name="CthMk"></a>
## update 2020.06.07
**新下发通道接口**，将逐步替换旧下发通道，在未来版本中将彻底删除。

接口状态如下，✅代表完成，❌代表未完成<br />

<a name="Q3sJF"></a>
### 用户信息相关


1. 用户注册 ✅
2. 用户信息修改 ❌
3. 用户删除 ❌



<a name="0q1bL"></a>
### 登录状态


1. 用户登录 ✅
2. 用户注销 ❌



<a name="vb13v"></a>
### 产品管理


1. 创建产品 ✅
2. 查询指定产品 ✅
3. 查询产品列表 ✅
4. 更新指定产品信息 ✅
4. 删除指定产品 ✅


<br />

<a name="DsbfS"></a>
### 设备管理


1. 创建设备 ✅
2. 批量创建设备 ✅
3. 查询指定设备详情 ✅
4. 查询指定产品下所有的设备列表
5. 删除指定设备 ✅
6. 获取指定设备状态信息 ✅
6. 查询指定产品下多个设备状态信息 ✅
6. 查询指定产品下多个设备的最新一条数据✅
9. 查看指定设备的历史数据 ✅
10. 查看设备指定数量的记录 ✅
11. 更新指定设备信息 ✅
12. 查看指定设备的指定数量的报警记录 ✅
13. 查看指定设备的一段时间内的报警记录 ✅
14. 查看指定产品的所有设备指定数量的报警记录 ✅
15. 更新指定alertId报警记录的已读状态 ✅
16. 批量更新产品多个报警记录的已读状态 ✅
17. 删除产品(设备)多条报警记录 ✅
18. 删除指定设备的一段时间内的报警记录 ✅



<a name="hx7Fz"></a>
### 特殊接口


1. 下发通道 ✅
1. 新下发通道 ✅
1. 通过设备映射名称(nickname)查询 设备的所有信息 ✅
4. 通过产品key和设备key查看报警用户的信息 ✅
5. 绑定微信openid ✅
5. 解绑微信openid ✅
5. 获取微信openid所绑定的所有用户 ✅
5. 获取微信推送所需账户相关数据 ✅
5. 通过产品key和设备key更新设备参数✅



<a name="ZK5qn"></a>
## 一、用户信息相关


1. 用户注册 ✅
2. 用户信息修改 ❌
3. 用户删除 ❌



<a name="oWm6c"></a>
### 1.用户注册 ✅

<br />用户信息注册，需提供用户名密码，可选邮箱和电话，字段必须要有，值可为空，扩展信息字段默认为<br />

<a name="kzrzN"></a>
#### Request


- Method: **POST**
- URL:`/user`
- Headers：Content-Type:application/json
- Body:



```json
{
    "username" : "南沙钢",  // 不可为空
    "password" : "123456", // 不可为空
    "email":"", // 可为空
    "phone":"",  // 可为空
    "extralInfo":{
    	"wePush":false,// 默认不开通微信推送权限
      "adminPassword":"admin123"// 默认管理员密码为admin123
    }//可为空
}
```


<a name="V27Mw"></a>
#### Response


- Body



```json
{
  "code": 200,
  "data": {},
  "message": "OK"
}
```


<a name="uRThp"></a>
### 2.用户信息修改 ❌

<br />用户密码等信息修改，待做<br />

<a name="ehrlf"></a>
### 3.用户删除 ❌

<br />删除用户的所有信息及所有创建的数据<br />

<a name="rfT5Y"></a>
## 二、登录状态


1. 用户登录 ✅
2. 用户注销 ❌



<a name="IsNnL"></a>
### 1.用户登录 ✅

<br />用户登录认证，需提供用户名密码，返回token供后续请求使用<br />

<a name="yOf0V"></a>
#### Request


- Method: **POST**
- URL:`/session`
- Headers：Content-Type:application/json
- Body:



```json
{
    "username" : "南沙钢", 
    "password" : "123456"
}
```


<a name="I4z9S"></a>
#### Response


- Body



```json
{
    "code": 200,
    "msg": "ok",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IuWItuawrua1i-ivlTEiLCJwYXNzd29yZCI6IjEyMzQ1NiIsImV4cCI6MTU3NDIyNzIyNiwiaXNzIjoiQUhVIn0.aUOMfVEtQaboUdK6CcOZKWRN66fKF07yABDMFDZs5Q4"
    }
}
```


<a name="0f3f5"></a>
### 2. 用户注销 ❌

<br />清除用户的token，让用户重新登录<br />

<a name="ZPPdy"></a>
## 三、产品管理


1. 创建产品 ✅
2. 查询指定产品 ✅
3. 查询产品列表  ✅
4. 更新产品 ❌
5. 删除产品 ❌



<a name="Z1xtH"></a>
### 1.创建产品 ✅

<br />用户创建一个产品，包含以下字段

| 字段名 | 解释 | 备注 |
| --- | --- | --- |
| protocolType | 接入的协议类型，指的是接入云端的方式 | 选择：TCP、MODBUS、MQTT、HTTP等 |
| productName | 产品名称 | 必选，同一个用户下产品名不可重复 |
| productType | 产品类型 | 选择：0：直接连接设备 1：连接网关设备 |
| typeIdentify | 产品标识符 | 不为空，可以快速帮助用户识别同一种产品组合 |
| description | 描述 | 可为空，描述该产品详细信息 |
| extraInfo | 扩展信息，必须为键值对形式 | 可为空，作为产品的扩展信息 |



<a name="gNfEf"></a>
#### Request


- Method: **POST**
- URL:`/api/v1/product`
- Headers：
   - Content-Type:application/json
   - token:(登录认证时返回的token值)
- Body:



```json
{
  "protocolType": "TCP",
  "productName":"制氮产品1",
  "productType":1,
  "typeIdentify": "hezd",
  "description":"制氮+数据中心",
  "extraInfo": {
   "address": "安徽省合肥市安大新区"
  }
}
```


<a name="yhLYZ"></a>
#### Response


- Body



```json
{
    "code": 200,
    "msg": "ok",
    "data": {
        "productKey": "bnaa6kmjc9mqs9nfldu0",
        "productName": "制氮产品1",
        "productType": 1,
        "typeIdentify": "hezd",
        "protocolType": "TCP",
        "description": "",
        "createdAt": "2019-11-20T10:22:10.069503+08:00",
        "updatedAt": "2019-11-20T10:22:10.069503+08:00",
        "extraInfo": {
        "address": "安徽省合肥市安大新区"
        }
    }
}
```


<a name="dm7t2"></a>
### 2. 查询指定产品  ✅

<br />查询指定productKey的单个产品的详细信息<br />

<a name="oZ4gY"></a>
#### Request


- Method: **GET**
- URL:`/api/v1/productDetail?productKey=bnaa6kmjc9mqs9nfldu0`
- Headers：
   - token:(登录认证时返回的token值)



<a name="cu9mj"></a>
#### Response


- Body



```json
{
    "code": 200,
    "msg": "ok",
    "data": {
        "productKey": "bnaa6kmjc9mqs9nfldu0",
        "productName": "制氮产品1",
        "productType": 1,
        "typeIdentify": "N2",
        "protocolType": "TCP",
        "description": "制氮1",
        "extraInfo": {
            "address": "安徽省合肥市安大新区"
        },
        "createdAt": "2019-11-20T10:22:10+08:00",
        "updatedAt": "2019-11-20T10:22:10+08:00",
        "deviceInfo": [
            {
                "productKey": "bnaa6kmjc9mqs9nfldu0",
                "deviceKey": "bnaa7cujc9mqs9nfldug",
                "deviceName": "制氮机1号",
                "nickname": "1号",
                "netType":"4G",
                "deviceType": "N2",
                "extraInfo": {},
                "createdAt": "2019-11-20T10:23:48+08:00",
                "updatedAt": "2019-11-20T10:23:48+08:00"
            }
        ]
    }
}
```


<a name="0AxyJ"></a>
### 3. 查询产品列表  ✅

<br />查询用户所拥有的所有的产品列表<br />

<a name="INQ9i"></a>
#### Request


- Method: **GET**
- URL:`/api/v1/product`
- Headers：
   - token:(登录认证时返回的token值)



<a name="zS2HW"></a>
#### Response


- Body



```json
{
    "code": 200,
    "msg": "ok",
    "data": {
        "productInfo": [
            {
                "productKey": "bnaa6kmjc9mqs9nfldu0",
                "productName": "制氮产品1",
                "productType": 1,
                "typeIdentify": "hezd",
                "protocolType": "TCP",
                "description": "制氮1",
                "extraInfo": {},
                "createdAt": "2019-11-20T10:22:10+08:00",
                "updatedAt": "2019-11-20T10:22:10+08:00"
            },
            {
                "productKey": "bnb17cujc9mg7ql1q1b0",
                "productName": "制氮产品2",
                "productType": 1,
                "typeIdentify": "N2",
                "protocolType": "TCP",
                "description": "制氮2",
                "extraInfo": {},
                "createdAt": "2019-11-21T12:33:56+08:00",
                "updatedAt": "2019-11-21T12:33:56+08:00"
            }
        ]
    }
}
```


<a name="vE1E6"></a>
### 4. 更新指定产品信息 ✅

<br />更新指定产品信息，需要提供完整的产品信息字段,将替换数据库中的数据。注意`productKey`不可修改，其余字段可修改<br />

<a name="qFhvI"></a>
#### Request


- Method: **PUT**
- URL:`/api/v1/product`
- Headers：
   - token:(登录认证时返回的token值)
- Body:



```json
{
    "productKey": "bnkvnp455k3dh11hn1nf", // 此字段不可修改!!
    "protocolType": "NB-IOT", // 可修改
    "productName": "系统轴温产品1号",
    "productType": 1,
    "typeIdentify": "hezd",
    "description": "",
    "extraInfo": {}

}
```


<a name="qSqMt"></a>
#### Response


- Body



```json
{
    "code": 200,
    "msg": "ok",
    "data": {}
}
```


<a name="LC3Jl"></a>
### 5. 删除指定产品 ✅

<br />删除指定产品的所有信息，包括产品所拥有的设备<br />

<a name="YvEtr"></a>
#### Request


- Method: **DELETE**
- URL:`/api/v1/product?productKey=(产品key)`
- Headers：
   - token:(登录认证时返回的token值)



<a name="rX39X"></a>
#### Response


- Body



```json
{
    "code": 200,
    "msg": "ok",
    "data": {}
}
```


<a name="1SgTn"></a>
## 四、设备管理


1. 创建设备 ✅
2. 批量创建设备 ✅
3. 查询指定设备详情 ✅
4. 查询指定产品下所有的设备列表 ✅
5. 删除指定设备 ✅
6. 获取指定设备状态信息 ✅
7. 查询指定产品下多个设备状态信息 ❌
8. 查询指定产品下多个设备的最新一条数据✅
9. 查看指定设备的历史数据 ✅
10. 查看设备指定数量的记录 ✅
11. 更新指定设备信息 ✅
12. 查看指定设备的指定数量的报警记录 ✅
13. 查看指定设备的一段时间的报警记录 ❌
14. 查看指定产品的所有设备指定数量的报警记录 ✅
15. 更新指定alertId报警记录的已读状态 ✅
16. 批量更新产品多个报警记录的已读状态 ✅
17. 删除产品(设备)多条报警记录 ✅
18. 删除指定设备的一段时间内的报警记录 ✅



<a name="LF6nO"></a>
### 1.创建设备 ✅

<br />用户为指定产品创建一个设备，包含以下字段

| 字段名 | 解释 | 备注 |
| --- | --- | --- |
| deviceName | 设备名称 | 必选，不可为空，同一产品下设备名可以重复 |
| nickname | 设备映射名 | 必选， 可为空，为空则系统自动生成一个唯一id |
| netType | 网络类型 | 选择：4G、3G、NBIOT、LORA、WIFI、以太网等 |
| deviceType | 设备类型 | 必选，同类设备的标识 |
| extraInfo | 扩展信息，必须为键值对形 | 可为空，作为产品的扩展信息 |



<a name="yvG36"></a>
#### Request


- Method: **POST**
- URL: `/api/v1/device?productKey=bnaa6kmjc9mqs9nfldu0`
- Headers：
   - Content-Type:application/json
   - token:(登录认证时返回的token值)
- Body:



```json
{
    "deviceName":"制氮机1号",
    "nickname":"3423121312312",
    "netType":"4G",
    "deviceType":"N2",
    "extraInfo": {}
}
```


<a name="B48hI"></a>
#### Response


- Body



```json
{
    "code": 200,
    "msg": "ok",
    "data": {
        "productKey": "bnaa6kmjc9mqs9nfldu0",
        "deviceKey": "bnaa7cujc9mqs9nfldug",
        "deviceName": "制氮机1号",
        "nickname": "bnaa7cujc9mqs9nfldus",
        "netType":"4G", 
        "deviceType": "N2",
        "extraInfo": {},
        "createdAt": "2019-11-20T10:23:47.871657+08:00",
        "updatedAt": "2019-11-20T10:23:47.871657+08:00"
    }
}
```


<a name="cMQkE"></a>
### 2. 批量创建设备 ✅

<br />用户为指定产品创建指定数量的设备，包含以下字段

| 字段名 | 解释 | 备注 |
| --- | --- | --- |
| productKey | 产品key | 必选，同一产品下的设备名不可重复 |
| deviceCount | 需创建设备数量 | 必选，大于0小于10，为正整数 |
| deviceType | 设备类型 | 可选，同类设备的标识 |



<a name="2GUXY"></a>
#### Request


- Method: **POST**
- URL: `/api/v1/batchDevice`
- Headers：
   - Content-Type:application/json
   - token:(登录认证时返回的token值)
- Body:



```json
{
    "productKey":"bnaa6kmjc9mqs9nfldu0",
    "deviceCount":2,
    "netType":"4G",
    "deviceType":"测试氮气",
    "extraInfo": {}
}
```


<a name="OI2aa"></a>
#### Response


- Body



```json
{
    "code": 200,
    "msg": "ok",
    "data": {
      "deviceInfo": [
        {
        "productKey": "bnaa6kmjc9mqs9nfldu0",
        "deviceKey": "bn9ukq6jc9mp33ob25cg",
        "deviceName": "bn9ukq6jc9mp33ob25cg",
        "nickname": "bn9ukq6jc9mp33ob25cs",
        "netType":"4G", 
        "deviceType": "测试氮气",
        "extraInfo": {},
        "createdAt": "2019-11-20T10:23:47.871657+08:00",
        "updatedAt": "2019-11-20T10:23:47.871657+08:00"
        },
        {
        "productKey": "bnaa6kmjc9mqs9nfldu0",
        "deviceKey": "bn9ukqejc9mp33ob25d0",
        "deviceName": "bn9ukqejc9mp33ob25d0",
        "nickname": "bn9ukq6jc9mp33ob25ds",
        "netType":"4G", 
        "deviceType": "测试氮气",
        "extraInfo": {},
        "createdAt": "2019-11-20T10:23:47.871657+08:00",
        "updatedAt": "2019-11-20T10:23:47.871657+08:00"
        }  
      ]
    }
}
```


<a name="eq4K1"></a>
### 3. 查询指定设备详情 ✅

<br />查看指定设备的详情，包含各种信息<br />

<a name="Ssy2o"></a>
#### Request


- Method: **GET**
- URL: `/api/v1/deviceDetail?productKey=bnaa6kmjc9mqs9nfldu0&deviceKey=bnaa7cujc9mqs9nfldug`
- Headers：
   - token:(登录认证时返回的token值)



<a name="uX8lu"></a>
#### Response


- Body



```json
{
    "code": 200,
    "msg": "ok",
    "data": {
        "productKey": "bnaa6kmjc9mqs9nfldu0",
        "deviceKey": "bnaa7cujc9mqs9nfldug",
        "deviceName": "制氮机1号",
        "nickname": "bnaa7cujc9mqs9nfldus",
        "netType":"4G", 
        "deviceType": "N2",
        "extraInfo": {},
        "createdAt": "2019-11-20T10:23:48+08:00",
        "updatedAt": "2019-11-20T10:23:48+08:00"
    }      
}
```


<a name="pfmBE"></a>
### 4. 查询指定产品下所有的设备列表 ✅


<a name="72HfM"></a>
#### Request


- Method: **GET**
- URL: `/api/v1/productDetail?productKey=bnaa6kmjc9mqs9nfldu0`
- Headers：
   - token:(登录认证时返回的token值)



<a name="XiPyX"></a>
#### Response


- Body



```json
{
    "code": 200,
    "msg": "ok",
    "data": {
        "deviceInfo": [{
            "productKey": "bnaa6kmjc9mqs9nfldu0",
            "deviceKey": "bnaa7cujc9mqs9nfldug",
            "deviceName": "制氮机1号",
            "nickname": "bnaa7cujc9mqs9nfldus",
            "netType":"4G",
            "deviceType": "N2",
            "extraInfo": {},
            "createdAt": "2019-11-20T10:23:48+08:00",
            "updatedAt": "2019-11-20T10:23:48+08:00"
        }]
    }
}
```


<a name="5T7KU"></a>
### 5. 删除指定设备 ✅

<br />删除指定产品的指定设备信息<br />

<a name="ts0ux"></a>
#### Request


- Method: **DELETE**
- URL:`/api/v1/device?productKey=(产品key)&deviceKey=(设备key)`
- Headers：
   - token:(登录认证时返回的token值)



<a name="xLhHT"></a>
#### Response


- Body



```json
{
    "code": 200,
    "msg": "ok",
    "data": {}
}
```


<a name="IAXl2"></a>
### 6. 获取指定设备状态信息

<br />设备的状态信息<br />

<a name="ZTeta"></a>
#### Request


- Method: **GET**
- URL: `/api/v1/deviceStatus?deviceKey=bnaa7cujc9mqs9nfldug`
- Headers：
   - token:(登录认证时返回的token值)



<a name="ZcMc6"></a>
#### Response


- Body



```json
{
    "code": 200,
    "msg": "ok",
    "data": {
              "productKey": "bnaa6kmjc9mqs9nfldu0",
              "deviceKey": "bnaa7cujc9mqs9nfldug",
      				"deviceName": "测温1号点",
              "status":"online",
              "time":1574648328, //unix秒
              "date":"2019/11/25 10:18:48",
              "extraInfo":{}
    }
}
```


<a name="auLQT"></a>
### 7. 查询指定产品下多个设备状态信息
同时查看同一产品下多个设备的最新状态信息

<a name="tL4MQ"></a>
#### Request


- Method:POST
- URL: `/api/v1/batchDeviceStatus`
- Headers：
   - token:(登录认证时返回的token值)
- Body
```json
{
	"productKey":"bnu529s55k3906o0f1f0",
	"deviceKeyList":["bnu536s55k3906o0f1fg","bnu53ck55k3906o0f1g0"]
}
```


<a name="X2OZM"></a>
#### Response


- Body



```json
{
    "code": 200, 
    "msg": "ok", 
    "data": {
        "deviceStatus": [
            {
                "productKey": "bnu529s55k3906o0f1f0", 
                "deviceKey": "bnu53ck55k3906o0f1g0", 
                "deviceName": "双路测温-5号", 
                "status": "online", 
                "time": 1585670402, 
                "date": "2020-04-01 00:00:02", 
                "extraInfo": { }
            }, 
            {
                "productKey": "bnu529s55k3906o0f1f0", 
                "deviceKey": "bnu536s55k3906o0f1fg", 
                "deviceName": "双路测温-3号", 
                "status": "online", 
                "time": 1585670402, 
                "date": "2020-04-01 00:00:02", 
                "extraInfo": { }
            }
        ]
    }
}
```
<a name="7a4GR"></a>
### 8. 查询指定产品下多个设备的最新一条数据✅

<br />查看用户指定产品下多个设备的最新一条数据,注意**设备数据格式应该与产品子系统协商制定**，以下仅供参考<br />

<a name="8kWco"></a>
#### Request


- Method: **POST**
- URL: `/api/v1/batchDeviceData`
- Headers：
   - token:(登录认证时返回的token值)
- Body



```json
{
  "productKey":"bnkvnp455k3dh11hn1ng",
  "deviceKeyList":["bnkvqa455k3dh11hn1qg","bnkvqa455k3dh11hn1sg"]
}
```


<a name="QKabC"></a>
#### Response


- Body



```json
{
    "code": 200,
    "msg": "ok",
    "data": {
        "deviceData": [
            {
                "date": "2020-03-20 13:50:00",
                "deviceKey": "bnkvqa455k3dh11hn1qg",
                "deviceName": "测温6号点",
                "envirTemp": 20.3,
                "productKey": "bnkvnp455k3dh11hn1ng",
                "rssi": 62,
                "time": 1584683400,
                "vbat": 95,
                "zhouchenTemp": 20.3
            },
            {
                "date": "2020-03-20 14:00:00",
                "deviceKey": "bnkvqa455k3dh11hn1sg",
                "deviceName": "1-10轴承01号",
                "envirTemp": 20.7,
                "productKey": "bnkvnp455k3dh11hn1ng",
                "rssi": 62,
                "time": 1584684000,
                "vbat": 100,
                "zhouchenTemp": 20.4
            }
        ]
    }
}
```


<a name="aRX11"></a>
### 9. 查看指定设备的历史数据 ✅

<br />查看用户指定设备的历史数据，注意**设备数据格式应该与产品子系统协商制定**，以下仅供参考<br />

<a name="WyIWY"></a>
#### Request


- Method: **POST**
- URL: `/api/v1/historyData`
- Headers：
   - token:(登录认证时返回的token值)
- Body



```json
{
  "deviceKey":"bnkvqa455k3dh11hn1sg",
  "startTime":1584682320, // 开始时间
  "endTime":1584684000, // 截止时间，一定要大于起始时间
  "asc":0 // 0 逆序 1 升序
}
```


<a name="VwgEH"></a>
#### Response


- Body



```json
{
    "code": 200,
    "msg": "ok",
    "data": {
        "deviceData": [
            {
                "date": "2020-03-20 14:00:00",
                "deviceKey": "bnkvqa455k3dh11hn1sg",
                "deviceName": "1-10轴承01号",
                "envirTemp": 20.7,
                "productKey": "bnkvnp455k3dh11hn1ng",
                "rssi": 62,
                "time": 1584684000,
                "vbat": 100,
                "zhouchenTemp": 20.4
            },
            {
                "date": "2020-03-20 13:58:00",
                "deviceKey": "bnkvqa455k3dh11hn1sg",
                "deviceName": "1-10轴承01号",
                "envirTemp": 20.6,
                "productKey": "bnkvnp455k3dh11hn1ng",
                "rssi": 62,
                "time": 1584683880,
                "vbat": 100,
                "zhouchenTemp": 20.3
            }
        ]
    }
}
```


<a name="OKuXu"></a>
### 10. 查看设备指定数量的记录 ✅

<br />通常用来查看设备的最近几条数据记录<br />

<a name="gryp0"></a>
#### Request


- Method: **POST**
- URL: `/api/v1/recentData`
- Headers：
   - token:(登录认证时返回的token值)
- Body



```json
{
  "deviceKey":"bnkvqa455k3dh11hn1qg",
  "num":2, // 指定数量，最小值为1
  "asc":0
}
```


<a name="TI1Mc"></a>
#### Response


- Body



```json
{
    "code": 200,
    "msg": "ok",
    "data": {
        "deviceData": [
            {
                "date": "2020-03-20 14:20:00",
                "deviceKey": "bnkvqa455k3dh11hn1qg",
                "deviceName": "测温6号点",
                "envirTemp": 20.5,
                "productKey": "bnkvnp455k3dh11hn1ng",
                "rssi": 62,
                "time": 1584685200,
                "vbat": 95,
                "zhouchenTemp": 20.4
            },
            {
                "date": "2020-03-20 14:18:00",
                "deviceKey": "bnkvqa455k3dh11hn1qg",
                "deviceName": "测温6号点",
                "envirTemp": 20.5,
                "productKey": "bnkvnp455k3dh11hn1ng",
                "rssi": 62,
                "time": 1584685080,
                "vbat": 95,
                "zhouchenTemp": 20.4
            }
        ]
    }
}
```


<a name="T1glH"></a>
### 11. 更新指定设备信息 ✅

<br />更新指定设备信息，需要提供完整的产品信息字段,将替换数据库中的数据。注意`productKey`、`deviceKey`不可修改，其余字段可修改<br />

<a name="bmgly"></a>
#### Request


- Method: **PUT**
- URL:`/api/v1/device`
- Headers：
   - token:(登录认证时返回的token值)
- Body:



```json
{
    "productKey": "bnkvnp455k3dh11hn1na",
    "deviceKey": "bnkvqa455k3dh11hnaa",
    "deviceName": "测温5号点",
    "nickname": "89860415151840199917000121",
    "netType": "TCP",
    "deviceType": "无线智能采集终端",
    "extraInfo": {}

}
```


<a name="2QoUp"></a>
#### Response


- Body



```json
{
    "code": 200,
    "msg": "ok",
    "data": {}
}
```


<a name="WjmXZ"></a>
#### Response error


- Body



```json
{
    "code": 20013,
    "msg": "设备名或设备映射名已存在",
    "data": {}
}
```


<a name="2g320"></a>
### 12. 查看指定设备的指定数量的报警记录 ✅

<br />考虑到数据记录量较大，一次性可能返回不完全，提供分页查询接口<br />

<a name="YcI1N"></a>
#### Request


- Method: **POST**
- URL:`/api/v1/alertPagination`
- Headers：
   - token:(登录认证时返回的token值)
- Body:



```json
{
    "productKey":"bnkvnp455k3dh11hn1nf1",
    "deviceKey":"bnkvqa455k3dh11hnaa2",
    "pageIndex":1, // 页号
    "pageSize": 2, // 每页数量
    "asc": 0   //0降序，即从大到小 1 升序
}
```


<a name="bTM8k"></a>
#### Response


- Body



```json
{
    "code": 200,
    "msg": "ok",
    "data": {
        "alertInfo": [{
                "productKey": "bnkvnp455k3dh11hn1nf1",
                "deviceKey": "bnkvqa455k3dh11hnaa2",
                "deviceName": "测温1号点",
                "unRead": false,
                "alertId": "1578555172111",
                "method": "1",
                "subject": "报警",
                "level": "严重",
                "content": "1号仓有问题",
                "time": 1578555172,
                "date": "2020/1/9 15:32:52",
                "extraInfo": {}
            },
            {
                "productKey": "bnkvnp455k3dh11hn1nf1",
                "deviceKey": "bnkvqa455k3dh11hnaa2",
                "deviceName": "测温1号点",
                "unRead": false,
                "alertId": "1578555168000",
                "method": "1",
                "subject": "报警",
                "level": "严重",
                "content": "1号仓有问题",
                "time": 1578555168,
                "date": "2020/1/9 15:32:48",
                "extraInfo": {}
            }
        ],
        "current":2,
        "total":100
    }
}
```


<a name="mYYka"></a>
### 13. 查看指定设备的指定时间范围内的报警记录


<a name="HdKZz"></a>
#### Request


- Method: **POST**
- URL:`/api/v1/alertTimeLimit`
- Headers：
   - token:(登录认证时返回的token值)
- Body:



```json
{
    "productKey":"bnkvnp455k3dh11hn1nf1",
    "deviceKey":"bnkvqa455k3dh11hnaa2",
    "startTime":1578555150, // unix秒
    "endTime":1578555180,
    "asc":0 // 0倒序，1正序

}
```

<br />返回字段说明

| 字段名 | 解释 | 备注 |
| --- | --- | --- |
| unRead | 是否已读 | true(未读) or false(已读) |
| alertId | 报警记录id | 唯一id |
| method | 报警方式 | 0(只存储)、1(email)、2(wechat)、4(全部方式)等 |
| subject | 报警主题 | 标题概括内容 |
| level | 报警级别 | 有通知、预警、严重、紧急四个级别 |
| content | 报警内容 | 详细内容 |
| time | 报警时间 | unix秒 |
| date | 日期 | time字段所对应的日期字符串形式 |
| extraInfo | 扩展信息，必须为键值对形 | 可为空，扩展信息 |



<a name="XAm19"></a>
#### Response


- Body



```json
{
    "code": 200,
    "msg": "ok",
    "data": {
        "alertInfo": [{
                "productKey": "bnkvnp455k3dh11hn1nf1",
                "deviceKey": "bnkvqa455k3dh11hnaa2",
                "deviceName": "测温1号点",
                "unRead": false,
                "alertId": "1578555172111",
                "method": "1",
                "subject": "报警",
                "level": "严重",
                "content": "1号仓有问题",
                "time": 1578555172,
                "date": "2020/1/9 15:32:52",
                "extraInfo": {}
            },
            {
                "productKey": "bnkvnp455k3dh11hn1nf1",
                "deviceKey": "bnkvqa455k3dh11hnaa2",
                "deviceName": "测温1号点",
                "unRead": false,
                "alertId": "1578555168000",
                "method": "1",
                "subject": "报警",
                "level": "严重",
                "content": "1号仓有问题",
                "time": 1578555168,
                "date": "2020/1/9 15:32:48",
                "extraInfo": {}
            }
        ],
        "total": 2
    }
}
```


<a name="XcCx0"></a>
### 14. 查看指定产品的所有设备指定数量的报警记录 ✅

<br />产品的多个设备报警记录按照存储的先后顺序取出，考虑到数据记录量较大，一次性可能返回不完全，提供分页查询接口<br />

<a name="Ty2UF"></a>
#### Request


- Method: **POST**
- URL:`/api/v1/productAlertInfo`
- Headers：
   - token:(登录认证时返回的token值)
- Body:



```json
{
    "productKey":"bnkvnp455k3dh11hn1nf1",
    "pageIndex":1, // 页号
    "pageSize": 2, // 每页数量
    "asc":0 // 0倒序，1正序

}
```


<a name="BjPBe"></a>
#### Response


- Body



```json
{
    "code": 200,
    "msg": "ok",
    "data": {
        "alertInfo": [{
                "productKey": "bnkvnp455k3dh11hn1nf1",
                "deviceKey": "bnkvqa455k3dh11hnaa2",
                "deviceName": "测温1号点",
                "unRead": false,
                "alertId": "1578555172111",
                "method": "1",
                "subject": "报警",
                "level": "严重",
                "content": "1号仓有问题",
                "time": 1578555172,
                "date": "2020/1/9 15:32:52",
                "extraInfo": {}
            },
            {
                "productKey": "bnkvnp455k3dh11hn1nf1",
                "deviceKey": "bnkvqa455k3dh11hnaa2",
                "deviceName": "测温1号点",
                "unRead": false,
                "alertId": "1578555168000",
                "method": "1",
                "subject": "报警",
                "level": "严重",
                "content": "1号仓有问题",
                "time": 1578555168,
                "date": "2020/1/9 15:32:48",
                "extraInfo": {}
            }
        ],
        "current":2,
        "total":100
    }
}
```


<a name="8hABR"></a>
### 15. 更新指定alertId报警记录的已读状态 ✅

<br />对报警记录已读状态进行更改<br />

<a name="jE9oc"></a>
#### Request


- Method: **POST**
- URL:`/api/v1/alertStatus`
- Headers：
   - token:(登录认证时返回的token值)
- Body:



```json
{
    "productKey":"bnkvnp455k3dh11hn1nf1",//指定产品key
    "alertId": "1578555278" // 获取的alertId

}
```


<a name="8flvx"></a>
#### Response


- Body



```json
{
    "code": 200,
    "msg": "ok",
    "data": {}
}
```
<a name="u1kiw"></a>
### 16. 批量更新产品多个报警记录的已读状态 ✅

<br />对同一产品的多个报警记录已读状态进行更改<br />

<a name="YYKLI"></a>
#### Request


- Method: **POST**
- URL:`/api/v1/productAlertInfos`
- Headers：
   - token:(登录认证时返回的token值)
- Body:



```json
{
    "productKey":"bnkvnp455k3dh11hn1ng",
    "alertIds":["1578997272349716400","1578997636000905900"]

}
```


<a name="YXyHx"></a>
#### Response


- Body



```json
{
    "code": 200,
    "msg": "ok",
    "data": {}
}
```


<a name="McV9j"></a>
### 17. 删除产品(设备)多条报警记录 ✅

<br />删除同一产品下的多条报警记录，可用作删除同产品下同一设备的多条记录或者删除同产品下不同设备的多条记录<br />

<a name="Rqdtr"></a>
#### Request


- Method: **DELETE**
- URL:`/api/v1/productAlertInfos`
- Headers：
   - token:(登录认证时返回的token值)
- Body:



```json
{
    "productKey":"bnkvnp455k3dh11hn1ng",
    "alertIds":["1578997272349716400","1578997636000905900"]

}
```


<a name="3EEwz"></a>
#### Response


- Body



```json
{
    "code": 200,
    "msg": "ok",
    "data": {
        "deleted": 2
    }
}
```


<a name="ZbElm"></a>
### 18. 删除指定设备的一段时间内的报警记录 ✅

<br />删除指定设备指定时间范围内的所有报警记录<br />

<a name="MT2vw"></a>
#### Request


- Method: **DELETE**
- URL:`/api/v1/alertTimeLimit`
- Headers：
   - token:(登录认证时返回的token值)
- Body:



```json
{
    "productKey":"bnkvnp455k3dh11hn1ng",
    "deviceKey":"bnkvqa455k3dh11hn1og",
    "startTime":1578555150,
    "endTime":1578555180,
    "asc":0

}
```


<a name="G6hiL"></a>
#### Response


- Body



```json
{
    "code": 200,
    "msg": "ok",
    "data": {
        "deleted": 1
    }
}
```
<a name="ozr6K"></a>
## 五、模板接口
提供模板，用于快速注册设备，省时又省力

1. 增加设备模板 ✅
1. 通过设备类型(devicetype)查询设备模板 ✅
1. 查询所有设备模板信息 ✅
1. 通过设备类型(devicetype)修改设备模板 ✅
1. 通过设备类型(devicetype)删除设备模板 ✅



<a name="BEZa1"></a>
### 1.增加设备模板  ✅
仅提供用于设备管理平台<br />此接口暂不需要鉴权认证<br />

<a name="RweDw"></a>
#### Request


- Method: **POST**
- URL: `/api/v1/formwork`
- Headers：
- Body:



```json
{
    "deviceName": "",
    "nickname": "",
    "netType": "",
    "deviceType": "NB7132",
    "extraInfo": {
                "collectRate": {
                      "adminEditable": "true",
                      "adminVisible": "true",
                      "Name": "轴承采集频率",
                      "userEditable": "true",
                      "userVisible": "true",
                      "Value": "3"
                              }
            	}

}
```
<a name="w8Iq3"></a>
#### Response


- Body



```json
{
    "code": 200,
    "msg": "ok",
    "data": {}
 }
```


- Body 失败的时候



```json
{
    "code": 20022,
    "msg": "设备类型已存在",
    "data": {}
}
```
<a name="aVUIr"></a>
## 
<a name="rLfvp"></a>
### 2.通过设备类型(devicetype)查询设备模板 ✅
提供查询设备模板功能，用于快速添加设备<br />此接口暂不需要鉴权认证<br />
<br />查询参数字段说明

| 字段名 | 解释 | 备注 |
| --- | --- | --- |
| devicetype | 设备类型 | 现有NB7132、NB7122、chuchen<br /> |

<a name="H92Ym"></a>
#### Request


- Method: **GET**
- URL: `/api/v1/formwork?devicetype=NB7132`
- Headers：
- Body:



<a name="z7Q5K"></a>
#### Response


- Body



```json
{
    "code": 200,
    "msg": "ok",
    "data": {
    				"deviceName": "",
        		"nickname": "",
        		"netType": "",
        		"deviceType": "NB7132",
     			  "createdAt": "2020-06-12T07:22:19.994Z",
          	"updatedAt": "2020-06-13T08:21:12.91Z",
        		"extraInfo": {
            					"collectRate": {
               								 	"adminEditable": "true",
                                "adminVisible": "true",
                                "Name": "轴承采集频率",
                                "userEditable	": "true",
                                "userVisible": "true",
                                "Value": "3"
           								         }
            							}
            }
 }
```


- Body 失败的时候



```json
{
    "code": 20010,
    "msg": "未找到记录",
    "data": {}
}
```


<a name="BSc0o"></a>
### 3.查询所有设备模板信息 ✅
仅提供用于设备管理平台<br />此接口暂不需要鉴权认证<br />

<a name="o95p6"></a>
#### Request


- Method: **GET**
- URL: `/api/v1/allFormworkDetail`
- Headers：
- Body:



<a name="nc4OI"></a>
#### Response


- Body



```json
{
    "code": 200,
    "msg": "ok",
    "data": [
               {
                "deviceName": "",
                "nickname": "",
                "netType": "",
                "deviceType": "NB7132",
                "createdAt": "2020-06-12T07:22:19.994Z",
                "updatedAt": "2020-06-13T08:21:12.91Z",
                "extraInfo": {
                          "collectRate": {
                                    "adminEditable": "true",
                                    "adminVisible": "true",
                                    "Name": "轴承采集频率",
                                    "userEditable	": "true",
                                    "userVisible": "true",
                                    "Value": "3"
                                       }
                              }

                },
              {
                "deviceName": "",
                "nickname": "",
                "netType": "",
                "deviceType": "NB7122",
                "createdAt": "2020-06-12T07:22:19.994Z",
                "updatedAt": "2020-06-13T08:21:12.91Z",
                "extraInfo": {
                          "collectRate": {
                              "Name": "轴承采集频率",
                              "Value": "3",
                              "adminEditable": true,
                              "adminVisible": true,
                              "userEditable": true,
                              "userVisible": true
                                    }
                          }
               }
          ]
 }
```


<a name="M4dxZ"></a>
### 4.通过设备类型(devicetype)修改设备模板 ✅
仅提供用于设备管理平台<br />此接口暂不需要鉴权认证<br />

<a name="0M4X5"></a>
#### Request


- Method: **PUT**
- URL: `/api/v1/formwork?devicetype=NB7132`
- Headers：
- Body:



```json
{
    "deviceName": "",
    "nickname": "",
    "netType": "",
    "deviceType": "NB7132",
    "extraInfo": {
                "collectRate": {
                      "adminEditable": "true",
                      "adminVisible": "true",
                      "Name": "轴承采集频率",
                      "userEditable": "true",
                      "userVisible": "true",
                      "Value": "30"
                              }
            	}

}
```
<a name="WF8KI"></a>
#### Response
<a name="6isui"></a>
#### Response


- Body



```json
{
    "code": 200,
    "msg": "ok",
    "data": {
    				"deviceName": "",
        		"nickname": "",
        		"netType": "",
        		"deviceType": "NB7132",
     			  "createdAt": "2020-06-12T07:22:19.994Z",
          	"updatedAt": "2020-06-13T08:21:12.91Z",
        		"extraInfo": {
            					"collectRate": {
               								 	"adminEditable": "true",
                                "adminVisible": "true",
                                "Name": "轴承采集频率",
                                "userEditable	": "true",
                                "userVisible": "true",
                                "Value": "30"
           								         }
            							}
            }
 }
```


- Body 失败的时候



```json
{
    "code": 20010,
    "msg": "未找到记录",
    "data": {}
}
```
<a name="GvVSX"></a>
### 5.通过设备类型(devicetype)删除设备模板✅
仅提供用于设备管理平台<br />此接口暂不需要鉴权认证<br />

<a name="JMEvG"></a>
#### Request


- Method: **DELETE**
- URL: `/api/v1/formwork?devicetype=NB7132`
- Headers：
- Body:



```json
{
    "deviceName": "",
    "nickname": "",
    "netType": "",
    "deviceType": "NB7132",
    "extraInfo": {
                "collectRate": {
                      "adminEditable": "true",
                      "adminVisible": "true",
                      "Name": "轴承采集频率",
                      "userEditable": "true",
                      "userVisible": "true",
                      "Value": "30"
                              }
            	}

}
```
<a name="RySKa"></a>
#### Response
<a name="fW7w5"></a>
#### Response


- Body



```json
{
    "code": 200,
    "msg": "ok",
    "data": {}
}
```


- Body 失败的时候



```json
{
    "code": 20010,
    "msg": "未找到记录",
    "data": {}
}
```


<a name="xZpYX"></a>
## 六、特殊接口

<br />提供应用层如Android、WEB到产品子系统自订协议的实现<br />
<br />

1. 下发通道 ✅
1. 新下发通道 ✅
1. 通过设备映射名称(nickname)查询 设备的所有信息 ✅
1. 通过产品key和设备key查看报警用户的信息 ✅
1. 绑定微信openid ✅
1. 解绑微信openid ✅
1. 获取微信openid所绑定的所有用户 ✅
1. 获取微信推送所需账户相关数据 ✅
1. 通过产品key和设备key更新设备参数✅



<a name="pOHS3"></a>
### 1.下发通道 ✅

<br />`/api/v1/downRaw?productKey=(指定的productKey)&bodyType=(默认json)&timeout=(默认1s)`<br />
<br />查询参数字段说明

| 字段名 | 解释 | 备注 |
| --- | --- | --- |
| productKey | 产品key | 必选 |
| bodyType | 期望返回的body的数据类型 | 可选,json、string，默认为json |
| timeout | 最长等待返回时间 | 可选，默认为1秒 |



<a name="OkncA"></a>
#### Request


- Method: **POST**
- URL: `/api/v1/downRaw?productKey=bnaa6kmjc9mqs9nfldu0&bodyType=json&timeout=2`
- Headers：
   - token:(登录认证时返回的token值)
- Body:



```json
自定义数据类型
```


<a name="0Huyf"></a>
#### Response


- Body



```json
根据bodyType会返回对应的数据类型，如json，则返回json格式数据
```

<br />

<a name="GvFyl"></a>
### 2.新下发通道 ✅

<br />`/api/v1/newDownRaw?deviceType=(设备类型)&bodyType=(默认json)&timeout=(默认1s)`<br />
<br />查询参数字段说明

| 字段名 | 解释 | 备注 |
| --- | --- | --- |
| deviceType | 设备类型 | 必选，与定义的设备类型保持一致 |
| bodyType | 期望返回的body的数据类型 | 可选,json、string，默认为json |
| timeout | 最长等待返回时间 | 可选，默认为1秒 |


<br />目前支持的设备类型如下，NB7132、NB7122、chuchen (???)
<a name="JRd6t"></a>
#### Request


- Method: **POST**
- URL: `/api/v1/newDownRaw?deviceType=NB7132&bodyType=json&timeout=2`
- Headers：
   - token:(登录认证时返回的token值)
- Body:



```json
自定义数据类型
```


<a name="yhLca"></a>
#### Response


- Body



```json
根据bodyType会返回对应的数据类型，如json，则返回json格式数据
```
<a name="d5fYV"></a>
### 3.通过设备映射名称(nickname)查询 设备的所有信息 ✅

<br />为产品子系统反查设备信息准备，无需产品子系统提前录入信息<br />如 轴承测温在创建设备时填写好nickname 为对应轴承设备的 sim卡id<br />！！！此接口不需要鉴权认证<br />

<a name="Pj7PH"></a>
#### Request


- Method: **GET**
- URL: `/api/v1/nickInfo?nickname=898604151518401999170001`
- Headers：
- Body:



<a name="39fAu"></a>
#### Response


- Body



```json
{
    "code": 200,
    "msg": "ok",
    "data": {
        "productKey": "bnkvnp455k3dh11hn1ng",
        "deviceKey": "bnkvqa455k3dh11hn1o0",
        "deviceName": "测温1号点",
        "nickname": "898604151518401999170001",
        "netType": "TCP",
        "deviceType": "中谷轴承",
        "extraInfo": {},
        "createdAt": "2019-12-06T07:03:04+08:00",
        "updatedAt": "2019-12-06T07:03:04+08:00"
    }
}
```


- Body 失败的时候



```json
{
    "code": 404,
    "msg": "fail",
    "data": "无此nickname信息"
}
```


<a name="1MuSA"></a>
### 4.通过产品key和设备key查看报警用户的信息 ✅

<br />为报警消息处理队列提供查询接口，共有 productKey 和 deviceKey 两个查询参数<br />

<a name="j5VsR"></a>
#### Request


- Method: **GET**
- URL: `/api/v1/userInfo?productKey=bnkvnp455k3dh11hn1ng&deviceKey=bnkvqa455k3dh11hn1o0`
- Headers：
- Body:



<a name="2We8Y"></a>
#### Response


- Body



```json
{
    "code": 200,
    "msg": "ok",
    "data": {
        "username": "弘恩轴承",
        "phone": "",
        "email": "",
        "wechat": ["oiEb5wAG-5DYma4-oKA-9-0M9t38"]
    }
}
```


<a name="fATIn"></a>
### 5. 绑定微信openid ✅

<br />用户绑定微信openid<br />

<a name="Y8kqG"></a>
#### Request


- Method: **POST**
- URL: `/api/v1/wechat`
- Headers：
- Body:



```json
{
   "username":"系统测试",
   "password":"1234",
   "wechat":"oiEb5wAG-5DYma4-oKA-9-0M9t38"
}
```


<a name="mR5x7"></a>
#### Response


- Body



```json
{
    "code": 200,
    "msg": "ok",
    "data": {}
}
```


<a name="V2WMK"></a>
### 6. 解绑微信openid ✅

<br />用户解绑微信<br />

<a name="llx54"></a>
#### Request


- Method: **DELETE**
- URL: `/api/v1/wechat`
- Headers：
- Body:



```json
{
   "username":"系统测试",
   "wechat":"oiEb5wAG-5DYma4-oKA-9-0M9t38"
}
```


<a name="0zegb"></a>
#### Response


- Body



```json
{
    "code": 200,
    "msg": "ok",
    "data": {}
}
```


<a name="1Q0a6"></a>
### 7. 获取微信openid所绑定的所有用户 ✅

<br />一个微信用户可绑定多个云平台账户，通过openid可查询到所绑定的云平台账户名<br />

<a name="fwrGC"></a>
#### Request


- Method: **GET**
- URL: `/api/v1/wechat?openID=xxx`



<a name="KTXf7"></a>
#### Response


- Body



```json
{
    "code": 200,
    "msg": "ok",
    "data": [
        "系统测试",
        "系统测试1"
    ]
}
```


<a name="MJHaU"></a>
### 8. 获取微信推送所需账户相关数据 ✅

<br />提供微信推送需要的用户名、openID列表、产品名、设备名信息.<br />
<br />查询参数为 `productKey` 和 `deviceKey`<br />

<a name="kFMoy"></a>
#### Request


- Method: **GET**
- URL: `/api/v1/wechatPush?productKey=xxx&deviceKey=xxx`



<a name="AoVIz"></a>
#### Response


- Body



```json
{
    "code": 200,
    "msg": "ok",
    "data": {
        "username": "系统测试1",
        "wechat": [
            "oiEb5wAG-5DYma4-oKA-9-0M9t38",
            "oiEj5vAG-632f21-pKA-7-6M9t38"
        ],
        "productName": "系统轴温产品1号",
        "deviceName": "测温3号点"
    }
}
```
<a name="jYWYq"></a>
### 9.通过产品key和设备key更新设备参数 ✅

<br />为产品子系统提供特殊接口，用于更新设备的一些参数(必须完全按照各个设备的协议上传，云平台不做判断)<br />

<a name="zyE2V"></a>
#### Request
| 字段名 | 解释 | 备注 |
| --- | --- | --- |
| productKey | 产品key | 必选 |
| deviceKey | 设备key | 必选 |
| extraInfo | 扩展信息(产品参数信息)，必须为键值对形 | 必选，必须做到原有字段全部上传，只会覆盖无法替换 |

- Method: **PUT**
- URL: `/api/v1/deviceparamdata`
- Headers：
- Body:

例：轴承测温，扩展信息只会存储vbat的信息<br />

```json
{
    "productKey": "bnkvnp455k3dh11hn1ng",
    "deviceKey": "bq7944t6osbtkeeejqqq",
    "extraInfo": {
                        "vbat": {
                            "userVisible": false,
                            "Name": "电量最低值",
                            "Value": "20",
                            "adminEditable": true,
                            "adminVisible": true,
                            "userEditable": true
                        }
                   }

}

```
<a name="5qyHL"></a>
#### Response


- Body



```json
{
    "code": 200,
    "msg": "ok",
    "data": {}
}
```

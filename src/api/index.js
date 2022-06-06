import request from '@/utils/request'
import {
  getName
} from "@/utils/auth";


export function login(data) {
  return request({
    url: '/session',
    method: 'post',
    data
  })
}



//创建产品
export function CreateProduct(payload) {
  return request({
    url: '/api/v1/product',
    method: 'post',
    headers: {

      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: {
      "productName": payload.productName,
      "protocolType": payload.protocolType,
      "productType": payload.productType,
      "extraInfo": payload.extraInfo,
      "typeIdentify": payload.typeIdentify,
      "description": payload.description
    },
  })
}

//查询产品列表
export async function ProductNum(payload) {
  return await request({
    url: '/api/v1/product',
    method: 'get',
    headers: {

    }
  })
}

//查询指定产品
export async function ProductOne(payload) {
  return await request({
    url: '/api/v1/productDetail',
    method: 'get',
    params: {
      "productKey": payload
    }
  })
}

//删除指定产品
export function Delete_product(payload) {
  return request({
    url: '/api/v1/product',
    method: 'DElETE',

    params: {
      "productKey": payload.productKey
    }
  })
}

//更新指定产品
export function updated_product(payload) {
  return request({
    url: '/api/v1/product',
    method: 'put',

    data: {
      "productKey": payload.productKey,
      "productName": payload.productName,
      "protocolType": payload.protocolType,
      "productType": payload.productType,
      "extraInfo": payload.extraInfo,
      "typeIdentify": payload.typeIdentify,
      "description": payload.description
    },
  })
}
//查询指定产品的设备列表
export function inquire_device(payload) {
  return request({
    url: '/api/v1/batchDeviceDetail',
    method: 'get',

    params: {
      "productKey": "bnaa6kmjc9mqs9nfldu0"
    }
  })
}


// 创建设备
export function CreateDevice(productKey,payload) {
  return request({
    url: '/api/v1/device',
    method: 'post',
    headers: {

      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: {
      "productKey": productKey
    },
    data: {
      "deviceName": payload.deviceName,
      "nickname": payload.nickname,
      "netType": payload.netType,
      "deviceType": payload.deviceType,
      "extraInfo": payload.extraInfo
    },
  })
}
// 更新设备
export function updated_device(payload) {
  return request({
    url: '/api/v1/device',
    method: 'put',
    headers: {

      'Content-Type': 'application/x-www-form-urlencoded'
    },

    data: {
      "productKey": payload.productKey,
      "deviceKey": payload.deviceKey,
      "deviceName": payload.deviceName,
      "nickname": payload.nickname,
      "netType": payload.netType,
      "deviceType": payload.deviceType,
      "extraInfo": payload.extraInfo
    },
  })
}

// 批量创建设备
export function CreateMoreDevice(payload) {
  return request({
    url: '/api/v1/batchDevice',
    method: 'post',
    headers: {

      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: {
      "productKey": payload.productKey,
      "deviceCount": payload.deviceCount,
      "netType": payload.netType,
      "deviceType": payload.deviceType,
      "extraInfo": payload.extraInfo
    },
  })
}


//删除指定设备
export function Delete_device(payload) {
  return request({
    url: '/api/v1/device',
    method: 'DElETE',

    params: {
      "productKey": payload.productKey,
      "deviceKey": payload.deviceKey
    }
  })
}
//传进来的是国际时间转换时间格式, 传入的是十三位的时间戳或者utc	2020-02-15T09:48:38.685Z
export function dataType(payload) {
  const dateMat = new Date(payload);
  const year = dateMat.getFullYear();
  var month = dateMat.getMonth() + 1;
  if (month < 10) {
    month = "0" + month
  }
  var day = dateMat.getDate();
  if (day < 10) {
    day = "0" + day
  }
  var hh = dateMat.getHours();
  if (hh < 10) {
    hh = "0" + hh
  }
  var mm = dateMat.getMinutes();
  if (mm < 10) {
    mm = "0" + mm
  }
  var ss = dateMat.getSeconds();
  if (ss < 10) {
    ss = "0" + ss
  }
  var timeFormat =
    year + "-" + month + "-" + day + " " + hh + ":" + mm + ":" + ss;
  return timeFormat;
}


//指定设备的状态信息
export function deviceStatus(payload) {
  return request({
    url: '/api/v1/deviceStatus',
    method: 'get',
    params: {
      "deviceKey": payload
    }
  })
}
//指定多个设备的状态信息deviceStatusNums
export function deviceStatusNums(payload) {
  return request({
    url: '/api/v1/batchDeviceStatus',
    method: 'post',
    data: {
      "productKey": payload.productKey,
      "deviceKeyList": payload.deviceKey
    }
  })
}
//查看指定设备的指定时间范围内的报警记录
export function alertNums(payload) {
  return request({
    url: '/api/v1/alertTimeLimit',
    method: 'post',
    data: {
      "productKey": payload.productKey,
      "deviceKey": payload.deviceKey,
      "startTime": parseInt(payload.startTime / 1000),
      "endTime": parseInt(payload.endTime / 1000),
      "asc": 0
    }
  })
}


//根据时间段查询用户报警信息
export function alertbyTime(data) {
  return request({
    url: '/api/v1/userAlertInfos/byTime',
    method: 'post',
    data
  })
}


//获取指定设备模板
export function deviceTemplate(payload) {
  return request({
    url: '/api/v1/formwork',
    method: 'get',
    params: {
      "devicetype": payload
    }
  })
}
// 获取所有设备模板
export function allTemplate(payload) {
  return request({
    url: '/api/v1/allFormworkDetail',
    method: 'get',

  })
}

// 获取指定设备模板
export function addTemplate(payload) {
  return request({
    url: '/api/v1/formwork',
    method: 'post',
    data: {
      ...payload
    }
  })
}
// 获取指定设备模板
export function deleteTemplate(payload) {
  return request({
    url: '/api/v1/formwork',
    method: 'delete',
    params: {
      "devicetype": payload
    }
  })
}
// 批量标记一已读
export function Read(payload) {
  return request({
    url: '/api/v1/productAlertInfos',
    method: 'post',
    data: {
      // "productKey": "",
      "alertIds": payload
    }
  })
}

// 获取设备最新一条数据
export function NewDeviceDataOne(payload) {
  return request({
    url: '/api/v1/batchDeviceData',
    method: 'post',
    data: {
      "productKey": payload.productKey,
      "deviceKeyList": payload.deviceKey
    }
  })
}


//查看设备指定数量的记录
export function historyDataNum(productKey,deviceKey) {
  return request({
    url: '/api/v1/recentData',
    method: 'post',
    data: {
 
        productKey: productKey,
        deviceKey: deviceKey,
        num:20, 
        asc:0

    }
  })
}


// 获取多设备最新一条数据
export function DeviceNewDatas(payload) {
  return request({
    url: '/api/v1/batchDeviceData',
    method: 'post',
    data: {
      "productKey": payload.productKey,
      "deviceKeyList": payload.deviceKey
    }
  })
}

//查看指定用户的所有产品设备的报警消息
export function UserAllalert (payload) {
  return request({
    url: '/api/v1/userAlertInfos',
    method: 'post',
    data: {
      "username": getName("name"),
      "productKeys": [],
      "pageIndex": payload.pageIndex,
      "pageSize": payload.pageSize,
      "asc": 0,
      "unRead": payload.unRead
    }
  })
}
//获取用户所有未读报警的各个主题（subject）数量✅
export function subjectCount (payload) {
  return request({
    url: '/api/v1/userAlertInfos/subjectCount',
    method: 'get',
    payload
  })
}

//获取用户设备状态统计信息
export function UserAllStatus() {
  return request({
    url: '/api/v1/allStatus',
    method: 'post',
    data: {
      "username": getName("name"),
      "deviceKey": []
    }
  })
}


//查看指定时间段内设备报警数量排行
export function SortAlertNums(payload) {
  return request({
    url: '/api/v1/deviceRankList',
    method: 'post',
    data: {
      "username": getName("name"),
      "deviceKeys": [],
      "startTime": parseInt(payload.start / 1000),
      "endTime": parseInt(payload.end / 1000)
    }
  })
}

//获取用户未读报警数
export function UnReadAlertNums(payload) {
  return request({
    url: '/api/v1/unreadAlertCount',
    method: 'get',
    data: {
      "username": getName("name"),
      "productKeys": []
    }
  })
}

//批量删除报警信息
export function DeleteAlerts(payload) {
  return request({
    url: '/api/v1/productAlertInfos',
    method: 'delete',
    data: {
      "alertIds":payload

    }
  })
}


//获取设备报警时间分布
export function alarmDistribution(nowTime) {
  return request({
    url: '/api/v1/alertDistribution',
    method: 'post',
    data: {
        "startTime":100,
        "endTime":nowTime,
        "interval":"day"
    }
  })
}

//设备报警时间分配
export function AlertTime(payload) {
  return request({
    url: '/api/v1/alertDistribution',
    method: 'post',
    data: {
      "username": getName("name"),
      "deviceKeys": [],
      "startTime": parseInt(payload.start / 1000),
      "endTime": parseInt(payload.end / 1000),
      "interval": payload.interval
    }
  })
}

//获取全部的productKey
export function allProductKey(data) {
  return request({
    url: '/api/v1/productKeys',
    method: 'get',
    data
  })
}

//获取全部的deviceKey
export function alldeviceKey(data) {
  return request({
    url: '/api/v1/deviceKeys',
    method: 'get',
    data
  })
}

//获取当前用户设备状态信息统计
export function allDeviceStatus(data) {
  return request({
    url: 'api/v1/allStatus?timeout=7200',   //目前离线时间定为两小时
    method: 'get',
    data
  })
}

//查询某个时间之后多个产品的设备最新数据
export function getDeviceDatas(data) {
  return request({
    url: '/api/v1/batchProductData',   
    method: 'post',
    data
  })
}


//查询指定设备的历史数据
export function historyData(data) {
  return request({
    url: '/api/v1/historyData',   
    method: 'post',
    data
  })
}

//电信云注册设备
export function cloudDevcieRegister(simId,deviceType,deviceName) {
  return request({
    url: 'http://dianxinzhuce.ahusmart.com/register?simId='+simId+'&deviceType='+deviceType+'&deviceName='+deviceName,   
    method: 'get',
  })
}

//电信云删除设备
export function cloudDevcieDelete(deviceId) {
  return request({
    url: 'http://dianxinzhuce.ahusmart.com/delete?deviceId='+deviceId,   
    method: 'delete',
  })
}


//手环新下发通道
export function sendMessage(deviceId,message) {
  return request({
    url: 'http://dianxinzhuce.ahusmart.com/commandlwm?deviceId='+deviceId+'&msg='+message,
    method: 'get',

  })
}
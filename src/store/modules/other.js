import {
  ProductNum,
  ProductOne,
  deviceStatusNums,
  UserAllStatus,
  alertNums,
  DeviceNewDatas

} from "@/api/index";

const getDefaultState = () => {
  return {
    productNums: [],
    deviceNums: [],
    statusNums: [],
    deviceDetail: [],
    deviceKeys: [],
    selectDate: {
      startTime: parseInt(new Date().getTime() - 86400000),
      endTime: parseInt(new Date().getTime()),
    },

  }
}

const state = getDefaultState()

/*
 * 注意：存储在vuex中的数据虽然是全局的数据，但是如果页面刷新就会清除数据，
 * 所以说存储的数据如果仅仅是同一个页面只是不同的组件，页面可以同步刷新，就不需要担心，正常使用。
 * 但是如果使用的全局的数据在不同的页面使用，那就会把数据清楚还需要会带原来的页面重新获取，这样就十分的不方便
 * 所以就要使用sessionStorege储存到浏览器中，浏览器不刷新就不会清楚，
 * seesionStorge不可以直接存储对象，但是可以使用JSON。stringify新转换成字符串，在使用JSON.parse进行解析就可以了 
 */

const mutations = {
  //产品列表
  RES_productNums: (state, payload) => {
    state.productNums = []
    state.productNums.push(...payload)
    localStorage.setItem('productNums', JSON.stringify(state.productNums))
  },
  //设备列表
  RES_deviceNums: (state, payload) => {
    state.deviceNums = payload
    window.sessionStorage.setItem('deviceNums', JSON.stringify(state.deviceNums))
  },
  //在线设备列表
  RES_statusNums: (state, payload) => {
    state.statusNums = payload
    window.sessionStorage.setItem('statusNums', JSON.stringify(state.statusNums))
  },
  RES_deviceDetail: (state, payload) => {
    state.deviceDetail = payload
  },
  //选择时间段
  selectDate: (state, payload) => {
    state.selectDate = payload

  },

}
const actions = {
  //把需要的主要数据放在vuex中获取，这样就方便刷新数据，想要刷新数据直接this.$store.dispatch("productNum");
  productNum({
    commit,
    state
  }) {
    state.deviceKeys = []
    //获取产品列表
    ProductNum()
      .then((res) => {
        if (res.code != 200) {
          return
        }
        res = res.data.productInfo;
        //把产品列表保存到vuex中

        commit("RES_productNums", res);
        return res;
      })
      .then(async (res1) => {
        var statusnums = [];
        var deviceKey = [];
        var devicenums = [];
        //循环产品列表，拿到对应的产品详情，进而拿到设备列表，注意：没有单独的设备列表api
        await Promise.all(
          res1.map(async (value) => {
            //拿到产品详情
            await ProductOne(value.productKey).then((res2) => {
              res2 = res2.data.deviceInfo;
              //这里是为了在设备详情里面加入了产品名称
              res2.map((val) => {
                val["productName"] = value.productName;
                // val["status"] = localStorage.getItem(val.deviceKey) //这里是为了数据缓存，如果直接更新到数据val中就会加载速度特别的慢，你现在可以看下控制台的加载，需要十几秒的请求，影响用户体验，可以先缓存视觉上是加载速度快，内容是上次刷新的内容。

              })
              //保存设备密钥列表，方便请求多个设备状态，不需要单独请求
              res2.map((val) => {
                deviceKey.push(val.deviceKey);
              });
              devicenums.push(...res2);
              //设备列表存到vuex
            });
            //应该这样
            if (deviceKey.length != 0) {
              await deviceStatusNums({
                deviceKey: deviceKey,
                productKey: value.productKey,
              }).then((res3) => {
                if ((res3.code == 200)) {
                  res3 = res3.data.deviceStatus
                  //下面是为了检测哪一些设备在线，根据deviceKey，是否相同,和设备在线的数量
                  res3.map(val => {
                    var time = new Date().getTime() / 1000
                    if (time - val.time <= 21600) {
                      statusnums.push(val.deviceKey)
                    }
                  })
                } else {
                  return;
                }
              });
            }

          }))
        //把在线的设备标记为在线
        devicenums.map(val => {
          state.deviceKeys.push(val.deviceKey)
          if (statusnums.indexOf(val.deviceKey) != -1) {
            val["status"] = "online"
          } else {
            val["status"] = "offline"
          }
        })
        //在线的设备列表
        commit("RES_statusNums", statusnums);
        // //设备列表存到vuex

        commit("RES_deviceNums", devicenums);

      }).catch(error => {
        console.log(error);
      });
  },
  //刷新报警信息
  async alertnum({
    commit,
    state
  }) {
    var data = JSON.parse(window.sessionStorage.getItem('deviceNums'))
    var alertdata = []
    //这个是为了保证map函数里面的异步请求数据全部拿到
    await Promise.all(
      data.map(async (val) => {
        val["startTime"] = parseInt(new Date().getTime() - 86400000);
        val["endTime"] = parseInt(new Date().getTime());
        await alertNums(val).then((res) => {
          if (res.data.alertInfo) {
            alertdata.push(...res.data.alertInfo)
          } else {
            return
          }
        });
      })
    );

    return alertdata
  },


  async deviceNewDatas(statem, commit) {
    var data = []
    await Promise.all(state.productNums.map(async val => {
      var payload = {
        productKey: val.productKey,
        deviceKey: state.deviceKeys
      }
      //接口有bug任意的productKey都可以查询
      data = await DeviceNewDatas(payload).then(res => {
        return res.data
      }).catch(error => {
        console.log(error);
      })
    }))
    return data
  }

}

export default {
  state,
  mutations,
  actions

}

<template>
  <div class="layout">
    <div class="title title-bg">
      <span style="position: absolute; left: 48%;">海工智能</span>
      <span style="position: absolute;left:80%; font-size: 15px;">{{date}}</span>
      <span>
        <el-tooltip>
          <div slot="content">全局刷新</div>
          <img
            src="@/assets/img/刷新.png"
            style="position: absolute; left: 95%; margin-top: 10px; cursor: pointer;"
            @click="allReset"
            alt="刷新"
          />
        </el-tooltip>
      </span>
    </div>
    <div class="content">
      <div class="left">
        <div class="statistic statistic1">
          <div class="title-di">
            <span style="font-size: 20px; font-weight: 700; margin-left: 30px;">|</span>
            手环统计
          </div>
          <div class="body">
            <el-row type="flex" justify>
              <el-col :span="4" :offset="2">
                <img src="@/assets/img/手环.png" style="margin-top: 50px" alt  @click = "viewProduct"/>
              </el-col>
              <el-col :span="6">
                <h2 style="margin-top: 50px; color: #71919a;">{{productNum}}</h2>
                <p style="font-size: 13px; color: #71919a;">全部手环</p>
              </el-col>
              <el-col :span="4" :offset="2">
                <img src="@/assets/img/设备.png" style="margin-top: 60px;" alt  @click = "viewDevice"/>
              </el-col>
              <el-col :span="6">
                <h2 style="margin-top: 50px; color: #71919a;">{{deviceNum}}</h2>
                <p style="font-size: 13px; color: #71919a;">全部设备</p>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="statistic statistic2">
          <div class="title-di">
            <span style="font-size: 20px; font-weight: 700;margin-left: 30px;">|</span>
            手环状态
          </div>
          <div id="body1"></div>
        </div>
      </div>
      <div class="center">
        <div id="body2"></div>
      </div>
      <div class="right">
        <div class="list">
          <div class="title-di">
            <div v-if="show">
              <span style="font-size: 20px; font-weight: 700;margin-left: 30px;">|</span>
              设备列表
              <span style="float: right; margin-right: 10px; ">
                <img src="@/assets/img/搜索.png" @click="searchOpen" alt />
              </span>
            </div>
            <div v-if="!show">
              <span style="text-align: center;">
                <el-input placeholder="设备名和设备类型搜索" v-model="searchNum">
                  <span slot="suffix">
                    <i
                      class="el-icon-search"
                      @click="search"
                      style="cursor: pointer; color: rgb(0,0,0)"
                    ></i>
                  </span>
                  <span style="margin-left: 20px;" slot="suffix">
                    <i
                      class="el-icon-close"
                      @click="backHead"
                      style="cursor: pointer;color: rgb(0,0,0)"
                    ></i>
                  </span>
                </el-input>
              </span>
            </div>
          </div>
          <div :data="deviceList" class="warp">
            <ul class="item">
              <li
                v-for="(item, index) in this.deviceList"
                :key="index"
                class="liStyle"
              >
                <a-row>
                  <a-col :span="6">
                    <span class="title1" v-text="item.deviceKey"></span>
                  </a-col>
                  <a-col :span="6">
                    <span class="date" v-text="item.productName"></span>
                  </a-col>
                </a-row>
              </li>
            </ul>
          </div>
        </div>
        <div class="alarm">
          <div class="title-di">
            <span style="font-size: 20px; font-weight: 700;margin-left: 30px;">|</span>
           未读报警统计   
            <router-link to="/device/alertData">
            <i class = "el-icon-s-fold"></i>
            <!-- <span style = "margin-left: 20px; color: blue;font-size: 15px;"> 详情页</span> -->
      
            </router-link>
          </div>
          <div id="pie"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import vueSeamlessScroll from "vue-seamless-scroll";
import {
  allProductKey,
  alldeviceKey,
  allDeviceStatus,
  ProductNum,
  ProductOne,
} from "@/api/index";
import * as echarts from "echarts";
export default {
  name: "key16",
  created() {
    this.prepare();
    this.deviceData();
  },
  components: {
    vueSeamlessScroll
  },
  data() {
    return {
      productNum: "暂无数据", //  产品数量
      productList: [], //产品key的列表
      productList1: [],
      deviceList: [],
      deviceNum: "暂无数据", //设备数量
      onlineNum: "", //在线设备数量
      offlineNum: "", //离线设备数量
      point: [],
      center: { lng: 117.192342, lat: 31.770919 }, // 中心点坐标
      zoom: 13,
      mapStyle: {
        style: "light"
      },
      listData: [
      ],
      classOption: {
        step: 0.5
      },
      show: true,
      show1: false,
      searchNum: "",
      date: ""
    };
  },
  mounted() {
    this.map = new BMap.Map("body2", {
      enableMapClick: false,
      minZoom: 5,
      maxZoom: 20
    });
    // 设置中心点坐标和地图级别
    this.map.centerAndZoom(
      new BMap.Point(this.center.lng, this.center.lat),
      this.zoom
    );
    //改变百度地图风格
    this.map.setMapStyle(this.mapStyle);
    // 开启鼠标滚轮缩放
    this.map.enableScrollWheelZoom(true);
  console.log(this.productList1);

    //获取当前的时间，每一秒钟刷新一次
    // let _this = this;  //声明一个变量指向vue实例this,保证作用域一致
    setInterval(this.timer, 1000);
  },
  //在vue实例销毁之前清除定时器
  beforeDestroy() {
    if (this.date) {
      clearInterval(this.timer);
    }
  },
  methods: {
    deviceData() {
      this.productList1 = JSON.parse(window.sessionStorage.getItem("productList1"))
      var online = [];
      var offline = [];
            var positionList = [];
            for (var i=0;i<this.productList1.length;i++) {
              if (this.productList1[i].latestData.heart == "-") {
               offline.push(this.productList1[i])
              } else {
                if (Math.round(new Date() / 1000)- this.productList1[i].latestData.heart <=7200) {
                  online.push(this.productList1[i])
                } else {
                    offline.push(this.productList1[i])
                }
              }
              if (this.productList1[i].latestData.location !== "") {
                this.productList1[i].latestData.location.productName = this.productList1[i].productName;
              positionList.push(this.productList1[i].latestData.location)
              }
            }
            console.log(positionList)
            var markerArr = new Array(positionList.length).fill({})
            for (var i=0;i<positionList.length;i++) {
              markerArr[i].point = positionList[i].location;
              markerArr[i].address = positionList[i].desc;
              markerArr[i].title = positionList[i].productName;
            }
            console.log(markerArr)
            //测试
    //             var markerArr = [
    //   {
    //     title: "当前设备位置1",
    //     point: "117.182676,31.761464",
    //     address: "(117.183992,31.77341)"
    //   },
    //     {
    //     title: "当前设备位置2",
    //     point: "117.1863981,31.7696790",
    //     address: "(117.183992,31.77341)"
    //   },
    // ];
    // 绘制点
    for (var i = 0; i < markerArr.length; i++) {
      var p0 = markerArr[i].point.split(",")[0];
      var p1 = markerArr[i].point.split(",")[1];
      var maker = this.addMarker(new window.BMap.Point(p0, p1), i);
      this.addInfoWindow(maker, markerArr[i], i);
    }
    this.onlineNum = online.length
    this.offlineNum = offline.length
    },
    prepare() {
      var productAll = JSON.parse(window.localStorage.getItem("productNums"));
      console.log(productAll)
      allProductKey().then(res => {
        this.productNum = res.data.productKeys.length;
        alldeviceKey().then(res => {
          this.deviceNum = res.data.deviceKeys.length;
          allDeviceStatus().then(res => {
            // console.log(res);
            // this.onlineNum = res.data.status.online;
            // this.offlineNum = res.data.status.offline;
            this.echarts();
          });
        });
      });
      this.allDeviceList();
    },
    allDeviceList() {
      this.deviceList = [];
      this.productList = [];
      ProductNum().then(res => {
        // console.log(res.data.productInfo);
        for (var i = 0; i < res.data.productInfo.length; i++) {
          var obj = {
            productName: res.data.productInfo[i].productName,
            productKey: res.data.productInfo[i].productKey
          };
          this.productList.push(obj);
        }
        this.productList.forEach(item => {
          ProductOne(item.productKey).then(res => {
            for (var j = 0; j < res.data.deviceInfo.length; j++) {
              var obj = {
                deviceKey: res.data.deviceInfo[j].deviceKey,
                productName: item.productName
              };
              this.deviceList.push(obj);
            }
          });
        });
      });
      // console.log(this.deviceList);
    },
    echarts() {
      var chartDom = document.getElementById("body1");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        xAxis: {
          type: "category",
          data: ["总数", "在线", "离线"],
          axisTick: {
            alignWithLabel: true
          }
        },

        yAxis: {
          type: "value"
        },
        textStyle: {
          fontSize: 18,
          color: "#81a5ab"
        },
        series: [
          {
            data: [
              {
                value: this.productNum,
                itemStyle: {
                  color: "#62a0e6"
                }
              },

              {
                value: this.onlineNum,
                itemStyle: {
                  color: "#2abe80"
                }
              },
              {
                value: this.offlineNum,
                itemStyle: {
                  color: "#c63635"
                }
              }
            ],
            type: "bar"
          }
        ]
      };

      option && myChart.setOption(option);

var num1 = 0
var num2 = 0
var num3 = 0
var num4 = 0
var num5 = 0
var subjectNum =JSON.parse(window.sessionStorage.getItem("subjectNum")) 
if(subjectNum.低电量 !==undefined) {
 num1 = subjectNum.低电量
}
if(subjectNum.关机 !==undefined) {
  num2 = subjectNum.关机
}
if(subjectNum.摘掉设备 !==undefined) {
 num3 = subjectNum.摘掉设备
}
if(subjectNum.震动报警 !==undefined) {
  num4 = subjectNum.震动报警
}
if(subjectNum.表带破坏 !==undefined) {
num5 = subjectNum.表带破坏
}
      var chartDom1 = document.getElementById('pie');
var myChart1= echarts.init(chartDom1);
var option1;

option1 = {
  title: {
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: num1, name: '低电量' },
        { value: num2, name: '关机' },
        { value: num3, name: '摘掉设备' },
        { value: num4, name: '震动报警' },
        { value: num5, name: '表带破坏' },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};

option1 && myChart1.setOption(option1);
    },
    clickHandler(e) {
      alert(`单击点的坐标为：${e.point.lng}, ${e.point.lat}`);
    },
    addPoints() {
      const points = [];
      for (var i = 0; i < 1000; i++) {
        const position = {
          lng: Math.random() * 40 + 85,
          lat: Math.random() * 30 + 21
        };
        points.push(position);
      }
      this.points = points;
    },
    // 添加标注
    addMarker(point, index) {
      var myIcon = new BMap.Icon(
        "http://api.map.baidu.com/img/markers.png",
        new BMap.Size(23, 25),
        {
          offset: new BMap.Size(10, 25),
          imageOffset: new BMap.Size(0, 0 - index * 25)
        }
      );
      var marker = new BMap.Marker(point, {
        icon: myIcon
      });
      //不理解，但确实可以解决报错问题
           setTimeout(()=>{
                                        this.map.addOverlay(marker);
                                    },300)

      // this.map.addOverlay(marker);
      return marker;
    },
    // 添加信息窗口
    addInfoWindow(marker, poi) {
      //pop弹窗标题
      var title =
        '<div style="font-weight:bold;color:#CE5521;font-size:14px">' +
        poi.title +
        "</div>";
      //pop弹窗信息
      var html = [];
      html.push(
        '<table cellspacing="0" style="table-layout:fixed;width:100%;font:12px arial,simsun,sans-serif"><tbody>'
      );
      html.push("<tr>");
      html.push(
        '<td style="vertical-align:top;line-height:16px;width:38px;white-space:nowrap;word-break:keep-all">地址:</td>'
      );
      html.push(
        '<td style="vertical-align:top;line-height:16px">' +
          poi.address +
          " </td>"
      );
      html.push("</tr>");
      html.push("</tbody></table>");
      var infoWindow = new BMap.InfoWindow(html.join(""), {
        title: title,
        width: 200
      });

      var openInfoWinFun = function() {
        marker.openInfoWindow(infoWindow);
      };
      marker.addEventListener("click", openInfoWinFun);
      return openInfoWinFun;
    },
    viewProduct() {
 this.$router.push({ path: "/products/index" });
    },
    viewDevice() {
this.$router.push({ path: "/devices/index" });
    },
    searchOpen() {
      // this.allDeviceList();
      this.show = !this.show;
      this.deviceList = this.deviceList.slice(0,this.deviceNum);
      // console.log(this.deviceList);
    },
    reset() {
      // console.log("全局刷新");
        this.prepare();
    this.deviceData();
    },
    //搜索
    search() {
      var searchList = [];
      for (var i = 0; i < this.deviceList.length; i++) {
        if (
          this.deviceList[i].deviceKey.indexOf(this.searchNum) !== -1 ||
          this.deviceList[i].productName.indexOf(this.searchNum) !== -1
        ) {
          // console.log(this.deviceList[i]);
          searchList.push(this.deviceList[i]);
        }
      }

      this.deviceList = searchList;
      // console.log(this.deviceList);
    },
    //搜索框的切换成head
    backHead() {
      this.allDeviceList();
      this.searchNum = "";
      // console.log(this.deviceList);
      this.show = true;
    },
    //将时间改成常见格式
    timer() {
      let year = new Date().getFullYear(); //获取当前时间的年份
      let month =
        new Date().getMonth + 1 < 10
          ? "0" + (new Date().getMonth() + 1)
          : new Date().getMonth() + 1; //获取当前的月份
      let Day =
        new Date().getDate() < 10
          ? "0" + new Date().getDate()
          : new Date().getDate(); //获取当前时间的天数、
      let hours =
        new Date().getHours() < 10
          ? "0" + new Date().getHours()
          : new Date().getHours(); //获取当前的小时数
      let minutes =
        new Date().getMinutes() < 10
          ? "0" + new Date().getMinutes()
          : new Date().getMinutes(); //获取当前时间的分数
      let seconds =
        new Date().getSeconds() < 10
          ? "0" + new Date().getSeconds()
          : new Date().getSeconds(); //获取当前时间的秒数
      //拼接格式化当前时间
      this.date =
        year +
        "年" +
        month +
        "月" +
        Day +
        "日" +
        hours +
        ":" +
        minutes +
        ":" +
        seconds;
    },
    allReset() {
      this.prepare();
    },
  }
};
</script>


<style scoped>
.layout {
  min-height: 95vh;
  width: 103%;
  background-color: #fff;
}
.title {
  height: 60px;
  line-height: 60px;
  font-size: 26px;
  color: #a28970;
}
.title-bg {
  background: url("~@/assets/img/titlebg.png") no-repeat;
  background-size: 100% 65px;
}
.left {
  margin-left: 1%;
  height: 88vh;
  width: 28%;
  float: left;
  /* background-color: #fff; */
}
.statistic {
  border: 2px solid #b6bdd2;
  min-height: 100px;
  margin-top: 10px;
}
.statistic1 {
  height: 30%;
}
.statistic2 {
  height: 66%;
  margin-top: 13px;
}

.title-di {
  height: 44px;
  line-height: 44px;
  color: #83a5ac;
  font-size: 18px;
}
h2 {
  color: #fff;
}
.body {
  color: #fff;
  /* background-color: rgb(133, 71, 71); */
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}
#body1 {
  color: #fff;
  height: 88%;
  width: 100%;
  box-sizing: border-box;
}
.center {
  margin-top: 10px;
  height: 86vh;
  width: 41%;
  float: left;
  margin-left: 10px;
  border: 2px solid #b6bdd2;
  /* background-color: rgb(145, 69, 69); */
}
#body2 {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.right {
  float: left;
  height: 80vh;
  margin-top: 10px;
  margin-left: 10px;
  width: 25%;
  box-sizing: border-box;
}
.list {
  height: 28vh;
  border: 2px solid #b6bdd2;
}
.alarm
{
  margin-top: 13px;
height: 56vh;
  border: 2px solid #b6bdd2;
}
#pie {
  margin-top: 10px;
  height: 86%;
  width: 100%;
  /* background-color: rgb(203, 116, 116); */
}
.warp {
  height: 80%;
  width: 100%;
  margin: 0 auto;
  overflow: auto;
}
.warp ul {
  list-style: none;
  padding: 0;
  margin: 0 auto;
}
ul li {
  display: block;
  height: 30px;
  line-height: 30px;
  display: flex;
  justify-content: space-between;
  font-size: 15px;
}
.item {
  position: relative;
  font-size: 18px;
  color: #fff;
  margin-top: 10px;
  color: #81a5ab;
}
.item .title1 {
  position: absolute;
  left: 10%;
}

.item .date {
  position: absolute;
  left: 70%;
}

/* .static {
  overflow: auto;
} */
.liStyle {
  cursor: pointer;
  /* list-style:none; */
}
.liStyle:hover {
  background-color: rgba(255, 255, 255, 0.4);
  transition: all 0.4s ease-in-out;
}
::-webkit-scrollbar {
  width: 6px;
}

</style>
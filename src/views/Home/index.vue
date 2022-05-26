<template>
  <div class="layout" >
<div
      id="background"
      style="position: absolute; z-index: -1; width:100%; height:100%; top:0px; left:0px;   background-color: rgba(227, 241, 247,0.1)"
    >
      <!-- <img src="./主页背景.png" width="100%" height="100%" /> -->
    </div>
    <div class="title title-bg">
      <span style="position: absolute; left: 48%;">海工智能</span>
      <span style="position: absolute;left:80%; font-size: 18px;">{{date}}</span>
      <!-- <span>
        <el-tooltip>
          <div slot="content">全局刷新</div>
          <img
            src="@/assets/img/刷新.png"
            style="position: absolute; left: 95%; margin-top: 10px; cursor: pointer;"
            @click="allReset"
            alt="刷新"
          />
        </el-tooltip>
      </span> -->
    </div>
    <div class="content">
      <div class="left">
     <div class = "container">
       <div class="statistic statistic1">
          <div class="title-di">
            <span style="font-size: 20px; font-weight: 700; margin-left: 30px;">|</span>
            手环统计
          </div>
          <div class="body" style = "margin-top: 10px;">
            <el-row style = "color: #71919a; border-bottom: 1px solid #ebeef5; width: 90%; margin-left: 5%;">
              <el-col :span="12" style = "border-right: 1px solid #ebeef5">
                  <el-row type="flex" justify="" >
                      <el-col :span="16" style = "text-align: center; padding-top: 10px;">
                        <img src="@/assets/img/手环.png" alt="">
                        <p style = "font-size: 14px; color: #909399;margin-top: 5px;">手环总数</p>
                      </el-col>
                      <el-col :span="8"  style = "text-align: center;">
                        <p style = "font-size: 25px;">{{productNum}}</p>
                      </el-col>
                  </el-row>

              </el-col>
              <el-col :span="12">
                <el-row >
                        <el-col :span="16" style = "text-align: center; padding-top: 10px;">
                        <img src="@/assets/img/在线.png" alt="">
                        <p style = "font-size: 14px; color: #909399;margin-top: 5px;">在线手环</p>
                      </el-col>
                           <el-col :span="8"  style = "text-align: center;">
                        <p style = "font-size: 25px;">{{onlineNum}}</p>
                      </el-col>
                </el-row>
              </el-col>
             
            </el-row>
                      <el-row style = "color: #71919a; width: 90%; margin-left: 5%; ">
              <el-col :span="12" style = "border-right: 1px solid #ebeef5">
                <el-row >
                        <el-col :span="16" style = "text-align: center; padding-top: 10px;">
                        <img src="@/assets/img/离线.png" alt="">
                        <p style = "font-size: 14px; color: #909399;margin-top: 5px;">离线手环</p>
                      </el-col>
                           <el-col :span="8"  style = "text-align: center;">
                        <p style = "font-size: 25px;">{{offlineNum}}</p>
                      </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                      <el-row >
                        <el-col :span="16" style = "text-align: center; padding-top: 10px;">
                        <img src="@/assets/img/电子围栏.png" alt="">
                        <p style = "font-size: 14px; color: #909399; margin-top: 5px;">电子围栏数</p>
                      </el-col>
                           <el-col :span="8"  style = "text-align: center;">
                        <p style = "font-size: 25px;">{{fenceNum}}</p>
                      </el-col>
                </el-row>
              </el-col>
             
            </el-row>

          </div>
        </div>
     </div>

        
        <div class="statistic statistic2">
          <div id="body1" v-if = "alarmShow">
 <div class="title-di">
            <div v-if="show">
              <span style="font-size: 20px; font-weight: 700;margin-left: 30px;">|</span>
              已激活设列表
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
          <!-- <div :data="deviceList" class="warp"> -->
          <el-table :data="deviceList" class="warp" style="width: 100%; " size = "mini" 
  >
            <el-table-column prop="deviceName" label="设备" align="center" ></el-table-column>
            <el-table-column prop="productName" label="手环名" align="center"></el-table-column>
            <el-table-column prop = "status" label = "状态" align="center">
              <template slot-scope="scope">
                           <el-tag
                           effect="dark"
                           size = "mini"
              :type="
                scope.row.status == '在线'
                  ? 'success'
                  : 'danger'
              "
              disable-transitions
              >{{ scope.row.status }}</el-tag
            > 
                </template>
         
            </el-table-column>
          </el-table>
          </div>
        </div>
      </div>
      <div class="center">
        <div class = "map">
           <div id="body2"></div>
        </div>
        <div class = "lineChart">
                   <div class="title-di">
            <span style="font-size: 20px; font-weight: 700; margin-left: 30px;">|</span>
                 近期温度心率监控
          </div>
          <div id= "barBody">
             <chartsData />
          </div>
          
        </div>
       
      </div>
      <div class="right">
        <div class="list">
          <div class="title-di">
            <span style="font-size: 20px; font-weight: 700;margin-left: 30px;">|</span>
            未读报警统计
            <router-link to="/device/alertData">
              <i class="el-icon-s-fold"></i>
              <!-- <span style = "margin-left: 20px; color: blue;font-size: 15px;"> 详情页</span> -->
            </router-link>
          </div>
          <div id="pie"></div>
        </div>
        <div class="alarm">
          <div class="title-di">
            <span style="font-size: 20px; font-weight: 700;margin-left: 30px;">|</span>
            今日报警信息
          </div>
          <div class = "body" v-if= "!alertShow" style = "text-align: center;">
            <img src = "@/assets/img/无记录.png" style = "margin-top: 60px;" />
            <p style = "color: #406f90; margin-top: 20px; margin-left: 8px;">今日无报警</p>
          </div>
            <div class = "alertbody" v-if= "alertShow" style = "text-align: center;">
      
          <el-card v-for = "(item,index) in alertInfo" :key = "index" style = "height: 40px;  margin: 5px 20px; background-color: transparent">

  <el-row>
   <el-col :span = "3" style = "line-height: 40px; text-align: center; margin-top: -12px;">
    
        <el-tooltip v-if = "item.level == '严重'">
          <div slot="content">严重</div>
          <img
            src="@/assets/img/严重.png"
          />
        </el-tooltip>
              <el-tooltip v-if = "item.level == '紧急'">
          <div slot="content">紧急</div>
          <img
            src="@/assets/img/紧急.png"
          />
        </el-tooltip>
            
              <el-tooltip v-if = "item.level == '通知'">
          <div slot="content">通知</div>
          <img
            src="@/assets/img/通知.png"
          />
        </el-tooltip>
                     <el-tooltip v-if = "item.level == '预警'">
          <div slot="content">预警</div>
          <img
            src="@/assets/img/预警.png"
          />
        </el-tooltip>
   
   
   </el-col>
   <el-col :span = "5" style = "color: #406f90; margin-top: -12px; text-align: center;">

     <p style = "font-size: 10px;">{{item.Content}}</p>
  
   </el-col>
        <el-col :span = "16" style = "color: #406f90; margin-top: -12px; text-align: right">

     <p style = "font-size: 8px;">{{item.date}}</p>
   </el-col>
  </el-row>


          </el-card>
        
          </div>
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
  alarmDistribution,
  alertbyTime
} from "@/api/index";
import {
UserDetail,
EditUser
} from "@/api/admin";
import * as echarts from "echarts";
import chartsData from "@/views/Home/chartsData";
export default {
  name: "key16",
  created() {
    this.prepare();
    this.deviceData();
  },
  components: {
    vueSeamlessScroll,
    chartsData
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
      listData: [],
      classOption: {
        step: 0.5
      },
      show: true,
      show1: false,
      searchNum: "",
      date: "",
      date1: "",
      fenceNum: "",
      alarmDistribution: null,
      alarmDistribution1: [],
      distributionTime: [],
      distributionData: [],
      alarmShow: true,
      alertShow: false,
      alertInfo: [],
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
    // console.log(this.productList1);

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
      this.productList1 = JSON.parse(
        window.localStorage.getItem("productList1")
      );
        var fenceList = JSON.parse(window.sessionStorage.getItem('fenceList'))
        this.fenceNum = fenceList.length
      console.log(this.productList1);
      var online = [];
      var offline = [];
      var positionList = [];
      for (var i = 0; i < this.productList1.length; i++) {
        if (this.productList1[i].latestData.heart == "-") {
          offline.push(this.productList1[i]);
        } else {
          if (
            Math.round(new Date() / 1000) -
              this.productList1[i].latestData.heart <=
            7200
          ) {
            online.push(this.productList1[i]);
          } else {
            offline.push(this.productList1[i]);
          }
        }
        if (this.productList1[i].latestData.location !== "") {
          this.productList1[
            i
          ].latestData.location.productName = this.productList1[i].productName;
          positionList.push(this.productList1[i].latestData.location);
        }
      }
      // console.log(positionList)
      var markerArr = new Array(positionList.length).fill({});
      for (var i = 0; i < positionList.length; i++) {
        markerArr[i].point = positionList[i].location;
        markerArr[i].address = positionList[i].desc;
        markerArr[i].title = positionList[i].productName;
      }
      // console.log(markerArr)
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
      this.onlineNum = online.length;
      this.offlineNum = offline.length;
      //deviceList处理
      this.deviceList = [];
 this.date1 = Math.round(new Date().getTime()/1000)
      this.productList1.forEach(item => {
        if (item.latestData.heart == "-") {
 
          if (item.deviceName.length !== 0) {
            item.deviceName.forEach(item1 => {
                      var obj = {
            productName: item.productName,
            deviceName: item1,
            status: "未激活"
          };
              // obj.deviceName = item1;
              this.deviceList.push(obj);
            });
          }
        } else if (this.date1-item.latestData.heart <=7200) {
console.log("在线")
          if (item.deviceName.length !== 0) {
            item.deviceName.forEach(item1 => {
                          var obj = {
            productName: item.productName,
            deviceName: item1,
            status: "在线"
          };
              this.deviceList.push(obj);
            });
          }
        }  else {
                  console.log("离线")
          if (item.deviceName.length !== 0) {
            item.deviceName.forEach(item1 => {
                 var obj = {
            productName: item.productName,
            deviceName: item1,
            status: "离线"
          };
              this.deviceList.push(obj);
            });
          }
        }
        // console.log(this.deviceList);
      });
    },
    prepare() {

      var productAll = JSON.parse(window.localStorage.getItem("productNums"));
   var total = JSON.parse(window.sessionStorage.getItem("total"));
      var startTime = Math.floor(new Date(new Date().setHours(0, 0, 0, 0)).getTime()/1000);
      var endTime = Math.floor(new Date(new Date().setHours(23,59,59,999)).getTime()/1000);
      console.log(startTime)
      console.log(total)
      this.alertInfo = []
      var obj = {
        startTime: startTime,
        endTime: endTime,
        asc: 1,
        num: total
      }
      //      var obj = {
      //   startTime: 1650297600,
      //   endTime: 1650383999,
      //   asc: 1,
      //   num: total
      // }
alertbyTime(obj).then((res)=>{
  console.log(res)
  if (res.msg == "未找到记录") {
    this.alertShow = false
  } else if (res.msg == "ok") {
    this.alertShow = true
    res.data.alertInfo.forEach(item=>{
      this.alertInfo.push(item)
    })
    console.log(this.alertInfo)
  } else {
    this.$message.error(res.msg)
  }
})





      allProductKey().then(res => {
        this.productNum = res.data.productKeys.length;
        alldeviceKey().then(res => {
          this.deviceNum = res.data.deviceKeys.length;
          allDeviceStatus().then(res => {
             this.date1 = Math.round(new Date().getTime()/1000)
      this.alarmDistribution1 = [];
      this.distributionTime = [];
      this.distributionData = [];
            alarmDistribution(this.date1).then((res)=>{
  console.log(res)
  if (res.msg == "ok") {
    this.alarmDistribution = res.data.distribution
    console.log(this.alarmDistribution)
    if (this.alarmDistribution== undefined) {
      this.alarmShow = false
    } else {
      this.alarmShow = true;
      this.alarmDistribution.forEach(item=>{
        var obj = {
          value: item.count,
          name: item.time
        }
        this.alarmDistribution1.push(obj)
this.distributionTime.push(item.time)
this.distributionData.push(item.count)
      })
      console.log(this.alarmDistribution1)
            this.echarts();
    }
  } else {
    this.$$message.error(res.msg)
  }
})
            // console.log(res);
            // this.onlineNum = res.data.status.online;
            // this.offlineNum = res.data.status.offline;
      
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
        // this.productList.forEach(item => {
        //   ProductOne(item.productKey).then(res => {
        //     // console.log(res)
        //     for (var j = 0; j < res.data.deviceInfo.length; j++) {
        //       var obj = {
        //         deviceKey: res.data.deviceInfo[j].deviceKey,
        //          deviceName: res.data.deviceInfo[j].deviceName,
        //         productName: item.productName,
        //       };
        //       this.deviceList.push(obj);
        //     }
        //   });
        // });
      });
      console.log(this.deviceList);
    },
    echarts() {
//       var chartDom = document.getElementById("barBody");
//       var myChart = echarts.init(chartDom);
     
//       var option;

//      option = {
//         color: ['#3e4c9e'],
//         tooltip: {
//     trigger: 'axis',
//     axisPointer: {
//       type: 'shadow'
//     }
//   },
//   xAxis: {
//     type: 'category',
//     data: this.distributionTime,
//          axisTick: {
//         alignWithLabel: true
//       }
//   },
//   yAxis: {
//     type: 'value'
//   },
//   series: [
//     {
//       data: this.distributionData,
//       type: 'bar'
//     }
//   ]
// };
//       option && myChart.setOption(option);

      var num1 = 0;
      var num2 = 0;
      var num3 = 0;
      var num4 = 0;
      var num5 = 0;
      var subjectNum = JSON.parse(window.localStorage.getItem("subjectNum"));
      if (subjectNum.低电量 !== undefined) {
        num1 = subjectNum.低电量;
      }
      if (subjectNum.关机 !== undefined) {
        num2 = subjectNum.关机;
      }
      if (subjectNum.摘掉设备 !== undefined) {
        num3 = subjectNum.摘掉设备;
      }
      if (subjectNum.震动报警 !== undefined) {
        num4 = subjectNum.震动报警;
      }
      if (subjectNum.表带破坏 !== undefined) {
        num5 = subjectNum.表带破坏;
      }
      var chartDom1 = document.getElementById("pie");
      var myChart1 = echarts.init(chartDom1);
      var option1;

      option1 = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    // top: '2%',
    // left: 'center'
    orient: 'vertical',
     y: 'center',
    x: 'right',
   
  },
    toolbox: {
    show: true,
  },
        series: [
          {
      name: '报警统计',
      type: 'pie',
       radius: ['30%','70%'],
      center: ['50%', '49%'],
      avoidLabelOverlap: true,
      itemStyle: {
        borderRadius: 5
      },
      // label: {
      //   show: false,
      //   // position: 'center'
      // },
      emphasis: {
        label: {
          show: true,
          fontSize: '40',
          fontWeight: 'bold'
        }
      },
      // labelLine: {
      //   show: false
      // },

        color:['#00a098', '#f6987e','#7cb8d6','#fa6d6e','#a38972'],
            data: [
              { value: num1, name: "低电量" },
              { value: num2, name: "关机" },
              { value: num3, name: "摘掉设备" },
              { value: num4, name: "震动报警" },
              { value: num5, name: "表带破坏" }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };

      option1 && myChart1.setOption(option1);

window.addEventListener("resize",function (){
    // myChart.resize();
    myChart1.resize();
});
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
      setTimeout(() => {
        this.map.addOverlay(marker);
      }, 300);

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
      this.deviceList = this.deviceList.slice(0, this.deviceNum);
      // console.log(this.deviceList);
    },
    // reset() {
    //   // console.log("全局刷新");
    //   this.prepare();
    //   this.deviceData();
    // },
    //搜索
    search() {
      var searchList = [];
      for (var i = 0; i < this.deviceList.length; i++) {
        if (
          this.deviceList[i].deviceName.indexOf(this.searchNum) !== -1 ||
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
      this.deviceData();
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
    }
  }
};
</script>


<style lang = "scss" scoped>
.layout {
  min-height: 95vh;
  width: 103%;
    /* background-color: #0e6374; */
    /* background-image: url(主页背景.png); */
      .title {
                                    z-index:50;
          background-color: rgba(255,255,255,.1);
            background-size: 100% 100%;
            backdrop-filter: blur(15px);
             box-shadow: 1px 1px 10px   rgba(93, 93, 93,0.1);
          
    }

  .content {
  
  
    z-index: 30;
  
   .left {
/* position: relative; */
    opacity:  0.9;
     z-index: 100;
    margin-left: 1%;
    height: 88vh;
    width: 28%;
    float: left;
     /* align-items: center;
  display: flex;
  justify-content: center; */
    /* background-color: #fff; */
    .statistic {
      /* border: 2px solid #b6bdd2; */
      min-height: 200px;
      margin-top: 10px;
        background-color: rgba(255, 255, 255, 0.3);

    }
    .statistic1 {
      /* position: absolute; */
      border-radius: 15px;
      height: 30%;
      z-index:50;
          background-color: rgba(255,255,255,.1);
            background-size: 100% 100%;
            backdrop-filter: blur(15px);
             box-shadow: 1px 1px 10px  rgba(93, 93, 93,0.5);
            
    }

  
    .statistic2 {
      border-radius: 15px;
      height: 66%;
      margin-top: 13px;
                                      z-index:50;
          background-color: rgba(255,255,255,.1);
            background-size: 100% 100%;
            backdrop-filter: blur(15px);
             box-shadow: 1px 1px 10px   rgba(93, 93, 93,0.5);
    }
  }
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
    height: 85vh;
    width: 41%;
    float: left;
    margin-left: 10px;
    
    
   
    .map {
      height: 54%;
      /* border-radius: 15px; */
       
           z-index:50;
          background-color: rgba(255,255,255,.1);
            background-size: 100% 100%;
            backdrop-filter: blur(15px);
            /* box-shadow: 0 0  10px rgb(93, 93, 93); */
            box-shadow: 1px 1px 10px  rgba(93, 93, 93,0.5);
            border-radius: 15px;
       
       #body2 {
    width: 100%;
    height: 100%;
    border-radius: 15px;
    box-sizing: border-box;

  }
    }
    .lineChart {
      border-radius: 30px;
      height: 44%;
      margin-top: 10px;
                    z-index:50;
          background-color: rgba(255,255,255,.1);
            background-size: 100% 100%;
            backdrop-filter: blur(15px);
          box-shadow: 1px 1px 10px  rgba(93, 93, 93,0.5);
            border-radius: 15px;
          #barBody {
            height: 86%;
            /* background-color: #000; */
          }
    }
    /* background-color: rgb(145, 69, 69); */
  }
 
  .right {

    float: left;
    height: 80vh;
    margin-top: 10px;
    margin-left: 10px;
    width: 25%;
    box-sizing: border-box;
    .list {
      border-radius: 30px;
      min-height: 200px;
      height: 28vh;
          background-color: rgba(255,255,255,.1);
            background-size: 100% 100%;
            backdrop-filter: blur(15px);
             box-shadow: 1px 1px 10px  rgba(93, 93, 93,0.5);
            border-radius: 15px;
    }
    .alarm {
      min-height: 200px;
      margin-top: 13px;
      height: 55vh;
                                z-index:50;
          background-color: transparent;
            background-size: 100% 100%;
            backdrop-filter: blur(15px);
             box-shadow: 1px 1px 10px  rgba(93, 93, 93,0.5);
            border-radius: 15px;
            .alertbody {
              height: 88%;
              overflow: auto;
            }
    }
  }

  #pie {
    margin-top: 10px;
    height: calc(86%);
    width: 100%;
    /* background-color: rgb(203, 116, 116); */
  }
  .warp {
    height: 95%;
    width: 100%;
    margin: 0 auto;
    overflow: auto;
     background-color: transparent!important;
  }
::v-deep .el-table__expanded-cell {
  background-color: transparent !important;
}

::v-deep .el-table th,
::v-deep .el-table tr,
::v-deep .el-table td {
  background-color: transparent;
}


.el-table::before {
	 left: 0;
	 bottom: 0;
	 width: 100%;
	 height: 0px;
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
    .title1 {
      position: absolute;
      left: 10%;
    }
    .title1 {
      position: absolute;
      left: 10%;
    }

    .date {
      position: absolute;
      left: 50%;
    }
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
}
</style>
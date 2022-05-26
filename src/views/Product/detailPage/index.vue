<template>
  <el-card class="layout">
    <div v-if="!dataShow">当前无数据</div>
    <div v-if="dataShow">
      <div class="title">手环详情展示页 -- {{this.product.productName}}</div>
      <el-card class="guiji">
        <p slot="header" style="padding: 0px; margin: 0px; color: #6f9199">手环轨迹展示(两天内)</p>
        <!-- <div id="map"></div> -->
        <baidu-map
          id="map"
          :center="center"
          :zoom="17"
          :scroll-wheel-zoom="true"
          Animation="BMAP_ANIMATION_DROP	"
          v-loading="loading1"
          v-if = "show1"
        >
          <bm-polyline
            :path="polylinePath"
            stroke-color="red"
            :stroke-opacity="1"
            :stroke-weight="2"
          ></bm-polyline>
        </baidu-map>
        <div v-if = "!show1">
          <p style = "text-align: center; margin-top: 100px;"> 
                <img src="@/assets/img/无数据2.png" alt=""> <br>
          近两天没有历史数据
          </p>
        </div>
      </el-card>
      <div class="heartRate">
        <el-card class="left">
          <p slot="header" style="padding: 0px; margin: 0px; color: #6f9199">温度统计（一天内）</p>
          <div id="wendu" v-loading="loading2"  v-if = "show2"></div>
                <div v-if = "!show2">
          <p style = "text-align: center; margin-top: 100px;"> 
                <img src="@/assets/img/暂无数据.png" alt=""> <br>
          近一天没有历史数据
          </p>
        </div>
        </el-card>
        <el-card class="right">
          <p slot="header" style="padding: 0px; margin: 0px; color: #6f9199">心率血压统计（一天内）</p>
          <div id="heart" v-loading="loading3"  v-if = "show3"></div>
                <div v-if = "!show3">
          <p style = "text-align: center; margin-top: 100px;"> 
                <img src="@/assets/img/暂无数据.png" alt=""> <br>
          近一天没有历史数据
          </p>
        </div>
        </el-card>
      </div>
    </div>
  </el-card>
</template>
<script>
import * as echarts from "echarts";
import { historyData, ProductOne } from "@/api/index";
export default {
  name: "detailPage",
  data() {
    return {
      product: null,
      polylinePath: [
        { lng: 116.404, lat: 39.915 },
        { lng: 116.405, lat: 39.92 },
        { lng: 116.423493, lat: 39.907445 }
      ],
      // map: null,
      center: { lng: 117.192342, lat: 31.770919 }, // 中心点坐标
      zoom: 12,
      pl: null,
      bmap: null,
      deviceList: [],
      dataShow: true,
      loading1: true,
      loading2: true,
      loading3: true,
      show1: true,
      show2: true,
      show3: true,
      trackList: [],
      date1: [],
      date2: [],
      wenduList: null,
      heartList: null
      //  obj: null,
    };
  },
  created() {
    this.test();
  },

  methods: {
    test() {
      this.product = JSON.parse(window.sessionStorage.getItem("whichProduct"));
      console.log(this.product);
      //查询指定产品下的设备列表
      ProductOne(this.product.productKey).then(res => {
        console.log(res);
        var deviceDetail = res.data.deviceInfo;
        this.deviceList = [];
        // console.log(deviceDetail);
        deviceDetail.forEach(item => {
          // var obj = null
          // this.deviceList.push(item.deviceKey);
          if (item.deviceName == "A4") {
             this.obj = {
              deviceType: "位置信息",
              deviceKey: item.deviceKey
            };
            this.deviceList.push(this.obj);

          }
          if (item.deviceName == "BA") {
            this.obj = {
              deviceType: "温度",
              deviceKey: item.deviceKey
            };
            this.deviceList.push(this.obj);
          }
          if (item.deviceName == "C2") {

            this.obj = {
              deviceType: "心率",
              deviceKey: item.deviceKey
            };
            this.deviceList.push(this.obj);
          }
        });
        // 查询设备的历史数据
        console.log(this.deviceList);
        if (this.deviceList.length == 0) {
          this.dataShow = false;
        } else {
          this.dataShow = true;
          this.deviceList.forEach(item => {
            var time = Math.round(new Date() / 1000);
            var startTime = time - 172800;
            var startTime1 = time - 86400;
            if (item.deviceType == "位置信息") {
              //开始请求坐标的历史数据
              console.log(time);
              console.log(startTime);
              var payload = {
                deviceKey: item.deviceKey,
                startTime: startTime,
                endTime: time,
                asc: 1
              };
              historyData(payload).then(res => {
                console.log(res);
                if (res.msg == "ok") {
                  this.loading1 = false;
                  var trace = res.data.deviceData;
                  this.center = {
                    lng: trace[0].extraInfo.location.split(",")[0],
                    lat: trace[0].extraInfo.location.split(",")[1]
                  };
                  this.polylinePath = [];
                  trace.forEach(item1 => {
                    item1.position = {
                      lng: item1.extraInfo.location.split(",")[0],
                      lat: item1.extraInfo.location.split(",")[1]
                    };
                    // console.log(item1.position)
                    this.polylinePath.push(item1.position);
                  });
                } else {
                  console.log(res.msg)
                  this.show1 = false
                }
              });
            }
            if (item.deviceType == "温度") {
              var payload = {
                deviceKey: item.deviceKey,
                startTime: startTime1,
                endTime: time,
                asc: 1
              };
              historyData(payload).then(res => {
                if (res.msg == "ok") {
                  console.log(res);
                  this.loading2 = false;
                  this.date1 = [];
                  var wenduList1 = res.data.deviceData;
                  this.wenduList = [
                    {
                      name: "腕温",
                      type: "line",
                      symbol: "none",
                      data: [],
                      markLine: {
                        data: [{ type: "average", name: "Avg" }]
                      }
                    },
                    {
                      name: "体温",
                      type: "line",
                      symbol: "none",
                      data: [],
                      markLine: {
                        data: [{ type: "average", name: "Avg" }]
                      }
                    }
                  ];
                  wenduList1.forEach(item2 => {
                    this.date1.push(item2.date);
                    this.wenduList[0].data.push(item2.extraInfo.skin);
                    this.wenduList[1].data.push(item2.extraInfo.body);
                  });
                  // console.log(this.date1)
                  // console.log(this.wenduList)
                  this.echarts1();
                } else {
                  console.log(res.msg);
                   this.show2 = false
                }
              });
            }
            if (item.deviceType == "心率") {
              var payload = {
                deviceKey: item.deviceKey,
                startTime: startTime1,
                endTime: time,
                asc: 1
              };
              historyData(payload).then(res => {
                if (res.msg == "ok") {
                  console.log(res);
                  this.loading3 = false;
                  this.date2 = [];
                  var heartList1 = res.data.deviceData;
                  this.heartList = [
                    {
                      name: "心率",
                      type: "line",
                      symbol: "none",
                      data: [],
                      markLine: {
                        data: [{ type: "average", name: "Avg" }]
                      }
                    },
                    {
                      name: "收缩压",
                      type: "line",
                      symbol: "none",
                      data: [],
                      markLine: {
                        data: [{ type: "average", name: "Avg" }]
                      }
                    },
                    {
                      name: "舒张压",
                      type: "line",
                      symbol: "none",
                      data: [],
                      markLine: {
                        data: [{ type: "average", name: "Avg" }]
                      }
                    }
                  ];
                  heartList1.forEach(item3 => {
                    this.date2.push(item3.date);
                    this.heartList[0].data.push(item3.extraInfo.BPHeart);
                    this.heartList[1].data.push(item3.extraInfo.BPHigh);
                    this.heartList[2].data.push(item3.extraInfo.BPLow);
                  });
                  // console.log(this.date1)
                  // console.log(this.wenduList)
                  this.echarts2();
                } else {
                  console.log(res.msg);
                   this.show3 = false
                }
              });
            }
          });
        }
        //  this.deviceList(item=>{

        //  })
      });
    },
    echarts1() {
      var chartDom1 = document.getElementById("wendu");
      var myChart1 = echarts.init(chartDom1);
      var option1;

      option1 = {
        tooltip: {
          trigger: "axis"
        },
        legend: {},
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: "none"
            },
            dataView: { readOnly: false },
            magicType: { type: ["line", "bar"] },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.date1
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value} °C"
          }
        },
        series:
          // {
          //   name: 'Highest',
          //   type: 'line',
          //   data: [10, 11, 13, 11, 12, 12, 9]
          // },
          // {
          //   name: 'Lowest',
          //   type: 'line',
          //   data: [1, -2, 2, 5, 3, 2, 0]
          // }
          this.wenduList
      };

      option1 && myChart1.setOption(option1);
    },
    echarts2() {
      var chartDom2 = document.getElementById("heart");
      var myChart2 = echarts.init(chartDom2);
      var option2;

      option2 = {
        tooltip: {
          trigger: "axis"
        },
        legend: {},
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: "none"
            },
            dataView: { readOnly: false },
            magicType: { type: ["line", "bar"] },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.date2
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value} °C"
          }
        },
        series: this.heartList
      };

      option2 && myChart2.setOption(option2);
    }
  }
};
</script>
<style scoped>
.layout {
  min-height: 80vh;
  width: 98%;
  margin-top: 30px;
  margin-left: 1%;
  background-color: #fff;
}
.title {
  height: 60px;
  line-height: 60px;
  font-size: 26px;
  color: #a28970;
}
.guiji {
  width: 100%;
  height: 500px;
}
#map {
  height: 400px;
  width: 100%;
  padding: 0px;
  margin: 0px;
}
.heartRate {
  height: 500px;
  width: 100%;
  margin-top: 30px;
}
.left {
  float: left;
  margin-left: 1%;
  width: 49%;
  height: 500px;
}
.right {
  float: left;
  width: 49%;
  margin-left: 1%;
  height: 500px;
}
#wendu {
  width: 100%;
  height: 450px;
  /* background-color: rgb(92, 51, 51); */
}
#heart {
  width: 100%;
  height: 450px;
  /* background-color: rgb(92, 51, 51); */
}
</style>
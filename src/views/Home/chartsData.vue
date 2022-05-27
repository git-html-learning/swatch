<template>
  <div
    ref="flyMap"
  
    v-loading="loading"
    element-loading-text="数据加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(11, 15, 52, 1)"
    :style="{width: '100%', height: '100%'}"
  >
      <el-carousel class = "carousel" :autoplay="autoplay">
      <el-carousel-item  >
        <!-- <p class = "title">wer</p> -->
<div  id="chart" style = "margin-top: 30px;"></div>
      </el-carousel-item>
        <el-carousel-item >
<div id="chart1"  style = "margin-top: 30px;"></div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
import { historyDataNum, ProductOne, historyData } from "@/api/index";
import { option } from "runjs";
import * as echarts from "echarts";
export default {
  name: "chartsData",
  created() {
    this.prepare();
  },
  data() {
    return {
      loading: false,
      productList: [],
      deviceKey: "",
      productKey: "",
      dataList: [],
      dataList1: [],
      timeList: [],
      timeList1: [],
      timelineData: [],
      timelineData1: [],
      autoplay: false,
    };
  },
  methods: {
    prepare() {
      this.productList = JSON.parse(
        window.localStorage.getItem("productList1")
      );
      console.log(this.productList);
      //查询设备指定数量的里历史记
      var data = [];
      var data1 = [];
      this.timelineData = [];
      this.timelineData1 = [];
      var productList1 = [];
      var productList2 = [];
      this.productList.forEach((item, index) => {
        //拿到每个手环里,如果手环的BA设备有发过数据，先拿到BA设备的dk，通过dk来获取十条历史数据
        if (item.latestData.body !== "-") {
          //   console.log(item);
          productList1.push(item);
          var obj = {
            productKey: item.productKey,
            deviceKey: ""
          };
          item.deviceData.forEach(data => {
            if (data.deviceName == "BA") {
              obj.deviceKey = data.deviceKey;
            }
          });

          data.push(obj);
        }

            if (item.latestData.heartRate !== "-") {
          //   console.log(item);
          productList2.push(item);
          var obj = {
            productKey: item.productKey,
            deviceKey: ""
          };
          item.deviceData.forEach(data => {
            if (data.deviceName == "C2") {
              obj.deviceKey = data.deviceKey;
            }
          });

          data1.push(obj);
        }
      });
      // console.log(data1)
      productList1.forEach((time,index)=>{
          var timer = {
              value: index+1,
              tooltip: {
                  formatter: time.productName
              }
          }
          this.timelineData.push(timer)
      })
            productList1.forEach((time11,index11)=>{
          var timer = {
              value: index11+1,
              tooltip: {
                  formatter: time11.productName
              }
          }
          this.timelineData1.push(timer)
      })
      // console.log(this.timelineData)
      // console.log(this.timelineData1)
      this.dataList = [];
      this.dataList1 = [];
      this.timeList = [];
      this.timeList1 = [];
      // console.log(data);
      // console.log(data.length);
      if (data.length !== 0) {
        data.forEach(item => {
          historyDataNum(item.productKey, item.deviceKey).then(res => {
            console.log(res);
            this.dataList.push(res.data.deviceData);
            var time = [];
            res.data.deviceData.forEach(item1 => {
              time.push(item1.date);
            });
            //    console.log(time)
            this.timeList.push(time);
            if (
              this.dataList.length === data.length ||
              this.timeList.length === data.length
            ) {
              this.echarts();
            }
          });
        });
      }

        if (data1.length !== 0) {
        data1.forEach(item => {
          historyDataNum(item.productKey, item.deviceKey).then(res => {
            console.log(res);
            this.dataList1.push(res.data.deviceData);
            var time1 = [];
            res.data.deviceData.forEach(item1 => {
              time1.push(item1.date);
            });
            //    console.log(time)
            this.timeList1.push(time1);
            if (
              this.dataList1.length === data.length ||
              this.timeList1.length === data.length
            ) {
              this.echarts1();
            }
          });
        });
      }
    },
    echarts() {
      console.log("开始画表格");
      console.log(this.dataList);
      console.log(this.timeList.length);
      // this.timeList = []
      var optionData = [];
      var bodyList = [];
      var skinList = [];
      //   var timelineData = [];
      if (this.dataList.length !== 0) {
        this.dataList.forEach((item, index) => {
          console.log(item);
          var body1 = [];
          var skin1 = [];
          var body = {
            name: "",
            value: ""
          };
          var skin = {
            name: "",
            value: ""
          };
          //   var time = {
          //       value: index,
          //       tooltip: {
          //           formatter: item.productKey
          //       }
          //   }
          item.forEach(item1 => {
            body.name = item1.date;
            body.value = item1.extraInfo.body;
            skin.name = item1.date;
            skin.value = item1.extraInfo.skin;
            //   body.push(item1.extraInfo.body)
            //   skin.push(item1.extraInfo.skin)
            body1.push(body);
            skin1.push(skin);
          });
          bodyList.push(body1);
          skinList.push(skin1);
        });
        //   console.log(bodyList)
        //   console.log(skinList)
        // console.log(timelineData)

        for (var i = 0; i < this.dataList.length; i++) {
          optionData.push({
            xAxis: [
              {
                type: "category",
                boundaryGap: false,
                name: "时间",
                axisLine: { show: true, lineStyle: { color: "#fff" } },
                axisLabel: {
                  //   interval: "auto",
                  formatter: function(value) {
                    if (value.length == 2) {
                      return value;
                    } else {
                      return value.slice(5, 16);
                    }
                  }

                  //   textStyle: { color: "#9aa8d4", fontSize: 10 }
                },
                // type: "category",
                data: Object.values(this.timeList)[i].reverse()
                // splitLine: { show: false }
              }
            ],
            series: [
              {
                name: "体温",
                type: "line",
                data: bodyList[i].reverse()
              },
              {
                name: "手腕温度",
                type: "line",
                data: skinList[i].reverse()
              }
            ]
          });
        }
        console.log(optionData);
        var chartDom = document.getElementById("chart");
        var myChart = echarts.init(chartDom);
        var option;
        var colors = ["#e935d3", "#3172ef", "#5EBEFC", "#2EF7F3", "#FFFFFF"];
        var legendData = ["体温", "手腕温度"];
        option = {
        
          baseOption: {

        grid:{
                    x:25,
                    y:45,
                    x2:5,
                    y2:20,
                    borderWidth:3
                },
            timeline: {
              symbol: "diamond",
              show: true,
              symbolSize: 13,
              width: "auto",
              lineStyle: {
                color: "#4A95FF",
                width: 2
              },
              controlStyle: {
                  color: "#4A95FF",
                showPrevBtn: false,
                showNextBtn: false
              },
              itemStyle: {
                color: "#4A95FF"
              },

              checkpointStyle: { symbolSize: 8 },
              tooltip: {
                show: true
              },

              label: {
                  color: "#fff",
                fontSize: 8,
                position: 10,
              //   formatter: function(s) {
              //     return _this.depotnum[s];
              //   }
              },
              axisType: "category",
              autoPlay: true,
              data: this.timelineData,
            //   data: [
            //     {
            //       value: "1",
            //       tooltip: {
            //         formatter: "手环测试1"
            //       }
            //     },
            //     {
            //       value: "2",
            //       tooltip: {
            //         formatter: "手环测试2"
            //       }
            //     }
            //   ],

              // label : {
              //     formatter : function(s) {
              //         return s.slice(0, 4);
              //         }
              //     },

              autoPlay: true,
              playInterval: 10000
            },
            calculable: true,
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "cross"
              }
            },
            color: colors,
            grid: {
              left: "5%",
              right: "8%",
              top: "12%",
              bottom: "21%",
              containLabel: true
            },
            legend: {
              show: true,
              left: "right",
              data: legendData,
              y: "5%",
              itemWidth: 10,
              itemHeight: 8,
              textStyle: { color: "#889dbf", fontSize: 12 }
            },
            yAxis: [
              {
                type: "value",
                name: "单位:°C",
                axisTick: { show: false },
                splitLine: { show: false },
                axisLabel: { textStyle: { color: "#fff", fontSize: 13 } },
                axisLine: { show: true, lineStyle: { color: "#fff" } }
              }
            ]
          },
          options: optionData
        };
        // flyMap.setOption(option, true);
        option && myChart.setOption(option);
      }
    },

        echarts1() {
      console.log("开始画表格");
      console.log(this.dataList1);
      console.log(this.timeList1.length);
      // this.timeList = []
      var optionData1 = [];
      var heratRateList = [];
      var bpHighList = [];
      var bpLowList = [];
      //   var timelineData = [];
      if (this.dataList1.length !== 0) {
        console.log(this.dataList1)
        this.dataList1.forEach((item, index) => {
          console.log(item);
          var heartRate1 = [];
          var bphigh1 = [];
          var bplow1 = [];
          var heartRate = {
            name: "",
            value: ""
          };
          var bphigh = {
            name: "",
            value: ""
          };
                var bplow = {
            name: "",
            value: ""
          };
          //   var time = {
          //       value: index,
          //       tooltip: {
          //           formatter: item.productKey
          //       }
          //   }
          item.forEach(item1 => {
            heartRate.name = item1.date;
            heartRate.value = item1.extraInfo.BPHeart;
            bphigh.name = item1.date;
            bphigh.value = item1.extraInfo.BPHigh;
        bplow.name = item1.date;
            bplow.value = item1.extraInfo.BPLow;
            //   body.push(item1.extraInfo.body)
            //   skin.push(item1.extraInfo.skin)
            heartRate1.push(heartRate);
           bphigh1.push(bphigh);
           bplow1.push(bplow);
          });
          heratRateList.push(heartRate1);
         bpHighList.push(bphigh1);
         bpLowList.push( bplow1);
        });
        //   console.log(bodyList)
        //   console.log(skinList)
        // console.log(timelineData)

        for (var i = 0; i < this.dataList.length; i++) {
          optionData1.push({
            xAxis: [
              {
                type: "category",
                boundaryGap: false,
                name: "时间",
                axisLine: { show: true, lineStyle: { color: "#fff" } },
                axisLabel: {
                  //   interval: "auto",
                  formatter: function(value) {
                    if (value.length == 2) {
                      return value;
                    } else {
                      return value.slice(5, 16);
                    }
                  }

                  //   textStyle: { color: "#9aa8d4", fontSize: 10 }
                },
                // type: "category",
                data: Object.values(this.timeList1)[i].reverse()
                // splitLine: { show: false }
              }
            ],
            series: [
              {
                name: "心率",
                type: "line",
                data: heratRateList[i].reverse()
              },
              {
                name: "收缩压",
                type: "line",
                data: bpHighList[i].reverse()
              },
                         {
                name: "舒张压",
                type: "line",
                data: bpLowList[i].reverse()
              }
            ]
          });
        }
        console.log(optionData1);
        var chartDom1 = document.getElementById("chart1");
        var myChart1 = echarts.init(chartDom1);
        var option1;
        var colors = ["#d92279", "#f5eb45", "#78b8d5", "#2EF7F3", "#FFFFFF"];
        var legendData = ["心率", "收缩压","舒张压"];
        option1 = {
          baseOption: {
            timeline: {
              symbol: "diamond",
              show: true,
              symbolSize: 13,
              width: "auto",
              lineStyle: {
                color: "#4A95FF",
                width: 2
              },
              controlStyle: {
                  color: "#4A95FF",
                showPrevBtn: false,
                showNextBtn: false
              },
              itemStyle: {
                color: "#4A95FF"
              },

              checkpointStyle: { symbolSize: 8 },
              // axisType: "value",
              // autoPlay: true,
              // playInterval: 5000,
              tooltip: {
                show: true
              },

              label: {
                  color: "#4A95FF",
                fontSize: 8,
                position: 10,
              //   formatter: function(s) {
              //     return _this.depotnum[s];
              //   }
              },
              axisType: "category",
              autoPlay: true,
              data: this.timelineData1,
              autoPlay: true,
              playInterval: 10000
            },
            calculable: true,
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "cross"
              }
            },
            color: colors,
            grid: {
              left: "2%",
              top: "15%",
              bottom: "25%",
              right: "7%",
              containLabel: true
            },
            legend: {
              show: true,
              left: "right",
              data: legendData,
              y: "5%",
              itemWidth: 10,
              itemHeight: 8,
              textStyle: { color: "#889dbf", fontSize: 12 }
            },
            yAxis: [
              {
                type: "value",
                name: "单位:  次/分",
                axisTick: { show: false },
                splitLine: { show: false },
                axisLabel: { textStyle: { color: "#9aa8d4", fontSize: 13 } },
                axisLine: { show: true, lineStyle: { color: "#fff" } }
              }
            ]
          },
          options: optionData1
        };
        // flyMap.setOption(option, true);
        option1 && myChart1.setOption(option1);
      }
    }
  }
};
</script>
<style lang = "scss" scoped>
#chart {
  width: 100%;
  height: 98%;
}
.carousel {
     width: 100%;
  height: 120%;
  .title {
       height: 10%;
    width: 100%;
  }
  #chart {
    height: 90%;
    width: 100%;
  }
    #chart1 {
    height: 90%;
    width: 100%;
  }
}
</style>

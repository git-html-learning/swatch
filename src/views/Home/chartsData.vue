<template>
  <div
    ref="flyMap"
  id="chart"
    v-loading="loading"
    element-loading-text="数据加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(11, 15, 52, 1)"
    :style="{width: '100%', height: '100%'}"
  >

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
      loading: true,
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
              // this.echarts();
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
              this.echarts();
            }
          });
        });
      }
    },
    echarts() {
      console.log("开始画表格");
      console.log(this.dataList);
      console.log(this.timeList.length);
      console.log(this.timeList1.length);
      // this.timeList = []
      var optionData = [];
      var bodyList = [];
      var skinList = [];
            var optionData1 = [];
      var heratRateList = [];
      var bpHighList = [];
      var bpLowList = [];
      //   var timelineData = [];
      if (this.dataList.length !== 0) {
        this.dataList.forEach((item, index) => {
          console.log(item);
          var body1 = [];
          var skin1 = [];
  
          //   var time = {
          //       value: index,
          //       tooltip: {
          //           formatter: item.productKey
          //       }
          //   }
          item.forEach(item1 => {
                    var body = {
            name: item1.date,
            value: item1.extraInfo.body
          };
          var skin = {
            name: item1.date,
            value: item1.extraInfo.skin
          };
    
            //   body.push(item1.extraInfo.body)
            //   skin.push(item1.extraInfo.skin)
            body1.push(body);
            skin1.push(skin);
          });
          console.log(body1)
          bodyList.push(body1);
          skinList.push(skin1);
        });
          console.log(bodyList)
          console.log(skinList)
        // console.log(timelineData)
    }
     if (this.dataList1.length !== 0) {
        console.log(this.dataList1)
        this.dataList1.forEach((item, index) => {
          console.log(item);
          var heartRate1 = [];
          var bphigh1 = [];
          var bplow1 = [];
     
          //   var time = {
          //       value: index,
          //       tooltip: {
          //           formatter: item.productKey
          //       }
          //   }
          item.forEach(item1 => {
                 var heartRate = {
            name: item1.date,
            value:  item1.extraInfo.BPHeart
          };
          var bphigh = {
            name:  item1.date,
            value: item1.extraInfo.BPHigh
          };
                var bplow = {
            name: item1.date,
            value: item1.extraInfo.BPLow
          };
            heartRate1.push(heartRate);
           bphigh1.push(bphigh);
           bplow1.push(bplow);
          });
          heratRateList.push(heartRate1);
         bpHighList.push(bphigh1);
         bpLowList.push( bplow1);
        });
     }
     console.log(heratRateList)
        for (var i = 0; i < this.dataList.length; i++) {
          optionData.push({
            		    tooltip: {trigger: 'axis',axisPointer: {lineStyle: {color: '#fff'}}},
	
            xAxis: [
              {
                type: 'category',
                boundaryGap: false,
                axisLine: {lineStyle: {color: '#bde1fe'}},
                axisLabel: {textStyle: {color:'#bde1fe'}},
                axisLabel: {
                  formatter: function(value) {
                      return value.slice(5, 10)+'\n'+value.slice(11,16);
                  }
                },
                data: Object.values(this.timeList)[i].reverse()
              }
            ],
            		    yAxis: [
                {
		        type: 'value',
		        axisTick: {
		            show: false
		        },
		        axisLine: {lineStyle: {color: '#57617B'}},
		        axisLabel: {margin: 10,textStyle: {fontSize: 12},textStyle: {color:'#fff'},formatter:'{value}℃'},
		        splitLine: {lineStyle: {color: '#57617B'}}
		    },{
		        type: 'value',
		        axisTick: {
		            show: false
		        },
		        axisLine: {lineStyle: {color: '#57617B'}},
		        axisLabel: {margin: 10,textStyle: {fontSize: 12},textStyle: {color:'#fff'},formatter:'{value}'},
		        splitLine: {show: false,lineStyle: {color: '#57617B'}}
		    }],
            series: [
        {
		        name: '体温',type: 'line',smooth: true,lineStyle: {normal: {width: 2}},
		        yAxisIndex:0,
		        areaStyle: {
		            normal: {
		                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
		                    offset: 0,
		                    color: 'rgba(185,150,248,0.3)'
		                }, {
		                    offset: 0.8,
		                    color: 'rgba(185,150,248,0)'
		                }], false),
		                shadowColor: 'rgba(0, 0, 0, 0.1)',
		                shadowBlur: 10
		            }
		        },
		        itemStyle: {normal: { color: '#B996F8'}},
		        data: bodyList[i].reverse()
		    }, {
		        name: '手腕温度',type: 'line',smooth: true,lineStyle: { normal: {width: 2}},
		        yAxisIndex:0,
		        areaStyle: {
		            normal: {
		                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
		                    offset: 0,
		                    color: 'rgba(3, 194, 236, 0.3)'
		                }, {
		                    offset: 0.8,
		                    color: 'rgba(3, 194, 236, 0)'
		                }], false),
		                shadowColor: 'rgba(0, 0, 0, 0.1)',
		                shadowBlur: 10
		            }
		        },
		        itemStyle: {normal: {color: '#03C2EC'}},
		        data: skinList[i].reverse()
		    }, {
		        name: '心率',type: 'line',smooth: true,lineStyle: {normal: {width: 2}},
		        yAxisIndex:1,
		        areaStyle: {
		            normal: {
		                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
		                    offset: 0,
		                    color: 'rgba(218, 57, 20, 0.3)'
		                }, {
		                    offset: 0.8,
		                    color: 'rgba(218, 57, 20, 0)'
		                }], false),
		                shadowColor: 'rgba(0, 0, 0, 0.1)',
		                shadowBlur: 10
		            }
		        },
		        itemStyle: {normal: {color: '#DA3914'}},
                data: heratRateList[i].reverse()
             
		    },{
		        name: '收缩压',type: 'line',smooth: true,lineStyle: {normal: {width: 2}},
		        yAxisIndex:1,
		        areaStyle: {
		            normal: {
		                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
		                    offset: 0,
		                    color: 'rgba(232, 190, 49, 0.3)'
		                }, {
		                    offset: 0.8,
		                    color: 'rgba(232, 190, 49, 0)'
		                }], false),
		                shadowColor: 'rgba(0, 0, 0, 0.1)',
		                shadowBlur: 10
		            }
		        },
		        itemStyle: {normal: {color: '#E8BE31'}},
		        data:bpHighList[i].reverse()
		    },{
		        name: '舒张压',type: 'line',smooth: true,lineStyle: {normal: {width: 2}},
		        yAxisIndex:1,
		        areaStyle: {
		            normal: {
		                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
		                    offset: 0,
		                    color: 'rgba(0, 134, 251, 0.3)'
		                }, {
		                    offset: 0.8,
		                    color: 'rgba(0, 134, 251, 0)'
		                }], false),
		                shadowColor: 'rgba(0, 0, 0, 0.1)',
		                shadowBlur: 10
		            }
		        },
		        itemStyle: {normal: {color: '#0086fb'}},
		        data:bpLowList[i].reverse()
		    },
            ]
          });
        }
        console.log(optionData);
        var chartDom = document.getElementById("chart");
        var myChart = echarts.init(chartDom);
        var option;
        var colors = ["#e935d3", "#3172ef", "#5EBEFC", "#2EF7F3", "#FFFFFF"];
        var legendData = ["体温", "手腕温度","心率","收缩压","舒张压"];
        option = {
        
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
              tooltip: {
                show: true
              },

              label: {
                  color: "#fff",
                fontSize: 8,
                position: 10,
              },
              axisType: "category",
              autoPlay: true,
              data: this.timelineData,

              autoPlay: true,
              playInterval: 10000
            },
            	    legend: {
		        icon: 'rect',
		        itemWidth: 14,itemHeight: 5,itemGap:10,
		        data: legendData,
		        right: '10px',top: '0px',
		        textStyle: {fontSize: 12,color: '#fff'}
		    },
		    grid: {x:40,y:50,x2:45,y2:90},
            calculable: true,
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "cross"
              }
            },
            color: colors,
            yAxis: [
              {
                type: "value",
                // name: "单位:°C",
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
            window.addEventListener("resize", function() {
        myChart.resize();
      });
  
    },

        echarts1() {
      console.log("开始画表格");
      console.log(this.dataList1);
      console.log(this.timeList1.length);
      // this.timeList = []

      //   var timelineData = [];
     
        //   console.log(bodyList)
        //   console.log(skinList)
        // console.log(timelineData)

        // for (var i = 0; i < this.dataList.length; i++) {
        //   optionData1.push({
        //     xAxis: [
        //       {
        //         type: "category",
        //         boundaryGap: false,
        //         name: "时间",
        //         axisLine: { show: true, lineStyle: { color: "#fff" } },
        //         axisLabel: {
        //           //   interval: "auto",
        //           formatter: function(value) {
        //             if (value.length == 2) {
        //               return value;
        //             } else {
        //               return value.slice(5, 16);
        //             }
        //           }

        //           //   textStyle: { color: "#9aa8d4", fontSize: 10 }
        //         },
        //         // type: "category",
        //         data: Object.values(this.timeList1)[i].reverse()
        //         // splitLine: { show: false }
        //       }
        //     ],
        //     series: [
        //       {
        //         name: "心率",
        //         type: "line",
        //         data: heratRateList[i].reverse()
        //       },
        //       {
        //         name: "收缩压",
        //         type: "line",
        //         data: bpHighList[i].reverse()
        //       },
        //                  {
        //         name: "舒张压",
        //         type: "line",
        //         data: bpLowList[i].reverse()
        //       }
        //     ]
        //   });
        // }
        // console.log(optionData1);
        // var chartDom1 = document.getElementById("chart1");
        // var myChart1 = echarts.init(chartDom1);
        // var option1;
        // var colors = ["#d92279", "#f5eb45", "#78b8d5", "#2EF7F3", "#FFFFFF"];
        // var legendData = ["心率", "收缩压","舒张压"];
        // option1 = {
        //   baseOption: {
        //     timeline: {
        //       symbol: "diamond",
        //       show: true,
        //       symbolSize: 13,
        //       width: "auto",
        //       lineStyle: {
        //         color: "#4A95FF",
        //         width: 2
        //       },
        //       controlStyle: {
        //           color: "#4A95FF",
        //         showPrevBtn: false,
        //         showNextBtn: false
        //       },
        //       itemStyle: {
        //         color: "#4A95FF"
        //       },

        //       checkpointStyle: { symbolSize: 8 },
        //       // axisType: "value",
        //       // autoPlay: true,
        //       // playInterval: 5000,
        //       tooltip: {
        //         show: true
        //       },

        //       label: {
        //           color: "#4A95FF",
        //         fontSize: 8,
        //         position: 10,
        //       //   formatter: function(s) {
        //       //     return _this.depotnum[s];
        //       //   }
        //       },
        //       axisType: "category",
        //       autoPlay: true,
        //       data: this.timelineData1,
        //       autoPlay: true,
        //       playInterval: 10000
        //     },
        //     calculable: true,
        //     tooltip: {
        //       trigger: "axis",
        //       axisPointer: {
        //         type: "cross"
        //       }
        //     },
        //     color: colors,
        //     grid: {
        //       left: "2%",
        //       top: "15%",
        //       bottom: "25%",
        //       right: "7%",
        //       containLabel: true
        //     },
        //     legend: {
        //       show: true,
        //       left: "right",
        //       data: legendData,
        //       y: "5%",
        //       itemWidth: 10,
        //       itemHeight: 8,
        //       textStyle: { color: "#889dbf", fontSize: 12 }
        //     },
        //     yAxis: [
        //       {
        //         type: "value",
        //         name: "单位:  次/分",
        //         axisTick: { show: false },
        //         splitLine: { show: false },
        //         axisLabel: { textStyle: { color: "#9aa8d4", fontSize: 13 } },
        //         axisLine: { show: true, lineStyle: { color: "#fff" } }
        //       }
        //     ]
        //   },
        //   options: optionData1
        // };
        // // flyMap.setOption(option, true);
        // option1 && myChart1.setOption(option1);
      }

  }
};
</script>
<style lang = "scss" scoped>
#chart {
  width: 100%;
  height: 100%;
}
</style>

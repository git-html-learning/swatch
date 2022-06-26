<template>
  <div class="echarts">
    <div style="width:100;height:100%; " ref="dotMap"></div>
    <div class="mapChoose" v-if = "mapShow">
      <span v-for="(item,index) in parentInfo" :key="item.code">
        <span class="title" @click="chooseArea(item,index)">{{item.cityName=='全国'?'中国':item.cityName}}</span>
        <span class="icon" v-show="index+1!=parentInfo.length">></span>
      </span>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import resize from "../mixins/resize";
  import {
  alertbyTime,
  allProductKey,
  getDeviceDatas,
  historyData
} from "@/api/index";
  export default {
    name: 'dotMap',
    mixins: [resize],
    data() {
      return {
        myCharts: null,
        geoJson: {
          features: []
        },
        parentInfo: [{
          cityName: "全国",
          code: 100000
        }],
        mapShow: true,
        productList:[],
        cityStatistic:[],
        judge: {
            if:"",
            center:""
        }
      }
    },
    mounted() {
      this.getGeoJson(100000)
    },
    created () {
this.dataPrepare();
    },
    methods: {
            dataPrepare() {

    },
      getGeoJson(adcode) {
        let that = this;
        AMapUI.loadUI(["geo/DistrictExplorer"], DistrictExplorer => {
          var districtExplorer = new DistrictExplorer();
          districtExplorer.loadAreaNode(adcode, function (error, areaNode) {
            if (error) {
              console.error(error);
              return;
            }
            let Json = areaNode.getSubFeatures();
            if (Json.length > 0) {
              that.geoJson.features = Json;
            } else if (Json.length === 0) {
              that.geoJson.features = that.geoJson.features.filter(
                item => item.properties.adcode == adcode
              );
              if (that.geoJson.features.length === 0) return;
            }
            that.getMapData();
          });
        });
      },
    getMapData() {
              allProductKey().then(res => {
        console.log(res);
        if (res.msg == "ok") {
          this.productnameList = res.data.productKeys;
          var username = window.sessionStorage.getItem("username");
          getDeviceDatas({
            username: username,
            pkList: this.productnameList,
            startTime: 10000
          }).then(res => {
            console.log(res);
            this.productList = res.data;
            console.log(this.productList);
            console.log(this.productList);
            this.positionList = [];
            if (this.productList.length !== 0) {
              this.productList.forEach(item => {
                item.deviceName = [];
                item.latestData = {
                  location: ""
                };
                if (item.deviceData !== null) {
                  for (var i = 0; i < item.deviceData.length; i++) {
                    item.deviceName.push(item.deviceData[i].deviceName);
                  }
                  if (item.deviceName.includes("A4")) {
                    item.latestData.location =
                      item.deviceData[item.deviceName.indexOf("A4")].extraInfo;
                  } else {
                    item.latestData.location = "-";
                  }
                  this.positionList.push(item.latestData.location);
                }
              });

              console.log(this.positionList);
              this.cityList = [];
              var provinceList = [];
              this.positionList.forEach(item1 => {
                provinceList.push(item1.province);
              });
              var arr = provinceList;
              var newArr = arr.filter(function(item, index) {
                return arr.indexOf(item) === index; // 因为indexOf 只能查找到第一个
              });
              provinceList = newArr;
              console.log(provinceList);
              var provinceList1 = [];
              provinceList.forEach(item => {
                provinceList1.push({
                  province: item,
                  city: [],
                  judge: [],
                  city1: []
                });
              });
              this.positionList.forEach(item1 => {
                provinceList1.forEach((item2, index2) => {
                  if (item1.province == item2.province) {
                    provinceList1[index2].city.push(item1.city);
                    provinceList1[index2].city1.push(item1.city);
                  }
                });
              });

              if (provinceList1 !== []) {
                provinceList1.forEach(item => {
                  var arr = item.city;
                  var newArr = arr.filter(function(item, index) {
                    return arr.indexOf(item) === index; // 因为indexOf 只能查找到第一个
                  });

                  item.city = newArr;
                });
              }

              provinceList1.forEach((item, index) => {
                item.city.forEach(item1 => {
                  provinceList1[index].judge.push({
                    city: item1,
                    value: 0
                  });
                });
              });

              provinceList1.forEach(item => {
                item.judge.forEach(item1 => {
                  item.city1.forEach(item2 => {
                    if (item1.city == item2) {
                      item1.value += 1;
                    }
                  });
                });
              });
              console.log(provinceList1);
              provinceList1.forEach(item1 => {
                var value = 0;
                item1.judge.forEach(item2 => {
                  value += item2.value;
                });
                item1.total = value;
              });
              this.cityStatistic = provinceList1;
              console.log(this.cityStatistic)
                    let mapData = this.geoJson.features.map(item => {
        // console.log(item.properties);
        let value = 0;
        if (item.properties.level == "province") {
          this.cityStatistic.forEach(item1 => {
            if (item1.province == item.properties.name) {
              value = item1.total;
            }
          });
        }
        if (item.properties.level == "city") {
          this.cityStatistic.forEach(item1 => {
            item1.judge.forEach(item2 => {
              if (item2.city == item.properties.name) {
                value = item2.value;
              }
            });
          });
        }
        return {
          name: item.properties.name,
          value: [item.properties.center[0], item.properties.center[1], value],
          cityCode: item.properties.adcode
        };
      });
      mapData = mapData.sort(function(a, b) {
        return a.value[2] - b.value[2];
      });
      console.log(mapData);
      //去渲染echarts
      this.initEcharts(mapData);
            }
          });
        }
      });
    console.log(this.cityStatistic)

    },
      initEcharts(mapData) {
        this.myChart = echarts.init(this.$refs.dotMap)
        echarts.registerMap('Map', this.geoJson) //注册
        this.myChart.setOption({
            tooltip: {
              trigger: 'item',
              formatter: p => {
                let val = p.value[2]
                if (window.isNaN(val)) {
                  val = 0
                }
                let txtCon = p.name + '：' + val.toFixed()
                return txtCon
              }
            },
            geo: {
              show: true,
              map: 'Map', //使用
              roam: true,
              itemStyle: {
                normal: {
                  show: true,
                  areaColor: '#3a7fd5',
                  borderColor: '#215495',
                  borderWidth: '1.3',
                  shadowColor: 'rgb(10,76,139)',
                  shadowOffsetX: 5,
                  shadowOffsetY: 3,
                  shadowBlur: 65
                },
                //emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
                emphasis: {
                  show: true,
                  areaColor: '#8dd7fc',
                }
              },
              label: {
                normal: {
                  show: true,
                  color: "rgb(249, 249, 249)", //省份标签字体颜色
                  formatter: p => {
                    switch (p.name) {
                      case "内蒙古自治区":
                        p.name = "内蒙古";
                        break;
                      case "西藏自治区":
                        p.name = "西藏";
                        break;
                      case "新疆维吾尔自治区":
                        p.name = "新疆";
                        break;
                      case "宁夏回族自治区":
                        p.name = "宁夏";
                        break;
                      case "广西壮族自治区":
                        p.name = "广西";
                        break;
                      case "香港特别行政区":
                        p.name = "香港";
                        break;
                      case "澳门特别行政区":
                        p.name = "澳门";
                        break;
                      default:
                        break;
                    }
                    return p.name;
                  }
                },
                emphasis: {
                  show: true,
                  color: "#f75a00"
                }
              },
              zoom: 1.15
            },
         series: [
          {
            type: "effectScatter",
            data: mapData,
            coordinateSystem: "geo",
            //这里可以设置点的大小
            symbolSize: function(val) {
              return val[2] * 1.5;
            },
            showEffectOn: "render", //高亮时显示特效
            rippleEffect: {
              brushType: "fill"
            },
            hoverAnimation: false,
            label: {
              normal: {
                formatter: p => {
                  return p.value[2].toFixed();
                },
                position: "center", //地图上是否有文字
                show: true,
                textStyle: {
                  color: "#d9227a"
                }
              },
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                color: "#fff" //地图点的颜色
              }
            },
            layoutCenter: ["70%", "50%"], //属性定义地图中心在屏幕中的位置，一般结合layoutSize 定义地图的大小
            layoutSize: 500
          }
        ]
          },
          true
        )

        let that = this;
        this.myChart.off("click");
        this.myChart.on("click", params => {
            //   console.log(params);
        if (params.name.includes("市")) {
        this.judge = {
            if:"yes",
            center: params.name
        }
        // console.log(this.judge)
        this.emit();
        }
          if (!params.data) {
            return
          }
          if (
            that.parentInfo[that.parentInfo.length - 1].code ==
            params.data.cityCode
          ) {
            return;
          }
          let data = params.data;
          that.parentInfo.push({
            cityName: data.name,
            code: data.cityCode
          });
          that.getGeoJson(data.cityCode);
        });
      },

      // 选择切换市县
      chooseArea(val, index) {
        if (this.parentInfo.length === index + 1) {
          return
        }
        this.parentInfo.splice(index + 1)
        this.getGeoJson(this.parentInfo[this.parentInfo.length - 1].code);

      },
      emit() {
        this.$emit('openWhich',this.judge)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .echarts {
    width: 100%;
    height: 100%;
    position: relative;
    // background: url("../assets/bg1.jpg") no-repeat;
    background-size: 100% 100%;
    z-index: 20
  }

  .mapChoose {
    position: absolute;
    left: 10%;
    top: 55px;
    color: #eee;


    .title {
      padding: 5px;
      border-top: 1px solid rgba(147, 235, 248, .8);
      border-bottom: 1px solid rgba(147, 235, 248, .8);
      cursor: pointer;
    }

    .icon {
      font-family: "simsun";
      font-size: 25px;
      margin: 0 11px;
    }
  }
</style>
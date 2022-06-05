<template>
  <div class="layout">
    <div
      id="background"
      style="position: absolute; z-index: -1; width:100%; height:100%; top:0px; left:0px;   background-color: rgba(227, 241, 247,0.1)"
    >
      <!-- <img src="./主页背景.png" width="100%" height="100%" /> -->
    </div>
    <div class="title title-bg">
      <span style="position: absolute; left: 45%; font-size: 40px;">海工智能</span>
      <span style="position: absolute;left:80%; font-size: 21px;">{{date}}</span>
    </div>
    <div class="content">
      <div class="left">
        <div class="container">
          <div class="statistic statistic1">
            <div class="title-di">
              <span style="font-size: 20px; font-weight: 700; margin-left: 30px;">|</span>
              手环统计
            </div>
            <div class="body" style="margin-top: 5px;">
              <el-row style="color: #71919a; width: 90%; margin-left: 5%;">
                <el-col :span="12">
                  <el-row type="flex" justify>
                    <el-col :span="14" style="text-align: center; padding-top: 20px;">
                      <el-tooltip effect="light" placement="left">
                        <div slot="content">手环总数</div>
                        <svg
                          t="1653653585560"
                          class="icon"
                          viewBox="0 0 1024 1024"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          p-id="14316"
                          width="40"
                          height="40"
                        >
                          <path
                            d="M673.254804 220.60553L651.018278 23.516326C649.578503 10.078425 638.220278 0 624.622403 0H399.537572c-13.4379 0-24.796126 10.078425-26.395875 23.516326l-22.236526 197.089204c-44.313076 42.393376-71.988752 102.064052-71.988752 168.133729v248.921107c0 66.229652 27.675676 126.060303 72.148727 168.453679l21.916576 194.369629c1.439775 13.277925 12.798 23.516326 26.395875 23.516326h225.084831c13.4379 0 24.796126-10.078425 26.395875-23.516326l21.916576-194.529604c44.473051-42.393376 72.148727-102.224027 72.148727-168.453679V388.739259c0.159975-66.069677-27.515701-125.740353-71.668802-168.133729zM417.134823 46.072801h190.050304l15.517576 137.738478c-32.954851-17.9172-70.548977-27.995626-110.542728-27.995625-39.993751 0-77.747852 10.078425-110.542728 27.995625l15.517576-137.738478z m190.050304 931.694423H417.134823l-15.197626-135.178878c32.794876 17.757225 70.389002 27.835651 110.222778 27.83565 39.833776 0 77.427902-10.078425 110.222778-27.83565l-15.197626 135.178878z m91.825653-340.266833c0 103.023903-83.826902 186.850805-186.850805 186.850804s-186.850805-83.826902-186.850805-186.850804V388.739259c0-103.023903 83.826902-186.850805 186.850805-186.850804S699.01078 285.715357 699.01078 388.739259v248.761132z m0 0"
                            fill="#A3F3FF"
                            p-id="14317"
                          />
                          <path
                            d="M460.328074 332.907983c0 28.635526 23.196376 51.831901 51.831901 51.831901s51.831901-23.196376 51.831901-51.831901-23.196376-51.831901-51.831901-51.831901-51.831901 23.196376-51.831901 51.831901z m0 0M460.328074 513.039838c0 28.635526 23.196376 51.831901 51.831901 51.831901s51.831901-23.196376 51.831901-51.831901-23.196376-51.831901-51.831901-51.831902c-28.635526 0.159975-51.831901 23.196376-51.831901 51.831902z m0 0M460.328074 693.331667c0 28.635526 23.196376 51.831901 51.831901 51.831901s51.831901-23.196376 51.831901-51.831901-23.356351-51.831901-51.831901-51.831901c-28.635526 0-51.831901 23.196376-51.831901 51.831901z m0 0"
                            fill="#A3F3FF"
                            p-id="14318"
                          />
                        </svg>
                      </el-tooltip>
                      <!-- <img src="@/assets/img/手环.png" alt=""> -->

                      <!-- <p style = "font-size: 14px; color: #fff;margin-top: 5px;">手环总数</p> -->
                    </el-col>
                    <el-col :span="10" style="text-align: left;">
                      <p style="font-size: 25px; color: #fff; font-weight: 700">{{productNum}}</p>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="12">
                  <el-row>
                    <el-col :span="14" style="text-align: center; padding-top: 20px;">
                      <!-- <img src="@/assets/img/电子围栏.png" alt=""> -->
                      <el-tooltip effect="light" placement="top">
                        <div slot="content">电子围栏</div>
                        <svg
                          t="1653653670291"
                          class="icon"
                          viewBox="0 0 1063 1024"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          p-id="16673"
                          width="40"
                          height="40"
                        >
                          <path
                            d="M1020.627294 767.73188h-84.069734V438.524231h84.069734a36.142129 36.142129 0 0 0 36.927827-36.142128 36.927827 36.927827 0 0 0-36.927827-36.927827h-84.069734V106.959487A106.854989 106.854989 0 0 0 829.702571 0.104498v73.069955a36.927827 36.927827 0 1 1-39.284922 36.927827 36.927827 36.927827 0 0 1 36.927827-36.927827V0.104498a107.640687 107.640687 0 0 0-109.997783 109.997782v255.351996H628.563769V314.383877a108.426386 108.426386 0 0 0-112.354878-110.783481A106.854989 106.854989 0 0 0 409.353902 314.383877v54.998891H318.998581V106.959487A106.854989 106.854989 0 0 0 208.2151 0.104498v73.069955a36.927827 36.927827 0 0 1 0 73.069956 36.927827 36.927827 0 1 1 0-73.069956V0.104498a107.640687 107.640687 0 0 0-112.354878 109.997782v255.351996H41.647029a36.927827 36.927827 0 0 0-36.927827 36.927827 36.142129 36.142129 0 0 0 36.927827 36.142128h54.213193v329.207649H41.647029a36.927827 36.927827 0 1 0 0 73.069956h54.213193v122.568958a60.49878 60.49878 0 0 0 60.49878 60.49878h98.998004a59.713082 59.713082 0 0 0 63.641575-60.49878V840.801836h94.283813v122.568958a59.713082 59.713082 0 0 0 59.713082 60.49878h95.069512a60.49878 60.49878 0 0 0 60.498781-60.49878V840.801836h88.783924v122.568958a60.49878 60.49878 0 0 0 60.49878 60.49878h98.998005a59.713082 59.713082 0 0 0 59.713082-60.49878V840.801836h84.069734a36.927827 36.927827 0 1 0 0-73.069956zM240.428736 950.799619h-71.498559V213.028777a116.28337 116.28337 0 0 0 73.069956 0z m78.569845-183.067739V438.524231h94.283813v329.207649z m235.709534 183.067739h-72.284258V314.383877a35.35643 35.35643 0 0 1 39.284923-33.785034A34.570732 34.570732 0 0 1 554.708115 314.383877z m73.069955-183.067739V438.524231h89.569623v329.207649z m235.709534 183.067739H790.417649V213.028777a116.28337 116.28337 0 0 0 73.069955 0z"
                            fill="#d4237a"
                            p-id="16674"
                          />
                        </svg>
                      </el-tooltip>

                      <!-- <p style = "font-size: 14px; color: #fff; margin-top: 5px;">电子围栏数</p> -->
                    </el-col>
                    <el-col :span="10" style="text-align: left;">
                      <p style="font-size: 25px; color: #fff; font-weight: 700">{{fenceNum}}</p>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row style="color: #71919a; width: 90%; margin-left: 5%;  margin-top: 10px;">
                <el-col :span="12">
                  <el-row>
                    <el-col :span="14" style="text-align: center; padding-top: 20px;">
                      <!-- <img src="@/assets/img/在线.png" alt=""> -->
                      <el-tooltip effect="light" placement="bottom">
                        <div slot="content">激活设备</div>
                        <svg
                          t="1653653285098"
                          class="icon"
                          viewBox="0 0 1024 1024"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          p-id="13334"
                          width="40"
                          height="40"
                        >
                          <path
                            d="M960 960H64V320h576V192H256V64h512v256h192v640z m-128-512H192v384h640V448z m-192 256h-256v-128h256v128z"
                            fill="#0590DF"
                            p-id="13335"
                          />
                        </svg>
                      </el-tooltip>

                      <!-- <p style = "font-size: 14px; color: #fff;margin-top: 5px;">在线手环</p> -->
                    </el-col>
                    <el-col :span="10" style="text-align: left;">
                      <p style="font-size: 25px; color: #fff; font-weight: 700">{{activateNum}}</p>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="12">
                  <el-row>
                    <el-col :span="14" style="text-align: center; padding-top: 20px;">
                      <!-- <img src="@/assets/img/离线.png" alt=""> -->
                      <el-tooltip effect="light" placement="bottom">
                        <div slot="content">在线设备</div>
                        <svg
                          t="1653653905301"
                          class="icon"
                          viewBox="0 0 1024 1024"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          p-id="18661"
                          width="40"
                          height="40"
                        >
                          <path
                            d="M936.3456 43.04896H87.69536c-44.6464 0-80.85504 38.01088-80.85504 84.82816v532.02944c0 46.8992 36.20864 84.86912 80.85504 84.86912h288.03072v97.97632H318.6688v64.26624h-73.728v82.78016h534.1184v-82.78016h-73.64608v-64.26624h-57.09824v-97.97632h288.03072c44.6464 0 80.85504-38.01088 80.85504-84.86912V127.87712c0-46.81728-36.20864-84.82816-80.85504-84.82816z m-7.53664 615.8336H95.232V128.94208h833.57696v529.94048z"
                            fill="#1afa29"
                            p-id="18662"
                          />
                          <path
                            d="M715.3664 268.0832l-54.39488-54.39488-198.16448 198.16448L363.1104 312.1152 308.71552 366.51008l154.91072 154.91072 54.35392-54.35392-0.8192-0.86016z"
                            fill="#1afa29"
                            p-id="18663"
                          />
                        </svg>
                      </el-tooltip>

                      <!-- <p style = "font-size: 14px; color: #fff;margin-top: 5px;">离线手环</p> -->
                    </el-col>
                    <el-col :span="10" style="text-align: left;">
                      <p style="font-size: 25px; color: #fff; font-weight: 700">{{onlineNum}}</p>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>

        <div class="statistic statistic2">
          <!-- <div class = "topLeft" style = "position: absolute; left: -1px; top: -1px; height: 20px; width: 20px;border-top-left-radius: 18px; border-left: 2px solid #00adb5;  border-top: 2px solid #00adb5; " ></div>
        <div class = "topRight"  style = "position: absolute; right: -1px; top: -1px; height: 20px; width: 20px;border-top-right-radius: 18px; border-right: 2px solid #00adb5;  border-top: 2px solid #00adb5; "></div>
        <div class = "bottomLeft" style = "position: absolute; left: -1px; bottom: -1px; height: 20px; width: 20px;border-bottom-left-radius: 18px; border-left: 2px solid #00adb5;  border-bottom: 2px solid #00adb5; "></div>
          <div class = "bottomRight"  style = "position: absolute; right: -1px; bottom: -1px; height: 20px; width: 20px;border-bottom-right-radius: 18px; border-right: 2px solid #00adb5;  border-bottom: 2px solid #00adb5; "></div>-->
          <div id="body1" v-if="alarmShow">
            <div class="title-di">
              <div v-if="show">
                <span style="font-size: 20px; font-weight: 700;margin-left: 30px;">|</span>
                手环信息
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
            <el-table
              :data="productforTable"
              class="warp"
              style="width: 100%; margin-top: 20px; "
              size="medium"
              :show-header="false"
              :row-style="{color: '#bce1fe'}"
              :header-row-style="{color: '#fff',fontSize: '17px','border-bottom':'solid 1px #000'}"
              :cell-style="{border: 'none'}"
            >
              <el-table-column prop="productName" label="手环" align="center"></el-table-column>
              <el-table-column prop="fence" label="电子围栏" align="center"></el-table-column>
              <el-table-column prop="status" label="状态" align="center">
                <template slot-scope="scope">
                  <el-tag
                    effect="dark"
                    size="mini"
                    :type="
                scope.row.status == '在线'
                  ? 'success'
                  : scope.row.status == '离线'?'danger':'info'
              "
                    disable-transitions
                  >{{ scope.row.status }}</el-tag>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div class="center">
        <div class="map">
          <div id="body2"></div>
        </div>
        <div class="lineChart">
          <div class="title-di">
            <span style="font-size: 20px; font-weight: 700; margin-left: 30px;">|</span>
            近期温度心率监控
          </div>
          <div id="barBody">
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
          <div class="body" v-if="!alertShow" style="text-align: center;">
            <img src="@/assets/img/无记录.png" style="margin-top: 60px;" />
            <p style="color: #406f90; margin-top: 20px; margin-left: 8px;">今日无报警</p>
          </div>
          <div class="alertbody" v-if="alertShow" style="text-align: center;">
            <el-card
              v-for="(item,index) in alertInfo"
              :key="index"
              style="height: 45px;  margin: 5px 20px; background-color: transparent;border: 1px solid rgba(27, 240, 241,0.1)"
            >
              <el-row>
                <el-col :span="3" style="line-height: 40px; text-align: center; margin-top: -12px;">
                  <el-tooltip v-if="item.level == '严重'" placement="left-start" effect="light">
                    <div slot="content">严重</div>
                    <img src="@/assets/img/严重.png" />
                  </el-tooltip>
                  <el-tooltip v-if="item.level == '紧急'" placement="left-start" effect="light">
                    <div slot="content">紧急</div>
                    <img src="@/assets/img/紧急.png" />
                  </el-tooltip>

                  <el-tooltip v-if="item.level == '通知'" placement="left-start" effect="light">
                    <div slot="content">通知</div>
                    <img src="@/assets/img/通知.png" />
                  </el-tooltip>
                  <el-tooltip v-if="item.level == '预警'" placement="left-start" effect="light">
                    <div slot="content">预警</div>
                    <img src="@/assets/img/预警.png" />
                  </el-tooltip>
                </el-col>
                <el-col :span="5" style="color: #406f90; margin-top: -12px; text-align: center;">
                  <p style="font-size: 10px; color: #fff;  ">{{item.Content}}</p>
                </el-col>
                <el-col :span="16" style="color: #406f90; margin-top: -12px; text-align: right">
                  <p style="font-size: 8px;  color: #fff; ">{{item.date}}</p>
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
import { UserDetail, EditUser } from "@/api/admin";
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
      productforTable: [],
      productList: [], //产品key的列表
      productList1: [],
      deviceList: [],
      deviceNum: "暂无数据", //设备数量
      onlineNum: "", //在线设备数量
      offlineNum: "", //离线设备数量
      activateNum: "", //激活设备数量
      point: [],
      center: { lng: 103.317754, lat: 29.543963 }, // 中心点坐标
      zoom: 13,
      mapStyle: {
        style: "hardedge"
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
      var fenceList = JSON.parse(window.sessionStorage.getItem("fenceList"));
      this.fenceNum = fenceList.length;
      console.log(this.productList1);
      this.productforTable = [];
      this.date1 = Math.round(new Date().getTime() / 1000);
      if (this.productList1.length !== 0) {
        this.productList1.forEach(item => {
          var data = {
            productName: item.productName,
            fence: item.extraInfo.fence,
            status: ""
          };
          if (item.latestData.heart == "-") {
            data.status = "未激活";
          } else if (this.date1 - item.latestData.heart <= 7200) {
            data.status = "在线";
          } else {
            data.status = "离线";
          }
          this.productforTable.push(data);
        });
        console.log(this.productforTable);
      }
      var unactivate = [];
      var online = [];
      var offline = [];
      var positionList = [];
      for (var i = 0; i < this.productList1.length; i++) {
        if (this.productList1[i].latestData.heart == "-") {
          unactivate.push(this.productList1[i]);
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
      this.activateNum = this.productList1.length - unactivate.length;
      //deviceList处理
      this.deviceList = [];
      //  this.date1 = Math.round(new Date().getTime()/1000)
      //       this.productList1.forEach(item => {
      //         if (item.latestData.heart == "-") {

      //           if (item.deviceName.length !== 0) {
      //             item.deviceName.forEach(item1 => {
      //                       var obj = {
      //             productName: item.productName,
      //             deviceName: item1,
      //             status: "未激活"
      //           };
      //               // obj.deviceName = item1;
      //               this.deviceList.push(obj);
      //             });
      //           }
      //         } else if (this.date1-item.latestData.heart <=7200) {
      // console.log("在线")
      //           if (item.deviceName.length !== 0) {
      //             item.deviceName.forEach(item1 => {
      //                           var obj = {
      //             productName: item.productName,
      //             deviceName: item1,
      //             status: "在线"
      //           };
      //               this.deviceList.push(obj);
      //             });
      //           }
      //         }  else {
      //                   console.log("离线")
      //           if (item.deviceName.length !== 0) {
      //             item.deviceName.forEach(item1 => {
      //                  var obj = {
      //             productName: item.productName,
      //             deviceName: item1,
      //             status: "离线"
      //           };
      //               this.deviceList.push(obj);
      //             });
      //     }
      //   }
      //   // console.log(this.deviceList);
      // });
    },
    prepare() {
      var productAll = JSON.parse(window.localStorage.getItem("productNums"));
      var total = JSON.parse(window.sessionStorage.getItem("total"));
      var startTime = Math.floor(
        new Date(new Date().setHours(0, 0, 0, 0)).getTime() / 1000
      );
      var endTime = Math.floor(
        new Date(new Date().setHours(23, 59, 59, 999)).getTime() / 1000
      );
      console.log(startTime);
      console.log(total);
      this.alertInfo = [];
      var obj = {
        startTime: startTime,
        endTime: endTime,
        asc: 1,
        num: total
      };
      //      var obj = {
      //   startTime: 1650297600,
      //   endTime: 1650383999,
      //   asc: 1,
      //   num: total
      // }
      alertbyTime(obj).then(res => {
        console.log(res);
        if (res.msg == "未找到记录") {
          this.alertShow = false;
        } else if (res.msg == "ok") {
          this.alertShow = true;
          res.data.alertInfo.forEach(item => {
            this.alertInfo.push(item);
          });
          console.log(this.alertInfo);
        } else {
          this.$message.error(res.msg);
        }
      });

      allProductKey().then(res => {
        this.productNum = res.data.productKeys.length;
        alldeviceKey().then(res => {
          this.deviceNum = res.data.deviceKeys.length;
          allDeviceStatus().then(res => {
            this.date1 = Math.round(new Date().getTime() / 1000);
            this.alarmDistribution1 = [];
            this.distributionTime = [];
            this.distributionData = [];
            alarmDistribution(this.date1).then(res => {
              console.log(res);
              if (res.msg == "ok") {
                this.alarmDistribution = res.data.distribution;
                console.log(this.alarmDistribution);
                if (this.alarmDistribution == undefined) {
                  this.alarmShow = false;
                } else {
                  this.alarmShow = true;
                  this.alarmDistribution.forEach(item => {
                    var obj = {
                      value: item.count,
                      name: item.time
                    };
                    this.alarmDistribution1.push(obj);
                    this.distributionTime.push(item.time);
                    this.distributionData.push(item.count);
                  });
                  console.log(this.alarmDistribution1);
                  this.echarts();
                }
              } else {
                this.$$message.error(res.msg);
              }
            });
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
      console.log(this.distributionTime);
      console.log(this.distributionData);
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
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          // data: ['计划劳务资源', "实际劳务资源"],
          //align: 'left',
          right: 10,
          textStyle: {
            color: "#fff"
          },
          itemWidth: 14,
          itemHeight: 10,
          itemGap: 13
        },
        grid: {
          left: "1%",
          right: "4%",
          bottom: "10%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: ["低电量", "关机", "摘掉设备", "震动报警", "表带破坏"],
            axisLine: {
              //x轴线的颜色以及宽度
              show: true,
              lineStyle: {
                color: "rgba(219,225,255,1)",
                width: 0,
                type: "solid"
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              //x轴文字的配置
              show: true,
              textStyle: {
                color: "rgba(219,225,255,1)"
              }
            },
            splitLine: {
              //分割线配置
              show: false,
              lineStyle: {
                color: "rgba(219,225,255,1)"
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            nameTextStyle: {
              color: "#151515"
            },
            axisLabel: {
              textStyle: {
                color: "rgba(219,225,255,1)",
                margin: 15
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              //y轴线的颜色以及宽度
              show: false,
              lineStyle: {
                color: "rgba(219,225,255,1)",
                width: 3,
                type: "solid"
              }
            },
            splitLine: {
              //分割线配置
              show: false,
              lineStyle: {
                color: "rgba(219,225,255,1)"
              }
            }
          }
        ],
        series: [
          {
            name: "报警数",
            type: "bar",
            data: [num1, num2, num3, num4, num5],
            barWidth: 48, //柱子宽度
            barGap: 0.3, //柱子之间间距
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,

                    color: "rgba(0, 242, 159, 1)"
                  },
                  {
                    offset: 1,

                    color: "rgba(76, 240, 254, 1)"
                  }
                ]),
                opacity: 1
              }
            }
          }
        ]
      };

      option1 && myChart1.setOption(option1);

      window.addEventListener("resize", function() {
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
      for (var i = 0; i < this.productforTable.length; i++) {
        if (
          this.productforTable[i].productName.indexOf(this.searchNum) !== -1 ||
          this.productforTable[i].fence.indexOf(this.searchNum) !== -1
        ) {
          // console.log(this.deviceList[i]);
          searchList.push(this.productforTable[i]);
        }
      }

      this.productforTable = searchList;
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
  background-color: #0b2f4f;
  /* background-image: url(主页背景.png); */
  .title {
    z-index: 50;
    background-size: 100% 100%;
    backdrop-filter: blur(5px);
    box-shadow: 1px 1px 10px rgba(93, 93, 93, 0.1);
  }

  .content {
    z-index: 30;

    .left {
      /* position: relative; */
      opacity: 0.9;
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
        background-color: #143757;
        min-height: 200px;
        margin-top: 10px;
        /* border: 0.1px solid #00adb5; */
      }
      .statistic1 {
        /* position: absolute; */
        border-radius: 15px;
        /* height: 27vh; */
        height: 230px;
        z-index: 50;
        background-size: 100% 100%;
        backdrop-filter: blur(15px);
        /* box-shadow: 0 0  10px rgb(93, 93, 93); */
        box-shadow: 3px 5px 10px rgba(93, 93, 93, 0.5);
        border-radius: 15px;
      }

      .statistic2 {
        border-radius: 15px;
        height: calc(83vh - 230px);
        margin-top: 13px;
        z-index: 50;
        background-size: 100% 100%;
        backdrop-filter: blur(20px);
        /* box-shadow: 0 0  10px rgb(93, 93, 93); */
        box-shadow: 3px 5px 10px rgba(93, 93, 93, 0.5);
        border-radius: 15px;
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
    color: #97d0ed;
    font-size: 22px;
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
      border: 0.3px solid #00adb5;
      height: 400px;
      border-radius: 15px;

      #body2 {
        width: 100%;
        height: 100%;
        border-radius: 15px;
        box-sizing: border-box;
        border-radius: 15px;
        z-index: 50;
        background-size: 100% 100%;
        backdrop-filter: blur(15px);
        /* box-shadow: 0 0  10px rgb(93, 93, 93); */
        box-shadow: 3px 5px 10px rgba(93, 93, 93, 0.5);
        border-radius: 15px;
      }
    }
    .lineChart {
      background-color: #143757;
      z-index: 50;
      background-size: 100% 100%;
      backdrop-filter: blur(15px);
      /* box-shadow: 0 0  10px rgb(93, 93, 93); */
      box-shadow: 3px 5px 10px rgba(93, 93, 93, 0.5);
      border-radius: 15px;
      /* height: 44%; */
      height: calc(83vh - 400px);
      margin-top: 10px;
      z-index: 50;
      background-size: 100% 100%;
      backdrop-filter: blur(15px);
      box-shadow: 1px 1px 10px rgba(93, 93, 93, 0.5);
      border-radius: 15px;
      #barBody {
        height: 75%;
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
      background-color: #143757;
      z-index: 50;
      background-size: 100% 100%;
      backdrop-filter: blur(15px);
      box-shadow: 1px 1px 10px rgba(93, 93, 93, 0.5);
      border-radius: 15px;
      border-radius: 30px;
      min-height: 200px;
      height: 28vh;
      background-size: 100% 100%;
      backdrop-filter: blur(15px);
      box-shadow: 1px 1px 10px rgba(93, 93, 93, 0.5);
      border-radius: 15px;
    }
    .alarm {
      background-color: #143757;

      min-height: 200px;
      margin-top: 13px;
      height: 55vh;
      z-index: 50;
      background-size: 100% 100%;
      backdrop-filter: blur(15px);
      box-shadow: 1px 1px 10px rgba(93, 93, 93, 0.5);
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
    background-color: transparent !important;
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
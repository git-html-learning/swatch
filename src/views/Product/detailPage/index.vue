<template>
  <el-card class="layout">
    <div v-if="!dataShow">当前无数据</div>
    <div v-if="dataShow">
      <div class="title">手环详情展示页 -- {{this.product.productName}}</div>
      <div class="latest" style="width: 100%; min-height: 200px;">
        <el-card>
          <div slot="header" style="padding: 0px; margin: 0px; color: #6f9199">最新数据展示</div>
          <el-row type="flex" justify :gutter="20">
            <el-col :span="6">
              <el-card class="card">
                <el-row type="flex" justify>
                  <el-col :span="14" style= "text-align: center;">
                    <p>温度</p>
                    <p>
                      <span style="font-size: 30px">{{this.product.latestData.body}}</span>
                      <span style="margin-left:10px;">℃</span>
                    </p>
                  </el-col>
                  <el-col :span="8" style= "text-align: center;">
                    <p>
                      <svg
                        t="1654496594344"
                        class="icon"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="6924"
                        width="70"
                        height="70"
                      >
                        <path
                          d="M259 828.8c-16.3 0-31.7-6.3-43.2-17.8l-1.4-1.4c-23.8-23.8-23.8-62.6 0-86.4l96-96c-17.2-44.3-6.9-95.1 27-129l266.8-266.8c51.5-51.5 135.4-51.5 186.9 0l-9.5 9.5 9.5-9.5c24.4 24.4 37.8 56.9 37.8 91.6 0 34.7-13.4 67.2-37.8 91.6L522.5 683.3c-32.1 32.1-79.2 43.2-122.1 29.5L302.2 811c-11.5 11.5-26.8 17.8-43.2 17.8z m438.8-609.1c-28.2 0-54.7 10.9-74.5 30.7L356.5 517.3c-28.1 28.1-35.3 71.2-18 107.2 2.5 5.1 1.4 11.3-2.6 15.3L233.4 742.2c-13.3 13.3-13.3 35 0 48.3l1.4 1.4c6.4 6.4 15 10 24.2 10s17.8-3.5 24.2-10l104.2-104.2c3.8-3.8 9.5-5 14.5-3 35.1 14.1 75 6.1 101.5-20.5l268.7-268.7c19.3-19.3 29.9-45.1 29.9-72.6 0-27.5-10.6-53.3-29.9-72.6-19.7-19.7-46.1-30.6-74.3-30.6z"
                          fill="#4586FC"
                          p-id="6925"
                        />
                        <path
                          d="M263 767.8c-2.6 0-5.2-1-7.1-3-3.9-3.9-3.9-10.3 0-14.3l430.8-430.8c3.9-3.9 10.3-3.9 14.3 0 3.9 3.9 3.9 10.3 0 14.3L270.1 764.9c-1.9 2-4.5 2.9-7.1 2.9zM648.4 313.7c-3 0-6-1.1-8.3-3.4L598 268.2c-4.6-4.6-4.6-12 0-16.6 4.6-4.6 12-4.6 16.6 0l42.1 42.1c4.6 4.6 4.6 12 0 16.6-2.3 2.3-5.3 3.4-8.3 3.4zM581.1 368.4c-3 0-6-1.1-8.3-3.4L537 329.2c-4.6-4.6-4.6-12 0-16.6 4.6-4.6 12-4.6 16.6 0l35.8 35.8c4.6 4.6 4.6 12 0 16.6-2.3 2.3-5.3 3.4-8.3 3.4zM513.7 448.4c-3 0-6-1.1-8.3-3.4l-42.1-42.1c-4.6-4.6-4.6-12 0-16.6 4.6-4.6 12-4.6 16.6 0l42.1 42.1c4.6 4.6 4.6 12 0 16.6-2.3 2.3-5.3 3.4-8.3 3.4zM442.1 507.4c-3 0-6-1.1-8.3-3.4L398 468.1c-4.6-4.6-4.6-12 0-16.6 4.6-4.6 12-4.6 16.6 0l35.8 35.8c4.6 4.6 4.6 12 0 16.6-2.2 2.3-5.3 3.5-8.3 3.5zM397.9 564.2c-3 0-6-1.1-8.3-3.4l-42.1-42.1c-4.6-4.6-4.6-12 0-16.6 4.6-4.6 12-4.6 16.6 0l42.1 42.1c4.6 4.6 4.6 12 0 16.6-2.2 2.2-5.3 3.4-8.3 3.4z"
                          fill="#4586FC"
                          p-id="6926"
                        />
                        <path
                          d="M263.2 775.5c-4.3 0-8.6-1.6-11.9-4.9-6.6-6.6-6.6-17.2 0-23.8l58.9-58.9c6.6-6.6 17.2-6.6 23.8 0 6.6 6.6 6.6 17.2 0 23.8l-58.9 58.9c-3.3 3.3-7.6 4.9-11.9 4.9z"
                          fill="#FE5862"
                          p-id="6927"
                        />
                      </svg>
                    </p>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
                        <el-col :span="6">
              <el-card class="card">
                <el-row type="flex" justify>
                  <el-col :span="14" style= "text-align: center;">
                    <p>腕温</p>
                    <p>
                      <span style="font-size: 30px">{{this.product.latestData.skin}}</span>
                      <span style="margin-left:10px;">℃</span>
                    </p>
                  </el-col>
                  <el-col :span="8" style= "text-align: center;">
                    <p>
                      <svg
                        t="1654497095057"
                        class="icon"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="2553"
                        width="70"
                        height="70"
                      >
                        <path
                          d="M537.591817 230.653672c-34.062708-24.389002-127.959085-25.591817-127.959085-25.591817l102.367268-102.367268c39.769684 16.429947 179.142719 153.550902 179.142719 153.550903l-102.367268 76.775451s-17.120926-77.978266-51.183634-102.367269z m421.650777 443.224679c-47.114535 53.845183-96.557926 105.20796-140.447892 161.637917-100.499065 129.110717-234.421044 186.487571-394.497859 187.869528-61.164443 0.537428-138.349363-0.025592-182.136962 0-43.787599 0.051184-43.787599-9.315421-78.541286-44.350618 82.405651 0 161.12608 5.502241 239.667366 7.907871 179.705739 5.502241 326.244483-72.578393 426.948284-222.11138 32.911077-48.854779 76.417166-89.136299 115.470278-133.896387 18.298149-20.934106 16.813824-40.921315-5.809342-63.314155-7.191301-7.088933-13.435704-17.60717-15.073581-27.408836-19.270638-113.627668-84.043527-196.34042-169.392237-266.129305-79.129898-64.670522-157.594409-127.191331-230.633454-198.746051-36.698666-35.930911-83.198997-46.039679-128.291779-22.648758-46.065271 23.877165-93.10303 46.295597-135.534263 76.391574-17.223293 12.232889-39.334623 32.245689-18.809986 51.618695 43.506089 41.151642 100.678208 74.625738 161.12608 79.129898 19.987209 1.458734 46.372372-6.014077 60.754974-20.98529 28.176591-29.353814 45.169557-11.004481 64.491379 14.536152 20.627005 27.255285 33.064628 52.514409 36.826624 86.039689 7.165709 63.902767 34.574545 137.760751 40.921316 179.142719 2.763916 18.195782-6.167628 25.540633-19.29623 31.324384-24.133083 6.423546-46.014087 6.039669-70.070395 7.242484-50.953308 2.610365-98.221394 19.884842-124.197088 64.696114-9.85285 17.069742-23.698023 41.023683-43.736415 41.023682-20.166352 0-127.498432-2.53359-197.210542 18.656435-18.937945 5.706975-37.261686 13.512479-55.969304 19.961617-15.534233 5.34869-34.0883 15.687784-42.81511-7.012158-7.472811-19.552148 10.825339-25.822143 24.798471-31.605894 74.139494-30.658997 150.351925-52.156123 231.657127-40.998091 27.357652 3.736405 43.071028-2.53359 59.756893-26.333979 38.976337-55.559835 94.587356-85.374302 164.427424-81.842631 27.17851 1.381958 35.726177-3.582854 25.515042-32.424832-16.250804-45.732577-24.64492-93.614867-31.785037-141.82985-8.112606-54.740897-24.107492-63.570073-74.625738-48.650044-77.850307 22.981452-213.691672-37.364053-249.161931-110.070405-11.030073-22.571983-7.268076-41.586703 11.081257-57.248895A625.899069 625.899069 0 0 1 424.296843 4.831479c34.779279-11.618685 70.14717-2.149713 98.707638 22.444024 108.534896 93.435724 218.067873 185.847775 324.529832 281.586762 57.786323 51.97698 92.923888 119.692928 112.808729 194.804911 3.122202 11.69546 4.376201 25.873327 11.82342 34.113893 45.886128 50.774165 24.798471 93.077438-12.923868 136.097282z m-610.28806-11.030073h0.051183-0.051183z"
                          fill="#2EA9FF"
                          p-id="2554"
                        />
                      </svg>
                    </p>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card class="card">
                <el-row type="flex" justify>
                  <el-col :span="14" style= "text-align: center;">
                    <p>心率</p>
                    <p>
                      <span style="font-size: 30px">{{this.product.latestData.heartRate}}</span>
                      <span style="margin-left:10px;">次/分</span>
                    </p>
                  </el-col>
                  <el-col :span="8" style= "text-align: center;">
                    <p>
                      <svg
                        t="1654496706565"
                        class="icon"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="7933"
                        width="70"
                        height="70"
                      >
                        <path d="M0 0h1024v1024H0z" fill="#FFFFFF" p-id="7934" />
                        <path
                          d="M512 267.8272l40.548352-40.548352c90.048512-90.046464 236.044288-90.046464 326.0928 0 90.046464 90.048512 90.046464 236.044288 0 326.0928L512 920.0128 145.358848 553.371648c-90.046464-90.048512-90.046464-236.044288 0-326.0928 90.048512-90.046464 236.044288-90.046464 326.0928 0L512 267.8272z m-0.06144-81.156096c-112.44544-112.381952-294.705152-112.361472-407.126016 0.06144-112.443392 112.441344-112.443392 294.746112 0 407.187456l371.259392 371.259392c19.843072 19.843072 52.013056 19.843072 71.856128 0L919.189504 593.92c112.441344-112.441344 112.441344-294.746112 0-407.187456-112.443392-112.443392-294.74816-112.443392-407.189504 0l-0.06144-0.06144z"
                          fill="#666666"
                          p-id="7935"
                        />
                        <path
                          d="M495.802368 391.48544a28.669952 28.669952 0 0 1 24.754176 17.799168l68.040704 167.006208 14.798848-32.559104a28.676096 28.676096 0 0 1 26.103808-16.807936h135.493632c15.835136 0 28.672 12.836864 28.672 28.672s-12.836864 28.672-28.672 28.672h-117.03296l-34.701312 76.345344a28.674048 28.674048 0 0 1-52.656128-1.046528l-70.735872-173.627392-47.087616 83.714048a28.676096 28.676096 0 0 1-24.991744 14.614528h-160.899072c-15.835136 0-28.672-12.836864-28.672-28.672s12.836864-28.672 28.672-28.672h144.132096l67.9936-120.879104a28.674048 28.674048 0 0 1 26.78784-14.559232z"
                          fill="#00D4D1"
                          p-id="7936"
                        />
                      </svg>
                    </p>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card class="card">
                <el-row type="flex" justify>
                  <el-col :span="14" style= "text-align: center;">
                    <p>步数</p>
                    <p>
                      <span style="font-size: 30px">{{this.product.latestData.stepNum}}</span>
                      <span style="margin-left:10px;">步</span>
                    </p>
                  </el-col>
                  <el-col :span="8"  style= "text-align: center;">
                    <p>
                      <svg
                        t="1654496797193"
                        class="icon"
                        viewBox="0 0 1334 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="1320"
                        width="70"
                        height="70"
                      >
                        <path
                          d="M257.31184 43.016792q496.678974 243.271334 525.398506 290.574093c29.282661 47.865888 0 87.847982 16.330715 137.966382s42.234607 48.429016 123.325051 60.817833a559.186192 559.186192 0 0 0 164.433402-14.64133 168.938427 168.938427 0 0 1 197.094831 134.587613 149.228943 149.228943 0 0 1 0 31.535173v190.900422h-516.388457L85.557773 492.956134z"
                          fill="#E9EBF9"
                          p-id="1321"
                        />
                        <path
                          d="M1286.709986 916.991585h-519.204098a38.29271 38.29271 0 0 1-20.272611-5.631281L64.722033 530.122588a43.360863 43.360863 0 0 1-18.583226-52.370912l171.754067-450.502471a43.360863 43.360863 0 0 1 23.651379-23.65138 42.797735 42.797735 0 0 1 34.350814 0c506.81528 248.339487 530.466659 286.069069 542.855477 306.341681a153.733968 153.733968 0 0 1 18.020099 100.799927 99.110544 99.110544 0 0 0 0 45.050247c7.883793 20.835739 7.883793 20.835739 66.449114 29.845789l23.65138 3.378769a498.368358 498.368358 0 0 0 149.792072-14.641331 212.299289 212.299289 0 0 1 246.650102 168.938427 233.135029 233.135029 0 0 1 3.378769 39.418966v190.900422a42.234607 42.234607 0 0 1-39.982094 43.360863z m-506.81528-84.469213h465.706929v-148.665816a112.625618 112.625618 0 0 0 0-23.651379 126.140692 126.140692 0 0 0-148.102687-100.799928 585.090084 585.090084 0 0 1-177.948476 14.64133l-23.088252-3.378768c-65.322858-9.573178-108.683721-16.330715-133.461357-85.032342a172.317195 172.317195 0 0 1-6.757537-80.527317 72.643523 72.643523 0 0 0-6.194409-48.992143C734.281331 344.290319 668.958472 293.045663 280.400091 101.582113L137.928685 473.809779z"
                          fill="#3244E0"
                          p-id="1322"
                        />
                        <path
                          d="M41.633782 599.387343l703.910111 390.810893h541.729221a11.262562 11.262562 0 0 0 11.262561-11.262561v-119.383155h-537.224196l-675.753706-387.995253-48.429016 112.625618a10.699434 10.699434 0 0 0 4.505025 15.204458z"
                          fill="#E9EBF9"
                          p-id="1323"
                        />
                        <path
                          d="M1287.273114 1023.985922H734.281331l-711.230776-394.189662a45.050247 45.050247 0 0 1-19.709483-56.312809L69.227058 423.128251l701.09447 402.636584h563.128089v153.17084a45.050247 45.050247 0 0 1-46.176503 45.050247zM753.990814 958.099935h510.757176v-64.75973h-512.44656L101.888487 519.423154l-25.903892 60.254706zM375.00561 1022.859666H85.557773a33.787685 33.787685 0 0 1 0-67.575371h289.447837a33.787685 33.787685 0 0 1 0 67.575371zM227.466051 888.272052H87.247157a33.787685 33.787685 0 0 1 0-67.57537H227.466051a33.787685 33.787685 0 1 1 0 67.57537z"
                          fill="#3244E0"
                          p-id="1324"
                        />
                      </svg>
                    </p>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>

          </el-row>
        </el-card>
      </div>
      <el-card class="guiji" style="margin-top: 20px;">
        <p slot="header" style="padding: 0px; margin: 0px; color: #6f9199">手环轨迹展示(两天内)</p>
        <!-- <div id="map"></div> -->
        <baidu-map
          id="map"
          :center="center"
          :zoom="15"
          :scroll-wheel-zoom="true"
          Animation="BMAP_ANIMATION_DROP	"
          v-loading="loading1"
          v-if="show1"
        >
          <bm-polyline
            :path="polylinePath"
            stroke-color="red"
            :stroke-opacity="1"
            :stroke-weight="2"
          ></bm-polyline>
        </baidu-map>
        <div v-if="!show1">
          <p style="text-align: center; margin-top: 100px;">
            <img src="@/assets/img/无数据2.png" alt />
            <br />近两天没有历史数据
          </p>
        </div>
      </el-card>
      <div class="heartRate">
        <el-card class="left">
          <p slot="header" style="padding: 0px; margin: 0px; color: #6f9199">温度统计（一天内）</p>
          <div id="wendu" v-loading="loading2" v-if="show2"></div>
          <div v-if="!show2">
            <p style="text-align: center; margin-top: 100px;">
              <img src="@/assets/img/暂无数据.png" alt />
              <br />近一天没有历史数据
            </p>
          </div>
        </el-card>
        <el-card class="right">
          <p slot="header" style="padding: 0px; margin: 0px; color: #6f9199">心率血压统计（一天内）</p>
          <div id="heart" v-loading="loading3" v-if="show3"></div>
          <div v-if="!show3">
            <p style="text-align: center; margin-top: 100px;">
              <img src="@/assets/img/暂无数据.png" alt />
              <br />近一天没有历史数据
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
        if (res.msg == "ok") {
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
                    console.log(res.msg);
                    this.show1 = false;
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
                    this.show2 = false;
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
                    this.show3 = false;
                  }
                });
              }
            });
          }
        }

        //  this.deviceList(item=>{

        //  })
        else {
          console.log("tu");
          this.loading1 = false;
          this.loading2 = false;
          this.loading3 = false;
          this.show1 = false;
          this.show2 = false;
          this.show3 = false;
        }
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
            // dataZoom: {
            //   yAxisIndex: "none"
            // },
            // dataView: { readOnly: false },
            // magicType: { type: ["line", "bar"] },
            // restore: {},
            // saveAsImage: {}
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
            // dataZoom: {
            //   yAxisIndex: "none"
            // },
            // dataView: { readOnly: false },
            // magicType: { type: ["line", "bar"] },
            // restore: {},
            // saveAsImage: {}
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
  height: 380px;
}
#map {
  height: 300px;
  width: 100%;
  padding: 0px;
  margin: 0px;
}
.heartRate {
  height: 380px;
  width: 100%;
  margin-top: 30px;
}
.left {
  float: left;
  margin-left: 1%;
  width: 49%;
  height: 350px;
}
.right {
  float: left;
  width: 49%;
  margin-left: 1%;
  height: 350px;
}
#wendu {
  width: 100%;
  height: 300px;
  /* background-color: rgb(92, 51, 51); */
}
#heart {
  width: 100%;
  height: 300px;
  /* background-color: rgb(92, 51, 51); */
}
.card {
  /* background-color: #143757; */
  z-index: 50;
  background-size: 100% 100%;
  backdrop-filter: blur(15px);
  /* box-shadow: 1px 1px 10px rgba(93, 93, 93, 0.5); */
  border-radius: 15px;
  border-radius: 30px;
  min-height: 100px;
}
</style>
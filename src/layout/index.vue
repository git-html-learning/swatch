<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <!-- 代表侧边栏 -->
    <div class="main-container">
      <!-- 页面的主要内容区域-->
      <div :class="{'fixed-header':fixedHeader}">
        <navbar @handleRing="handleRing" />
        <!-- 表示右上方的 navbar,  面包屑的功能也在这个组件内  -->
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from "./components";
import ResizeMixin from "./mixin/ResizeHandler";
import { allProductKey, getDeviceDatas } from "@/api/index";
import { UserDetail } from "@/api/admin";
export default {
  name: "Layout",
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  data() {
    return {
      ring: [false, false],
      timer: "",
      alertMessage: [],
      latestAlert: [],
      content: "SOS报警",
      sosMessage: "",
      marker1: null,
      fenceList: [],
      alertContent: "",
      date: "",
    };
  },
  mounted() {
    this.initWebSocket(); //页面渲染的时候，对ws进行初始化
    this.timer = setInterval(this.deviceData, 60000);
    setInterval(this.timer1, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
    if (this.date) {
      clearInterval(this.timer1);
    }
  },
  created() {
    this.deviceData();
  },
  //监听有没有报警信息  利用ws
  watch: {
    ring() {
      if (this.ring[0] == true) {
        this.btnClick0();
      } else if (this.ring[1] == true) {
        this.btnClick1();
      }
    },
    latestAlert() {
      if (this.latestAlert.length !== 0) {
        this.btnClick0();
      }
    },
    sosMessage() {
      if (this.sosMessage == "SOS") {
        this.btnClick1();
      }
    }
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
      //是否展示左侧sidebar，通过cookie获得
    },

    device() {
      return this.$store.state.app.device;
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile"
      };
    }
  },
  methods: {
    initWebSocket() {
      this.websock = new WebSocket("wss://smartwatch.ahusmart.com/api/v1/ws"); //这个连接ws://固定，后面的根据自己的IP和端口进行改变，我设置监听的就是8081
      console.log(this.websock);
      this.websock.onmessage = this.websocketonmessage;

      this.websock.onerror = this.websocketonerror;
      this.websock.onopen = this.websocketonopen;
      this.websock.onclose = this.websocketclose;
    },
    websocketonopen() {
      // 连接建立之后执行send方法发送数据，这个和自己的后端沟通好需要传什么数据，我的是要进行token验证
      var data = {
        type: "REGISTER",
        data: "message"
      };
      this.websock.send(JSON.stringify(data));
      this.websock.send("connection");
    },
    websocketonerror() {
      //连接错误
      console.log("WebSocket连接失败");
    },
    websocketonmessage(e) {
      // 数据接收
      console.log(e);
      this.sosMessage = JSON.parse(e.data).content;
      console.log(this.sosMessage);
    },
    // websocketclose (e) {  // 关闭连接
    // 	console.log('已关闭连接', e)
    // },
    //获取手环信息函数，因为需要不断检测判定体温和心率判断是否报警，所以要不断请求
    // 10s请求一次
    timer1() {
      this.date = Math.round(new Date().getTime() / 1000);
      // console.log(this.date)
    },
    deviceData() {
      this.outAlert = [];
      UserDetail().then(res => {
        // console.log(res);
        this.fenceList = res.data.extraInfo.fence;
        var fenceData = res.data;
        window.sessionStorage.setItem(
          "fenceList",
          JSON.stringify(this.fenceList)
        );
        // console.log(fenceList)
        window.sessionStorage.setItem("fenceData", JSON.stringify(fenceData));
      });
      allProductKey().then(res => {
        if (res.msg == "ok") {
          console.log(res);
     
          this.productNameList = res.data.productKeys;
          // console.log(this.productNameList);
          getDeviceDatas({
            username: "智能手环测试",
            pkList: this.productNameList,
            startTime: 100000
          }).then(res => {
            console.log(res);

            this.productList1 = res.data;
            // this.loading = false;

            this.productList1.forEach(item => {
              item.deviceName = [];
              item.latestData = {};
              if (item.deviceData !== null) {
                for (var i = 0; i < item.deviceData.length; i++) {
                  item.deviceName.push(item.deviceData[i].deviceName);
                }
                if (item.extraInfo.fence !== "-") {
                  for (var i = 0; i < this.fenceList.length; i++) {
                    if (
                      item.extraInfo.fence == this.fenceList[i].fence.fenceName
                    ) {
                      item.latestData.fence = this.fenceList[i].fence.data;
                    }
                  }
                } else {
                  item.latestData.fence = "-";
                }
                console.log(item);
                if (item.deviceName.includes("BA")) {
                  item.latestData.body =
                    item.deviceData[
                      item.deviceName.indexOf("BA")
                    ].extraInfo.body;
                  item.latestData.skin =
                    item.deviceData[
                      item.deviceName.indexOf("BA")
                    ].extraInfo.skin;
                }
                if (item.deviceName.includes("C2")) {
                  item.latestData.heartRate =
                    item.deviceData[
                      item.deviceName.indexOf("C2")
                    ].extraInfo.BPHeart;
                  item.latestData.bpHigh =
                    item.deviceData[
                      item.deviceName.indexOf("C2")
                    ].extraInfo.BPHigh;
                  item.latestData.bpLow =
                    item.deviceData[
                      item.deviceName.indexOf("C2")
                    ].extraInfo.BPLow;
                }
                if (item.deviceName.includes("F6")) {
                  item.latestData.stepNum =
                    item.deviceData[
                      item.deviceName.indexOf("F6")
                    ].extraInfo.StepNum;
                  item.latestData.heart =
                    item.deviceData[
                      item.deviceName.indexOf("F6")
                    ].extraInfo.timeStamp;
                }
                if (item.deviceName.includes("A4")) {
                  item.latestData.location =
                    item.deviceData[item.deviceName.indexOf("A4")].extraInfo;
                }
              } else {
                item.latestData = {
                  body: "-",
                  skin: "-",
                  heartRate: "-",
                  bpHigh: "-",
                  bpLow: "-",
                  stepNum: "-",
                  location: "",
                  heart: "-",
                  fence: "-"
                };
              }

              // console.log(item.deviceData.length)
            });
            console.log(this.productList1);
            this.productList1.forEach(item => {
              if (item.latestData.location !== "") {
                var marker = item.latestData.location.location;
                var array = marker.split(",");
                this.marker1 = new BMap.Point(array[0], array[1]);
                // 之前直接写 var polygon = new BMap.Polygon(item.latestData),返回的
                // 全部是不在围栏内
                //所以以下的数据处理是很是重要的
                var polArry = [];
                item.latestData.fence.forEach(item1 => {
                  var p = new BMap.Point(item1.lng, item1.lat);
                  polArry.push(p);
                });
                var polygon = new BMap.Polygon(polArry);
                // console.log(polygon)
                // console.log(this.marker1)
                if (BMapLib.GeoUtils.isPointInPolygon(this.marker1, polygon)) {
                  console.log("目前在电子围栏");
                } else {
                  console.log("目前不在电子围栏内");
                  this.outAlert.push(item);
                }
              }
            });
            this.alertContent = "";
            if (this.outAlert.length !== 0) {
              for (var i = 0; i < this.outAlert.length; i++) {
                this.alertContent += this.outAlert[i].productName + " ";
              }
              this.alertContent += "不在其对应的电子围栏内";
              alert(this.alertContent);
            }
            window.localStorage.setItem(
              "productList1",
              JSON.stringify(this.productList1)
            );
            //判断点是否在电子围栏内

            this.alertMessage = [];
            this.latestAlert = [];
            for (var i = 0; i < this.productList1.length; i++) {
              var obj = {
                productName: this.productList1[i].productName,
                alertData: []
              };
              //温度和心率报警
              this.date = Math.round(new Date().getTime() / 1000);
              // console.log(this.productList1[i].latestData.heart);
              if (this.productList1[i].latestData.heart !== "-") {
                // console.log(this.date - this.productList1[i].latestData.heart);
                if (this.date - this.productList1[i].latestData.heart <= 7200) {
                  // console.log("wer")
                  if (this.productList1[i].latestData.body !== "-") {
                    if (
                      this.productList1[i].latestData.body > 37 ||
                      this.productList1[i].latestData.body < 35
                    ) {
                      obj.alertData.push({ alert: "温度报警" });
                    }
                  }
                  if (this.productList1[i].latestData.heartRate !== "-") {
                    //  console.log(this.productList1)
                    if (
                      this.productList1[i].latestData.heartRate > 100 ||
                      this.productList1[i].latestData.heartRate < 60
                    ) {
                      obj.alertData.push({ alert: "心率报警" });
                    }
                  }
                }
              }
              this.alertMessage.push(obj);
            }
            // console.log(this.alertMessage);
            for (var i = 0; i < this.alertMessage.length; i++) {
              if (this.alertMessage[i].alertData.length != 0) {
                this.latestAlert.push(this.alertMessage[i]);
              }
            }
            // console.log(this.latestAlert);
          });
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    handleClickOutside() {
      this.$store.dispatch("app/closeSideBar", { withoutAnimation: false });
    },
    handleRing(r) {
      this.ring = r;
      console.log(this.ring);
    },
    btnClick1() {
      this.$popup({
        btnText: "详情",
        content: this.content,
        click: () => {
          // 点击按钮事件
          this.$router.push({ path: "/device/alertData" });
        }
      });
    },
    btnClick0() {
      this.$alarm({
        btnText: "详情",
        content: "温度或心率警报",
        click: () => {
          // 点击按钮事件
          this.$router.push({ path: "/products/index" });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>

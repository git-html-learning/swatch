<template>
  <div class="layout">
    <div
      id="background"
      style="position: absolute; z-index: -1; width:100%; height:100%; top:0px; left:0px;   background-color: rgba(227, 241, 247,0.3)"
    >
      <!-- <img src="./主页背景.png" width="100%" height="100%" /> -->
    </div>
<div v-show = "mapShow"   style = "position: absolute; left: 15%;  top: 10%; z-index: 100; height: 500px; width: 70%; ;">
  <p style = "height: 50px; width: 100%; background-color: #fff;">
    <span style= "height: 50px;  background-color: #fff;color: #000; font-size: 25px; line-height: 50px; margin-left: 30px;">电子围栏展示({{title}})</span>
 <i @click = "close" class = "el-icon-close"  style = "float: right; font-size: 30px; line-height: 50px; margin-right: 20px;"></i>
  </p>
<div id = "mapBody" style = "width: 100%; height: 450px;"></div>
</div>
    <el-header>
      <el-page-header @back="goBack" content="电子围栏列表"></el-page-header>
    </el-header>
    <el-card class="body">

      <el-table
        :data="fenceList"
        v-loading="loading"
        element-loading-text="数据加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="#fff"
        stripe
        :header-cell-style="{ color: '#a38972', background: '#ebf7f7' }"
        style="width: 100%;margin-top: 50px;color: #81a7ac"
      >
        <el-table-column prop="fence.fenceName" label="电子围栏" min-width="20" align="center"></el-table-column>
        <el-table-column prop="fence.updateAt" label="创建时间" min-width="20" align="center"></el-table-column>
        <el-table-column align="center" label="操作" min-width="20">
          <template slot-scope="scope">
            <el-button
              type="success"
              plain
              icon="el-icon-more"
              size="mini "
              @click="detailFence(scope.row)"
            ></el-button>
            <el-button
              type="danger"
              plain
              icon="el-icon-delete"
              size="mini "
              @click="deleteItem(scope.row,scope.$index)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <baidu-map class="map" style = "height: 300px; width: 300px;" :center="{lng: 116.404, lat: 39.915}" :zoom="15" :scroll-wheel-zoom="true">
      </baidu-map>-->
    </el-card>
  </div>
</template>

<script>
import { UserDetail, EditUser } from "@/api/admin";
export default {
  created() {
    this.userData();
  },

  data() {
    return {
      fenceList: [], //用于table的显示数组
      fenceData: {}, //用于修改用户信息，本页面主要用于删除设备
      dialogVisible: false,
      loading: true,
      center: {lng: 104.00909, lat: 35.473013}, // 中心点坐标
      polylinePath: [],
        map: null,
        zoom: 6,
        localPoint:[],
             styleOptions: {
        strokeColor: "#5E87DB", // 边线颜色
        fillColor: "#5E87DB", // 填充颜色。当参数为空时，圆形没有填充颜色
        strokeWeight: 2, // 边线宽度，以像素为单位
        strokeOpacity: 1, // 边线透明度，取值范围0-1
        fillOpacity: 0.2 // 填充透明度，取值范围0-1
      },
      title: "",
mapShow: false,
polArry: [],
pointArray:[],
polygon: [],
    };
  },
    mounted() {
    this.map = new BMap.Map("mapBody", {
      enableMapClick: false,
      minZoom: 5,
      maxZoom: 15
    });
    // 设置中心点坐标和地图级别
    // this.map.centerAndZoom(
    //   new BMap.Point(this.center.lng, this.center.lat),
    //   10
    // );
    this.map.centerAndZoom(new BMap.Point(this.center.lng, this.center.lat),
      this.zoom);
    this.map.enableScrollWheelZoom(true);
  },

  methods: {
    userData() {
      var username = window.sessionStorage.getItem("username")
      UserDetail(username).then(res => {
        console.log(res);
        if (res.msg == "ok") {
          this.fenceList = res.data.extraInfo.fence;
          this.fenceData = res.data;
          this.loading = false;
        } else {
          this.$message.error(res.msg);
        }
        // this.fenceList = res.data.extraInfo.fence
        // console.log(this.fenceList)
        // this.fenceData = res.data;
        // console.log(this.fenceData)
      });
      // this.fenceList = JSON.parse(window.sessionStorage.getItem('fenceList'))
      // this.fenceData = JSON.parse(window.sessionStorage.getItem('fenceData'))
      //         console.log(this.fenceData)
    },
    deleteItem(i, index) {
      this.$confirm("此操作将永久删除该围栏, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        console.log(index);
        this.fenceList.splice(index, 1);
        console.log(this.fenceList);
        this.fenceData.extraInfo.fence = this.fenceList;
        console.log(this.fenceData);
        EditUser(this.fenceData).then(res => {
          if (res.msg == "ok") {
            this.$message.success("删除成功");
            this.userData();
          }
        });
      });
    },
    goBack() {
      this.$router.push({ path: "/fence/index" });
    },
    detailFence(val) {
      this.mapShow = true;
      
      setTimeout(this.deal,1000);
      // console.log(val.fence);
      this.center = val.fence.data[0]
      this.title = val.fence.fenceName;
      this.localPoint = val.fence.data;
  

 this.pointArray = [];
 this.polArry = [];
 this.polygon = [];
   this.map.clearOverlays(); //清除地图覆盖物
   this.center={lng: 104.00909, lat: 35.473013};
   this.zoom = 6;
      this.map.centerAndZoom(new BMap.Point(this.center.lng, this.center.lat),
      this.zoom);
    },
    deal() {
    
      this.localPoint.forEach(item => {
        var p = new BMap.Point(item.lng, item.lat);
        this.polArry.push(p);
      });
      console.log(this.polArry);
     this.polygon = new BMap.Polygon(this.polArry, this.styleOptions);
    
      this.map.addOverlay(this.polygon);
     
      this.pointArray = this.pointArray.concat(this.polygon.getPath());
      this.map.setViewport(this.pointArray); //调整视野
    },

    close() {
      this.mapShow = false;
    }
  }
};
</script>

<style lang = "scss" scoped>
.layout {
  padding: 20px 30px;
  height: 80vh;
  width: 100%;
}
.body {
  z-index: 50;
  background-color: rgba(255, 255, 255, 0.1);
  background-size: 100% 100%;
  backdrop-filter: blur(15px);
  box-shadow: 2px 2px 10px rgba(93, 93, 93, 0.5);
  border-radius: 15px;
}
</style>

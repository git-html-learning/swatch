<template>
  <div class="layout" style="z-index: 300">
    <!-- <span style = "color: #fff; font-size: 30px;"> 12{{cente}}</span> -->
    <div style="position: absolute; left: 50px; top: -20px">
      <select
        v-model="selectedValue"
        placeholder="请选择电子围栏"
        @change="changeFence(selectedValue)"
        class="select"
      >
        <option
          v-for="item in options"
          :key="item.fence.fenceName"
          :label="item.fence.fenceName"
          :value="item.fence.data"
        ></option>
      </select>
    </div>
    <div
      id="container"
      style="height: 100%; width: 100%; background-color: #fff; border-radius: 30px;"
    ></div>
  </div>
</template>
<script>
import { UserDetail } from "@/api/admin";
export default {
  props: ["cente"],

  name: "mapDetail",
  watch: {
    cente(newValue, oldValue) {
      if (newValue !== oldValue) {
        // this.fetch(); //这里里面放你代码的逻辑
        console.log(newValue);
        // console.log("1")
        this.center = newValue;
        this.reset();
      }
    },
    mmediate: true
  },
  data() {
    return {
      map: null,
      center: "重庆市",
      productList: [],
      selectedValue: "",
      options: [],
      styleOptions: {
        strokeColor: "#5E87DB", // 边线颜色
        fillColor: "#5E87DB", // 填充颜色。当参数为空时，圆形没有填充颜色
        strokeWeight: 2, // 边线宽度，以像素为单位
        strokeOpacity: 1, // 边线透明度，取值范围0-1
        fillOpacity: 0.2 // 填充透明度，取值范围0-1
      },
      zoom: 5
    };
  },
  created() {
    console.log(this.center);
    this.getFenceData();
  },
  mounted() {
    this.reset();
  },
  methods: {

    reset() {
      console.log(this.center)
      if (this.center !== "重庆市") {
        this.zoom = 10;
      } else {
        this.zoom = 5;
      }

      console.log(this.zoom);
      this.map = new BMap.Map("container", {
        enableMapClick: false,
        minZoom: 5,
        maxZoom: 30
      });
      // 设置中心点坐标和地图级别
      // this.map.centerAndZoom(
      //   new BMap.Point(this.center.lng, this.center.lat),
      //   10
      // );
      this.map.centerAndZoom(this.center, this.zoom);
      // this.map.setCenter("合肥市")
      this.map.enableScrollWheelZoom(true);
      this.map.addControl(
        new BMap.MapTypeControl({
          mapTypes: [BMAP_HYBRID_MAP, BMAP_NORMAL_MAP]
        })
      );
      this.productList = JSON.parse(
        window.localStorage.getItem("productList1")
      );
      console.log(this.productList);
      this.productList.forEach((item, index) => {
        // console.log(item.latestData.location)
        if (item.latestData.location !== "-") {
          // console.log(item.latestData.location)
          var markerArr = {
            point: item.latestData.location.location,
            address: item.latestData.location.desc,
            title: item.productName,
            status: item.extraInfo.status
          };
          var marker = item.latestData.location.location;
          var array = marker.split(",");
          var x = array[0];
          var y = array[1];
          var X_PI = (Math.PI * 3000.0) / 180.0;
          // var x = 116.32652,
          //   y = 39.995685;
          var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI);
          var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI);
          var bd_lng = z * Math.cos(theta) + 0.0065;
          var bd_lat = z * Math.sin(theta) + 0.006;

          // this.marker1 = new BMap.Marker(
          //   new BMap.Point(array[0], array[1])
          // );
          // this.map.addOverlay(this.marker1);
          this.marker1 = this.addMarker(
            new window.BMap.Point(bd_lng, bd_lat),
            markerArr
          );
          this.addInfoWindow(this.marker1, markerArr, index);
        }
      });
    },
    getFenceData() {
      // this.options = JSON.parse(window.sessionStorage.getItem("fenceList"));
      var username = window.sessionStorage.getItem("username");
      UserDetail(username).then(res => {
        if (res.msg == "ok") {
          this.options = res.data.extraInfo.fence;
          console.log(this.options);
          this.options.push({
            fence: {
              fenceName: "空围栏",
              data: ""
            }
          });
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    addMarker(point, i) {
      // console.log(i)
      if (i.status == "离线") {
        var myIcon = new BMap.Icon(
          require("@/assets/img/定位红.png"),
          new BMap.Size(50, 50)
        );
      }
      if (i.status == "在线") {
        var myIcon = new BMap.Icon(
          require("@/assets/img/定位绿.png"),
          new BMap.Size(50, 50)
        );
      }
      var marker = new BMap.Marker(point, {
        icon: myIcon
      });
      var labelopts = {
        position: point, // 指定文本标注所在的地理位置
        offset: new BMap.Size(-30, -30) // 设置文本偏移量
      };
      var label = new BMap.Label(i.title, labelopts);
      label.setStyle({
        color: "#181b40",
        fontSize: "14px",
        backgroundColor: "0.05",
        backgroundColor: "rgba(255,255,255,0.7)",
        border: "0",
        fontWeight: "bold"
      });
      this.map.addOverlay(marker);
      // this.map.addOverlay(label);
      return marker;
    },
    // 添加信息窗口
    addInfoWindow(marker, poi) {
      //pop弹窗标题
      // console.log(poi)
      var title =
        '<div style="font-weight:bold;color:#CE5521;font-size:18px；background:transparent !important;">' +
        "手环信息" +
        "</div>";
      //pop弹窗信息
      var html = [];
      // html.push(
      //   '<div style="font-weight:bold;color:#CE5521;font-size:12px； margin-top: 40px;">' +
      //     poi.title +
      //     "</div>"
      // );

      html.push(
        '<table cellspacing="0" style="table-layout:fixed;width:100%;font:12px arial,simsun,sans-serif; margin-top: 10px;background:transparent !important;"><tbody>'
      );
      html.push("<tr style = 'height: 25px;'>");
      html.push(
        '<td style="vertical-align:top;line-height:16px;width:38px;white-space:nowrap;word-break:keep-all">状态:</td>'
      );
      html.push(
        '<td style="vertical-align:top;line-height:18px;">' +
          poi.status +
          " </td>"
      );
      html.push("</tr>");
      html.push("<tr style = 'height: 25px;'>");
      html.push(
        '<td style="vertical-align:top;line-height:16px;width:38px;white-space:nowrap;word-break:keep-all">名称:</td>'
      );
      html.push(
        '<td style="vertical-align:top;line-height:18px;">' +
          poi.title +
          " </td>"
      );
      html.push("</tr>");
      html.push("<tr style = 'height: 25px;'>");
      html.push(
        '<td style="vertical-align:top;line-height:16px;width:38px;white-space:nowrap;word-break:keep-all">坐标:</td>'
      );
      html.push(
        '<td style="vertical-align:top;line-height:18px;">' +
          "(" +
          poi.point +
          ")" +
          " </td>"
      );
      html.push("</tr>");
      html.push("<tr style = 'height: 25px;'>");
      html.push(
        '<td style="vertical-align:top;line-height:16px;width:38px;white-space:nowrap;word-break:keep-all">地址:</td>'
      );
      html.push(
        '<td style="vertical-align:top;line-height:18px;">' +
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
    changeFence(value) {
      console.log(value);
      if (value == "") {
        this.reset();
      } else {
          this.localPoint = value;
      var polArry = [];
      this.localPoint.forEach(item => {
        var p = new BMap.Point(item.lng, item.lat);
        polArry.push(p);
      });
      // console.log(polArry);
      var polygon = new BMap.Polygon(polArry, this.styleOptions);
      this.map.clearOverlays(); //清除地图覆盖物
      this.addPiont();
      this.map.addOverlay(polygon);
      var pointArray = [];
      pointArray = pointArray.concat(polygon.getPath());
      this.map.setViewport(pointArray); //调整视野
      }
    
    },
    addPiont() {
      this.productList.forEach((item, index) => {
        // console.log(item.latestData.location)
        if (item.latestData.location !== "-") {
          // console.log(item.latestData.location)
          var markerArr = {
            point: item.latestData.location.location,
            address: item.latestData.location.desc,
            title: item.productName,
            status: item.extraInfo.status
          };
          var marker = item.latestData.location.location;
          var array = marker.split(",");
          var x = array[0];
          var y = array[1];
          var X_PI = (Math.PI * 3000.0) / 180.0;
          // var x = 116.32652,
          //   y = 39.995685;
          var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI);
          var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI);
          var bd_lng = z * Math.cos(theta) + 0.0065;
          var bd_lat = z * Math.sin(theta) + 0.006;

          // this.marker1 = new BMap.Marker(
          //   new BMap.Point(array[0], array[1])
          // );
          // this.map.addOverlay(this.marker1);
          this.marker1 = this.addMarker(
            new window.BMap.Point(bd_lng, bd_lat),
            markerArr
          );
          this.addInfoWindow(this.marker1, markerArr, index);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.layout {
  z-index: 300;
  .select {
    width: 90%;
    height: 40px;
    padding: 0px 20px;
    border-radius: 15px;
    float: left;
    margin-left: 2%;
    background-color: #798a6c !important;
    color: #fff;
    border: 1px solid #798a6c;
    outline: none;
  }
}
</style>
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
    <el-carousel indicator-position="outside" :interval = "5000">
    <el-carousel-item v-for="(item,index) in productList" :key="index">
      <!-- <h3>{{ item }}</h3> -->
  <div class="title">最新温度心率统计
      <span>({{item.productName}})</span>
  </div>
      <div class = "item.productName" style = "width: 100%; height: calc(100% - 40px); ">
          {{index}}
      </div>
    </el-carousel-item>
  </el-carousel>el-carousel
  </div>
</template>
<script>
import { historyDataNum } from "@/api/index";
import * as echarts from "echarts";
export default {
    name: "charts",
    created() {
this.prepare();
    },
    data() {
        return {
            loading: true,
            productList:[],

        }
    },
    methods: {
        prepare() {
            this.productList =  JSON.parse(window.sessionStorage.getItem("productList2"));
       console.log(this.productList)
       if(this.productList.length !==0) {
           this.productList.forEach(item=>{
if (item.latestData.body !== "-") {
    var obj = {
        productKey: item.productKey,
        deviceKey:""
    }
    item.devcieData.forEach(item1=>{
        if (item1.deviceName == "BA") {
            obj.deviceKey = data.deviceKey
        }
    })
}
           })
       }
       this.loading = false;
       }
    }
}
</script>
<style lang="scss" scoped>
           .title {
          height: 40px;
          line-height: 40px;
          vertical-align: middle;
          padding-left: 15px;
          font-size: 16px;
          font-weight: 600;
          color: #03c2ec;
          text-align: left;
        }
</style>
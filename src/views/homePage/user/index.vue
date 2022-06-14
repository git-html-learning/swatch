<template>
    <div class="layout">
<div class="title"   style="text-align: center;
               color: #00f6ff; font-size: 23px; line-height: 60px; height: 60px;">
    <img src="@/assets/img/icon05.png" alt="">
当前手环基本信息   
</div>
<el-card style = "height: 300px; width: 30%; margin-left: 35%; background: transparent; backdrop-filter: blur(20px);
      box-shadow: 1px 1px 10px rgba(93, 93, 93, 0.5);
      border-radius: 15px;
      z-index: 5;">
      <el-row>
        <!-- <el-col :span = "6" style = "line-height: 300px;">
        </el-col>
        <el-col :span = "18"></el-col> -->
        手环名称：
      </el-row>
      </el-card>

  
    </div>
</template>
<script>
import { UserDetail } from "@/api/admin";
import { getDeviceDatas } from "@/api/index";
export default {
name:"user",
data() {
    return {
        user:"",
        productKey:"",
    }
},
created() {
    this.prepare();
},
methods: {
    prepare() {
        var username = window.sessionStorage.getItem("username")
        UserDetail(username).then((res)=>{
            console.log(res)
            if(res.msg == "ok") {
                this.productKey = res.data.extraInfo.productKey
                console.log(this.productKey)
                ProductOne(this.productKey).then((res1)=>{
                    console.log(res1)
                })
            }
        })
    }
}
}
</script>
<style lang="scss" scoped>
    .layout {
        padding: 10px;
        background-color: #fff;
    }
</style>
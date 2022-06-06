<template>
    <div class="layout">
            <div
      id="background"
      style="position: absolute; z-index: -1; width:100%; height:100%; top:0px; left:0px;   background-color: rgba(227, 241, 247,0.1)"
    >
      <!-- <img src="./主页背景.png" width="100%" height="100%" /> -->
    </div>
        <el-card>
<div slot = "header"> 
    分组
</div>

        </el-card>
    </div>

</template>
    <script>
    import { UserDetail } from "@/api/admin";
    export default {
        data() {
            return {
 detail: null,
 productList:[],
            }
           
        },
        created() {
this.prepare();
        },
        methods: {
prepare() {
          UserDetail().then(res => {
        console.log(res);
        if (res.msg == "ok") {
          this.detail = res.data.extraInfo.group;
          console.log(this.detail)
          this.loading = false;
        } else {
          this.$message.error(res.msg);
        }
})
this.productList =JSON.parse(window.localStorage.getItem("productList1"));
console.log(this.productList)
},
        }
      
    }
    </script>
<style lang="scss" scoped>  
    .layout {
        padding: 10px;
    }
</style>
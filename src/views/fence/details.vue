<template>
    <div class="layout">
    <el-header>
      <el-page-header @back="goBack" content="电子围栏列表"></el-page-header>
    </el-header>
        <div class="body">
            <el-table :data="fenceList"
            stripe 
                 :header-cell-style="{ color: '#a38972', background: '#ebf7f7' }"
                      style="width: 100%;margin-top: 50px;color: #81a7ac">
              <el-table-column prop="fence.fenceName"
                               label="电子围栏"
                               min-width="20"
                               align = "center"> 
              </el-table-column>
              <el-table-column prop="fence.updateAt"
                               label="创建时间"
                               min-width="20"
                                align = "center">
              </el-table-column>
     <el-table-column align="center" label="操作" min-width="20">
          <template slot-scope="scope">
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
        </div>
       
    </div>
</template>
<script>
import {
UserDetail,
EditUser
} from "@/api/admin";
export default {
    created() {
        this.userData();
    },
    data() {
        return {
            fenceList: [],   //用于table的显示数组
            fenceData:{},    //用于修改用户信息，本页面主要用于删除设备
        }
    },
    methods: {
        userData() {
            // UserDetail().then((res)=>{
            //     console.log(res)
            //     this.fenceList = res.data.extraInfo.fence
            //     console.log(this.fenceList)
            //     this.fenceData = res.data;
            //     console.log(this.fenceData)
            // })
            this.fenceList = JSON.parse(window.sessionStorage.getItem('fenceList'))
            this.fenceData = JSON.parse(window.sessionStorage.getItem('fenceData'))
        },
                deleteItem(i,index) {

   this.$confirm("此操作将永久删除该围栏, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(()=>{
                              console.log(index)
this.fenceList.splice(index,1)
console.log(this.fenceList)
this.fenceData.extraInfo.fence = this.fenceList;
console.log(this.fenceData)
        EditUser(this.fenceData).then((res)=>{
         if (res.msg == "ok") {
             this.$message.success("删除成功")
         }
        })
      })
    },
    goBack() {
this.$router.push({ path: '/fence/index' })
    }
    }
}
</script>

<style scoped>
    .layout {
padding: 20px 30px;
height: 80vh;
width: 100%;
}
</style>

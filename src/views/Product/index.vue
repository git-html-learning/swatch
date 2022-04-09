<template>
  <div class="mixin-components-container">
    <!-- :visible指的是属性绑定，表示弹框的显示隐藏 -->
    <!-- viewMoreproduct的值为true时，弹框显示，false弹框隐藏 -->
    <!-- .sync是同步动态双向的来表示visible的值,关闭窗口的时候，弹框隐藏了，visible的值发生了变化 -->
    <!-- visible.sync的原理，用于子组件修改父组件中的值，实现双向绑定功能。 -->
    <el-dialog :title="diglogTitle" :visible.sync="viewMoreproduct" :before-close="detailproduct">
      <!-- before-close：关闭前的回调，会暂停 Dialog 的关闭 -->

      <product-detail @beforeClose="closeDialog" :condition="condition" :productdetail="detail" />
    </el-dialog>
    <el-row>
      <el-card class="box-card">
        <!-- Card 组件包括header和body部分，header部分需要有显式具名 slot 分发，同时也是可选的。 -->
        <div slot="header" style="margin-bottom: 50px">
          <el-col :span="3" class="text-center">
            <router-link class="pan-btn blue-btn" to="/product/createProduct">创建手环</router-link>
          </el-col>
        </div>
        <!-- data绑定的数据是搜索筛选的数据 -->
        <div class="clearfix">
          <!-- clearfix 主要是用在浮动层的父层，而 clear 主要是用在浮动层与浮动层之间 -->
          <!-- 主要借助 tableData的数组分割来实现分页。currentPage是当前页数，pagesize是每页展示的条数  -->
          <el-table v-if= "tableShow"
            :data="
              productList
                .filter(
                  (data) =>
                    !search ||
                    data.productName
                      .toLowerCase()
                      .includes(search.toLowerCase())
                )
                .slice((currentPage - 1) * pageSize, currentPage * pageSize)
            "
            border
            stripe
            v-loading="loading"
            element-loading-text="数据加载中"
            element-loading-spinner="el-icon-loading"
          >
            <!-- 搜索设备名 -->
            <el-table-column align="center" min-width="30" prop="productName" label="设备名称">
              <template slot="header" slot-scope="scope">
                <!-- 不点击显示产品名称，搜索框绑定一个点击事件，点击一下，show变成false -->
                <div v-show="show">
                  <el-row type="flex" justify="center">
                    <el-col :span="23">产品名称</el-col>
                    <el-col :span="1">
                      <i class="el-icon-search" @click="show = !show"></i>
                    </el-col>
                  </el-row>
                </div>
                <!-- 点击显示搜索框 -->
                <div v-show="!show">
                  <el-input
                    placeholder="请输入产品名"
                    label
                    suffix-icon="el-icon-search"
                    size="mini"
                    v-model="search"
                  ></el-input>
                </div>
              </template>
            </el-table-column>


            <el-table-column align = "center" label = "IMEI" min-width = "20" prop = "extraInfo.nickname">
              </el-table-column>
            <!-- 表头 -->
                 <el-table-column align = "center" label = "体温" min-width = "20" prop = "latestData.body">
              </el-table-column>
                       <el-table-column align = "center" label = "手腕温度" min-width = "20" prop = "latestData.skin">
              </el-table-column>
               <el-table-column align = "center" label = "心率" min-width = "20" prop = "latestData.heartRate">
              </el-table-column>
              <el-table-column align = "center" label = "收缩压" min-width = "20" prop = "latestData.bpHigh">
              </el-table-column>
                        <el-table-column align = "center" label = "舒张压" min-width = "20" prop = "latestData.bpLow">
              </el-table-column>
              <el-table-column align = "center" label = "步数" min-width = "20" prop = "latestData.stepNum">
              </el-table-column>

            <!-- 按钮 -->
            <el-table-column align="center" label="操作" min-width="20">
              <template slot-scope="scope">
                <el-button
                  type="success"
                  plain
                  icon="el-icon-more"
                  size="mini "
                  @click="detailproduct(scope.row)"
                ></el-button>
                <el-button
                  type="primary"
                  plain
                  icon="el-icon-edit"
                  size="mini "
                  @click="editproduct(scope.row)"
                ></el-button>
                <el-button
                  type="danger"
                  plain
                  icon="el-icon-delete"
                  size="mini "
                  @click="deleteproduct(scope.$index, scope.row, productList)"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>

          <!-- 分页 -->
          <el-pagination
            v-show="
              productList.filter(
                (data) =>
                  !search ||
                  data.productName.toLowerCase().includes(search.toLowerCase())
              ).length > 1
            "
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 20, 40]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import {
  Delete_product,
  ProductNum,
  cloudDevcieDelete,
  allProductKey,
  NewDeviceDataOne,
  ProductOne
} from "@/api/index";
import productDetail from "./productDetail";
export default {
  name: "product",
  components: {
    productDetail
  },
  data() {
    return {
      productList: [],
      productNameList: [],
      loadingtext: "数据加载中",

      loading: true,

      diglogTitle: "产品详情",
      condition: 0,
      detail: {},
      search: "",
      show: true,
      viewMoreproduct: false,
      product: {
        protocolType: "接入类型",
        productType: "产品类型",
        typeIdentify: "产品识别符"
      },
      currentPage: 1,
      // currentPage 初始页
      pageSize: 10,
      // 每页的数据
      DeleteKey: { productKey: "" },
      deleteId: "",
      //用于设备注册的7个数据
      tableShow: true,
      timer: "",
    };
  },
  computed: {
    total() {
      return this.productList.filter(
        data =>
          !this.search ||
          data.productName.toLowerCase().includes(this.search.toLowerCase())
      ).length;
    }
  },
  created() {
    // this.$store.dispatch("productNum");
    this.products();
  },
//     mounted() {
//    this.timer =  setInterval(this.products, 5000);
//   },
//   beforeDestroy(){
//  clearInterval(this.timer);
//   },
  // vue 网页loading加载状态

  // 在提交按钮上加入                  :loading="loading"（注意前面有冒号）

  // 在return下加入                       loading: false, 先声明一下

  // 在刚进入提交方法时              this.loading = true    开始启动加载状态

  // 当提交之后完成加载状态       this.loading = false

  methods: {
    products() {
      // console.log(this.$store.state.other.productNums)
      // this.productList = this.$store.state.other.productNums;

  
      // //扩充productList的内容，使其包含device的内容
      // // ProductNum().then((res) => {
      // //   if (res.code == 200) {
      // //     this.productList = res.data.productInfo;
      // //     console.log(this.productList);
      // //     this.loading = false;
      // //   }
      // // });
      // // 1. 获取所有pk
      // allProductKey().then(res => {
      //   // console.log(res)
      //   if (res.msg == "ok") {
      //     this.productNameList = res.data.productKeys;
      //     // console.log(this.productNameList)
      //     this.productList = [];
      //     //2. 每一个产品的详细信息
      //     this.productNameList.forEach(item => {
      //       // console.log(item)
      //       ProductOne(item).then(res => {
      //         var obj = [];
      //         for (var i=0;i<res.data.deviceInfo.length;i++) {
      //           obj.push(res.data.deviceInfo[i].deviceName)
      //         }
      //         res.data.deviceInfo1 = obj;
      //         // console.log(res)
      //         this.productList.push(res.data);
      //       });
      //     });
      //     console.log(this.productList);
      //     this.loading = false;
      //   } else {
      //     this.$message.error(res.msg);
      //   }
      // });
      //改写页面，在product页面显示设备的具体数值，也就是改变produtcList的值
      // 1. 获取用户产品列表
      ProductNum().then(res => {
        if (res.msg == "ok") {
          
          this.productList = res.data.productInfo;
          //2. 获取指定产品下所有设备列表
          this.productList.forEach(item => {
            ProductOne(item.productKey).then(res => {
              if (res.msg == "ok") {
                item.deviceKey = [];
                for (var i = 0; i < res.data.deviceInfo.length; i++) {
                  item.deviceKey.push(res.data.deviceInfo[i].deviceKey);
                }
                // console.log(item.productKey)
                // console.log(item.deviceKey)
     
NewDeviceDataOne(item).then((res)=>{
  item.deviceData = res.data.deviceData
      item.latestData = {
      body: "-",
      skin: "-",
      heartRate :"-",
      bpHigh:"-",
      bpLow:"-",
      stepNum: "-",
      location: "",
    }
    item.deviceName = []
  if (item.deviceData !== undefined) {
  for (var i=0;i<item.deviceData.length;i++) {
  item.deviceName.push(item.deviceData[i].deviceName)
  }
  }
 for (var i=0;i<item.deviceName.length;i++) {

 }
  if(item.deviceName.includes('BA')) {
    item.latestData.body = item.deviceData[item.deviceName.indexOf('BA')].extraInfo.body.toString();
    item.latestData.skin = item.deviceData[item.deviceName.indexOf('BA')].extraInfo.skin
  }
  if(item.deviceName.includes('C2')) {
    item.latestData.heartRate= item.deviceData[item.deviceName.indexOf('C2')].extraInfo.BPHeart
    item.latestData.bpHigh = item.deviceData[item.deviceName.indexOf('C2')].extraInfo.BPHigh
    item.latestData.bpLow = item.deviceData[item.deviceName.indexOf('C2')].extraInfo.BPLow
  }
   if(item.deviceName.includes('F6')) {
    item.latestData.stepNum = item.deviceData[item.deviceName.indexOf('F6')].extraInfo.StepNum
  }
    if(item.deviceName.includes('A4')) {
    item.latestData.location= item.deviceData[item.deviceName.indexOf('A4')].extraInfo
  }
  // item.latestData = {};
// console.log(item.extraInfo.nickname)
// console.log(item.latestData.body)
})
  

              } else {
                this.$message.error(res.msg);
              }
    
            });
   
          });
              console.log(this.productList);
             if (this.productList.length != 0) {
this.loading = false;
      }
//            this.productList.forEach(item=>{
// NewDeviceDataOne(item.productKey,item.deviceList).then((res)=>{
//   console.log(res)
// })
//            })
        } else {
          this.$message.error(res.msg);
        }
      });
    },

    deleteproduct(index, row, rows) {
      this.DeleteKey.productKey = row.productKey;
      this.deleteId = row.extraInfo.DeviceId;
      // console.log(this.DeleteKey)
      // console.log(this.deleteId)
      this.$confirm("此操作将永久删除该产品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          rows.splice(index, 1);
          cloudDevcieDelete(this.deleteId).then(res => {
            console.log(res);
            if (res.msg == "ok") {
              console.log("ok");
            } else {
              this.$message({
                type: "error",
                message: res.msg
              });
            }
            Delete_product(this.DeleteKey).then(res => {
              if (res.code == 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.products();
              } else {
                this.$message({
                  type: "info",
                  message: res.msg
                });
              }
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    // 打开弹窗
    detailproduct(val) {
      this.condition = 0;
      this.diglogTitle = "产品详情";
      this.detail = val;
      this.viewMoreproduct = !this.viewMoreproduct;
    },
    editproduct(val) {
      this.condition = 1;
      this.diglogTitle = "编辑产品信息";
      this.detail = val;
      this.viewMoreproduct = !this.viewMoreproduct;
    },
    closeDialog() {
      this.viewMoreproduct = !this.viewMoreproduct;
    },

    // size-change	pageSize 改变时会触发	每页条数size
    // current-change	currentPage 改变时会触发	当前页currentPage

    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    }
  }
};
</script>

<style scoped>
.mixin-components-container {
  padding: 10px;
  /* min-height: calc(100vh - 84px); */
}
.component-item {
  min-height: 100px;
}
.el-pagination {
  margin: 5px auto;
  text-align: center;
}
/deep/ .el-dialog {
  /* transform: scale(0.65, 0.85); */
  /* margin-top: 0; */
  /* padding-left: 20%; */
}
</style>

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
            <router-link class="pan-btn green-btn" to="/product/createProduct">创建手环</router-link>
          </el-col>
        </div>
        <!-- data绑定的数据是搜索筛选的数据 -->
        <div class="clearfix">
          <!-- clearfix 主要是用在浮动层的父层，而 clear 主要是用在浮动层与浮动层之间 -->
          <!-- 主要借助 tableData的数组分割来实现分页。currentPage是当前页数，pagesize是每页展示的条数  -->
          <el-table
            v-if="tableShow"
            :data="
              productList1
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
            :header-cell-style="{ color: '#a38972', background: '#ebf7f7' }"
            :cell-style="tableCellStyle"
          >
            <!-- 搜索设备名 -->
            <el-table-column align="center"  prop="productName" label="手环名称">
              <template slot="header" slot-scope="scope">
                <!-- 不点击显示产品名称，搜索框绑定一个点击事件，点击一下，show变成false -->
                <div v-show="show">
                  <el-row type="flex" justify="center">
                    <el-col :span="23">手环名称</el-col>
                    <el-col :span="1">
                      <i class="el-icon-search" @click="show = !show"></i>
                    </el-col>
                  </el-row>
                </div>
                <!-- 点击显示搜索框 -->
                <div v-show="!show">
                  <el-input
                    placeholder="请输入手环名"
                    label
                    suffix-icon="el-icon-search"
                    size="mini"
                    v-model="search"
                  ></el-input>
                </div>
              </template>
            </el-table-column>

            <!-- <el-table-column align="center" label="IMEI" prop="extraInfo.nickname"></el-table-column> -->
            <!-- 表头 -->
            <el-table-column align="center" label="体温"   prop="latestData.body"></el-table-column>
            <el-table-column align="center" label="手腕温度"  prop="latestData.skin"></el-table-column>
            <el-table-column align="center" label="心率"   prop="latestData.heartRate"></el-table-column>
            <el-table-column align="center" label="收缩压"   prop="latestData.bpHigh"></el-table-column>
            <el-table-column align="center" label="舒张压"   prop="latestData.bpLow"></el-table-column>
            <el-table-column align="center" label="步数"  prop="latestData.stepNum"></el-table-column>
            <el-table-column align="center" label="电子围栏"  prop="extraInfo.fence" ></el-table-column>

            <!-- 按钮 -->
            <el-table-column align="center" label="操作" >
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
              productList1.filter(
                (data) =>
                  !search ||
                  data.productName.toLowerCase().includes(search.toLowerCase())
              ).length > 10
            "
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5,10, 20, 40]"
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
  getDeviceDatas,
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
      productList1: [],
      productNameList: [],
      loadingtext: "数据加载中",

      loading: true,

      diglogTitle: "手环详情",
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
      date: ""
    };
  },
  computed: {
    total() {
      return this.productList1.filter(
        data =>
          !this.search ||
          data.productName.toLowerCase().includes(this.search.toLowerCase())
      ).length;
    }
  },
  // created() {
  //   // this.$store.dispatch("productNum");
  //   this.products();
  // },

  created() {
    //  this.timer =  setInterval(this.products, 5000);
    this.products();
  },
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
      allProductKey().then(res => {
        if (res.msg == "ok") {
          this.productNameList = res.data.productKeys;
          console.log(this.productNameList);
          getDeviceDatas({
            username: "智能手环测试",
            pkList: this.productNameList,
            startTime: 100000
          }).then(res => {
            console.log(res);
            this.productList1 = res.data;
            // console.log(this.productList1);
            this.loading = false;

            this.productList1.forEach(item => {
              item.deviceName = [];
              item.latestData = {};
              if (item.deviceData !== null) {
                for (var i = 0; i < item.deviceData.length; i++) {
                  item.deviceName.push(item.deviceData[i].deviceName);
                }
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
                  heart: "-"
                };
              }
              // console.log(item.deviceData.length)
            });
            console.log(this.productList1);
this.currentPage=1,
            this.alertMessage = [];
            this.latestAlert = [];
            for (var i = 0; i < this.productList1.length; i++) {
              var obj = {
                productName: this.productList1[i].productName,
                alertData: []
              };
              // if (this.productList1[i].latestData.body !== "-") {
              //   if (
              //     this.productList1[i].latestData.body > 37 ||
              //     this.productList1[i].latestData.body < 35
              //   ) {
              //     console.log("体温");
              //     obj.alertData.push({ alert: "温度报警" });
              //   }
              // }
              // if (this.productList1[i].latestData.heartRate !== "-") {
              //   if (
              //     this.productList1[i].latestData.heartRate > 100 ||
              //     this.productList1[i].latestData.heartRate < 60
              //   ) {
              //     console.log("心率");
              //     obj.alertData.push({ alert: "心率报警" });
              //   }
              // }
              this.alertMessage.push(obj);
            }
            console.log(this.alertMessage);
            for (var i = 0; i < this.alertMessage.length; i++) {
              if (this.alertMessage[i].alertData.length != 0) {
                this.latestAlert.push(this.alertMessage[i]);
              }
            }
            console.log(this.latestAlert);
          });
        } else {
          this.$message.error(res.msg);
        }
      });
    },

    deleteproduct(index, row, rows) {
      this.DeleteKey.productKey = row.productKey;
      this.deleteId = row.extraInfo.deviceId;
      // console.log(this.DeleteKey)
      // console.log(this.deleteId)
      this.$confirm("此操作将永久删除该手环, 是否继续?", "提示", {
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
      this.diglogTitle = "手环详情";
      this.detail = val;
      this.viewMoreproduct = !this.viewMoreproduct;
    },
    editproduct(val) {
      this.condition = 1;
      this.diglogTitle = "手环围栏信息修改(建议不要轻易修改)";
      this.detail = val;
      this.viewMoreproduct = !this.viewMoreproduct;
    },
    closeDialog() {
      this.viewMoreproduct = !this.viewMoreproduct;
      this.products();
    },

    // size-change	pageSize 改变时会触发	每页条数size
    // current-change	currentPage 改变时会触发	当前页currentPage

    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    //通过判定条件，改变某个单元格的字体颜色
    tableCellStyle({ row, column, rowIndex, columnIndex }) {
      // 状态列字体颜色
      if (
        (row.latestData.body < 35 || row.latestData.body > 37) &&
        columnIndex === 1
      ) {
        return "color: red";
      } else if (
        (row.latestData.heartRate > 100 || row.latestData.heartRate < 60) &&
        columnIndex === 3
      ) {
        return "color: red";
      } else {
        return "color: #6f9199";
      }
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

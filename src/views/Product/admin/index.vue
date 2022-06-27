<template>
  <div class="mixin-components-container">
    <!-- :visible指的是属性绑定，表示弹框的显示隐藏 -->
    <!-- viewMoreproduct的值为true时，弹框显示，false弹框隐藏 -->
    <!-- .sync是同步动态双向的来表示visible的值,关闭窗口的时候，弹框隐藏了，visible的值发生了变化 -->
    <!-- visible.sync的原理，用于子组件修改父组件中的值，实现双向绑定功能。 -->
    <div
      id="background"
      style="position: absolute; z-index: -1; width:100%; height:100%; top:0px; left:0px;   background-color: rgba(227, 241, 247,0.1)"
    ></div>
    <el-dialog :title="diglogTitle" :visible.sync="viewMoreproduct" :before-close="detailproduct">
      <product-detail @beforeClose="closeDialog" :condition="condition" :productdetail="detail" />
    </el-dialog>
    <el-row>
      <el-card class="box-card">
        <!-- Card 组件包括header和body部分，header部分需要有显式具名 slot 分发，同时也是可选的。 -->
        <div slot="header" style="margin-bottom: 50px">
          <el-col :span="3" class="text-center">
            <router-link class="btn" to="/productRegister">注册手环</router-link>
          </el-col>
          <el-col :span="3" class="text-center">
            <router-link class="btn1" to="/userMessage">用户信息</router-link>
          </el-col>
          <el-col :span="3" class="text-center">
            <router-link class="btn2" to="/grouping">分组操作</router-link>
          </el-col>
          <el-col :span="3" class="text-center" style="margin-left: 50px; cursor:pointer">
            <div class="btn3" @click="batchUnbind">批量解绑</div>
          </el-col>
          <el-col :span="3" class="text-center" style="margin-left: 10px; cursor:pointer">
            <div class="btn4" @click="frequencySetting">下发频率</div>
          </el-col>
        </div>
        <!-- data绑定的数据是搜索筛选的数据 -->
        <el-table
          v-if="tableShow"
          :data="
              data
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
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="40"></el-table-column>
          <!-- 搜索设备名 -->
          <el-table-column align="center" prop="productName" label="用户名称">
            <template slot="header" slot-scope="scope">
              <!-- 不点击显示产品名称，搜索框绑定一个点击事件，点击一下，show变成false -->
              <div v-show="show">
                <el-row type="flex" justify="center">
                  <el-col :span="18">用户名</el-col>
                  <el-col :span="1">
                    <i class="el-icon-search" @click="startSearch"></i>
                  </el-col>
                  <el-col :span="1" :offset="2">
                    <svg
                      @click="startSelect"
                      t="1655620475394"
                      class="icon"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="15929"
                      width="15"
                      height="15"
                    >
                      <path
                        d="M490.666667 601.6L797.866667 298.666667l59.733333 59.733333-302.933333 302.933333-59.733334 64-59.733333-59.733333L128 358.4 187.733333 298.666667l302.933334 302.933333z"
                        fill="#b7a696"
                        p-id="15930"
                      />
                    </svg>
                  </el-col>
                </el-row>
              </div>
              <!-- 点击显示搜索框 -->
              <div v-show="searchShow">
                <el-row>
                  <el-col :span="16">
                    <el-input
                      placeholder="请输入用户名"
                      label
                      suffix-icon="el-icon-search"
                      size="mini"
                      v-model="search"
                    ></el-input>
                  </el-col>
                  <el-col :span="8">
                    <svg
                      @click="back"
                      t="1655621327563"
                      class="icon"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="17554"
                      width="15"
                      height="15"
                    >
                      <path
                        d="M894.976 574.464q0 78.848-29.696 148.48t-81.408 123.392-121.856 88.064-151.04 41.472q-5.12 1.024-9.216 1.536t-9.216 0.512l-177.152 0q-17.408 0-34.304-6.144t-30.208-16.896-22.016-25.088-8.704-29.696 8.192-29.696 21.504-24.576 29.696-16.384 33.792-6.144l158.72 1.024q54.272 0 102.4-19.968t83.968-53.76 56.32-79.36 20.48-97.792q0-49.152-18.432-92.16t-50.688-76.8-75.264-54.784-93.184-26.112q-2.048 0-2.56 0.512t-2.56 0.512l-162.816 0 0 80.896q0 17.408-13.824 25.6t-44.544-10.24q-8.192-5.12-26.112-17.92t-41.984-30.208-50.688-36.864l-51.2-38.912q-15.36-12.288-26.624-22.016t-11.264-24.064q0-12.288 12.8-25.6t29.184-26.624q18.432-15.36 44.032-35.84t50.688-39.936 45.056-35.328 28.16-22.016q24.576-17.408 39.936-7.168t16.384 30.72l0 81.92 162.816 0q5.12 0 10.752 1.024t10.752 2.048q79.872 8.192 149.504 41.984t121.344 87.552 80.896 123.392 29.184 147.456z"
                        p-id="17555"
                        fill="#00c4c1"
                      />
                    </svg>
                  </el-col>
                </el-row>
              </div>
              <div v-show="selectShow">
                <el-row>
                  <el-col :span="16">
                    <select
                      class="select"
                      v-model="whichGroup"
                      placeholder="请选择组"
                      @change="grouping"
                    >
                      <option
                        v-for="item in groups"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></option>
                    </select>
                  </el-col>
                  <el-col :span="8">
                    <svg
                      @click="back"
                      t="1655621327563"
                      class="icon"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="17554"
                      width="15"
                      height="15"
                    >
                      <path
                        d="M894.976 574.464q0 78.848-29.696 148.48t-81.408 123.392-121.856 88.064-151.04 41.472q-5.12 1.024-9.216 1.536t-9.216 0.512l-177.152 0q-17.408 0-34.304-6.144t-30.208-16.896-22.016-25.088-8.704-29.696 8.192-29.696 21.504-24.576 29.696-16.384 33.792-6.144l158.72 1.024q54.272 0 102.4-19.968t83.968-53.76 56.32-79.36 20.48-97.792q0-49.152-18.432-92.16t-50.688-76.8-75.264-54.784-93.184-26.112q-2.048 0-2.56 0.512t-2.56 0.512l-162.816 0 0 80.896q0 17.408-13.824 25.6t-44.544-10.24q-8.192-5.12-26.112-17.92t-41.984-30.208-50.688-36.864l-51.2-38.912q-15.36-12.288-26.624-22.016t-11.264-24.064q0-12.288 12.8-25.6t29.184-26.624q18.432-15.36 44.032-35.84t50.688-39.936 45.056-35.328 28.16-22.016q24.576-17.408 39.936-7.168t16.384 30.72l0 81.92 162.816 0q5.12 0 10.752 1.024t10.752 2.048q79.872 8.192 149.504 41.984t121.344 87.552 80.896 123.392 29.184 147.456z"
                        p-id="17555"
                        fill="#00c4c1"
                      />
                    </svg>
                  </el-col>
                </el-row>
              </div>
            </template>
          </el-table-column>

          <!-- <el-table-column align="center" label="IMEI" prop="extraInfo.nickname"></el-table-column> -->
          <!-- 表头 -->
          <el-table-column align="center" label="体温" prop="latestData.body"></el-table-column>
          <el-table-column align="center" label="手腕温度" prop="latestData.skin"></el-table-column>
          <el-table-column align="center" label="心率" prop="latestData.heartRate"></el-table-column>
          <el-table-column align="center" label="收缩压" prop="latestData.bpHigh"></el-table-column>
          <el-table-column align="center" label="舒张压" prop="latestData.bpLow"></el-table-column>
          <el-table-column align="center" label="步数" prop="latestData.stepNum"></el-table-column>
          <el-table-column align="center" sortable label="电子围栏" prop="extraInfo.fence"></el-table-column>

          <!-- 按钮 -->
          <el-table-column align="center" label="操作" min-width="120">
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
                type="warning"
                plain
                icon="el-icon-connection"
                size="mini "
                @click="bind(scope.row)"
              ></el-button>
              <el-button
                type="danger"
                plain
                icon="el-icon-delete"
                size="mini "
                @click="deleteproduct(scope.$index, scope.row, productList1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-show="
              data.length > 10
            "
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5,10, 20, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </el-card>
    </el-row>
    <el-dialog title="操作" :visible.sync="dialogVisible3" width="30%">
      <span @click="unbind" class="btn" style="cursor: pointer">一建解绑</span>
      <span @click="makeSure" class="btn1" style="cursor: pointer; margin-left: 40px;">绑定</span>
    </el-dialog>
    <el-dialog title="用户列表" :visible.sync="dialogVisible2" width="60%">
      <!-- <span>这是一段信息</span> -->
      <div>
        <el-row :gutter="20">
          <el-col v-for="(item,index) in userList" :key="index" :span="10" :offset="1">
            <div
              style="margin-top: 20px;"
              @click="handleClick(item,index)"
              :class="['proitem', userCheck[index] ? 'prochecked' : '']"
            >
              <span style="margin-left: 30px;">{{item.name}}____{{item.phone}}</span>
            </div>
          </el-col>
          <el-button
            @click="bind1"
            type="primary"
            plain
            style="margin-top: 50px; float: right; margin-right: 50px;"
          >绑定</el-button>
        </el-row>
      </div>
    </el-dialog>
    <el-dialog title="下发消息频率设置（24小时制）" :visible.sync="dialogVisible4" width="50%">
      <el-row type="flex" justify>
        <el-col :span="3" style="height: 35px;line-height: 35px; font-weight: 700">选择时间段：</el-col>
        <el-col :span="19">
          <el-time-picker
            is-range
            format="HH:mm"
            v-model="settingTime"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
          ></el-time-picker>
        </el-col>
      </el-row>
      <el-row type="flex" justify style="margin-top: 20px;">
        <el-col :span="3" style="height: 35px;line-height: 35px; font-weight: 700">频率设置：</el-col>
        <el-col :span="19">
          <input
            type="number"
            style="width: 60%; height: 40px; border: 1px solid #dcdfe6; outline: none;"
            oninput="if(!/^[0-9]+$/.test(value)) value=value.replace(/\D/g,'');if(value>100)value=100;if(value<1)value=null"
            v-model="qrequency"
          />
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible4 = false">取 消</el-button>
        <el-button type="primary" @click="frequencySetting1">确 定</el-button>
      </span>
    </el-dialog>
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
  ProductOne,
  updated_product,
  sendMessage
} from "@/api/index";
import { DeleteUsers, UserDetail, EditUser } from "@/api/admin";
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

      diglogTitle: "用户详情",
      condition: 0,
      detail: {},
      search: "",
      show: true,
      searchShow: false,
      selectShow: false,
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
      date: "",
      visible: true,
      multipleSelection: [],
      input: "",
      drawer: false,
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false,
      dialogVisible4: false,
      groupName: "",
      grouper: "",
      productName: "",
      productList2: [],
      adminMessage: null,
      grouperMessage: null,
      options: [],
      groupsMessage: [],
      groupsShow: true,
      productCheck: [],
      whichGroup: "all",
      totalShow: true,
      groupsDetail: [],
      groupCheck: [],
      issueMessage: "",
      selectedProduct: [],
      judge: null,
      userList: [],
      userValue: "",
      userCheck: [],
      whichUser: {},
      whichProduct: {},
      res: {},
      show: true,
      data: [],
      groups: [],
      settingTime: "",
      qrequency: "5"
    };
  },
  computed: {
    total() {
      return this.data.filter(
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
      var username = window.localStorage.getItem("username");
      UserDetail(username).then(res => {
        if (res.msg == "ok") {
          this.userList = res.data.extraInfo.userMessage;
          var groupsDetail = res.data.extraInfo.groups;
          this.groups = [];
          groupsDetail.forEach(item => {
            var obj = {
              label: item.name,
              value: item.name
            };
            this.groups.push(obj);
          });
          var obj = {
            label: "未分组",
            value: "un"
          };
          this.groups.push(obj);
          var obj = {
            label: "全部",
            value: "all"
          };
          this.groups.push(obj);
          this.res = res.data;
          console.log(this.userList);
          this.userCheck = new Array(this.userList.length).fill(false);
        }
      });
      allProductKey().then(res => {
        if (res.msg == "ok") {
          console.log(res);
          //冒泡排序
          this.productNameList = res.data.productKeys;
          for (var i = 0; i < this.productNameList.length; i++) {
            for (var j = 0; j < this.productNameList.length - 1 - i; j++) {
              if (this.productNameList[j] > this.productNameList[j + 1]) {
                var temp = this.productNameList[j];
                this.productNameList[j] = this.productNameList[j + 1];
                this.productNameList[j + 1] = temp;
              }
            }
          }
          // console.log(this.productNameList);
          var username = window.localStorage.getItem("username");
          console.log(username);
          getDeviceDatas({
            username: username,
            pkList: this.productNameList,
            startTime: 100000
          }).then(res => {
            console.log(res);
            this.productList1 = res.data;

            console.log(this.productList1);
            // console.log(this.productList1);
            this.judge = [];
            this.productList1.forEach(item => {
              var jud = {
                productName: item.productName,
                productKey: item.productKey
              };
              this.judge.push(jud);

              item.deviceName = [];
              item.latestData = [];
              console.log(item.deviceData);
              if (item.deviceData !== null) {
                for (var i = 0; i < item.deviceData.length; i++) {
                  item.deviceName.push(item.deviceData[i].deviceName);
                }
                if (item.extraInfo.fence !== "-") {
                  UserDetail(username).then(res => {
                    console.log(res);
                    this.fenceList = res.data.extraInfo.fence;
                    window.sessionStorage.setItem(
                      "fenceList",
                      JSON.stringify(this.fenceList)
                    );
                    window.sessionStorage.setItem(
                      "fenceData",
                      JSON.stringify(res.data)
                    );

                    if (
                      this.fenceList.length !== 0 ||
                      this.fenceList !== null ||
                      this.fenceList !== undefined
                    ) {
                      for (var i = 0; i < this.fenceList.length; i++) {
                        if (
                          item.extraInfo.fence ==
                          this.fenceList[i].fence.fenceName
                        ) {
                          item.latestData.fence = this.fenceList[i].fence.data;
                        }
                      }
                    }
                    this.fenceNum = this.fenceList.length;
                    var fenceData = res.data;
                    window.sessionStorage.setItem(
                      "fenceList",
                      JSON.stringify(this.fenceList)
                    );
                    window.sessionStorage.setItem(
                      "fenceData",
                      JSON.stringify(fenceData)
                    );
                  });
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
                } else {
                  item.latestData.body = "-";
                  item.latestData.skin = "-";
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
                } else {
                  item.latestData.heartRate = "-";
                  item.latestData.bpHigh = "-";
                  item.latestData.bpLow = "-";
                }
                if (item.deviceName.includes("F6")) {
                  item.latestData.stepNum =
                    item.deviceData[
                      item.deviceName.indexOf("F6")
                    ].extraInfo.stepNum;
                  item.latestData.heart =
                    item.deviceData[
                      item.deviceName.indexOf("F6")
                    ].extraInfo.timeStamp;
                } else {
                  item.latestData.stepNum = "-";
                  item.latestData.heart = "-";
                }

                if (item.deviceName.includes("A4")) {
                  item.latestData.location =
                    item.deviceData[item.deviceName.indexOf("A4")].extraInfo;
                } else {
                  item.latestData.location = "-";
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
                  fence: "-",
                  ifIn: "-"
                };
              }
            });
            this.loading = false;
            this.productList2 = [];
            this.options = [];
            console.log(this.productList1);
            this.data = this.productList1;
            (this.currentPage = 1), (this.alertMessage = []);
            this.latestAlert = [];
            for (var i = 0; i < this.productList1.length; i++) {
              var obj = {
                productName: this.productList1[i].productName,
                alertData: []
              };
              if (this.productList1[i].latestData.body !== "-") {
                if (
                  this.productList1[i].latestData.body > 37 ||
                  this.productList1[i].latestData.body < 35
                ) {
                  console.log("体温");
                  obj.alertData.push({ alert: "温度报警" });
                }
              }
              if (this.productList1[i].latestData.heartRate !== "-") {
                if (
                  this.productList1[i].latestData.heartRate > 100 ||
                  this.productList1[i].latestData.heartRate < 60
                ) {
                  console.log("心率");
                  obj.alertData.push({ alert: "心率报警" });
                }
              }
              this.alertMessage.push(obj);
            }
            console.log(this.alertMessage);
            for (var i = 0; i < this.alertMessage.length; i++) {
              if (this.alertMessage[i].alertData.length != 0) {
                this.latestAlert.push(this.alertMessage[i]);
              }
            }
            // console.log(this.latestAlert);
          });
          // this.loading = false;
        } else {
          this.$message.error(res.msg);
        }
      });
      var username = window.localStorage.getItem("username");
      UserDetail(username).then(res => {
        console.log(res);
        if (res.msg == "ok") {
          this.groupsMessage = res.data.extraInfo.groups;
          if (
            this.groupsMessage == null ||
            this.groupsMessage.length == 0 ||
            this.groupsMessage == undefined
          ) {
            this.groupsShow = false;
          } else {
            this.groupsShow = true;
            this.productCheck = new Array(this.groupsMessage.length).fill(
              false
            );
            this.groupCheck = new Array(this.groupsMessage.length).fill(false);
            console.log(this.productCheck);
          }
        }
      });
    },

    deleteproduct(index, row, rows) {
      this.DeleteKey.productKey = row.productKey;
      this.deleteId = row.extraInfo.deviceId;
      this.productName = row.productName;
      console.log(this.productName);
      console.log(this.DeleteKey);
      console.log(this.deleteId);
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
              Delete_product(this.DeleteKey).then(res1 => {
                console.log(res1);
                if (res1.code == 200) {
                  this.products();
                  this.$message({
                    type: "success",
                    message: "删除成功!"
                  });
                } else {
                  this.$message({
                    type: "info",
                    message: res1.msg
                  });
                }
              });
              var adminToken = window.sessionStorage.getItem("adminToken");
              // console.log(adminToken)
              // DeleteUsers(this.productName, adminToken).then(res2 => {
              //   console.log(res2);
              // });
              var _this = this;
              _this
                .axios({
                  method: "delete",
                  url:
                    "https://api.ahusmart.com/api/v1/admin/user/" +
                    this.productName,
                  headers: {
                    token: adminToken
                  }
                })
                .then(res2 => {
                  console.log(res2);
                });
            } else {
              this.$message({
                type: "error",
                message: res.msg
              });
            }
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
      this.diglogTitle = "用户围栏信息修改(建议不要轻易修改)";
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
        columnIndex === 2
      ) {
        return "color: red";
      } else if (
        (row.latestData.heartRate > 110 || row.latestData.heartRate < 60) &&
        columnIndex === 4
      ) {
        return "color: red";
      } else {
        return "color: #6f9199";
      }
    },
    handleSelectionChange(val, index) {
      this.multipleSelection = val;
    },
    batchUnbind() {
      console.log(this.multipleSelection);
      if (this.multipleSelection.length == 0) {
        this.$message.info("没有选中手环");
      } else {
        this.multipleSelection.forEach(item => {
          ProductOne(item.productKey).then(res => {
            if (res.msg == "ok") {
              //  res.data.extraInfo.userMessage = {};
              delete res.data.extraInfo.userMessage;
              console.log(res.data.extraInfo);
              updated_product({
                productKey: item.productKey,
                productName: item.productName,
                protocolType: "TCP",
                productType: 1,
                typeIdentify: item.typeIdentify,
                description: "",
                extraInfo: res.data.extraInfo
              }).then(res1 => {
                console.log(res1);
                if (res1.msg == "ok") {
                  this.$message.success("解绑成功");
                }
              });
            }
          });
        });
      }
      this.multipleSelection = [];
    },
    creatGroups() {
      this.dialogVisible = true;
    },
    // selected() {

    // },
    creat() {
      console.log(this.grouper);
      if (this.productList2.length !== 0) {
        this.productList2.forEach(item => {
          if (item.productName == this.grouper) {
            var obj = {
              productName: item.productName,
              productKey: item.productKey
            };
            this.grouper = obj;
          }
        });
        console.log(this.grouper);
      }
      console.log(this.groupName);
      if (this.grouper == "" || this.groupName == "") {
        this.$message.error("组名与组长不能为空");
      } else {
        console.log("可以开始创建");
        //获取并修改管理员的信息
        var username = window.localStorage.getItem("username");
        UserDetail(username).then(res => {
          console.log(res);
          if (res.msg == "ok") {
            this.adminMessage = res.data;
            // console.log(this.adminMessage.extraInfo.groups);
            if (this.adminMessage.extraInfo.groups == undefined) {
              this.adminMessage.extraInfo.groups = [];
            }
            var obj = {
              name: this.groupName,
              grouper: {
                productName: this.grouper.productName,
                productKey: this.grouper.productKey
              },
              users: []
            };
            this.adminMessage.extraInfo.groups.push(obj);
            console.log(this.adminMessage);
            EditUser(this.adminMessage).then(res1 => {
              if (res1.msg == "ok") {
                this.products();
                this.dialogVisible = false;
                console.log("管理员信息修改成功");
              }
            });
          }
        });
        // 获取并修改组长的信息
        UserDetail(this.grouper.productName).then(res => {
          console.log(res);
          if (res.msg == "ok") {
            res.data.extraInfo.role = "grouper";
            this.grouperMessage = res.data.extraInfo;
            if (
              this.grouperMessage.groups == undefined ||
              this.grouperMessage == null
            ) {
              this.grouperMessage.groups = [];
            }
            var obj = {
              name: this.groupName,
              productKey: this.grouper.productKey,
              users: []
            };
            this.grouperMessage.groups.push(obj);
            // this.grouperMessage.extraInfo.role = "grouper"
            console.log(this.grouperMessage);
            var adminToken = window.sessionStorage.getItem("adminToken");
            var _this = this;
            _this
              .axios({
                method: "put",
                url:
                  "https://api.ahusmart.com/api/v1/admin/user/" +
                  this.grouper.productName,
                headers: {
                  token: adminToken
                },
                data: {
                  username: res.data.username,
                  password: res.data.password,
                  email: res.data.email,
                  phone: res.data.phone,
                  userAddress: res.data.userAddress,
                  Wechat: res.data.userAddress.Wechat,
                  extraInfo: this.grouperMessage
                }
              })
              .then(res => {
                console.log(res);
                if (res.data.msg == "ok") {
                  this.$message.success("队长信息修改成功");
                }
              });
          }
        });

        //获取与修改相应手环的分组标志位
        ProductOne(this.grouper.productKey).then(res => {
          console.log(res);
          var obj = res.data.extraInfo;
          obj.groupStatus.status = "grouper";
          obj.groupStatus.groups = this.groupsName;
          var changedProduct = {
            productKey: res.data.productKey,
            productName: res.data.productName,
            protocolType: res.data.protocolType,
            productType: res.data.productType,
            typeIdentify: res.data.typeIdentify,
            description: res.data.description,
            extraInfo: obj
          };
          console.log(changedProduct);
          updated_product(changedProduct).then(res => {
            console.log(res);
            if (res.msg == "ok") {
              console.log("手环信息修改成功");
              this.$message.success("新组创建成功");
            }
          });
        });
      }
    },
    handleClick(item, index) {
      var flag = this.productCheck[index];
      this.productCheck = new Array(this.groupsMessage.length).fill(false);
      this.productCheck.splice(index, 1, !flag);
      console.log(this.productCheck);
      console.log(item);
      this.whichGroup = item;
    },
    handleClick1(item, index) {
      var flag = !this.groupCheck[index];
      // var flag = null;
      // if (this.productCheck[index]==false) {
      //     flag = true;
      // } else {
      //     flag = false
      // }
      console.log(flag);
      // this.groupCheck = new Array(this.groupsMessage.length).fill(
      //   false
      // );
      this.groupCheck.splice(index, 1, flag);
      console.log(this.groupCheck);
      console.log(item);
    },
    addGroups() {
      console.log("加入新租");
      console.log(this.whichGroup);
      console.log(this.detail);
      if (this.whichGroup.name == undefined) {
        this.$message.info("未选组");
      } else {
        //管理员信息获取与修改
        var username = window.localStorage.getItem("username");
        UserDetail(username).then(res => {
          //   console.log(res);
          if (res.msg == "ok") {
            res.data.extraInfo.groups.forEach(item => {
              if (this.whichGroup.name == item.name) {
                item.users.push({
                  productName: this.detail.productName,
                  productKey: this.detail.productKey
                });
              }
            });
            console.log(res.data);
            EditUser(res.data).then(res1 => {
              if (res1.msg == "ok") {
                console.log("管理员信息修改成功");
              }
            });
          }
        });
        //组长信息获取与修改
        UserDetail(this.whichGroup.grouper.productName).then(res => {
          var extraInfo = res.data.extraInfo;
          extraInfo.groups[0].users.push({
            productName: this.detail.productName,
            productKey: this.detail.productKey
          });
          // console.log(res.data)
          var adminToken = window.sessionStorage.getItem("adminToken");
          var _this = this;
          _this
            .axios({
              method: "put",
              url:
                "https://api.ahusmart.com/api/v1/admin/user/" +
                this.whichGroup.grouper.productName,
              headers: {
                token: adminToken
              },
              data: {
                username: res.data.username,
                password: res.data.password,
                email: res.data.email,
                phone: res.data.phone,
                userAddress: res.data.userAddress,
                Wechat: res.data.userAddress.Wechat,
                extraInfo: extraInfo
              }
            })
            .then(res => {
              console.log(res);
              if (res.data.msg == "ok") {
                console.log("组长信息修改成功");
              }
            });
        });
        //普通用户信息与修改
        UserDetail(this.detail.productName).then(res => {
          console.log(res);
          var extraInfo = res.data.extraInfo;
          extraInfo.groups = {
            name: this.whichGroup.name,
            productKey: this.detail.productKey
          };
          // console.log(res.data)
          var adminToken = window.sessionStorage.getItem("adminToken");
          var _this = this;
          _this
            .axios({
              method: "put",
              url:
                "https://api.ahusmart.com/api/v1/admin/user/" +
                this.detail.productName,
              headers: {
                token: adminToken
              },
              data: {
                username: res.data.username,
                password: res.data.password,
                email: res.data.email,
                phone: res.data.phone,
                userAddress: res.data.userAddress,
                Wechat: res.data.userAddress.Wechat,
                extraInfo: extraInfo
              }
            })
            .then(res => {
              console.log(res);
              if (res.data.msg == "ok") {
                console.log("普通用户信息修改成功");
              }
            });
        });
        //手环信息获取与修改
        ProductOne(this.detail.productKey).then(res => {
          console.log(res);
          var obj = res.data.extraInfo;
          obj.groupStatus.status = "user";
          obj.groupStatus.groups = this.whichGroup.name;
          var changedProduct = {
            productKey: res.data.productKey,
            productName: res.data.productName,
            protocolType: res.data.protocolType,
            productType: res.data.productType,
            typeIdentify: res.data.typeIdentify,
            description: res.data.description,
            extraInfo: obj
          };
          updated_product(changedProduct).then(res => {
            console.log(res);
            if (res.msg == "ok") {
              console.log("手环信息修改成功");
              this.$message.success("加入成功");
            }
          });
          this.drawer = false;
          this.products();
        });
      }
    },
    details(item) {
      console.log(item);
      console.log("进入详情页");
      this.totalShow = false;
      this.groupsDetail = {
        grouper: {},
        users: []
      };
      this.productList1.forEach(data => {
        if (item.grouper.productName == data.productName) {
          this.groupsDetail.grouper = data;
        }
        item.users.forEach(item1 => {
          if (item1.productName == data.productName) {
            this.groupsDetail.users.push(data);
          }
        });
      });
      console.log(this.groupsDetail);
    },
    productDetail(item) {
      console.log(item);
      console.log(this.detail);
      // this.$router.push({ path: "/products/pageDetail" });
      window.sessionStorage.setItem(
        "whichProduct",
        JSON.stringify(this.detail)
      );
    },
    issue() {
      if (this.groupCheck.length == 0) {
        this.$message.warning("当前没有可选组");
      } else {
        var count = 0;
        this.groupCheck.forEach(item => {
          if (item == false) {
            count = count + 1;
          }
        });
        console.log(count);
        if (count == this.groupCheck.length) {
          this.$message.warning("没有选中组");
        } else {
          this.dialogVisible1 = true;
          var username = window.localStorage.getItem("username");
          UserDetail(username).then(res => {
            // console.log(res)
            var selected = [];
            this.groupCheck.forEach((item, index) => {
              if (item == true) {
                selected.push(res.data.extraInfo.groups[index]);
              }
            });
            // console.log(selected)
            var selectedProductName = [];
            selected.forEach(item => {
              selectedProductName.push(item.grouper.productName);
              if (item.users !== []) {
                item.users.forEach(item1 => {
                  selectedProductName.push(item1.productName);
                });
              }
            });
            console.log(selectedProductName);
            this.selectedProduct = [];
            this.productList1.forEach(item => {
              selectedProductName.forEach(item1 => {
                if (item1 == item.productName) {
                  this.selectedProduct.push(item);
                }
              });
            });
            console.log(this.selectedProduct);
            console.log(this.issueMessage);
          });
        }
      }
    },
    issue1() {
      this.selectedProduct.forEach(item => {
        sendMessage(item.extraInfo.deviceId, this.issueMessage).then(res => {
          console.log(res);
        });
        this.dialogVisible1 = false;
        this.issueMessage = "";
        this.groupCheck = new Array(this.groupsMessage.length).fill(false);
      });
      this.$message.success("下发成功");
    },
    deleteBatchs() {
      console.log("批量删除");
      var whichGroup = [];
      if (this.groupCheck.length == 0) {
        this.$message.warning("当前没有可选组");
      } else {
        var count = 0;
        this.groupCheck.forEach(item => {
          if (item == false) {
            count = count + 1;
          }
        });
        console.log(count);
        if (count == this.groupCheck.length) {
          this.$message.warning("没有选中组");
        } else {
          //1. 修改管理员的extraInfo
          var username = window.localStorage.getItem("username");
          UserDetail(username).then(res => {
            // console.log(res)
            var selected = res.data.extraInfo.groups;
            this.groupCheck.forEach((item, index) => {
              if (item == true) {
                selected.splice(index, 1);
              }
            });
            console.log(selected);
            res.data.extraInfo.groups = selected;
            console.log(res.data);
            EditUser(res.data).then(res1 => {
              if (res1.msg == "ok") {
                console.log("信息修改成功");
                this.products();
              }
            });
          });
          //2. 修改组长
          var selectedGrouper = [];
          console.log(this.groupsMessage);
          console.log(this.groupCheck);
          this.groupCheck.forEach((item, index) => {
            if (item == true) {
              selectedGrouper.push(
                this.groupsMessage[index].grouper.productName
              );
            }
          });
          console.log(selectedGrouper);
          selectedGrouper.forEach(item => {
            UserDetail(item).then(res => {
              console.log(res);
              var message = res.data.extraInfo;
              (message.role = "user"),
                (message.groups = {}),
                console.log(message);
              var adminToken = window.sessionStorage.getItem("adminToken");
              var _this = this;
              _this
                .axios({
                  method: "put",
                  url: "https://api.ahusmart.com/api/v1/admin/user/" + item,
                  headers: {
                    token: adminToken
                  },
                  data: {
                    username: res.data.username,
                    password: res.data.password,
                    email: res.data.email,
                    phone: res.data.phone,
                    userAddress: res.data.userAddress,
                    Wechat: res.data.userAddress.Wechat,
                    extraInfo: message
                  }
                })
                .then(res => {
                  console.log(res);
                  if (res.data.msg == "ok") {
                    console.log("组长信息修改成功");
                  }
                });
            });
          });
          //3. 修改普通用户
          var selectedUsers = [];
          this.groupCheck.forEach((item, index) => {
            if (item == true) {
              if (this.groupsMessage[index].users.length !== 0) {
                this.groupsMessage[index].users.forEach(item1 => {
                  selectedUsers.push(item1.productName);
                });
              }
            }
          });
          console.log(selectedUsers);
          if (selectedUsers.length !== 0) {
            selectedUsers.forEach(item => {
              UserDetail(item).then(res => {
                console.log(res);
                var message = res.data.extraInfo;
                message.groups = [];
                var adminToken = window.sessionStorage.getItem("adminToken");
                var _this = this;
                _this
                  .axios({
                    method: "put",
                    url: "https://api.ahusmart.com/api/v1/admin/user/" + item,
                    headers: {
                      token: adminToken
                    },
                    data: {
                      username: res.data.username,
                      password: res.data.password,
                      email: res.data.email,
                      phone: res.data.phone,
                      userAddress: res.data.userAddress,
                      Wechat: res.data.userAddress.Wechat,
                      extraInfo: message
                    }
                  })
                  .then(res => {
                    console.log(res);
                    if (res.data.msg == "ok") {
                      console.log("普通用户信息修改成功");
                    }
                  });
              });
            });
          }

          //4. 修改手环的groupStatus
          var allSelected = [];
          this.groupCheck.forEach((item, index) => {
            if (item == true) {
              allSelected.push(this.groupsMessage[index].grouper.productKey);
              if (this.groupsMessage[index].users.length !== 0) {
                this.groupsMessage[index].users.forEach(item1 => {
                  allSelected.push(item1.productKey);
                });
              }
            }
          });
          console.log(allSelected);
          allSelected.forEach(item => {
            ProductOne(item).then(res => {
              console.log(res);
              var message = res.data.extraInfo;
              message.groupStatus.status = "un";
              message.groupStatus.groups = "";
              var changedProduct = {
                productKey: res.data.productKey,
                productName: res.data.productName,
                protocolType: res.data.protocolType,
                productType: res.data.productType,
                typeIdentify: res.data.typeIdentify,
                description: res.data.description,
                extraInfo: message
              };
              updated_product(changedProduct).then(res => {
                console.log(res);
                if (res.msg == "ok") {
                  console.log("手环信息修改成功");
                  this.$message.success("删除成功");
                }
              });
            });
          });
        }
      }
    },
    bind(item) {
      this.dialogVisible3 = true;
      this.whichProduct = item;
    },
    unbind() {
      console.log("解绑");
      ProductOne(this.whichProduct.productKey).then(res => {
        if (res.msg == "ok") {
          //  res.data.extraInfo.userMessage = {};
          delete res.data.extraInfo.userMessage;
          console.log(res.data.extraInfo);
          updated_product({
            productKey: this.whichProduct.productKey,
            productName: this.whichProduct.productName,
            protocolType: "TCP",
            productType: 1,
            typeIdentify: this.whichProduct.typeIdentify,
            description: "",
            extraInfo: res.data.extraInfo
          }).then(res1 => {
            console.log(res1);
            if (res1.msg == "ok") {
              this.$message.success("解绑成功");
              this.dialogVisible3 = false;
            }
          });
        }
      });
    },
    makeSure() {
      console.log("用户绑定");
      console.log(this.whichProduct);

      this.dialogVisible2 = true;
      this.dialogVisible3 = false;
    },
    handleClick(item, index) {
      var flag = this.userCheck[index];
      this.userCheck = new Array(this.userList.length).fill(false);
      this.userCheck.splice(index, 1, !flag);
      console.log(this.userCheck);
      console.log(item);
      this.whichUser = item;
    },
    bind1() {
      ProductOne(this.whichProduct.productKey).then(res => {
        if (res.msg == "ok") {
          res.data.extraInfo.userMessage = this.whichUser;
          console.log(res.data.extraInfo);
          updated_product({
            productKey: this.whichProduct.productKey,
            productName: this.whichProduct.productName,
            protocolType: "TCP",
            productType: 1,
            typeIdentify: this.whichProduct.typeIdentify,
            description: "",
            extraInfo: res.data.extraInfo
          }).then(res1 => {
            console.log(res1);
            if (res1.msg == "ok") {
              this.$message.success("绑定成功");
              this.dialogVisible2 = false;
            }
          });
        }
      });
    },
    startSearch() {
      this.searchShow = true;
      this.show = false;
      this.selectShow = false;
    },
    startSelect() {
      this.searchShow = false;
      this.show = false;
      this.selectShow = true;
    },
    grouping() {
      console.log(this.whichGroup);
      if (this.whichGroup !== "all") {
        this.data = [];
        this.productList1.forEach(item => {
          if (
            item.extraInfo.groupStatus.groups == this.whichGroup ||
            item.extraInfo.groupStatus.status == this.whichGroup
          ) {
            this.data.push(item);
          }
        });
      } else {
        this.data = this.productList1;
      }
    },
    back() {
      this.searchShow = false;
      this.show = true;
      this.selectShow = false;
      this.whichGroup = "all";
      this.search = "";
      this.data = this.productList1;
    },
    frequencySetting() {
      console.log("下发频率");
      this.dialogVisible4 = true;
    },
    frequencySetting1() {
      if (this.settingTime == "" || this.qrequency == "") {
        this.$message.warning("时间和频率为必填项");
      } else {
        console.log(this.settingTime);
        this.settingTime[0] = this.settingTime[0].toString();
        this.settingTime[1] = this.settingTime[1].toString();
        // console.log(this.settingTime[0])
        var startHour = parseInt(this.settingTime[0].substring(16, 18)) ;
        var startMinutes = parseInt(this.settingTime[0].substring(19, 21));
        var endHour = parseInt( this.settingTime[1].substring(16, 18));
        var endMinutes = parseInt(this.settingTime[1].substring(19, 21));
        console.log(startHour);
        console.log(startMinutes);
        console.log(endHour);
        console.log(endMinutes);
        var setting = [];
        setting.push(
          {
            enable: true,
            interval: parseInt(this.qrequency),
            startHour: startHour,
            startMin: startMinutes,
            endHour: endHour,
            endMin: endMinutes
          },
          {
            enable: false,
            interval: 1,
            startHour: 0,
            startMin: 0,
            endHour: 23,
            endMin: 59
          },
          {
            enable: false,
            interval: 1,
            startHour: 0,
            startMin: 0,
            endHour: 23,
            endMin: 59
          },
          {
            enable: false,
            interval: 1,
            startHour: 0,
            startMin: 0,
            endHour: 23,
            endMin: 59
          }
        );
        console.log(setting)
        var deviceIdList =[]
        this.productList1.forEach(item=>{
deviceIdList.push(item.extraInfo.deviceId)
        })
        deviceIdList.forEach(item=>{
     var _this = this;
     var token = window.sessionStorage.getItem("token")
        _this.axios({
         method: "post",
            url: 'https://api.ahusmart.com/api/v1/newDownRaw?deviceType=smartWatch&bodyType=json&timeout=2 ' ,
                 headers: {
            token: token
          },
          data: {
          function:"setPeriod",
          deviceId: item,
          command:{
            setting:setting
          }
          }
  
  
        
        }).then((res)=>{
          console.log(res)
        })
        })
   
      }
      this.$message.success("设置成功")
      this.dialogVisible4 = false
    }
  }
};
</script>

<style lang= "scss" scoped>
.mixin-components-container {
  padding: 10px;
  /* min-height: calc(100vh - 84px); */
}
.box-card {
  z-index: 50;
  /* background-color: rgba(0,0,0,.1); */
  background-color: transparent;
  background-size: 100% 100%;
  backdrop-filter: blur(15px);
  box-shadow: 3px 3px 10px rgba(93, 93, 93, 0.5);
  border-radius: 15px;
}
.component-item {
  min-height: 100px;
}
.el-pagination {
  margin: 5px auto;
  text-align: center;
}
.btn {
  padding: 15px 20px;
  line-height: 50px;
  border-radius: 10px;
  font-size: 14px;
  background-color: #00a29a;
  color: #fff;
}
.btn:hover {
  background-color: #fff;
  color: #00a29a;
  border-radius: 0px;
  border-bottom: 2px solid #00a29a;
  border-top: 2px solid #00a29a;
}
.btn1 {
  padding: 15px 20px;
  line-height: 50px;
  border-radius: 10px;
  font-size: 14px;
  background-color: #b378c4;
  color: #fff;
}
.btn1:hover {
  background-color: #fff;
  color: #b378c4;
  border-radius: 0px;
  border-bottom: 2px solid #b378c4;
  border-top: 2px solid #b378c4;
}

.btn2 {
  padding: 15px 20px;
  line-height: 50px;
  border-radius: 10px;
  font-size: 14px;
  background-color: #aa9457;
  color: #fff;
}
.btn2:hover {
  background-color: #fff;
  color: #aa9457;
  border-radius: 0px;
  border-bottom: 2px solid #aa9457;
  border-top: 2px solid #aa9457;
}
.btn3 {
  padding: 15px 5px;
  line-height: 18px;
  width: 100px;
  border-radius: 10px;
  font-size: 14px;
  background-color: #68a3e7;
  color: #fff;
}
.btn3:hover {
  background-color: #fff;
  color: #68a3e7;
  border-radius: 0px;
  border-bottom: 2px solid #68a3e7;
  border-top: 2px solid #68a3e7;
}
.btn4 {
  padding: 15px 5px;
  line-height: 18px;
  width: 100px;
  border-radius: 10px;
  font-size: 14px;
  background-color: #eec42d;
  color: #fff;
}
.btn4:hover {
  background-color: #fff;
  color: #e9c028;
  border-radius: 0px;
  border-bottom: 2px solid #ddb72d;
  border-top: 2px solid #dab42a;
}

::v-deep .el-table__expanded-cell {
  background-color: transparent !important;
}

::v-deep .el-table th,
::v-deep .el-table tr,
::v-deep .el-table td {
  background-color: transparent;
}
.el-table::before {
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0px;
}
.clearfix {
  width: 100%;
  min-height: 75vh;
}
.proitem {
  padding: 20px 0;
  width: 100%;
  border: solid 1px rgb(230, 224, 224);
  border-radius: 10px;
  box-shadow: 3px 3px 3px #dbd8d8;
  display: flex;
}
.prochecked {
  background-color: rgba(24, 144, 255, 0.2);
}
.proitem1 {
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.4);
  z-index: 10;
  margin-top: 20px;
}
.prochecked1 {
  border-radius: 20px;
  background-color: rgba(227, 241, 247, 1);
  z-index: 20;
  margin-top: 20px;
}
.select {
  width: 90%;
  float: left;
  margin-left: 2%;
  background-color: #ebf7f7 !important;
  color: #9b8f8f;
  border: 1px solid #ebf7f7;
  outline: none;
}
</style>

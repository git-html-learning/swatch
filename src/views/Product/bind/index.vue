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
        <div slot="header" style = "height: 20px;">
            <p style = "font-size: 21px; padding: 0px;">用户分组操作</p>

        </div>
        <!-- data绑定的数据是搜索筛选的数据 -->
        <div class="clearfix">
          <!-- clearfix 主要是用在浮动层的父层，而 clear 主要是用在浮动层与浮动层之间 -->
          <!-- 主要借助 tableData的数组分割来实现分页。currentPage是当前页数，pagesize是每页展示的条数  -->
          <el-row :gutter="20">
            <el-col :span="10">
              <el-card style="height: 100%; border-radius: 20px;">
                <div slot="header" style="color: #00a29a">
                  未分组用户
                  <!-- <el-button
                    type="primary"
                    plain
                    size="mini"
                    style="float: right; margin-right: 20px;"
                  >批量分组</el-button>-->
                </div>
                <el-table
                  v-if="tableShow"
                  :data="
                     productList2
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
                  <!-- <el-table-column type="selection" width="40"></el-table-column> -->
                  <!-- 搜索设备名 -->
                  <el-table-column align="center" prop="productName" label="手环名称">
                    <template slot="header" slot-scope="scope">
                      <!-- 不点击显示产品名称，搜索框绑定一个点击事件，点击一下，show变成false -->
                      <div v-show="show">
                        <el-row type="flex" justify="center">
                          <el-col :span="23">用户</el-col>
                          <el-col :span="1">
                            <i class="el-icon-search" @click="show = !show"></i>
                          </el-col>
                        </el-row>
                      </div>
                      <!-- 点击显示搜索框 -->
                      <div v-show="!show">
                        <el-input
                          placeholder="请输入用户名"
                          label
                          suffix-icon="el-icon-search"
                          size="mini"
                          v-model="search"
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="电子围栏" prop="extraInfo.fence"></el-table-column>
                  <el-table-column align="center" label="操作" min-width="120">
                    <template slot-scope="scope">
                      <!-- <el-button
                        type="success"
                        plain
                        icon="el-icon-more"
                        size="mini "
                        @click="detailproduct(scope.row)"
                      ></el-button> -->
                      <el-button
                        type="primary"
                        plain
                        icon="el-icon-folder-add"
                        size="mini "
                        @click="editproduct(scope.row)"
                      ></el-button>
                      <!-- <el-button
                        type="danger"
                        plain
                        icon="el-icon-delete"
                        size="mini "
                        @click="deleteproduct(scope.$index, scope.row, productList)"
                      ></el-button> -->
                    </template>
                  </el-table-column>
                </el-table>

                <!-- 分页 -->
                <el-pagination
                  v-show="
                    productList2.filter(
                   (data) =>
                  !search ||
                  data.productName.toLowerCase().includes(search.toLowerCase())
                    ).length > 5
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
            </el-col>
            <el-col :span="14">
              <el-card style="border-radius: 20px;">
                <div slot="header" style="color: #00a29a">
                  分组操作
                  <el-button
                    type="danger"
                    plain
                    size="mini"
                    style="float: right;margin-right: 20px;"
                    @click="deleteBatchs"
                  >批量删除</el-button>
                  <el-button
                    type="primary"
                    plain
                    size="mini"
                    style="float: right;margin-right: 20px;"
                    @click="issue"
                  >消息下发</el-button>
                  <el-button
                    type="success"
                    plain
                    size="mini"
                    style="float: right;margin-right: 20px;"
                    @click="creatGroups"
                  >创建新组</el-button>
                </div>
                <div v-if="totalShow">
                  <div v-if="groupsShow">
                    <el-row :gutter="30">
                      <el-col :span="7" v-for="(item,index) in groupsMessage" :key="index">
                        <el-card :class="['proitem1',groupCheck[index] ? 'prochecked1' : '']">
                          <div
                            slot="header"
                            style="cursor: pointer;"
                            @click="handleClick1(item,index)"
                          >
                            {{item.name}}
                            <svg
                              @click="details(item)"
                              style="float: right; marign-right: 10px;"
                              t="1654940735265"
                              class="icon"
                              viewBox="0 0 1024 1024"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              p-id="2563"
                              width="20"
                              height="20"
                            >
                              <path
                                d="M346.2 514.6m-64.2 0a64.2 64.2 0 1 0 128.4 0 64.2 64.2 0 1 0-128.4 0Z"
                                fill="#91B1D5"
                                p-id="2564"
                              />
                              <path
                                d="M450.1 514.6a64.2 64.2 0 1 0 128.4 0 64.2 64.2 0 1 0-128.4 0Z"
                                fill="#91B1D5"
                                p-id="2565"
                              />
                              <path
                                d="M682.5 514.6m-64.2 0a64.2 64.2 0 1 0 128.4 0 64.2 64.2 0 1 0-128.4 0Z"
                                fill="#91B1D5"
                                p-id="2566"
                              />
                              <path
                                d="M512 136.3c50.7 0 99.9 9.9 146.2 29.5 44.7 18.9 84.9 46 119.5 80.6 34.5 34.5 61.6 74.7 80.6 119.5 19.6 46.3 29.5 95.5 29.5 146.2s-9.9 99.9-29.5 146.2c-18.9 44.7-46 84.9-80.6 119.5-34.5 34.5-74.7 61.6-119.5 80.6-46.3 19.6-95.5 29.5-146.2 29.5s-99.9-9.9-146.2-29.5c-44.7-18.9-84.9-46-119.4-80.6-34.5-34.5-61.6-74.7-80.6-119.5-19.6-46.3-29.5-95.5-29.5-146.2s9.9-99.9 29.5-146.2c18.9-44.7 46-84.9 80.6-119.5 34.5-34.5 74.7-61.6 119.4-80.6 46.3-19.6 95.5-29.5 146.2-29.5m0-70C265.9 66.3 66.3 265.9 66.3 512S265.9 957.7 512 957.7 957.7 758.1 957.7 512 758.1 66.3 512 66.3z"
                                fill="#91B1D5"
                                p-id="2567"
                              />
                            </svg>
                          </div>
                          <div style="color: #73969d">组长： {{item.grouper.productName}}</div>
                        </el-card>
                      </el-col>
                    </el-row>
                  </div>
                  <div v-if="!groupsShow" style="text-align: center;">
                    <svg
                      t="1654935647697"
                      class="icon"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="1736"
                      width="200"
                      height="200"
                    >
                      <path
                        d="M102.4 896a409.6 51.2 0 1 0 819.2 0 409.6 51.2 0 1 0-819.2 0Z"
                        fill="#4A68CC"
                        opacity=".1"
                        p-id="1737"
                      />
                      <path
                        d="M116.736 376.832c0 8.704 6.656 15.36 15.36 15.36s15.36-6.656 15.36-15.36-6.656-15.36-15.36-15.36c-8.192 0-15.36 7.168-15.36 15.36zM926.72 832c-19.456 5.12-23.552 9.216-28.16 28.16-5.12-19.456-9.216-23.552-28.16-28.16 18.944-5.12 23.552-9.216 28.16-28.16 4.608 18.944 8.704 23.552 28.16 28.16zM202.24 323.072c-25.088 6.656-30.208 11.776-36.864 36.864-6.656-25.088-11.776-30.208-36.864-36.864 25.088-6.656 30.208-12.288 36.864-36.864 6.144 25.088 11.776 30.208 36.864 36.864zM816.64 235.008c-15.36 4.096-18.432 7.168-22.528 22.528-4.096-15.36-7.168-18.432-22.528-22.528 15.36-4.096 18.432-7.168 22.528-22.528 3.584 15.36 7.168 18.432 22.528 22.528zM882.688 156.16c-39.936 10.24-48.128 18.944-58.88 58.88-10.24-39.936-18.944-48.128-58.88-58.88 39.936-10.24 48.128-18.944 58.88-58.88 10.24 39.424 18.944 48.128 58.88 58.88z"
                        fill="#4A68CC"
                        opacity=".5"
                        p-id="1738"
                      />
                      <path
                        d="M419.84 713.216v4.096l33.792 31.232 129.536-62.976L465.92 760.832v36.864l18.944-18.432v-0.512 0.512l18.944 18.432 100.352-122.88v-4.096z"
                        fill="#4A68CC"
                        opacity=".2"
                        p-id="1739"
                      />
                      <path
                        d="M860.16 551.936v-1.024c0-1.024-0.512-1.536-0.512-2.56v-0.512l-110.08-287.232c-15.872-48.64-60.928-81.408-112.128-81.408H387.072c-51.2 0-96.256 32.768-112.128 81.408L164.864 547.84v0.512c-0.512 1.024-0.512 1.536-0.512 2.56V757.76c0 65.024 52.736 117.76 117.76 117.76h460.8c65.024 0 117.76-52.736 117.76-117.76v-204.8c-0.512-0.512-0.512-0.512-0.512-1.024zM303.616 271.36s0-0.512 0.512-0.512C315.392 233.984 349.184 209.92 387.072 209.92h249.856c37.888 0 71.68 24.064 83.456 60.416 0 0 0 0.512 0.512 0.512l101.888 266.24H588.8c-8.704 0-15.36 6.656-15.36 15.36 0 33.792-27.648 61.44-61.44 61.44s-61.44-27.648-61.44-61.44c0-8.704-6.656-15.36-15.36-15.36H201.728L303.616 271.36zM829.44 757.76c0 48.128-38.912 87.04-87.04 87.04H281.6c-48.128 0-87.04-38.912-87.04-87.04v-189.44h226.816c7.168 43.52 45.056 76.8 90.624 76.8s83.456-33.28 90.624-76.8H829.44v189.44z"
                        fill="#4A68CC"
                        opacity=".5"
                        p-id="1740"
                      />
                      <path
                        d="M512 578.56c-14.336 0-25.6-11.264-25.6-25.6V501.76H253.44l83.968-219.136 0.512-1.024c7.168-21.504 26.624-35.84 49.152-35.84h249.856c22.528 0 41.984 14.336 49.152 35.84l0.512 1.024L770.56 501.76H537.6v51.2c0 14.336-11.264 25.6-25.6 25.6z"
                        fill="#4A68CC"
                        opacity=".2"
                        p-id="1741"
                      />
                    </svg>
                    <div style="font-size: 25px;color: #a4b3e4">当前无小组</div>
                  </div>
                </div>
                <div v-if="!totalShow">
                  <svg
                    @click="totalShow = true"
                    t="1654941095100"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="3396"
                    width="20"
                    height="20"
                  >
                    <path
                      d="M475 276V141.4c-12.1-56.3-58.2-22-58.2-22L96.6 395.9c-70.4 48.9-4.8 85.7-4.8 85.7l315.4 274.1c63.1 46.5 67.9-24.5 67.9-24.5V606.4C795.3 506 926.3 907.5 926.3 907.5c12.1 22 19.4 0 19.4 0C1069.4 305.4 475 276 475 276z"
                      p-id="3397"
                      fill="#4e8e8f"
                    />
                  </svg>
                  <span style="margin-left:20px;">小组详情</span>
                  <!-- <div>
                    <span>组长：</span>
                    <el-card>
                      <div slot="header">用户名： {{groupsDetail.grouper.productName}}</div>
                      <div>
                        <ol>
                          <li>温度： {{groupsDetail.grouper.latestData.body}}</li>
                          <li>心率： {{groupsDetail.grouper.latestData.heartRate}}</li>
                          <li>电子围栏： {{groupsDetail.grouper.extraInfo.fence}}</li>
                        </ol>
                      </div>
                    </el-card>
                  </div>
                  <div>
                    <span>组员</span>
                    <el-card
                      v-for="(item,index) in groupsDetail.users"
                      :key="index"
                    >{{item.productName}}</el-card>
                  </div>-->
                  <p style="font-size: 20px; color:#a9927e; margin-left: 20px;">
                    <span>组长</span>
                  </p>
                  <el-card>
                    用户名： {{groupsDetail.grouper.productName}}
                    <span>
                      <svg
                        style="float: right; margin-right: 30px;"
                        @click="productDetail(groupsDetail.grouper)"
                        t="1654997784910"
                        class="icon"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="2157"
                        width="20"
                        height="20"
                      >
                        <path
                          d="M512 1011.2a496.384 496.384 0 0 0 448.3072-279.296 38.4 38.4 0 0 0-68.9664-33.8944A420.0448 420.0448 0 0 1 512 934.4c-232.9088 0-422.4-189.4912-422.4-422.4S279.0912 89.6 512 89.6s422.4 189.4912 422.4 422.4a38.4 38.4 0 0 0 76.8 0c0-275.2512-223.9488-499.2-499.2-499.2S12.8 236.7488 12.8 512s223.9488 499.2 499.2 499.2z"
                          fill="#438CFF"
                          p-id="2158"
                        />
                        <path
                          d="M760.4224 537.6a38.4 38.4 0 0 0-38.4-38.4h-460.8a38.4 38.4 0 0 0 0 76.8h460.8a38.4 38.4 0 0 0 38.4-38.4zM261.2224 378.8288h307.2a38.4 38.4 0 0 0 0-76.8h-307.2a38.4 38.4 0 0 0 0 76.8zM261.2224 696.3712a38.4 38.4 0 0 0 0 76.8h204.8a38.4 38.4 0 0 0 0-76.8h-204.8z"
                          fill="#438CFF"
                          p-id="2159"
                        />
                        <path
                          d="M711.5776 340.4288m-51.2 0a51.2 51.2 0 1 0 102.4 0 51.2 51.2 0 1 0-102.4 0Z"
                          fill="#438CFF"
                          p-id="2160"
                        />
                      </svg>
                    </span>
                    <el-row style="margin-top: 20px;">
                      <el-col :span="8">温度： {{groupsDetail.grouper.latestData.body}}</el-col>
                      <el-col :span="8">心率： {{groupsDetail.grouper.latestData.heartRate}}</el-col>
                      <el-col :span="8">电子围栏： {{groupsDetail.grouper.extraInfo.fence}}</el-col>
                    </el-row>
                  </el-card>
                  <p style="font-size: 20px; color:#a9927e; margin-left: 20px;">
                    <span>组员</span>
                    <span v-if="groupsDetail.users.length == 0">(当前无成员)</span>
                  </p>
                  <el-card v-for="(item,index) in groupsDetail.users" :key="index">
                    {{index+1}} 、 用户名： {{item.productName}}
                    <span>
                      <svg
                        style="float: right; margin-right: 30px;"
                        @click="productDetail(item)"
                        t="1654997784910"
                        class="icon"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="2157"
                        width="20"
                        height="20"
                      >
                        <path
                          d="M512 1011.2a496.384 496.384 0 0 0 448.3072-279.296 38.4 38.4 0 0 0-68.9664-33.8944A420.0448 420.0448 0 0 1 512 934.4c-232.9088 0-422.4-189.4912-422.4-422.4S279.0912 89.6 512 89.6s422.4 189.4912 422.4 422.4a38.4 38.4 0 0 0 76.8 0c0-275.2512-223.9488-499.2-499.2-499.2S12.8 236.7488 12.8 512s223.9488 499.2 499.2 499.2z"
                          fill="#438CFF"
                          p-id="2158"
                        />
                        <path
                          d="M760.4224 537.6a38.4 38.4 0 0 0-38.4-38.4h-460.8a38.4 38.4 0 0 0 0 76.8h460.8a38.4 38.4 0 0 0 38.4-38.4zM261.2224 378.8288h307.2a38.4 38.4 0 0 0 0-76.8h-307.2a38.4 38.4 0 0 0 0 76.8zM261.2224 696.3712a38.4 38.4 0 0 0 0 76.8h204.8a38.4 38.4 0 0 0 0-76.8h-204.8z"
                          fill="#438CFF"
                          p-id="2159"
                        />
                        <path
                          d="M711.5776 340.4288m-51.2 0a51.2 51.2 0 1 0 102.4 0 51.2 51.2 0 1 0-102.4 0Z"
                          fill="#438CFF"
                          p-id="2160"
                        />
                      </svg>
                    </span>
                    <el-row style="margin-top: 20px;">
                      <el-col :span="8">温度： {{item.latestData.body}}</el-col>
                      <el-col :span="8">心率： {{item.latestData.heartRate}}</el-col>
                      <el-col :span="8">电子围栏： {{item.extraInfo.fence}}</el-col>
                    </el-row>
                  </el-card>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </el-row>
    <el-drawer title="点击选择要分入的组" :visible.sync="drawer" :with-header="true">
      <el-row :gutter="20">
        <el-col v-for="(item,index) in groupsMessage" :key="index" :span="10" :offset="1">
          <div
            style="margin-top: 20px;"
            @click="handleClick(item,index)"
            :class="['proitem', productCheck[index] ? 'prochecked' : '']"
          >
            <span style="margin-left: 30px;">{{item.name}}</span>
          </div>
        </el-col>
        <el-button
          @click="addGroups"
          type="primary"
          plain
          style="margin-top: 50px; float: right; margin-right: 50px;"
        >确定加入</el-button>
      </el-row>
    </el-drawer>
    <el-dialog title="创建新组" :visible.sync="dialogVisible" width="30%">
      <el-row>
        <el-col :span="6" style="margin-top: 13px; font-weight: bold;">自定义组名：</el-col>
        <el-col :span="18">
          <el-input v-model="groupName" placeholder="组名"></el-input>
        </el-col>
      </el-row>
      <el-row style="margin-top: 30px;">
        <el-col :span="6" style="margin-top: 13px; font-weight: bold;">设置组长：</el-col>
        <el-col :span="18">
          <el-select label=" " v-model="grouper">
            <el-option
              v-for="item in options"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="creat">确定创建</el-button>
      </span>
    </el-dialog>
    <el-dialog title="消息下发" :visible.sync="dialogVisible1" width="30%">
      <!-- <span>这是一段信息</span> -->
      <el-row>
        <el-col :span="6" style="margin-top: 12px; font-weight: bold">下发的消息:</el-col>
        <el-col :span="18">
          <el-input v-model="issueMessage" placeholder="下发的消息"></el-input>
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="issue1">下发</el-button>
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
import productDetail from "../admin/productDetail";
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
      viewMoreproduct: false,
      product: {
        protocolType: "接入类型",
        productType: "产品类型",
        typeIdentify: "产品识别符"
      },
      currentPage: 1,
      // currentPage 初始页
      pageSize: 5,
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
      whichGroup: {},
      totalShow: true,
      groupsDetail: [],
      groupCheck: [],
      issueMessage: "",
      selectedProduct: []
    };
  },
  computed: {
    total() {
      return this.productList2.filter(
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
      this.loading = false;
      allProductKey().then(res => {
        if (res.msg == "ok") {
          this.productNameList = res.data.productKeys;
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
                    ].extraInfo.stepNum;
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
            this.productList2 = [];
            this.options = [];
            console.log(this.productList1);
            if (this.productList1.length !== 0) {
              this.productList1.forEach(item => {
                if (item.extraInfo.groupStatus.status == "un") {
                  this.productList2.push(item);
                }
              });
            }

            console.log(this.productCheck);
            if (this.productList2.length !== 0) {
              this.productList2.forEach(item => {
                var obj = {
                  value: item.productName,
                  label: item.productName
                };
                this.options.push(obj);
              });
            }

            (this.currentPage = 1), (this.alertMessage = []);
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
            // console.log(this.latestAlert);
          });
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
      //   this.condition = 2;
      //   this.diglogTitle = "将用户分到下面的小组";
      this.detail = val;

      //   this.viewMoreproduct = !this.viewMoreproduct;
      this.drawer = true;
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
        (row.latestData.heartRate > 120 || row.latestData.heartRate < 60) &&
        columnIndex === 4
      ) {
        return "color: red";
      } else {
        return "color: #6f9199";
      }
    },
    handleSelectionChange(val, index) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
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
              this.$message.success("新组创建成功")
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
              this.$message.success("加入成功")
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
      // console.log(item)
      this.$router.push({ path: "/products/pageDetail" });
      window.sessionStorage.setItem("whichProduct", JSON.stringify(item));
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
                  this.$message.success("删除成功")
                }
              });
            });
          });
          
        }
      }
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

</style>

<template>
  <div class="mixin-components-container">
    <el-dialog
      :title="diglogTitle"
      :visible.sync="viewMoredevice"
      :before-close="detailDevice"
      fullscreen
      
    >
    <!--   fullscreen全屏 -->
    <!-- before-close：关闭前的回调，会暂停 Dialog 的关闭，function(done)，done 用于关闭 Dialog。location.reload：刷新整个页面 -->
      <device-detail
        @beforeClose="closeDialog"
        :condition="condition"
        :devicedetail="detail"
      />
    </el-dialog>

    <el-row>
      <el-card class="box-card">
        <div slot="header" style="margin-bottom: 50px">
          <el-col :span="4" class="text-center">
            <router-link class="pan-btn blue-btn" to="/device/handDevice"
              >手动添加设备</router-link
            >
          </el-col>
          <el-col :span="4" class="text-center">
            <router-link class="pan-btn tiffany-btn" to="/device/templateDevice"
              >模板添加设备</router-link
            >
          </el-col>
          <el-col :span="4" class="text-center">
            <router-link
              class="pan-btn yellow-btn"
              to="/device/createMoreDevice"
              >批量创建设备</router-link
            >
          </el-col>
          <el-col :span="4" class="text-center">
            <router-link class="pan-btn green-btn" to="/device/createTemplate"
              >添加模板</router-link
            >
          </el-col>
          <el-col :span="4" class="text-center">
            <router-link
              class="pan-btn light-blue-btn"
              to="/device/deleteTemplate"
              >删除模板</router-link
            >
          </el-col>
          <el-col :span="4" class="text-center">
            <router-link class="pan-btn pink-btn" to="/device/alertData"
              >今日报警信息</router-link
            >
          </el-col>
        </div>

        <!-- data绑定的数据是搜索筛选的数据 -->
        <div class="clearfix">
          <el-table
            :data="
              tabledata
                .filter(
                  (data) =>
                    !search ||
                    data.deviceName.toLowerCase().includes(search.toLowerCase())
                )
                .slice((currentPage - 1) * pageSize, currentPage * pageSize)
            "
            border
            stripe
            v-loading="loading"
            element-loading-text="数据加载中"
            element-loading-spinner="el-icon-loading"
          >

            <el-table-column
              align="center"
              min-width="30"
              prop="deviceName"
              label="设备名称"
            >
              <template slot="header" slot-scope="scope">
                <div v-show="show">
                  <el-row type="flex" justify="center">
                    <el-col :span="23">设备名称</el-col>
                    <el-col :span="1">
                      <i class="el-icon-search" @click="show = !show"></i>
                    </el-col>
                  </el-row>
                </div>
                <div v-show="!show">
                  <el-input
                    placeholder="请输入设备名"
                    label
                    suffix-icon="el-icon-search"
                    size="mini"
                    v-model="search"
                  ></el-input>
                </div>
              </template>
            </el-table-column>

            <el-table-column
              align="center"
              min-width="30"
              v-for="(col, index) in device"
              :prop="index"
              :key="index"
              :label="col"
            ></el-table-column>

            <el-table-column
              align="center"
              min-width="20"
              prop="status"
              label="设备状态"
            >
              <template slot-scope="scope">
                <svg-icon
                  :icon-class="
                    scope.row.status === 'online' ? '在线2' : '离线1'
                  "
                  class-name="card-panel-icon"
                />
              </template>
            </el-table-column>

            <el-table-column align="center" label="操作" min-width="25">
              <template slot-scope="scope">
                <!-- <div>{{ scope.row.productKey }}</div> -->
                <el-button
                  type="success"
                  plain
                  icon="el-icon-more"
                  size="mini "
                  @click="detailDevice(scope.row)"
                ></el-button>
                <el-button
                  type="primary"
                  plain
                  icon="el-icon-edit"
                  size="mini "
                  @click="editDevice(scope.row)"
                ></el-button>
                <el-button
                  type="danger"
                  plain
                  icon="el-icon-delete"
                  size="mini "
                  @click="deleteDevice(scope.$index, scope.row, tabledata)"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            v-show="
              tabledata.filter(
                (data) =>
                  !search ||
                  data.deviceName.toLowerCase().includes(search.toLowerCase())
              ).length > 10
            "
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 20, total]"
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
import { Delete_device } from "@/api/index";
import deviceDetail from "./deviceDetail";
export default {
  name: "Device",
  components: {
    deviceDetail,
  },
  data() {
    return {
      loadingtext: "数据加载中",
      loading: true,
      diglogTitle: "设备详情",
      condition: 0,
      detail: {},
      search: "",
      show: true,
      viewMoredevice: false,
      device: {
        productName: "产品名称",
        netType: "网络类型",
        deviceType: "设备类型",
      },
      currentPage: 1,
      pageSize: 10,
      DeleteKey: { productKey: "", deviceKey: "" },
    };
  },
  computed: {
    tabledata() {
      var data = this.$store.state.other.deviceNums;
      data = data.sort();
      if (data.length == 0) {
        this.loading = true;
        return data;
      } else {
        this.loading = false;
        this.loadingtext = "数据加载成功！";
        return data;
      }
    },
    total() {
      return this.tabledata.filter(
        (data) =>
          !this.search ||
          data.deviceName.toLowerCase().includes(this.search.toLowerCase())
      ).length;
    },
  },
  // dispatch：异步操作，数据提交至 actions ，可用于向后台提交数据
  // commit：  同步操作，数据提交至 mutations ，可用于登录成功后读取用户信息写到缓存里
  created() {
    this.$store.dispatch("productNum");
  },
  methods: {
    deleteDevice(index, row, rows) {
      this.DeleteKey.productKey = row.productKey;
      this.DeleteKey.deviceKey = row.deviceKey;
      this.$confirm("此操作将永久删除该设备, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          rows.splice(index, 1);
          Delete_device(this.DeleteKey).then((res) => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.$store.dispatch("productNum");
            } else {
              this.$message({
                type: "info",
                message: res.msg,
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    detailDevice(val) {
      this.condition = 0;
      this.diglogTitle = "设备详情";
      this.detail = val;
      this.viewMoredevice = !this.viewMoredevice;
    },
    editDevice(val) {
      this.condition = 1;
      this.diglogTitle = "编辑设备信息";
      this.detail = val;
      this.viewMoredevice = !this.viewMoredevice;
    },
    closeDialog() {
      this.viewMoredevice = !this.viewMoredevice;
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
  },
};
</script>

<style lang="less" scoped>
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
/deep/.el-dialog {
  transform: scale(0.8, 0.9);
  /* margin-top: 0; */
  padding-left: 20%;
}
</style>

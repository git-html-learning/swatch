<template>
  <div class="content">
    <el-card :body-style="{ padding: '0px' }">
      <div slot="header">
        <el-row type="flex" justify="end">
          <el-col :span="20">
            <h3>今日报警信息</h3>
          </el-col>
          <el-col :span="2">
            <el-button type="danger" size="mini" @click="deleteRead" plain
              >删除已选</el-button
            >
          </el-col>
          <el-col :span="2">
            <el-button
              type="primary"
              icon="el-icon-check"
              size="mini"
              v-show="!showbt"
              plain
              >已读</el-button
            >
            <el-button
              type="warning"
              size="mini"
              v-show="showbt"
              @click="read"
              plain
              >标记为已读</el-button
            >
          </el-col>
        </el-row>
      </div>
      <el-table
        ref="multipleTable"
        :row-class-name="tableRowClassName"
        :data="
          tableData
            .filter(
              (data) =>
                !search ||
                data.deviceName.toLowerCase().includes(search.toLowerCase())
            )
            .slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        v-loading="loading"
        element-loading-text="数据加载中"
        element-loading-spinner="el-icon-loading"
      >
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column
          align="center"
          min-width="20"
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
          v-for="(item, index) in columns"
          :prop="index"
          :key="index"
          :label="item"
          :min-width="width[index]"
        ></el-table-column>
        <el-table-column align="center" min-width="15" prop="unRead">
          <template slot="header">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                {{ selectData
                }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="全部">全部</el-dropdown-item>
                <el-dropdown-item command="未读">未读</el-dropdown-item>
                <el-dropdown-item command="已读">已读</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
          <template slot-scope="scope">
            <div>
              <svg-icon
                :icon-class="scope.row.unRead === true ? '未读' : '已读1'"
                class-name="card-panel-icon"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          header-align="center"
          min-width="55"
          prop="Content"
          label="报警内容"
          show-overflow-tooltip
        ></el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[6, 12, 24, 48, total]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="1200"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import { Read, UserAllalert, DeleteAlerts } from "@/api/index";
export default {
  data() {
    return {
      selectData: "未读",
      loading: true,
      show: true,
      showbt: true,
      search: "",
      columns: {
        date: "时间",
        alertId: "报警ID",
        level: "报警等级",
        method: "报警方式",
        subject: "报警类别",
      },
      width: {
        deviceName: 20,
        date: 20,
        alertId: 22,
        level: 12,
        method: 12,
        subject: 15,
        unRead: 12,
        Content: 50,
      },
      tableData: [],
      multipleSelection: [],
      currentPage: 1,
      pageNum: [],
      pageSize: 12,
      payload: {
        pageIndex: 1,
        pageSize: 12,
        asc: 0,
        unRead: 1,
      },
    };
  },
  watch: {
    multipleSelection: {
      handler(val) {
        if (val.length != 0) {
          this.showbt = true;
        }
      },
      immediate: true,
    },
  },
  computed: {
    //翻页的总数目
    total() {
      return this.tableData.filter(
        (data) =>
          !this.search ||
          data.deviceName.toLowerCase().includes(this.search.toLowerCase())
      ).length;
    },
  },
  mounted() {
    this.requireAlerts();
  },
  methods: {
    requireAlerts() {
      //判断本页是否已加载
      if (this.pageNum.includes(this.currentPage)) {
        return;
      }
      this.loading = true;
      this.payload.pageIndex = this.currentPage;
      this.payload.pageSize = this.pageSize;
      UserAllalert(this.payload).then((res) => {
        if (res.code == 200) {
          res = res.data.alertInfo;
          //这个是为了加载过的页数存起来，不需要二次加载
          this.pageNum.push(this.currentPage);
          this.tableData = [...this.tableData, ...res];
          this.loading = false;
        } else {
          this.$message({
            type: "info",
            message: res.msg,
          });
          this.loading = false;
        }
      });
    },
    //更新未读消息为一度消息
    read() {
      // this.showbt = !this.showbt;
      var alertId = [];
      //下面是为了浅拷贝，因为如果不保留下，经过map就会清空了this.multipleSelection，就不会显示报警信息为无色
      var al = this.multipleSelection;
      this.multipleSelection.map((val) => {
        alertId.push(val.alertId);
      });
      var _this = this;
      Read(alertId).then((res) => {
        al.map((val) => {
          val["unRead"] = false;
        });
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: `已选 ${res.data.total} 条,已读 ${res.data.updated} 条`,
          });
          this.$store.dispatch("productNum");
        } else {
          this.$message({
            type: "info",
            message: res.msg,
          });
        }
      });
    },
    //为未读消息的行会显示颜色，一度消息无色
    tableRowClassName({ row, rowIndex }) {
      if (row.unRead === true) {
        return "warning-row";
      } else {
        return "";
      }
      return "";
    },
    handleSelectionChange(val, index) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.requireAlerts();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.requireAlerts();
    },
    handleCommand(command) {
      this.selectData = command;
      if (command == "已读") {
        this.payload.unRead = 0;
        this.requireAlerts();
      } else if (command == "未读") {
        this.payload.unRead = 1;
      } else {
        this.payload.unRead = 2;
      }
      //初始化数据
      this.currentPage = 1;
      this.pageNum = [];
      this.tableData = [];
      this.requireAlerts();
    },
    async deleteRead() {
      var alertId = [];
      this.multipleSelection.map((val) => {
        alertId.push(val.alertId);
      });
      var res = await DeleteAlerts(alertId);
      if (res.code == 200) {
        //表格删除掉选中数据，使用遍历查找
        this.tableData.forEach((item, index) => {
          if (alertId.includes(item.alertId)) {
            this.tableData.splice(index, 1);
          }
        });
        this.$message({
          type: "success",
          message: `已选 ${res.data.total} 条,删除 ${res.data.deleted} 条`,
        });
      } else {
        this.$message({
          type: "info",
          message: res.msg,
        });
      }
    },
  },
};
</script>

<style lang="less" >
.content {
  .warning-row {
    background: #f0ede3;
  }

  .el-table .success-row {
    background: #d1f7bf;
  }
  margin: 10px;
  .el-pagination {
    margin: 5px auto;
    text-align: center;
  }
}
.el-dropdown-link {
  cursor: pointer;
  color: #909399;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
<template>
  <div
    class="content"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
  >
    <div class="content_item">
      <div class="header">
        <el-row :gutter="10">
          <el-col :span="6">
            <el-input
              placeholder="请输入用户名"
              label
              suffix-icon="el-icon-search"
              size="mini"
              v-model="search"
            ></el-input>
          </el-col>
          <el-col :span="18">
            <div style="float: right">
              <el-radio v-model="radio" size="mini" border label="1"
                >卡片</el-radio
              >
              <el-radio v-model="radio" size="mini" border label="2"
                >表格</el-radio
              >
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="content_card" v-show="radio == '1'">
        <el-row :gutter="10">
          <el-col
            v-for="(item, index) in users.filter(
              (data) =>
                !search ||
                data.username.toLowerCase().includes(search.toLowerCase())
            )"
            :key="index"
            style="margin: 10px 0"
            :span="6"
          >
            <el-card shadow="hover" :body-style="{ padding: '20px' }">
              <div slot="header">
                <span style="font-size: 14px">
                  <svg-icon icon-class="用户" style="font-size: 18px" />
                  {{ item.username }}</span
                >
              </div>
              <el-row type="flex">
                <el-col :span="18">
                  <div class="text">
                    <div class="text_item">
                      <svg-icon
                        icon-class="产品"
                        style="font-size: 13px; color: #409eff"
                      />
                      产品:{{ item.productNums }}
                    </div>
                    <div class="text_item">
                      <svg-icon
                        icon-class="设备"
                        style="font-size: 13px; color: #409eff"
                      />
                      设备:{{ item.deviceNums }}
                    </div>
                    <div class="text_item">
                      <svg-icon
                        icon-class="时间"
                        style="font-size: 13px; color: #409eff"
                      />
                      时间:{{ format1(item.createdAt) }}
                    </div>
                  </div>
                </el-col>
                <el-col :span="6" class="btn">
                  <div style="margin: 0 0 5px 0; float: right">
                    <el-button
                      type="success"
                      plain
                      icon="el-icon-more"
                      size="mini "
                      @click="detailUser(item, 'detail')"
                    ></el-button>
                  </div>
                  <div style="margin: 0 0 5px 0; float: right">
                    <el-button
                      type="primary"
                      plain
                      icon="el-icon-edit"
                      size="mini "
                      @click="editUser(item, 'edit')"
                    ></el-button>
                  </div>
                  <div style="float: right">
                    <el-button
                      type="danger"
                      plain
                      icon="el-icon-delete"
                      size="mini "
                      @click="deleteUserCard(item)"
                    ></el-button>
                  </div>
                </el-col>
              </el-row> </el-card
          ></el-col>
        </el-row>
      </div>
      <div class="content_table" v-show="radio == '2'">
        <el-table
          v-loading="loading"
          element-loading-text="数据加载中"
          element-loading-spinner="el-icon-loading"
          :data="
            users.filter(
              (data) =>
                !search ||
                data.username.toLowerCase().includes(search.toLowerCase())
            )
          "
          border
          stripe
        >
          <el-table-column
            align="center"
            v-for="(item, index) in usersLabel"
            :prop="index"
            :key="item"
            :label="item"
            :min-width="usersWidth[index]"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="createdAt"
            label="注册时间"
            show-overflow-tooltip
            min-width="200"
            :formatter="format"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="option"
            label="操作"
            min-width="200"
          >
            <template slot-scope="scope">
              <el-button
                type="success"
                plain
                icon="el-icon-more"
                size="mini "
                @click="detailUser(scope.row, 'detail')"
              ></el-button>
              <el-button
                type="primary"
                plain
                icon="el-icon-edit"
                size="mini "
                @click="editUser(scope.row, 'edit')"
              ></el-button>
              <el-button
                type="danger"
                plain
                icon="el-icon-delete"
                size="mini "
                @click="deleteUser(scope.row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!-- 删除用户操作的对话窗 -->
    <el-dialog title="警告" :visible.sync="dialogVisible" width="30%">
      <p style="color: red; font-size: ; text-indent: 2em">
        此操作将永久删除该用户, 是否继续？
      </p>
      <el-input
        v-model="deletePass"
        style="padding: 10px 30px"
        placeholder="请输入管理员密码"
        size="small"
        clearable
        type="password"
      ></el-input>

      <!-- <p style="color: red; font-size: 15px;text-indent: 2em" >如若继续删除请输入管理员密码!</p> -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="conformDelete">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 显示用户详情和编辑对话窗 -->

    <el-dialog :title="title" fun :visible.sync="titleDialogVisible">
      <user-detail :title="propTitle" :otherUserData="userData"> </user-detail>
    </el-dialog>
  </div>
</template>





<script>
import { AdminUsers, DeleteUsers } from "@/api/admin";
import { dataType } from "@/api/index";
import userDetail from "../userDetail";

export default {
  components: { userDetail },
  data() {
    return {
      radio: "1",
      search: "",
      dialogVisible: false,
      titleDialogVisible: false,
      title: "用户详情",
      userData: [],
      propTitle: "",
      deletePass: "",
      loading: true,
      index: "",
      row: "",
      users: [],
      usersLabel: {
        username: "用户名",
        productNums: "产品数量",
        deviceNums: "设备数量",
      },
      usersWidth: {
        username: "150",
        productNums: "100",
        deviceNums: "100",
      },
    };
  },
  mounted() {
    this.Users();
  },
  methods: {
    async Users() {
      var users = await AdminUsers();
      if (users.code == 200) {
        this.users = users.data.users;
        this.loading = false;
      }
    },
    format(row, column, cellValue, index) {
      return dataType(cellValue);
    },
    format1(val) {
      return dataType(val);
    },
    deleteUser(index, row, rows) {
      this.dialogVisible = true;
      (this.index = index), (this.row = row);
    },
      deleteUserCard(item) {
      this.dialogVisible = true;
      console.log(item);
      (this.row = item)
     
    },
    async conformDelete() {
      const pass = sessionStorage.getItem("adminPassword");
      if (this.deletePass == pass) {
        this.users.splice(this.index, 1);
        var res = await DeleteUsers(this.row.username);
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        } else {
          this.$message({
            type: "info",
            message: res.msg,
          });
        }
        this.dialogVisible = false;
      } else {
        this.$message({
          type: "error",
          message: "管理员密码错误!",
        });
      }
    },
    detailUser(row, title) {
      this.propTitle = title;
      this.title = "用户详情";
      this.titleDialogVisible = true;
      this.userData = row;
    },
    editUser(row, title) {
      this.propTitle = title;
      this.title = "用户编辑";
      this.titleDialogVisible = true;
      this.userData = row;
    },
    conformEidt() {},
  },
};
</script>
<style lang="less" scoped>
.el-button {
  transform: scale(0.8);
}
/deep/.el-dialog {
  transform: scale(0.8, 0.9);
  border-radius: 5px;
}
.content_table {
  margin: 10px 0;
}
.content {
  width: 75vw;
  .header {
    width: 100%;
  }
  .content_item {
    width: 100%;
  }
}
.text {
  width: 100%;
  color: #303133;
  font-size: 13px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  .text_item {
    margin: 10px;
    flex: 1;
  }
}

</style>
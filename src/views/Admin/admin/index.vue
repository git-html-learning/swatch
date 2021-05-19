<template>
  <div class="content">
    <transition name="fade">
      <div class="login" v-if="!adminAuth">
        <div class="title">
          <h3>登录管理员账号</h3>
        </div>
        <el-divider></el-divider>
        <div class="form">
          <el-form :model="form" ref="form" label-width="80px">
            <el-form-item label="Admin">
              <el-input
                placeholder="请输入账号"
                clearable
                v-model="form.username"
              ></el-input>
            </el-form-item>
            <el-form-item label="Password">
              <el-input
                placeholder="请输入密码"
                clearable
                type="password"
                v-model="form.password"
              ></el-input>
            </el-form-item>
          </el-form>
          <el-button @click="onSubmit(form)">登录</el-button>
          <el-button @click="form.password = form.username = ''"
            >重置</el-button
          >
        </div>
      </div>
    </transition>

    <div class="admin" v-if="adminAuth"><adminUser /></div>
  </div>
</template>





<script>
import { AdminLogin } from "@/api/admin";
import { setAdminToken } from "@/utils/auth";
import adminUser from "./adminUser";
export default {
  components: {
    adminUser,
  },
  data() {
    return {
      auth: false,
      form: {
        // username: "弘恩科技",
        // password: "hongenkj&ahu@2020",
        username: "",
        password: "",
      },
    };
  },
  computed: {
    adminAuth() {
      if (sessionStorage.getItem("auth")) {
        return true;
      } else {
        return this.auth;
      }
    },
  },

  methods: {
    async onSubmit(val) {
      var res = await AdminLogin(val);
      if (res.code == 200) {
        this.auth = true;
        sessionStorage.setItem("auth", "true");
        sessionStorage.setItem("adminPassword", val.password);
        setAdminToken(res.data.token);
      } else {
        this.$message({
          showClose: true,
          message: "提示:" + res.msg,
          type: "error",
        });
      }
    },
  },
};
</script>
<style lang="less" scoped>
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  .login {
    text-align: center;
    height: 100%;
    margin-top: 50px;
    width: 30%;
    padding: 20px;
    border: 2px solid #dcdfe6;
    border-radius: 10px;
    .btn {
      text-align: center;
    }
    padding-bottom: 50px;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
@media (max-width: 768px) {
  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    .login {
      text-align: center;
      height: 100%;
      margin-top: 50px;
      width: 100%;
      padding: 5px;
      border: 2px solid #dcdfe6;
      border-radius: 10px;
      .btn {
        text-align: center;
      }
      padding-bottom: 20px;
    }
  }
}
</style>
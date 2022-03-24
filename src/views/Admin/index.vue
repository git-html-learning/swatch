<template>
  <div class="content">
    <el-card :body-style="{ padding: '10px', height: '100%' }">
      <div slot="header">
        <el-row type="flex" justify="">
          <el-col :span="23"> <span>个人中心</span></el-col>
          <el-col :span="1">
            <el-button
              type="primary"
              v-show="backAdmin"
              size="mini"
              plain
              @click="backUsers"
              >退出</el-button
            ></el-col
          >
        </el-row>
      </div>
      <div class="tab">

        <el-tabs
          tab-position="left"
          @tab-click="tab"
          style="height: 100%; overflow: auto"
          :value="activeName"
        >
          <el-tab-pane label="用户资料" name="user"><user /></el-tab-pane>
          
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>





<script>
import user from "./user";

export default {
  components: {
    user,
   
  },
  data() {
    return { backAdmin: false, activeIndex: "userdetail" };
  },
  computed: {
    activeName() {
      if (sessionStorage.getItem("tab") == "admin") {
        this.backAdmin = true;
      } else {
        this.backAdmin = false;
      }
      if (sessionStorage.getItem("tab")) {
        return sessionStorage.getItem("tab");
      } else {
        return "user";
      }
    },
  },

  methods: {
    tab(val) {
      sessionStorage.setItem("tab", val.name);
      if (val.name == "admin") {
        this.backAdmin = true;
      } else {
        this.backAdmin = false;
      }
    },
    backUsers() {
      sessionStorage.removeItem("auth");
      this.$router.go(0);
    },
    handleSelect(val) {
      this.activeIndex = val;
      this.$router.push({ name: val });
    },
  },
};
</script>
<style lang="less" scoped>
.content {
  margin: 10px;
  height: 100%;
  .tab {
    height: 80vh;
    overflow: auto;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.el-aside {
  background-color: #ffffff;
  height: 100%; overflow: auto
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
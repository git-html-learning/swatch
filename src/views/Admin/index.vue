<template>
  <div class="content">
            <div
      id="background"
      style="position: absolute; z-index: -1; width:100%; height:100%; top:0px; left:0px;   background-color: rgba(227, 241, 247,0.3)"
    >
      <!-- <img src="./主页背景.png" width="100%" height="100%" /> -->
    </div>
    <el-card :body-style="{ padding: '10px', height: '100%' }" class = "box">
      <div slot="header">
        <el-row type="flex" justify="">
          <el-col :span="23"> <span>个人信息与更新</span></el-col>
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

   <user />
          

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
  height: 90%;
  .box {
                               z-index:50;
          background-color: rgba(255,255,255,.1);
            background-size: 100% 100%;
            backdrop-filter: blur(15px);
             box-shadow: 2px 2px 10px  rgba(93, 93, 93,0.5);
            border-radius: 15px;
  }
  .tab {
    height: 80vh;
    overflow: auto;
    margin-top: 30px;
margin-left: 23%;
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
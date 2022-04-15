<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <breadcrumb class="breadcrumb-container" />
    <div>
      <el-row type="flex" justify="space-around ">
        <el-col :span="17">
          <el-row type="flex" justify="space-around">
            <el-col :span="22"></el-col>
          </el-row>
        </el-col>
        <el-col :span="7">
          <el-row
            :gutter="13"
            type="flex"
            align="middle"
            justify="end"
            style="line-height: 20px;margin-top: 15px;"
          >
            <el-col :span="2" :offset="10">
              <el-badge :value="message" :max="99" class="item">
                <router-link to="/device/alertData">
                  <svg-icon icon-class="消息" />
                </router-link>
              </el-badge>
            </el-col>
            <el-col :span="8" class="row" style="cursor: pointer;">
              <el-dropdown trigger="hover">
                <!-- <svg-icon icon-class="用户" style="font-size: 15px" /> -->
                <i class = "el-icon-user"></i>
                {{ name }}
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="userCenter">
                    <span class="el-icon-user">个人中心</span>
                  </el-dropdown-item>
                  <el-dropdown-item @click.native="logout">
                    <span style="color: red" class="el-icon-switch-button">注销</span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
            <el-col :span="2">
              <img src="@/assets/img/警报1.png" alt="警报1" @click="openBell" />
            </el-col>
            <el-col :span="3">
              <img src="@/assets/img/sos1.png" alt="sos1" @click="openSos" />
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import { getName } from "@/utils/auth";
import { UnReadAlertNums, UserAllalert } from "@/api/index";
export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      message: 0,
      ring: [false, false]
    };
  },
  computed: {
    ...mapGetters(["sidebar", "avatar"]),
    name() {
      return getName("name");
    }
  },
  mounted() {
    this.alertMsg();
  },
  watch: {
    ring(r) {
      console.log(r);
      this.$emit("handleRing", r);
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
    userCenter() {
      this.$router.push({ path: "/user/index" });
    },
    alertMsg() {
      UnReadAlertNums().then(res => {
        this.message = res.data;
        var payload = {
          asc: 0,
          pageIndex: 1,
          pageSize: 1
        };
        console.log(payload)
        UserAllalert(payload).then(res => {
          console.log(res)
          var total = res.data.total;
          window.sessionStorage.setItem("alertNum", total);
          payload = {
            asc: 0,
            pageIndex: 1,
            pageSize: total
          };
          console.log(payload)
          UserAllalert(payload).then(res => {
            console.log(res)
            var alertInfo = res.data.alertInfo;
            console.log(alertInfo)
            //统计不同主题的设备数量
            // 目前定为： 低电量 num1
            // 关机 num2
            // 摘掉设备 num3
            // 震动报警 num4
            // 表带破坏 num5
            var alert1 = [];
            var alert2 = [];
            var alert3 = [];
            var alert4 = [];
            var alert5 = [];
            var num1 = 0;
            var num2 = 0;
            var num3 = 0;
            var num4 = 0;
            var num5 = 0;
            for (var i = 0; i < alertInfo.length; i++) {
              if (alertInfo[i].subject == "低电量") {
                alert1.push(alertInfo[i]);
              }
              if (alertInfo[i].subject == "关机") {
                alert2.push(alertInfo[i]);
              }
              if (alertInfo[i].subject == "摘掉设备") {
                alert3.push(alertInfo[i]);
              }
              if (alertInfo[i].subject == "震动报警") {
                alert4.push(alertInfo[i]);
              }
              if (alertInfo[i].subject == "表带破坏") {
                alert5.push(alertInfo[i]);
              }
            }
            if (alert1 == []) {
              num1 = 0;
            } else {
              num1 = alert1.length;
            }
            if (alert2 == []) {
              num2 = 0;
            } else {
              num2 = alert2.length;
            }
            if (alert3 == []) {
              num3 = 0;
            } else {
              num3 = alert3.length;
            }
            if (alert4 == []) {
              num4 = 0;
            } else {
              num4 = alert4.length;
            }
            if (alert5 == []) {
              num5 = 0;
            } else {
              num5 = alert5.length;
            }
            window.sessionStorage.setItem("num1", num1);
            window.sessionStorage.setItem("num2", num2);
            window.sessionStorage.setItem("num3", num3);
            window.sessionStorage.setItem("num4", num4);
            window.sessionStorage.setItem("num5", num5);
          });
        });
      });
    },
    openBell() {
      this.ring.splice(0, 1, !this.ring[0]);
      this.ring.splice(1, 1, false);
      console.log(this.ring);
    },
    openSos() {
      this.ring.splice(1, 1, !this.ring[1]);
      this.ring.splice(0, 1, false);
      console.log(this.ring);
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .row {
    text-align: right;
    color: #97a8be;
    font-size: 12px;
  }

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>

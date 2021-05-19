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
          <el-row :gutter="13" type="flex" align="middle" justify="end">
            <el-col :span="2" :offset="6">
              <el-badge :value="massage" :max="99" class="item">
                <router-link to="/device/alertData">
                  <svg-icon icon-class="消息" style="font-size: 18px"
                /></router-link>
              </el-badge>
            </el-col>
            <el-col :span="8" class="row">
              <svg-icon icon-class="用户" style="font-size: 15px" />
              {{ name }}
            </el-col>
            <el-col :span="7" :offset="1">
              <el-dropdown trigger="hover">
                <div>
                  <svg-icon style="font-size: 60px" icon-class="gen(1)" />
                </div>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="logout">
                    <span style="color: red" class="el-icon-switch-button"
                      >注销</span
                    >
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
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
import { UnReadAlertNums } from "@/api/index";
export default {
  components: {
    Breadcrumb,
    Hamburger,
  },
  data() {
    return {
      massage: 0,
    };
  },
  computed: {
    ...mapGetters(["sidebar", "avatar"]),
    name() {
      return getName("name");
    },
  },
  mounted() {
    this.alertMsg();
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
    alertMsg() {
      UnReadAlertNums().then((res) => {
        this.massage = res.data;
      });
    },
  },
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

<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <!-- 代表侧边栏 -->
    <div class="main-container">
      <!-- 页面的主要内容区域-->
      <div :class="{'fixed-header':fixedHeader}">
        <navbar  @handleRing = "handleRing" />
        <!-- 表示右上方的 navbar,  面包屑的功能也在这个组件内  -->
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from "./components";
import ResizeMixin from "./mixin/ResizeHandler";

export default {
  name: "Layout",
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
    data() {
return {
  ring: [false,false],
}
    },
 watch: {
 ring() {
   if (this.ring[0] == true) {
  this.btnClick0();
   }
   else if (this.ring[1] == true) {
  this.btnClick1();
   }
 }
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
      //是否展示左侧sidebar，通过cookie获得
    },
  
    device() {
      return this.$store.state.app.device;
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile"
      };
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch("app/closeSideBar", { withoutAnimation: false });
    },
    handleRing(r) {
      this.ring = r;
      console.log(this.ring)
    },
        btnClick0() {
      this.$popup({
        btnText: '确定',
        click: () => {
          // 点击按钮事件
          //   this.$router.push('……')
          console.log("点击按钮了！")
        },
      })
    },
       btnClick1() {
      this.$alarm({
        btnText: '确定',
        click: () => {
          // 点击按钮事件
          //   this.$router.push('……')
          console.log("点击按钮了！")
        },
      })
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>

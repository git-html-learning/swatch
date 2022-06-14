<template>
  <div class="layout">
    <div style = "padding-top: 50px;  ">
<svg style = "float: right; margin-right: 200px; " @click = "logout"  t="1655173250592" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5849" width="50" height="50"><path d="M980.522459 379.849054C933.428449 222.83239 809.469502 99.652683 650.314927 53.038205v332.705093c0 76.065717-61.979473 137.395824-138.824429 137.395824-76.854946 0-138.824429-61.340098-138.82443-137.395824V53.527727C113.838829 129.103922-33.916878 398.500839 42.438556 654.650693c76.355434 256.149854 348.55961 402.387044 607.866381 326.810848 259.316761-75.566205 406.582946-345.452644 330.217522-601.612487z" p-id="5850" fill="#d4237a"></path><path d="M511.480507 434.815376c38.182712 0 69.412215-30.909815 69.412215-68.702908V90.331785c0-37.783102-31.239493-68.702907-69.412215-68.702907C473.307785 21.638868 442.068293 52.548683 442.068293 90.331785v275.780683c0 37.783102 31.239493 68.702907 69.412214 68.702908z" p-id="5851" fill="#d4237a"></path></svg>
    </div>
    <div class="loading-img">
      <img class="jzxz1" src="@/assets/img/jzxz1.png" />
      <img class="jzxz2" src="@/assets/img/jzxz2.png" />
    </div>
  </div>
</template>
<script>
export default {
  name:"loading",
  created() {

  },
  methods: {
     async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
  }
}
</script>
<style lang="scss" scoped>
.layout {
  padding: 20%;
}
.loading-img {
  position: relative;;
  left: calc(50% - 182px);
  top: calc(50% - 182px);
  z-index: 2
}
.loading-img .jzxz1,
.jzxz2 {
  position: absolute;
  left: 0;
  top: 0;
}
.loading-img .jzxz1 {
  animation: xz1 8s infinite linear;
}
@keyframes xz1 {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.load_img .jzxz2 {
  animation: xz2 7s infinite linear;
}
@keyframes xz2 {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(-180deg);
  }
  to {
    transform: rotate(-360deg);
  }
}
</style>
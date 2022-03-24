<template>
<!-- sos组件 -->
<!-- 实现动画效果 -->
  <transition-group name='fade'>
    <!-- 蒙版 -->
    <div class="mask"
         key="1"

         v-if="show"
         @touchmove.prevent>
         <!-- 禁止页面滚动 -->

    </div>
    <div class="pop"
         v-show="show"
         key="2">
      <!-- <h1>{{title}}</h1>
      <p>{{content}}</p> -->
     <audio
		          ref="audio"
		          src="@/assets/audio/报警.mp3"
              loop
		        ></audio>
      <img src="@/assets/img/sos.png" alt=""> <br>
      <button @click="btnClick">{{btnText}}</button>

    </div>

  </transition-group>

</template>
<script>
export default {
  name: 'Popup',
  data() {
    return {
      show: false,
      isPlay: true,
    //   imgUrl: '',
    //   title: '',
    //   content: '',
      btnText: '',
    }
  },
  watch:{

  },
  created() {
       this.$nextTick(function() {
      this.play();
    });
  },
  methods: {
    btnClick() {
      this.click()
      this.show = false;
       this.$refs.audio.pause();
   this.isPlay = false
    },
   play() {
           this.$refs.audio.play() // 这里使用了audio的原生开始播放事件,同样不加on, 并使用ref获取dom
	      this.isPlay = true
   }
  },
}
</script>
<style  scoped>

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s;
}

.mask {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  z-index: 998;
  width: 100%;
  height: 100%;
}

.pop {
    margin-top: 200px;
  height: 200px;
  width: 60%;
  background: rgba(0,0,0,0);
  border-radius: 8px;
  position: fixed;
  top: 100px;
  left: 67%;
  margin-left: -40%;
  z-index: 999;
  text-align: center;
}
  button {
      margin-top: 20px;
    background: #f95644;
    border-radius: 10px;
    width: 80px;
    height: 50px;
    font-size: 18px;
    color: #ffffff;
  }
  .close {
    top: 0;
    right: 10px;
    position: absolute;
    display: block;
    width: 40px;
    height: 40px;
  }
</style>
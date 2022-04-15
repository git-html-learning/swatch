<template>
<!-- 报警组件 -->
<!-- 实现动画效果 -->
  <transition-group name='fade'>

    <div class="pop"
         v-show="show"
         key="1">
      <h1 style = "margin-top: 30px; color: red">{{title}}</h1>
      <p style = "color:#e65141">{{content}}</p>
     <audio
		          ref="audio"
		          src="@/assets/audio/报警.mp3"
              loop
		        ></audio>
      <!-- <img src="@/assets/img/sos.png" alt=""> <br> -->
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
      title: '警报',
      content: '具体报警信息',
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

.pop {
    /* position: absolute; */
  height: 200px;
  width: 400px;
  background: rgba(210, 206, 206, 0.5);
  border-radius: 8px;
  position: fixed;
  bottom: 100px;
  right: 100px;
  z-index: 998;
  text-align: center;
  color: #fff;
}
  button {
      margin-top: 20px;
    border-radius: 10px;
    background-color: rgb(226, 219, 219);
    width: 80px;
    height: 30px;
    font-size: 18px;
    color: rgb(0,0,0)
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
import Vue from 'vue'
import alarm from './index.vue'

const alarmBox = Vue.extend(alarm)

alarm.install = function (data) {
  let instance = new alarmBox({
    data
  }).$mount()

  document.body.appendChild(instance.$el)

  Vue.nextTick(() => {
    instance.show = true
    // show 和弹窗组件里的show对应，用于控制显隐
  })
}

export default alarm
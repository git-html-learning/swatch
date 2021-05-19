<template>
  <div class="content">
    <el-card :body-style="{ padding: '0px', height: '70vh' }">
      <el-row slot="header">
        <el-col :span="12">
          <!-- 独占12个栅栏 -->
          <div class="text">
            <a>报警趋势图</a>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="text">
            <el-row type="flex" justify="center">
              <!-- 让所有弹性盒模型对象的子元素都有相同的长度，且忽略它们内部的内容 -->
              <el-col :span="6">
                <!-- 占5份的1/4份栅栏 -->
                <a @click="selectDay('今日')">今日</a>
              </el-col>
              <el-col :span="6">
                <a @click="selectDay('本周')"> 本周</a>
              </el-col>
              <el-col :span="6">
                <a @click="selectDay('本月')">本月</a>
              </el-col>
              <el-col :span="6">
                <a @click="selectDay('今年')">今年</a>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="history">
            <!-- 日期选择时间器 -->
            <el-date-picker
              v-model="value"
              
              type="datetimerange"
              align="right"
              size="mini"
              @change="selectTime"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00', '08:00:00']"
            ></el-date-picker>
            <!-- datetimerange：日期控件 -->
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="16">
          <linedata :date="date" />
        </el-col>
        <el-col :span="8">
          <listdata :date="date" />
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import linedata from "./line";
import listdata from "./list";
export default {
  components: {
    linedata,
    listdata,
  },
  data() {
    return {
      activeName: "second",
      //初始时间是：从现在开始往前推迟1天，new Date().getTime()是当前时间
      value: [
        parseInt(new Date().getTime() - 86400000),
        parseInt(new Date().getTime()),
      ],

      selectdate: {},
      date: "",
    };
  },
  methods: {
    selectTime() {
      this.selectdate["start"] = new Date(this.value[0]).getTime();
      
      this.selectdate["end"] = new Date(this.value[1]).getTime();
      this.date = JSON.stringify(this.selectdate);
    },
    selectDay(val) {
      this.date = val;
    },
  },
};
</script>

<style lang="less" scoped>
// scoped 属性，它的 CSS 只作用于当前组件中的元素
.content {
  a {
    color: rgba(0, 0, 0, 0.45);
    padding: 10px;
    font-size: 15px;
  }
  .text {
    transform: translateY(5px);
    // 垂直向下移动5px
  }
}
//>=768的设备，响应式布局
@media (max-width: 768px) {
  .content {
    a {
      color: rgba(0, 0, 0, 0.45);
      padding: 10px;
      font-size: 12px;
    }
    .text {
      font-size: 12px;
      transform: translateY(5px);
    }
  }
}
//使用 scoped 后，父组件的样式将不会渗透到子组件中。
//使用深度作用选择器 /deep/ 或者'>>>' ,但注意像sass、less预处理器不认三个箭头

/deep/ .el-card__header {
  padding: 10px 5px;
}
</style>

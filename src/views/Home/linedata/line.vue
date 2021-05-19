<template>
  <div
    v-loading="loading"
    :element-loading-text="loadingText"
    ref="alertChart"
    style="width: 60vw; height: 70vh"
  ></div>
  <!-- 在一个表格数据加载时，因为需要连接其它东西，所以后台接口返回数据需要较长时间，因此添加局部Loading效果，增加用户体验度 -->
</template>





<script>
import { AlertTime } from "@/api/index";
export default {
  data() {
    return {
      loading: true,
      loadingText: "数据加载中",
      barData: [],
      time: {
        start: parseInt(new Date().getTime() - 86400000),
        end: parseInt(new Date().getTime()),
      },
      payload: {
        start: parseInt(new Date().getTime() - 86400000),
        end: parseInt(new Date().getTime()),
        interval: "hour",
      },
    };
  },
  watch: {
    date: {
      handler(val) {
        if (val == "今日") {
          (this.payload.start = parseInt(new Date().getTime() - 86400000)),
            (this.payload.end = parseInt(new Date().getTime())),
            (this.payload.interval = "hour");
          this.requireData();
        } else if (val == "本周") {
          (this.payload.start = parseInt(new Date().getTime() - 86400000 * 7)),
            (this.payload.end = parseInt(new Date().getTime())),
            (this.payload.interval = "day");
          this.requireData();
        } else if (val == "本月") {
          (this.payload.start = parseInt(new Date().getTime() - 86400000 * 30)),
            (this.payload.end = parseInt(new Date().getTime())),
            (this.payload.interval = "day");
          this.requireData();
        } else if (val == "今年") {
          (this.payload.start = parseInt(
            new Date().getTime() - 86400000 * 365
          )),
            (this.payload.end = parseInt(new Date().getTime())),
            (this.payload.interval = "day");
          this.requireData();
        } else {
          this.payload = JSON.parse(val);
          this.requireData();
        }
      },
    },
  },
  mounted() {
    this.requireData();
  },
  methods: {
    requireData() {
      AlertTime(this.payload)
        .then((res) => {
          if (res.code != 200) {
            this.loadingText = "报警信息为空";
            this.date = "本周";
            this.loading = false;
            return;
          } else {
            this.barData = res.data.distribution;
            this.historyalert();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    historyalert() {
      const alertChart = this.$echarts.init(this.$refs.alertChart);

      var xdata = [];
      var ydata = [];

      this.barData.map((val) => {
        xdata.push(val.time);
        ydata.push(val.count);
      });
      var option = {
        color: ["#58AFFF"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: xdata,
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "报警信息",
            type: "bar",
            barWidth: "40%",
            data: ydata,
          },
        ],
      };
      alertChart.setOption(option);
      this.loading = false;
    },
  },
  props: ["date"],
};
</script>

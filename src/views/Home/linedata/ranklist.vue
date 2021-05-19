<template>
  <div class="content" v-loading="loading" element-loading-text="数据加载中">
    <el-row type="flex" justify="space-between" align="center">
      <el-col :span="18">
        <h4 class="title">{{ title == "" ? "今日" : title }}报警</h4>
      </el-col>
      <el-col :span="4">
        <router-link to="/device/alertData">
          <span style="font-size: 3px; color: #58afff">详情</span>
        </router-link>
      </el-col>
    </el-row>
    <div class="rank">
      <ul class="list">
        <li :key="index" v-for="(item, index) in alertnums">
          <span :class="index < 3 ? 'active' : null">{{ index + 1 }}</span>
          <span>{{ item.deviceName }}</span>
          <span>{{ item.count }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { alertNums, SortAlertNums } from "@/api/index";
export default {
  name: "RankList",
  data() {
    return {
      loading: true,
      alertnums: [],
      time: {
        start: parseInt(new Date().getTime() - 86400000),
        end: parseInt(new Date().getTime()),
      },
    };
  },
  computed: {
    title() {
      if (this.date.length > 5) {
        return "其他";
      
      } else {
        return this.date;
      }
    },
  },
  watch: {
    date: {
      handler(val) {
   
        if (val == "今日") {
          this.time = {
            start: parseInt(new Date().getTime() - 86400000),
            end: parseInt(new Date().getTime()),
          };
          this.alertnum();
        } else if (val == "本周") {
          this.time = {
            start: parseInt(new Date().getTime() - 86400000 * 7),
            end: parseInt(new Date().getTime()),
          };
          this.alertnum();
        } else if (val == "本月") {
          this.time = {
            start: parseInt(new Date().getTime() - 86400000 * 30),
            end: parseInt(new Date().getTime()),
          };
          this.alertnum();
        } else if (val == "今年") {
          this.time = {
            start: parseInt(new Date().getTime() - 86400000 * 365),
            end: parseInt(new Date().getTime()),
          };
          this.alertnum();
        } else {
          this.time = JSON.parse(val);
          this.alertnum();
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.alertnum();
  },
  methods: {
    alertnum() {
      var _this = this;
      SortAlertNums(this.time).then((res) => {
        if (res.code == 200) {
          this.alertnums = res.data.counts;
          this.deviceName=res.data.deviceName;


         console.log(this.alertnums)


        } else {
          this.alertnums = [
            {
              count: 0,
              deviceKey: "",
              deviceName: "报警数",

            },
          ];
        }
        _this.loading = false;
      });
    },
  },
  props: ["date", "selectdate"],
};
</script>

<style lang="scss" scoped>
.content {
  .title {
    color: rgba(0, 0, 0, 0.45);
    font-size: 15px;
    margin: 0;
  }
  margin: 15px;
  overflow: hidden;
  width: 101%;
  margin-right: 100px;
  .rank {
    padding: 0px 0px 0px;
    height: 60vh;
    overflow: auto;
    padding: 5px 100px 0 0px;
    text-overflow: ellipsis;
    .list {
      margin: 25px 0 0;
      padding: 0;
      list-style: none;

      li {
        margin-top: 16px;

        span {
          color: #666;
          font-size: 12px;
          line-height: 22px;

          &:first-child {
            background-color: #f5f5f5;
            border-radius: 20px;
            display: inline-block;
            font-size: 12px;
            font-weight: 600;
            margin-right: 24px;
            height: 20px;
            line-height: 20px;
            width: 20px;
            text-align: center;
          }
          &.active {
            background-color: #314659;
            color: #fff;
          }
          &:last-child {
            float: right;
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .content {
  .title {
    color: rgba(0, 0, 0, 0.45);
    font-size: 12px;
    margin: 0;
  }
  // margin: 5px;
  // overflow: hidden;
  // width: 101%;
  // margin-right: 0px;
  .rank {
    padding: 0px 0px 0px;
    height: 60vh;
    // overflow: auto;
    // padding: 5px 100px 0 0px;
    // text-overflow: ellipsis;
    .list {
      // margin: 25px 0 0;
      padding: 0;
      list-style: none;

      li {
        margin-top: 16px;

        span {
          color: #666;
          font-size: 12px;
          line-height: 22px;

          &:first-child {
            background-color: #f5f5f5;
            border-radius: 20px;
            display: inline-block;
            font-size: 12px;
            font-weight: 600;
            // margin-right: 24px;
            height: 20px;
            line-height: 20px;
            width: 20px;
            text-align: center;
          }
          &.active {
            background-color: #314659;
            color: #fff;
          }
          &:last-child {
            float: right;
          }
        }
      }
    }
  }
}

}
</style>

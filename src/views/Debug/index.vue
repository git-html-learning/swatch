<template>
  <div class="key">
    <div class="input">
      <el-autocomplete
        placeholder="Enter request URL"
        v-model="url"
        class="input-with-select"
        :fetch-suggestions="querySearch"
        clearable
      >
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option
            v-for="(item, index) in options"
            :label="item"
            :key="index"
            :value="item"
          ></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-s-promotion" @click="debug"
          >Send</el-button
        >
      </el-autocomplete>
    </div>
    <div class="tabs">
      <el-tabs type="border-card">
        <el-tab-pane label="Params">
          <el-table :data="params" border style="width: 100%">
            <el-table-column min-width="100px" label="Key">
              <template slot-scope="{ row }">
                <span v-if="row.key && !row.edit">{{ row.key }}</span>
                <template v-else-if="row.key">
                  <el-input
                    v-model="row.key"
                    placeholder="key"
                    class="edit-input"
                    size="small"
                  />
                </template>
                <template v-else>
                  <el-input
                    v-model="inuptvalue.key"
                    placeholder="key"
                    class="edit-input"
                    size="small"
                  />
                </template>
              </template>
            </el-table-column>
            <el-table-column min-width="100px" label="Value">
              <template slot-scope="{ row }">
                <span v-if="row.value && !row.edit">{{ row.value }}</span>
                <template v-else-if="row.value">
                  <el-input
                    v-model="row.value"
                    placeholder="value"
                    class="edit-input"
                    size="small"
                  />
                </template>
                <template v-else>
                  <el-input
                    v-model="inuptvalue.value"
                    placeholder="value"
                    class="edit-input"
                    size="small"
                  />
                </template>
              </template>
            </el-table-column>
            <el-table-column align="center" label="Actions" width="120">
              <template slot-scope="{ row }">
                <template v-if="row.key == ''">
                  <div>
                    <el-button
                      type="primary"
                      plain
                      size="small"
                      icon="el-icon-finished"
                      @click="submit"
                      >提交</el-button
                    >
                  </div>
                </template>
                <template v-else>
                  <div>
                    <el-button
                      v-if="row.edit"
                      type="success"
                      size="small"
                      plain
                      icon="el-icon-finished"
                      @click="conform(row)"
                      >提交</el-button
                    >
                    <el-button
                      v-else
                      type="primary"
                      plain
                      size="small"
                      icon="el-icon-edit"
                      @click="row.edit = !row.edit"
                      >修改</el-button
                    >
                  </div>
                </template>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="Body">
          <el-input
            type="textarea"
            clearable
            placeholder="输入内容必须符合json格式"
            :autosize="{ minRows: 5 }"
            v-model="body"
          ></el-input>
        </el-tab-pane>
        <el-tab-pane label="Headers">
          <el-input
            type="textarea"
            disabled
            placeholder="请求头已经包含Token"
            :autosize="{ minRows: 5 }"
            v-model="headers"
          ></el-input>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="res">
      <el-tabs type="border-card">
        <el-tab-pane label="Body">
          <json-view :deep="4" :data="result" />
        </el-tab-pane>
        <el-tab-pane label="PreviewData">
          <el-radio-group v-model="radio" @change="selectradio">
            <!-- <el-radio :label="0" border>选择预览</el-radio> -->
            <el-radio :label="1" border>产品列表</el-radio>
            <el-radio :label="2" border>设备列表</el-radio>
            <el-radio :label="3" border>设备数据</el-radio>
            <json-view :deep="4" :data="result1" />
          </el-radio-group>
        </el-tab-pane>
        <el-tab-pane label="API">
          <api-data />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>





<script>
import request from "@/utils/request";
import jsonView from "vue-json-views";
import { config } from "@vue/test-utils";
import apiData from "./API.vue";
export default {
  components: {
    jsonView,
    apiData,
  },
  data() {
    return {
      radio: 1,
      url: "",
      select: "GET",
      body: null,
      headers: "",
      options: {
        1: "GET",
        2: "POST",
        3: "PUT",
        4: "PATCH",
        5: "DELETE",
      },
      inuptvalue: {
        value: "",
        key: "",
        edit: false,
      },
      params: [
        {
          value: "",
          key: "",
          edit: false,
        },
      ],
      param: {},
      result: { data: "点击调试" },
      result1: { data: "返回主页获取数据" },
    };
  },
  mounted() {
    this.selectradio();
  },
  methods: {
    selectradio(val) {
      this.result1 = this.$store.state.other.productNums;
      if (val === 1) {
        this.result1 = this.$store.state.other.productNums;
      } else if (val === 2) {
        this.result1 = this.$store.state.other.deviceNums;
      } else {
        this.$store.dispatch("deviceNewDatas").then((res) => {
          this.result1 = res;
        });
        // this.result = this.$store.state.other.deviceDetail;
      }
    },
    //输入提示。提示信息是使用cb返回的
    querySearch(queryString, cb) {
      var history = JSON.parse(localStorage.getItem("historyInput"));
      if (history == null) {
        cb(null);
      } else {
        cb(history);
      }
    },
    submit() {
      //为了深拷贝先改变数据指针
      var obj = {
        value: this.inuptvalue.value,
        key: this.inuptvalue.key,
        edit: false,
      };
      //请求携带的参数
      this.param[obj.key] = obj.value;
      //显示的 表格
      this.params.unshift(obj);
      this.inuptvalue = {
        value: "",
        key: "",
        edit: false,
      };
    },
    conform(row) {
      //修改数据
      row.edit = !row.edit;
      this.param[row.key] = row.value;
    },
    findList(val, val1) {
      //查找历史记录是否重复
      return val.findIndex((res) => {
        return JSON.stringify(res) === JSON.stringify(val1);
      });
    },
    debug() {
      var input = { value: this.url };
      var inputList = [];
      //先拿到历史记录，显示历史记录
      var list = JSON.parse(localStorage.getItem("historyInput"));
      //判断是否存在
      if (list == null) {
        //如果为空就需要重新创建一个新的数组赋值
        inputList.unshift(input);
        localStorage.setItem("historyInput", JSON.stringify(inputList));
      } else if (this.findList(list, input) == -1) {
        //如果历史记录没有输入的的值，就会插入到历史记录中
        if (list.length > 5) {
          list.splice(-1, 1);
        }
        list.unshift(input);
        localStorage.setItem("historyInput", JSON.stringify(list));
      }
      var _this = this;
      //调试请求接口
      try { //这个是怕json.Parse转换出错
        request({
          url: this.url,
          method: this.select,
          data: JSON.parse(this.body)||this.body,
          params: this.param,
        })
          .then((res) => {
            this.result = res;
            this.$message({
              message: "请求成功",
              type: "success",
            });
          })
          .catch(function (error) {
            this.$message.error("请求错误，请查看控制台");
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              _this.result = error.response;
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              _this.result = error.request;
            } else {
              // Something happened in setting up the request that triggered an Error
              _this.result = error.message;
            }
          });
      } catch (error) {
        this.$message.error(`请求错误，${error}`);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.key {
  padding: 10px;
  /deep/ .el-select .el-input {
    width: 100px;
  }
  .input-with-select {
    width: 100%;
  }
  .input {
    margin: 10px;
  }
  .tabs {
    margin: 10px;
  }
  .res {
    border: 1px solid #dcdfe6;
    color: #606266;
    margin: 10px;
    padding: 10px;
    min-height: 60vh;
    border-radius: 2px;
    box-shadow: 0 5px 8px #dcdfe6;
  }
}
</style>
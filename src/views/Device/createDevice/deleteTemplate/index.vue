
<template>
  <div class="fh-div">
    <el-card :body-style="{ padding: '20px',heigth:'50vh'}">
      <div slot="header">
        <span>模板添加设备</span>
      </div>
      <!-- <div class="fh"> -->
        <el-form ref="ruleForm" label-width="120px" class="demo-ruleForm">
          <el-form-item label="设备类型" prop="deviceType">
            <el-select class="Input" v-model="DeviceType" placeholder="请选择设备类型">
              <el-option
                v-for="(item, index) in templateDeviceType"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item class="formitem">
            <el-button type="primary" @click="submitForm()">删除</el-button>
            <el-button type="danger" @click="back">取消</el-button>
          </el-form-item>
        </el-form>
      <!-- </div> -->
    </el-card>
    <!-- 打开对话框输入扩展对象 -->
  </div>
</template>





<script>
// const uuid = require('uuid')
import uuid from "uuid";
import { deleteTemplate, allTemplate } from "@/api/index";
export default {
  data() {
    return {
      DeviceType: "",
      templateDeviceType: [],
    };
  },

  mounted() {
    this.requireTemplateDeviceType();
  },
  methods: {
    requireTemplateDeviceType() {
      allTemplate().then((res) => {
        res = res.data;
        res.forEach((value) => {
          this.templateDeviceType.push(value.deviceType);
        });
      });
    },
    submitForm() {
      deleteTemplate(this.DeviceType).then((res) => {
        this.$message({
          message: "模板已删除",
          type: "success",
        });
        this.$router.go(0);
      });
    },

    back() {
      this.$router.back(-1);
    },
  },
};
</script>

<style lang="less" scoped>
.fh-div {
  // .fh {
  //   display: flex;
  //   justify-content: center;

  // }
  padding: 10px;
  // width: 100%;
  // height: 80vh;
  .el-card {
    min-height: 90vh;
  }
  .el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before {
    content: "*";
    color: #f56c6c;
    margin-right: 4px;
  }
  .Input {
    width: 30vw;
  }

  @media (max-width: 768px) {
    .fh-div {
      width: 100%;
    }
    .Input {
      width: 95%;
    }
    .Input1 {
      width: 95%;
    }
    .formitem {
      padding-left: 0;
    }
    .dialog-footer {
      display: flex;
    }
    .in1 {
      flex: 1;
    }
  }
}
</style>
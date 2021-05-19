
<template>
  <div class="fh-div">
    <el-card :body-style="{ padding: '20px',heigth:'50vh'}">
      <div slot="header">
        <span>模板添加设备</span>
      </div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="产品名称" prop="productName">
          <!-- 选择产品获得productkey -->
          <el-select class="Input" v-model="productKey" placeholder="请选择产品名称">
            <el-option
              v-for="(item, index) in productList"
              :key="index"
              :label="item.productName"
              :value="item.productKey"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备名称" prop="deviceName">
          <el-input v-model="ruleForm.deviceName" clearable class="Input" placeholder="必选"></el-input>
        </el-form-item>
        <el-form-item label="设备映射名" prop="nickname">
          <el-input v-model="ruleForm.nickname" clearable class="Input" placeholder="必选"></el-input>
        </el-form-item>
        <el-form-item label="网络类型" prop="netType">
          <el-select class="Input" v-model="ruleForm.netType" placeholder="请选择网络类型">
            <el-option label="4G" value="4G"></el-option>
            <el-option label="3G" value="3G"></el-option>
            <el-option label="NBIOT" value="NBIOT"></el-option>
            <el-option label="LORA" value="LORA"></el-option>
            <el-option labWIFIel="WIFI" value="WIFI"></el-option>
            <el-option label="以太网" value="以太网"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="设备类型" prop="deviceType">
          <el-select
            class="Input"
            v-model="ruleForm.deviceType"
            @change="devicetype"
            placeholder="请选择设备类型"
          >
            <el-option
              v-for="(item, index) in templateDeviceType"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          v-for="(item, index) in extrainfoValues"
          :key="index"
          :label="item.Name"
          prop="extrainfo"
        >
          <el-input v-model="item.Value" clearable class="Input" placeholder="必选"></el-input>
        </el-form-item>
        <el-form-item class="formitem">
          <el-button type="primary" @click="submitForm('ruleForm')">创建</el-button>
          <el-button type="danger" @click="back">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 打开对话框输入扩展对象 -->
  </div>
</template>





<script>
// const uuid = require('uuid')
import uuid from "uuid";
import {
  CreateProduct,
  CreateDevice,
  deviceTemplate,
  allTemplate,
} from "@/api/index";
export default {
  data() {
    return {
      productKey: "",
      extrainfoValues: [],
      extrainfoKeys: [],
      templateDeviceType: [],
      ruleForm: {
        productKey: "",
        deviceName: ``,
        netType: ``,
        nickname: "",
        deviceType: "",
        extraInfo: {},
      },
      rules: {
        deviceName: [
          { required: true, message: "请输入您的设备名称", trigger: "blur" },
        ],
        nickname: [
          {
            required: true,
            message: "可为空，为空则系统自动生成一个唯一id",
            trigger: "blur",
          },
        ],
        extraInfo: [
          {
            required: true,
            message: "扩展信息，必须为键值对形式.也可为空，描述该产品详细信息",
            trigger: "change",
          },
        ],
        deviceType: [
          {
            required: true,
            message: "选择设备类型，获取相应模板",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    productList() {
      return JSON.parse(localStorage.getItem("productNums"));
    },
  },
  watch: {
    productKey() {
      this.ruleForm.productKey = this.productKey;
    },
  },
  mounted() {
    this.requireTemplateDeviceType();
  },
  methods: {
    //获取模板设备类型
    requireTemplateDeviceType() {
      allTemplate().then((res) => {
        res = res.data;
        res.forEach((value) => {
          this.templateDeviceType.push(value.deviceType);
        });

      });
    },
    devicetype(val) {
      deviceTemplate(val).then((res) => {
        res = res.data.extraInfo;
        this.extrainfoValues = Object.values(res);
        this.extrainfoKeys = Object.keys(res);
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid || this.ruleForm.nickname == "") {
          //把获得信息统一存到所需要的信息里面
          for (let index = 0; index < this.extrainfoKeys.length; index++) {
            this.ruleForm.extraInfo[
              this.extrainfoKeys[index]
            ] = this.extrainfoValues[index];
          }
          CreateDevice(this.ruleForm)
            .then((res) => {
              if (res.code == 200) {
                this.$message({
                  showClose: true,
                  message: "新设备创建成功！",
                  type: "success",
                });
                this.$router.push("/devices/index");
              } else {
                this.$message({
                  showClose: true,
                  message: "提示:" + res.msg,
                  type: "error",
                });
              }
            })
            .catch((error) => console.log(error));
        } else {
          this.$message({
            showClose: true,
            message: "请输入产品名！",
            type: "warning",
          });
          return false;
        }
      });
    },
    back() {
      this.$router.push("/devices/index");
    },
  },
};
</script>

<style lang="less" scoped>
.fh-div {
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
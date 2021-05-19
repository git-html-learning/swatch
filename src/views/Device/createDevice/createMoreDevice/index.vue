<template>
  <div class="fh-div">
    <el-card :body-style="{ padding: '20px',heigth:'50vh'}">
      <div slot="header">
        <span>批量添加设备</span>
      </div>
      <div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
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

          <el-form-item label="设备个数" prop="deviceCount">
            <el-select class="Input" v-model="ruleForm.deviceCount" placeholder="请选择创建设备个数">
              <el-option
                v-for="(item, index) in 10"
                :key="index+1"
                :label="index+1"
                :value="index+1"
              ></el-option>
            </el-select>
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
            <el-input v-model="ruleForm.deviceType" class="Input" clearable placeholder="必选"></el-input>
          </el-form-item>
          <el-form-item class="formitem">
            <el-button class="in1" type="primary" @click="submitForm('ruleForm')">创建</el-button>
            <el-button class="in1" type="danger" @click="cancel">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>





<script>
import uuid from "uuid";
import { CreateMoreDevice } from "@/api/index";
export default {
  data() {
    return {
      productKey: "",
 
      ruleForm: {
        productKey: "",
        deviceCount: "",
        netType: ``,
        deviceType: "",
        extraInfo: {},
      },
      rules: {
   
        nickname: [
          {
            required: true,
            message: "可为空，为空则系统自动生成一个唯一id",
            trigger: "blur",
          },
        ],
    
        deviceType: [
          {
            required: true,
            message: "同类设备的标识",
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
  created() {},
  methods: {
    submitForm(formName) {
      //element表单验证
      this.$refs[formName].validate((valid) => {
        if (valid ) {
          CreateMoreDevice(this.ruleForm)
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
    cancel() {
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

<template>
  <div class="fh-div">
    <el-card :body-style="{ padding: '20px' }">
      <div slot="header">
        <span>创建设备</span>
      </div>
      <!-- card body -->
      <div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="产品名称" prop="productName">
            <!-- 选择产品获得productkey -->
            <el-select
              class="Input"
              v-model="productKey"
              placeholder="请选择产品名称"
            >
              <el-option
                v-for="(item, index) in productList"
                :key="index"
                :label="item.productName"
                :value="item.productKey"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备名称" prop="deviceName">
            <el-input
              v-model="ruleForm.deviceName"
              clearable
              class="Input"
              placeholder="必选"
            ></el-input>
          </el-form-item>
          <el-form-item label="设备映射名" prop="nickname">
            <el-input
              v-model="ruleForm.nickname"
              clearable
              class="Input"
              placeholder="必选"
            ></el-input>
          </el-form-item>
          <el-form-item label="网络类型" prop="netType">
            <el-select
              class="Input"
              v-model="ruleForm.netType"
              placeholder="请选择网络类型"
            >
              <el-option label="4G" value="4G"></el-option>
              <el-option label="3G" value="3G"></el-option>
              <el-option label="NBIOT" value="NBIOT"></el-option>
              <el-option label="LORA" value="LORA"></el-option>
              <el-option labWIFIel="WIFI" value="WIFI"></el-option>
              <el-option label="以太网" value="以太网"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备类型" prop="deviceType">
            <el-input
              v-model="ruleForm.deviceType"
              class="Input"
              clearable
              placeholder="必选"
            ></el-input>
          </el-form-item>

          <el-form-item
            v-for="(extraInfO, index) in extraInfo1"
            :label="'对象扩展' + index"
            :key="extraInfO.key"
            :prop="index + 'value'"
          >
            <el-input
              v-model="extraInfO.Key"
              class="Input1"
              clearable
              placeholder="扩展字段"
            ></el-input
            >-
            <el-input
              @focus="openDialog(index)"
              class="Input1"
              clearable
              placeholder="扩展值为对象"
            ></el-input>
            <svg-icon
              icon-class="增加"
              style="cursor: pointer"
              @click="addExtra()"
            ></svg-icon>
            <svg-icon
              style="cursor: pointer"
              icon-class="减少"
              @click="removeExtra(extraInfO)"
            ></svg-icon>
          </el-form-item>
          <el-form-item class="formitem">
            <el-button type="primary" @click="submitForm('ruleForm')"
              >创建</el-button
            >
            <el-button type="danger" @click="back">取消</el-button>
          </el-form-item>
        </el-form>
        <!-- 打开对话框输入扩展对象 -->
        <el-dialog
          title="扩展对象"
          width="600px"
          :visible.sync="dialogFormVisible"
        >
          <el-form label-width="120px">
            <el-form-item
              v-for="(item, index) in extraInfo1[extraIndex].Value"
              :key="index"
              :label="index"
              prop="deviceName"
            >
              <el-input
                v-if="index == 'Name' || index == 'Value'"
                v-model="extraInfo1[extraIndex].Value[index]"
                clearable
                placeholder="Value"
              ></el-input>
              <div v-else>
                <el-radio
                  v-model="extraInfo1[extraIndex].Value[index]"
                  border
                  size="small"
                  :label="true"
                  >true</el-radio
                >
                <el-radio
                  v-model="extraInfo1[extraIndex].Value[index]"
                  border
                  size="small"
                  :label="false"
                  >false</el-radio
                >
              </div>
            </el-form-item>
          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button type="danger" @click="dialogFormVisible = false"
              >取 消</el-button
            >
            <el-button type="primary" @click="offdialog">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>





<script>
// const uuid = require('uuid')
import uuid from "uuid";
import { CreateProduct, CreateDevice } from "@/api/index";
export default {
  data() {
    return {
      productKey: "",

      extraIndex: 0,
      extraInfo1: [
        {
          Key: "",
          Value: {
            Name: "",
            Value: "",
            adminEditable: true,
            adminVisible: true,
            userEditable: true,
            userVisible: true,
          },
        },
      ], //对象输入框

      extraInfo1Length: 0,
      dialogFormVisible: false,
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
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid || this.ruleForm.nickname == "") {
          this.extraInfo1.forEach((val) => {
            this.ruleForm.extraInfo[val.Key] = val.Value;
          });
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
                  message: "提示:" + res.data.msg,
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
    addExtra(val) {
      this.extraInfo1.push({
        Key: "",
        Value: {
          Name: "",
          Value: "",
          adminEditable: true,
          adminVisible: true,
          userEditable: true,
          userVisible: true,
        },
      });
    },

    removeExtra(item, index) {
      this.extraInfo1.splice(index, 1);
    },
    back() {
      this.$router.back(-1);
    },
    openDialog(index) {
      this.dialogFormVisible = true;
      this.extraIndex = index;
    },
    offdialog() {
      var _this = this;
      _this.dialogFormVisible = false;
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
  .Input1 {
    width: 14.5vw;
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
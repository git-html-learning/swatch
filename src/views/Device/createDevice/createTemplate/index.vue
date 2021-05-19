
<template>
  <div class="fh-div">
    <el-card :body-style="{ padding: '20px',heigth:'50vh'}">
      <div slot="header">
        <span>添加模板</span>
      </div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="设备名称" prop="deviceName">
          <el-input v-model="ruleForm.deviceName" clearable class="Input" disabled placeholder="不选"></el-input>
        </el-form-item>
        <el-form-item label="设备映射名" prop="nickname">
          <el-input v-model="ruleForm.nickname" clearable class="Input" disabled placeholder="不选"></el-input>
        </el-form-item>
        <el-form-item label="网络类型" prop="netType">
          <el-select class="Input" disabled v-model="ruleForm.netType" placeholder="不选">
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
        <el-form-item
          v-for="(extraInfO, index) in extraInfo1"
          :label="'对象扩展'+index"
          :key="extraInfO.key"
          :prop=" index + 'value'"
        >
          <el-input v-model="extraInfO.Key" class="Input1" clearable placeholder="扩展字段"></el-input>-
          <el-input @focus="openDialog(index)" class="Input1" clearable placeholder="扩展值为对象"></el-input>
          <svg-icon icon-class="增加"  style="cursor: pointer;" @click="addExtra(1)"></svg-icon>
          <svg-icon icon-class="减少"  style="cursor: pointer;" @click="removeExtra(extraInfO,index)"></svg-icon>
        </el-form-item>
        <el-form-item class="formitem">
          <el-button type="primary" @click="submitForm('ruleForm')">创建</el-button>
          <el-button type="danger" @click="back">取消</el-button>
        </el-form-item>
      </el-form>
      <!-- 打开对话框输入扩展对象 -->
      <el-dialog title="扩展对象" width="600px" :visible.sync="dialogFormVisible">
        <el-form label-width="120px">
          <el-form-item
            v-for="(item, index) in extraInfo1[extraIndex].Value"
            :key="index"
            :label="index"
            prop="deviceName"
          >
            <el-input
              v-if="index=='Name'||index=='Value'"
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
              >true</el-radio>
              <el-radio
                v-model="extraInfo1[extraIndex].Value[index]"
                border
                size="small"
                :label="false"
              >false</el-radio>
            </div>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button type="danger" @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="offdialog">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>





<script>
import { addTemplate } from "@/api/index";
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
      dialogFormVisible: false,
      ruleForm: {
        deviceName: ``,
        netType: ``,
        nickname: "",
        deviceType: "",
        extraInfo: {},
      },
      rules: {
        deviceType: [
          {
            required: true,
            message: "请输入模板的设备类型",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    productList() {
      return JSON.parse(localStorage.getItem("productList"));
    },
    //存储变量名为key，值为value的变量  
  },
  watch: {
    productKey() {
      this.ruleForm.productKey = this.productKey;
    },
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.extraInfo1.forEach((val) => {
            this.ruleForm.extraInfo[val.Key] = val.Value;
          });
          addTemplate(this.ruleForm)
            .then((res) => {
              if ((res.data.msg = "ok")) {
                this.$message({
                  showClose: true,
                  message: "添加模板成功",
                  type: "success",
                });
              }
            })
            .catch((error) => console.log(error));
        } else {
          this.$message({
            showClose: true,
            message: "请输入设备类型",
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
      this.$router.push("/devices/index");
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
    width: 15vw;
  }
  .Input2 {
    width: 20vw;
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
<template>
  <div class="fh-div">
    <el-card :body-style="{ padding: '20px' }">
      <div slot="header">
        <span>
          <!-- card title -->
          创建产品
        </span>
      </div>
      <!-- card body -->
      <div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="产品名称" prop="productName">
            <el-input
              v-model="ruleForm.productName"
              clearable
              class="Input"
              placeholder="必选"
            ></el-input>
          </el-form-item>

          <el-form-item label="协议类型" prop="protocolType">
            <el-select
              class="Input"
              v-model="ruleForm.protocolType"
              placeholder="请选择协议类型"
            >
              <el-option label="TCP" value="TCP"></el-option>
              <el-option label="MODBUS" value="MODBUS"></el-option>
              <el-option label="MQTT" value="MQTT"></el-option>
              <el-option label="HTTP" value="HTTP"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="产品类型" prop="productType">
            <el-select
              class="Input"
              v-model="ruleForm.productType"
              placeholder="请选择产品类型"
            >
              <el-option label="直接连接设备" :value="2"></el-option>
              <el-option label="连接网关设备" :value="1"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="产品标识符" prop="typeIdentify">
            <el-input
              v-model="ruleForm.typeIdentify"
              clearable
              class="Input"
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
              icon-class="减少"
              style="cursor: pointer"
              @click="removeExtra(extraInfO)"
            ></svg-icon>
          </el-form-item>
          <el-form-item label="产品描述" prop="description">
            <el-input
              type="textarea"
              clearable
              v-model="ruleForm.description"
              class="Input"
              placeholder="可选"
            ></el-input>
          </el-form-item>
          <el-form-item class="formitem">
            <el-button type="primary" @click="submitForm('ruleForm')"
              >创建</el-button
            >
            <el-button type="danger" @click="back">取消</el-button>
          </el-form-item>
        </el-form>
        <!-- 打开对话框输入扩展对象 -->
        <!-- :visible.sync="dialogFormVisible"双向绑定弹框 -->
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
import { CreateProduct } from "@/api/index";
export default {
  data() {
    return {
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
      ruleForm: {
        productName: ``,
        protocolType: ``,
        productType: "",
        extraInfo: {},
        typeIdentify: ``,
        description: ``,
      },
      rules: {
        productName: [
          { required: true, message: "请输入您的产品名称", trigger: "blur" },
        ],
        typeIdentify: [
          {
            required: true,
            message: "可以快速帮助用户识别同一种产品组合",
            trigger: "blur",
          },
        ],
      },
      dialogFormVisible: false,
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid || this.ruleForm.description == "") {
          this.extraInfo1.forEach((val) => {
            this.ruleForm.extraInfo[val.Key] = val.Value;
          });
          CreateProduct(this.ruleForm)
            .then((res) => {
              if (res.code == 200) {
                this.$message({
                  showClose: true,
                  message: "新产品创建成功",
                  type: "success",
                });
                this.$router.push("/products/index");
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
    // splice方法可删除从 index 处开始的零个或多个元素，并且用参数列表中声明的一个或多个值来替换那些被删除的元素。
    // splice（index,howmany,"haha"）,index规定添加/删除项目的位置,howmany要删除的项目数量。如果设置为 0，则不会删除项目。
    //"haha"向数组添加新的项目
    // slice(a,b)获取从a到b 的字符串
    removeExtra(item, index) {
      this.extraInfo1.splice(index, 1);
    },
    // 每个页面的左上角有一个返回按钮<，点击时的代码是this.$router.back(-1)，返回上一个路由

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

<<style lang="less" scoped>
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
.Input1 {  width: 14.5vw;}
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
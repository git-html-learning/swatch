<template>
  <div class="fh-div">
    <el-card :body-style="{ padding: '30px' }">
      <div slot="header">
        <span>创建手环</span>
      </div>
      <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
          <el-form-item prop="productName" label="手环名称">
            <el-input v-model="ruleForm.productName" clearable class="Input" placeholder="必填项"></el-input>
          </el-form-item>
          <el-form-item prop="simId" label="IMEI">
            <el-input v-model="ruleForm.simId" clearable class="Input" placeholder="请在手环上查找"></el-input>
          </el-form-item>


          <!-- <el-form-item label="协议类型" prop="protocolType">
            <el-select class="Input" v-model="ruleForm.protocolType" placeholder="请选择协议类型">
              <el-option label="TCP" value="TCP"></el-option>
              <el-option label="MODBUS" value="MODBUS"></el-option>
              <el-option label="MQTT" value="MQTT"></el-option>
              <el-option label="HTTP" value="HTTP"></el-option>
            </el-select>
          </el-form-item> -->

          <!-- <el-form-item label="产品类型" prop="productType">
            <el-select class="Input" v-model="ruleForm.productType" placeholder="请选择产品类型">
              <el-option label="直接连接设备" :value="2"></el-option>
              <el-option label="连接网关设备" :value="1"></el-option>
            </el-select>
          </el-form-item> -->
                    <el-form-item label="电子围栏选择" prop="extraInfo.fence">
            <el-select class="Input" v-model="ruleForm.extraInfo.fence" placeholder="请选择电子围栏">
                <el-option
      v-for="item in options"
      :key="item.fence.fenceName"
      :label="item.fence.fenceName"
      :value="item.fence.fenceName">
    </el-option>
            </el-select>        
                  <el-tooltip  placement="bottom" effect="light">
                    <div slot="content">电子围栏说明：<br><br>
                       电子围栏是用户自己创建,<br><br>
                       用于监控是否手环位置是否超出围栏，
                       <br><br>
                       建议提前建立电子围栏之后再创建手环。</div>
 <i class = "el-icon-warning-outline" style ="color: orange;font-size: 20px;margin-left: 10px;" ></i>
</el-tooltip>
          </el-form-item>

          <el-form-item label="产品标识符" prop="typeIdentify">
            <el-input v-model="ruleForm.typeIdentify" clearable class="Input" placeholder="必填项"></el-input>
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
            <el-button type="primary" @click="submitForm('ruleForm')">创建</el-button>
            <el-button type="danger" @click="back">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>





<script>

// 同步注册，云平台注册产品等于电信云注册设备
import { CreateProduct, cloudDevcieRegister, CreateDevice } from "@/api/index";
export default {
  data() {
    return {
      extraIndex: 0,
      ruleForm: {
        productName: "",
        protocolType: "TCP",
        productType: 2,
        extraInfo: {
          fence: "-"
        },
        typeIdentify: "",
        description: "",
        simId: ""
      },
      deviceRegister: [
        {
          deviceName: "F6",
          nickname: "",
          netType: "LWM2M",
          deviceType: "Watch",
          extraInfo: {}
        },
        {
          deviceName: "BA",
          nickname: "",
          netType: "LWM2M",
          deviceType: "Watch",
          extraInfo: {}
        },
        {
          deviceName: "C2",
          nickname: "",
          netType: "LWM2M",
          deviceType: "Watch",
          extraInfo: {}
        },
        {
          deviceName: "C5",
          nickname: "",
          netType: "LWM2M",
          deviceType: "Watch",
          extraInfo: {}
        },
        {
          deviceName: "A4",
          nickname: "",
          netType: "LWM2M",
          deviceType: "Watch",
          extraInfo: {}
        },
        {
          deviceName: "02",
          nickname: "",
          netType: "LWM2M",
          deviceType: "Watch",
          extraInfo: {}
        },
        {
          deviceName: "C0",
          nickname: "",
          netType: "LWM2M",
          deviceType: "Watch",
          extraInfo: {}
        }
      ],
      deviceKey: "",
      rules: {
        productName: [
          { required: true, message: "请输入您的产品名称", trigger: "blur" }
        ],
        // productType: [
        //   { required: true, message: "产品类型为必选项", trigger: "blur" }
        // ],
        simId: [{ required: true, message: "必填项", trigger: "blur" }],
        typeIdentify: [
          {
            required: true,
            message: "可以快速帮助用户识别同一种产品组合",
            trigger: "blur"
          }
        ],
        options: [],
      }
    };
  },
    created() {
  this.dataPrepare();
    },
  methods: {
    dataPrepare() {
 this.options = JSON.parse(window.sessionStorage.getItem("fenceList"))
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid || this.ruleForm.description == "") {
          cloudDevcieRegister(
            this.ruleForm.simId,
            this.ruleForm.productType,
            this.ruleForm.productName
          ).then(res => {
            console.log(res);
            // if (res.msg == "ok") {
              this.ruleForm.extraInfo.deviceId = res.result.deviceId;
              this.ruleForm.extraInfo.nickname =  this.ruleForm.simId;
              console.log(this.ruleForm)
              CreateProduct(this.ruleForm)
                .then(res => {
                  if (res.code == 200) {
                    this.$message({
                      showClose: true,
                      message: "新产品创建成功",
                      type: "success"
                    });
                    //在成功注册设备之后需要注册七个设备
                    //设备注册有响应的对应表
                    //     心跳包 --F6
                    //     温度 -- BA
                    //   心率血压 -- C2
                    //   睡眠质量  --C5
                    //   地理位置 --- A4
                    //  报警   -- 02；
                    //  下行反馈   --C0
                    console.log(res.data.productKey);
                    this.productKey = res.data.productKey;
                    console.log(this.deviceRegister);

                    for (var i = 0; i < this.deviceRegister.length; i++) {
                      this.deviceRegister[i].nickname =
                        this.productKey + this.deviceRegister[i].deviceName;
                      CreateDevice(
                        this.productKey,
                        this.deviceRegister[i]
                      ).then(res => {
                        console.log(res);
                      });
                    }
                    this.$router.push("/products/index");
                  } else {
                    this.$message({
                      showClose: true,
                      message: "提示:" + res.data.msg,
                      type: "error"
                    });
                  }
                })
                .catch(error => console.log(error));
            // } else {
            //   this.$message({
            //     showClose: true,
            //     message: res.msg,
            //     type: "error"
            //   });
            // }
          });
        } else {
          this.$message({
            showClose: true,
            message: "请输入产品名！",
            type: "warning"
          });
          return false;
        }
      });
    },
    // splice方法可删除从 index 处开始的零个或多个元素，并且用参数列表中声明的一个或多个值来替换那些被删除的元素。
    // splice（index,howmany,"haha"）,index规定添加/删除项目的位置,howmany要删除的项目数量。如果设置为 0，则不会删除项目。
    //"haha"向数组添加新的项目
    // slice(a,b)获取从a到b 的字符

    back() {
      this.$router.back();
    }
    // ceshi() {
    //   console.log(this.deviceRegister)
    // }
  }
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
.el-button {
  width: 200px;
  height: 50spx;
  border-raduis: 5px;
  margin: 2px 40px;
}
</style>
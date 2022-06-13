<template>
  <div class="fh-div">
    <el-card :body-style="{ padding: '30px' }">
      <div slot="header">
        <span>新用户注册</span>
      </div>
      <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
          <el-row type="flex" justify>
            <el-col :span="12">
              <el-form-item prop="productName" label="用户名">
                <el-input v-model="ruleForm.productName" clearable class="Input" placeholder="必填项"></el-input>
              </el-form-item>
              <el-form-item
                prop="typeIdentify"
                label="标识符"
                :rules="[
          {
            required: true,
            message: 'simid必填',
            trigger: 'blur',
          },
        ]"
              >
                <el-input v-model="ruleForm.typeIdentify" clearable class="Input" placeholder="必填项"></el-input>
              </el-form-item>
              <el-form-item
                prop="extraInfo.simId"
                label="IMEI"
                :rules="[
          {
         
            required: true,
            message: 'simid必填',
            trigger: 'blur',
          },      
          {
                pattern: /^\d{15}$/,
            required: true,
            message: '格式不对',
            trigger: 'blur',
          }
        ]"
              >
                <el-input
                  v-model="ruleForm.extraInfo.simId"
                  clearable
                  class="Input"
                  placeholder="请在手环上查找"
                ></el-input>
              </el-form-item>
              <el-form-item
                prop="extraInfo.age"
                label="年龄"
                :rules="[
          {
            required: true,
            message: '必填项',
            trigger: 'blur',
          },
        ]"
              >
                <el-input
                  v-model="ruleForm.extraInfo.age"
                  clearable
                  class="Input"
                  placeholder="必填项"
                ></el-input>
              </el-form-item>
              <el-form-item
                prop="extraInfo.gender"
                label="性别"
                :rules="[
          {
            required: true,
            message: '必填项',
            trigger: 'blur',
          },
        ]"
              >
                <!-- <el-input
                  v-model="ruleForm.extraInfo.gender"
                  clearable
                  class="Input"
                  placeholder="必填项"
                ></el-input>-->
                <el-select v-model="ruleForm.extraInfo.gender" class="select" placeholder="请选择">
                  <el-option label="男" value="male"></el-option>
                  <el-option label="女" value="female"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                prop="extraInfo.idNumber"
                label="身份证号 "
                :rules="[
          {
            required: true,
            message: '必填项',
            trigger: 'blur',
          },
                    {
                pattern: /^((\d{18})|([0-9x]{18})|([0-9X]{18}))$/,
            required: true,
            message: '格式不对',
            trigger: 'blur',
          }
        ]"
              >
                <el-input
                  v-model="ruleForm.extraInfo.idNumber"
                  clearable
                  class="Input"
                  placeholder="必填项"
                ></el-input>
              </el-form-item>
              <el-form-item
                prop="extraInfo.phone"
                label="联系方式 "
                :rules="[
          {
            required: true,
            message: '必填项',
            trigger: 'blur',
          },
             {
                pattern: /^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/,
            required: true,
            message: '格式不对',
            trigger: 'blur',
          }
        ]"
              >
                <el-input
                  v-model="ruleForm.extraInfo.phone"
                  clearable
                  class="Input"
                  placeholder="必填项"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-row :gutter="10">
                <el-col :span="8">
                  <el-form-item
                    prop="extraInfo.connect1.user"
                    label="紧急联系人1 "
                    :rules="[
          {
            required: true,
            message: '必填项',
            trigger: 'blur',
          },
        ]"
                  >
                    <el-input
                      v-model="ruleForm.extraInfo.connect1.user"
                      clearable
                      class="Input1"
                      placeholder="联系人"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item
                    prop="extraInfo.connect1.phone"
                    :rules="[
          {
            required: true,
            message: '必填项',
            trigger: 'blur',
          },        {
                pattern: /^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/,
            required: true,
            message: '格式不对',
            trigger: 'blur',
          }
        ]"
                  >
                    <el-input
                      v-model="ruleForm.extraInfo.connect1.phone"
                      clearable
                      class="Input1"
                      placeholder="联系方式"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="10">
                <el-col :span="8">
                  <el-form-item prop="extraInfo.connect2.user" label="紧急联系人2 ">
                    <el-input
                      v-model="ruleForm.extraInfo.connect2.user"
                      clearable
                      class="Input1"
                      placeholder="联系人"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item prop="extraInfo.connect2.phone" label="紧急联系人2 ">
                    <el-input
                      v-model="ruleForm.extraInfo.connect2.phone"
                      clearable
                      class="Input1"
                      placeholder="联系方式"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item prop="extraInfo.blood" label="血型">
                <el-select class="select" v-model="ruleForm.extraInfo.blood">
                  <el-option label="A型" value="A"></el-option>
                  <el-option label="B型" value="B"></el-option>
                  <el-option label="AB型" value="AB"></el-option>
                  <el-option label="O型" value="O"></el-option>
                  <el-option label="Rh型" value="Rh"></el-option>
                  <el-option label="不了解" value="unknow"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="extraInfo.allergy" label="过敏史">
                <el-input
                  v-model="ruleForm.extraInfo.allergy"
                  clearable
                  class="Input"
                  placeholder="选填项"
                ></el-input>
              </el-form-item>

              <el-form-item label="电子围栏选择" prop="extraInfo.fence">
                <el-select class="Input" v-model="ruleForm.extraInfo.fence" placeholder="请选择电子围栏">
                  <el-option
                    v-for="item in options"
                    :key="item.fence.fenceName"
                    :label="item.fence.fenceName"
                    :value="item.fence.fenceName"
                  ></el-option>
                </el-select>
                <el-tooltip placement="bottom" effect="light">
                  <div slot="content">
                    电子围栏说明：
                    <br />
                    <br />电子围栏是用户自己创建,
                    <br />
                    <br />用于监控是否手环位置是否超出围栏，
                    <br />
                    <br />建议提前建立电子围栏之后再创建手环。
                  </div>
                  <i
                    class="el-icon-warning-outline"
                    style="color: orange;font-size: 20px;margin-left: 10px;"
                  ></i>
                </el-tooltip>
              </el-form-item>

              <!-- <el-form-item label="产品标识符" prop="typeIdentify">
            <el-input v-model="ruleForm.typeIdentify" clearable class="Input" placeholder="必填项"></el-input>
              </el-form-item>-->
              <el-form-item label="备注" prop="description">
                <el-input
                  type="textarea"
                  clearable
                  v-model="ruleForm.description"
                  class="Input"
                  placeholder="可选"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="margin-top: 50px; ">
            <el-form-item>
              <el-col :span="12" style="text-align: right">
                <el-button type="primary" @click="submitForm('ruleForm')">创建</el-button>
              </el-col>
              <el-col :span="12" style="text-align: left">
                <el-button type="danger" @click="back">取消</el-button>
              </el-col>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
    </el-card>
  </div>
</template>





<script>
// 同步注册，云平台注册产品等于电信云注册设备
import { CreateProduct, cloudDevcieRegister, CreateDevice } from "@/api/index";
import { RegisterUser, EditUser } from "@/api/admin";
import qs from 'qs';
export default {
  data() {
    return {
      extraIndex: 0,
      ruleForm: {
        productName: "",
        typeIdentify: "",
        extraInfo: {
          role: "user",
          fence: "-",
          simId: "",
          age: "",
          gender: "",
          idNumber: "",
          phone: "",
          blood: "",
          allergy: "",
          connect1: {
            user: "",
            phone: ""
          },
          connect2: {
            user: "",
            phone: ""
          }
        },
        // typeIdentify: "",
        description: ""
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

      rules: {
        productName: [
          { required: true, message: "请输入您的产品名称", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.dataPrepare();
  },
  methods: {
    dataPrepare() {
      this.options = JSON.parse(window.sessionStorage.getItem("fenceList"));
    },
    submitForm(formName) {
      console.log(this.ruleForm);
      this.$refs[formName].validate(valid => {
        if (valid) {
          //先注册用户

          //用户注册

          //电信云注册
          cloudDevcieRegister(
            this.ruleForm.extraInfo.simId,
            this.ruleForm.typeIdentify,
            this.ruleForm.productName
          ).then(res1 => {
            console.log(res1);
            if (res1.msg == "ok") {
              var productRegister = {
                productName: this.ruleForm.productName,
                productType: 1,
                protocolType: "TCP",
                typeIdentify: this.ruleForm.typeIdentify,
                extraInfo: {
                  deviceId: res1.result.deviceId,
                  nickname: this.ruleForm.extraInfo.simId,
                  fence: this.ruleForm.extraInfo.fence,
                  groupStatus: {
                    status: "un",
                    groups: ""
                  }
                }
              };
              console.log(productRegister);
              //云平台注册
              CreateProduct(productRegister).then(res2 => {
                console.log(res2);
                if (res2.msg == "ok") {
                  this.$message({
                    showClose: true,
                    message: "新产品创建成功",
                    type: "success"
                  });
                  //             //在成功注册设备之后需要注册七个设备
                  //             //设备注册有响应的对应表
                  //             //     心跳包 --F6
                  //             //     温度 -- BA
                  //             //   心率血压 -- C2
                  //             //   睡眠质量  --C5
                  //             //   地理位置 --- A4
                  //             //  报警   -- 02；
                  //             //  下行反馈   --C0
                  this.productKey = res2.data.productKey;
                  for (var i = 0; i < this.deviceRegister.length; i++) {
                    this.deviceRegister[i].nickname =
                      this.productKey + this.deviceRegister[i].deviceName;
                    CreateDevice(this.productKey, this.deviceRegister[i]).then(
                      res3 => {
                        console.log(res3);
                      }
                    );
                  }

                  RegisterUser({
                    username: this.ruleForm.productName,
                    password: "123456"
                  }).then(res => {
                    console.log(res);
                    if (res.msg == "ok") {
                      //  var register = {

                      //                   }
                      // console.log(register)
                      // console.log(stringify(register))
                      // console.log(qs.stringify(register))
                      var adminToken = window.sessionStorage.getItem(
                        "adminToken"
                      );
                      var _this = this;
                      _this
                        .axios({
                          method: "put",
                          url:
                            "https://api.ahusmart.com/api/v1/admin/user/" +
                            this.ruleForm.productName,
                          headers: {
                            token: adminToken
                          },
                          data: {  username: this.ruleForm.productName,
                            password: "123456",
                            phone: this.ruleForm.extraInfo.phone,
                            extraInfo: {
                              description: this.ruleForm.description,
                              age: this.ruleForm.extraInfo.age,
                              gender: this.ruleForm.extraInfo.gender,
                              allergy: this.ruleForm.extraInfo.allergy,
                              blood: this.ruleForm.extraInfo.blood,
                              idNumber: this.ruleForm.extraInfo.idNumber,
                              connect1: {
                                user: this.ruleForm.extraInfo.connect1.user,
                                phone: this.ruleForm.extraInfo.connect1.phone
                              },
                              connect2: {
                                user: this.ruleForm.extraInfo.connect2.user,
                                phone: this.ruleForm.extraInfo.connect2.phone
                              },
                              role: "user"}}
                          
                        })
                        .then(res => {
                          console.log(res);
                          if (res.data.msg == "ok") {
                            this.$router.push({ path: "/home" });
                          }
                        });
                    }
                  });
                  // EditUser(register).then(res => {
                  //   console.log(res);
                  //   if (res.msg == "ok") {
                  //     this.$router.push({ path: "/home" });
                  //   }
                  // });
                }
              });
            }
          });
        } else {
          this.$message({
            showClose: true,
            message: "error input！",
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
  .select {
    width: 30vw;
  }

.Input1 {  width: 14.5vw;}
  @media (max-width: 768px) {
    .fh-div {
      width: 100%;
    }
    .Input {
      width: 100%;
    }
    .Input1 {
      width: 100%;
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
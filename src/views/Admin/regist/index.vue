<template>
  <div class="content">
    <el-form
      ref="userData"
      label-position="top"
      :rules="rules"
      label-width="80px"
      :model="userData"
    >
      <el-form-item :label="user.username">
        <el-input v-model="userData.username" clearable></el-input>
      </el-form-item>
      <el-form-item :label="user.password" prop="password">
        <el-input
          type="password"
          v-model="userData.password"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item :label="user.checkpassword" prop="checkpassword">
        <el-input
          type="password"
          v-model="userData.checkpassword"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item :label="user.phone" prop="phone">
        <el-input v-model="userData.phone" clearable></el-input>
      </el-form-item>
      <el-form-item :label="user.email" prop="email">
        <el-input v-model="userData.email" clearable></el-input>
      </el-form-item>
      <el-form-item :label="user.userAddress">
        <el-row :gutter="6">
          <el-col :span="8">
            <el-select
              v-model="userData.userAddress.province"
              placeholder="省份"
            >
              <el-option
                v-for="item in cityData"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <el-select
              v-model="userData.userAddress.city"
              placeholder="城市"
              @change="selectCity"
            >
              <el-option
                v-for="(item, index) in citys"
                :key="index"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <el-select
              v-model="userData.userAddress.county"
              placeholder="县/区"
              @change="selectCity"
            >
              <el-option
                v-for="item in countys"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              >
              </el-option> </el-select
          ></el-col>
        </el-row>
      </el-form-item>
      <el-form-item :label="user.addressDetail">
        <el-input v-model="userData.userAddress.detail" clearable></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('userData')"
          >注册</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>





<script>
import { RegisterUser } from "@/api/admin";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请确认密码"));
      } else if (value !== this.userData.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validateEmail = (rule, value, callback) => {
      var email = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (!email.test(value)) {
        callback(new Error("输入的邮箱格式不正确"));
      } else {
        callback();
      }
    };
    var validatePhone = (rule, value, callback) => {
      var phone = /^1[3-9]\d{9}$/;
      if (!phone.test(value)) {
        callback(new Error("输入的手机格式不正确"));
      } else {
        callback();
      }
    };
    return {
      userData: {
        // username: "1111", // 不可为空
        // password: "123456", // 不可为空
        // email: "1603071696@qq.com", // 可为空
        // phone: "17775206686", // 可为空
        // extralInfo: {
        //   wePush: false, // 默认不开通微信推送权限
        //   adminPassword: "admin123", // 默认管理员密码为admin123
        // },
        // checkpassword: "123456",
        username: "", // 不可为空
        password: "", // 不可为空
        email: "", // 可为空
        phone: "", // 可为空
        extralInfo: {
          wePush: false, // 默认不开通微信推送权限
          adminPassword: "admin123", // 默认管理员密码为admin123
        },
        checkpassword: "",
        userAddress: {
          province: "",
          city: "",
          county: "",
          detail: "",
        },
      },
      cityData: require("../map.json"),
      user: {
        username: "用户名",
        password: "密码",
        checkpassword: "确认密码",
        phone: "电话",
        email: "邮箱",
        userAddress: "所在省市",
        addressDetail: "街道地址",
        Wechat: "微信",
        extraInfo: "备注",
      },
      countys: [],
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        checkpassword: [{ validator: validatePass2, trigger: "blur" }],
        email: [{ validator: validateEmail, trigger: "blur" }],
        phone: [{ validator: validatePhone, trigger: "blur" }],
      },
    };
  },

  computed: {
    citys() {
      if (this.userData.userAddress.province == "") return;
      var city = this.cityData.find((val) => {
        return val.label == this.userData.userAddress.province;
      }).children;
      var citys = [];
      city.map((val) => [citys.push(val.label)]);
      return citys;
    },
  },
  mounted() {},
  methods: {
    selectCity(val) {
      var city = this.cityData.find((val) => {
        return val.label == this.userData.userAddress.province;
      }).children;
      this.countys = city.find((val) => {
        return val.label == this.userData.userAddress.city;
      }).children;
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        console.log(valid);
        if (valid) {
          var res = await RegisterUser(this.userData);
          if (res.code == 200) {
            this.$message({
              showClose: true,
              message: "新用户注册成功",
              type: "success",
            });
          } else {
            this.$message({
              showClose: true,
              message: "提示:" + res.msg,
              type: "error",
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  width: 30%;
}
@media (max-width: 768px) {
  .content {
    width: 90%;
  }
}
</style>
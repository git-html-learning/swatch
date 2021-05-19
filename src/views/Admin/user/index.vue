<template>
  <div class="content">
    
        <el-form
          ref="userData"
          label-position="top"
          :rules="rules"
          label-width="80px"
          :model="userData"
        >
          <el-form-item :label="user.username" prop="password">
            <el-input disabled v-model="userData.username" clearable></el-input>
          </el-form-item>
          <el-form-item :label="user.password" prop="password">
            <el-input
              disabled
              type="password"
              v-model="userData.password"
              clearable
            ></el-input>
          </el-form-item>

          <el-form-item :label="user.phone" prop="phone">
            <el-input
              placeholder="未填写"
              v-model="userData.phone"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item :label="user.email" prop="email">
            <el-input
              placeholder="未填写"
              v-model="userData.email"
              clearable
            ></el-input>
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
            <el-input
              placeholder="未填写"
              v-model="userData.userAddress.detail"
              clearable
            ></el-input>
          </el-form-item>

          <el-form-item
            v-show="showcheck"
            :label="user.checkpassword"
            prop="checkpassword"
          >
            <el-input
              type="password"
              v-model="userData.checkpassword"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('userData')"
              >更新用户信息</el-button
            >
          </el-form-item>
        </el-form>
  </div>
</template>





<script>
import { UserDetail, EditUser } from "@/api/admin";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      this.showcheck = true;
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
      showcheck: false,

      userData: {
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
  mounted() {
    this.requireUserData();
  },
  methods: {
    async requireUserData() {
      let user = await UserDetail();
      this.userData = user.data;
      //这个是为了验证密码
      this.$set(this.userData, "checkpassword", "");
    },
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
          var res = await EditUser(this.userData);
          if (res.code == 200) {
            this.$message({
              showClose: true,
              message: "用户信息更新成功",
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
.content{
  width: 30%;
}
@media (max-width: 768px)  {
.content{
  width: 90%;
}
}
</style>
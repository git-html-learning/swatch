<template>
  <div class="layout">
    <div
      class="title"
      style="text-align: center;
               color: #00f6ff; font-size: 23px; line-height: 60px; height: 60px;"
    >
      <img src="@/assets/img/icon05.png" alt />
      当前手环基本信息
    </div>
    <el-card
      style="height: 300px; width: 30%; margin-left: 35%; background: transparent; backdrop-filter: blur(20px);
      box-shadow: 1px 1px 10px rgba(93, 93, 93, 0.5);
      border-radius: 15px;
      z-index: 5;"
    >
      <el-row type="flex" justify=""  style = "height: 200px;">
          <el-col :span="18">
                  <el-row style="color: #fff; font-size: 20px;">
        <!-- <el-col :span = "6" style = "line-height: 300px;">
        </el-col>
        <el-col :span = "18"></el-col>-->
        <p>
          <el-row type="flex" justify style="text-align: center">
            <el-col :span="10">手环名称：</el-col>
            <el-col :span="14">{{productMessage.productName}}</el-col>
          </el-row>
        </p>
        <p>
          <el-row type="flex" justify style="text-align: center">
            <el-col :span="10">标识</el-col>
            <el-col :span="14">{{productMessage.typeIdentify}}</el-col>
          </el-row>
        </p>
        <p>
          <el-row type="flex" justify style="text-align: center">
            <el-col :span="10">所属围栏:</el-col>
            <el-col :span="14">{{productMessage.extraInfo.fence}}</el-col>
          </el-row>
        </p>
        <p>
          <el-row type="flex" justify style="text-align: center">
            <el-col :span="10">状态：</el-col>
            <el-col :span="14">
              <el-tag
                effect="dark"
                size="mini"
                :type="
                productMessage.extraInfo.groupStatus.status == 'un'
                  ? '未分组'
                  : productMessage.extraInfo.groupStatus.status == 'user'?'组员':'组长'
              "
                disable-transitions
              >
                {{
                productMessage.extraInfo.groupStatus.status == 'un'
                ? '未分组'
                : productMessage.extraInfo.groupStatus.status == 'user'?'组员':'组长'
                }}
              </el-tag>
            </el-col>
          </el-row>
        </p>

        <!-- 状态: {{"productMessage.extraInfo.groupStatus.status == 'un'?'未分组':productMessage.extraInfo.groupStatus.status == 'user':'组长'?'组员'" }} -->
      </el-row>
          </el-col>
          <el-col :span="6" style = "text-align: center; line-height: 250px;">
<svg t="1655175993322" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8269" width="120" height="120"><path d="M590.106 778.157A188.173 188.173 0 0 1 515.2 793.6c-26.611 0-51.942-5.504-74.906-15.443l10.522 66.643h128.768l10.522-66.643z m-223.61-57.011A187.987 187.987 0 0 1 326.4 604.8V470.4a188.006 188.006 0 0 1 41.357-117.94l24.237-153.446c2.38-15.09 15.52-26.214 30.956-26.214h184.5c15.436 0 28.576 11.123 30.956 26.214l24.237 153.447A188.006 188.006 0 0 1 704 470.4v134.4c0 43.891-14.976 84.282-40.096 116.346l-25.498 161.44c-2.38 15.09-15.52 26.214-30.956 26.214h-184.5c-15.436 0-28.576-11.123-30.956-26.214l-25.498-161.44z m222.528-424.57l-9.44-59.776H450.816l-9.44 59.776A188.198 188.198 0 0 1 515.2 281.6c26.195 0 51.142 5.338 73.824 14.976zM518.4 448a32 32 0 1 0 0-64 32 32 0 0 0 0 64z m0 117.03a32 32 0 1 0 0-64 32 32 0 0 0 0 64z m0 117.024a32 32 0 1 0 0-64 32 32 0 0 0 0 64z" p-id="8270" fill="#e6e6e6"></path></svg>
          </el-col>
      </el-row>
 <el-button style = "float: right; margin-right: 20px;" type="primary"  @click = "bind">
 用户绑定</el-button>
    </el-card>
    <el-drawer
  title="我是标题"
  :visible.sync="drawer"
  :with-header="false">
 <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
    <el-form-item
                prop="age"
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
                  v-model="ruleForm.age"
                  clearable
                  class="Input"
                  placeholder="必填项"
                ></el-input>
              </el-form-item>
                  <el-form-item
                prop="age"
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
                  v-model="ruleForm.age"
                  clearable
                  class="Input"
                  placeholder="必填项"
                ></el-input>
              </el-form-item>
                <el-form-item
                prop="gender"
                label="性别"
                :rules="[
          {
            required: true,
            message: '必填项',
            trigger: 'blur',
          },
        ]"
              >
                <el-select v-model="ruleForm.gender" class="select" placeholder="请选择">
                  <el-option label="男" value="male"></el-option>
                  <el-option label="女" value="female"></el-option>
                </el-select>
              </el-form-item>
   <el-form-item
                prop="idNumber"
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
                  v-model="ruleForm.idNumber"
                  clearable
                  class="Input"
                  placeholder="必填项"
                ></el-input>
              </el-form-item>
   <el-form-item
                prop="phone"
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
                  v-model="ruleForm.phone"
                  clearable
                  class="Input"
                  placeholder="必填项"
                ></el-input>
              </el-form-item>
                  <el-form-item
                    prop="connect1.user"
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

     </el-form>
</el-drawer>
  </div>
</template>
<script>
import { UserDetail } from "@/api/admin";
import { getDeviceDatas } from "@/api/index";
export default {
  name: "user",
  data() {
    return {
      user: "",
      productKey: "",
      productMessage: null,
      drawer: false,
      ruleForm:{
age:"",
gender:"",
idNumber:"",
phone:"",
      }
    };
  },
  created() {
    this.prepare();
  },
  methods: {
    prepare() {
      var username = window.sessionStorage.getItem("username");
      UserDetail(username).then(res => {
        console.log(res);
        if (res.msg == "ok") {
          this.productKey = res.data.extraInfo.productKey;
          console.log(this.productKey);
          getDeviceDatas({
            username: "admin",
            pkList: [this.productKey],
            startTime: 11111
          }).then(res1 => {
            console.log(res1);
            this.productMessage = res1.data[0];
            console.log(this.productMessage);
          });
          // ProductOne(this.productKey).then((res1)=>{
          //     console.log(res1)
          // })
        }
      });
    },
    bind() {
        console.log("绑定")
        this.drawer = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.layout {
  padding: 10px;
  background-color: #fff;
}
</style>
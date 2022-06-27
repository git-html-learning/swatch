<template>
  <el-card class="layout">
    <div style="height: 50px" slot="header">
      <span style="font-size: 21px; line-height: 50px; ">用户信息</span>
      <span style="line-height: 50px;">
       
        <el-tooltip content="表格案例下载" placement="bottom" effect="light" style="float: right;margin-right: 30px;cursor: pointer; margin-top: 12px;">
                 <a
              href="/表格案例.xlsx"
              download="表格案例.xlsx"
              class="down"
              >
              <svg t="1655605528860" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15111" width="30" height="30"><path d="M668.571 64.077H145.537v895.481h729.271V256.411L668.571 64.077z m17.428 892.9c-58.584 0-110.933-25.782-145.557-66.241H216.777V132.899h392.926v187.849h193.865v311.197c43.388 33.413 71.201 84.9 71.201 142.67 0 100.716-84.515 182.362-188.77 182.362z" fill="#819292" p-id="15112"></path><path d="M302.253 418.389h429.738v67.101H302.253zM302.253 578.431h216.004v67.101H302.253zM302.253 738.473h135.854v67.101H302.253z" fill="#819292" p-id="15113"></path><path d="M803.568 631.945c-32.255-24.839-73.114-39.693-117.569-39.693-104.255 0-188.77 81.646-188.77 182.362 0 44.121 16.22 84.581 43.213 116.122 34.624 40.459 86.973 66.241 145.557 66.241 104.255 0 188.77-81.646 188.77-182.362 0-57.77-27.813-109.257-71.201-142.67z m-121.73 274.059l-37.781-36.498 0.903-0.873-67.916-65.611 37.781-36.498 44.459 42.95V651.611h53.43V803.18l44.459-42.95 37.781 36.498-113.116 109.276z" fill="#287CB0" p-id="15114"></path><path d="M794.954 796.728l-37.781-36.498-44.459 42.95V651.611h-53.43v157.863l-44.459-42.95-37.781 36.499 67.916 65.61-0.903 0.873 37.781 36.498z" fill="#FFFFFF" p-id="15115"></path></svg>
              </a
            >
        
        </el-tooltip>
        <div  style="float: right;margin-right: 30px;cursor: pointer" class = "btn1" @click="upload">上传excel表格</div>
        <div  style="float: right;margin-right: 30px; cursor: pointer" class = "btn" @click="edit">自行输入</div>
      </span>
    </div>
    <div class="body">
      <el-table :data="userList" border stripe
               v-loading="loading"
            element-loading-text="数据加载中"
            element-loading-spinner="el-icon-loading">
        <el-table-column prop="name" align="center" label="姓名" min-width="50"></el-table-column>
        <el-table-column prop="age" align="center" label="年龄" min-width="50"></el-table-column>
        <el-table-column prop="gender" align="center" label="性别" min-width="50">
          <template slot-scope="scope">{{scope.row == 'female'?'女':'男'}}</template>
        </el-table-column>
        <el-table-column prop="phone" align="center" label="电话" min-width="50"></el-table-column>
        <el-table-column label="操作" align="center" min-width="50">
          <template slot-scope="scope">
            <el-button
              type="success"
              plain
              icon="el-icon-more"
              size="mini "
              @click="detail(scope.row)"
            ></el-button>
            <el-button
              type="danger"
              plain
              icon="el-icon-delete"
              size="mini "
              @click="deleteRow(scope.row, scope.$index)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="用户详情" :visible.sync="dialogVisible1" width="50%">
      <el-row type="flex" justify style="margin-top: 15px;">
        <el-col :span="12">
          <el-input placeholder="null" v-model="whichUser.name">
            <template slot="prepend">用户名：</template>
          </el-input>
        </el-col>
        <el-col :span="12">
          <el-input placeholder="null" v-model="whichUser.age">
            <template slot="prepend">年龄：</template>
          </el-input>
        </el-col>
      </el-row>
      <el-row style="margin-top: 15px;">
        <el-col :span="24">
          <el-input placeholder="null" v-model="whichUser.phone">
            <template slot="prepend">联系电话：</template>
          </el-input>
        </el-col>
      </el-row>
      <el-row style="margin-top: 15px;">
        <el-col :span="24">
          <el-input placeholder="null" v-model="whichUser.idNumber">
            <template slot="prepend">身份证号：</template>
          </el-input>
        </el-col>
      </el-row>
      <el-row style="margin-top: 15px;">
        <el-col :span="12">
          <el-input placeholder="null" v-model="whichUser.blood">
            <template slot="prepend">血型：</template>
          </el-input>
        </el-col>
        <el-col :span="12">
          <el-input placeholder="null" v-model="whichUser.allergy">
            <template slot="prepend">过敏史：</template>
          </el-input>
        </el-col>
      </el-row>
      <el-row style="margin-top: 15px;">
        <el-col :span="24">
          <el-input placeholder="null" v-model="whichUser.description">
            <template slot="prepend">备注：</template>
          </el-input>
        </el-col>
      </el-row>
      <!-- <el-row style = "margin-top: 15px;" >
                        <el-col :span="12">
                   <el-input placeholder="null" v-model="whichUser.connect2.user">
            <template slot="prepend">联系人2：</template>
          </el-input>
      </el-col>
                              <el-col :span="12">
                   <el-input placeholder="null" v-model="whichUser.connect2.phone">
            <template slot="prepend">联系方式2：</template>
          </el-input>
      </el-col>
      </el-row>-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="80%">
      <div class="excel">
        <el-upload
          class="upload-demo"
          action
          :on-change="handleChange"
          :show-file-list="false"
          :auto-upload="false"
        >
          <el-button size="small" type="primary" style="margin-bottom:15px;">读取excel文件</el-button>
        </el-upload>
        <el-table :data="tableData" style="width: 100%"
         @selection-change="handleSelectionChange">
            <el-table-column type="selection" align="center" width="50"></el-table-column>
          <el-table-column prop="name" label="姓名" align="center" ></el-table-column>
          <el-table-column prop="age" label="年龄" align="center" ></el-table-column>
          <el-table-column prop="gender" label="性别" align="center" ></el-table-column>
          <el-table-column prop="phone" label="电话" align="center" ></el-table-column>
          <el-table-column prop="connect1.user" label="联系人1" align="center" ></el-table-column>
          <el-table-column prop="connect1.phone" label="联系方式1" align="center" ></el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                plain
                icon="el-icon-folder-add"
                size="mini "
                @click="upload1(scope.row,scope.$index)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="cancel">确 定</el-button>
      </span>
    </el-dialog>
    <el-drawer title="用户信息" :visible.sync="drawer" :with-header="true">
      <!-- <h3 style = "color: #606266">用户信息输入</h3> -->
      <el-form :model="ruleForm" ref="ruleForm" label-width="120px">
        <el-form-item
          prop="name"
          label="姓名"
          :rules="[
          {
            required: true,
            message: '必填项',
            trigger: 'blur',
          },
        ]"
        >
          <el-input v-model="ruleForm.name" clearable class="Input" placeholder="必填项"></el-input>
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
          <el-input v-model="ruleForm.age" clearable class="Input" placeholder="必填项"></el-input>
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
          <el-input v-model="ruleForm.idNumber" clearable class="Input" placeholder="必填项"></el-input>
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
          <el-input v-model="ruleForm.phone" clearable class="Input" placeholder="联系方式"></el-input>
        </el-form-item>
        <el-form-item
          prop="connect1.user"
          label="紧急联系人1 "
          :rules="[
          {
            required: true,
            message: '必填项',
            trigger: 'blur',
          }
        ]"
        >
          <el-input v-model="ruleForm.connect1.user" clearable class="Input" placeholder="联系方式"></el-input>
        </el-form-item>
        <el-form-item
          prop="connect1.phone"
          label="紧急联系方式1 "
          :rules="[
          {
            required: true,
            message: '必填项',
            trigger: 'blur',
          }
        ]"
        >
          <el-input v-model="ruleForm.connect1.phone" clearable class="Input" placeholder="联系方式"></el-input>
        </el-form-item>
        <el-form-item prop="connect2.user" label="紧急联系人2 ">
          <el-input v-model="ruleForm.connect2.user" clearable class="Input" placeholder="联系方式"></el-input>
        </el-form-item>
        <el-form-item prop="connect2.phone" label="紧急联系方式2 ">
          <el-input v-model="ruleForm.connect2.phone" clearable class="Input" placeholder="联系方式"></el-input>
        </el-form-item>
        <el-form-item prop="blood" label="血型">
          <el-select class="select" v-model="ruleForm.blood">
            <el-option label="A型" value="A"></el-option>
            <el-option label="B型" value="B"></el-option>
            <el-option label="AB型" value="AB"></el-option>
            <el-option label="O型" value="O"></el-option>
            <el-option label="Rh型" value="Rh"></el-option>
            <el-option label="不了解" value="unknow"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="allergy" label="过敏史">
          <el-input v-model="ruleForm.allergy" clearable class="Input" placeholder="选填项"></el-input>
        </el-form-item>
        <el-form-item label="特殊情况备注" prop="description">
          <el-input
            type="textarea"
            clearable
            v-model="ruleForm.description"
            class="Input"
            placeholder="可选"
          ></el-input>
        </el-form-item>
        <el-form-item style="text-align: right; margin-right: 30px; margin-top: -20px;">
          <el-button type="primary" @click="bind1('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>

    <!--
注意：上面代码有以下 2 个需要注意的点
	1. action 属性必须要有，可以为空，但是不能没有，不然控制台会报错
	2. 钩子函数必须是 on-change 这个钩子，只有这个钩子可以添加文件，其他都是上传，具体可以看[elementtui官方文档的介绍](https://element.eleme.io/#/zh-CN/component/upload)
    -->
  </el-card>
</template>
<script>
import { UserDetail, EditUser } from "@/api/admin.js";
export default {
  name: "userMessage",
  // data 部分的数据
  data() {
    return {
      tableData: [],
      fileContent: "",
      file: "",
      data: "",
      drawer: false,
      ruleForm: {
        name: "",
        age: "",
        gender: "",
        idNumber: "",
        phone: "",
        connect1: {
          user: "",
          phone: ""
        },
        connect2: {
          user: "",
          phone: ""
        },
        blood: "",
        allergy: "",
        description: ""
      },
      dialogVisible: false,
      userList: [],
      dialogVisible1: false,
      whichUser: {},
      res: null,
            loadingtext: "数据加载中",

      loading: true,
       multipleSelection: [],
    };
  },
  created() {
    this.prepare();
  },
  // 处理方法(核心部分)
  methods: {
    // 注意：handleDelete 和 handelEdit 这两个方法其实是无关紧要的，只不过我的处理逻辑中有 修改 和 删除 这两个功能，不写的话，会报错
    //   handleDelete (item) {
    //     console.log('handleDelete', item)
    //   },
    //   handelEdit (item) {
    //     console.log('handleDelete', item)

    //   },
    prepare() {
      var username = window.localStorage.getItem("username");
      UserDetail(username).then(res => {
        if (res.msg == "ok") {
          this.userList = res.data.extraInfo.userMessage;
          this.res = res.data;
          this.loading =  false;
        }
      });
    },
    upload1(item,i) {
      //   console.log(item.row);
      var userMessage = this.userList;
      userMessage.push(item);
      this.res.extraInfo.userMessage = userMessage;
      console.log(this.res);
      this.tableData.splice(i,1)
          EditUser(this.res).then(res1 => {
            console.log(res1);
            if (res1.msg == "ok") {
              this.$message.success("提交成功");
              this.drawer = false;
              this.prepare();
            }
          });
    },
    deleteRow(item, i) {
            this.$confirm("此操作将永久删除该用户信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
                  console.log(item);
      console.log(i);
      var userMessage = this.userList;
      userMessage.splice(i, 1);
      console.log(userMessage);
      this.res.extraInfo.userMessage = userMessage;
      console.log(this.res);
                EditUser(this.res).then(res1 => {
            console.log(res1);
            if (res1.msg == "ok") {
              this.$message.success("删除成功");
              this.prepare();
            }
          });
        })
            .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });

    },
    // 核心部分代码(handleChange 和 importfile)
    handleChange(file, fileList) {
      this.fileContent = file.raw;
      const fileName = file.name;
      const fileType = fileName.substring(fileName.lastIndexOf(".") + 1);
      if (this.fileContent) {
        if (fileType === "xlsx" || fileType === "xls") {
          this.importfile(this.fileContent);
        } else {
          this.$message({
            type: "warning",
            message: "附件格式错误，请重新上传！"
          });
        }
      } else {
        this.$message({
          type: "warning",
          message: "请上传附件！"
        });
      }
    },
    importfile(obj) {
      const reader = new FileReader();
      const _this = this;
      reader.readAsArrayBuffer(obj);
      reader.onload = function() {
        const buffer = reader.result;
        const bytes = new Uint8Array(buffer);
        const length = bytes.byteLength;
        let binary = "";
        for (let i = 0; i < length; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        const XLSX = require("xlsx");
        const wb = XLSX.read(binary, {
          type: "binary"
        });
        const outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
        this.data = [...outdata];
        const arr = [];
        this.data.map(v => {
          const obj = {};
          obj.name = v.姓名;
          obj.age = v.年龄;
          obj.phone = v.联系方式;
          obj.gender = v.性别;
          obj.idNumber = v.身份证;
          obj.connect1 = {
            user: v.联系人1,
            phone: v.联系方式1
          };
          obj.connect2 = {
            user: v.联系人2,
            phone: v.联系方式2
          };
          obj.blood = v.血型;
          obj.allergy = v.过敏史;
          obj.description = v.备注;
          arr.push(obj);
        });
        _this.tableData = _this.tableData.concat(arr);
        console.log(_this.tableData);
      };
    },
    edit() {
      this.drawer = true;
    },
    bind1(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var userMessage = this.userList;
          userMessage.push(this.ruleForm);
          console.log(userMessage);
          this.res.extraInfo.userMessage = userMessage;
          console.log(this.res);
          EditUser(this.res).then(res1 => {
            console.log(res1);
            if (res1.msg == "ok") {
              this.$message.success("提交成功");
              this.drawer = false;
              this.prepare();
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
    upload() {
      this.dialogVisible = true;
    },
    cancel() {
      this.dialogVisible = false;
      this.tableData = [];
    },
    detail(item) {
      console.log(item);
      this.whichUser = item;
      this.dialogVisible1 = true;
    },
        handleSelectionChange(val, index) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
      var userMessage = this.userList
      if (this.multipleSelection.length !==0) {
this.multipleSelection.forEach(item=>{
    userMessage.push(item)
})
      }
      this.res.extraInfo.userMessage = userMessage
      console.log(this.res)
         EditUser(this.res).then(res1 => {
            console.log(res1);
            if (res1.msg == "ok") {
              this.$message.success("提交成功");
              this.drawer = false;
              this.prepare();
            }
          });
      
    },
  }
};
</script>
<style lang="scss" scoped>
.layout {
  padding: 20px;
  .btn {
  padding: 15px 20px;
  line-height: 20px;
  border-radius: 10px;
  font-size: 14px;
  background-color: #00a29a;
  color: #fff;
}
.btn:hover {
  background-color: #fff;
  color: #00a29a;
  border-radius: 0px;
  border-bottom: 2px solid #00a29a;
  border-top: 2px solid #00a29a;
}
.btn1 {
  padding: 15px 20px;
  line-height: 20px;
  border-radius: 10px;
  font-size: 14px;
  background-color: #b378c4;
  color: #fff;
}
.btn1:hover {
  background-color: #fff;
  color: #b378c4;
  border-radius: 0px;
  border-bottom: 2px solid #b378c4;
  border-top: 2px solid #b378c4;
}
}
</style>
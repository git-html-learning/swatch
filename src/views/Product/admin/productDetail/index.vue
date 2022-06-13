<template>
  <!-- 这个组件把设备详情和编辑设备放在一起了 -->
  <div>
    <div class="content" v-show="condition == 0">
      <!-- 设备详情 -->
      <!-- gutter指定分栏间隔 -->
      <!-- offset属性指定分栏偏移的栏数（向右偏移） -->
      <el-row :gutter="20">
        <el-col :span="12" :offset="0">
          <el-input placeholder="请输入内容" v-model="product.productName">
            <template slot="prepend">用户名：</template>
          </el-input>
        </el-col>

        <!-- <el-col :span="12" :offset="0">
        <el-input placeholder="请输入内容" v-model="product.productType">
          <template slot="prepend">产品类型：</template>
        </el-input>
        </el-col>-->
        <!-- <el-col :span="12" :offset="0">
        <el-input placeholder="请输入内容" v-model="product.protocolType">
          <template slot="prepend">协议类型：</template>
        </el-input>
        </el-col>-->
        <el-col :span="12" :offset="0">
          <el-input placeholder="请输入内容" v-model="product.typeIdentify">
            <template slot="prepend">标识：</template>
          </el-input>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-input placeholder="请输入内容" v-model="product.productKey">
            <template slot="prepend">密钥：</template>
          </el-input>
        </el-col>
        <!-- <el-col :span="12" :offset="0">
        <el-input placeholder="请输入内容" :value="formdata(product.createdAt)">
          <template slot="prepend">创建时间：</template>
        </el-input>
        </el-col>-->
        <el-col :span="24" :offset="0">
          <el-divider direction="horizontal" content-position="left"></el-divider>
        </el-col>

        <el-col :span="12" :offset="0" >
          <el-input placeholder="请输入内容" v-model="product.extraInfo.fence">
 <template slot="prepend">
   电子围栏
   </template>
          
            </el-input>
        </el-col>
              <el-col :span="12" :offset="0" >
          <el-input placeholder="请输入内容" v-model="product.extraInfo.deviceId">
 <template slot="prepend">
   手环Id
   </template>
          
            </el-input>
        </el-col>
                      <el-col :span="12" :offset="0" >
          <el-input placeholder="请输入内容" v-model="product.extraInfo.nickname">
 <template slot="prepend">
   手环编号
   </template>
          
            </el-input>
        </el-col>
        <el-col :span="24" style="text-align: center;margin-top: 20px;">
          <el-button class="pan-btn tiffany-btn" @click="detail">查看手环详情</el-button>
          <!-- <router-link class="pan-btn tiffany-btn" to="/pageDetail/index"> </router-link> -->
        </el-col>
      </el-row>

      <!-- 编辑设备信息 -->
      <!-- condition=1 打开 -->
      <!-- <div slot="footer" class="dialog-footer" v-show="condition == 1">
      <el-button size="mini" @click="closeDialog">取 消</el-button>
      <el-button size="mini" type="primary" @click="updateproduct">提 交</el-button>
      </div>-->
    </div>
    <div class="content" v-show="condition == 1">
      <el-select style="width: 300px;" v-model="fence" placeholder="请选择电子围栏">
        <el-option
          v-for="item in options"
          :key="item.fence.fenceName"
          :label="item.fence.fenceName"
          :value="item.fence.fenceName"
        ></el-option>
      </el-select>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="closeDialog">取 消</el-button>
        <el-button size="mini" type="primary" @click="updateproduct">提 交</el-button>
      </div>
    </div>
  </div>
</template>





<script>
import { dataType, updated_product, ProductOne } from "@/api/index";
import { UserDetail, EditUser } from "@/api/admin";

export default {
  data() {
    return {
      labelWidth: "110px",
      product: {},
      extraInfo: {
        Name: "",
        Value: "" || [],
        adminEditable: "",
        adminVisible: "",
        userEditable: "",
        userVisible: ""
      },
      activeNames: "",
      fence: "",
      options: [],
      UserDetail: []
    };
  },
  created() {
    this.dataPrepare();
  },
  watch: {
    productdetail: {
      handler(val) {
        this.product = val;
        console.log(this.product);
        //在获取到pk的时候，获取产品下设备的信息
        //目的是以防设备注册的时候出现问题，点开查不了设备信息的尴尬情况
        //判断7个设备是否全部成功注册，如果没有就不显示设备信息这一项。如果注册的数量不够，需要判断少注册哪一个设备，注册的按钮不显示
        // var ifs = false;
        // ifs = this.product.deviceInfo.includes
        console.log("点开");
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    dataPrepare() {
      this.options = JSON.parse(window.sessionStorage.getItem("fenceList"));
    },
    formdata(val) {
      return dataType(val);
    },
    closeDialog() {
      this.$emit("beforeClose");
    },
    showData1() {
      console.log("心跳包");
    },
    showData2() {
      console.log("体温");
    },
    showData3() {
      console.log("心率血压");
    },
    showData4() {
      console.log("睡眠监测");
    },
    showData5() {
      console.log("地理位置");
    },
    showData6() {
      console.log("报警信息");
    },
    showData7() {
      console.log("下行反馈");
    },

    updateproduct() {
      this.$confirm("修改电子围栏可能会造成影响，确定修改?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        console.log("确定修改");

        console.log(this.product);
        var key = this.product.productKey;
        ProductOne(key).then(res => {
          console.log(res.data);
          var obj = {
            productKey: res.data.productKey,
            productName: res.data.productName,
            protocolType: res.data.protocolType,
            productType: res.data.productType,
            typeIdentify: res.data.typeIdentify,
            description: res.data.description,
            extraInfo: res.data.extraInfo
          };
          obj.extraInfo.fence = this.fence;
          console.log(obj);
          updated_product(obj).then(res => {
            if (res.msg == "ok") {
              this.$message.success("修改成功");
            } else {
              this.$message.info(res.msg);
            }
            this.$emit("beforeClose");
          });
        });
      });
      // var list = Object.values(this.product.extraInfo);
      // list.map(val => {
      //   //  var exp=
      //   val.Value = val.Value.replace(/[\uff0c]/g, ",");
      // });
      // updated_product(this.productdetail).then(res => {
      //   if (res.code == 200) {
      //     this.$message({
      //       showClose: true,
      //       message: "产品信息更新成功！",
      //       type: "success"
      //     });
      //     this.$emit("beforeClose");
      //   } else {
      //     this.$message({
      //       showClose: true,
      //       message: "提示:" + res.msg,
      //       type: "error"
      //     });
      //   }
      // });
    },
    detail() {
      this.$router.push({path: '/products/pageDetail'})
      // console.log(this.product)
      window.sessionStorage.setItem("whichProduct",JSON.stringify(this.product))
    }
  },
  props: ["productdetail", "condition"]
};
</script>
<style lang="less" scoped>
.content {
  .dialog-footer {
    padding: 10px 20px 20px;
    text-align: right;
  }
  /deep/.el-input {
    padding: 10px;
  }
  // .Input {
  //   width: 100%;
  // }
  .el-button {
    border-radius: 20px;
    margin-left: 15px;
  }
}
</style>
<template>
  <!-- 这个组件把设备详情和编辑设备放在一起了 -->
  <div class="content">
    <!-- 设备详情 -->
    <!-- gutter指定分栏间隔 -->
    <!-- offset属性指定分栏偏移的栏数（向右偏移） -->
    <el-row :gutter="20">
      <el-col :span="12" :offset="0">
        <el-input placeholder="请输入内容" v-model="product.productName">
          <template slot="prepend">产品名称：</template>
        </el-input>
      </el-col>

      <el-col :span="12" :offset="0">
        <el-input placeholder="请输入内容" v-model="product.productType">
          <template slot="prepend">产品类型：</template>
        </el-input>
      </el-col>
      <el-col :span="12" :offset="0">
        <el-input placeholder="请输入内容" v-model="product.protocolType">
          <template slot="prepend">协议类型：</template>
        </el-input>
      </el-col>
      <el-col :span="12" :offset="0">
        <el-input placeholder="请输入内容" v-model="product.typeIdentify">
          <template slot="prepend">产品标识：</template>
        </el-input>
      </el-col>
      <el-col :span="12" :offset="0">
        <el-input placeholder="请输入内容" v-model="product.productKey">
          <template slot="prepend">产品密钥：</template>
        </el-input>
      </el-col>
      <el-col :span="12" :offset="0">
        <el-input placeholder="请输入内容" :value="formdata(product.createdAt)">
          <template slot="prepend">创建时间：</template>
        </el-input>
      </el-col>
      <el-col :span="24" :offset="0">
        <el-divider direction="horizontal" content-position="left"></el-divider>
      </el-col>

      <el-col :span="12" :offset="0" v-for="(item, index) in product.extraInfo" :key="index">
        <el-input placeholder="请输入内容" v-model="product.extraInfo[index]">
          <template slot="prepend">
            {{
            index
            }}
          </template>
        </el-input>
      </el-col>
      <!-- <el-col :span="24" :offset="0">
        <el-divider direction="horizontal" content-position="left"></el-divider>
      </el-col> -->
      <!-- <el-col :span = "24" v-if = "product.deviceInfo.length == 0">
        <span style="font-size: 16px; font-weight: 400">当前没有设备</span> 
      </el-col>
      <el-col :span="24">
        <el-collapse v-model="activeNames">
          <el-collapse-item name="1">
            <template slot="title">
              <span style="font-size: 16px; font-weight: 400">设备信息展示</span>
            </template>
            <el-button style="background-color: #00b6e3; color: #fff" @click="showData1" v-if  = "product.deviceInfo1.includes('F6')">心跳包</el-button>
            <el-button style="background-color: #00c354; color: #fff" @click="showData2" v-if  = "product.deviceInfo1.includes('BA')">体温</el-button>
            <el-button style="background-color: #fcd848; color: #fff" @click="showData3" v-if  = "product.deviceInfo1.includes('C2')">心率血压</el-button>
            <el-button style="background-color: #f55153; color: #fff" @click="showData4"  v-if  = "product.deviceInfo1.includes('C5')">睡眠监测</el-button>
            <el-button style="background-color:#7364b7; color: #fff" @click="showData5"  v-if  = "product.deviceInfo1.includes('A4')">地理位置</el-button>
            <el-button style="background-color: #ffb484; color: #fff" @click="showData6"  v-if  = "product.deviceInfo1.includes('02')">报警信息</el-button>
            <el-button style="background-color: #dd97fc; color: #fff" @click="showData7"  v-if  = "product.deviceInfo1.includes('C0')">下行反馈</el-button>
          </el-collapse-item>
        </el-collapse>
      </el-col> -->
    </el-row>

    <!-- 编辑设备信息 -->
    <!-- condition=1 打开 -->
    <div slot="footer" class="dialog-footer" v-show="condition == 1">
      <el-button size="mini" @click="closeDialog">取 消</el-button>
      <el-button size="mini" type="primary" @click="updateproduct">提 交</el-button>
    </div>
  </div>
</template>





<script>
import { dataType, updated_product } from "@/api/index";
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
      activeNames: ""
    };
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
      var list = Object.values(this.product.extraInfo);
      list.map(val => {
        //  var exp=
        val.Value = val.Value.replace(/[\uff0c]/g, ",");
      });
      updated_product(this.productdetail).then(res => {
        if (res.code == 200) {
          this.$message({
            showClose: true,
            message: "产品信息更新成功！",
            type: "success"
          });
          this.$emit("beforeClose");
        } else {
          this.$message({
            showClose: true,
            message: "提示:" + res.msg,
            type: "error"
          });
        }
      });
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
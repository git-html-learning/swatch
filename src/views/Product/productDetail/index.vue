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
        </el-input></el-col
      >

      <el-col :span="12" :offset="0">
        <el-input placeholder="请输入内容" v-model="product.productType">
          <template slot="prepend">产品类型：</template>
        </el-input></el-col
      >
      <el-col :span="12" :offset="0">
        <el-input placeholder="请输入内容" v-model="product.protocolType">
          <template slot="prepend">协议类型：</template>
        </el-input></el-col
      ><el-col :span="12" :offset="0">
        <el-input placeholder="请输入内容" v-model="product.typeIdentify">
          <template slot="prepend">产品标识：</template>
        </el-input></el-col
      >
      <el-col :span="12" :offset="0">
        <el-input placeholder="请输入内容" v-model="product.productKey">
          <template slot="prepend">产品密钥：</template>
        </el-input></el-col
      >
      <el-col :span="12" :offset="0">
        <el-input placeholder="请输入内容" :value="formdata(product.createdAt)">
          <template slot="prepend">创建时间：</template>
        </el-input></el-col
      >
      <el-col :span="24" :offset="0"
        ><el-divider
          direction="horizontal"
          content-position="left"
        ></el-divider>
      </el-col>

      <el-col
        :span="12"
        :offset="0"
        v-for="(item, index) in product.extraInfo"
        :key="index"
      >
        <el-input
          placeholder="请输入内容"
          v-model="product.extraInfo[index].Value"
        >
          <template slot="prepend">{{
            product.extraInfo[index].Name
          }}</template>
        </el-input>
      </el-col>
    </el-row>

    <!-- 编辑设备信息 -->
    <!-- condition=1 打开 -->
    <div slot="footer" class="dialog-footer" v-show="condition == 1">
      <el-button size="mini" @click="closeDialog">取 消</el-button>
      <el-button size="mini" type="primary" @click="updateproduct"
        >提 交</el-button
      >
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
        userVisible: "",
      },
    };
  },
  watch: {
    productdetail: {
      handler(val) {
        this.product = val;
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    formdata(val) {
      return dataType(val);
    },
    closeDialog() {
      this.$emit("beforeClose");
    },
    updateproduct() {
      var list = Object.values(this.product.extraInfo);
      list.map((val) => {
        //  var exp=
        val.Value = val.Value.replace(/[\uff0c]/g, ",");
      });
      updated_product(this.productdetail).then((res) => {
        if (res.code == 200) {
          this.$message({
            showClose: true,
            message: "产品信息更新成功！",
            type: "success",
          });
          this.$emit("beforeClose");
        } else {
          this.$message({
            showClose: true,
            message: "提示:" + res.msg,
            type: "error",
          });
        }
      });
    },
  },
  props: ["productdetail", "condition"],
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
}
</style>
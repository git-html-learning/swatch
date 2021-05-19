<template>
  <!-- 这个组件把设备详情和编辑设备放在一起了 -->
  <div
    class="content"
    v-loading="loading"
    :element-loading-text="loadingtext"
    element-loading-spinner="el-icon-loading"
  >
    <!-- 设备详情 -->
    <el-form>
      <el-form-item label="设备名" :label-width="labelWidth">
        <el-input v-model="data.deviceName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="产品名" :label-width="labelWidth">
        <el-input v-model="data.productName" disabled autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="创建日期" :label-width="labelWidth">
        <el-input :value="formdata(data.createdAt)" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="映射名" :label-width="labelWidth">
        <el-input v-model="data.nickname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="设备类型" :label-width="labelWidth">
        <el-input v-model="data.deviceType" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="网络类型" :label-width="labelWidth">
        <!-- <el-input v-model="data.netType" autocomplete="off"></el-input> -->
        <el-select class="Input" v-model="data.netType" placeholder="请选择网络类型">
          <el-option label="4G" value="4G"></el-option>
          <el-option label="3G" value="3G"></el-option>
          <el-option label="NBIOT" value="NBIOT"></el-option>
          <el-option label="LORA" value="LORA"></el-option>
          <el-option labWIFIel="WIFI" value="WIFI"></el-option>
          <el-option label="以太网" value="以太网"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        v-for="(item, index) in data.extraInfo"
        :key="index"
        :label="item.Name"
        :label-width="labelWidth"
      >
        <el-input v-model="item.Value" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item
        v-show="condition==1"
        v-for="(extraInfO, index) in extraInfo1"
        :label="'新增扩展'+index"
        :key="extraInfO.key"
        :prop=" index + 'value'"
        :label-width="labelWidth"
      >
        <el-input v-model="extraInfO.Key" clearable class="Input1" placeholder="扩展字段"></el-input>-
        <el-input
          :value="JSON.stringify(extraInfO.Value)"
          @focus="openDialog(index)"
          class="Input1"
          clearable
          placeholder="扩展值为对象"
        ></el-input>
        <svg-icon icon-class="增加" @click="addExtra(1)"></svg-icon>
        <svg-icon icon-class="减少" @click="removeExtra(extraInfO,1)"></svg-icon>
      </el-form-item>
      <el-form-item label="设备最新数据" :label-width="labelWidth">
        <pre>{{data.newData}}</pre>
      </el-form-item>
    </el-form>

    <!-- 编辑设备信息 -->
    <!-- 打开对话框输入扩展对象 -->
    <el-dialog title="添加扩展信息" append-to-body :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item
          v-for="(extraInfO, index) in extraInfo2"
          label
          :key="extraInfO.key"
          :prop=" index + 'value'"
          :label-width="labelWidth"
        >
          <el-row :gutter="2">
            <el-col :span="6">
              <el-input v-model="extraInfO.Key" disabled clearable placeholder="扩展字段"></el-input>
            </el-col>
            <el-col :span="16">
              <el-row>
                <el-col :span="1">
                  <svg-icon icon-class="冒号" style="font-size:10px"></svg-icon>
                </el-col>
                <el-col :span="23">
                  <el-input
                    v-if="extraInfO.Key=='Name'||extraInfO.Key=='Value'"
                    v-model="extraInfO.Value"
                    clearable
                    placeholder="必选"
                  ></el-input>
                  <div v-else>
                    <el-radio v-model="extraInfO.Value" border size="small" :label="true">true</el-radio>
                    <el-radio v-model="extraInfO.Value" border size="small" :label="false">false</el-radio>
                  </div>
                </el-col>
          
              </el-row>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="offdialog">确 定</el-button>
      </div>
    </el-dialog>
    <div slot="footer" class="dialog-footer" v-show="condition==1">
      <el-button size="mini" @click="closeDialog">取 消</el-button>
      <el-button size="mini" type="primary" @click="updateDevice">提 交</el-button>
    </div>
  </div>
</template>





<script>
import { dataType, updated_device, NewDeviceDataOne } from "@/api/index";
export default {
  data() {
    return {
      extraInfo1: [{ Key: "", Value: {} }], //对象输入框
      extraInfo2: [
        { Key: "Name", Value: "" },
        { Key: "Value", Value: "" },
        { Key: "adminEditable", Value: true },
        { Key: "adminVisible", Value: true },
        { Key: "userEditable", Value: true },
        { Key: "userVisible", Value: true },
      ], //对话框
      labelWidth: "110px",
      extraInfo3: {}, //保存每个对象的历史记录
      addExtraInfo: {},
      extraInfo1Length: 0,
      dialogFormVisible: false,
      data: {},
      loading: true,
      loadingtext: "数据加载中",
    };
  },
  watch: {
    devicedetail: {
      /**这个是使用了handler和 immediate: true,使用这两个属性，
       当immediate为true是就会在第一次监听devicedetail的时候就会触发函数。
       如果不适用的话就会首次改变不触发函数 */
      async handler(newValue) {
        this.loading = true;
        var deviceKeys = [];
        deviceKeys.push(newValue.deviceKey);
        var payload = {
          productKey: newValue.productKey,
          deviceKey: deviceKeys,
        };
        await NewDeviceDataOne(payload).then((res) => {
          if (res.code == 200) {
            newValue["newData"] = res.data.deviceData;
            this.$store.commit('RES_deviceDetail', res.data.deviceData)
          } else {
            newValue["newData"] = { data: "无数据" };
          }
        });
        this.loading = false;
        this.data = newValue;
      },
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
    updateDevice() {
      updated_device(this.devicedetail).then((res) => {
              

        if (res.code == 200) {
          this.back();
          this.$message({
            showClose: true,
            message: "设备信息更新成功!",
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
    addExtra(val) {
      if (val == 1) {
        this.extraInfo1.push({
          Key: "",
          Value: {},
        });
      } else {
        this.extraInfo2.push({
          Key: "",
          Value: "",
        });
      }
    },
    removeExtra(item, index) {
      if (index == 1) {
        var index = this.extraInfo1.indexOf(item);
        if (index > 0) {
          this.extraInfo1.splice(index, 1);
        }
      } else {
        var index = this.extraInfo2.indexOf(item);
        if (index > 0) {
          this.extraInfo2.splice(index, 1);
        }
      }
    },

    openDialog(index) {
      this.dialogFormVisible = true;
      //这个代表第几个对象
      this.extraInfo1Length = index;
      var Value = JSON.stringify(this.extraInfo1[index].Value);
      if (Value == "{}") {
        this.extraInfo2 = [
          { Key: "Name", Value: "" },
          { Key: "Value", Value: "" },
          { Key: "adminEditable", Value: true },
          { Key: "adminVisible", Value: true },
          { Key: "userEditable", Value: true },
          { Key: "userVisible", Value: true },
        ];
      } else {
        var objvalue = Object.values(this.extraInfo3);
        this.extraInfo2 = objvalue[index];
      }
    },
    offdialog() {
      //这个是为了在关闭扩展对话框亲对数据进行操作。把之前的数据放入到extraInfo1中，方便于push数据进行编辑
      var _this = this;
      _this.dialogFormVisible = false;
      _this.extraInfo3[_this.extraInfo1Length] = _this.extraInfo2;
      for (let index = 0; index < _this.extraInfo2.length; index++) {
        _this.extraInfo1[_this.extraInfo1Length].Value[
          _this.extraInfo2[index].Key
        ] = _this.extraInfo2[index].Value;
      }
      this.extraInfo1.map((val) => {
        this.devicedetail.extraInfo[val.Key] = val.Value;
      });
    },
    back() {
      this.$router.go(0);
    },
  },
  props: ["devicedetail", "condition"],
  // props: {
  //   condition: {
  //     type: Number,
  //     default: 0,
  //   },
  //   devicedetail: {
  //     type: Object,
  //     default: null,
  //   },
  // },
};
</script>
<style lang="less" scoped>
.content {
  .dialog-footer {
    padding: 10px 20px 20px;
    text-align: right;
  }
  /deep/.el-input {
    width: 60%;
  }
  .Input {
    width: 100%;
  }
  pre {
    // color: red;
    border: 1px solid #dcdfe6;
    border-radius: 5px;
    width: 60%;
    padding: 5px;
    min-height: 40px;
    background-color: #f5f7fa;
  }

  .Input1 {
    width: 20.5vw;
  }
  /deep/ .Input3 {
    width: 10px;
  }
}
</style>
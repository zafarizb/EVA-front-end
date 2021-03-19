<template>
<div>
    <p style="float: left">个人信息</p>
  <br></br>
  <br></br>
  <el-form ref="form" :model="form" label-width="440px">
    <el-form-item label="用户名">
      <el-col :span="11">
      <el-input v-model="form.name" disabled="true"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="邮箱">
      <el-col :span="11">
      <el-input v-model="form.email" disabled="true"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="真实姓名">
      <el-col :span="11">
      <el-input placeholder="请输入您的真实姓名" v-model="form.realname"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="手机号码">
      <el-col :span="11">
      <el-input placeholder="请输入您的11位手机号码" v-model="form.number"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="所属单位">
      <el-col :span="11">
      <el-input placeholder="请输入您的所在单位" v-model="form.address"></el-input>
      </el-col>
    </el-form-item>
      <el-button type="primary" @click="onSubmit" dispaly="flex">立即修改</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        address: "",
        realname: "",
        number: "",
      },
    };
  },
  methods: {
    onSubmit() {
      this.$confirm("确定修改信息吗？", {
        confirmButtonText: "确定",
        cancleButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .post("//127.0.0.1:8000/user/modify", {
              address: this.form.address,
              number: this.form.number,
              realname: this.form.realname,
              userid: sessionStorage.getItem("accessToken"),
            })
            .then((res) => res.data)
            .then((data) => {
              console.log(data);
              if (data.status == 1) {
                this.$message({
                  type: "success",
                  message: "修改成功",
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "修改失败",
          });
        });
    },
  },

  created: function () {
    var _this = this;
    this.$axios({
      //创建接口
      methods: "get", //类型为get请求
      url: "//127.0.0.1:8000/user/detail", //请求的接口地址
      params: {
        userid: sessionStorage.getItem("accessToken"),
      },
    }).then(function (response) {
      //请求成功返回
      _this.form.name = response.data.data.name;
      _this.form.address = response.data.data.address;
      _this.form.email = response.data.data.email;
      _this.form.realname = response.data.data.realname;
      _this.form.number = response.data.data.phone; //数据打包，打包在data
      console.log(response.data);
    });
  },
};
</script>
<style scoped>
</style>
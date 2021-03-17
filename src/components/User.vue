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
    <el-form-item label="学院">
      <el-col :span="11">
      <el-input v-model="form.institute"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="学号">
      <el-col :span="11">
      <el-input v-model="form.id"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="手机号码">
      <el-col :span="11">
      <el-input v-model="form.number"></el-input>
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
        id: "",
        institute: "",
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
            .post("//127.0.0.1:8000/user/detail", {
              institue: this.form.institute,
              number: this.form.number,
              id: this.form.id,
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
      _this.form.name = response.data.name;
      _this.form.id = response.data.id;
      _this.form.email = response.data.email;
      _this.form.institute = response.data.institute;
      _this.form.number = response.data.number; //数据打包，打包在data
      console.log(response.data);
    });
  },
};
</script>
<style scoped>
</style>
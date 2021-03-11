<template>
  <div class="login clearfix">
    <div class="login-wrap">
      <el-row type="flex" justify="center">
        <el-form ref="loginForm" :model="user" status-icon label-width="80px">
          <h3>修改密码</h3>
          <hr />
          <el-form-item prop="username" label="用户名">
            <el-input
              v-model="user.username"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="oldpassword" label="旧密码">
            <el-input
              v-model="user.oldpassword"
              show-password
              placeholder="请输入旧密码"
            ></el-input>
          </el-form-item>
          <el-form-item prop="newpassword" label="新密码1">
            <el-input
              v-model="user.newpassword"
              show-password
              placeholder="请输入新密码"
            ></el-input>
          </el-form-item>
          <el-form-item prop="newpassword1" label="新密码2">
            <el-input
              v-model="user.newpassword1"
              show-password
              placeholder="确认新密码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon @click="doChange()"
              >确认修改</el-button
            >
          </el-form-item>
        </el-form>
      </el-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "login",
  data() {
    return {
      user: {
        username: "",
        oldpassword: "",
        newpassword: "",
        newpassword1: "",
      },
    };
  },
  created() {},
  methods: {
    doChange() {
      if (!this.user.username) {
        this.$message.error("请输入用户名！");
      } else if (!this.user.oldpassword) {
        this.$message.error("请输入原始密码！");
      } else if (!this.user.newpassword) {
        this.$message.error("请输入新密码！");
      } else if (!this.user.newpassword1) {
        this.$message.error("请再次输入新密码！");
      } else if (this.user.newpassword1 != this.user.newpassword) {
        this.$message.error("新密码不一致！");
      } else {
        console.log("do change");
        // this.$router.push({ path: "/" }); //无需向后台提交数据，方便前台调试
        axios
          .post("//127.0.0.1:8000/user/Change", {
            username: this.user.username,
            password: this.user.oldpassword,
          })
          .then((res) => {
            console.log(res.data);
            if (res.data.status == 1) {
              alert("请您重新登录！");
              this.$router.push({ path: "/Login" });
            } else {
              alert("您输入的用户名已存在！");
            }
          });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  width: 100%;
  height: 100%;
  /* height: 740px; */
  display: flex;
  align-items: center;
  overflow: hidden;
}
.login-wrap {
  background-size: cover;
  width: 100%;
  overflow: hidden;
  padding-top: 10px;
  line-height: 40px;
}

h3 {
  color: #0babeab8;
  font-size: 24px;
}
hr {
  background-color: #444;
  margin: 20px auto;
}

.el-button {
  width: 80%;
  margin-left: -50px;
}
</style>

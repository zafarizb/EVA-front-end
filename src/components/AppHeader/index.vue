<template>
  <!-- logo和文字 -->
  <div class="header">
    <a href="#/">
      <!-- 点击进入首页 -->
      <img class="logo" src="@/assets/logo.png" width="25px" />
      <span class="company">边缘视频分析原型系统</span>
    </a>
    <!-- logo和文字结束 -->

    <!--  下拉菜单-->
    <el-dropdown @command="handleCommand"
      ><!--  绑定指令,在methods里定义-->
      <span class="el-dropdown-link">
        您好，admin
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <!-- icon是修改图标 ，command是点击后传给方法的值-->
        <el-dropdown-item icon="el-icon-edit" command="edit"
          >>修改密码</el-dropdown-item
        >

        <el-dropdown-item icon="el-icon-s-operation" command="quit"
          >>退出登录</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
    <!--  下拉菜单结束-->
  </div>
</template>

<script>
export default {
  methods: {
    handleCommand (command) {
      switch (command) {
        case 'edit':
          console.log('修改密码')
          this.$router.push('/change')
          break
        case 'quit':
          console.log('退出登录')
          this.$router.push('/login')
          break
      }
    }
  }
}
</script>

<style scoped>
/* logo */
.logo {
  vertical-align: middle; /* 居中 */
  padding: 0px 10px 0px 40px; /* 上右下左 */
}

/* 文字 */
.company {
  position: absolute;
  color: white;
}

/* 下拉菜单 */
.el-dropdown {
  float: right; /* 浮动在右边 */
  margin-right: 40px; /* 靠右40px */
}
/* 系统管理 */
.el-dropdown-link {
  color: white;
  cursor: pointer; /* 鼠标放上去是手的形状 */
}
</style>

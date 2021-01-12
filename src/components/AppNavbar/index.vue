<template>  <!-- 使用element的导航菜单 -->
  <div class="navbar">
    <!--default-active默认选中的菜单，选中后颜色是 active-text-color  -->
    <!--  :router='true',true表示开启路由模式，开启之后，index值代表的就是路由地址-->
    <!--  :router='true'开启之后点击就会跳转到对应的路由，默认为false -->
    <!-- text-color 文字的颜色 -->
    <el-menu :router='true' default-active="/Main" class="el-menu-vertical-demo" background-color="#545c64"
      text-color="#fff" active-text-color="#ffd04b">

      <!-- 首页  class就是对应的icon -->
      <el-menu-item index="/Main">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>

      <!-- 视频分析-->
      <el-menu-item index="/Video">
        <i class="el-icon-s-custom"></i>
        <span slot="title">视频分析</span>
      </el-menu-item>

      <!-- 图像分析 -->
      <el-menu-item index="/Page">
        <i class="el-icon-menu"></i>
        <span slot="title">图像分析</span>
      </el-menu-item>

      <!-- 关于我们 -->
      <el-menu-item index="/About">
        <i class="el-icon-suitcase-1"></i>
        <span slot="title">关于我们</span>
      </el-menu-item>

      <!-- 待定功能 -->
      <el-menu-item index="/Other">
        <i class="el-icon-user"></i>
        <span slot="title">待定功能</span>
      </el-menu-item>

    </el-menu>
  </div>
</template>


<style scoped>
  /* 去掉右边框 */
  .el-menu {
    border-right: none;
  }
</style>
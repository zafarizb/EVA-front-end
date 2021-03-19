<template>
  <!-- 使用element的导航菜单 -->
  <div class="navbar">
    <!--default-active默认选中的菜单，选中后颜色是 active-text-color  -->
    <!--  :router='true',true表示开启路由模式，开启之后，index值代表的就是路由地址-->
    <!--  :router='true'开启之后点击就会跳转到对应的路由，默认为false -->
    <!-- text-color 文字的颜色 -->
    <el-menu
      :router="true"
      default-active="/Main"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <!-- 首页  class就是对应的icon -->
      <el-menu-item index="/Main">
        <i class="el-icon-menu"></i>
        <span slot="title">我的控制台</span>
      </el-menu-item>

      <!-- 视频分析-->
      <el-menu-item index="/Video">
        <i class="el-icon-video-camera"></i>
        <span slot="title">视频分析</span>
      </el-menu-item>

      <!-- 图像分析 -->
      <el-menu-item index="/Page">
        <i class="el-icon-picture-outline"></i>
        <span slot="title">图像分析</span>
      </el-menu-item>

      <!-- 文件管理 -->
      <el-menu-item index="/load">
        <i class="el-icon-folder-opened"></i>
        <span slot="title">文件管理</span>
      </el-menu-item>
      
      <!-- 个人信息 -->
      <el-menu-item index="/User">
        <i class="el-icon-user-solid"></i>
        <span slot="title">个人信息</span>
      </el-menu-item>
      
      <!-- 系统公告 -->
      <el-menu-item index="/About">
        <i class="el-icon-info"></i>
        <span slot="title">系统公告</span>
      </el-menu-item>

      <!-- 新闻资讯 -->
      <el-menu-item index="/Other">
        <i class="el-icon-more"></i>
        <span slot="title">新闻资讯</span>
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

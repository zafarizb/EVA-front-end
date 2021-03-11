
<template>
  <div>
    <el-table :data="tableData" border:ture border style="width: 100%">
      <el-table-column prop="info" label="图像分析任务信息"> </el-table-column>
    </el-table>
    <div class="demo-image">
      <img :src="picurl" alt="page" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          info: "任务名称: ttt",
        },
        {
          info: "任务状态：完成",
        },
        {
          info: "执行模型：",
        },
        {
          info: "文件名:",
        },
        {
          info: "任务创建时间：",
        },
        {
          info: "任务完成时间：",
        },
      ],
      picurl: "", //图片url
    };
  },
  created: function () {
    var _this = this;
    try {
      //请求信息
      this.$axios({
        //创建接口
        methods: "get", //类型为get请求
        url: "//127.0.0.1:8000/image/detail", //请求的接口地址
        params: {
          url: this.$route.path,
          userid: sessionStorage.getItem("accessToken"),
        },
      }).then(function (response) {
        //请求成功返回
        _this.tableData = response.data.tableData; //数据打包，打包在data中创建的数组
        console.log(response.data);
      });
      //请求图片
      this.$axios({
        method: "get",
        url: "http://127.0.0.1:8000/image/getPic",
        params: {
          url: this.$route.path,
          userid: sessionStorage.getItem("accessToken"),
        },
      }).then(function (response) {
        _this.picurl =
          "data:image/jpeg;base64," + response.data;
      });
    } catch (e) {
      console.error(e);
    }
  },
};
</script>



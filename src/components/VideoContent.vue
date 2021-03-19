
<template>
  <div>
    <el-page-header @back="goBack" content=""> </el-page-header>
    <br></br>
    <el-table :data="tableData" border:ture border style="width: 100%">
      <el-table-column prop="info" label="视频分析任务信息与结果"> </el-table-column>
    </el-table>
      <el-select v-model="pagenum" placeholder="请选择展示的图片" @change="select()">
            <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label">
            </el-option>
        </el-select>
    <div class="demo-image">
      <img :src="picurl" alt="page" />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      console.log("go back");
      this.$router.push({ path: "/Video" });
    },
    select() {
      console.log(this.pagenum);
      try {
        this.$axios({
          //创建接口
          methods: "get", //类型为get请求
          url: "//127.0.0.1:8000/video/getPic", //请求的接口地址
          params: {
            pagenum: this.pagenum,
            userid: sessionStorage.getItem("accessToken"),
          },
        }).then(function (response) {
          this.picurl = "data:image/jpeg;base64," + response.data;
        });
      } catch (e) {
        console.error(e);
      }
    },
  },
  data() {
    return {
      tableData: [
        {
          info: "任务名称: ttt 任务创建时间：",
        },
        {
          info: "任务状态：完成 文件名:",
        },
        {
          info: "执行模型:   任务完成时间：",
        },
      ],
      options: [
        {
          value: "1.png",
          label: "1",
        },
        {
          value: "2.png",
          label: "2",
        },
      ],
      pagenum: "",
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
        url: "//127.0.0.1:8000/video/detail", //请求的接口地址
        params: {
          url: this.$route.path,
          userid: sessionStorage.getItem("accessToken"),
        },
      }).then(function (response) {
        //请求成功返回
        _this.tableData = response.data.tableData; //数据打包，打包在data中创建的数组
        _this.options = response.data.options;
        console.log(response.data);
      });
      //请求图片
    } catch (e) {
      console.error(e);
    }
  },
};
</script>
<style scoped>
.el-select {
  padding-right: 1070px;
}
</style>

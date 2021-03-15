<template>
  <div>
    <p style="float: left">用户文件管理列表</p>
    <div class="upload">
      <el-upload
        class="upload-demo"
        action="doupload()"
        accept="image/jpeg,image/png,aplication/zip"
        :before-upload="before_Upload"
        ref="newupload"
        :data="data"
        multiple
        :file-list="fileList"
        :show-file-list="false"
        multiple
      >
        <el-button size="big" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">
          允许上传jpg/png图片和zip视频文件
        </div>
      </el-upload>
          </div>
    <div class="form">
      <el-table :data="tableData" height="600" border style="width: 100%">
        <el-table-column prop="name" label="文件名称" width="250">
        </el-table-column>
        <el-table-column prop="model" label="执行模型" width="250">
        </el-table-column>
        <el-table-column prop="state" label="任务状态" width="250">
        </el-table-column>
        <el-table-column prop="date" label="创建时间" width="250">
        </el-table-column>
        <el-table-column prop="action" label="操作">
          <template slot-scope="scope">
            <el-button @click="download(scope.$index)" type="text" size="small"
              >下载文件</el-button
            >
            <el-button
              @click.native.prevent="deletePro(scope.$index)"
              type="text"
              size="small"
            >
              删除文件
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [],
      tableData: [
        {
          date: "2016-05-03",
          name: "ttt",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
      ],
    };
  },
  methods: {
    doupload() {
      return "//127.0.0.1:8000/file/upload";
    },
    //上传
    before_Upload(file) {
      //  表单提交方式
      let FormDatas = new FormData();
      FormDatas.append("file", file);
      console.log(FormDatas);
      let that = this;
      that
        .$http({
          method: "post",
          url: "//127.0.0.1:8000/file/upload", //  二次接口
          headers: headers("multipart/form-data"),
          data: FormDatas,
        })
        .then(function (res) {
          if (res.data.code == 1) {
            that.$message.success(res.data.msg);
          } else {
            that.$message.error(res.data.msg);
          }
        });
    },
    //下载
    download(index) {
      var name = this.tableData[index].name;
      let that = this;
      let formData = new FormData();
      formData.append("filename", name);
      console.log(formData);
      this.$http({
        url: "//127.0.0.1:8000/file/download",
        method: "POST",
        headers: headers("multipart/form-data"),
        responseType: "blob",
        data: formData,
      })
        .then(function (res) {
          let result = res.data;
          let url = window.URL.createObjectURL(new Blob([result])); //处理文档流
          let link = document.createElement("a");
          link.style.display = "none";
          link.href = url;

          link.download = fileTye;
          document.body.appendChild(link);
          link.click();
        })
        .catch(function (error) {
          that.$message.error(error);
        });
    },
    deletePro(index) {
      this.$confirm("确定删除该文件吗？", {
        confirmButtonText: "确定",
        cancleButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          var name = this.tableData[index].name;
          console.log(name);
          this.$axios
            .post("//127.0.0.1:8000/file/delete", {
              name: name,
              userid: sessionStorage.getItem("accessToken"),
            })
            .then((res) => res.data)
            .then((data) => {
              console.log(data);
              if (data.status == 1) {
                this.tableData.splice(index, 1);
                this.$message({
                  type: "success",
                  message: "删除成功",
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  created: function () {
    var _this = this;
    this.$axios({
      //创建接口
      methods: "get", //类型为get请求
      url: "//127.0.0.1:8000/file/info", //请求的接口地址
      params: {
        userid: sessionStorage.getItem("accessToken"),
      },
    }).then(function (response) {
      //请求成功返回
      _this.tableData = response.data.tableData; //数据打包，打包在data中创建的数组
      console.log(response.data);
    });
  },
};
</script>
<style scoped>
.upload {
  padding-left: 1100px;
  padding-top: 0px;
}
</style>
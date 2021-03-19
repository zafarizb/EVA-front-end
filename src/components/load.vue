<template>
  <div>
    <p style="float: left">用户文件管理列表</p>
    <div class="upload">
      <el-upload
        class="upload-demo"
        :action="doupload()"
        accept="image/jpeg,image/png,aplication/zip"
        :before-upload="before_Upload"
        ref="newupload"
        :data="data"
        multiple
        :file-list="fileList"
        :show-file-list="false"
      >
        <el-button size="big" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">
          允许上传jpg/png和zip格式文件
        </div>
      </el-upload>
      <el-button
        class="download-demo"
        type="primary"
        @click="dialogFormVisible = true"
        >下载任务结果</el-button
      >
      <el-dialog title="下载信息" :visible.sync="dialogFormVisible">
        <el-form
          :model="form"
          ref="dataForm"
          label-position="left"
          label-width="90px"
          style="width: 400px; margin-left: 50px"
        >
          <el-form-item label="任务结果" :prop="file">
            <el-select
              v-model="form.file"
              class="filter-item"
              placeholder="请选择任务"
            >
              <el-option
                v-for="item in tableOption"
                :lable="item.label"
                :key="item.key"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="createPro()">确 定</el-button>
        </div>
      </el-dialog>

    </div>
    <div class="form">
      <el-table :data="tableData" height="600" border style="width: 100%">
        <el-table-column prop="name" label="文件名称" width="250">
        </el-table-column>
        <el-table-column prop="date" label="创建时间" width="250">
        </el-table-column>
        <el-table-column prop="action" label="操作">
          <template 
            slot-scope="scope"
            v-if="tableData[scope.$index].name.includes('.')"
          >
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
          name: "ttt.zip",
        },
        {
          date: "2016-05-03",
          name: "ttt.png",
        },
      ],
      tableOption: [
        { label: "C://user//image//page1", key: "图像1" },
        { label: "C://user//image//page2", key: "图像2" },
      ],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        file: "",
      },
      formLabelWidth: "80px",
    };
  },
  methods: {
    doupload() {
      return "//127.0.0.1:8000/file/nothing";
    },
    //上传
    before_Upload(file) {
      //  表单提交方式
      let FormDatas = new FormData();
      FormDatas.append("userid", sessionStorage.getItem("accessToken"));
      FormDatas.append("file", file);
      console.log(FormDatas);
      let that = this;
      that
        .$axios({
          method: "post",
          url: "//127.0.0.1:8000/file/upload", //  二次接口
          headers: { "Content-Type": "multipart/form-data" },
          data: FormDatas,
        })
        .then(function (res) {
          if (res.data.status == 1) {
            that.$message.success(res.data.msg);
          } else {
            that.$message.error(res.data.msg);
          }
        });
    },
    //下载
    download(index) {
      var filename = this.tableData[index].name;
      let that = this;
      this.$axios({
        method: "get",
        url: "//127.0.0.1:8000/file/download",
        responseType: "blob",
        params: {
          name: filename,
          userid: sessionStorage.getItem("accessToken"),
        },
      })
        .then(function (res) {
          let result = res.data;
          let url = window.URL.createObjectURL(new Blob([result])); //处理文档流
          let link = document.createElement("a");
          link.href = url;

          link.download = filename;
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
    createPro() {
      if (!this.form.file) {
        this.$message.error("请选择任务！");
      } else {
        var filename = this.form.file;
        let that = this;
        this.$axios({
          method: "get",
          url: "//127.0.0.1:8000/file/downloadresult",
          responseType: "blob",
          params: {
            name: filename,
            userid: sessionStorage.getItem("accessToken"),
          },
        })
          .then(function (res) {
            let result = res.data;
            let url = window.URL.createObjectURL(new Blob([result])); //处理文档流
            let link = document.createElement("a");
            link.href = url;

            link.download = filename + ".zip";
            document.body.appendChild(link);
            link.click();
          })
          .catch(function (error) {
            that.$message.error(error);
          });
      }
    },
  },
  created: function () {
    var _this = this;
    this.$axios({
      //创建接口
      methods: "get", //类型为get请求
      url: "//127.0.0.1:8000/file", //请求的接口地址
      params: {
        userid: sessionStorage.getItem("accessToken"),
      },
    }).then(function (response) {
      //请求成功返回
      _this.tableData = response.data.tableData; //数据打包，打包在data中创建的数组
      _this.tableOption = response.data.tableOption;
      console.log(response.data);
    });
  },
};
</script>
<style scoped>
.upload {
  /* padding-left: 1100px; */
  float: right;
  padding-top: 0px;
  display: inline-flex;
  align-items: baseline;
}
.upload-demo {
  padding-right: 0px;
  display: inline-block;
}
</style>
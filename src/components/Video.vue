<template>
  <div>
    <p style="float: left">视频分析任务列表</p>
    <div class="tab-container">
      <el-button
        type="primary"
        style="float: right"
        icon="el-icon-edit"
        @click="dialogFormVisible = true"
        >添加任务</el-button
      >
      <el-dialog title="任务信息" :visible.sync="dialogFormVisible">
        <el-form
          :model="form"
          ref="dataForm"
          label-position="left"
          label-width="90px"
          style="width: 400px; margin-left: 50px"
        >
          <el-form-item label="任务名称" prop="name">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="任务文件夹" :prop="file">
            <el-select
              v-model="form.file"
              class="filter-item"
              placeholder="请选择文件夹"
            >
              <el-option
                v-for="item in tableOption"
                :lable="item.label"
                :key="item.key"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="执行模型" :prop="model">
            <el-select v-model="form.model" placeholder="请选择模型">
              <el-option label="ssd" value="1"></el-option>
              <el-option label="faster_rcnn" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="模型划分点" :prop="pl">
            <el-select v-model="form.pl" placeholder="请选择模型划分点">
              <el-option label="不执行" value="0"></el-option>
              <el-option label="划分点1" value="1"></el-option>
              <el-option label="划分点2" value="2"></el-option>
              <el-option label="划分点3" value="3"></el-option>
              <el-option label="划分点4" value="4"></el-option>
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
        <el-table-column prop="name" label="任务名称" width="250">
        </el-table-column>
        <el-table-column prop="model" label="执行模型" width="250">
        </el-table-column>
        <el-table-column prop="state" label="任务状态" width="250">
        </el-table-column>
        <el-table-column prop="date" label="创建时间" width="250">
        </el-table-column>
        <el-table-column prop="action" label="操作">
          <template slot-scope="scope">
            <el-button @click="infocheck(scope.$index)" type="text" size="small"
              >查看详情</el-button
            >
            <el-button
              @click.native.prevent="deletePro(scope.$index)"
              type="text"
              size="small"
            >
              删除任务
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["reload"],
  methods: {
    infocheck(index) {
      var name = this.tableData[index].name;
      this.$router.push("/Video/" + name);//实现对应文件名路由跳转
    },
    deletePro(index) {
      this.$confirm("确定删除这条任务吗？", {
        confirmButtonText: "确定",
        cancleButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          var name = this.tableData[index].name;
          console.log(name);
          this.$axios
            .post("//127.0.0.1:8000/video/delete", {
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
      if (!this.form.name) {
        this.$message.error("请输入任务名！");
      } else if (!this.form.model) {
        this.$message.error("请选择模型！");
      } else if (!this.form.file) {
        this.$message.error("请选择文件夹！");
      } else if (!this.form.pl) {
        this.$message.error("请选择模型划分点！");
      } else {
        this.$axios
          .post("//127.0.0.1:8000/video/create", {
            name: this.form.name,
            file: this.form.file,
            model: this.form.model,
            pl: this.form.pl,
            userid: sessionStorage.getItem("accessToken"),
          })
          .then((res) => {
            console.log(res.data);
            if (res.data.status == 1) {
              this.reload();
              alert("添加任务成功！");
            } else {
              alert("添加任务失败！");
            }
          });
      }
    },
  },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          name: "ttt",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-02",
          name: "zzz",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
      ],
      tableOption: [
        { label: "C://user//video//page1", key: "视频1" },
        { label: "C://user//video//page2", key: "视频2" },
      ],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "",
        model: "",
        file: "",
      },
      formLabelWidth: "80px",
    };
  },
  created: function () {
    var _this = this;
    this.$axios({
      //创建接口
      methods: "get", //类型为get请求
      url: "//127.0.0.1:8000/video", //请求的接口地址
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
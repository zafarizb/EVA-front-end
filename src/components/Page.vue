<template>
  <div>
    <p style="float: left">图像分析</p>
    <div class="tab-container">
      <el-button
        type="primary"
        style="float: right"
        @click="dialogFormVisible = true"
        >添加任务</el-button
      >
      <el-dialog title="任务信息" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="任务名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="任务文件" :label-width="formLabelWidth">
            <el-input v-model="form.file" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="执行模型" :label-width="formLabelWidth">
            <el-select v-model="form.model" placeholder="请选择模型">
              <el-option label="模型一" value="ssd"></el-option>
              <el-option label="模型二" value="faster_rcnn"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false"
            >确 定</el-button
          >
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
            <el-button
              @click="handleClick(scope.$index, scope.row)"
              type="text"
              size="small"
              >查看详情</el-button
            >
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData)"
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
  methods: {
    handleClick(index, row) {
      console.log(index, row);
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
  },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
      ],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "120px",
    };
  },
  created: function () {
    var _this = this;
    this.$axios({
      //创建接口
      methods: "get", //类型为get请求
      url: "//127.0.0.1:8000/image", //请求的接口地址
    }).then(function (response) {
      //请求成功返回
      _this.tableData = response.data.tableData; //数据打包，打包在data中创建的数组 我这里是focus数组
      // console.log(response.data)
    });
  },
};
</script>
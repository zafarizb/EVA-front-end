<template>
  <div>
  <div id="Main_vue">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card>
          <img src="../assets/investor.png" class="image">
          <div style="padding: 14px;">
            <span>用户</span>
            <div class="bottom clearfix">
              <small>展示当前用户数目</small>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <img src="../assets/investment.png" class="image">
          <div style="padding: 14px;">
            <span>功能</span>
            <div class="bottom clearfix">
              <small>展示系统功能</small>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <img src="../assets/liuliang.png" class="image">
          <div style="padding: 14px;">
            <span>平台</span>
            <div class="bottom clearfix">
              <small>展示该系统依赖平台</small>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <img src="../assets/liuliang.png" class="image">
          <div style="padding: 14px;">
            <span>其他</span>
            <div class="bottom clearfix">
              <small>其他待定模块</small>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
   </div>
   <br></br>
   <div style="float: left; width: 50%">
      <el-table :data="tableData1" stripe style="width: 100%">
        <el-table-column prop="notice" label="通知公告" width="450">
          <template slot-scope="scope">
            <a href="scope.row.notice" target="_blank" class="buttonText">{{
              scope.row.notice
            }}</a>
          </template>
        </el-table-column>

        <el-table-column prop="date1" width="100">
          <template slot="header" slot-scope="scope">
            <a href="" target="_blank">更多<<</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="margin-left: 50%; width: 50%">
      <el-table :data="tableData2" stripe style="width: 100%">
        <el-table-column prop="msg" label="新闻资讯" width="450">
          <template slot-scope="scope">
            <a href="scope.row.msg" target="_blank" class="buttonText">{{
              scope.row.msg
            }}</a>
          </template>
        </el-table-column>

        <el-table-column prop="date2" width="100">
          <template slot="header" slot-scope="scope">
            <a href="" target="_blank">更多<<</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
   </div>
</template>
<script>
export default {
  data() {
    return {
      tableData1: [
        {
          notice: "校内天梯选拔赛开始报名啦！",
          date1: "2020-3-6",
        },
        {
          notice: "校内天梯选拔赛开始报名啦！",
          date1: "2020-3-6",
        },
        {
          notice: "校内天梯选拔赛开始报名啦！",
          date1: "2020-3-6",
        },
        {
          notice: "校内天梯选拔赛开始报名啦！",
          date1: "2020-3-6",
        },
      ],
      tableData2: [
        {
          msg: "校内天梯选拔赛开始报名啦！",
          date2: "2020-3-6",
        },
        {
          msg: "校内天梯选拔赛开始报名啦！",
          date2: "2020-3-6",
        },
        {
          msg: "校内天梯选拔赛开始报名啦！",
          date2: "2020-3-6",
        },
        {
          msg: "校内天梯选拔赛开始报名啦！",
          date2: "2020-3-6",
        },
      ],
    };
  },
};
</script>

<style>
#Main_vue img.image {
  width: 128px;
  height: 128px;
  display: block;
  margin: 0 auto;
  border-radius: 6px;
}

#Main_vue .bottom small {
  color: #888;
}
a {
  color: #7ac804;
}
</style>

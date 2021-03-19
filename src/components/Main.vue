<template>
  <div>
  <div id="Main_vue">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card>
          <img src="../assets/investor.png" class="image">
          <div style="padding: 14px;">
            <span>40%</span>
            <div class="bottom clearfix">
              <small>您的用户资料完整度</small>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <img src="../assets/investment.png" class="image">
          <div style="padding: 14px;">
            <span>3</span>
            <div class="bottom clearfix">
              <small>您创建的任务数量</small>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <img src="../assets/liuliang.png" class="image">
          <div style="padding: 14px;">
            <span>100%</span>
            <div class="bottom clearfix">
              <small>您的任务完成率</small>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <img src="../assets/liuliang.png" class="image">
          <div style="padding: 14px;">
            <span>4.5%</span>
            <div class="bottom clearfix">
              <small>您的存储空间占用率</small>
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
          notice: "请各位完善个人信息！",
          date1: "2021-3-18",
        },
        {
          notice: "视频分析模块使用说明",
          date1: "2021-3-18",
        },
        {
          notice: "文件管理模块使用说明",
          date1: "2021-3-18",
        },
        {
          notice: "本系统更新说明1.0",
          date1: "2021-3-18",
        },
      ],
      tableData2: [
        {
          msg: "视频分析在新兴应用领域",
          date2: "2021-3-18",
        },
        {
          msg: "视频分析简介",
          date2: "2021-3-18",
        },
        {
          msg: "5G时代，把AI技术运用于视频分析",
          date2: "2021-3-18",
        },
        {
          msg: "转发：5G时代下视频领域的应用探索及市场分析",
          date2: "2021-3-18",
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

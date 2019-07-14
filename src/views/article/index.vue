<template>
  <div class="container">
    <!-- 筛选 -->
    <el-card>
      <div slot="header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 筛选容器内容 -->
      <el-form :model="reqParams" size="small" label-width="80px">
        <el-form-item label="状态：">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <el-select v-model="reqParams.channel_id">
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :ladel="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间：">
          <el-date-picker
            v-model="dataValues"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="danger">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 结果容器 -->
    <el-card></el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 提交给后台的条件， 传参
      // 数据默认是'空'还是null的区别
      // 空 数据会发给后台，   null  不会发字段给后台
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null

      },
      // 默认频道数据
      channelOptions: [{ name: 'java', id: 1 }],
      // 日期控件的数据
      dataValues: []
    }
  }
}
</script>

<style scoped lang='less'>
//  .el-card 是组件  解析后标签的名字不是el-card,标签上雷鸣和自定义标签名字是一样的
.el-card {
  margin-bottom: 20px;
}
</style>

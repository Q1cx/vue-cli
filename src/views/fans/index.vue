<template>
<div class='container'>
    <el-card>
        <div slot="header">
            <my-bread>粉丝管理</my-bread>
        </div>
        <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="粉丝列表" name="list">粉丝列表</el-tab-pane>
            <el-tab-pane label="粉丝画像" name="charts">粉丝画像</el-tab-pane>
            <div ref="dar" style="width:600px;height:400px"></div>
        </el-tabs>
    </el-card>
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      activeName: 'charts'
    }
  },
  mounted () {
    const dom = this.$refs.der
    const myEcharts = echarts.init(dom)
    const options = {}
    myEcharts.setOption(options)
  }
}
</script>
<style scoped lang='less'>
</style>

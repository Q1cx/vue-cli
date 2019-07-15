<template>
  <div class="container">
    <!-- 筛选 -->
    <el-card>
      <div slot="header">
        <my-bread>内容管理</my-bread>
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
            value-format="yyyy-MM-dd"
            @change='changeDate'
            v-model="dataValues"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="search()">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 结果容器 -->
    <el-card>

      <div slot="header">
        根据筛选条件宫查询到<strong>0</strong>条结果:
      </div>

      <el-table :data="articles">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image lazy :src="scope.row.cover.images[0]" style="width:100px;height:75px;">
              <div slot="error" class="image-slot">
                <img src="../../assets/images/error.gif" alt width="100px" height="75px" />
              </div>
            </el-image>
          </template>
        </el-table-column>

        <el-table-column label="标题" prop="title"></el-table-column>

        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="发布时间" prop="pubdate"></el-table-column>

        <el-table-column label="操作" width="160px">
          <template slot-scope="scope">
            <el-button icon="el-icon-edit" plain circle type="primary"></el-button>
            <el-button icon="el-icon-delete" plain circle type="danger"></el-button>
          </template>
        </el-table-column>

      </el-table>
      <div class="box">
        <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
      </div>
    </el-card>
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
      channelOptions: [{ name: 'Java', id: 1 }],
      // 日期控件的数据
      dataValues: [],
      // 文章列表
      articles: []
    }
  },
  created () {
    // 获取频道数据
    this.getChannelOptions()
    // 获取列表数据
    this.getArticles()
  },
  methods: {
    search () {
      this.getArticles()
    },
    changeDate (values) {
    // 给begin    end 赋值 即可
      this.reqParams.begin_pubdate = values[0]
      this.reqParams.end_pubdate = values[1]
    },
    async getChannelOptions () {
      // const o ={data:{}}: const {data} = o;一层解构  对象的结构一层
      // const o ={data:{data:{channels:[]}}}; 多层结构   const  {data:{data:data}}
      const {
        data: { data }
      } = await this.axios.get('channels')
      this.channelOptions = data.channels
    },
    async getArticles () {
      // post 参数  axios.post('url',(参数对象))
      // get 传参   axios.get('url',{params:{参数对象}})
      const {
        data: { data }
      } = await this.axios.get('articles', { params: this.reqParams })
      this.articles = data.results
    }
  }
}
</script>

<style scoped lang='less'>
//  .el-card 是组件  解析后标签的名字不是el-card,标签上雷鸣和自定义标签名字是一样的
.el-card {
  margin-bottom: 20px;
}
.box {
  margin-top: 20px;
  text-align: center;
}
</style>

<template>
  <div class="login-container">
    <!-- 卡片 -->
    <el-card class="login_box">
      <img src="../../assets/images/logo_index.png" alt />
      <!-- 表单 -->
      <el-form status-icon ref="loginForm" :model="loginForm" :rules="loginRules">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:280px"></el-input>
          <el-button style="float:right">发送验证吗</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked"></el-checkbox>我已阅读并同意
          <el-link type="primary">用户协议</el-link>和
          <el-link type="primary">隐私协议</el-link>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" type="primary" @click="login()">登陆</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    // 检验手机号码
    const checkMobile = (rule, value, callback) => {
      // 检验逻辑
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('号码格式不正确'))
      }
    }
    return {
      // 对应表单数据
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      // 表单校验规则对象
      loginRules: {
        mobile: [
          // 具体的校验规则  比如长度  是否必填  格式等
          { required: true, message: '手机号为必填项', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }

        ],
        code: [
          { required: true, message: '请输入正确的验证码', trigger: 'blur' },
          { len: 6, message: '验证码必须是6位', trigger: 'blur' }

        ]
      },
      // 默认选中复选框
      checked: true
    }
  },
  methods: {
    // 整体表单的校验
    login () {
      // this.$refs.loginForm.validate((valid) => {
      //   if (valid) {
      //     // 如果检验成功，进行登陆
      //     this.axios.post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.loginForm)
      //       .then(res => {
      //       // res是相应对象   不是相应数据
      //         const data = res.data
      //         // 后台的返回的json内容   已经互赞换成了对象
      //         console.log(data.token)
      //         // 登录后要做的事情
      //         // 1、跳转到首页
      //         // 2、保持登录状态
      //         // a.保存登录后返回的用户信息，包含token
      //         // b。使用sessionStorage 来存储 关闭浏览器的会话事项
      //         window.sessionStorage.setItem('hm73-tt', JSON.stringify(res.data.data))
      //         this.$router.push('/')
      //       })
      //       .catch(() => {
      //         // 错误提示  消息组件提示
      //         this.$message.error('用户名或密码错误')
      //       })
      //   }
      // })
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          // 当借口调用失败的时候  代码出现异常
          // try(代码   业务逻辑) catch (err) {业务逻辑失败调用catch，进行错误的处理}
          try {
            const res = await this.axios.post('authorizations', this.loginForm)
            window.sessionStorage.setItem('hm73-tt', JSON.stringify(res.data.data))
            this.$router.push('/')
          }catch (err) {
            //  错误提示  消息组件提示
            this.$message.error('用户名或密码错误')
          }
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
  .login_box {
    width: 450px;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    img {
      display: block;
      width: 200px;
      margin: 10px auto 30px;
    }
  }
}
.el-checkbox {
  margin-right: 1px;
}
</style>

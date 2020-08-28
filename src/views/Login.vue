<template>
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item prop="code">
      <el-input type="text" v-model="ruleForm2.code" auto-complete="off" placeholder="验证码" style="width:200px;"></el-input>
      <el-image :src="code" @click="setImgCode"></el-image>
    </el-form-item>
<!--
    <el-checkbox v-model="checked"  class="remember">记住密码</el-checkbox>
-->
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">{{ mess }}</el-button>
      <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
    </el-form-item>
  </el-form>
</template>

<script>
  import {post,get} from '../request/Http'
  import {inform} from "../utils/inform";

  export default {
    data() {
      return {
        code:'http://localhost:8080/createImageCode',
        mess:'登录',
        logining: false,
        ruleForm2: {
          account: 'admin',
          checkPass: ''
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ],
         code: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ]
        },
        checked: true
      };
    },
    methods: {
      setImgCode(){

        this.code='http://localhost:8080/createImageCode?'+new Date();
      },
      handleReset2() {
        this.$refs.ruleForm2.resetFields();
      },
      handleSubmit2(ev) {
        var _this = this;
        this.mess='正在登陆'
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            //_this.$router.replace('/table');
            this.logining = true;
            //NProgress.start();
            var loginParams = { username: this.ruleForm2.account, password: this.ruleForm2.checkPass,code:this.ruleForm2.code };
            post('/my',loginParams).then(data=>{
              if (data.code==200){
                sessionStorage.setItem("menus",JSON.stringify(data.data.admin.menus));
                sessionStorage.setItem("admin",JSON.stringify(data.data.admin))
               // sessionStorage.setItem('token',data.data.token);
                this.$store.commit('SER_MENUS',data.data.admin.menus);
                this.$store.commit('SET_ADMIN',data.data.admin);

                this.$router.push({ path: '/' })
              }

              inform(data,()=> {
                this.mess='登录'
                this.ruleForm2.code=''
                this.code='http://localhost:8080/createImageCode?'+new Date();
                this.ruleForm2.checkPass='';
              })

            })
            this.logining=false;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    },
    mounted(){
      history.pushState(null, null, document.URL);
      window.addEventListener('popstate',function () {
        history.pushState(null, null, document.URL);
      })
    }
  }

</script>

<style lang="scss" scoped>
  img{
    margin-top: 50px;
  }
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
    .el-image {
      width: 80px;
      height: 30px;
      position: absolute;
      top: 5px;
      left: 210px;
    }
  }
</style>

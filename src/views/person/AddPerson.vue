<template>
    <div>
      <el-dialog title="添加员工" :visible.sync="DialogVisible":show="show" :before-close="handleClose"  >

        <el-form :model="admins" style="width: 400px;" ref="admins" :rules="rules">
          <el-form-item label="账号" :label-width="formLabelWidth" prop="aname">
            <el-input v-model="admins.aname" ></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth" prop="apass">
            <el-input v-model="admins.apass" type="password" ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" :label-width="formLabelWidth" prop="pass">
            <el-input v-model="admins.pass" ></el-input>
          </el-form-item>
          <el-form-item label="头像" :label-width="formLabelWidth" >
            <el-avatar :size="80"  @error="true">
              <img :src="admins.head"/>
            </el-avatar>
            <div>
              <input type="file" ref="file" id="btn_file" style="display:none" @change="upload">
              <el-button size="mini" @click="save" type="primary" :loading="loading">上传头像</el-button>
            </div>
          </el-form-item>
          <el-form-item label="真实姓名" :label-width="formLabelWidth" prop="name">
            <el-input v-model="admins.name" autocomplete="off" ></el-input>
          </el-form-item>
          <el-form-item label="身份证号" :label-width="formLabelWidth" prop="idcard">
            <el-input v-model="admins.idcard" autocomplete="off" ></el-input>
          </el-form-item>
          <el-form-item label="手机号" :label-width="formLabelWidth" >
            <el-input v-model="admins.phone" ></el-input>
          </el-form-item>

          <el-form-item label="部门" :label-width="formLabelWidth" >
            <el-select   placeholder="请选择" v-model="admins.role.did"  @change="deptChange(admins.role.did)">
              <el-option
                v-for="item in depts"
                :key="item.did"
                :label="item.dname"
                :value="item.did">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="职位" :label-width="formLabelWidth">
            <el-select  placeholder="请选择" v-model="admins.rid"   >
              <el-option
                v-for="item in roles"
                :key="item.rid"
                :label="item.rname"
                :value="item.rid">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="地址" :label-width="formLabelWidth" >
            <el-cascader
              size="large"
              v-model="admins.city"
              :options="options"
              :props="{ expandTrigger: 'hover' }"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="详情地址" :label-width="formLabelWidth" prop="address">
            <el-input v-model="admins.address" ></el-input>
          </el-form-item>

          <el-form-item :label-width="formLabelWidth">
          <el-button type="primary" @click="onSubmit('admins')" >添加员工</el-button>
          <el-button>取消</el-button>
          </el-form-item>

        </el-form>


      </el-dialog>

    </div>
</template>

<script>
  import {validateAname,validateApass,validateEnApass,validateIdcard,validateAddress} from "../../api/validate";
  import { provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data'
  import {get,put1,post,put,postjson} from "../../request/Http";
  import { mapGetters,mapState } from 'vuex'
  import {error,warning,success} from "../../utils/inform";

  export default {

        props:{
         show:{
            type:Boolean,
            default:()=> false
          }
        },
        data(){
          return{
            DialogVisible:this.show,
            formLabelWidth: '100px',
            admins:{
              apass:'',
              role:{

                rid:0
              }
            },
            depts:[],
            roles:[],
            loading:false,
            options:provinceAndCityData,
            rules: {
              aname: [
                {required: true, message: '账号不能为空', trigger: 'blur'},
                {validator: validateAname, trigger: 'blur'}
              ],
              apass:[
                {required: true, message: '密码不能为空', trigger: 'blur'},
                {validator:  validateApass, trigger: 'blur'}
              ],
              pass:[
                {required: true, message: '密码不能为空', trigger: 'blur'},
                {validator:  validateEnApass(()=>this.admins.apass), trigger: 'blur'}
              ],
              name:[
                {required: true, message: '真实姓名必须填写', trigger: 'blur'},
              ],
              idcard:[
                {required: true, message: '身份证号必须填写', trigger: 'blur'},
                {validator:validateIdcard, trigger: 'blur'}
              ],
              address:[
                {required: true, message: '请输入详情地址', trigger: 'blur'},
                {validator:validateAddress(()=>this.admins.ad), trigger: 'blur'}



              ]
            }
          }
        },
      created(){
        post('/Department/query').then(data=>{
          if (this.admin.rid!=1){
            this.depts=data.filter(function (item,index) {
              return item.did!=1006;
            })
          }
          this.depts=data;
        })
      },
    computed:{
      ...mapGetters(['admin','menus']),
      myHeader(){
        return {
          "Access-Control-Allow-Credentials": "true"
        }
      }
    },
      watch: {
        show () {
          this.DialogVisible = this.show
        }
      },
      methods:{
        handleClose(done) {
         const _this=this;
          this.$confirm('确认关闭？')
            .then(_ => {
              _this.admins={
                apass:'',
                role:{

                  rid:0
                }
              };
              this.$emit('update:show', false);
              done();
            })
            .catch(_ => {});
        },
        save() {
          document.getElementById("btn_file").click();
        },
        upload(){
          this.loading=true;

          if (null!=this.$refs.file.files[0]){
            let formData = new FormData();
            formData.append('file', this.$refs.file.files[0]);
            this.$http.post('/test/upload', formData, {
              'Content-Type': 'multipart/form-data'
            }).then(data => {

              if(data.data.code==200){
                success(data.data.data.msg);
                this.admins.head=data.data.data.head;
              }else {
                error(data.data.msg)
              }
              this.loading=false;
            })
          }else {

          }
        },
        handleChange(value) {
          let i="";
            let city=[CodeToText[value[0]],CodeToText[value[1]]];
            city.forEach(function (item,index) {
              i+=item+"";

            })
            this.admins.ad=i;
            this.admins.address=i;
            this.admins.nativePlave=city.toString()


        },
        deptChange(did){
          get('/Department/queryrole', {did}).then(data => {
            this.roles=data;
            this.admins.role.rid=this.roles[0].rid;
          })
        },
        onSubmit(forName){
          this.$refs[forName].validate((valid) => {
            //console.log(this.admins)
            postjson('/person/add',JSON.stringify(this.admins)).then(data=>{
              //console.log(data)
              if (data.code==200){
               success(data.data,()=>{
                 this.$emit('update:show', false);
                  this.admins={
                    apass:'',
                    role:{

                      rid:0
                    }
                  };
                })
              }

            })
          })
        }
      }

    }
</script>

<style scoped>

</style>

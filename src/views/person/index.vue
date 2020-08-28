<template>
    <div>
      <el-button @click="ADDAdmin">添加员工</el-button>
     <el-table

       :row-class-name="tableRowClassName"
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%;">
       <el-table-column
         label="编号"
         prop="id"
         width="50">
       </el-table-column>
       <el-table-column
         label="账号"
         prop="aname"
         width="100">
       </el-table-column>
       <el-table-column
         label="真实姓名"
         prop="name"
         width="100">
       </el-table-column>
       <el-table-column
         label="性别"
         :formatter="format"

         prop="gender"
         width="70">
       </el-table-column>
       <el-table-column
         label="手机号"
         prop="phone"
         width="150">
       </el-table-column>

       <el-table-column
         label="籍贯"
         prop="nativePlave"
         width="130">
       </el-table-column>
       <el-table-column
         label="入职日期"
         prop="beginDate"
         width="100">
       </el-table-column>
       <el-table-column
         label="手机号"
         prop="phone"
         width="190">
       </el-table-column>
       <el-table-column
         label="职位"
         prop="role.rname"
         width="100">
       </el-table-column>
       <el-table-column
         label="状态"
         prop="isenble"
         :formatter="format"
         width="100">
       </el-table-column>
        <el-table-column
          align="left">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"/>
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row,'修改')"
            >修改</el-button>
            <el-button v-if="scope.row.isenble==1&&admin.id!=scope.row.id"
                       size="mini"
                       type="danger"
                @click="stateDialog(scope.$index, scope.row,'锁定')"
            >
              锁定
            </el-button>
            <el-button v-else-if="scope.row.isenble==0&&admin.id!=scope.row.id"
                        size="mini"
                        type="primary"
                       @click="stateDialog(scope.$index, scope.row,'解锁')">
              解锁
            </el-button>

          </template>
        </el-table-column>
      </el-table>
      <el-row>

        <el-col :span="3" :offset="5">
          <el-pagination
            background
            layout="sizes,total, prev, pager, next, jumper"
            :total="total"
            :page-sizes="[3, 5, 10, 20]"
            :page-size="pageSize"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
          >
          </el-pagination>
        </el-col>
      </el-row>
      <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        <span style="margin-left: 90px;" v-if="lock==true">确定要将<span style="color: red">{{person.name }}</span>账号锁定码？？？</span>
        <span style="margin-left: 90px;" v-else>确定要将<span style="color: red">{{person.name }}</span>账号解封吗？？？</span>

        <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false" size="mini">取 消</el-button>
    <el-button type="primary" @click="lockAdmin" size="mini">确 定</el-button>
        </span>
      </el-dialog>


      <el-dialog title="修改员工" :visible.sync="dialogFormVisible" :before-close="handleClose">
        <el-form :model="person" style="width: 400px;" ref="person" :rules="rules">
          <el-form-item label="头像" :label-width="formLabelWidth" >
            <el-avatar :size="80"  @error="true">
              <img :src="person.head"/>
            </el-avatar>
            <div>
            <input type="file" ref="file" id="btn_file" style="display:none" @change="upload">
            <el-button size="mini" @click="save" type="primary" :loading="loading">修改头像</el-button>
            </div>
          </el-form-item>
          <el-form-item label="账号" :label-width="formLabelWidth" prop="aname">
            <el-input v-model="person.aname" autocomplete="off" ></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" :label-width="formLabelWidth" prop="name">
            <el-input v-model="person.name" autocomplete="off" ></el-input>
          </el-form-item>
          <el-form-item label="地址" :label-width="formLabelWidth" prop="city">
            <el-cascader
              size="large"
              v-model="person.city"
              :options="options"
              :props="{ expandTrigger: 'hover' }"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="详情地址" :label-width="formLabelWidth" prop="address">
            <el-input v-model="person.address" ></el-input>
          </el-form-item>



          <el-form-item label="部门" :label-width="formLabelWidth" v-if="person.rid!=1">
            <el-select   placeholder="请选择" v-model="person.role.did" @change="deptChange(person.role.did)" >
              <el-option
                v-for="item in depts"
                :key="item.did"
                :label="item.dname"
                :value="item.did">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="职位" :label-width="formLabelWidth" v-if="person.rid!=1">
            <el-select  placeholder="请选择" v-model="person.role.rid"   >
              <el-option
                v-for="item in roles"
                :key="item.rid"
                :label="item.rname"
                :value="item.rid">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="职位" :label-width="formLabelWidth" v-else>
           <el-input value="首席执行官" disabled></el-input>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth">
            <el-button type="primary" @click="onSubmit('person')">修改</el-button>
            <el-button @click="boo = false">取消</el-button>
          </el-form-item>
        </el-form>

      </el-dialog>
      <add-person :show.sync="sonDialogVisible"></add-person>

    </div>
</template>

<script>
  let aname;
  let city="";
  import { provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data'
  import {cityData,proData} from "../../data/city";
  import { mapGetters,mapState } from 'vuex'
import {testauth} from "../../utils/testRouter";
  import {get,put1,post,put} from "../../request/Http";
  import {error,warning,success} from "../../utils/inform";
  var validateAname= (rule, value, callback) => {
    if(value.length>10||value.length<3){
      return callback(new Error("账号在4到10为字符"))
    }
    if (value!=aname) {
      get('/test/findname', {aname: value}).then(data => {
        if (data == 1) {
          callback(new Error('账号已存在'));
        } else {
          callback();

        }
      })
    }else{
      callback();
    }
    //callback();
  }
  var validateAddress= (rule, value, callback) => {

    if (value.indexOf(city)==0){

      callback();
    }
    callback(new Error('籍贯和地址不一致'));

  }

  function pageAdmin(pageNum,pageSize,th_is) {
    get('/person/select',{pageNum,pageSize}).then(data=>{
      th_is.tableData=data.list;
      th_is.total=data.total;
      th_is.pageSize=data.pageSize
    })
  }
  import AddPerson from './AddPerson'

  export default {
        name: "index",
        components:{
          AddPerson
        },
    computed:{
    ...mapGetters(['admin','menus']),
      myHeader(){
        return {
          "Access-Control-Allow-Credentials": "true"
        }
      }
    },
        data(){
          return{
            sonDialogVisible:false,
            formLabelWidth: '100px',
            tableData:[],
            search: '',
            total:0,
            pageSize:0,
            val:3,
            centerDialogVisible: false,
            person:{
              role:{
                did:0,
                rid:0
              }
            },
            lock:false,
            dialogFormVisible:false,
            loading:false,
            options:provinceAndCityData,
            city:[],
            depts:[],
            roles:[],
            index:0,
            rules:{
              aname: [
                { required: true, message: '账号不能为空', trigger: 'blur' },
                {validator:validateAname,trigger:'blur'},
              ],
              city:[
                { required: true, message: '地址不能为空', trigger: 'blur' }
              ],
              address:[
                { required: true, message: '地址详情不能为空', trigger: 'blur' },
                {validator:validateAddress,trigger:'blur'}
              ],
              name:[
                { required: true, message: '真实姓名不能为空', trigger: 'blur' }

              ]
            }

          }
        },

      created(){

        post('/Department/query').then(data=>{
        //  console.log(this.admin.rid)
          if (this.admin.rid!=1){

            this.depts=data.filter(function (item,index) {

              return item.did!=1006;

            })
          }
          this.depts=data;





        })

        pageAdmin(null,null,this);
      },
    methods:{
      ADDAdmin(){
        if(testauth(this.menus,'/person/add')){

          this.sonDialogVisible=true;
        }else {
          warning("对不起,您没有该权限")
        }

    },
    onSubmit(forName){
      delete this.person.authorities;

      if (this.person.nativePlave.constructor!=String){
         this.person.nativePlave=CodeToText[this.person.nativePlave[0]]+","+CodeToText[this.person.nativePlave[1]];

      }

         this.$refs[forName].validate((valid) => {
        put('/person/update',JSON.stringify(this.person)).then(data=>{
          if (data.code==200){
            success(data.data,()=>{
              this.dialogFormVisible=false;
              this.tableData[this.index]=this.person;
            })
          }

        })
      })
    },
      deptChange(did){
        get('/Department/queryrole', {did}).then(data => {
          this.roles=data;
          this.person.role.rid=this.roles[0].rid;
        })
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
              //console.log(data.data.data)
              this.person.head=data.data.data.head;
            }else {
              error(data.data.msg)
            }
            this.loading=false;
          })
        }else {

        }
      },
      save() {
        document.getElementById("btn_file").click();
      },
        handleEdit(index,row,mess)
      {
        if (testauth(this.menus,'/person/update')) {
          this.index=index;
          this.person = {}
          this.person = Object.assign({}, row);
          aname = this.person.aname;
          this.person.city = this.person.nativePlave.split(",");
          city = ""
          this.person.city.forEach(function (item, index) {
            city += item + "";
          })
          this.person.city = TextToCode[this.person.city[0]][this.person.city[1]].code;
          this.dialogFormVisible = true;


          get('/Department/queryrole', {did: this.person.role.did}).then(data => {
            this.roles = data;
          })
        }else {
          warning("对不起,您没有该权限")

        }

        //console.log(this.person)
      },
      stateDialog(index,row,mess){
       this.lock=mess=='锁定'?true:false;
        let path=mess=='锁定'?'/person/lock':mess=='解锁'?'/person/enlock':null;
        if (null!=path) {
          if (testauth(this.menus,path)) {
            this.centerDialogVisible = true;
            this.person = row;
          }else {
            warning("对不起,您没有该权限")
          }
        }

      },
      handleSizeChange(val){
        this.val=val;
        pageAdmin(this.pageNum,val,this)

      },
      handleCurrentChange(pageNum){
        this.pageSize=pageNum;
        pageAdmin(pageNum,this.val,this)
      },
      format: function(row, column) {
        if (column.property=="gender"){
          return row.gender==1?'男':'女'
        }else if (column.property=='endDate') {
          return row.endDate==null?'在职':row.endDate
        }else if (column.property=='isenble'){
          return row.isenble==1?'正常':'锁定'
        }
      },
      tableRowClassName(row,rowIndex) {
        if(row.row.isenble===0){
          return 'row';
        }
        return '';

      },
      lockAdmin(){
        if (this.lock) {
          put1('/person/lock', {id: this.person.id}).then(data => {
            if (data.code == 200) {
              success(data.msg, () => {
                this.centerDialogVisible = false;
                pageAdmin(this.pageNum, this.pageSize, this);

              })
            }
          })
        }else {
          put1('/person/enlock', {id: this.person.id}).then(data => {
            if (data.code == 200) {
              success(data.msg, () => {
                this.centerDialogVisible = false;
                pageAdmin(this.pageNum, this.pageSize, this);

              })
            }
          })
        }
      },
      handleChange(value) {
        let i="";
        if (null!=this.person.city){
          this.city=[CodeToText[value[0]],CodeToText[value[1]]];


          this.city.forEach(function (item,index) {
            i+=item+"";
          })
          this.person.address=i;
          city=i;
          this.person.nativePlave=this.person.city
        }

      //  console.log(this.person)
      },

    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.clearValidate('person')
          done();
        })
        .catch(_ => {});
    },
      //清楚校验
      clearValidate(formName) {
        this.$refs[formName].clearValidate();
      }
      },
    change(e){
          this.$forceUpdate();
      var val = e;
      if(val != ""){
        this.person.singleTotal = parseFloat(val*this.form2.brand.price).toFixed(2);
      }else{
        this.person.singleTotal = parseFloat(0).toFixed(2);
      }
    }
    }
</script>

<style>
  .el-table .row{
      background: #99FF99

    }
 .el-form .el-input{
    width: 220px;
  }
</style>

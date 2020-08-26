<template>
    <div>
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
         width="100">
       </el-table-column>
       <el-table-column
         label="手机号"
         prop="phone"
         width="150">
       </el-table-column>

       <el-table-column
         label="籍贯"
         prop="nativePlave"
         width="100">
       </el-table-column>
       <el-table-column
         label="入职日期"
         prop="beginDate"
         width="100">
       </el-table-column>
       <el-table-column
         label="离职日期"
         prop="endDate"
         :formatter="format"
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


      <el-dialog title="修改员工" :visible.sync="dialogFormVisible">
        <el-form :model="person" style="width: 400px;">
          <el-form-item label="头像" :label-width="formLabelWidth" >
            <el-avatar :size="80"  @error="true">
              <img :src="person.head"/>
            </el-avatar>
            <div>
            <input type="file" ref="file" id="btn_file" style="display:none" @change="upload">
            <el-button size="mini" @click="save" type="primary" :loading="loading">修改头像</el-button>
            </div>
          </el-form-item>
          <el-form-item label="账号" :label-width="formLabelWidth">
            <el-input v-model="person.aname" autocomplete="off"></el-input>
          </el-form-item>

          <!--<el-form-item label="活动区域" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>-->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <!--<el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>-->
        </div>
      </el-dialog>


    </div>
</template>

<script>
  import { mapGetters,mapState } from 'vuex'
import {testauth} from "../../utils/testRouter";
  import {get,put1,post} from "../../request/Http";
  import {error,warning,success} from "../../utils/inform";

  function pageAdmin(pageNum,pageSize,th_is) {
    get('/person/select',{pageNum,pageSize}).then(data=>{
      th_is.tableData=data.list;
      th_is.total=data.total;
      th_is.pageSize=data.pageSize
    })
  }

  export default {
        name: "index",
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
            formLabelWidth: '120px',
            tableData:[],
            search: '',
            total:0,
            pageSize:0,
            val:3,
            centerDialogVisible: false,
            person:{},
            lock:false,
            dialogFormVisible:false,
            loading:false

          }
        },

      created(){
        pageAdmin(null,null,this);
      },
    methods:{
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
              console.log(data.data.data)
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
            this.person=Object.assign({},row);
            this.dialogFormVisible=true;

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
      }
      }
    }
</script>

<style>
  .el-table .row{
      background: #99FF99

    }
</style>

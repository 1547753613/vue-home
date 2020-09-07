<template>
    <div>
      <el-table
        :row-class-name="tableRowClassName"
        :data="tableData"
        style="width: 100%;">
        <el-table-column
          label="编号"
          prop="lid"
          width="50">
        </el-table-column>
        <el-table-column
          label="头像"
          prop="head"
          width="70">
          <template   slot-scope="scope">
            <img :src="scope.row.head"  min-width="40" height="40" />
          </template>
        </el-table-column>
        <el-table-column
          label="姓名"
          prop="realname"
          width="70">
        </el-table-column>
        <el-table-column
          label="手机号"
          prop="phone"
          width="108">
        </el-table-column>
        <el-table-column
          label="身份证号"
          prop="idcard"
          width="200">
        </el-table-column>

        <el-table-column
          label="所在地"
          prop="address"
          width="300"
          align="center">
        </el-table-column>
        <el-table-column
          label="账户"
          prop="account"
          width="120">
        </el-table-column>
        <el-table-column
          label="状态"
          prop="state"
          :formatter="format"
          width="80">
        </el-table-column>
        <el-table-column
          label="房源数"
          prop="houses"
          :formatter="format"
          width="80">
        </el-table-column>
        <el-table-column
          align="left">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              @keyup.native="searchName()"
              size="mini"
              placeholder="输入房东搜索"/>
          </template>

          <template slot-scope="scope">
            <el-button
                       size="mini"
                       @click="LandDetails(scope.$index, scope.row)"
            >查看详情</el-button>
            <el-button v-if="scope.row.state==1"
                       size="mini"
                       type="danger"
                       @click="stateDialog(scope.$index, scope.row,'锁定')"
            >
              锁定
            </el-button>
            <el-button v-else
                       size="mini"
                       type="primary"
                       @click="stateDialog(scope.$index, scope.row,'解封')"
            >
              解封
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
            :page-sizes="[ 5, 10, 20]"
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
        <span style="margin-left: 90px;" v-if="lock==true">确定要将<span style="color: red">房东:{{landlord.realname }}</span>账号锁定码？？？</span>
        <span style="margin-left: 90px;" v-else>确定要将<span style="color: red">房东:{{landlord.realname }}</span>账号解封吗？？？</span>

        <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false" size="mini">取 消</el-button>
    <el-button type="primary"  size="mini" @click="lockLandlord">确 定</el-button>
        </span>
      </el-dialog>
      <l-details :show.sync="LandlordDetails" :landlord.sync="landlord"></l-details>
      </div>
</template>

<script>
  import {get,put1,post,put} from "../../request/Http";
  import {error, warning, success, inform} from "../../utils/inform";
  import {testauth} from "../../utils/testRouter";
  import { mapGetters,mapState } from 'vuex'
  import details from './details'
  function pageLandlord(pageNum,pageSize,realname,_this) {
      get('/landlord/select',{pageNum,pageSize,realname}).then(data=>{
        _this.tableData=data.list;
        _this.total=data.total;
        _this.pageSize=data.pageSize;
        _this.pageNum=data.pageNum;
      })
    }

  export default {
        name: "index",
        components:{
           LDetails:details
        },
        data(){
          return{
            tableData:[],
            search: '',
            total:0,
            pageSize:0,
            pageNum:0,
            lock:false,
            centerDialogVisible:false,
            landlord:{},
            LandlordDetails:false

          }
        },
    computed:{
      ...mapGetters(['admin','menus'])

    },
        created(){
          get('/landlord/select').then(data=>{
            this.tableData=data.list;
            this.total=data.total;
            this.pageSize=data.pageSize;
            this.pageNum=data.pageNum;
          })
        },
    methods:{
      handleCurrentChange(pageNum){
        this.pageNum=pageNum;
        pageLandlord(pageNum,this.pageSize,null,this);
      },
      handleSizeChange(val){
        this.pageSize=val;
        pageLandlord(this.pageNum,this.pageSize,null,this);
      },
      searchName(){
        pageLandlord(this.pageNum,this.pageSize,this.search,this);
      },
      format: function(row, column) {
        if (column.property=="state") {
          return row.state == 1 ? '正常' : '禁用'
        }else if(column.property=="houses"){
          return row.houses.length+"套";
        }
      },
      tableRowClassName(row,rowIndex) {
        if(row.row.state===0){
          return 'row';
        }
        return '';
      },
      stateDialog(index,row,mess){
        this.lock=mess=='锁定'?true:false;
        let path=mess=='锁定'?'/landlord/lock':mess=='解封'?'/landlord/enlock':null;
        if (null!=path) {
          if (testauth(this.menus,path)) {
            this.centerDialogVisible = true;
            this.landlord=row;
          }else {
            warning("对不起,您没有该权限")
          }
        }
      },
      lockLandlord(){
        if (this.lock){
          put1('/landlord/lock',{id:this.landlord.lid}).then(data=>{
            if (data.code==200) {
              inform(data,()=>{
                this.centerDialogVisible=false
                pageLandlord(this.pageNum,this.pageSize,this.search,this);
              });
            }
          })
        }else{
          put1('/landlord/enlock',{id:this.landlord.lid}).then(data=>{
            if (data.code==200) {
              inform(data,()=>{
                this.centerDialogVisible=false
                pageLandlord(this.pageNum,this.pageSize,this.search,this);
              });
            }
          })
        }
      },
      LandDetails(index,row){
        this.LandlordDetails=true;
        this.landlord=row;
        //console.log(this.landlord)
      }

    }
    }
</script>

<style>
  .el-table .row{
    background: oldlace;

  }
</style>

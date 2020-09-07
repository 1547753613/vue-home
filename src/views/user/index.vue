<template>
    <div>
      <el-table
        :data="tableData"
        style="width: 90%; margin: 0 auto;">
        <el-table-column
          label="编号"
          prop="uid"
          width="50">
        </el-table-column>
        <el-table-column
          label="昵称"
          prop="uname"
          width="150">
        </el-table-column>
        <el-table-column
          label="手机号"
          prop="phone"
          width="200">
        </el-table-column>
        <el-table-column
          label="真实姓名"
          prop="learname"
          width="150">
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
          label="认证身份证号"
          prop="idcard"
          width="200">
        </el-table-column>
        <el-table-column
          label="状态"
          prop="state"
          width="100">
        </el-table-column>
        <el-table-column
          align="left">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              @keyup.native="searchName()"
              placeholder="输入用户昵称搜索"/>
          </template>

          <template slot-scope="scope">
            <el-button
              size="mini"
            >查看详情</el-button>


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
    </div>
</template>

<script>
  function pageUser(pageNum,pageSize,realname,_this) {
    _this.$get('/test/userAll',{pageNum,pageSize,realname}).then(data=>{
      _this.total=data.total;
      _this.tableData=data.list;
      _this.pageNum=data.pageNum;
      _this.pageSize=data.pageSize;
    })
  }
    export default {
        name: "index",
        data(){
          return{
            tableData:[],
            total:0,
            pageNum:0,
            pageSize:0,
            search:''
          }
        },
      mounted(){
        pageUser(null,null,null,this)
      },
      methods:{
        handleCurrentChange(pageNum){
          this.pageNum=pageNum;
          pageUser(pageNum,this.pageSize,this.search,this);
        },
        handleSizeChange(val){
          this.pageSize=val;
          pageUser(this.pageNum,this.pageSize,this.search,this);
        },
        searchName(){
          pageUser(this.pageNum,this.pageSize,this.search,this);
        }
      }
    }
</script>

<style scoped>

</style>

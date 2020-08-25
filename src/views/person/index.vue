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
          align="right">
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
            <el-button v-if="scope.row.isenble==1"
                       size="mini"
                       type="danger">
              锁定
            </el-button>
            <el-button v-else
                        size="mini"
                        type="primary">
              解锁
            </el-button>
           <!-- <el-button
              size="mini"
              type="danger"
              @click="handleEdit(scope.$index, scope.row,'删除')"
            >{{ scope.row.isenble==1?'锁定':'解封'}}</el-button>-->
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

  import {get} from "../../request/Http";

  function pageAdmin(pageNum,pageSize,th_is) {
    get('/person/select',{pageNum,pageSize}).then(data=>{
      th_is.tableData=data.list;
      th_is.total=data.total;
      th_is.pageSize=data.pageSize
    })
  }

  export default {
        name: "index",
        data(){
          return{
            tableData:[],
            search: '',
            total:0,
            pageSize:0,
            val:3
          }
        },
      created(){
        pageAdmin(null,null,this);
      },
    methods:{
      handleEdit(){},
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

      }
      }
    }
</script>

<style>
  .el-table .row{
      background: #99FF99

    }
</style>

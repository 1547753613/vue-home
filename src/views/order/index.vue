<template>
    <div>
      <el-table
        :data="tableData"
        style="width: 90%; margin: 0 auto;">
        <el-table-column
          label="订单编号"
          prop="id"
          width="100">
        </el-table-column>
        <el-table-column
          label="订单房屋地址"
          prop="house.hname"
          width="200">
        </el-table-column>
        <el-table-column
          label="下单用户"
          prop="user.uname"
          width="100">
        </el-table-column>
        <el-table-column
          label="下单手机号"
          prop="user.phone"
          width="120">
        </el-table-column>
        <el-table-column
          label="订单创建时间"
          prop="createtime"
          width="180">
        </el-table-column>
        <el-table-column
          label="房东"
          prop="house.landlord.realname"
          width="100">
        </el-table-column>
        <el-table-column
          label="订单状态"
          prop="status"
          :formatter="format"
          width="100">
        </el-table-column>
        <el-table-column
          fixed="right"
          align="left"
          width="200">
          <template slot="header" slot-scope="scope">
            <el-input
              size="mini"
              placeholder="按房东搜索"/>
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
            :page-sizes="[ 5, 10, 20]"
            :total="total"
            :page-size="pageSize"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  function pageOrder(pageNum,pageSize,id,_this) {
      _this.$get('/order/select',{pageNum,pageSize,id}).then(data=>{
        _this.tableData=data.list;
        _this.total=data.total;
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
            pageSize:0
          }
        },
        mounted(){
          pageOrder(null,null,null,this);
        },
      methods:{
        format: function(row, column) {
          if (column.property=="status"){
            let status=row.status
            //return row.status==1?'男':'女'
           switch (status) {
              case 1:
                return '待支付'
                break;
              case 2:
                return '待入住'
                break;
             case 3:
               return '待退房'
               break;
             case 4:
               return '已完成'
               break;
             case 5:
               return '已关闭'
               break;
             case 6:
               return '待处理'
               break;
             case 7:
               return '已处理'
               break;
             case 8:
               return '维权订单'
               break;
            }
          }
        },
        handleSizeChange(val){
          this.pageSize=val
          pageOrder(this.pageNum,this.pageSize,this.realname,this)

        },
        handleCurrentChange(val){
          this.pageNum=val
          pageOrder(this.pageNum,this.pageSize,this.realname,this)
        },
      }
    }
</script>

<style scoped>

</style>

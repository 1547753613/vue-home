<template>
    <div>

      <el-table
        :row-class-name="tableRowClassName"
        :data="tableData"
        style="width: 100%;">
        <el-table-column
          label="编号"
          prop="id"
          width="50">
        </el-table-column>
        <el-table-column
          label="民宿名称"
          prop="hname"
          width="200">
        </el-table-column>
        <el-table-column
          label="房东"
          prop="landlord.realname"
          width="100">
        </el-table-column>
        <el-table-column
          label="出租方式"
          prop="renttype.tname"
          width="100">
        </el-table-column>
        <el-table-column
          label="房屋类型"
          prop="housetype.hname"
          width="100">
        </el-table-column>
        <el-table-column
          label="房屋面积/m²"
          prop="houseGeneralize.area"
          width="100">
        </el-table-column>
        <el-table-column
          label="状态"
          prop="state"
          width="100">
        </el-table-column>
        <el-table-column
          label="位置"
          prop="houseAddress.city"
          width="200">
        </el-table-column>
        <el-table-column
          label="入住数"
          prop="houseGeneralize.area"
          width="100">
        </el-table-column>
        <el-table-column
          label="好评率"
          prop="houseGeneralize.area"
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
                       @click="houseDetails(scope.$index, scope.row)"
            >查看详情</el-button>

            <el-button
                       size="mini"
                       type="primary"
                       >
              禁用
            </el-button>

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
      <house-details :show.sync="DialogVisible" :house="house" v-if="house.xcoord!=0"></house-details>
    </div>
</template>

<script>
  function pageHouse(pageNum,pageSize,realname,_this) {
    _this.$get('/house/select',{pageNum,pageSize,realname}).then(data=>{
      _this.tableData=data.list;
      _this.total=data.total;
      _this.pageSize=data.pageSize;
      _this.pageNum=data.pageNum;
    })

  }
  import HouseDetails from './details'
    export default {
        name: "index",
        components:{
          HouseDetails
        },
        data(){
          return{
            tableData:[],
            total:0,
            pageSize:0,
            pageNum:0,
            realname:'',
            DialogVisible:false,
            house:{}
          }
        },
        mounted(){
          pageHouse(null,null,null,this)

      },
      methods:{
        tableRowClassName(row,rowIndex) {
          if(row.row.state===0){
            return 'row';
          }
          return '';
        },
        handleSizeChange(val){
          this.pageSize=val
          pageHouse(this.pageNum,this.pageSize,this.realname,this)

        },
        handleCurrentChange(val){
          this.pageNum=val
          pageHouse(this.pageNum,this.pageSize,this.realname,this)
        },
        houseDetails(index,row){

          this.$post('/house/select',{hid:row.id}).then(data=>{
            this.house=data;
            //console.log(this.house)
            this.DialogVisible=true
          //  console.log(data)
          })

        }

      }
    }
</script>

<style>
  .el-table .row{
    background: oldlace;

  }
</style>

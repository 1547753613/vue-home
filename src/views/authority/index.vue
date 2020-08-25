<template>
    <div>
      <h1>权限管理</h1>
      <el-collapse>
        <el-collapse-item  v-for="(item,index) in depts" :title="item.dname" :name="item.did">
          <div><el-button size="mini">测试人员</el-button><el-button size="mini">测试经理</el-button></div>
        </el-collapse-item>

      </el-collapse>
    </div>
</template>

<script>
  import {get} from "../../request/Http";

  export default {
        name: "index",
      data(){
          return{
            depts:[
              {did:1001,dname:'测试部'},
              {did:1002,dname:'人事部'},
              {did:1003,dname:'客服部'}
            ]
          }
      },
      created(){
        get('/authority/queryall').then(data=>{
          console.log(data)
        })
      }
    }
</script>

<style scoped>

</style>

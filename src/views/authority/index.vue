<template>
    <div>
      <h1>权限管理</h1>
      <el-collapse accordion @change="Collchange" v-model="did">
        <el-collapse-item  v-for="(i,index) in depts" :title="i.dname" :name="i.did">
          <div>
            <el-button v-for="item in role" size="mini" @click="SelectRole(item.rid)" :type=" item.rid==id?'primary':'type'">{{ item.rname}}</el-button>
             <div v-if="role.length==0">暂无职位</div>
          </div>


        </el-collapse-item>

      </el-collapse>
      <br/>
      <el-button :disabled="bool" size="medium" @click="setRoleAuth">修改权限</el-button>
      <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        :default-expanded-keys="[1]"
        :default-checked-keys="checked"
        ref="tree">
      </el-tree>
    </div>
</template>

<script>
  import {get,put1,post   } from "../../request/Http";
  import {inform} from "../../utils/inform";

  export default {
        name: "index",
      data(){
          return{
            rid:0,
            bool:true,
            depts:[],
            data:[],
            role:[],
            checked:[],
            did:1,
            id:0
          }
      },
    methods:{
      setRoleAuth(){
        let obj=[...this.$refs.tree.getCheckedKeys(),...this.$refs.tree.getHalfCheckedKeys()];
        put1('/authority/addAuth',{ints:obj,rid:this.rid}).then(data=>{
          if(data.code==200){
            inform(data,()=>{
              this.$refs.tree.setCheckedKeys([]);
              this.bool=true;
            })
          }
        })
      },
      setCheckedKeys() {
        this.$refs.tree.setCheckedKeys([3]);
      },
      Collchange(did){
        this.bool=true;
        if (null!=did) {
          get('/Department/queryrole', {did}).then(data => {
            this.role=data;
          })
        }
      },
      SelectRole(rid){

        this.id=rid;
        this.rid=rid;
        this.bool=false;
        this.$refs.tree.setCheckedKeys([]);
        get('/authority/queryrid',{rid}).then(data=>{
          this.checked=data;
          this.checked = this.checked.filter(item =>{
              let arr=[1,2,3,4,5,6,13,]
            return arr.indexOf(item)==-1;
          });
        })
      }
    },
      created(){
        get('/authority/queryall').then(data=>{
          this.data=data;
        })
        get('/Department/query').then(data=>{
          this.depts=data.filter(function (item,index) {

            return item.did!=1006;

          })

        })
      }
    }
</script>

<style>

</style>

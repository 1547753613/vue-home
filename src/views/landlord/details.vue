<template>
    <div>
      <el-dialog title="房东详情" :visible.sync="DialogVisible":show="show" :before-close="handleClose" v-if="DialogVisible"  >
        <el-card class="box-card">
            <div class="text item">
              <div>房东编号:  {{ LandMap.lid}}</div>
              <el-divider></el-divider>
              <div>房东昵称:  {{ LandMap.nickname}}</div>
              <el-divider></el-divider>
              <div>房东姓名:  {{ LandMap.realname}}</div>
              <el-divider></el-divider>
              <div>房东身份证:  {{ LandMap.idcard}}</div>
              <el-divider></el-divider>
              <div>
                <h3>房东身份证照:</h3>
                <img style="margin-left: 60px;" :src=" LandMap.head" width="40" height="40"/></div>
            </div>
            <el-divider></el-divider>
            <div>房东手机号:  {{ LandMap.phone}}</div>
            <el-divider></el-divider>
            <div>房东地址:  {{ LandMap.address}}</div>
            <el-divider></el-divider>
            <div>房东账户:  {{ LandMap.account}}</div>
            <el-divider></el-divider>
            <div>房东欢迎语:  {{ LandMap.greeting}}</div>
            <el-divider></el-divider>
            <div>房东房屋:  </div>
          <el-divider></el-divider>

          <div v-for="(i,index) in LandMap.houses" style="margin-left: 50px;">
              {{ i.hname}}
              <el-divider></el-divider>

            </div>
        </el-card>


      </el-dialog>
    </div>
</template>

<script>
  import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
  import BmMarker from 'vue-baidu-map/components/overlays/Marker'

    export default {
        props:{
          show:{
            type:Boolean,
            default:()=> false
                },
          landlord:{
              type:Object,
              default:()=>{}
                }
      },
      components: {
        BaiduMap,
        BmMarker
      },
      watch: {
        show () {
          this.DialogVisible = this.show
        },
        landlord () {
          this.LandMap= this.landlord
        }
      },
      data(){
          return{
            DialogVisible:this.show,
            LandMap:this.landlord,
            center: {lng: 0, lat: 0},
            zoom: 18
          }
      },
      methods:{
        handleClose(){
          this.$confirm('确认关闭？')
            .then(_ => {
              this.LandMap={};
              this.$emit('update:show', false);
              this.$emit('update:landlord', {});

              done();
            })
            .catch(_ => {});
        },
        handler ({BMap, map}) {
          this.center.lng = 113.657321
          this.center.lat = 34.730904
          this.zoom = 17
        }
      }
    }
</script>

<style>
  .bm-view {

    width: 700px;
    height: 300px;
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 680px;
  }
</style>

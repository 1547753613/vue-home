<template>
    <div>
      <el-dialog  title="房屋详情"  :visible.sync="DialogVisible" :before-close="handleClose" :show="show" v-if="DialogVisible">
        <el-card class="box-card">
          <div class="text item">

            <div>
              <b>房屋编号</b>:{{House.id}}<span style="margin-left: 250px;"></span><b>房屋名称</b>:{{ House.hname}}</div>
              <br>
            <div>
            <b>房源特色</b>:{{House.feature}}<span style="margin-left: 130px;"></span><b>交通位置</b>:{{House.traffic}}
            </div><br>
            <div>
              <b>出租方式</b>:{{House.renttype.tname}}<span style="margin-left: 200px;"></span><b>房源类型</b>:{{House.housetype.hname}}
            </div><br>
            <div>
              <b>房东姓名</b>:{{House.landlord.realname}}<span style="margin-left: 230px;"></span><b>联系方式</b>:{{House.landlord.phone}}
            </div><br>
            <b>周边介绍</b>:{{House.rim}}
            <el-divider></el-divider>
            <div>
              <div><b>房屋封面图</b>:<span style="margin-left: 250px;"></span><b>房屋详情图</b>:</div>
              <viewer :images="simg" :style="himg.length==0?'':'float: left'">
                <img :src="House.simg" style="width: 100px;height: 70px;"></img>

              </viewer>
              <viewer :images="himg" style="margin-left: 300px">

                <img v-for="(item,index) in himg" :src="item"
                          :key="index" style="width: 100px;height: 70px; margin-left: 8px;"></img>

              </viewer>
              </div>
            <el-divider></el-divider>
            <div><b>房屋位置</b>: <b>{{ House.houseAddress.address}}</b>
            <baidu-map :centent="center"></baidu-map>
            </div>
            <el-divider></el-divider>
            <div>
              <b>房屋概括</b>
            </div>
            <br>
            <div>
              <b>整套面积</b>:{{House.houseGeneralize.area}}m²<span style="margin-left: 100px;"></span><b>是否与租客同住:</b>{{House.houseGeneralize.cohabit==1?'是':'否'}}<span style="margin-left: 100px;"></span><b>卧室数量:</b>{{House.houseGeneralize.bedroom}}
            </div>
            <br>
            <div>
              <b>卫生间数量</b>:{{House.houseGeneralize.wc}}<span style="margin-left: 118px;"></span><b>客厅数量</b>:{{House.houseGeneralize.drawing}}
              <span style="margin-left: 145px;"></span><b>厨房数量</b>:{{House.houseGeneralize.kitchen}}
            </div>
            <br/>
            <div>
              <b>阳台数量</b>:{{House.houseGeneralize.balcony}}<span style="margin-left: 132px;"></span><b>卫生间类型</b>:{{House.houseGeneralize.wctype==1?'独立卫生间':'公共卫生间'}}
            </div>
            <br/>
            <div>
              <b>床型</b>:<span v-if="item.bname!=null" v-for="item in House.houseBeds" style="margin-left: 20px;">{{item.bedtype.bname}}✖{{item.count}}</span>
            </div>
            <el-divider></el-divider>
            <div>
              <b>房屋配套设施</b>
            </div>
            <br>
            <div>
              <span v-if="item.supporting!=null" v-for="(item,i) in House.houseSups" :style="item.state==0?'text-decoration: line-through':''" style="margin-left: 20px;">{{item.supporting.sname}}<br v-if="i%5==0&&i!=0"/></span>
            </div>
              <el-divider></el-divider>
            <div>
              <b>房屋出租定价</b>
            </div>
            <br>
            <div>
              <b style="margin-left: 50px;">工作日(周一到周五)</b>:{{House.houseMany.workday}}元<span style="margin-left: 40px;"></span>
              <b>周末</b>:{{House.houseMany.weekend}}元<span style="margin-left: 40px;"></span>
              <b>节假日</b>:{{House.houseMany.holidays}}元
            </div><br>
            <div>
              <b>其他收费</b>
            </div>
            <br>
            <div>
              <span v-if="item.oname!=null" v-for="item in House.houseOthers" style="margin-left: 50px;"><b>{{item.othertypes.oname}}</b>:{{item.many}}元</span>
            </div><br>
            <div>
              <b>出租规则</b>
            </div>
            <div>
              <span style="margin-left: 50px;"><b>易主人数</b>:{{House.houseRules.liblecount}}人</span>
              <span style="margin-left: 50px;"><b>最少入住</b>:{{House.houseRules.days}}天</span>
              <span style="margin-left: 50px;"><b>最早入住时间</b>:{{House.houseRules.atcheck}}</span>
              <span style="margin-left: 50px;"><b>最晚入住时间</b>:{{House.houseRules.lastcheck}}</span>
              <br>
              <span style="margin-left: 50px;"><b>更换频次</b>:{{House.houseRules.rules==1?'一天一换':'一客一换'}}</span>
              <span style="margin-left: 50px;" v-if="House.houseRules.unsubscribe!=null"><b>退订规则</b>:{{House.houseRules.unsubscribe.uvarchar}}</span>
              <span style="margin-left: 25px;"><b>最晚退订时间</b>:{{House.houseRules.checkout}}</span>
            </div>
            <el-divider></el-divider>
            <br>
            <div>
              <b>房屋要求</b>
            </div>
            <br>
            <div>
              <span v-if="item.rname!=null" v-for="(item,index) in House.houseRequires" style="margin-left: 50px;" :style="item.state==0?'text-decoration: line-through':''"><b>{{item.requiretype.rname}}</b><br v-if="index%5==0&&index!=0"/></span>
            </div>
            <el-divider></el-divider>


          </div>
        </el-card>
      </el-dialog>
    </div>
</template>

<script>
  import BaiduMap from '../echarts/BaiduMap'
    export default {
      components: {BaiduMap},
      props:{
        show:{
          type:Boolean,
          default:()=> false
        },
        house:{
          type:Object,
          default:()=>{}
        }
      },
      watch: {
        show () {
          this.DialogVisible = this.show
        },
        house () {
          this.House= this.house
          this.himg=this.house.himg.split(";");
          this.simg=[this.house.simg]
        },
        center(){
          this.center.lat=this.house.xcoord;
          this.center.lng=this.house.ycoord;

        }
      },
      data(){
        return{
          DialogVisible:this.show,
          House:this.house,
          himg:[],
          simg:[],
          a:1

          //center:{lng : 113.653427,lat : 34.884389}

        }
      },
      computed:{
        center:function(){
          return {lng:this.house.ycoord,lat:this.house.xcoord}

        }
      },
      methods:{
        handleClose(){
          this.$confirm('确认关闭？')
            .then(_ => {
              this.$emit('update:show', false);
              done();
            })
            .catch(_ => {});
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

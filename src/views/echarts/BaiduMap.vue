<template>


          <baidu-map class="bm-view" ak="DK9t7joYxA2ejeu3wx8dVUYjF551ACwK" :center="center" :zoom="17"  :scroll-wheel-zoom="true" :auto-resize="true">
            <bm-marker :position="center" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
            </bm-marker>
          </baidu-map>

</template>

<script>
  import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
  import BmMarker from 'vue-baidu-map/components/overlays/Marker'

  export default {
    props:{
      centent:{
        type:Object,
        default:()=>{}
      },
    },
    components: {
      BaiduMap,
      BmMarker
    },
    data(){
      return{
        center: this.centent,
        zoom: 19
      }
    }
    ,methods:{

    },
    created(){
     //console.log(this.centent)
    }

    }
</script>

<style>
  .bm-view {
    width: 700px;
    height: 300px;
  }
</style>

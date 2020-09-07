<template>
    <div>
      <input type="file" maxlength="" class="input-file" multiple="multiple" name="avatar" ref="avatarInput" @change="changeImage($event)" accept="image/gif,image/jpeg,image/jpg,image/png">
      <el-button @click="InvalidateSession">session失效</el-button>
    </div>
</template>

<script>
    export default {
        name: "add",
        data(){
          return{
            imgUrls: []
          }
        },
      methods:{
        changeImage: function (e) {
            for (var i = 0; i < e.target.files.length; i++) {
              let file = e.target.files[i]
              this.file = file
              //  console.log(this.file)
              let reader = new FileReader()
              let that = this
              reader.readAsDataURL(file)
              reader.onload = function (e) {
                //  console.log(this.result)
                that.imgUrls.push(this.result)
              }
            }
            console.log(this.imgUrls)
        },
        InvalidateSession(){
          this.$get('/test/invalidateSession').then(data=>{
            console.log(data)
          })
        }
      }
    }
</script>

<style>
  .bgView{
    padding: 15px 15px;
  }
  .headerImg{
    width:4.8125rem;
    height: 4.8125rem;
  }
  .score{
    color: #333333;
    font-size: .875rem;
    margin-left: 10px;
    display: inline-block;
  }
  .bgScored{
    position: relative;
    margin-top: -15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }

  .bgImg img{
    margin-left: 5px;
    width: 1.09375rem;
    height:1.03125rem ;
  }
  .grade-box{
    position: absolute;
    top: 0.6875rem;
    left: 5.0275rem;
    display: inline-block;
  }
  .bgImg{
    display: inline-block;
    margin-left: 5px;
  }
  .line{
    margin-top: -5px;
    margin-left: -23px;
    margin-right: -23px;
    background: #c4c3c3;
    height: 1px;
    opacity: 0.3;
  }
  .scoreInfo{
    color:#999999 ;
    font-size: .75rem;
  }
  .inputText{
    width: 100%;
    margin-top: 10px;
    border-bottom: 1px solid #eef1f5;
  }
  .inputText textarea{
    width: 100%;
    height: 5.5rem;
    /*outline: none;*/
    /*overflow:auto;*/
    border: none;
    font-size: .75rem;
    /*background-attachment:fixed;*/
    /*background-repeat:no-repeat;*/
    /*border-style:solid;*/
    /*border-color:#FFFFFF*/
  }
  .selectPic{
    margin-top: 10px;
    width: 100%;
  }
  .unName{
    display: inline-block;
    color:#333333 ;
    margin-left: 5px;
    vertical-align: middle;
    font-size: .75rem;
  }
  .bgName{
    width: 100%;
    height: 50px;
    line-height: 50px;
    display: flex;
    align-items: center;
  }
  .bgName img{
    width: 17px;
    height: 17px;
  }
  .line2{
    margin-top: -5px;
    margin-left: -23px;
    margin-right: -23px;
    background: #c4c3c3;
    height: 8px;
    opacity: 0.3;
  }
  .attitudeOfService{
    color: #333333;
    font-size: .875rem;
    display: inline-block;
  }
  .severce{
    display: flex;
    height: 60px;
    align-items: center;
  }
  .publish{
    width: 100%;
    height: 40px;
    background: #3fc9a5;
    color: white;
    font-size:.875rem ;
    border-radius: 20px;
    line-height: 40px;
  }
</style>

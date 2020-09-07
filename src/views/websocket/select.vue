<template>
  <div class="app" >
    <JwChat-index
      :config="config"
      :taleList="list"
      @enter="bindEnter"
      v-model="inputMsg"
      :toolConfig="tool"
      scrollType="norell"

      @clickTalk="talkEvent"

    >
      <JwChat-rightbox class="rightSlot" :config="rightConfig" @click="rightClick"/>

    </JwChat-index>

  </div>
</template>

<script>


  export default {
    name:'add',
    data(){
      return{
        list:[],
        inputMsg:'',
        tool:{a:'a'},
        tool: {
          // show: ['file', 'history', 'img', ['文件1', '', '美图']],
          // showEmoji: false,
          callback: this.toolEvent
        },
        config: {
          img: 'https://appmusics.oss-cn-beijing.aliyuncs.com/QQ20200824142705',
          name: '陈天昊',
          dept: '恋下的路人甲',
          historyConfig:{
            tip: '加载更多',

          }
        },
        rightConfig: {
          listTip: '当前在线',
          // notice: '【公告】这是一款高度自由的聊天组件，基于AVue、Vue、Element-ui开发。点个赞再走吧 ',
          list: [
            {
              name: 'JwChat',
              "img": "https://appmusics.oss-cn-beijing.aliyuncs.com/961d3f25-6158-4cb0-ad04-9d5060ae1721"
            },
            {
              name: 'JwChat',
              "img": "https://appmusics.oss-cn-beijing.aliyuncs.com/961d3f25-6158-4cb0-ad04-9d5060ae1721"
            },
            {
              name: '留恋人间不羡仙',
              "img": "https://appmusics.oss-cn-beijing.aliyuncs.com/961d3f25-6158-4cb0-ad04-9d5060ae1721"
            },
            {
              name: '只盼流星不盼雨',
              "img": "https://appmusics.oss-cn-beijing.aliyuncs.com/961d3f25-6158-4cb0-ad04-9d5060ae1721"
            }
          ]
        }
      }
    },
    methods:{
      bindEnter () {
        const msg = this.inputMsg
        if (!msg) return;
        const msgObj = {
          "date": "2020/05/20 23:19:07",
          "text": { "text": msg },
          "mine": true,
          "name": "郑傲",
          "img": "https://appmusics.oss-cn-beijing.aliyuncs.com/QQ20200824142705"
        }
        this.list.push(msgObj)
      },
      toolEvent (type, plyload) {
        console.log('tools', type, plyload)
      },
      talkEvent (play) {
        console.log(play)
      },
      rightClick (type) {
        console.log('rigth', type)
      }
    }


  }
</script>

<style>
  .rightSlot {
    width: 100%;
    height: 100%;
    overflow: hidden;
    flex-direction: column;
  }
  body {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
  .app {
    height: 100vh;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>

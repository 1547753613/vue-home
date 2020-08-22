const user={

  state:{
    menus:JSON.parse(sessionStorage.getItem("menus")),
    name:'a'
  },
  mutations: {
    SET_NAME:(state,name)=>{
      state.name=name
    },
    SER_MENUS:(state,menus)=>{
      state.menus=menus
    }

  }

}
export default user

const user={

  state:{
    menus:JSON.parse(sessionStorage.getItem("menus")),
    admin:JSON.parse(sessionStorage.getItem("admin")),
    name:'a'
  },
  mutations: {
    SET_NAME:(state,name)=>{
      state.name=name
    },
    SER_MENUS:(state,menus)=>{
      state.menus=menus
    },
    SET_ADMIN:(state,admin)=>{
      state.admin=admin
    }

  }

}
export default user

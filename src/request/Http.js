import axios from 'axios'
import Vue from "vue";
import Qs from 'qs';
import router from '../router'
import {Loading} from 'element-ui'
import VueRouter from "vue-router";
const routers = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  router
})

//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL="http://localhost:8080"
axios.defaults.timeout=10000;
axios.defaults.withCredentials=true;
let loading;
function startloading() {

  const loading = Loading.service({
    lock: true,
    text: '服务器加载失败...',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  });
  setTimeout(() => {
    loading.close();
    window.location='/login';
  }, 3000);
}
axios.interceptors.request.use(

    config => {

      /*if (null!=sessionStorage.getItem("token")){
        config.headers['token']=sessionStorage.getItem("token");
      }*/

      return config;
    },
    error => {

        return Promise.reject(error);
    });

axios.interceptors.response.use(
    response => {
    //  console.log(response)
return response;

    },
    error => {
     // startloading();

     // routers.push({path: '/login'});


      //  return Promise.reject(error);
    });
export function get(url, params){
    return new Promise((resolve, reject) =>{
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err =>{
            reject(err.data)
        })

    })
}

export function post(url, params) {
    return new Promise((resolve, reject) => {

        axios.post(url, Qs.stringify(params))
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    })
}
export function post1(url,params) {

    return new Promise((resolve, reject) => {
        //console.log(params)
        axios.post(url,
            params
        )
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    })
}
export function postjson(url,params) {

    return new Promise((resolve, reject) => {
       // console.log(params)
        axios.post(url,
            params,
            {
                headers:{
                    'Content-Type':'application/json;charset=UTF-8'
                }
            }
        )
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    })
}
export function put(url,params) {
    return new Promise((resolve, reject) => {

        axios.put(url,params,
            {
                headers:{
                    'Content-Type':'application/json;charset=UTF-8'
                }
            }
        )
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    })

}
export function put1(url,params) {
    return new Promise((resolve, reject) => {
        axios.put(url,Qs.stringify(params, { indices: false }))
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })


    })
}

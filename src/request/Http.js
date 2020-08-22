import axios from 'axios'
import Vue from "vue";
import Qs from 'qs';
import router from '../router/index'
import {Loading} from 'element-ui'

//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL="http://localhost:8080"
axios.defaults.timeout=10000;
axios.defaults.withCredentials=true;
let loading;
function startloading() {



}
axios.interceptors.request.use(

    config => {

        return config;
    },
    error => {
        return Promise.reject(error);
    });

axios.interceptors.response.use(
    response => {

return response;

    },
    error => {
        return Promise.reject(error);
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
        console.log(params)
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
        console.log(params)
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

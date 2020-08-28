import axios from 'axios'
import Vue from "vue";
import Qs from 'qs';

let http = axios.create({
  // 请求根路径
  baseURL:"http://localhost:8080/",
  // 超时时间
  timeout:5000,
  // 携带认证信息：cookie/token
  withCredentials:true
});

export default http

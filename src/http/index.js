import axios from "axios";
import settings from "../settings.js";

const http = axios.create({
    baseURL: settings.host,
    withCredentials: false,
})

// 请求拦截器
http.interceptors.request.use((config) => {
    console.log("http 请求之前");
    return config;
}, (error) => {
    console.log("http 请求之前报错");
    return Promise.reject(error);
})


// 响应拦截器
http.interceptors.response.use((response) => {
    console.log("http 响应之后");
    return response;
}, (error) => {
    console.log("http 响应之后报错");
    return Promise.reject(error);
})


export default http;


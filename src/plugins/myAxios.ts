// Add a request interceptor
import axios from "axios";
import {showFailToast} from "vant";
import router from "../router";

axios.defaults.withCredentials = true;

axios.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    function (response) {
        const {data} = response
        const {code} = data;
        if (data && code === 0) {
            return response;
        } else {
            switch (code) {
                case 40001:
                case 40100: {
                    const WRITE = ["/", "/competition", "/dynamic"]
                    const urlParams = new URLSearchParams(window.location.href);
                    let pathName = window.location.pathname
                    if (!WRITE.includes(pathName)) {
                        const codeValue = urlParams.get('code');
                        showFailToast(data.message)
                        if (codeValue) {
                            router.push({path: '/login', query: {code: codeValue}})
                        } else {
                            router.push('/login')
                        }
                    }
                }
                    break;
                default:
                    showFailToast(data.message)
                    break;
            }
        }
        return response;
    },

    function (error) {
        return Promise.reject(error);
    }
)
;

// 拦截响应数据，进行个性化处理

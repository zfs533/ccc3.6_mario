import axios from 'axios';
import { Message, MessageBox } from 'element-ui';
import router from '../router/index';
import { getSession } from './auth';
import chekLine from './chekLine';
import { checkTokenTime, getToken } from './myAsyncFn';


let baseurlArr = process.env.VUE_APP_URL;
let baseurl = baseurlArr.split(",")[0];
console.log(baseurlArr, baseurl);
const service = axios.create({
    baseURL: baseurl,
    timeout: 20000,
});



// setInterval(checkTokenTime, 1000 * 60);//检查token
//请求拦截
service.interceptors.request.use(async config => {
    await checkTokenTime();
    config.headers["x-token"] = getToken();
    let baseurl = getSession("x-baseurl");
    if (config.params) {
        //清除无效参数
        let keys = Object.keys(config.params);
        keys.forEach(item => {
            if (typeof config.params[item] == 'string' && config.params[item].trim() == "") {
                delete config.params[item];
            }
        });
    }
    if (config.data) {
        //清除无效参数
        let keys = Object.keys(config.data);
        keys.forEach(item => {
            if (typeof config.data[item] == 'string' && config.data[item].trim() == "") {
                delete config.data[item];
            }
        });
    }

    if (!baseurl) {
        let url = await chekLine();
        if (!url) {
            Message.error('切换线路失败，请查看网络是否正常');
        } else {
            await sessionStorage.setItem('x-baseurl', url);
            config.baseURL = url;
        }
    } else {
        config.baseURL = baseurl;
    }
    return config;
}, error => {
    // Do something with request error
    return Promise.reject(error);
});

const getBolbToObj = async (res) => {
    return new Promise((resolve) => {
        let reader = new FileReader();
        reader.onload = function (event) {
            res.data = JSON.parse(reader.result);//内容就在这里
            resolve();
        };
        reader.readAsText(res.data);
    });
};


//响应拦截
let isCheck = 0;
service.interceptors.response.use(async (response) => {
    if (response.headers["content-type"].toLowerCase().indexOf("application/json") >= 0) {
        if (response.config.responseType === "blob") {
            await getBolbToObj(response);
        }
        if (response.status === 200 && response.data.code === 200) {
            return response;
        }
        if (response.status === 200) {
            if (response.data.code === 2002) {

                MessageBox.confirm('你已断线,请重新登录', '确定登出', {
                    confirmButtonText: '重新登录',
                    type: 'warning'
                }).then(() => {
                    sessionStorage.clear();
                    router.push({ path: '/login' });
                    location.reload();// 为了重新实例化vue-router对象 避免bug
                });
            }
            else if (response.data.code != 200) {
                let err = response.data.err;//TODO
                Message({
                    message: err,
                    type: 'error',
                    duration: 5 * 1000
                });
                return Promise.reject(response.data);
            }
            console.log(response.data);
            return Promise.reject(response.data);
        }

        return Promise.reject({ code: -1 });
    } else {
        return response;
    }
}, error => {
    console.error(error, "****");
    if (isCheck <= 1) {
        console.log(`重试第${isCheck + 1}遍了`);
        isCheck++;
        let config = error.config;
        config.timeout = 500;

        return service.request(config);
    }

    console.error(error.config);
    Message.error("地址" + error.config.url + "请求失败，请重试！" + error.message);
    sessionStorage.removeItem("x-baseurl");
    return Promise.reject(error);
});

export default service;
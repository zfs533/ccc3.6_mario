import axios from 'axios';

export default function (context, inject) {
    console.log("plugin axios init");

    /*
      *ajax封装
      */
    axios.ajax = window.ajax;
    axios.jsonp = window.jsonp;
    // axios.defaults.timeout = 15 * 1000;
    // axios.interceptors.request.use(function (config) {
    //     return config;
    // });
    axios.interceptors.response.use(res => {

        return res;
    }, (err) => {
        let config = err.config;
        if (!config) return Promise.reject(err);
        if (err.message.includes("Network Error")) {
            console.warn(`axios interceptor response error`, context.route.path, config.url, err.message);
            return Promise.reject(err);
        }

        const { _retryCount = 0, _retryDelay = 30, _retryTimes } = config;

        if ((err.response && (err.response.status === 504 || err.response.status === 503) || err.message.includes('timeout')) && _retryCount < _retryTimes) {
            console.warn(`axios response error retryCount:${_retryCount}, retryDelay:${_retryDelay}, retryTimes:${_retryTimes}`, config.url, err.message);
            // 增加重试次数
            config._retryCount = _retryCount + 1;
            // 延时处理
            const delay = new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, _retryDelay);
            });
            console.warn("axios retry count", config.url, config._retryCount);
            // 重新发起请求
            return delay.then(function () {
                return axios(config);
            });
        }
        // 判断是否超过了重试次数
        if (err.config) {
            console.warn(`axios interceptor response error _retryCount: ${_retryCount} over`, context.route.path, config.url, err.message);
            // window.$nuxt && window.$nuxt.$toast(`请求错误: ${apiUrl.pathname} ${err.message}`); 
            if (!config.url.includes("speedtest")
                && !(config.timeout === 5000 && err.message.includes('timeout'))
            ) {
                context.$logger.reportError(err, err.config.url);
            }
        }
        return Promise.reject(err);
    });
    inject('axios', axios);
}
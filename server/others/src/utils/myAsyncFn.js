import axios from 'axios';
import { Loading, Message } from 'element-ui';
import { getSession, setSession } from './auth';

let myAsyncFn_isDispatching = false;
export async function myAsyncFn(fn, payload, asyncFlag) {
    let loadingInstance;
    let ret;

    //不支持同时多个请求
    if (!asyncFlag) {
        if (myAsyncFn_isDispatching) {
            return Promise.resolve();
        }
        try {
            loadingInstance = Loading.service({
                fullscreen: true,
                text: "拼命加载中..."
            });
            myAsyncFn_isDispatching = true;
            let { data } = await fn(payload);
            ret = data;
        } catch (err) {
            return err;
        } finally {
            // setTimeout(() => {
            //   loadingInstance.close();
            // }, 1000)
            loadingInstance.close();
            myAsyncFn_isDispatching = false;
        }
        return ret;
    } else {
        let { data } = await fn(payload);
        return data;
    }
}


export function getToken() {
    let token = getSession("x-token");
    if (token) {
        return token.token;
    }
    return undefined;

};

export function refreshToken() {//请求新的token
    let postUrl = getSession("x-baseurl") + '/api/admin/user/refresh';
    console.log(postUrl);
    return new Promise(resolve => {
        axios({
            method: 'post',
            url: postUrl,
            headers: {
                "x-token": getToken()
            }
        }).then(res => {
            if (res.data.code == 200) {
                console.log("设置新的token");
                setSession("x-token", res.data.msg);
                setSession("tokenGetTime", new Date().getTime());
            }
            else {
                Message({
                    message: "token:" + res.data.err,
                    type: 'error',
                    duration: 5 * 1000
                });
            }
            resolve();
        }).catch(err => {
            Message({
                message: "token:" + err,
                type: 'error',
                duration: 5 * 1000
            });
            resolve();
        });
    });
}

let isTokenRefreshing = false;
let isTokenArr = [];
export function checkTokenTime() {
    return new Promise(async resolve => {
        isTokenArr.push(resolve);
        if (!isTokenRefreshing) {
            isTokenRefreshing = true;
            try {
                let token = getSession("x-token");
                if (token) {
                    let cha = (new Date().getTime() - getSession("tokenGetTime")) / 1000;

                    let youxiao = token.ttl - cha;
                    console.log(`还有${youxiao}秒token过期`);
                    // await refreshToken();
                    if (youxiao < 600) {
                        await refreshToken();
                    }
                }
            } catch (err) {
                console.error(err);
            } finally {
                isTokenRefreshing = false;
                isTokenArr.forEach(item => { item(); });
                isTokenArr = [];
            }
        }
    });
}


export function getSession(key) {

    let res = sessionStorage.getItem(key);
    try {
        return JSON.parse(res);
    } catch (error) {
        return res;
    }
}

export function setSession(key, data) {
    if (data == null || data == undefined) {
        console.error("sessionStorage赋值错误", data);
        return;
    }
    return sessionStorage.setItem(key, typeof data == "string" ? data : JSON.stringify(data));
}

export function removeSession(key) {
    return sessionStorage.removeItem(key);
}

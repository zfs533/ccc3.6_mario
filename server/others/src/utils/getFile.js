import axios from 'axios';
import CryptoJS from 'crypto-js';
import { Message } from 'element-ui';
import { getSession } from './auth';




//解密图片
export async function jiemi(url) {
    if (!url) {
        return url;
    }
    let str = url;
    let type = str.split(".").pop();
    if (type == "jpg" || type == "png" || type == "jpeg" || type == "gif") {
        return url;
    }
    let domain = getSession("src");
    if (!domain) {
        Message.error("缺少资源域名");
    }

    let adress = `${domain[0]}/${url}`;
    try {
        //解密
        let res = await axios.get(adress, { responseType: "arraybuffer" });
        let base64 = Buffer.from(res.data).toString('base64');
        let ret = decrypt(base64, '82758dd12749c777ef579f1839ceea6a');
        return ret;
    } catch (error) {
        return url;
    }
}



function decrypt(word, keyStr) {
    var key = CryptoJS.enc.Utf8.parse(keyStr);
    var decrypt = CryptoJS.AES.decrypt(word, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}
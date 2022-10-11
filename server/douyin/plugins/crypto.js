
import CryptoJS from "crypto-js";

export default ({ app }, inject) => {
    console.log("plugin crypto init");

    function decryption(word, keyStr = "82758dd12749c777ef579f1839ceea6a") {
        var key = CryptoJS.enc.Utf8.parse(keyStr);
        var decrypt = CryptoJS.AES.decrypt(word, key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7,
            blockSize: 16,
        });

        var decryptedStr = CryptoJS.enc.Utf8.stringify(decrypt).toString();
        return decryptedStr;
    }

    function decryptionObject(word, keyStr = "82758dd12749c777ef579f1839ceea6a") {
        let decodeStr = decryption(word, keyStr);
        if (decodeStr) {
            try {
                return JSON.parse(decodeStr);
            } catch { }
        }
        return undefined;
    }

    function encrypt(encryptedStr, hex = '82758dd12749c777ef579f1839ceea6a') {
        encryptedStr = JSON.stringify(encryptedStr);
        let key = CryptoJS.enc.Utf8.parse(hex);

        let encryptData = CryptoJS.AES.encrypt(encryptedStr, key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7,
            blockSize: 16
        });

        let bf = new Buffer(encryptData.toString(), 'base64');
        return bf.toString('base64');
    }
    inject("crypto", {
        encrypt,
        decryption,
        decryptionObject
    });
};
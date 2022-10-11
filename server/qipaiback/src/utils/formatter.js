import { jiemi } from '@/utils/getFile';
import moment from "moment";
import { getSession } from './auth';

//各种时间格式化
//北京时间
export function dateTimeFm() {
    let data = arguments[2];
    if (arguments.length == 1) {
        data = arguments[0];
    }
    if (data) {
        let newDate = moment.parseZone(data).utcOffset(8).format('YYYY-MM-DD HH:mm:ss');
        return newDate;
    }
}

//北京日期
export function dateFm() {
    let date = arguments[2];
    if (arguments.length == 1) {
        date = arguments[0];
    }
    if (date) {
        let newDate = moment.parseZone(date).utcOffset(8).format('YYYY-MM-DD');
        return newDate;
    }
}

//本地时间
export function dateTimeFmLocal(date) {
    if (date) {
        let newDate = moment.parseZone(date).format('YYYY-MM-DD HH:mm:ss');
        return newDate;
    }
}

//当日零点
export function dateStartTimeFm(date) {
    if (date) {
        let newDate = moment.parseZone(date).startOf('days').format('YYYY-MM-DD HH:mm:ss');
        return newDate;
    }
}

//字符串分割为数组
export function splitStr(str) {
    if (!str) {
        return undefined;
    }
    str = typeof str == "number" ? str.toString() : str;
    var temp = str.split(/[\n\s+,，；;]/g);
    temp = temp.filter(i => i !== "");
    return temp;
}

// 数组去重
export function uniqueArr(ary) {
    let newAry = [];
    for (let i = 0; i < ary.length; i++) {
        if (newAry.indexOf(ary[i]) === -1) {
            newAry.push(ary[i]);
        }
    }
    return newAry;
}


//清除无效字段
export function removeInvalid(obj) {
    let newObj = obj;
    for (let key in newObj) {
        if (newObj[key] === "" || newObj[key] === undefined) {
            delete newObj[key];
        }
    }
    return newObj;
}

//文件体积转化
export function sizeFormat(byte) {
    if (!isNaN(byte)) {
        let m = byte / 1024 / 1024;
        if (m > 1024) {
            m = (m / 1024).toFixed(2);
            return m + " GB";
        }

        return m.toFixed(2) + " MB";
    }
    return byte;
}

//时分秒转化
export function secToString(raw) {
    var num = parseInt(raw);
    var s = num % 60 ? `${num % 60}秒` : ((num % 60).toFixed(2) | 0);
    num = parseInt(num / 60);
    var m = num % 60 ? `${num % 60}分` : 0;
    num = parseInt(num / 60);
    var h = num % 24 ? `${num % 24}时` : 0;
    num = parseInt(num / 24);
    var d = num ? `${num}天` : 0;
    return (d || "") + (h || "") + (m || "") + (s || "");
}

//获取两级分类id
export function getCategories(categorie, categorieList) {
    // console.log("categorieList",JSON.stringify(categorieList));
    // console.log("categorie",JSON.stringify(categorie));
    return categorie.map(i => {
        let arr = i.parentId ? [i.parentId, i.id] : [i.id];
        let info = findCategoriesPlatfrom(arr[0],i.type, categorieList);
        if(info.length){
            arr.unshift(info[1]);
            arr.unshift(info[0]);
        }
        return arr;
    });
}

function findCategoriesPlatfrom(id,type, categorieList) {
    for (let v of categorieList) {
        let typeitem = v.children.find(i => i.id === type);
        if (typeitem) {
            typeitem.children.find(c => c.id === id);
            return [v.id,typeitem.id];
        }
    }
    return []
}

//根据分类ID获取其名字
export function getCategorieLabel(categorie, categorieList) {
    let label = "";
    for (let i = 0; i < categorieList.length; i++) {
        let platform = categorieList[i];
        if (platform.id == categorie) {
            return platform.name;
        }
        platform = platform.children;

        let item = platform.find(i => i.id === categorie);
        if (item) {
            return item.name;
        }
        else {
            for (let i of platform) {
                if (i.children) {
                    let sub = i.children.find(i => i.id === categorie);
                    if (sub) {
                        return sub.name;
                    }
                }
            }
        }
    }
    return label;
}
//根据分类ID数组获取其名字
export function getCategorieLabelArr(categorieArr, categorieList) {
    let label = "";
    for (let i of categorieArr) {
        label += getCategorieLabel(i, categorieList) + ",";
    }
    return label.substring(0, label.lastIndexOf(','));
}

export function getWholeCategorieLabelArr(categorieArr, categorieList) {
    let label = "";
    for (let i of categorieArr) {
        let path = "";
        for (let j of i) {
            path = path + "/" + getCategorieLabel(j, categorieList);
        }
        label += path.substring(1);
        label += '，';
    }
    return label.substring(0, label.lastIndexOf('，'));
}

//根据分类ID数组获取其名字
export function getWholeCategorieLabelByIds(categorieArr, categorieList) {
    let label = "";
    for (let id of categorieArr) {
        let itemName = '';
        for (let i = 0; i < categorieList.length; i++) {
            let platform = categorieList[i];
            if (platform.id == id) {
                itemName = platform.name + '/';
                break;
            }
            if (!platform.children) {
                continue;
            }
            for (let first of platform.children) {
                if (first.id == id) {
                    itemName = platform.name + '/' + first.name;
                    break;
                }
                if (!first.children) {
                    continue;
                }
                for (let second of first.children) {
                    if (second.id == id) {

                        itemName = platform.name + '/' + first.name + '/' + second.name;
                        break;
                    }
                }
                if (itemName != '') {
                    break;
                }
            }
            if (itemName != '') {
                break;
            }
        }
        label = label + itemName + '，';
    }
    return label.substring(0, label.lastIndexOf('，'));
}

//深复制
export function deepClone(source) {
    if (!source && typeof source !== 'object') {
        throw new Error('error arguments', 'shallowClone');
    }
    const targetObj = source.constructor === Array ? [] : {};
    for (const keys in source) {
        if (source.hasOwnProperty(keys)) {
            if (source[keys] && typeof source[keys] === 'object') {
                targetObj[keys] = source[keys].constructor === Array ? [] : {};
                targetObj[keys] = deepClone(source[keys]);
            } else {
                targetObj[keys] = source[keys];
            }
        }
    }
    return targetObj;
}


//解密数组对象中的图片字段，并返回带view的字段显示图片
export async function setImgView(data, input) {
    if (!data || data.length == 0) {
        return [];
    }
    let pageData = data;
    let values = input.split('.');
    let promiseList = pageData.map(item => {
        if(typeof(item[input]) == "object"){//数组图集
            let atlas = item[input];
            let res = [];
            for(let i = 0; i<atlas.length;i++){
                var result = jiemi(atlas[i]);
                res.push(result);
            }
            return res;
        }
        let res = jiemi(item[input]);
        if (values.length == 2) {
            res = jiemi(item[values[0]][values[1]]);
        }
        return res;

    });
    let imgs = await Promise.allSettled(promiseList);
    if(imgs.length>0 && typeof(imgs[0].value) == "object"){//数组图集
        for(let i = 0; i<imgs.length;i++){
            let b64 = [];
            for(let j = 0; j<imgs[i].value.length;j++){
                var str = await handleImagePromise(imgs[i].value[j]);
                b64.push(str);
            }
            pageData[i][`${input}View`] = b64;
        }
        return pageData;
    }

    return pageData.map((item, index) => {
        if (values.length == 2) {
            item[values[0]][`${values[1]}View`] = imgs[index].value;
        }
        else {
            item[`${input}View`] = imgs[index].value;
        }
        return item;
    });
}

async function handleImagePromise(obj){
    return new Promise(resolve=>{
        obj.then((res)=>{
            resolve(res);
        })
    });
}

//pid格式化
export function pidFormat() {
    let data = arguments[2];
    if (arguments.length == 1) {
        data = arguments[0];
    }
    let pidList = getSession('pidList') || [];
    let item = pidList.find(i => i.pid === data);
    return item ? item.name : data;
}

export function channelFormat() {
    let data = arguments[2];
    if (arguments.length == 1) {
        data = arguments[0];
    }
    return data == "" ? "官方" : data;
}
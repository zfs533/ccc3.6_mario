import { categoriesMany, getManyTags } from "@/api/videoManager";
import { getSession, setSession } from "@/utils/auth";
import { myAsyncFn } from "@/utils/myAsyncFn";

const state = {
    categories: getSession('categories'),
    tags: getSession('tags')
};

const mutations = {
    UPDATECATEGORIES: (state, data) => {
        state.categories = data;
    },
    UPDATETAGS: (state, data) => {
        state.tags = data;
    }
};

const actions = {

    async setCategories({ commit }) {
        let res = await myAsyncFn(categoriesMany, {}, true);
        if (res.code === 200) {
            let arr = [];
            let pidList = getSession("pidList");
            for (let i = 0; i < res.msg.length; i++) {
                let item = {};
                item.pid = res.msg[i].id;
                item.id = res.msg[i].id;
                item.name = res.msg[i].name;
                item.index = i;
                // 分类类型
                let pidCategoryList=res.msg[i].children;
                item.children=[];
                for(let c =0 ;c < pidCategoryList.length ;c++){
                    // 该平台下的一级分类
                    let categorieList=pidCategoryList[c];
                    // 分类分组
                    let typeFind=item.children.find(e=>e.id===categorieList.type);
                    if(typeFind){
                        // 存在的分类,只需要push 子元素
                        typeFind.children.push(
                            {
                                id:categorieList.id,name:categorieList.name,index:categorieList.index,
                                children:categorieList.children
                            }
                        );
                    }else{
                        // 创建一个分类
                        // let categorieName=CategoryType.find(ct=>ct.value===categorieList.type)?.label;
                        let categorieTypeItem={
                            id:categorieList.type,
                            name:categorieList.type,//categorieName?categorieName:categorieList.type,
                            children:[
                                {
                                    id:categorieList.id,name:categorieList.name,index:categorieList.index,
                                    children:categorieList.children
                                }
                            ]
                        }
                        item.children.push(categorieTypeItem);
                    }
                }
                // item.children = res.msg[i].data;
                item.disabled = true;
                // for (let v of pidList) {
                //     if (v.pid == item.pid) {
                //         item.name = v.name;
                //         break;
                //     }
                // }
                arr.push(item);
            }
            commit('UPDATECATEGORIES', arr);
            setSession('categories', arr);
        }
    },
    async setTags({ commit }) {
        let res = await myAsyncFn(getManyTags, {}, true);
        if (res.code === 200) {
            let data = res.msg.pageData.map(item => {
                return { label: item.name, value: item._id };
            });
            commit('UPDATETAGS', data);
            setSession('tags', data);
            // this.tagsList = this.tagsList.concat(data);
        }

    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};

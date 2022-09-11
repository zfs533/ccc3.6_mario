import router, { asyncRouterMap, constantRoutes } from '@/router';
import { getSession } from '@/utils/auth';

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(route) {
    let role = getSession('role');

    let permission = role ? role.pages : [];

    let pages = [];
    for (let i of permission) {

        pages.push(i.id);

        if (i.children) {
            for (let j of i.children) {
                pages.push(j.id);
            }
        }
    }
    if (pages && route.path && route.path.length > 0) {
        let path = route.path;
        if (path[0] === '/') {
            path = path.slice(1);
        }
        return !!pages.find(e => e === path);
    }
    return false;
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRouterMap
 * @param roles
 */
export function filterAsyncRouter(asyncRouterMap) {
    const accessedRouters = asyncRouterMap.filter(route => {
        if (hasPermission(route)) {
            if (route.children && route.children.length) {
                route.children = filterAsyncRouter(route.children);
            }
            return true;
        }
        else if (route.path === '/') {
            return true;
        }
        return false;
        // return true
    });

    return accessedRouters;
}

const state = {
    routes: [],
    addRoutes: [],
    generateRoutesFlag: false
};

const mutations = {
    SET_ROUTES: (state, routes) => {
        state.addRoutes = routes;
        state.routes = constantRoutes.concat(routes);
        state.generateRoutesFlag = true;
    }
};

const actions = {
    generateRoutes({ commit }, roles) {
        commit('SET_ROUTES', filterAsyncRouter(asyncRouterMap));
        return filterAsyncRouter(asyncRouterMap);
    },
    addRoutes({ commit }) {
        console.log("添加路由");
        router.addRoutes(filterAsyncRouter(asyncRouterMap));
        commit('SET_ROUTES', filterAsyncRouter(asyncRouterMap));
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};

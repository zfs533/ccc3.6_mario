import { getSession } from '@/utils/auth';
import router, { asyncRouterMap } from '../router/index';


function filterAsyncRouter(asyncRouterMap) {
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

function hasPermission(route) {
    let role = getSession('role');

    let permission = role ? role.pages : [];

    let pages = [];
    for (let i of permission) {

        pages.push(i.id);

        if (i.children) {
            for (let j of i.children) {
                pages.push(i.id);
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

export function addRoutes() {
    router.addRoutes(filterAsyncRouter(asyncRouterMap));
    console.log(router, "****************");
}
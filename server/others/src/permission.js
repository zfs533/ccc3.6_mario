import router from '@/router';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import store from './store';
import { getSession } from './utils/auth';


NProgress.configure({ showSpinner: false });// NProgress Configuration

// permissiom judge function
function hasPermission(roles, permissionRoles) {
    if (roles.indexOf('admin') >= 0) return true; // admin permission passed directly
    if (!permissionRoles) return true;
    return roles.some(role => permissionRoles.indexOf(role) >= 0);
}

const whiteList = ['/login'];// no redirect whitelist

router.beforeEach(async (to, from, next) => {
    let userInfo = getSession("role");
    NProgress.start(); // start progress bar
    if (userInfo) {
        if (to.path === '/login') {
            sessionStorage.clear();
            next({ path: '/' });
        } else {
            if (!store.getters.generateRoutesFlag) {
                let routes = await store.dispatch('permission/generateRoutes');
                // console.log(routes, "***********");
                router.addRoutes(routes);
                next({ ...to });
            } else {
                next();
            }
            // next()
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next();
        } else {
            next('/login');
            NProgress.done();
        }
    }
});

router.afterEach(() => {
    NProgress.done(); // finish progress bar
});

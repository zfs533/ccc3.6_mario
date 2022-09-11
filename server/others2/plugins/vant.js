// import Vant from 'vant'

// import style
import 'swiper/css/swiper.css';
import { ActionSheet, Button, CellGroup, Col, CountDown, Dialog, DropdownItem, DropdownMenu, Empty, Field, Grid, GridItem, Icon, Image as VanImage, Lazyload, List, Loading, NavBar, NoticeBar, Overlay, Popover, Popup, Progress, PullRefresh, Radio, RadioGroup, Row, Search, ShareSheet, Sidebar, SidebarItem, Skeleton, Slider, Step, Steps, Sticky, Swipe, SwipeItem, Tab, Tabbar, TabbarItem, Tabs, Tag, Toast, Uploader } from 'vant';
import Vue from 'vue';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import VueClipboard from 'vue-clipboard2';
import VueRouter from 'vue-router';

Vue.use(VueAwesomeSwiper, /* { default options with global component } */ );

// 解决编程式路由往同一地址跳转时会报错的情况
const originalPush = VueRouter.prototype.push;
const originalReplace = VueRouter.prototype.replace;

// push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject)
        return originalPush.call(this, location, onResolve, onReject);
    return originalPush.call(this, location).catch(err => err);
};

//replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
    if (onResolve || onReject)
        return originalReplace.call(this, location, onResolve, onReject);
    return originalReplace.call(this, location).catch(err => err);
};

NavBar.props.border.default = false;
Field.props.border.default = false;

Vue.use(DropdownMenu);
Vue.use(DropdownItem);

Vue.use(Sticky);
Vue.use(VueClipboard);

Vue.use(Popover);
Vue.use(Slider);
Vue.use(CountDown);

Vue.use(List);
Vue.use(PullRefresh);

Vue.use(Toast);
Vue.use(NavBar);
Vue.use(Col);
Vue.use(Row);
Vue.use(Icon);
Vue.use(Search);
Vue.use(Tag);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Skeleton);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Step);
Vue.use(Steps);
Vue.use(ActionSheet);


// Vue.use(Vant)
Vue.use(Lazyload, {
    preLoad: 1.3,
    lazyComponent: true,
    attempt: 2,
    listenEvents: ["scroll"],
    observer: true,
    observerOptions: {
        rootMargin: '0px',
        threshold: 0.1
    }
});
Vue.use(Button);
Vue.use(VanImage);

Vue.use(Field);
Vue.use(CellGroup);
Vue.use(Uploader);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Overlay);
Vue.use(Dialog);
Vue.use(Popup);
Vue.use(Loading);
Vue.use(ShareSheet);
Vue.use(Sidebar);
Vue.use(SidebarItem);
Vue.use(NoticeBar);
Vue.use(Empty);
Vue.use(Progress);

export default function(context, inject) {
    console.log("plugin vant load");


    console.log("plugin vant load ok");
}
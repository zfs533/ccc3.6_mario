import '@/styles/index.scss'; // global css
import Element from 'element-ui';
import 'normalize.css/normalize.css'; // a modern alternative to CSS resets
// import 'video.js/dist/video-js.css';
import Vue from 'vue';
import qrcode from 'vue-qrcode-directive';
// import VueVideoPlayer from 'vue-video-player';
import App from './App';
import * as filters from './filters'; // global filters
import './icons'; // icon
import './permission'; // permission control
import router from './router';
import store from './store';
import './styles/element-variables.scss';
import './utils/error-log'; // error log
import { channelFormat, dateFm, dateTimeFm, pidFormat, splitStr, uniqueArr } from "./utils/formatter"; //常用格式化方法
import { myAsyncFn } from './utils/myAsyncFn'; //接口请求
Vue.use(qrcode)



Vue.prototype.$http = myAsyncFn;
Vue.prototype.$dateTimeFm = dateTimeFm;
Vue.prototype.$dateFm = dateFm;
Vue.prototype.$splitStr = splitStr;
Vue.prototype.$pidFormat = pidFormat;
Vue.prototype.$uniqueArr = uniqueArr;
Vue.prototype.$channelFormat = channelFormat;

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//     const { mockXHR } = require('../mock');
//     mockXHR();
// }

Element.Dialog.props.closeOnClickModal.default = false;

Vue.use(Element, {
    size: 'medium', // set element-ui default size
});

// register global utility filters
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});

import { injectScript } from "~/assets/js/utils";
export default (context, inject) => {
    console.log("plugin ga init");

    let gtag;
    function event(event, data) {
        if (!gtag || !context.env.GA) return;
        gtag('send', 'event', event, data);
    }

    function pageview(pagePath) {
        if (!gtag || !context.env.GA) return;
        gtag('set', 'page', pagePath); // 你可能想根据请求参数添加其他参数，可以修改这里的 to.fullPath
        gtag('send', 'pageview');
    }

    function init() {
        if (!context.env.GA) return;
        let apiUrl = new URL(context.$checkLine.getApiBaseUrl());
        let gaJs = apiUrl.origin + "/gtag/js";
        let myInfo = context.$userStore.getMyInfo();
        injectScript(gaJs + "?id=" + context.env.GA, () => {
            window.dataLayer = window.dataLayer || [];
            window.gtag = function () { dataLayer.push(arguments); };
            gtag = window.gtag;

            gtag('js', new Date());
            gtag('create', context.env.GA, 'auto');
            gtag('config', context.env.GA, { 'debug_mode': context.$env.isDev() });

            gtag('set', 'user_properties', {
                uid: myInfo.uid,
            });
            gtag('send', 'pageview');
        });
    }
    inject("ga", {
        init,
        pageview
    });
};
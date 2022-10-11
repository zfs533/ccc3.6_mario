// 注册
var scriptURL;
if (self.serviceWorker) {
    scriptURL = self.serviceWorker.scriptURL;
}
else {
    console.log("==serviceWorker==", self);
}
console.log("workbox work", scriptURL);


const options = <%= JSON.stringify(options.swOptions) %>;

importScripts(...[options.workboxURL, ...options.importScripts]);

initWorkbox(workbox, options);
workboxExtensions(workbox, options);
precacheAssets(workbox, options);
cachingExtensions(workbox, options);
runtimeCaching(workbox, options);
offlinePage(workbox, options);
routingExtensions(workbox, options);

function getProp(obj, prop) {
    return prop.split('.').reduce((p, c) => p[c], obj);
}

function initWorkbox(workbox, options) {
    console.log("workbox initWorkbox", scriptURL, options);

    if (options.config) {
        // Set workbox config
        workbox.setConfig(options.config);
    }

    if (options.cacheNames) {
        // Set workbox cache names
        workbox.core.setCacheNameDetails(options.cacheNames);
    }

    if (options.clientsClaim) {
        // Start controlling any existing clients as soon as it activates
        workbox.core.clientsClaim();
    }

    if (options.skipWaiting) {
        workbox.core.skipWaiting();
    }

    if (options.cleanupOutdatedCaches) {
        workbox.precaching.cleanupOutdatedCaches();
    }

    if (options.offlineAnalytics) {
        // Enable offline Google Analytics tracking
        workbox.googleAnalytics.initialize();
    }
}

function precacheAssets(workbox, options) {
    console.log("workbox precacheAssets", scriptURL, options.preCaching);

    if (options.preCaching.length) {
        workbox.precaching.precacheAndRoute(options.preCaching, options.cacheOptions);
    }
}


function runtimeCaching(workbox, options) {
    console.log("workbox runtimeCaching", scriptURL, options.runtimeCaching);

    const requestInterceptor = {
        requestWillFetch({ request }) {
            if (request.cache === 'only-if-cached' && request.mode === 'no-cors') {
                return new Request(request.url, { ...request, cache: 'default', mode: 'no-cors' });
            }
            return request;
        },
        fetchDidFail(ctx) {
            ctx.error.message =
                '[workbox] Network request for ' + ctx.request.url + ' threw an error: ' + ctx.error.message;
            console.error(ctx.error, 'Details:', ctx);
        },
        handlerDidError(ctx) {
            ctx.error.message =
                `[workbox] Network handler threw an error: ` + ctx.error.message;
            console.error(ctx.error, 'Details:', ctx);
            return null;
        }
    };

    for (const entry of options.runtimeCaching) {
        const urlPattern = new RegExp(entry.urlPattern);
        const method = entry.method || 'GET';

        const plugins = (entry.strategyPlugins || [])
            .map(p => new (getProp(workbox, p.use))(...p.config));

        plugins.unshift(requestInterceptor);

        const strategyOptions = { ...entry.strategyOptions, plugins };

        const strategy = new workbox.strategies[entry.handler](strategyOptions);

        console.log("===registerRoute===", urlPattern, strategy, method);
        workbox.routing.registerRoute(urlPattern, strategy, method);
    }
}

function offlinePage(workbox, options) {
    console.log("workbox offlinePage", scriptURL, options.offlinePage);

    if (options.offlinePage) {
        // Register router handler for offlinePage
        workbox.routing.registerRoute(new RegExp(options.pagesURLPattern), ({ request, event }) => {
            const strategy = new workbox.strategies[options.offlineStrategy];
            return strategy
                .handle({ request, event })
                .catch(() => caches.match(options.offlinePage));
        });
    }
}

function workboxExtensions(workbox, options) {
        console.log("workbox workboxExtensions", scriptURL, options.workboxExtensions);

        <%= options.workboxExtensions %>;
}

function cachingExtensions(workbox, options) {
        console.log("workbox cachingExtensions", scriptURL, options.cachingExtensions);

        <%= options.cachingExtensions %>;
}

function routingExtensions(workbox, options) {
        console.log("workbox routingExtensions", scriptURL, options.routingExtensions);
        <%= options.routingExtensions %>;
}

self.addEventListener("message", function (event) {
    var data = event.data;
    var port = event.ports[0];
    if (data.name === 'registerRoute') {
        console.log("workbox onmessage runtimeCaching", data.name, data.options);
        runtimeCaching(workbox, data.options);
    }
});
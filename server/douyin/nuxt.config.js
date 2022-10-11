import fs from "fs";
import lodash from "lodash";
import path from "path";
const childProcess = require('child_process');
const minifyHtml = require('html-minifier').minify;
const packageConfig = require('./package.json');
const SpritesmithPlugin = require('webpack-spritesmith');
const XmlDOMParser = require('xmldom').DOMParser;
const yargs = require('yargs-parser');
const isProd = process.env.NODE_ENV === 'production';
const isDev = process.env.NODE_ENV === 'development';
const dt = Date.now();
const isPreprod = !!process.env.PREPROD;

const args = yargs(process.argv.slice(2));
// 获取参数PID
const pid = args.pid;
const pidConfig = require(`./build/pids/${pid}/`).default;

if (!pid) {
    console.warn("PID is error, can't build");
    process.exit();
}

const distDir = "www";
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
}

function getAppName() {
    if (isPreprod) return pidConfig.shortName + '预发版';
    else if (isProd) return pidConfig.name;
    else return pidConfig.shortName + '测试版';
}

function getPWAAppName() {
    if (isPreprod) return pidConfig.shortName + 'PWA预发版';
    else if (isProd) return pidConfig.name;
    else return pidConfig.shortName + 'PWA测试版';
}

function initAppRes() {
    const appTemplateCompiled = lodash.template(fs.readFileSync(path.join(__dirname, "./templates/app.html")));
    const appContent = appTemplateCompiled({
        'logo': pidConfig.startPage.logo,
        'logoSize': pidConfig.startPage.logoSize,
        'backgroundColor': pidConfig.startPage.backgroundColor,
        'backgroundImage': pidConfig.startPage.backgroundImage,
        'officialWeb': pidConfig.officialWeb
    });

    // 更新html模版
    fs.writeFileSync(path.join(__dirname, "app.html"), minifyHtml(appContent, { removeComments: true, collapseWhitespace: true }));
    // 更新图片资源
    let cpOut = childProcess.spawnSync('cp', ['-r', path.join(__dirname, `./build/pids/${pid}/img/`), path.join(__dirname, `./assets/img/`)]).stdout.toString();
    console.log("更新图片资源 ", cpOut);

    fs.copyFileSync(path.join(__dirname, `./build/pids/${pid}/var.less`), path.join(__dirname, `./assets/var.less`));
}

initAppRes();

const env = {
    development: {
        NODE_ENV: process.env.NODE_ENV,
        PID: pidConfig.id,
        LOG: true,
        API_URLS: ["https://douyin-api.ybunx.com/api/v1/"],
        WEB_URLS: [],
        VERSION: packageConfig.version,
        BUILDTIME: dt,
        OPTIONS: {
            homePage: pidConfig.homePage,
            autoRegister: pidConfig.autoRegister,
            themeColor: pidConfig.themeColor
        }
    },
    test: {
        NODE_ENV: process.env.NODE_ENV,
        PID: pidConfig.id,
        LOG: true,
        API_URLS: ["https://douyin-api.ybunx.com/api/v1/"],
        WEB_URLS: [],
        VERSION: packageConfig.version,
        BUILDTIME: dt,
        OPTIONS: {
            homePage: pidConfig.homePage,
            autoRegister: pidConfig.autoRegister,
            themeColor: pidConfig.themeColor
        }
    },
    production: {
        NODE_ENV: process.env.NODE_ENV,
        PID: pidConfig.id,
        LOG: isPreprod | false,
        API_URLS: isPreprod ? ["https://sifang.win/api/v1/"] : pidConfig.apiUrls,
        WEB_URLS: isPreprod ? ["https://preprod.cfg435.org"] : [],
        VERSION: packageConfig.version,
        BUILDTIME: dt,
        GA: isPreprod ? "" : pidConfig.ga,
        PREPROD: isPreprod,
        OPTIONS: {
            homePage: pidConfig.homePage,
            autoRegister: pidConfig.autoRegister,
            themeColor: pidConfig.themeColor
        }
    }
};
console.log("====webpack env===", process.env.NODE_ENV, packageConfig.version, dt);

let plugins = [
    '@/plugins/env',
    '@/plugins/logger',
    '@/plugins/vant',
    '@/plugins/inject',
    '@/plugins/storage',
    '@/plugins/axios',
    '@/plugins/crypto',
    '@/plugins/cordova',
    '@/plugins/version',
    '@/plugins/route',
    '@/plugins/checkLine',
    '@/plugins/api',
    '@/plugins/userStore',
    '@/plugins/fileloader',
    '@/plugins/channel',
    '@/plugins/customer',
    '@/plugins/ga'
];

plugins.push(
    '@/plugins/serviceWork'
);

plugins.push(
    '@/plugins/main'
);

// 雪碧图处理模板
let templateFunction = function(data) {
    let shared = '.img-N { background-image: url(I); background-size:WSMpx HSMpx; }'
        .replace('N', path.parse(data.sprites[0].image).name)
        .replace('I', data.sprites[0].image)
        .replace('WSM', data.spritesheet.width)
        .replace('HSM', data.spritesheet.height);

    let perSprite = data.sprites.map(function(sprite) {
        return `.img-${sprite.name} { width: ${sprite.width}px; height: ${sprite.height}px; background-position: ${sprite.offset_x}px ${sprite.offset_y}px; }`;
    }).join('\n');
    return shared + '\n' + perSprite;
};

const htmlMeta = [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no, viewport-fit=cover' },
    { hid: 'description', name: 'description', content: '' },
    { name: 'format-detection', content: 'telephone=no' },
    { name: "apple-mobile-web-app-capable", content: "yes" }
];

const babelPlugins = [
    [
        'import',
        {
            libraryName: 'vant',
            style: (name) => {
                return `${name}/style/less.js`;
            }
        },
        'vant'
    ]
];

if (isProd) {
    htmlMeta.push({ name: "Content-Security-Policy", content: "upgrade-insecure-requests" });

    if (!isPreprod) {
        // babelPlugins.push("transform-remove-console");
    }
}

let config = {
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,
    loading: {
        continuous: true,
        duration: 5000,
        rtl: false
    },
    // Target: https://go.nuxtjs.dev/config-target
    target: 'static',
    env: env[process.env.NODE_ENV],
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: pidConfig.shortName + "-" + pidConfig.description,
        htmlAttrs: {
            lang: 'zh-cn',
            version: packageConfig.version,
            buildTime: dt,
            style: "background-color: " + pidConfig.themeColor
        },
        bodyAttrs: {
            id: pidConfig.id,
        },
        meta: htmlMeta,
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ],
        script: [{
                src: (process.env.BASE ? ("/" + process.env.BASE) : "") + "/hls.js/1.0.0/hls.light.min.js",
                defer: true,
                crossorigin: "anonymous"
            },
            // {
            //     src: "https://cdn.plyr.io/3.6.12/plyr.js",
            //     defer: true,
            //     crossorigin: "anonymous"
            // },
            {
                innerHTML: fs.readFileSync(path.join(__dirname, "assets/js/index.js")).toString(),
                type: 'text/javascript',
                charset: 'utf-8',
                body: true
            }
        ],
        __dangerouslyDisableSanitizers: ['script']
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '@/assets/css/style.less'
    ],
    generate: {
        subFolders: true
    },
    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: plugins,
    productionBrowserSourceMaps: !isProd,

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/typescript
        '@nuxt/typescript-build',
        "@nuxtjs/pwa"
    ],
    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // '@nuxtjs/axios', 
    ],
    router: {
        // mode: "hash",
        base: (process.env.BASE ? ("/" + process.env.BASE) : "") + "/",
        middleware: []
    },
    // axios: { proxy: true },
    // proxy: {
    //     '/api': {
    //         target: 'http://localhost:3000/', // 目标接口域名
    //         changeOrigin: true, // 表示是否跨域
    //         pathRewrite: {
    //             '^/api': '/', // 把 /api 替换成 /
    //             changeOrigin: true, // 表示是否跨域
    //         }
    //     }
    // },
    // Build Configuration: https://go.nuxtjs.dev/config-build
    generate: {
        dir: distDir,
        fallback: `index_v${packageConfig.version}.html`
    },
    build: {
        productionGzip: true,
        productionSourceMap: false,
        publicPath: "/app/" + packageConfig.version,
        filenames: {
            chunk: ({}) => '[name]-[contenthash:7].js'
        },
        router: {
            extendRoutes(routes, resolve) {
                routes.push({
                    name: 'index.html',
                    path: `index_v${packageConfig.version}.html`,
                    component: resolve(__dirname, 'pages/index.vue'),
                });
            },
        },
        postcss: {
            plugins: {
                'autoprefixer': {
                    overrideBrowserslist: ['Android >= 4.0', 'iOS >= 7']
                },
                'postcss-pxtorem': {
                    rootValue: 37.5,
                    propList: ['*']
                }
            },
            sourceMap: isDev,
        },
        optimization: {
            minimize: isPreprod ? false : isProd,
            runtimeChunk: false,
            splitChunks: {
                chunks: 'all',
                automaticNameDelimiter: '.',
                name: "main",
                cacheGroups: {}
            },
        },
        splitChunks: {
            layouts: !isProd,
            pages: !isProd,
            commons: !isProd
        },
        transpile: [/vant.*?less/],
        babel: {
            plugins: babelPlugins
        },
        loaders: {
            imgUrl: { limit: 5 * 1000 },
        },
        extend(config, ctx) {
            if (ctx.isDev && ctx.isClient) {
                // 雪碧图扩展webpack配置
                config.resolve.modules.push('./assets/img'); //css在哪里能找到sprite图
                config.plugins.push(new SpritesmithPlugin({
                    src: {
                        cwd: path.resolve(__dirname, './assets/img/buybg'), // 图标根路径
                        glob: '**/*.png' // 匹配任意 png 图标
                    },
                    target: {
                        image: path.resolve(__dirname, './assets/img/spr/buybg-spr.png'), // 生成雪碧图目标路径与名称
                        // 设置生成CSS背景及其定位的文件或方式
                        css: [
                            [path.resolve(__dirname, './assets/css/buybg-spr.less'), {
                                format: 'function_based_template'
                            }]
                        ]
                    },
                    customTemplates: {
                        generateSpriteName: () => {
                            return "buybg";
                        },
                        'function_based_template': templateFunction,
                    },
                    apiOptions: {
                        generateSpriteName: (fullPathToSourceFile) => {
                            const { name } = path.parse(fullPathToSourceFile);
                            return `buybg-spr-${name}`;
                        },
                        cssImageRef: "~assets/img/spr/buybg-spr.png", // css文件中引用雪碧图的相对位置路径配置
                    },
                    spritesmithOptions: {
                        padding: 4,
                    }
                }));
                config.plugins.push(new SpritesmithPlugin({
                    src: {
                        cwd: path.resolve(__dirname, './assets/img/mybg'), // 图标根路径
                        glob: '**/*.png' // 匹配任意 png 图标
                    },
                    target: {
                        image: path.resolve(__dirname, './assets/img/spr/mybg-spr.png'), // 生成雪碧图目标路径与名称
                        // 设置生成CSS背景及其定位的文件或方式
                        css: [
                            [path.resolve(__dirname, './assets/css/mybg-spr.less'), {
                                format: 'function_based_template'
                            }]
                        ]
                    },
                    customTemplates: {
                        'function_based_template': templateFunction,
                    },
                    apiOptions: {
                        generateSpriteName: (fullPathToSourceFile) => {
                            const { name } = path.parse(fullPathToSourceFile);
                            return `mybg-spr-${name}`;
                        },
                        cssImageRef: "~assets/img/spr/mybg-spr.png", // css文件中引用雪碧图的相对位置路径配置
                    },
                    spritesmithOptions: {
                        padding: 4,
                    }
                }));
                config.plugins.push(new SpritesmithPlugin({
                    src: {
                        cwd: path.resolve(__dirname, './assets/img/share-video'), // 图标根路径
                        glob: '**/*.png' // 匹配任意 png 图标
                    },
                    target: {
                        image: path.resolve(__dirname, './assets/img/spr/share-video-spr.png'), // 生成雪碧图目标路径与名称
                        // 设置生成CSS背景及其定位的文件或方式
                        css: [
                            [path.resolve(__dirname, './assets/css/share-video-spr.less'), {
                                format: 'function_based_template'
                            }]
                        ]
                    },
                    customTemplates: {
                        'function_based_template': templateFunction,
                    },
                    apiOptions: {
                        generateSpriteName: (fullPathToSourceFile) => {
                            const { name } = path.parse(fullPathToSourceFile);
                            return `share-video-spr-${name}`;
                        },
                        cssImageRef: "~assets/img/spr/share-video-spr.png", // css文件中引用雪碧图的相对位置路径配置
                    },
                    spritesmithOptions: {
                        padding: 4,
                    }
                }));
                config.plugins.push(new SpritesmithPlugin({
                    src: {
                        cwd: path.resolve(__dirname, './assets/img/share'), // 图标根路径
                        glob: '**/*.png' // 匹配任意 png 图标
                    },
                    target: {
                        image: path.resolve(__dirname, './assets/img/spr/share-spr.png'), // 生成雪碧图目标路径与名称
                        // 设置生成CSS背景及其定位的文件或方式
                        css: [
                            [path.resolve(__dirname, './assets/css/share-spr.less'), {
                                format: 'function_based_template'
                            }]
                        ]
                    },
                    customTemplates: {
                        'function_based_template': templateFunction,
                    },
                    apiOptions: {
                        generateSpriteName: (fullPathToSourceFile) => {
                            const { name } = path.parse(fullPathToSourceFile);
                            return `share-spr-${name}`;
                        },
                        cssImageRef: "~assets/img/spr/share-spr.png", // css文件中引用雪碧图的相对位置路径配置
                    },
                    spritesmithOptions: {
                        padding: 4,
                    }
                }));
                //checkin
                config.plugins.push(new SpritesmithPlugin({
                    src: {
                        cwd: path.resolve(__dirname, './assets/img/checkin'), // 图标根路径
                        glob: '**/*.png' // 匹配任意 png 图标
                    },
                    target: {
                        image: path.resolve(__dirname, './assets/img/spr/checkin-spr.png'), // 生成雪碧图目标路径与名称
                        // 设置生成CSS背景及其定位的文件或方式
                        css: [
                            [path.resolve(__dirname, './assets/css/checkin-spr.less'), {
                                format: 'function_based_template'
                            }]
                        ]
                    },
                    customTemplates: {
                        'function_based_template': templateFunction,
                    },
                    apiOptions: {
                        generateSpriteName: (fullPathToSourceFile) => {
                            const { name } = path.parse(fullPathToSourceFile);
                            return `checkin-spr-${name}`;
                        },
                        cssImageRef: "~assets/img/spr/checkin-spr.png", // css文件中引用雪碧图的相对位置路径配置
                    },
                    spritesmithOptions: {
                        padding: 4,
                    }
                }));
                config.plugins.push(new SpritesmithPlugin({
                    src: {
                        cwd: path.resolve(__dirname, './assets/img/buy-video'), // 图标根路径
                        glob: '**/*.png' // 匹配任意 png 图标
                    },
                    target: {
                        image: path.resolve(__dirname, './assets/img/spr/buy-video-spr.png'), // 生成雪碧图目标路径与名称
                        // 设置生成CSS背景及其定位的文件或方式
                        css: [
                            [path.resolve(__dirname, './assets/css/buy-video-spr.less'), {
                                format: 'function_based_template'
                            }]
                        ]
                    },
                    customTemplates: {
                        'function_based_template': templateFunction,
                    },
                    apiOptions: {
                        generateSpriteName: (fullPathToSourceFile) => {
                            const { name } = path.parse(fullPathToSourceFile);
                            return `buy-video-spr-${name}`;
                        },
                        cssImageRef: "~assets/img/spr/buy-video-spr.png", // css文件中引用雪碧图的相对位置路径配置
                    },
                    spritesmithOptions: {
                        padding: 4,
                    }
                }));
                config.plugins.push(new SpritesmithPlugin({
                    src: {
                        cwd: path.resolve(__dirname, './assets/img/notice-tips'), // 图标根路径
                        glob: '**/*.png' // 匹配任意 png 图标
                    },
                    target: {
                        image: path.resolve(__dirname, './assets/img/spr/notice-tips-spr.png'), // 生成雪碧图目标路径与名称
                        // 设置生成CSS背景及其定位的文件或方式
                        css: [
                            [path.resolve(__dirname, './assets/css/notice-tips-spr.less'), {
                                format: 'function_based_template'
                            }]
                        ]
                    },
                    customTemplates: {
                        'function_based_template': templateFunction,
                    },
                    apiOptions: {
                        generateSpriteName: (fullPathToSourceFile) => {
                            const { name } = path.parse(fullPathToSourceFile);
                            return `notice-tips-spr-${name}`;
                        },
                        cssImageRef: "~assets/img/spr/notice-tips-spr.png", // css文件中引用雪碧图的相对位置路径配置
                    },
                    spritesmithOptions: {
                        padding: 4,
                    }
                }));
            };
            config.module.rules.push({
                test: /\.(png|jpg|gif|svg)$/,
                use: [{
                    loader: 'image-webpack-loader',
                    options: {
                        mozjpeg: {
                            progressive: true,
                            quality: 70,
                        },
                        optipng: {
                            enabled: true,
                        },
                        pngquant: {
                            quality: [0.70, 0.80],
                            speed: 4,
                        },
                        gifsicle: {
                            interlaced: false,
                            colors: 64,
                            optimizationLevel: 3
                        }
                    }
                }]
            }, {
                test: /\.less$/,
                use: [{
                    loader: 'less-loader',
                    options: {
                        lessOptions: {
                            modifyVars: {
                                hack: `true; @import "./assets/var.less";`,
                            }
                        }
                    }
                }]
            });
        }
    },
};

if (!isDev) {
    function getCordovaVersionInfo() {
        const configFile = path.join(__dirname, "./config.xml");
        if (fs.existsSync(configFile)) {
            fs.unlinkSync(configFile);
        }

        const configTemplate = fs.readFileSync(path.join(__dirname, "./templates/config.xml"));
        const configTemplateCompiled = lodash.template(configTemplate);
        const configContent = configTemplateCompiled({
            pakageId: pidConfig.pakageId,
            nativeVersion: pidConfig.nativeVersion,
            apkVersionCode: pidConfig.apkVersionCode,
            iosCFBundleVersion: pidConfig.iosCFBundleVersion,
            name: getAppName(),
            description: pidConfig.description,
            icon: pidConfig.icon,
            email: pidConfig.email,
            author: pidConfig.author,
        });
        fs.writeFileSync(configFile, configContent);

        const xmlContent = fs.readFileSync(configFile).toString();

        const cordovaConfigDoc = new XmlDOMParser().parseFromString(xmlContent, 'text/xml');
        const widgetNode = cordovaConfigDoc.getElementsByTagName("widget")[0];

        const apkPackage = widgetNode.getAttribute('id');
        const version = widgetNode.getAttribute('version');
        const apkVersionCode = widgetNode.getAttribute('android-versionCode');
        const iosBundleVersionCode = widgetNode.getAttribute('ios-CFBundleVersion');

        return {
            package: apkPackage,
            version,
            apkVersionCode,
            iosBundleVersionCode,
        };
    }
    let cordovaVersion = getCordovaVersionInfo();
    let versionInfo = {
        "version": packageConfig.version,
        "buildTime": dt,
        "package": "com.zq.douying",
        "apkVersion": {
            "name": "1.1.0",
            "code": 1,
            "note": "",
            "mNative": false
        }
    };

    if (cordovaVersion) {
        console.log("cordova apk version", cordovaVersion.version);

        let udpateNote = "";
        let updateNoteFile = path.join(__dirname, "./build/update/v" + cordovaVersion.version + ".txt");
        if (fs.existsSync(updateNoteFile)) {
            udpateNote = fs.readFileSync(updateNoteFile).toString();
        }

        versionInfo.package = cordovaVersion.package;
        versionInfo.apkVersion = {
            name: cordovaVersion.version,
            note: udpateNote,
            code: cordovaVersion.apkVersionCode,
        };
    }
    fs.writeFileSync(path.join(__dirname, "static", "version.json"), JSON.stringify(versionInfo));
    fs.writeFileSync(path.join(__dirname, "static", "version.js"), "version_callback(" + JSON.stringify(versionInfo) + ");");

    fs.writeFileSync(path.join(__dirname, "static", `version_${packageConfig.version}.json`), JSON.stringify(versionInfo));
    fs.writeFileSync(path.join(__dirname, "static", `version_${packageConfig.version}.js`), "version_callback(" + JSON.stringify(versionInfo) + ");");
}

if (!isDev) {
    fs.copyFileSync(pidConfig.icon, path.join(__dirname, "static/icon.png"));
    config.pwa = {
        icon: {
            source: "/icon.png",
            fileName: "icon.png",
            sizes: [64, 120, 144, 152, 192, 384, 512],
        },
        manifest: {
            name: getPWAAppName(),
            short_name: getPWAAppName(),
            description: getPWAAppName() + "-" + pidConfig.description,
            background_color: "#000",
            theme_color: "#000",
            lang: "zh",
            start_url: (process.env.BASE ? ("/" + process.env.BASE) : "") + `/?from=pwa`,
            orientation: 'portrait'
        },
        meta: {
            theme_color: "#000",
            // lang: "zh",
            appleStatusBarStyle: "black-translucent",
        },
        workbox: {
            enabled: true,
            workboxURL: "workbox-sw.js",
            swTemplate: "templates/sw.tpl",
            autoRegister: false,
            dev: !isProd, //  "NetworkFirst" : "CacheFirst",
            offline: true,
            offlinePage: (process.env.BASE ? ("/" + process.env.BASE) : "") + `/offline.html`,
            offlineStrategy: "CacheFirst", // 'CacheFirst' | 'CacheOnly' | 'NetworkFirst' | 'NetworkOnly' | 'StaleWhileRevalidate'
            cacheAssets: true, // bool
            // offlineAssets:
            publicPath: (process.env.BASE ? ("/" + process.env.BASE) : "") + "/app/" + packageConfig.version,
            importScripts: [],
            config: {
                debug: !isProd
            },
            cacheOptions: {
                revision: packageConfig.version
            },
            assetsURLPattern: (process.env.BASE ? ("/" + process.env.BASE) : "") + "/app/",
            runtimeCaching: [{
                    urlPattern: (process.env.BASE ? ("/" + process.env.BASE) : "") + `/index.*`,
                    handler: "CacheFirst"
                },
                {
                    urlPattern: (process.env.BASE ? ("/" + process.env.BASE) : "") + "/",
                    handler: "NetworkOnly"
                },
                {
                    urlPattern: (process.env.BASE ? ("/" + process.env.BASE) : "") + "/version.*",
                    handler: "NetworkOnly"
                }
            ]
        },
        // resourceHints 提升页面加载性能与体验
        render: {
            resourceHints: false
        },
    };
}
export default config;
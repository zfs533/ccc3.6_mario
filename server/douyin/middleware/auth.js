export default async function (context) {
    console.log("auth");
    // await context.$userStore.getMyInfo();
    // if (context.route.path !== "/login") {
    //     if (!context.$userStore.isLogin()) {
    //         context.$userStore.Logout();

    //         let channel = context.$channel.getChannel();
    //         if (context.route.path === "/") {
    //             if (!channel) {
    //                 context.route.query.channel ? context.route.query.channel : "";
    //                 if (!channel || channel == "") {
    //                     try {
    //                         let clipboardVal = await navigator.clipboard.readText();
    //                         if (!!clipboardVal) {
    //                             channel = v;
    //                         }
    //                     } catch { }
    //                 }
    //                 context.$channel.setChannel(channel);
    //             }
    //         }

    //         await context.$api.signin({
    //             // login:"xxx",//  用户名
    //             verifyType: "anonymous",
    //             platform: "web",
    //             channel: channel
    //         }, true);
    //     }
    // }
}
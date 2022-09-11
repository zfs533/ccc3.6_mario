
export default (context, inject) => {
    console.log("plugin channel init");

    let inited = false;
    let channel = "";
    let promoteCode = "";
    function setChannel(c) {
        channel = c;
        if (c) {
            context.$storage.set("channel", c);
        }
    }
    function getChannel() {
        if (context.$cordova) {
            return context.$cordova.getChannel();
        }
        return channel;
    }

    function setPromoteCode(c) {
        promoteCode = c;
        if (c) {
            context.$storage.set("promoteCode", c);
        }
    }
    
    function getPromoteCode() {
        if (context.$cordova) {
            return context.$cordova.getInviteCode();
        }
        return promoteCode;
    }

    function init() {
        if (inited) return;
        inited = true;
        channel = context.$storage.getString("channel");
        promoteCode = context.$storage.getString("promoteCode");
    }
    init();

    inject("channel", {
        setChannel,
        getChannel,
        setPromoteCode,
        getPromoteCode
    });
};
export default class ServerConfig {
    public static port = 9001;
    public static ip = "0.0.0.0";
    public static remoteIp = "0.0.0.0";
    public static dbName = "chat";
    public static dbPort = 27017;

    public static dev = {
        local: 0,
        remote: 1
    }
    constructor() { }
    public static getIp(index: number): string {
        if (index == this.dev.local) {
            return this.ip;
        }
        else if (index == this.dev.remote) {
            return this.remoteIp;
        }
        return this.ip;
    }
}

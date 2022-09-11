
import EventManager from "./EventManager";
import ClientSocket from "../net/clientSocket";
import { FrameInfo, User } from "../utils/globalUtils";
import Logger from "../utils/logger";
import { Router } from "../controller/routers";

/* 客户端 socket 连接管理 */
export default class ClientManager {
    private static _instance: ClientManager;
    private _index: number = 1000;
    public static get Instance(): ClientManager {
        if (!ClientManager._instance) {
            ClientManager._instance = new ClientManager();
        }
        return ClientManager._instance;
    }
    /* 玩家数组 */
    private _clients: ClientSocket[] = [];
    constructor() {
        EventManager.Instance.registerEevent(EventManager.EvtSaveUserSocket, this._evtSaveUser.bind(this), this);
        EventManager.Instance.registerEevent(EventManager.EvtRemoveUserSocket, this._evtRemoveUser.bind(this), this);
    }

    /**
     * 保存客户端socket
     * @param client 
     */
    private _evtSaveUser(client: ClientSocket): void {
        var userlist = [];
        for (let i = 0; i < this._clients.length; i++) {
            userlist.push(this._clients[i].userId);
        }

        let user: User = { id: client.userId, x: 0, y: 0, z: 0 };
        for (let i = 0; i < this._clients.length; i++) {
            this._clients[i].sendMsg(Router.rut_upLine, user);
        }
        Logger.info("*玩家上线* " + client.userId);

        this._clients.push(client);
        client.sendMsg(Router.rut_upLineSelf, user);
        if (userlist.length > 0) {
            client.sendMsg(Router.rut_user_list, userlist);
        }
    }
    /**
     * 移除客户端socket
     * @param client 
     */
    private _evtRemoveUser(client: ClientSocket): void {
        /* 玩家有可能已加入房间,所以要过一遍从房间删除玩家的操作 */
        for (let i = 0; i < this._clients.length; i++) {
            if (this._clients[i].userId == client.userId) {
                this._clients.splice(i, 1);
                Logger.info("*已移除下线玩家* " + client.userId);
                break;
            }
        }

        let user: User = { id: client.userId, x: 0, y: 0, z: 0 };
        for (let i = 0; i < this._clients.length; i++) {
            this._clients[i].sendMsg(Router.rut_downLine, user);
        }
    }

    /**
     * 获取客户端唯一标示id
     */
    public getId(): number {
        return this._index++;
    }

    public publishMovePosition(router: string, data: FrameInfo) {
        for (let i = 0; i < this._clients.length; i++) {
            this._clients[i].sendMsg(router, data);
        }
    }

}
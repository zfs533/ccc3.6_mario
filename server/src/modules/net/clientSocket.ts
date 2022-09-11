
import { FrameInfo, Head, User } from "../utils/globalUtils";
import DataViewUtils from "../utils/dataviewUtils";
import Logger from "../utils/logger";
import { Router } from "../controller/routers";
import EventManager from "../common/EventManager";
import ClientManager from "../common/clientManager";

/* 客户端连接socket类 */
export default class ClientSocket {
    public userId: number = 0;
    /* socket连接对象，收发数据 */
    public socket: any;
    public serverType: number = 102;
    private dataType: any;
    public frameInfo: FrameInfo = null;

    constructor(socket: any) {
        this.socket = socket;
        this._init();
    }

    private _init(): void {
        this.userId = ClientManager.Instance.getId();
        this.socket.on('message', this._resaveMassage.bind(this));
        this.socket.on('close', this._clientClose.bind(this));
    }

    /**
     * 接收消息
     * @param message 
     */
    private _resaveMassage(message: any): void {
        this.dataType = typeof (message);
        console.log("datatype: " + this.dataType);
        if (this.dataType == 'string') {
            Logger.info(message);
        }
        else {
            let buf = new Uint8Array(message).buffer;
            let dtView = new DataView(buf);
            let head: Head = DataViewUtils.getHeadData(dtView);
            let body = DataViewUtils.decoding(dtView, buf.byteLength);
            this.serverType = head.serverType;
            this._handleClientData(head, body);
        }
    }

    /**
     * 发送消息
     * @param {JSON} data 
     */
    public sendMsg(router: string, body: any): void {
        Logger.info("-----------------sendMsg-----------------");
        let id = this.userId;
        Logger.info(router, body, id);
        let serverType = this.serverType;
        if (this.dataType == 'string') {
            this.socket.send(JSON.stringify({ id: id, serverType: serverType, router: Number(router), body: body }));
        }
        else {
            let data = DataViewUtils.encoding(id, serverType, Number(router), body);
            this.socket.send(data);
        }
    }

    private _clientClose(client: any): void {
        console.log("*玩家下线* " + this.userId);
        EventManager.Instance.dispatchEvent(EventManager.EvtRemoveUserSocket, this);
    }

    private async _handleClientData(head: Head, data: any): Promise<any> {
        Logger.info("-----------------resaveMsg-----------------");
        let router = head.router;
        Logger.info(head, data);
        switch (router) {
            case Router.rut_move:
                this.frameInfo = data //FrameInfo
                ClientManager.Instance.publishMovePosition(router, this.frameInfo);

            default: break;
        }
    }

}


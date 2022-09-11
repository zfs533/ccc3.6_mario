import { _decorator, Component, Node, view } from 'cc';
import { clientEvent } from '../../../framework/clientEvent';
import { Constant } from '../../../framework/constant';
const { ccclass, property } = _decorator;

@ccclass('camera')
export class camera extends Component {

    private _winSize = view.getVisibleSize();
    start() {
        this._init();
        this._addListener();
    }

    private _init() {

    }

    private _addListener() {
        clientEvent.on(Constant.EVENT_TYPE.MoveCamera, this._evtMoveCamera, this);
        clientEvent.on(Constant.EVENT_TYPE.StopCamera, this._evtStopCamera, this);
    }

    onDestroy() {
        clientEvent.off(Constant.EVENT_TYPE.MoveCamera, this._evtMoveCamera, this);
        clientEvent.off(Constant.EVENT_TYPE.StopCamera, this._evtStopCamera, this);
    }
    /**
     * 摄像机跟着角色移动
     * @param params 
     */
    private _evtMoveCamera(params: any[]) {
        let rolePos = params[0];
        let offset: number = params[1];
        let pos = this.node.getPosition();
        if (rolePos.x - pos.x > this._winSize.width / 2) {
            this._startMove(offset);
        }
        else if (rolePos.x > this._winSize.width / 2 && rolePos.x - pos.x < 400) {
            this._startMove(offset);
        }
        else if (rolePos.x <= this._winSize.width / 2 && pos.x > 0) {
            this._startMove(offset);
        }
    }

    private _startMove(offset: number) {
        let pos = this.node.getPosition();
        pos.x += offset;
        this.node.setPosition(pos);
        clientEvent.dispatchEvent(Constant.EVENT_TYPE.MoveJoystick, offset);
    }
    private _evtStopCamera() {

    }
}


import { _decorator, Component, Animation, tween, v3, Vec3 } from 'cc';
import { clientEvent } from '../../framework/clientEvent';
import { Constant } from '../../framework/constant';
import { getBrickIndex } from '../../net/util';
const { ccclass, property } = _decorator;

@ccclass('brick')
export class brick extends Component {
    public index: number = 0;
    private _isMoving: boolean = false;
    private _originPos: Vec3 = undefined;
    start() {
        this._init();
        this._addListener();
    }

    private _addListener() {
        clientEvent.on(Constant.EVENT_TYPE.BrickMove + this.index, this._evtBrickMove, this);
    }

    onDestroy() {
        clientEvent.off(Constant.EVENT_TYPE.BrickMove + this.index, this._evtBrickMove, this);
    }

    private _evtBrickMove(idx) {
        if (idx == this.index) {
            this._playMoveUp();
        }
    }

    private _playMoveUp() {
        if (this._isMoving) { return }
        this._isMoving = true;
        let pos = this._originPos;//this.node.getPosition();
        let gap = 3;
        let time = 0.1;
        tween(this.node).to(time, { position: v3(pos.x, pos.y + gap, pos.z) }).then(
            tween(this.node).to(time, { position: v3(pos.x, pos.y, pos.z) }).call(() => {
                this._isMoving = false;
            }).start()
        ).start();
    }

    private _init() {
        this.index = getBrickIndex();
        this._originPos = this.node.getPosition();
    }
}


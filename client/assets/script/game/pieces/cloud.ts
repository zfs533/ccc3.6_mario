import { _decorator, Component, Node, tween, Vec3, v3 } from 'cc';
import { getBrickIndex } from '../../net/util';
const { ccclass, property } = _decorator;

@ccclass('cloud')
export class cloud extends Component {
    public index: number = 0;
    private _originPos: Vec3 = new Vec3();
    start() {
        this.index = getBrickIndex();
        this._originPos = this.node.getPosition();
        this._startMove();
    }

    private _startMove() {
        let time = 5;
        let node = this.node;
        tween(node).to(time, { position: v3(this._originPos.x + 30, this._originPos.y, 0) }).then(
            tween(node).to(time, { position: v3(this._originPos.x - 30, this._originPos.y, 0) }).start()
        ).call(() => { this._startMove() }).start();
    }
}


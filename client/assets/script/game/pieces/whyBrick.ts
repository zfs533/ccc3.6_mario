import { _decorator, Component, Node, Vec3, tween, v3, SpriteFrame, SpriteComponent, Sprite, instantiate } from 'cc';
import { clientEvent } from '../../framework/clientEvent';
import { Constant } from '../../framework/constant';
import { ResourcePath } from '../../framework/enum';
import { resourceUtil } from '../../framework/resourceUtil';
import { getBrickIndex } from '../../net/util';
import { coin } from './coin';
const { ccclass, property } = _decorator;

@ccclass('whyBrick')
export class whyBrick extends Component {
    public index: number = 0;
    private _isGot: boolean = false;//是否已经顶过了
    start() {
        this._init();
        this._addListener();
    }

    private _addListener() {
        clientEvent.on(Constant.EVENT_TYPE.TopWhy + this.index, this._evtTopWhy, this);
    }

    onDestroy() {
        clientEvent.off(Constant.EVENT_TYPE.TopWhy + this.index, this._evtTopWhy, this);
    }

    private _evtTopWhy(idx) {
        if (idx == this.index && !this._isGot) {
            this._playMoveUp();
        }
    }

    private async _playMoveUp() {
        this._isGot = true;
        resourceUtil.setSpriteFrame(ResourcePath.textureBrick + "whyDown", this.node.getComponent(Sprite), () => { });
        let pre = await resourceUtil.loadPiecesPriefabRes("coin")
        if (pre) {
            //加载金币并发送消除金币事件
            let node = instantiate(pre) as Node;
            this.node.addChild(node);
            let idx = node.getComponent(coin).index;
            console.log("222222");
            clientEvent.dispatchEvent(Constant.EVENT_TYPE.CoinRemove + idx);
        }
    }

    private _init() {
        this.index = getBrickIndex();
    }
}


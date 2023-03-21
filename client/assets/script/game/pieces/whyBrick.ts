import { _decorator, Component, Node, Vec3, tween, v3, SpriteFrame, SpriteComponent, Sprite, instantiate, Enum, UITransform, Prefab } from 'cc';
import { clientEvent } from '../../framework/clientEvent';
import { Constant } from '../../framework/constant';
import { ResourcePath, whyType } from '../../framework/enum';
import { PoolManager } from '../../framework/poolManager';
import { resourceUtil } from '../../framework/resourceUtil';
import { getBrickIndex } from '../../net/util';
import { coin } from './coin';
const { ccclass, property } = _decorator;

@ccclass('whyBrick')
export class whyBrick extends Component {
    @property({ type: Enum(whyType) })
    type: whyType = whyType.normal;

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
            switch (this.type) {
                case whyType.normal:
                    this._playMoveUp();
                    break;

                case whyType.mushroom:
                    this._loadMushroom();
                    break;
            }
        }
    }

    private async _loadMushroom() {
        this._isGot = true;
        this._setFinishedStatus();
        let pre = await resourceUtil.loadPiecesPriefabRes("mushroom")
        if (pre) {
            //蘑菇mushroom
            let node = instantiate(pre) as Node;
            let pos = this.node.getWorldPosition();
            node.setWorldPosition(pos);
            clientEvent.dispatchEvent(Constant.EVENT_TYPE.AddToMap, node);
        }
    }
    private async _playMoveUp() {
        this._isGot = true;
        this._setFinishedStatus();
        let pre:Prefab = await resourceUtil.loadPiecesPriefabRes("coin")
        if (pre) {
            //加载金币并发送消除金币事件
            // let node = await PoolManager.Inst.getNode(pre,this.node);
            let node = instantiate(pre) as Node;
            this.node.addChild(node);
            let idx = node.getComponent(coin).index;
            clientEvent.dispatchEvent(Constant.EVENT_TYPE.CoinRemove + idx);
        }
    }

    private _setFinishedStatus() {
        resourceUtil.setSpriteFrame(ResourcePath.textureBrick + "whyDown", this.node.getComponent(Sprite), () => { });
    }

    private _init() {
        this.index = getBrickIndex();
    }
}


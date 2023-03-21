import { _decorator, Component, Node, BoxCollider2D, RigidBody2D, Collider2D, IPhysics2DContact, Contact2DType } from 'cc';
import { AudioManager } from '../../framework/audioManager';
import { clientEvent } from '../../framework/clientEvent';
import { Constant } from '../../framework/constant';
import { PoolManager } from '../../framework/poolManager';
import { getBrickIndex } from '../../net/util';
import { baseCollider } from '../collider/baseCollider';
const { ccclass, property } = _decorator;

@ccclass('coin')
export class coin extends Component {
    public index: number = 0;
    private _isDistoried:boolean = false;
    private _lastColliderName:string = "";
    onEnable() {
        this._init();
        this._addListener();
    }

    private _addListener() {
        clientEvent.on(Constant.EVENT_TYPE.CoinRemove + this.index, this._evtCoinRemove, this);
    }

    onDestroy() {
        clientEvent.off(Constant.EVENT_TYPE.CoinRemove + this.index, this._evtCoinRemove, this);
    }
    private _init() {
        this.index = getBrickIndex();
        this._handleCollider();
    }

    private _evtCoinRemove(isImideltly: boolean = false) {
        if(this._isDistoried) return;
        this._isDistoried = true;
        AudioManager.instance.playSound("smb_coin",false);
        this.scheduleOnce(()=>{
            if (isImideltly) {
                this.node.destroy();
                // PoolManager.Inst.setNode(this.node);
            }
            else {
                this.scheduleOnce(() => {
                    this.node.destroy();
                    // PoolManager.Inst.setNode(this.node);
                }, 0.5);
            }
        },0.0000001);//目前还不清楚为什么要定时器，不这样，碰撞立即消除就会报错，哈哈
    }

    private _handleCollider() {
        let collider = this.node.getChildByName("coinCollider").getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.END_CONTACT, this._onEndContact, this);
        }
    }

    /**
     * 碰撞检测
     * @param selfCollider  
     * @param otherCollider 
     * @param contact 
     */
     public onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
         // 只在两个碰撞体开始接触时被调用一次
         let name1 = selfCollider.node.name;
         let name2 = otherCollider.node.name;
         if(name2 == this._lastColliderName)return;
         this._lastColliderName = name2;
         if(name2.includes("mario")){
            this._evtCoinRemove(true);
         }
     }
     private _onEndContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 只在两个碰撞体结束接触时被调用一次
    }
}


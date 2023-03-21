import { _decorator, Component, Node, Collider2D, UITransform, IPhysics2DContact, Sprite } from 'cc';
import { clientEvent } from '../../../framework/clientEvent';
import { Constant } from '../../../framework/constant';
import { EnumEnemyStatus, MarioStatus } from '../../../framework/enum';
import { resourceUtil } from '../../../framework/resourceUtil';
import { enemy } from './enemy';
const { ccclass, property } = _decorator;
/**
 * 普通乌龟
 */
@ccclass('enemyTortoise')
export class enemyTortoise extends enemy {
    private _isDown:boolean = false;
    start(){
        super.start();
        if(this.attactedNode) this.attactedNode.active = false;
        if(this.animComp) this.animComp.active = true
        this.status = EnumEnemyStatus.walk;
        this.refreshSpeedByStatus();
    }

    public onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        super.onBeginContact(selfCollider, otherCollider, contact);
        if (this.isDeath) return;
        // 只在两个碰撞体开始接触时被调用一次
        let name1 = selfCollider.node.name;
        let name2 = otherCollider.node.name;
        if (name2.includes("mario")) {
            let y1 = selfCollider.node.position.y;
            let h2 = selfCollider.node.getComponent(UITransform).height;
            y1 += h2;
            let y2 = otherCollider.node.position.y
            if (y2 >= y1 && !this.isColider) {//这里要动态加载被踩的图片
                this.isColider = true;
                clientEvent.dispatchEvent(Constant.EVENT_TYPE.Stop);
                this.scheduleOnce(()=>{this.isColider = false},0.1);
                this.loadInsideTexture();
                if(this.status == EnumEnemyStatus.walk || this.status == EnumEnemyStatus.run){
                    this.status = EnumEnemyStatus.stand;
                }
                else if(this.status == EnumEnemyStatus.stand){
                    this.status = EnumEnemyStatus.run;
                }
                this.refreshSpeedByStatus();
            }
            else if(y2 < y1){
                clientEvent.dispatchEvent(Constant.EVENT_TYPE.MarioDeath);
            }
        }
    }

    private loadInsideTexture(){
        if(this._isDown)return;
        this._isDown = true;
        if(this.attactedNode){
            this.attactedNode.active = true;
            this.animComp.active = false;
            clientEvent.dispatchEvent(Constant.EVENT_TYPE.Jump);
        }
    }
}



import { _decorator, Animation, Node, Collider2D, IPhysics2DContact, UITransformComponent, BoxCollider2D, RigidBody2D } from 'cc';
import { clientEvent } from '../../../framework/clientEvent';
import { Constant } from '../../../framework/constant';
import { enemy } from './enemy';
const { ccclass, property } = _decorator;

@ccclass('enemyBlack')
export class enemyBlack extends enemy {

    public onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        super.onBeginContact(selfCollider, otherCollider, contact);
        if (this.isDeath) return;
        // 只在两个碰撞体开始接触时被调用一次
        let name1 = selfCollider.node.name;
        let name2 = otherCollider.node.name;
        if (name2.includes("mario")) {
            let y1 = selfCollider.node.position.y;
            let h2 = selfCollider.node.getComponent(UITransformComponent).height;
            y1 += h2;
            let y2 = otherCollider.node.position.y
            if (y2 >= y1) {
                this.playDeath();
            }
            else {
                clientEvent.dispatchEvent(Constant.EVENT_TYPE.MarioDeath);
            }
        }
    }



}


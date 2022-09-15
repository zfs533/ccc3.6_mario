import { _decorator, Component, Node, Collider2D, IPhysics2DContact, v3, tween } from 'cc';
import { clientEvent } from '../../framework/clientEvent';
import { Constant } from '../../framework/constant';
import { baseCollider } from '../collider/baseCollider';
const { ccclass, property } = _decorator;

@ccclass('mushroom')
export class mushroom extends baseCollider {
    private _speed: number = 1;
    private _normalX: number = 0;
    start() {
        super.start();
        this._addListener();

    }
    private _addListener() {
    }

    onDestroy() {
    }


    public onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 只在两个碰撞体开始接触时被调用一次
        let name1 = selfCollider.node.name;
        let name2 = otherCollider.node.name;
        if (name1.includes("mushroom")) {
            let normal = contact.getWorldManifold().normal;
            this._evtMushroomMove(normal.x);
        }
    }

    private _evtMushroomMove(offset: number) {
        if (offset != this._normalX) {
            this._speed *= -1;
            this._normalX = offset;
        }
    }

    update(deltaTime: number) {
        let pos = this.node.getPosition();
        pos.x += this._speed;
        this.node.setPosition(pos);
    }
}


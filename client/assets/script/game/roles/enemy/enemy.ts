import { _decorator, Animation, Node, Collider2D, IPhysics2DContact, RigidBody2D, BoxCollider2D } from 'cc';
import { baseCollider } from '../../collider/baseCollider';
const { ccclass, property } = _decorator;
/**
 * 怪物基类
 */
@ccclass('enemy')
export class enemy extends baseCollider {
    public speed: number = 1;
    public normalX: number = 0;
    public isDeath: boolean = false;
    public anims = {
        walk: "e1walk",
        death: "e1death",
    }
    start() {
        super.start();

    }

    onDestroy() {
    }

    public onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if (this.isDeath) return;
        // 只在两个碰撞体开始接触时被调用一次
        let name1 = selfCollider.node.name;
        let name2 = otherCollider.node.name;
        if (name1.includes("enemy")) {
            let normal = contact.getWorldManifold().normal;
            this.startMoving(normal.x);
        }
    }

    public startMoving(offset: number) {
        if (offset != this.normalX) {
            this.speed *= -1;
            this.normalX = offset;
        }
    }

    update(deltaTime: number) {
        if (this.isDeath) return;
        let pos = this.node.getPosition();
        pos.x += this.speed;
        this.node.setPosition(pos);
    }

    public playDeath() {
        this.isDeath = true;
        this.node.getComponent(Animation).play(this.anims.death)
        this.scheduleOnce(() => {
            this.node.destroy();
        }, 0.5);
    }
}


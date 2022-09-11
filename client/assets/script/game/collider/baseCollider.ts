import { Collider2D, Component, Contact2DType, IPhysics2DContact, UITransformComponent, _decorator } from 'cc';
import { clientEvent } from '../../framework/clientEvent';
import { Constant } from '../../framework/constant';
import { brick } from '../pieces/brick';
import { whyBrick } from '../pieces/whyBrick';
import { mario } from '../roles/mario/mario';
const { ccclass, property } = _decorator;

@ccclass('baseCollider')
export class baseCollider extends Component {
    start() {
        this._handleCollider();
    }
    private _handleCollider() {
        let collider = this.node.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this._onBeginContact, this);
            collider.on(Contact2DType.END_CONTACT, this._onEndContact, this);
        }
    }
    private _onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 只在两个碰撞体开始接触时被调用一次
        let name1 = selfCollider.node.name;
        let name2 = otherCollider.node.name;
        // console.log(name1, name2);
        if (name1.includes("mario") && name2.includes("wall")) {
            // console.log('onBeginContact');
            // console.log("self", selfCollider);
            // console.log("other", otherCollider);
            // console.log("contact", contact.getWorldManifold());
            let bk: brick = otherCollider.node.getComponent(brick);
            let points = contact.getWorldManifold().points;
            if (bk) {
                if (points.length > 0) {
                    let cPos = points[0];
                    let bPos = otherCollider.node.getWorldPosition();
                    if (cPos.y <= bPos.y - 8) {
                        clientEvent.dispatchEvent(Constant.EVENT_TYPE.BrickMove + bk.index, bk.index);
                    }
                    else if (cPos.y >= bPos.y + 8) {
                        let mar = selfCollider.node.getComponent(mario);
                        mar.handleColliderUp();
                    }
                }
            }
        }
        else if (name1.includes("mario") && name2.includes("coin")) {
            let bk: whyBrick = otherCollider.node.getComponent(whyBrick);
            let points = contact.getWorldManifold().points;
            if (bk) {
                if (points.length > 0) {
                    let cPos = points[0];
                    let bPos = otherCollider.node.getWorldPosition();
                    if (cPos.y <= bPos.y - 8) {
                        clientEvent.dispatchEvent(Constant.EVENT_TYPE.TopWhy + bk.index, bk.index);
                    }
                    else if (cPos.y >= bPos.y + 8) {
                        let mar = selfCollider.node.getComponent(mario);
                        mar.handleColliderUp();
                        // selfCollider.node.getComponent(mario).playWalk();
                    }
                }
            }
        }
        else if (name1.includes("mario") && name2.includes("hole")) {
            let ut = otherCollider.node.getComponent(UITransformComponent);
            let points = contact.getWorldManifold().points;
            if (ut) {
                if (points.length > 0) {
                    let cPos = points[0];
                    let bPos = otherCollider.node.getWorldPosition();
                    if (cPos.y >= bPos.y + ut.height / 2) {
                        let mar = selfCollider.node.getComponent(mario);
                        mar.handleColliderUp();
                        // selfCollider.node.getComponent(mario).playWalk();
                    }
                }
            }
        }

    }
    private _onEndContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 只在两个碰撞体结束接触时被调用一次
        // console.log('onEndContact');
    }
}


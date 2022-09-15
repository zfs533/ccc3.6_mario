import { Collider2D, Component, Contact2DType, IPhysics2DContact, UITransformComponent, _decorator } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('baseCollider')
export class baseCollider extends Component {
    start() {
        this._handleCollider();
    }
    private _handleCollider() {
        let collider = this.node.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.END_CONTACT, this._onEndContact, this);
        }
    }
    /**
     * 子类重写
     * @param selfCollider 
     * @param otherCollider 
     * @param contact 
     */
    public onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 只在两个碰撞体开始接触时被调用一次
        let name1 = selfCollider.node.name;
        let name2 = otherCollider.node.name;
    }
    private _onEndContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 只在两个碰撞体结束接触时被调用一次
        // console.log('onEndContact');
    }
}


import { BoxCollider2D, Collider2D, Component, Contact2DType, IPhysics2DContact,  PolygonCollider2D,  RigidBody2D,  _decorator } from 'cc';
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
            collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
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
    
    public onEndContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 只在两个碰撞体结束接触时被调用一次
        // console.log('onEndContact');
    }

    /**
     * 物理分组设置
     * @param group 
     */
    protected setPhysicsGroup(group:number){
        let rb2d : RigidBody2D = this.node.getComponent(RigidBody2D)
        rb2d.enabledContactListener = true;
        rb2d.group = group;
        
        let b2d:Collider2D = this.node.getComponent(BoxCollider2D);
        if(!b2d)b2d = this.node.getComponent(PolygonCollider2D);
        b2d.group = group;
    }

    protected getRigidBody2d(){
        return this.node.getComponent(RigidBody2D);
    }

    protected getBoxCollider2d(){
        return this.node.getComponent(Collider2D);
    }
}


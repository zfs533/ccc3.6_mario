import { _decorator, Component, Node, Collider2D, IPhysics2DContact, v3, tween, UITransformComponent, RigidBody2D, BoxCollider2D, math, ERigidBody2DType } from 'cc';
import { clientEvent } from '../../framework/clientEvent';
import { Constant } from '../../framework/constant';
import { baseCollider } from '../collider/baseCollider';
const { ccclass, property } = _decorator;

@ccclass('mushroom')
export class mushroom extends baseCollider {
    private _speed: number = 1;
    private _normalX: number = 0;
    private _isActive: boolean = false;
    private _group: number = 0;
    start() {
        super.start();
        this._addListener();
        this._init();
    }
    private _addListener() {
    }

    onDestroy() {
    }

    private _init() {
        this._speed = Constant.MoveSpeed / 3;
        this.node.setScale(v3(Constant.MapScale, Constant.MapScale, 1));
        let bc = this.node.getComponent(BoxCollider2D);
        this._group = bc.group;
        this._removePhysics();
        let pos = this.node.getWorldPosition();
        let height = this.node.getComponent(UITransformComponent).height * Constant.MapScale;
        this.node.setWorldPosition(v3(pos.x, pos.y - (height / Constant.MapScale), pos.z));
        pos = this.node.getWorldPosition();
        this.node.setWorldPosition(v3(pos.x, pos.y - (height), pos.z))
        // this.node.setSiblingIndex(3);

        tween(this.node).to(1, { worldPosition: v3(pos.x, pos.y, pos.z) }).call(() => {
            this._addPhysics();
        }).start();
    }

    private _removePhysics() {
        let rb = this.node.getComponent(RigidBody2D);
        rb.type = ERigidBody2DType.Static;
    }

    private _addPhysics() {
        let rb = this.node.getComponent(RigidBody2D);
        rb.type = ERigidBody2DType.Dynamic;
        this._isActive = true;
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
        if (!this._isActive) return;
        let pos = this.node.getPosition();
        pos.x += this._speed;
        this.node.setPosition(pos);
    }
}


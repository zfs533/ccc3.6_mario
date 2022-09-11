import { _decorator, Component, Node, Vec3, director, UITransformComponent, view, v3, physics, Physics2DUtils, PhysicsSystem2D, EPhysics2DDrawFlags } from 'cc';
import { clientEvent } from '../../../framework/clientEvent';
import { Constant } from '../../../framework/constant';
const { ccclass, property } = _decorator;

@ccclass('map')
export class map extends Component {
    @property(Boolean)
    isDebug: boolean = false;
    start() {
        PhysicsSystem2D.instance.enable = true;
        if (this.isDebug) {
            PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.All;
        }
        this._init();
        this._addListener();
    }

    private _addListener() {
    }

    onDestroy() {
    }

    private _init() {
        this.node.setScale(v3(Constant.MapScale, Constant.MapScale, 1));
        let size = view.getVisibleSize();
    }

    update(deltaTime: number) {
    }
}


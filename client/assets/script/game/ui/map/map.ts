import { _decorator, Component, Node, Vec3, director, UITransformComponent, view, v3, physics, Physics2DUtils, PhysicsSystem2D, EPhysics2DDrawFlags, instantiate } from 'cc';
import { Constant } from '../../../framework/constant';
import { resourceUtil } from '../../../framework/resourceUtil';
import { roleManager } from '../../roles/roleManager';
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

    private async _init() {
        this.node.setScale(v3(Constant.MapScale, Constant.MapScale, 1));
        let size = view.getVisibleSize();
        roleManager.Inst.init(this);
        roleManager.Inst.addMarioToMap();
        roleManager.Inst.addEnemyToMap();
    }

    update(deltaTime: number) {
    }
}


import { _decorator, Component, Node, Vec3, director, UITransformComponent, view, v3, physics, Physics2DUtils, PhysicsSystem2D, EPhysics2DDrawFlags, instantiate } from 'cc';
import { AudioManager } from '../../../framework/audioManager';
import { clientEvent } from '../../../framework/clientEvent';
import { Constant } from '../../../framework/constant';
import { resourceUtil } from '../../../framework/resourceUtil';
import { roleManager } from '../../roles/roleManager';
const { ccclass, property } = _decorator;

@ccclass('map')
export class map extends Component {
    @property(Boolean)
    isDebug: boolean = false;
    @property(Node)
    mushroomLayer: Node = undefined;

    start() {
        PhysicsSystem2D.instance.enable = true;
        if (this.isDebug) {
            PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.All;
        }
        this._init();
        this._addListener();
        AudioManager.instance.playMusic("mario_bg",true);
    }

    private _addListener() {
        clientEvent.on(Constant.EVENT_TYPE.AddToMap, this._evtAddToMap, this);
    }

    private _evtAddToMap(obj: Node) {
        if (obj.name.includes("mushroom")) {
            this.mushroomLayer.addChild(obj);
        }
    }

    onDestroy() {
        clientEvent.off(Constant.EVENT_TYPE.AddToMap, this._evtAddToMap, this);
    }

    private async _init() {
        Constant.CurMap = this;
        let size = view.getVisibleSize();
        roleManager.Inst.init(this);
        roleManager.Inst.addMarioToMap();
        roleManager.Inst.addEnemyToMap();
    }

    update(deltaTime: number) {
    }
}


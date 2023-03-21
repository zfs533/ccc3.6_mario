import { _decorator, Component, Node, Vec3, director, UITransform, view, v3, physics, Physics2DUtils, PhysicsSystem2D, EPhysics2DDrawFlags, instantiate, CCBoolean } from 'cc';
import { AudioManager } from '../../../framework/audioManager';
import { clientEvent } from '../../../framework/clientEvent';
import { Constant } from '../../../framework/constant';
import { roleManager } from '../../roles/roleManager';
const { ccclass, property } = _decorator;

@ccclass('map')
export class map extends Component {
    @property(CCBoolean)
    isDebug: boolean = false;
    @property(Node)
    mushroomLayer: Node = undefined;

    public mapName:string = "";
    public physicsStatus:boolean = true;

    start() {
        this.mapName = this.node.name;
        this._evtEnablePhysics(true);
        if (this.isDebug) {
            PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.All;
        }
        this._init();
        this._addListener();
        AudioManager.instance.playMusic("mario_bg",true);
    }

    private _addListener() {
        clientEvent.on(Constant.EVENT_TYPE.AddToMap, this._evtAddToMap, this);
        clientEvent.on(Constant.EVENT_TYPE.EnablePhysics, this._evtEnablePhysics, this);
    }

    private _evtAddToMap(obj: Node) {
        if (obj.name.includes("mushroom")) {
            this.mushroomLayer.addChild(obj);
        }
    }

    public addChildToMap(node:Node){
        if(node.name.includes("mario")){
            let marioNode = this.node.getChildByName("marioNode");
            if(marioNode){
                marioNode.addChild(node);
                return;
            }
        }
        this.node.addChild(node);
    }

    onDestroy() {
        clientEvent.off(Constant.EVENT_TYPE.AddToMap, this._evtAddToMap, this);
        clientEvent.off(Constant.EVENT_TYPE.EnablePhysics, this._evtEnablePhysics, this);
    }

    private async _init() {
        Constant.CurMap = this;
        Constant.CurMapWidth = this.node.getComponent(UITransform).width;
        roleManager.Inst.init(this);
        roleManager.Inst.addMarioToMap();
        roleManager.Inst.addEnemyToMap();

    }

    _evtEnablePhysics(bool:boolean){
        PhysicsSystem2D.instance.enable = bool;
        this.physicsStatus = bool;
    }
}


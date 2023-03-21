import { _decorator, Component, Node, Enum, RigidBody2D, Collider2D, IPhysics2DContact, BoxCollider2D, Vec3, UITransform } from 'cc';
import cfgHole from '../../config/cfgHole';
import { clientEvent } from '../../framework/clientEvent';
import { Constant } from '../../framework/constant';
import { EnumHole, EnumHoleMap, EnumPhysicsGroup } from '../../framework/enum';
import { baseCollider } from '../collider/baseCollider';
import { roleManager } from '../roles/roleManager';
const { ccclass, property } = _decorator;

@ccclass('hole')
export class hole extends baseCollider {

    @property({ type: Enum(EnumHole) })
    type: EnumHole = EnumHole.normal;

    @property({type:Enum(EnumHoleMap)})
    holeMapIndex:EnumHoleMap = EnumHoleMap.nono;

    private _rb2d:RigidBody2D;
    private _b2d:Collider2D;
    private _pos1:Vec3 = new Vec3();
    private _pos2:Vec3 = new Vec3();
    private _holeMap : any;
    private _isCanGo : Boolean = true;
    
    onLoad(){
        clientEvent.on(Constant.EVENT_TYPE.HoleGetDown,this._beginHoleGo,this);
    }

    onDestroy(){
        clientEvent.off(Constant.EVENT_TYPE.HoleGetDown,this._beginHoleGo,this);
    }

    start() {
        super.start();
        this._holeMap = cfgHole.getHoleMapDown(this.holeMapIndex);
        // let rb2d : RigidBody2D = this.node.getComponent(RigidBody2D)
        // rb2d.enabledContactListener = true;
        // rb2d.group = EnumPhysicsGroup.hole;
        
        // let b2d:BoxCollider2D = this.node.getComponent(BoxCollider2D);
        // b2d.group = EnumPhysicsGroup.hole;
        this.setPhysicsGroup(EnumPhysicsGroup.hole);

        this._rb2d = this.getRigidBody2d();
        this._b2d  = this.getBoxCollider2d();
    }

    /**
     * 子类重写
     * @param selfCollider 
     * @param otherCollider 
     * @param contact 
     */
    public onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if(this.type == EnumHole.canDown || this.type == EnumHole.canLeftIn){
            this._pos1 = roleManager.Inst.convertToNodeSpace(selfCollider.node);
            this._pos2 = roleManager.Inst.convertToNodeSpace(otherCollider.node);
            this._beginHoleGo();
        }
    }

    //点击向下键，遥感竖直向下进洞，TODO
    private _beginHoleGo(){
        if(this.type == EnumHole.canDown && this._isCanGo){
            if(this._pos2.y>this._pos1.y){
                let transform = this.node.getComponent(UITransform);
                if(this._pos2.x >= this._pos1.x-transform.width/2 && this._pos2.x < this._pos1.x+transform.width/2){
                    this._isCanGo = false;
                    this._b2d.enabled = false;
                    this._startGo();
                }
            }
        }
        else if(this.type ==  EnumHole.canLeftIn && this._isCanGo){
            if(this._pos2.x<this._pos1.x && this._pos2.y < this._pos1.y){
                this._isCanGo = false;
                this._b2d.enabled = false;
                this._startGo();
            }
        }
    }

    private _startGo(){
        roleManager.Inst.setMapData(this._holeMap);
        roleManager.Inst.startTranslateScene()
    }
}


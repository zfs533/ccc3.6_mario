import { _decorator, Animation, Node, Collider2D, IPhysics2DContact, RigidBody2D, BoxCollider2D } from 'cc';
import { cfgEnemy, EnemyData } from '../../../config/cfgEnemy';
import { Constant } from '../../../framework/constant';
import { EnumEnemyStatus, EnumPhysicsGroup } from '../../../framework/enum';
import { baseCollider } from '../../collider/baseCollider';
const { ccclass, property } = _decorator;
/**
 * 怪物基类
 */
@ccclass('enemy')
export class enemy extends baseCollider {
    @property(Node)
    attactedNode:Node = undefined;

    @property(Node)
    animComp:Node = undefined;

    public speed: number = 1;
    public normalX: number = 0;
    public isDeath: boolean = false;
    private _data:EnemyData = null;
    protected status:EnumEnemyStatus = EnumEnemyStatus.stand;
    protected isColider:boolean = false;//碰上了,用来处理连续碰撞造成的问题
    
    start() {
        super.start();
        this.setPhysicsGroup(EnumPhysicsGroup.enemy)
        this._data = cfgEnemy.getEnemyData(this.node.name);
        if(this.animComp){
            this.animComp.getComponent(Animation).play(this._data.walk);
        } else {
            this.node.getComponent(Animation).play(this._data.walk);
        }
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
            let scale = this.node.getScale();
            let scalex = scale.x *-1;
            this.node.setScale(scalex,scale.y,scale.z);
        }
    }

    refreshSpeedByStatus(){
        switch(this.status){
            case EnumEnemyStatus.stand:
            case EnumEnemyStatus.death:
                this.speed = 0;
                break;

            case EnumEnemyStatus.walk:
                this.speed = 1;
                break;

            case EnumEnemyStatus.run:
                this.speed = 5;
                break;
            
        }
    }

    update(deltaTime: number) {
        if (this.isDeath || !Constant.CurMap.physicsStatus) return;
        let pos = this.node.getPosition();
        pos.x += this.speed;
        this.node.setPosition(pos);
    }

    public playDeath() {
        if(this.isDeath)return;
        this.isDeath = true;
        this.node.getComponent(Animation).play(this._data.death);
        this.scheduleOnce(() => {
            this.node.destroy();
        }, 0.4);
    }

    protected getData():EnemyData{
        return this._data;
    }
}


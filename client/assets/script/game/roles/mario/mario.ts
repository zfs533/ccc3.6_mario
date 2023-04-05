import { Animation, BoxCollider2D, Collider2D, Component, IPhysics2DContact, PolygonCollider2D, RigidBody2D, tween, UITransform, v2, v3, Vec3, _decorator } from 'cc';
import { clientEvent } from '../../../framework/clientEvent';
import { Constant } from '../../../framework/constant';
import { AnimMario, EnumPhysicsGroup, MarioBodyStatus, MarioStatus } from '../../../framework/enum';
import { baseCollider } from '../../collider/baseCollider';
import { brick } from '../../pieces/brick';
import { coin } from '../../pieces/coin';
import { whyBrick } from '../../pieces/whyBrick';
import { roleManager } from '../roleManager';
const { ccclass, property } = _decorator;

@ccclass('mario')
export class mario extends baseCollider {
    private _anim: Animation = undefined;
    private _rigidbody2d: RigidBody2D = undefined;
    private _speed: number = -1;
    private _speedHalf: number = 0.5;
    private _isMoving: boolean = false;
    private _jumpPoint: Vec3 = new Vec3();
    private _status: number = 0;
    private _isDeath: boolean = false;
    private _lastColliderName:string = "";
    private _scale1:number = 2.5;
    private _scale2:number = 5;
    start() {
        super.start();
        this._init();
        this._addListener();
        this.setPhysicsGroup(EnumPhysicsGroup.mario)
    }

    private _addListener() {
        clientEvent.on(Constant.EVENT_TYPE.Move, this._evtStartMove, this);
        clientEvent.on(Constant.EVENT_TYPE.Stop, this._evtStop, this);
        clientEvent.on(Constant.EVENT_TYPE.Jump, this._evtJump, this);
        clientEvent.on(Constant.EVENT_TYPE.MarioDeath, this._evtPlayMarioDeath, this);
        clientEvent.on(Constant.EVENT_TYPE.ChangeStatus, this._evtChangeStatus, this);
    }

    onDestroy() {
        clientEvent.off(Constant.EVENT_TYPE.Move, this._evtStartMove, this);
        clientEvent.off(Constant.EVENT_TYPE.Stop, this._evtStop, this);
        clientEvent.off(Constant.EVENT_TYPE.Jump, this._evtJump, this);
        clientEvent.off(Constant.EVENT_TYPE.MarioDeath, this._evtPlayMarioDeath, this);
        clientEvent.off(Constant.EVENT_TYPE.ChangeStatus, this._evtChangeStatus, this);
    }

    private _init() {
        //过关卡的时候下一关初始化需要判断当前角色的状态
        if(Constant.BodyStatus == MarioBodyStatus.normal){
            this.node.setScale(v3(this._scale1,this._scale1,this._scale1));
        }
        else if(Constant.BodyStatus == MarioBodyStatus.huge){
            this.node.setScale(v3(this._scale2,this._scale2,this._scale2));
        }
        this._speed = Constant.MoveSpeed / 2;
        this._loadAnimComponent();
        this._loadRigidBody2d();
        this.playIdle();
    }
    private _loadAnimComponent() {
        return new Promise(resolve => {
            this._anim = this.node.getComponent(Animation);
            resolve(null);
        });
    }
    private _loadRigidBody2d() {
        return new Promise(resolve => {
            this._rigidbody2d = this.node.getComponent(RigidBody2D);
            resolve(null);
        });
    }

    update(deltaTime: number) {
        if (this._isDeath || !Constant.CurMap.physicsStatus) return;
        if(this._isMoving){
            let pos = this.node.getPosition();
            let speed = deltaTime*this._speed*250;
            pos.x += speed;
            if (pos.x <= 8) { pos.x = 8; }
            if(pos.x>=Constant.CurMapWidth - 8){pos.x = Constant.CurMapWidth - 8;}
            this.node.setPosition(pos);
            let scale = this.node.getScale();
            let gap = this._speed > 0 ? 1 : -1;
            scale.x = gap*Math.abs(scale.x);
            // this.node.setScale(scale);
            this.setOwnScale(scale);
            clientEvent.dispatchEvent(Constant.EVENT_TYPE.MoveCamera, [pos, speed]);
        }
        
        let pos = this.node.getPosition();
        if (pos.y < -40) {
            this._evtPlayMarioDeath(true);
            return;
        }
        
        switch(this._status){
            case MarioStatus.jump:
                // console.log(pos.y,this._jumpPoint.y)
                // console.log(Math.abs(pos.y - this._jumpPoint.y))
                if(Math.abs(pos.y - this._jumpPoint.y)<3){
                    if(this._isMoving){
                        this.playWalk();
                    }
                    else{
                        this.playIdle();
                    }
                }
                break;

            case MarioStatus.finish:
                this._speed = this._speedHalf;
                break;

            case MarioStatus.idle:
                this.playIdle();
                break;

            case MarioStatus.walk:
                
                break;
            default:break;
        }
    }

    async playIdle() {
        if (!this._anim) {
            await this._loadAnimComponent();
        }
        if(!this._isCandoAction(MarioStatus.idle))return;
        this._anim.play(AnimMario.idle);
    }
    async playWalk() {
        if (!this._anim) {
            await this._loadAnimComponent();
        }
        if(!this._isCandoAction(MarioStatus.walk))return;
        this._anim.play(AnimMario.walk);
    }
    async _evtPlayMarioDeath(isDown: boolean = false) {
        if (this._isDeath) return;
        if (!this._anim) {
            await this._loadAnimComponent();
        }
        if(!isDown){
             let boolhuge = await this._checkCurBodyStatus();
             if(boolhuge){
                return;
             }
        }
        this.node.getComponent(PolygonCollider2D).destroy();
        this._status = MarioStatus.death;
        this._anim.play(AnimMario.death);
        this._isDeath = true;
        let pos = this.node.getPosition();
        this.node.setPosition(v3(pos.x, pos.y + 2, pos.z));
        if (isDown) {
            this._rigidbody2d.applyForce(v2(0, 2800), v2(0, 0), true);
        }
        else {
            this._rigidbody2d.applyForce(v2(0, 1300), v2(0, 0), true);
        }
        Constant.BodyStatus = MarioBodyStatus.normal;
        //刷新复活点
        roleManager.Inst.updateAlivePoint(pos)
        //先让他复活
        this.scheduleOnce(() => {
            this.node.destroy();
            clientEvent.dispatchEvent(Constant.EVENT_TYPE.TranslateScenes);
        }, 2);
    }
    async playSwim() {
        if (!this._anim) {
            await this._loadAnimComponent();
        }
        if(!this._isCandoAction(MarioStatus.swim))return;
        this._anim.play(AnimMario.swim);
    }

    async playJump() {
        if (!this._anim) {
            await this._loadAnimComponent();
        }
        let pos = this.node.getPosition();
        this._jumpPoint = v3(pos.x,pos.y,pos.z);
        pos.y+=5;
        this.node.setPosition(pos);
        if(!this._isCandoAction(MarioStatus.jump))return;
        this._anim.play(AnimMario.jump);
        let force = 950;
        switch(Constant.BodyStatus){
            case MarioBodyStatus.normal:
                force = 950;
                break;
            case MarioBodyStatus.huge:
                force = 3950;
                break;
        }
        this._rigidbody2d.applyForce(v2(0, force), v2(0, 0), true);
    }

    /**
     * 判断当前动作是否可以执行
     * @param status 
     * @returns 
     */
    private _isCandoAction(status:MarioStatus):Boolean{
        if(this._isDeath) return false;
        if(this._status == MarioStatus.death) return false;
        if(this._status == status) return false;
        this._status = status;
        return true;
    }

    /**
     * 左右移动
     * @param pos 
     */
    private _evtStartMove(pos: Vec3) {
        if (!this._isMoving || this._status != MarioStatus.walk) {
            if(this._status != MarioStatus.jump){
                this.playWalk();
            }
        }
        this._isMoving = true;
        this._speed = pos.x < 0 ? -1 :1;
    }
    private _evtStop() {
        this._isMoving = false;
        this.playIdle();
    }

    /**
     * 跳，给一个向上的force
     */
    private async _evtJump() {
        if (!this._rigidbody2d) {
            await this._loadRigidBody2d();
        }
        if (this._status == MarioStatus.jump) {
            return;
        }
        this.playJump();
    }

    /**
     * 与砖头上面接触
     */
    handleColliderUp() {
        if (this._isMoving) {
            this.playWalk();
        }
        else {
            this.playIdle();
        }
    }

    /**
     * 碰撞检测
     * @param selfCollider  
     * @param otherCollider 
     * @param contact 
     */
    public onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 只在两个碰撞体开始接触时被调用一次
        let name1 = selfCollider.node.name;
        let name2 = otherCollider.node.name;
        if(name2 == this._lastColliderName || !Constant.CurMap.physicsStatus)return;
        this._lastColliderName = name2;
        if(this._status == MarioStatus.jump){
            this.handleColliderUp();//起跳过程中发生碰撞，直接改变状态
        }
        if(name2.includes("tower")){
            roleManager.Inst.nextLevel();
        }
        if(Constant.FinishedGame)return;
        if(name2.includes("flag")){
            this._check_gameOver();
        }

        if (name1.includes("mario") && name2.includes("wall")) {
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
                        // let mar = selfCollider.node.getComponent(mario);
                        // mar.handleColliderUp();
                    }
                }
            }
        }
        else if (name1.includes("mario") && name2.includes("coin_brick")) {
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
                    }
                }
            }
        }
        else if (name1.includes("mario") && name2.includes("hole")) {
            let ut = otherCollider.node.getComponent(UITransform);
            let points = contact.getWorldManifold().points;
            if (ut) {
                if (points.length > 0) {
                    let cPos = points[0];
                    let bPos = otherCollider.node.getWorldPosition();
                    if (cPos.y >= bPos.y + ut.height / 2) {
                    }
                }
            }
        }
        else if (name1.includes("mario") && name2.includes("ladder")) {
        }
        if(name2.includes("mushroom")){
            otherCollider.node.setScale(v3(0,0,0))
            if(Constant.BodyStatus == MarioBodyStatus.normal){
                this.handleMushroom();
            }
            else{
                this.addChangeBodyAddBullet();
            }
        }
    }

    async _checkCurBodyStatus():Promise<boolean>{
        return new Promise(resolve=>{
            if(Constant.BodyStatus == MarioBodyStatus.normal){
                resolve(false);
            }else{
                this.handleMushroom();
                resolve(true);
            }
        })
    }

    //
    private handleMushroom(){
        clientEvent.dispatchEvent(Constant.EVENT_TYPE.EnablePhysics,false);
        let scale = this.node.getScale();
        if(Constant.BodyStatus == MarioBodyStatus.normal){//变大
            let scalex1 = scale.x>0 ? 3 : -3;
            let scalex2 = scale.x>0 ? 2.8 : -2.8;
            let scalex3 = scale.x>0 ? 4 : -4;
            let scalex4 = scale.x>0 ? 3.8 : -3.8;
            let scalex5 = scale.x>0 ? 5 : -5;
            let scaley1 = scale.y>0 ? 3 : -3;
            let scaley2 = scale.y>0 ? 2.8 : -2.8;
            let scaley3 = scale.y>0 ? 4 : -4;
            let scaley4 = scale.y>0 ? 3.8 : -3.8;
            let scaley5 = scale.y>0 ? 5 : -5;
            tween(this.node).to(0.2,{scale:v3(scalex1,scaley1,scale.z)})
            .to(0.1,{scale:v3(scalex2,scaley2,scale.z)})
            .to(0.2,{scale:v3(scalex3,scaley3,scale.z)})
            .to(0.1,{scale:v3(scalex4,scaley4,scale.z)})
            .to(0.2,{scale:v3(scalex5,scaley5,scale.z)})
            .call(()=>{
                clientEvent.dispatchEvent(Constant.EVENT_TYPE.EnablePhysics,true);
                clientEvent.dispatchEvent(Constant.EVENT_TYPE.MushRoomDestroy)
                Constant.BodyStatus = MarioBodyStatus.huge;
            })
            .start();
        } else if(Constant.BodyStatus == MarioBodyStatus.huge){//变小
            let scalex1 = scale.x>0 ? 2.5 : -2.5;
            let scalex2 = scale.x>0 ? 2.8 : -2.8;
            let scalex3 = scale.x>0 ? 4 : -4;
            let scalex4 = scale.x>0 ? 3.8 : -3.8;
            let scalex5 = scale.x>0 ? 5 : -5;
            let scaley1 = scale.y>0 ? 3 : -3;
            let scaley2 = scale.y>0 ? 2.8 : -2.8;
            let scaley3 = scale.y>0 ? 4 : -4;
            let scaley4 = scale.y>0 ? 3.8 : -3.8;
            let scaley5 = scale.y>0 ? 5 : -5;
            tween(this.node)
            .to(0.2,{scale:v3(scalex5,scaley5,scale.z)})
            .to(0.1,{scale:v3(scalex4,scaley4,scale.z)})
            .to(0.2,{scale:v3(scalex3,scaley3,scale.z)})
            .to(0.1,{scale:v3(scalex2,scaley2,scale.z)})
            .to(0.2,{scale:v3(scalex1,scaley1,scale.z)})
            .call(()=>{
                clientEvent.dispatchEvent(Constant.EVENT_TYPE.EnablePhysics,true);
                clientEvent.dispatchEvent(Constant.EVENT_TYPE.MushRoomDestroy)
                Constant.BodyStatus = MarioBodyStatus.normal;
            })
            .start();
        }
    }

    //发射子弹变身
    private addChangeBodyAddBullet(){

    }

    private _check_gameOver(){
        Constant.FinishedGame = true;
        this.playWalk();
        this._status = MarioStatus.finish;
        clientEvent.dispatchEvent(Constant.EVENT_TYPE.FinishedGame);
        // this.playIdle();
        // this.scheduleOnce(()=>{
        //     this.playWalk();
        //     let pos = this.node.getPosition();
        //     let nPos = v3(pos.x+270,20.7,pos.z);
        //     tween(this.node).to(2,{position:nPos}).call(()=>{}).start();
        // },1);
    }

    private _evtChangeStatus(status:MarioStatus){
        this._status = status;
    }

    private setOwnScale(scale:Vec3){
        this.node.setScale(scale);
    }
}


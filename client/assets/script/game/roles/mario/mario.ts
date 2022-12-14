import { Animation, BoxCollider2D, Collider2D, Component, IPhysics2DContact, PolygonCollider2D, RigidBody2D, tween, UITransformComponent, v2, v3, Vec3, _decorator } from 'cc';
import { clientEvent } from '../../../framework/clientEvent';
import { Constant } from '../../../framework/constant';
import { AnimMario, MarioStatus } from '../../../framework/enum';
import { baseCollider } from '../../collider/baseCollider';
import { brick } from '../../pieces/brick';
import { whyBrick } from '../../pieces/whyBrick';
import { roleManager } from '../roleManager';
const { ccclass, property } = _decorator;

@ccclass('mario')
export class mario extends baseCollider {
    private _anim: Animation = undefined;
    private _rigidbody2d: RigidBody2D = undefined;
    private _speed: number = -1;
    private _isMoving: boolean = false;
    private _isLeft: boolean = false;
    private _isJumping: boolean = false;
    private _jumpPoint: Vec3 = new Vec3();
    private _status: number = 0;
    private _isDeath: boolean = false;
    private _lastColliderName:string = "";
    start() {
        super.start();
        this._init();
        this._addListener();
    }

    private _addListener() {
        clientEvent.on(Constant.EVENT_TYPE.Move, this._evtStartMove, this);
        clientEvent.on(Constant.EVENT_TYPE.Stop, this._evtStop, this);
        clientEvent.on(Constant.EVENT_TYPE.Jump, this._evtJump, this);
        clientEvent.on(Constant.EVENT_TYPE.MarioDeath, this._evtPlayMarioDeath, this);
    }

    onDestroy() {
        clientEvent.off(Constant.EVENT_TYPE.Move, this._evtStartMove, this);
        clientEvent.off(Constant.EVENT_TYPE.Stop, this._evtStop, this);
        clientEvent.off(Constant.EVENT_TYPE.Jump, this._evtJump, this);
        clientEvent.off(Constant.EVENT_TYPE.MarioDeath, this._evtPlayMarioDeath, this);
    }

    private _init() {
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
        if (this._isDeath) return;
        //????????????
        let pos = this.node.getPosition();
        if (this._isMoving) {
            let scale = this.node.getScale();
            let offset = 0;
            if (this._isLeft) {
                pos.x -= this._speed;
                offset = -this._speed;
                scale.x = -Math.abs(scale.x);
            }
            else {
                offset = +this._speed;
                pos.x += this._speed;
                scale.x = Math.abs(scale.x);
            }
            if (pos.x <= 8) { pos.x = 8; }
            if(pos.x>=Constant.CurMapWidth - 8){pos.x = Constant.CurMapWidth - 8;}
            this.node.setPosition(pos);
            this.node.setScale(scale);
            clientEvent.dispatchEvent(Constant.EVENT_TYPE.MoveCamera, [pos, offset]);
        }
        if (pos.y < -40) {
            this._evtPlayMarioDeath(true);
            return;
        }
        //????????????
        if (this._isJumping) {
            let pos = this.node.getPosition();
            if (pos.y <= this._jumpPoint.y + 1) {
                this._isJumping = false;

                if (!this._isMoving) {
                    this.playIdle();
                }
                else {
                    this.playWalk();
                }
            }
        }

    }
    async playIdle() {
        if (this._isDeath) return;
        if (!this._anim) {
            await this._loadAnimComponent();
        }
        this._status = MarioStatus.idle;
        this._isJumping = false;
        this._anim.play(AnimMario.idle);
    }
    async playWalk() {
        if (this._isDeath) return;
        if (this._status == MarioStatus.walk) return;
        if (!this._anim) {
            await this._loadAnimComponent();
        }
        this._status = MarioStatus.walk;
        this._anim.play(AnimMario.walk);
    }
    async _evtPlayMarioDeath(isDown: boolean = false) {
        if (this._isDeath) return;
        if (!this._anim) {
            await this._loadAnimComponent();
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
        //???????????????
        roleManager.Inst.updateAlivePoint(pos)
        //???????????????
        this.scheduleOnce(() => {
            this.node.destroy();
            // roleManager.Inst.addMarioToMap();
            clientEvent.dispatchEvent(Constant.EVENT_TYPE.TranslateScenes);
        }, 2);
    }
    async playSwim() {
        if (this._isDeath) return;
        if (!this._anim) {
            await this._loadAnimComponent();
        }
        this._status = MarioStatus.swim;
        this._anim.play(AnimMario.swim);
    }

    async playJump() {
        if (this._isDeath) return;
        if (!this._anim) {
            await this._loadAnimComponent();
        }
        let pos = this.node.getPosition();
        this._jumpPoint = pos;
        this._status = MarioStatus.jump;
        this._anim.play(AnimMario.jump);
    }

    /**
     * ????????????
     * @param pos 
     */
    private _evtStartMove(pos: Vec3) {
        if (!this._isMoving || this._status != MarioStatus.walk) {
            this.playWalk();
        }
        this._isMoving = true;
        this._isLeft = false;
        if (pos.x < 0) {
            this._isLeft = true;
        }
    }
    private _evtStop() {
        this._isMoving = false;
        this.playIdle();
    }

    /**
     * ????????????????????????force
     */
    private async _evtJump() {
        if (!this._rigidbody2d) {
            await this._loadRigidBody2d();
        }
        if (this._isJumping) {
            return;
        }
        this._isJumping = true;
        this.playJump();
        let pos = this.node.getPosition();
        this.node.setPosition(v3(pos.x, pos.y + 2, pos.z));
        this._rigidbody2d.applyForce(v2(0, 950), v2(0, 0), true);
    }

    /**
     * ?????????????????????
     */
    handleColliderUp() {
        this._isJumping = false;
        if (this._isMoving) {
            this.playWalk();
        }
        else {
            this.playIdle();
        }
    }

    /**
     * ????????????
     * @param selfCollider  
     * @param otherCollider 
     * @param contact 
     */
    public onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // ???????????????????????????????????????????????????
        let name1 = selfCollider.node.name;
        let name2 = otherCollider.node.name;
        if(name2 == this._lastColliderName)return;
        this._lastColliderName = name2;
        console.log(name2);
        if(Constant.FinishedGame)return;
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
                        let mar = selfCollider.node.getComponent(mario);
                        mar.handleColliderUp();
                    }
                }
            }
        }
        else if (name1.includes("mario") && name2.includes("coin")) {
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
                        let mar = selfCollider.node.getComponent(mario);
                        mar.handleColliderUp();
                    }
                }
            }
        }
        else if (name1.includes("mario") && name2.includes("hole")) {
            let ut = otherCollider.node.getComponent(UITransformComponent);
            let points = contact.getWorldManifold().points;
            if (ut) {
                if (points.length > 0) {
                    let cPos = points[0];
                    let bPos = otherCollider.node.getWorldPosition();
                    if (cPos.y >= bPos.y + ut.height / 2) {
                        let mar = selfCollider.node.getComponent(mario);
                        mar.handleColliderUp();
                    }
                }
            }
        }
        else if (name1.includes("mario") && name2.includes("ladder")) {
            let mar = selfCollider.node.getComponent(mario);
            mar.handleColliderUp();
        }
        if(name2.includes("flag")){
            console.log("finished_game");
            Constant.FinishedGame = true;
            clientEvent.dispatchEvent(Constant.EVENT_TYPE.FinishedGame);
            let pos = this.node.getPosition();
            let nPos = v3(pos.x+300,pos.y,pos.z);
            tween(this.node).to(2,{position:nPos});
        }
    }
}


import { Animation, Component, RigidBody2D, v2, v3, Vec3, _decorator } from 'cc';
import { clientEvent } from '../../../framework/clientEvent';
import { Constant } from '../../../framework/constant';
import { AnimMario, MarioStatus } from '../../../framework/enum';
const { ccclass, property } = _decorator;

@ccclass('mario')
export class mario extends Component {
    private _anim: Animation = undefined;
    private _rigidbody2d: RigidBody2D = undefined;
    private _speed: number = -1;
    private _isMoving: boolean = false;
    private _isLeft: boolean = false;
    private _isJumping: boolean = false;
    private _jumpPoint: Vec3 = new Vec3();
    private _status: number = 0;
    start() {
        this._init();
        this._addListener();
    }

    private _addListener() {
        clientEvent.on(Constant.EVENT_TYPE.Move, this._evtStartMove, this);
        clientEvent.on(Constant.EVENT_TYPE.Stop, this._evtStop, this);
        clientEvent.on(Constant.EVENT_TYPE.Jump, this._evtJump, this);
    }

    onDestroy() {
        clientEvent.off(Constant.EVENT_TYPE.Move, this._evtStartMove, this);
        clientEvent.off(Constant.EVENT_TYPE.Stop, this._evtStop, this);
        clientEvent.off(Constant.EVENT_TYPE.Jump, this._evtJump, this);
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
        //移动状态
        if (this._isMoving) {
            let pos = this.node.getPosition();
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
            this.node.setPosition(pos);
            this.node.setScale(scale);
            clientEvent.dispatchEvent(Constant.EVENT_TYPE.MoveCamera, [pos, offset]);
        }
        //起跳状态
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
        if (!this._anim) {
            await this._loadAnimComponent();
        }
        this._status = MarioStatus.idle;
        this._isJumping = false;
        this._anim.play(AnimMario.idle);
    }
    async playWalk() {
        if (this._status == MarioStatus.walk) return;
        if (!this._anim) {
            await this._loadAnimComponent();
        }
        this._status = MarioStatus.walk;
        this._anim.play(AnimMario.walk);
    }
    async playDeath() {
        if (!this._anim) {
            await this._loadAnimComponent();
        }
        this._status = MarioStatus.death;
        this._anim.play(AnimMario.death);
    }
    async playSwim() {
        if (!this._anim) {
            await this._loadAnimComponent();
        }
        this._status = MarioStatus.swim;
        this._anim.play(AnimMario.swim);
    }

    async playJump() {
        if (!this._anim) {
            await this._loadAnimComponent();
        }
        let pos = this.node.getPosition();
        this._jumpPoint = pos;
        this._status = MarioStatus.jump;
        this._anim.play(AnimMario.jump);
    }

    /**
     * 左右移动
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
     * 跳，给一个向上的force
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
        this._rigidbody2d.applyForce(v2(0, 1300), v2(0, 0), true);
    }

    /**
     * 与砖头上面接触
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
}


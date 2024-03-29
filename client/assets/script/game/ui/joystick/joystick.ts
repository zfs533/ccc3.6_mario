import { _decorator, Component, Node, EventTouch, Vec3, UITransform, input, Input, EventKeyboard, KeyCode, view } from 'cc';
import { AudioManager } from '../../../framework/audioManager';
import { clientEvent } from '../../../framework/clientEvent';
import { Constant } from '../../../framework/constant';
const { ccclass, property } = _decorator;

@ccclass('joystick')
export class joystick extends Component {
    @property(Node)
    joystickBg: Node = undefined as unknown as Node;

    @property(Node)
    joystickBar: Node = undefined as unknown as Node;

    private _originPos: Vec3 = new Vec3();

    private _R: number = 100;
    private _offsetX: number = 0;
    private _isUseful: boolean = false;
    private _isFinished: boolean = false;

    onLoad() {
        this._init();
        this.node.on(Node.EventType.TOUCH_START, this._touchStart, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this._touchMove, this);
        this.node.on(Node.EventType.TOUCH_END, this._touchEnd, this);
        this.node.on(Node.EventType.TOUCH_CANCEL, this._touchEnd, this);
        this._originPos.set(this.joystickBg.getPosition().x, this.joystickBg.getPosition().y, 0);
        //键盘事件test
        input.on(Input.EventType.KEY_DOWN, this._onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this._onKeyUp, this);

    }

    _init() {
        this._isFinished = false;
        Constant.FinishedGame = false;
        this._addListener();
    }

    private _touchStart(event: EventTouch) {
        if(this._isFinished || !Constant.CurMap.physicsStatus)return;
        let touchPos = event.getUILocation();
        let pos = new Vec3(touchPos.x, touchPos.y, 0);
        pos = this.node.parent?.getComponent(UITransform)?.convertToNodeSpaceAR(pos) as Vec3;
        /* 控制点击区域在左下半区 */
        if (pos.x > 0 || pos.y > 0) {
            this._isUseful = false;
            return;
        }
        this._isUseful = true;
        this.joystickBg.setPosition(pos);
    }

    private _touchMove(event: EventTouch) {
        if (!this._isUseful || !Constant.CurMap.physicsStatus) {
            return;
        }
        let touchPos = event.getUILocation();
        let pos = new Vec3(touchPos.x, touchPos.y, 0);
        pos = this.joystickBg?.getComponent(UITransform)?.convertToNodeSpaceAR(pos) as Vec3;
        pos.x += this._offsetX;

        pos.x = pos.x+this.node.getPosition().x;
        let radius = Math.atan2(pos.y, pos.x);
        let out = new Vec3();
        let len = Vec3.subtract(out, pos, new Vec3()).length();
        //控制移动范围在摇杆背景圆内
        if (len >= this._R) {
            let xx = Math.cos(radius) * this._R;
            let yy = Math.sin(radius) * this._R;
            this.joystickBar.setPosition(new Vec3(xx, yy, 0));
        }
        else {
            this.joystickBar.setPosition(pos);
        }
        let bPos = this.joystickBar.getPosition();
        clientEvent.dispatchEvent(Constant.EVENT_TYPE.Move, bPos);
    }

    private _touchEnd(event: EventTouch) {
        if (!this._isUseful || !Constant.CurMap.physicsStatus) return;
        this._isUseful = false;
        this.joystickBg.setPosition(this._originPos);
        this.joystickBar.setPosition(new Vec3());
        clientEvent.dispatchEvent(Constant.EVENT_TYPE.Stop);
    }
    private _onKeyDown(e: EventKeyboard) {
        if(this._isFinished || !Constant.CurMap.physicsStatus)return;
        switch (e.keyCode) {
            case KeyCode.KEY_A:
                clientEvent.dispatchEvent(Constant.EVENT_TYPE.Move, new Vec3(-1, 0, 0));
                break;
            case KeyCode.KEY_D:
                clientEvent.dispatchEvent(Constant.EVENT_TYPE.Move, new Vec3(1, 0, 0));
                break;
            case KeyCode.SPACE:
                this.jump();
                break;
        }
    }
    private _onKeyUp(e: EventKeyboard) {
        if(this._isFinished || !Constant.CurMap.physicsStatus)return;
        switch (e.keyCode) {
            case KeyCode.KEY_A:
                clientEvent.dispatchEvent(Constant.EVENT_TYPE.Stop);
                break;
            case KeyCode.KEY_D:
                clientEvent.dispatchEvent(Constant.EVENT_TYPE.Stop);
                break;
        }
    }

    private _addListener() {
        clientEvent.on(Constant.EVENT_TYPE.MoveJoystick, this._evtMoveJoystick, this);
        clientEvent.on(Constant.EVENT_TYPE.FinishedGame, this._evtFinishedGame, this);
    }

    onDestroy() {
        clientEvent.off(Constant.EVENT_TYPE.MoveJoystick, this._evtMoveJoystick, this);
        clientEvent.off(Constant.EVENT_TYPE.FinishedGame, this._evtFinishedGame, this);
    }

    /**
     * 摇杆跟着摄像机移动
     * @param params 
     */
    private _evtMoveJoystick(point:Vec3) {
        let pos = this.node.getPosition();
        pos.x = point.x;
        this.node.setPosition(pos);
    }

    private jump() {
        if(this._isFinished)return;
        AudioManager.instance.playSound("smb_jumpsmall",false);
        clientEvent.dispatchEvent(Constant.EVENT_TYPE.Jump);
    }

    private _evtFinishedGame(){
        if(this._isFinished)return;
        this._isFinished = true;
        Constant.FinishedGame = true;
    }
}


import { _decorator, Component, Node, view, v3, Vec3, TERRAIN_HEIGHT_BASE } from 'cc';
import { clientEvent } from '../../../framework/clientEvent';
import { Constant } from '../../../framework/constant';
import { roleManager } from '../../roles/roleManager';
const { ccclass, property } = _decorator;

@ccclass('camera')
export class camera extends Component {

    private _winSize = view.getVisibleSize();
    private _originPos:Vec3 = new Vec3(0,0,1000);
    start() {
        this._init();
        this._addListener();
    }

    private _init() {
        // console.log("camera pos: "+this.node.getPosition());
    }

    private _addListener() {
        clientEvent.on(Constant.EVENT_TYPE.MoveCamera, this._evtMoveCamera, this);
        clientEvent.on(Constant.EVENT_TYPE.InitCameraPos, this._evtInitCameraPos, this);
        clientEvent.on(Constant.EVENT_TYPE.StopCamera, this._evtStopCamera, this);
    }

    onDestroy() {
        clientEvent.off(Constant.EVENT_TYPE.MoveCamera, this._evtMoveCamera, this);
        clientEvent.off(Constant.EVENT_TYPE.InitCameraPos, this._evtInitCameraPos, this);
        clientEvent.off(Constant.EVENT_TYPE.StopCamera, this._evtStopCamera, this);
    }

    /**
     * 初始化摄像机位置,初始化顺序在角色登场之后
     * @param rolePos 
     */
    private _evtInitCameraPos(rolePos:Vec3){
        this._handleCameraPos(rolePos);
        let pos = this.node.getPosition();
        clientEvent.dispatchEvent(Constant.EVENT_TYPE.MoveJoystick, pos);
    }

    /**
     * 摄像机跟着角色移动
     * @param params 
     */
    private _evtMoveCamera(params: any[]) {
        let rolePos = params[0];
        this._handleCameraPos(rolePos);
    }

    private _handleCameraPos(rolePos:Vec3){
        let pos = this.node.getPosition();
        let gap = this._winSize.width/2;
        if(pos.x>=0 && rolePos.x>=400){
            pos.x = rolePos.x-gap+280;
            if(pos.x>= Constant.CurMapWidth-this._winSize.width){
                pos.x = Constant.CurMapWidth - this._winSize.width;
            }
            this.node.setPosition(pos);
            clientEvent.dispatchEvent(Constant.EVENT_TYPE.MoveJoystick, pos);
        }
        else{
            this.node.setPosition(v3(0,pos.y,pos.z));
        }
    }
    
    private _evtStopCamera() {

    }
}


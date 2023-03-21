import { _decorator, Component, Node, tween, UIOpacity, director } from 'cc';
import cfgLevel from '../../config/cfgLevel';
import { clientEvent } from '../../framework/clientEvent';
import { Constant } from '../../framework/constant';
import { resourceUtil } from '../../framework/resourceUtil';
import { roleManager } from '../roles/roleManager';
const { ccclass, property } = _decorator;

@ccclass('uiManager')
export class uiManager extends Component {
    start() {
        clientEvent.on(Constant.EVENT_TYPE.TranslateScenes,this.evtTranslateScens,this);
        this._init();
    }

    onDestroy(){
        clientEvent.off(Constant.EVENT_TYPE.TranslateScenes,this.evtTranslateScens,this);
    }

    evtTranslateScens(){
        tween(this.node.getComponent(UIOpacity)).to(1,{opacity:0}).call(()=>{
            director.loadScene("translate");
        }).start();
    }

    _init(){
        let roleMgr = roleManager.Inst;
        let level_data = roleManager.Inst.mapData//cfgLevel.data[roleMgr.bigLevel][roleMgr.smallLevel][roleMgr.sonLevel];
        resourceUtil.createMap(level_data.map,()=>{
            resourceUtil.createUI("joystick",()=>{},this.node);
        },this.node);
    }
}


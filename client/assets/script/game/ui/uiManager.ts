import { _decorator, Component, Node, tween, UIOpacity, director } from 'cc';
import { clientEvent } from '../../framework/clientEvent';
import { Constant } from '../../framework/constant';
const { ccclass, property } = _decorator;

@ccclass('uiManager')
export class uiManager extends Component {
    start() {
        clientEvent.on(Constant.EVENT_TYPE.TranslateScenes,this.evtTranslateScens,this);
    }

    onDestroy(){
        clientEvent.off(Constant.EVENT_TYPE.TranslateScenes,this.evtTranslateScens,this);
    }

    evtTranslateScens(){
        tween(this.node.getComponent(UIOpacity)).to(1,{opacity:0}).call(()=>{
            director.loadScene("translate");
        }).start();
    }
}


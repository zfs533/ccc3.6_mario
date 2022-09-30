import { _decorator, Component, Node } from 'cc';
import { AudioManager } from '../../framework/audioManager';
import { clientEvent } from '../../framework/clientEvent';
import { Constant } from '../../framework/constant';
import { getBrickIndex } from '../../net/util';
const { ccclass, property } = _decorator;

@ccclass('coin')
export class coin extends Component {
    public index: number = 0;
    onEnable() {
        this._init();
        this._addListener();
        AudioManager.instance.playSound("smb_coin",false);
        
    }


    private _addListener() {
        clientEvent.on(Constant.EVENT_TYPE.CoinRemove + this.index, this._evtCoinRemove, this);
    }

    onDestroy() {
        clientEvent.off(Constant.EVENT_TYPE.CoinRemove + this.index, this._evtCoinRemove, this);
    }
    private _init() {
        this.index = getBrickIndex();
    }

    private _evtCoinRemove(isImideltly: boolean = false) {
        if (isImideltly) {
            this.node.destroy();
        }
        else {
            this.scheduleOnce(() => {
                this.node.destroy();
            }, 0.5);
        }
    }
}


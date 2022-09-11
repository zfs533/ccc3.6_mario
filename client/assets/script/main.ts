
import { _decorator, Component, Node } from 'cc';
import { localConfig } from './framework/localConfig';
import ChessNet from './net/net';
const { ccclass, property } = _decorator;

@ccclass('Main')
export class Main extends Component {

    start() {
        //加载CSV相关配置
        // localConfig.instance.loadConfig(() => {
        //     this._loadFinish();
        // })
        ChessNet.Inst.init();
    }

    private _loadFinish() {
        // console.log("loadFinished");
        //获取单张表数据
        let dt = localConfig.instance.getTable('map003');
        console.log(dt);
        //获取表中的某一项
        // dt = localConfig.instance.queryOne("power", "ID", 1);
        dt = localConfig.instance.queryByID("map003", "1");
        console.log(dt);
        //以数组形式还回数据
        dt = localConfig.instance.getTableArr("map003");
        console.log(dt);
    }

}

import { _decorator, Component, Node, instantiate, Vec3, UITransform } from 'cc';
import cfgHole from '../../config/cfgHole';
import cfgLevel from '../../config/cfgLevel';
import { clientEvent } from '../../framework/clientEvent';
import { Constant } from '../../framework/constant';
import { RoleEnum } from '../../framework/enum';
import { resourceUtil } from '../../framework/resourceUtil';
import { map } from '../ui/map/map';
const { ccclass, property } = _decorator;

@ccclass('roleManager')
export class roleManager {
    private _map: map;
    private _initRolePos = new Vec3();//角色初始化默认位置
    private _initEnemyPos = new Vec3(1000, 20.5, 0);//角色初始化默认位置
    private static _instance: roleManager;
    public bigLevel:string = "1";   //大关卡
    public smallLevel:string = "1"; //小关卡
    public sonLevel:number = 0;     //小关卡中的关卡
    public levelData = null;        //当前所在关卡地图数据
    private levelList = [];         //当前小关卡中的不同场景地图列表
    public alivePoint:number = 0;
    private _isNext:Boolean = false;//防止多次切换地图

    public mapData:any = null;     //当前地图数据，给；一个默认值
    public static get Inst(): roleManager {
        if (!this._instance) {
            this._instance = new roleManager();
            this._instance.initMapDataOnlyOnce();
        }
        return this._instance;
    }
    public init(map: map) {
        this._map = map;
        this._isNext = false;
    }

    initMapDataOnlyOnce(){
        if(this.mapData) return;
        this.mapData = cfgLevel.data["1"]["1"][0];
        
        /********** test code **********/
        // this.bigLevel = "1";
        // this.smallLevel = "2";
        // this.sonLevel = 0;
        // this.mapData = cfgHole.data["map1_2_3"]
        /********** test code  end **********/
        
        this.setMapData(this.mapData);
    }

    /**
     * 加载mario到场景地图中
     */
    public addMarioToMap() {
        this.levelList = cfgLevel.data[this.bigLevel][this.smallLevel]
        this.levelData = this.levelList[this.sonLevel];
        // this._initRolePos = this.levelData.reLifePos[this.alivePoint];
        this._initRolePos = this.mapData.reLifePos[this.alivePoint];//出身点
        console.log(this.mapData,this._initRolePos,this.alivePoint);
        this.loadRole(RoleEnum.mario, this._initRolePos);
    }

    /**
     * 加载monster到场景地图中
     */
    public addEnemyToMap() {//prefab/pieces/enemyBlack
        this.loadEnemy(RoleEnum.enemyBlack, this._initEnemyPos);
    }

    /**
     * 动态加载角色
     * @param na0me 
     * @param pos 
     */
    private async loadEnemy(name: string, pos: Vec3) {
        let pre = await resourceUtil.loadEnemyPrefabRes(name)
        if (pre) {
            //加载金币并发送消除金币事件
            let node = instantiate(pre) as Node;
            node.name = name;
            this._map.addChildToMap(node);
            // this._map.node.addChild(node);
            node.setPosition(pos);
        }
    }
    /**
     * 动态加载角色
     * @param na0me 
     * @param pos 
     */
    private async loadRole(name: string, pos: Vec3) {
        let pre = await resourceUtil.loadPiecesPriefabRes(name)
        if (pre) {
            //加载金币并发送消除金币事件
            let node = instantiate(pre) as Node;
            node.name = name;
            this._map.addChildToMap(node);
            // this._map.node.addChild(node);
            node.setPosition(pos);
            clientEvent.dispatchEvent(Constant.EVENT_TYPE.InitCameraPos,this._initRolePos);
        }
    }

    public updateAlivePoint(rolePos:Vec3){
        this.setMainTask();
        let posCfg = this.mapData.reLifePos;
        for(let i = 0 ;i <posCfg.length;i++){
            if(rolePos.x>posCfg[i].x){
                this.alivePoint = i;
            }
        }
    }

    //切换下一关或隐藏小关卡
    public nextLevel(){
        if(this._isNext)return;
        this._isNext = true;
        let length = this.levelList.length;
        let cfgLevelData = cfgLevel.data;
        let smallLevel = "no";
        let bigLevel = "no";
        if(this.sonLevel+1 == length){//小关中再无其他地图
            this.sonLevel = 0;
            let small = cfgLevelData[this.bigLevel];
            for(let key in small){
                let lv1 = Number(this.smallLevel);
                let lv2 = Number(key);
                if(lv1 + 1 == lv2){
                   smallLevel = key;//进入下一个小关卡
                   this.smallLevel = key;
                   break;
                }
            }
            if(smallLevel == "no"){
                this.smallLevel = "1";
                for(let key in cfgLevelData){
                    let lv1 = Number(this.bigLevel);
                    let lv2 = Number(key);
                    if(lv1+1 == lv2){
                        bigLevel = key;
                        this.bigLevel = key;//下一个大关卡
                        break;
                    }
                }
            }
            if(bigLevel == "no"){
                this.bigLevel = "1";//通关了，回到1-1-1
            }
        }
        else{
            this.sonLevel++;
        }
        this.setMainTask();
        this.startTranslateScene();
    }

    /**
     * 死亡复活走这里
     */
    private setMainTask(){
        let mapData = cfgLevel.data[this.bigLevel][this.smallLevel][this.sonLevel];
        console.log("主线任务")
        this.setMapData(mapData);
    }

    public setMapData(data){
        if(this.mapData && this.mapData.map != data.map){
            this.alivePoint = 0;
        }
        console.log(this.mapData.map,data.map)
        this.mapData = data;
    }

    public startTranslateScene(){
        clientEvent.dispatchEvent(Constant.EVENT_TYPE.TranslateScenes);
    }


    //转换到节点坐标系
    public convertToNodeSpace(node:Node){
        let pos = node.getWorldPosition();
        let resPos = this._map.node.getComponent(UITransform).convertToNodeSpaceAR(pos);
        return resPos;
    }
}


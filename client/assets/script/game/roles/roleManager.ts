import { _decorator, Component, Node, instantiate, Vec3 } from 'cc';
import { RoleEnum } from '../../framework/enum';
import { resourceUtil } from '../../framework/resourceUtil';
import { map } from '../ui/map/map';
const { ccclass, property } = _decorator;

@ccclass('roleManager')
export class roleManager {
    private _map: map;
    private _initRolePos = new Vec3(200, 750, 0);//角色初始化默认位置
    private _initEnemyPos = new Vec3(1000, 20.5, 0);//角色初始化默认位置
    private static _instance: roleManager
    public static get Inst(): roleManager {
        if (!this._instance) {
            this._instance = new roleManager();
        }
        return this._instance;
    }
    public init(map: map) {
        this._map = map;
    }

    /**
     * 加载mario到场景地图中
     */
    public addMarioToMap() {
        this.loadRole(RoleEnum.mario, this._initRolePos);
    }

    /**
     * 加载monster到场景地图中
     */
    public addEnemyToMap() {
        this.loadRole(RoleEnum.enemyBlack, this._initEnemyPos);
    }

    /**
     * 动态加载角色
     * @param name 
     * @param pos 
     */
    private async loadRole(name: string, pos: Vec3) {
        let pre = await resourceUtil.loadPiecesPriefabRes(name)
        if (pre) {
            //加载金币并发送消除金币事件
            let node = instantiate(pre) as Node;
            node.name = name;
            this._map.node.addChild(node);
            node.setPosition(pos);
        }
    }
}


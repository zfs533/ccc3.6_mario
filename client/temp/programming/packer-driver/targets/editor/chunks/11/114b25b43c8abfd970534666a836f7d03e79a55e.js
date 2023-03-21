System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, instantiate, Vec3, UITransform, cfgLevel, clientEvent, Constant, RoleEnum, resourceUtil, _dec, _class, _class2, _crd, ccclass, property, roleManager;

  function _reportPossibleCrUseOfcfgLevel(extras) {
    _reporterNs.report("cfgLevel", "../../config/cfgLevel", _context.meta, extras);
  }

  function _reportPossibleCrUseOfclientEvent(extras) {
    _reporterNs.report("clientEvent", "../../framework/clientEvent", _context.meta, extras);
  }

  function _reportPossibleCrUseOfConstant(extras) {
    _reporterNs.report("Constant", "../../framework/constant", _context.meta, extras);
  }

  function _reportPossibleCrUseOfRoleEnum(extras) {
    _reporterNs.report("RoleEnum", "../../framework/enum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfresourceUtil(extras) {
    _reporterNs.report("resourceUtil", "../../framework/resourceUtil", _context.meta, extras);
  }

  function _reportPossibleCrUseOfmap(extras) {
    _reporterNs.report("map", "../ui/map/map", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      instantiate = _cc.instantiate;
      Vec3 = _cc.Vec3;
      UITransform = _cc.UITransform;
    }, function (_unresolved_2) {
      cfgLevel = _unresolved_2.default;
    }, function (_unresolved_3) {
      clientEvent = _unresolved_3.clientEvent;
    }, function (_unresolved_4) {
      Constant = _unresolved_4.Constant;
    }, function (_unresolved_5) {
      RoleEnum = _unresolved_5.RoleEnum;
    }, function (_unresolved_6) {
      resourceUtil = _unresolved_6.resourceUtil;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "9856fgvky5E3bfpKHPK9WNH", "roleManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'instantiate', 'Vec3', 'UITransform']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("roleManager", roleManager = (_dec = ccclass('roleManager'), _dec(_class = (_class2 = class roleManager {
        constructor() {
          this._map = void 0;
          this._initRolePos = new Vec3();
          this._initEnemyPos = new Vec3(1000, 20.5, 0);
          this.bigLevel = "1";
          this.smallLevel = "1";
          this.sonLevel = 0;
          this.levelData = null;
          this.levelList = [];
          this.alivePoint = 0;
          this._isNext = false;
          this.mapData = null;
        }

        //当前地图数据，给；一个默认值
        static get Inst() {
          if (!this._instance) {
            this._instance = new roleManager();

            this._instance.initMapDataOnlyOnce();
          }

          return this._instance;
        }

        init(map) {
          this._map = map;
          this._isNext = false;
        }

        initMapDataOnlyOnce() {
          if (this.mapData) return;
          this.mapData = (_crd && cfgLevel === void 0 ? (_reportPossibleCrUseOfcfgLevel({
            error: Error()
          }), cfgLevel) : cfgLevel).data["1"]["1"][0];
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


        addMarioToMap() {
          this.levelList = (_crd && cfgLevel === void 0 ? (_reportPossibleCrUseOfcfgLevel({
            error: Error()
          }), cfgLevel) : cfgLevel).data[this.bigLevel][this.smallLevel];
          this.levelData = this.levelList[this.sonLevel]; // this._initRolePos = this.levelData.reLifePos[this.alivePoint];

          this._initRolePos = this.mapData.reLifePos[this.alivePoint]; //出身点

          console.log(this.mapData, this._initRolePos, this.alivePoint);
          this.loadRole((_crd && RoleEnum === void 0 ? (_reportPossibleCrUseOfRoleEnum({
            error: Error()
          }), RoleEnum) : RoleEnum).mario, this._initRolePos);
        }
        /**
         * 加载monster到场景地图中
         */


        addEnemyToMap() {
          //prefab/pieces/enemyBlack
          this.loadEnemy((_crd && RoleEnum === void 0 ? (_reportPossibleCrUseOfRoleEnum({
            error: Error()
          }), RoleEnum) : RoleEnum).enemyBlack, this._initEnemyPos);
        }
        /**
         * 动态加载角色
         * @param na0me 
         * @param pos 
         */


        async loadEnemy(name, pos) {
          let pre = await (_crd && resourceUtil === void 0 ? (_reportPossibleCrUseOfresourceUtil({
            error: Error()
          }), resourceUtil) : resourceUtil).loadEnemyPrefabRes(name);

          if (pre) {
            //加载金币并发送消除金币事件
            let node = instantiate(pre);
            node.name = name;

            this._map.addChildToMap(node); // this._map.node.addChild(node);


            node.setPosition(pos);
          }
        }
        /**
         * 动态加载角色
         * @param na0me 
         * @param pos 
         */


        async loadRole(name, pos) {
          let pre = await (_crd && resourceUtil === void 0 ? (_reportPossibleCrUseOfresourceUtil({
            error: Error()
          }), resourceUtil) : resourceUtil).loadPiecesPriefabRes(name);

          if (pre) {
            //加载金币并发送消除金币事件
            let node = instantiate(pre);
            node.name = name;

            this._map.addChildToMap(node); // this._map.node.addChild(node);


            node.setPosition(pos);
            (_crd && clientEvent === void 0 ? (_reportPossibleCrUseOfclientEvent({
              error: Error()
            }), clientEvent) : clientEvent).dispatchEvent((_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
              error: Error()
            }), Constant) : Constant).EVENT_TYPE.InitCameraPos, this._initRolePos);
          }
        }

        updateAlivePoint(rolePos) {
          this.setMainTask();
          let posCfg = this.mapData.reLifePos;

          for (let i = 0; i < posCfg.length; i++) {
            if (rolePos.x > posCfg[i].x) {
              this.alivePoint = i;
            }
          }
        } //切换下一关或隐藏小关卡


        nextLevel() {
          if (this._isNext) return;
          this._isNext = true;
          let length = this.levelList.length;
          let cfgLevelData = (_crd && cfgLevel === void 0 ? (_reportPossibleCrUseOfcfgLevel({
            error: Error()
          }), cfgLevel) : cfgLevel).data;
          let smallLevel = "no";
          let bigLevel = "no";

          if (this.sonLevel + 1 == length) {
            //小关中再无其他地图
            this.sonLevel = 0;
            let small = cfgLevelData[this.bigLevel];

            for (let key in small) {
              let lv1 = Number(this.smallLevel);
              let lv2 = Number(key);

              if (lv1 + 1 == lv2) {
                smallLevel = key; //进入下一个小关卡

                this.smallLevel = key;
                break;
              }
            }

            if (smallLevel == "no") {
              this.smallLevel = "1";

              for (let key in cfgLevelData) {
                let lv1 = Number(this.bigLevel);
                let lv2 = Number(key);

                if (lv1 + 1 == lv2) {
                  bigLevel = key;
                  this.bigLevel = key; //下一个大关卡

                  break;
                }
              }
            }

            if (bigLevel == "no") {
              this.bigLevel = "1"; //通关了，回到1-1-1
            }
          } else {
            this.sonLevel++;
          }

          this.setMainTask();
          this.startTranslateScene();
        }
        /**
         * 死亡复活走这里
         */


        setMainTask() {
          let mapData = (_crd && cfgLevel === void 0 ? (_reportPossibleCrUseOfcfgLevel({
            error: Error()
          }), cfgLevel) : cfgLevel).data[this.bigLevel][this.smallLevel][this.sonLevel];
          console.log("主线任务");
          this.setMapData(mapData);
        }

        setMapData(data) {
          if (this.mapData && this.mapData.map != data.map) {
            this.alivePoint = 0;
          }

          console.log(this.mapData.map, data.map);
          this.mapData = data;
        }

        startTranslateScene() {
          (_crd && clientEvent === void 0 ? (_reportPossibleCrUseOfclientEvent({
            error: Error()
          }), clientEvent) : clientEvent).dispatchEvent((_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
            error: Error()
          }), Constant) : Constant).EVENT_TYPE.TranslateScenes);
        } //转换到节点坐标系


        convertToNodeSpace(node) {
          let pos = node.getWorldPosition();

          let resPos = this._map.node.getComponent(UITransform).convertToNodeSpaceAR(pos);

          return resPos;
        }

      }, _class2._instance = void 0, _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=114b25b43c8abfd970534666a836f7d03e79a55e.js.map
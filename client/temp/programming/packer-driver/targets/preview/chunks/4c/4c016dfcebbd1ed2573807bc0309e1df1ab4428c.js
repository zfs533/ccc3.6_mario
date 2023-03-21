System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, instantiate, Vec3, cfgLevel, clientEvent, Constant, RoleEnum, resourceUtil, _dec, _class, _class2, _crd, ccclass, property, roleManager;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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

      __checkObsolete__(['_decorator', 'Component', 'Node', 'instantiate', 'Vec3']);

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
          this.level_data = null;
          this.alivePoint = 0;
        }

        static get Inst() {
          if (!this._instance) {
            this._instance = new roleManager();
          }

          return this._instance;
        }

        init(map) {
          this._map = map;
        }
        /**
         * 加载mario到场景地图中
         */


        addMarioToMap() {
          this.level_data = (_crd && cfgLevel === void 0 ? (_reportPossibleCrUseOfcfgLevel({
            error: Error()
          }), cfgLevel) : cfgLevel).data[this.bigLevel][this.smallLevel][this.sonLevel];
          this._initRolePos = this.level_data.reLifePos[this.alivePoint];
          this.loadRole((_crd && RoleEnum === void 0 ? (_reportPossibleCrUseOfRoleEnum({
            error: Error()
          }), RoleEnum) : RoleEnum).mario, this._initRolePos);
          (_crd && clientEvent === void 0 ? (_reportPossibleCrUseOfclientEvent({
            error: Error()
          }), clientEvent) : clientEvent).dispatchEvent((_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
            error: Error()
          }), Constant) : Constant).EVENT_TYPE.InitCameraPos, this._initRolePos);
        }
        /**
         * 加载monster到场景地图中
         */


        addEnemyToMap() {
          this.loadRole((_crd && RoleEnum === void 0 ? (_reportPossibleCrUseOfRoleEnum({
            error: Error()
          }), RoleEnum) : RoleEnum).enemyBlack, this._initEnemyPos);
        }
        /**
         * 动态加载角色
         * @param name 
         * @param pos 
         */


        loadRole(name, pos) {
          var _this = this;

          return _asyncToGenerator(function* () {
            var pre = yield (_crd && resourceUtil === void 0 ? (_reportPossibleCrUseOfresourceUtil({
              error: Error()
            }), resourceUtil) : resourceUtil).loadPiecesPriefabRes(name);

            if (pre) {
              //加载金币并发送消除金币事件
              var node = instantiate(pre);
              node.name = name;

              _this._map.node.addChild(node);

              node.setPosition(pos);
            }
          })();
        }

        updateAlivePoint(rolePos) {
          var posCfg = this.level_data.reLifePos;

          for (var i = 0; i < posCfg.length; i++) {
            if (rolePos.x > posCfg[i].x) {
              this.alivePoint = i;
            }
          }
        }

      }, _class2._instance = void 0, _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=4c016dfcebbd1ed2573807bc0309e1df1ab4428c.js.map
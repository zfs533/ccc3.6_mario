System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, tween, UIOpacity, director, cfgLevel, clientEvent, Constant, resourceUtil, roleManager, _dec, _class, _crd, ccclass, property, uiManager;

  function _reportPossibleCrUseOfcfgLevel(extras) {
    _reporterNs.report("cfgLevel", "../../config/cfgLevel", _context.meta, extras);
  }

  function _reportPossibleCrUseOfclientEvent(extras) {
    _reporterNs.report("clientEvent", "../../framework/clientEvent", _context.meta, extras);
  }

  function _reportPossibleCrUseOfConstant(extras) {
    _reporterNs.report("Constant", "../../framework/constant", _context.meta, extras);
  }

  function _reportPossibleCrUseOfresourceUtil(extras) {
    _reporterNs.report("resourceUtil", "../../framework/resourceUtil", _context.meta, extras);
  }

  function _reportPossibleCrUseOfroleManager(extras) {
    _reporterNs.report("roleManager", "../roles/roleManager", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      tween = _cc.tween;
      UIOpacity = _cc.UIOpacity;
      director = _cc.director;
    }, function (_unresolved_2) {
      cfgLevel = _unresolved_2.default;
    }, function (_unresolved_3) {
      clientEvent = _unresolved_3.clientEvent;
    }, function (_unresolved_4) {
      Constant = _unresolved_4.Constant;
    }, function (_unresolved_5) {
      resourceUtil = _unresolved_5.resourceUtil;
    }, function (_unresolved_6) {
      roleManager = _unresolved_6.roleManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "0d2d0LNTf9HTaooOF97Vmin", "uiManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'tween', 'UIOpacity', 'director']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("uiManager", uiManager = (_dec = ccclass('uiManager'), _dec(_class = class uiManager extends Component {
        start() {
          (_crd && clientEvent === void 0 ? (_reportPossibleCrUseOfclientEvent({
            error: Error()
          }), clientEvent) : clientEvent).on((_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
            error: Error()
          }), Constant) : Constant).EVENT_TYPE.TranslateScenes, this.evtTranslateScens, this);

          this._init();
        }

        onDestroy() {
          (_crd && clientEvent === void 0 ? (_reportPossibleCrUseOfclientEvent({
            error: Error()
          }), clientEvent) : clientEvent).off((_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
            error: Error()
          }), Constant) : Constant).EVENT_TYPE.TranslateScenes, this.evtTranslateScens, this);
        }

        evtTranslateScens() {
          tween(this.node.getComponent(UIOpacity)).to(1, {
            opacity: 0
          }).call(() => {
            director.loadScene("translate");
          }).start();
          this.scheduleOnce(() => {
            console.log("123");
            (_crd && clientEvent === void 0 ? (_reportPossibleCrUseOfclientEvent({
              error: Error()
            }), clientEvent) : clientEvent).dispatchEvent((_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
              error: Error()
            }), Constant) : Constant).EVENT_TYPE.CoinRemove + 2, true);
          }, 5);
        }

        _init() {
          let map = "map";
          let roleMgr = (_crd && roleManager === void 0 ? (_reportPossibleCrUseOfroleManager({
            error: Error()
          }), roleManager) : roleManager).Inst;
          let level_data = (_crd && cfgLevel === void 0 ? (_reportPossibleCrUseOfcfgLevel({
            error: Error()
          }), cfgLevel) : cfgLevel).data[roleMgr.bigLevel][roleMgr.smallLevel][roleMgr.sonLevel];
          (_crd && resourceUtil === void 0 ? (_reportPossibleCrUseOfresourceUtil({
            error: Error()
          }), resourceUtil) : resourceUtil).createMap(level_data.map, () => {
            (_crd && resourceUtil === void 0 ? (_reportPossibleCrUseOfresourceUtil({
              error: Error()
            }), resourceUtil) : resourceUtil).createUI("joystick", () => {}, this.node);
          }, this.node);
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=e02a9b61fd382598ca8c085465500d6b410118dc.js.map
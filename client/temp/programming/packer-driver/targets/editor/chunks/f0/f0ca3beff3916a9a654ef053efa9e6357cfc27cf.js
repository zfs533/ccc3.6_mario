System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, AudioManager, clientEvent, Constant, getBrickIndex, _dec, _class, _crd, ccclass, property, coin;

  function _reportPossibleCrUseOfAudioManager(extras) {
    _reporterNs.report("AudioManager", "../../framework/audioManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfclientEvent(extras) {
    _reporterNs.report("clientEvent", "../../framework/clientEvent", _context.meta, extras);
  }

  function _reportPossibleCrUseOfConstant(extras) {
    _reporterNs.report("Constant", "../../framework/constant", _context.meta, extras);
  }

  function _reportPossibleCrUseOfgetBrickIndex(extras) {
    _reporterNs.report("getBrickIndex", "../../net/util", _context.meta, extras);
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
    }, function (_unresolved_2) {
      AudioManager = _unresolved_2.AudioManager;
    }, function (_unresolved_3) {
      clientEvent = _unresolved_3.clientEvent;
    }, function (_unresolved_4) {
      Constant = _unresolved_4.Constant;
    }, function (_unresolved_5) {
      getBrickIndex = _unresolved_5.getBrickIndex;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "2f1c3N4AmpMOpgVp3U//ied", "coin", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'BoxCollider2D', 'RigidBody2D']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("coin", coin = (_dec = ccclass('coin'), _dec(_class = class coin extends Component {
        constructor(...args) {
          super(...args);
          this.index = 0;
          this._isDistoried = false;
        }

        onEnable() {
          this._init();

          this._addListener();
        }

        _addListener() {
          (_crd && clientEvent === void 0 ? (_reportPossibleCrUseOfclientEvent({
            error: Error()
          }), clientEvent) : clientEvent).on((_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
            error: Error()
          }), Constant) : Constant).EVENT_TYPE.CoinRemove + this.index, this._evtCoinRemove, this);
        }

        onDestroy() {
          (_crd && clientEvent === void 0 ? (_reportPossibleCrUseOfclientEvent({
            error: Error()
          }), clientEvent) : clientEvent).off((_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
            error: Error()
          }), Constant) : Constant).EVENT_TYPE.CoinRemove + this.index, this._evtCoinRemove, this);
        }

        _init() {
          this.index = (_crd && getBrickIndex === void 0 ? (_reportPossibleCrUseOfgetBrickIndex({
            error: Error()
          }), getBrickIndex) : getBrickIndex)();
          console.log(this.index);
        }

        _evtCoinRemove(isImideltly = false) {
          console.log("this._isDistoried: " + this._isDistoried + "  index: " + this.index);
          if (this._isDistoried) return;
          this._isDistoried = true;
          (_crd && AudioManager === void 0 ? (_reportPossibleCrUseOfAudioManager({
            error: Error()
          }), AudioManager) : AudioManager).instance.playSound("smb_coin", false);
          this.scheduleOnce(() => {
            if (isImideltly) {
              this.node.destroy(); // PoolManager.Inst.setNode(this.node);
            } else {
              this.scheduleOnce(() => {
                this.node.destroy(); // PoolManager.Inst.setNode(this.node);
              }, 0.5);
            }
          }, 0.01);
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=f0ca3beff3916a9a654ef053efa9e6357cfc27cf.js.map
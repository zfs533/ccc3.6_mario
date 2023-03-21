System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Collider2D, Contact2DType, AudioManager, clientEvent, Constant, getBrickIndex, _dec, _class, _crd, ccclass, property, coin;

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
      Collider2D = _cc.Collider2D;
      Contact2DType = _cc.Contact2DType;
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

      __checkObsolete__(['_decorator', 'Component', 'Node', 'BoxCollider2D', 'RigidBody2D', 'Collider2D', 'IPhysics2DContact', 'Contact2DType']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("coin", coin = (_dec = ccclass('coin'), _dec(_class = class coin extends Component {
        constructor() {
          super(...arguments);
          this.index = 0;
          this._isDistoried = false;
          this._lastColliderName = "";
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

          this._handleCollider();
        }

        _evtCoinRemove(isImideltly) {
          if (isImideltly === void 0) {
            isImideltly = false;
          }

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
          }, 0.0000001); //目前还不清楚为什么要定时器，不这样，碰撞立即消除就会报错，哈哈
        }

        _handleCollider() {
          var collider = this.node.getChildByName("coinCollider").getComponent(Collider2D);

          if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.END_CONTACT, this._onEndContact, this);
          }
        }
        /**
         * 碰撞检测
         * @param selfCollider  
         * @param otherCollider 
         * @param contact 
         */


        onBeginContact(selfCollider, otherCollider, contact) {
          // 只在两个碰撞体开始接触时被调用一次
          var name1 = selfCollider.node.name;
          var name2 = otherCollider.node.name;
          if (name2 == this._lastColliderName) return;
          this._lastColliderName = name2;

          if (name2.includes("mario")) {
            this._evtCoinRemove(true);
          }
        }

        _onEndContact(selfCollider, otherCollider, contact) {// 只在两个碰撞体结束接触时被调用一次
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=f3741a25de90989bd361bb2981cc9d66a767bcab.js.map
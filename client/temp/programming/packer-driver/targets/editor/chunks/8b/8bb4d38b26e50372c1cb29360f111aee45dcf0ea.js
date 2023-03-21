System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, tween, v3, clientEvent, Constant, getBrickIndex, _dec, _class, _crd, ccclass, property, brick;

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
      tween = _cc.tween;
      v3 = _cc.v3;
    }, function (_unresolved_2) {
      clientEvent = _unresolved_2.clientEvent;
    }, function (_unresolved_3) {
      Constant = _unresolved_3.Constant;
    }, function (_unresolved_4) {
      getBrickIndex = _unresolved_4.getBrickIndex;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "6654f2+kU1FV5Ftj/f4jwPW", "brick", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Animation', 'tween', 'v3', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("brick", brick = (_dec = ccclass('brick'), _dec(_class = class brick extends Component {
        constructor(...args) {
          super(...args);
          this.index = 0;
          this._isMoving = false;
          this._originPos = undefined;
        }

        start() {
          this._init();

          this._addListener();
        }

        _addListener() {
          (_crd && clientEvent === void 0 ? (_reportPossibleCrUseOfclientEvent({
            error: Error()
          }), clientEvent) : clientEvent).on((_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
            error: Error()
          }), Constant) : Constant).EVENT_TYPE.BrickMove + this.index, this._evtBrickMove, this);
        }

        onDestroy() {
          (_crd && clientEvent === void 0 ? (_reportPossibleCrUseOfclientEvent({
            error: Error()
          }), clientEvent) : clientEvent).off((_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
            error: Error()
          }), Constant) : Constant).EVENT_TYPE.BrickMove + this.index, this._evtBrickMove, this);
        }

        _evtBrickMove(idx) {
          if (idx == this.index) {
            this._playMoveUp();
          }
        }

        _playMoveUp() {
          if (this._isMoving) {
            return;
          }

          this._isMoving = true;
          let pos = this._originPos; //this.node.getPosition();

          let gap = 3;
          let time = 0.1;
          tween(this.node).to(time, {
            worldPosition: v3(pos.x, pos.y + gap, pos.z)
          }).then(tween(this.node).to(time, {
            worldPosition: v3(pos.x, pos.y, pos.z)
          }).call(() => {
            this._isMoving = false;
          }).start()).start();
        }

        _init() {
          this.index = (_crd && getBrickIndex === void 0 ? (_reportPossibleCrUseOfgetBrickIndex({
            error: Error()
          }), getBrickIndex) : getBrickIndex)(); // this._originPos = this.node.getPosition();

          this._originPos = this.node.getWorldPosition();
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=8bb4d38b26e50372c1cb29360f111aee45dcf0ea.js.map
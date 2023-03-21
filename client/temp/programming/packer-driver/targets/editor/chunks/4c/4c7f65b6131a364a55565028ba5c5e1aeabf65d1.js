System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, tween, Vec3, v3, getBrickIndex, _dec, _class, _crd, ccclass, property, cloud;

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
      Vec3 = _cc.Vec3;
      v3 = _cc.v3;
    }, function (_unresolved_2) {
      getBrickIndex = _unresolved_2.getBrickIndex;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "0ed13wTonNJqKn40C0Y2xPD", "cloud", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'tween', 'Vec3', 'v3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("cloud", cloud = (_dec = ccclass('cloud'), _dec(_class = class cloud extends Component {
        constructor(...args) {
          super(...args);
          this.index = 0;
          this._originPos = new Vec3();
        }

        start() {
          this.index = (_crd && getBrickIndex === void 0 ? (_reportPossibleCrUseOfgetBrickIndex({
            error: Error()
          }), getBrickIndex) : getBrickIndex)();
          this._originPos = this.node.getPosition();

          this._startMove();
        }

        _startMove() {
          let time = 5;
          let node = this.node;
          tween(node).to(time, {
            position: v3(this._originPos.x + 30, this._originPos.y, 0)
          }).then(tween(node).to(time, {
            position: v3(this._originPos.x - 30, this._originPos.y, 0)
          }).start()).call(() => {
            this._startMove();
          }).start();
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=4c7f65b6131a364a55565028ba5c5e1aeabf65d1.js.map
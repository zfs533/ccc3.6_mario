System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, UITransform, clientEvent, Constant, enemy, _dec, _class, _crd, ccclass, property, enemyTortoise;

  function _reportPossibleCrUseOfclientEvent(extras) {
    _reporterNs.report("clientEvent", "../../../framework/clientEvent", _context.meta, extras);
  }

  function _reportPossibleCrUseOfConstant(extras) {
    _reporterNs.report("Constant", "../../../framework/constant", _context.meta, extras);
  }

  function _reportPossibleCrUseOfenemy(extras) {
    _reporterNs.report("enemy", "./enemy", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      UITransform = _cc.UITransform;
    }, function (_unresolved_2) {
      clientEvent = _unresolved_2.clientEvent;
    }, function (_unresolved_3) {
      Constant = _unresolved_3.Constant;
    }, function (_unresolved_4) {
      enemy = _unresolved_4.enemy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "32e8ap7h19Hz6kSfhtQkcpd", "enemyTortoise", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Collider2D', 'UITransform', 'IPhysics2DContact']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("enemyTortoise", enemyTortoise = (_dec = ccclass('enemyTortoise'), _dec(_class = class enemyTortoise extends (_crd && enemy === void 0 ? (_reportPossibleCrUseOfenemy({
        error: Error()
      }), enemy) : enemy) {
        onBeginContact(selfCollider, otherCollider, contact) {
          super.onBeginContact(selfCollider, otherCollider, contact);
          if (this.isDeath) return; // 只在两个碰撞体开始接触时被调用一次

          let name1 = selfCollider.node.name;
          let name2 = otherCollider.node.name;

          if (name2.includes("mario")) {
            let y1 = selfCollider.node.position.y;
            let h2 = selfCollider.node.getComponent(UITransform).height;
            y1 += h2;
            let y2 = otherCollider.node.position.y;

            if (y2 >= y1) {
              this.playDeath();
            } else {
              (_crd && clientEvent === void 0 ? (_reportPossibleCrUseOfclientEvent({
                error: Error()
              }), clientEvent) : clientEvent).dispatchEvent((_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
                error: Error()
              }), Constant) : Constant).EVENT_TYPE.MarioDeath);
            }
          }
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=729f28b47f141f567b201c87214887891df283ce.js.map
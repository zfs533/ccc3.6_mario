System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, UITransform, clientEvent, Constant, EnumEnemyStatus, enemy, _dec, _class, _crd, ccclass, property, enemyBlack;

  function _reportPossibleCrUseOfclientEvent(extras) {
    _reporterNs.report("clientEvent", "../../../framework/clientEvent", _context.meta, extras);
  }

  function _reportPossibleCrUseOfConstant(extras) {
    _reporterNs.report("Constant", "../../../framework/constant", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEnumEnemyStatus(extras) {
    _reporterNs.report("EnumEnemyStatus", "../../../framework/enum", _context.meta, extras);
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
      EnumEnemyStatus = _unresolved_4.EnumEnemyStatus;
    }, function (_unresolved_5) {
      enemy = _unresolved_5.enemy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "38043IychJJXbKAlt9tWXun", "enemyBlack", undefined);

      __checkObsolete__(['_decorator', 'Animation', 'Node', 'Collider2D', 'IPhysics2DContact', 'UITransform', 'BoxCollider2D', 'RigidBody2D']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("enemyBlack", enemyBlack = (_dec = ccclass('enemyBlack'), _dec(_class = class enemyBlack extends (_crd && enemy === void 0 ? (_reportPossibleCrUseOfenemy({
        error: Error()
      }), enemy) : enemy) {
        start() {
          super.start();
          this.status = (_crd && EnumEnemyStatus === void 0 ? (_reportPossibleCrUseOfEnumEnemyStatus({
            error: Error()
          }), EnumEnemyStatus) : EnumEnemyStatus).walk;
          this.refreshSpeedByStatus();
        }

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
//# sourceMappingURL=f00a322e3cf99a7e6e3bc7b8b0dc5743085de216.js.map
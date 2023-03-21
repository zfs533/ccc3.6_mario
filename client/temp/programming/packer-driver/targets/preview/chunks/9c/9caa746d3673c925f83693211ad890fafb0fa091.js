System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Animation, EnumPhysicsGroup, baseCollider, _dec, _class, _crd, ccclass, property, enemy;

  function _reportPossibleCrUseOfEnumPhysicsGroup(extras) {
    _reporterNs.report("EnumPhysicsGroup", "../../../framework/enum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfbaseCollider(extras) {
    _reporterNs.report("baseCollider", "../../collider/baseCollider", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Animation = _cc.Animation;
    }, function (_unresolved_2) {
      EnumPhysicsGroup = _unresolved_2.EnumPhysicsGroup;
    }, function (_unresolved_3) {
      baseCollider = _unresolved_3.baseCollider;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "978b6qE/F5IkYZ/06vxJ1sw", "enemy", undefined);

      __checkObsolete__(['_decorator', 'Animation', 'Node', 'Collider2D', 'IPhysics2DContact', 'RigidBody2D', 'BoxCollider2D']);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * 怪物基类
       */

      _export("enemy", enemy = (_dec = ccclass('enemy'), _dec(_class = class enemy extends (_crd && baseCollider === void 0 ? (_reportPossibleCrUseOfbaseCollider({
        error: Error()
      }), baseCollider) : baseCollider) {
        constructor() {
          super(...arguments);
          this.speed = 1;
          this.normalX = 0;
          this.isDeath = false;
          this.anims = {
            walk: "e1walk",
            death: "e1death"
          };
        }

        start() {
          super.start();
          this.setPhysicsGroup((_crd && EnumPhysicsGroup === void 0 ? (_reportPossibleCrUseOfEnumPhysicsGroup({
            error: Error()
          }), EnumPhysicsGroup) : EnumPhysicsGroup).enemy);
        }

        onDestroy() {}

        onBeginContact(selfCollider, otherCollider, contact) {
          if (this.isDeath) return; // 只在两个碰撞体开始接触时被调用一次

          var name1 = selfCollider.node.name;
          var name2 = otherCollider.node.name;

          if (name1.includes("enemy")) {
            var normal = contact.getWorldManifold().normal;
            this.startMoving(normal.x);
          }
        }

        startMoving(offset) {
          if (offset != this.normalX) {
            this.speed *= -1;
            this.normalX = offset;
          }
        }

        update(deltaTime) {
          if (this.isDeath) return;
          var pos = this.node.getPosition();
          pos.x += this.speed;
          this.node.setPosition(pos);
        }

        playDeath() {
          this.isDeath = true;
          this.node.getComponent(Animation).play(this.anims.death);
          this.scheduleOnce(() => {
            this.node.destroy();
          }, 0.5);
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=9caa746d3673c925f83693211ad890fafb0fa091.js.map
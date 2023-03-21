System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Animation, cfgEnemy, EnumEnemyStatus, EnumPhysicsGroup, baseCollider, _dec, _class, _crd, ccclass, property, enemy;

  function _reportPossibleCrUseOfcfgEnemy(extras) {
    _reporterNs.report("cfgEnemy", "../../../config/cfgEnemy", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEnemyData(extras) {
    _reporterNs.report("EnemyData", "../../../config/cfgEnemy", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEnumEnemyStatus(extras) {
    _reporterNs.report("EnumEnemyStatus", "../../../framework/enum", _context.meta, extras);
  }

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
      cfgEnemy = _unresolved_2.cfgEnemy;
    }, function (_unresolved_3) {
      EnumEnemyStatus = _unresolved_3.EnumEnemyStatus;
      EnumPhysicsGroup = _unresolved_3.EnumPhysicsGroup;
    }, function (_unresolved_4) {
      baseCollider = _unresolved_4.baseCollider;
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
        constructor(...args) {
          super(...args);
          this.speed = 1;
          this.normalX = 0;
          this.isDeath = false;
          this._data = null;
          this.status = (_crd && EnumEnemyStatus === void 0 ? (_reportPossibleCrUseOfEnumEnemyStatus({
            error: Error()
          }), EnumEnemyStatus) : EnumEnemyStatus).stand;
          this.isColider = false;
        }

        //碰上了,用来处理连续碰撞造成的问题
        start() {
          super.start();
          this.setPhysicsGroup((_crd && EnumPhysicsGroup === void 0 ? (_reportPossibleCrUseOfEnumPhysicsGroup({
            error: Error()
          }), EnumPhysicsGroup) : EnumPhysicsGroup).enemy);
          this._data = (_crd && cfgEnemy === void 0 ? (_reportPossibleCrUseOfcfgEnemy({
            error: Error()
          }), cfgEnemy) : cfgEnemy).getEnemyData(this.node.name);
          console.log(this._data);
          console.log(this.node.name);
          this.node.getComponent(Animation).play(this._data.walk);
        }

        onDestroy() {}

        onBeginContact(selfCollider, otherCollider, contact) {
          if (this.isDeath) return; // 只在两个碰撞体开始接触时被调用一次

          let name1 = selfCollider.node.name;
          let name2 = otherCollider.node.name;

          if (name1.includes("enemy")) {
            let normal = contact.getWorldManifold().normal;
            this.startMoving(normal.x);
          }
        }

        startMoving(offset) {
          if (offset != this.normalX) {
            this.speed *= -1;
            this.normalX = offset;
            let scale = this.node.getScale();
            let scalex = scale.x * -1;
            this.node.setScale(scalex, scale.y, scale.z);
          }
        }

        refreshSpeedByStatus() {
          switch (this.status) {
            case (_crd && EnumEnemyStatus === void 0 ? (_reportPossibleCrUseOfEnumEnemyStatus({
              error: Error()
            }), EnumEnemyStatus) : EnumEnemyStatus).stand:
            case (_crd && EnumEnemyStatus === void 0 ? (_reportPossibleCrUseOfEnumEnemyStatus({
              error: Error()
            }), EnumEnemyStatus) : EnumEnemyStatus).death:
              this.speed = 0;
              break;

            case (_crd && EnumEnemyStatus === void 0 ? (_reportPossibleCrUseOfEnumEnemyStatus({
              error: Error()
            }), EnumEnemyStatus) : EnumEnemyStatus).walk:
              this.speed = 1;
              break;

            case (_crd && EnumEnemyStatus === void 0 ? (_reportPossibleCrUseOfEnumEnemyStatus({
              error: Error()
            }), EnumEnemyStatus) : EnumEnemyStatus).run:
              this.speed = 5;
              break;
          }
        }

        update(deltaTime) {
          if (this.isDeath) return;
          let pos = this.node.getPosition();
          pos.x += this.speed;
          this.node.setPosition(pos);
        }

        playDeath() {
          if (this.isDeath) return;
          this.isDeath = true;
          this.node.getComponent(Animation).play(this._data.death);
          this.scheduleOnce(() => {
            this.node.destroy();
          }, 0.4);
        }

        getData() {
          return this._data;
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=56c05e8bcd97bf84705943bd536ceed285a96687.js.map
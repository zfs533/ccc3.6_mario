System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Animation, Node, cfgEnemy, Constant, EnumEnemyStatus, EnumPhysicsGroup, baseCollider, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, enemy;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfcfgEnemy(extras) {
    _reporterNs.report("cfgEnemy", "../../../config/cfgEnemy", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEnemyData(extras) {
    _reporterNs.report("EnemyData", "../../../config/cfgEnemy", _context.meta, extras);
  }

  function _reportPossibleCrUseOfConstant(extras) {
    _reporterNs.report("Constant", "../../../framework/constant", _context.meta, extras);
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
      Node = _cc.Node;
    }, function (_unresolved_2) {
      cfgEnemy = _unresolved_2.cfgEnemy;
    }, function (_unresolved_3) {
      Constant = _unresolved_3.Constant;
    }, function (_unresolved_4) {
      EnumEnemyStatus = _unresolved_4.EnumEnemyStatus;
      EnumPhysicsGroup = _unresolved_4.EnumPhysicsGroup;
    }, function (_unresolved_5) {
      baseCollider = _unresolved_5.baseCollider;
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

      _export("enemy", enemy = (_dec = ccclass('enemy'), _dec2 = property(Node), _dec3 = property(Node), _dec(_class = (_class2 = class enemy extends (_crd && baseCollider === void 0 ? (_reportPossibleCrUseOfbaseCollider({
        error: Error()
      }), baseCollider) : baseCollider) {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "attactedNode", _descriptor, this);

          _initializerDefineProperty(this, "animComp", _descriptor2, this);

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

          if (this.animComp) {
            this.animComp.getComponent(Animation).play(this._data.walk);
          } else {
            this.node.getComponent(Animation).play(this._data.walk);
          }
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
            var scale = this.node.getScale();
            var scalex = scale.x * -1;
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
          if (this.isDeath || !(_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
            error: Error()
          }), Constant) : Constant).CurMap.physicsStatus) return;
          var pos = this.node.getPosition();
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

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "attactedNode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return undefined;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "animComp", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return undefined;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=8ded218be9ee3ec4e04d8415c266b577eef0a588.js.map
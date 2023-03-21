System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Enum, RigidBody2D, BoxCollider2D, EnumHole, EnumPhysicsGroup, baseCollider, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, hole;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfEnumHole(extras) {
    _reporterNs.report("EnumHole", "../../framework/enum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEnumPhysicsGroup(extras) {
    _reporterNs.report("EnumPhysicsGroup", "../../framework/enum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfbaseCollider(extras) {
    _reporterNs.report("baseCollider", "../collider/baseCollider", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Enum = _cc.Enum;
      RigidBody2D = _cc.RigidBody2D;
      BoxCollider2D = _cc.BoxCollider2D;
    }, function (_unresolved_2) {
      EnumHole = _unresolved_2.EnumHole;
      EnumPhysicsGroup = _unresolved_2.EnumPhysicsGroup;
    }, function (_unresolved_3) {
      baseCollider = _unresolved_3.baseCollider;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "8d532/pxplD+ae1rv1w/O+0", "hole", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Enum', 'RigidBody2D', 'Collider2D', 'IPhysics2DContact', 'BoxCollider2D']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("hole", hole = (_dec = ccclass('hole'), _dec2 = property({
        type: Enum(_crd && EnumHole === void 0 ? (_reportPossibleCrUseOfEnumHole({
          error: Error()
        }), EnumHole) : EnumHole)
      }), _dec(_class = (_class2 = class hole extends (_crd && baseCollider === void 0 ? (_reportPossibleCrUseOfbaseCollider({
        error: Error()
      }), baseCollider) : baseCollider) {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "type", _descriptor, this);
        }

        start() {
          super.start();
          var rb2d = this.node.getComponent(RigidBody2D);
          rb2d.enabledContactListener = true;
          rb2d.group = (_crd && EnumPhysicsGroup === void 0 ? (_reportPossibleCrUseOfEnumPhysicsGroup({
            error: Error()
          }), EnumPhysicsGroup) : EnumPhysicsGroup).hole;
          var b2d = this.node.getComponent(BoxCollider2D);
          b2d.group = (_crd && EnumPhysicsGroup === void 0 ? (_reportPossibleCrUseOfEnumPhysicsGroup({
            error: Error()
          }), EnumPhysicsGroup) : EnumPhysicsGroup).hole;
        }
        /**
         * 子类重写
         * @param selfCollider 
         * @param otherCollider 
         * @param contact 
         */


        onBeginContact(selfCollider, otherCollider, contact) {
          // 只在两个碰撞体开始接触时被调用一次
          var name1 = selfCollider.node.name;
          var name2 = otherCollider.node.name;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "type", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return (_crd && EnumHole === void 0 ? (_reportPossibleCrUseOfEnumHole({
            error: Error()
          }), EnumHole) : EnumHole).normal;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=9a982bacfda9d916c774ddd89ab98aa011daefb4.js.map
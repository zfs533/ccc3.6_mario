System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5", "__unresolved_6"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Enum, RigidBody2D, BoxCollider2D, Vec3, UITransform, cfgHole, clientEvent, Constant, EnumHole, EnumHoleMap, EnumPhysicsGroup, baseCollider, roleManager, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, hole;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfcfgHole(extras) {
    _reporterNs.report("cfgHole", "../../config/cfgHole", _context.meta, extras);
  }

  function _reportPossibleCrUseOfclientEvent(extras) {
    _reporterNs.report("clientEvent", "../../framework/clientEvent", _context.meta, extras);
  }

  function _reportPossibleCrUseOfConstant(extras) {
    _reporterNs.report("Constant", "../../framework/constant", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEnumHole(extras) {
    _reporterNs.report("EnumHole", "../../framework/enum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEnumHoleMap(extras) {
    _reporterNs.report("EnumHoleMap", "../../framework/enum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEnumPhysicsGroup(extras) {
    _reporterNs.report("EnumPhysicsGroup", "../../framework/enum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfbaseCollider(extras) {
    _reporterNs.report("baseCollider", "../collider/baseCollider", _context.meta, extras);
  }

  function _reportPossibleCrUseOfroleManager(extras) {
    _reporterNs.report("roleManager", "../roles/roleManager", _context.meta, extras);
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
      Vec3 = _cc.Vec3;
      UITransform = _cc.UITransform;
    }, function (_unresolved_2) {
      cfgHole = _unresolved_2.default;
    }, function (_unresolved_3) {
      clientEvent = _unresolved_3.clientEvent;
    }, function (_unresolved_4) {
      Constant = _unresolved_4.Constant;
    }, function (_unresolved_5) {
      EnumHole = _unresolved_5.EnumHole;
      EnumHoleMap = _unresolved_5.EnumHoleMap;
      EnumPhysicsGroup = _unresolved_5.EnumPhysicsGroup;
    }, function (_unresolved_6) {
      baseCollider = _unresolved_6.baseCollider;
    }, function (_unresolved_7) {
      roleManager = _unresolved_7.roleManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "8d532/pxplD+ae1rv1w/O+0", "hole", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Enum', 'RigidBody2D', 'Collider2D', 'IPhysics2DContact', 'BoxCollider2D', 'Vec3', 'UITransform']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("hole", hole = (_dec = ccclass('hole'), _dec2 = property({
        type: Enum(_crd && EnumHole === void 0 ? (_reportPossibleCrUseOfEnumHole({
          error: Error()
        }), EnumHole) : EnumHole)
      }), _dec3 = property({
        type: Enum(_crd && EnumHoleMap === void 0 ? (_reportPossibleCrUseOfEnumHoleMap({
          error: Error()
        }), EnumHoleMap) : EnumHoleMap)
      }), _dec(_class = (_class2 = class hole extends (_crd && baseCollider === void 0 ? (_reportPossibleCrUseOfbaseCollider({
        error: Error()
      }), baseCollider) : baseCollider) {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "type", _descriptor, this);

          _initializerDefineProperty(this, "holeMapIndex", _descriptor2, this);

          this._rb2d = void 0;
          this._b2d = void 0;
          this._pos1 = new Vec3();
          this._pos2 = new Vec3();
          this._holeMap = void 0;
          this._isCanDown = true;
        }

        onLoad() {
          (_crd && clientEvent === void 0 ? (_reportPossibleCrUseOfclientEvent({
            error: Error()
          }), clientEvent) : clientEvent).on((_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
            error: Error()
          }), Constant) : Constant).EVENT_TYPE.HoleGetDown, this._evtHoleDown, this);
        }

        onDestroy() {
          (_crd && clientEvent === void 0 ? (_reportPossibleCrUseOfclientEvent({
            error: Error()
          }), clientEvent) : clientEvent).off((_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
            error: Error()
          }), Constant) : Constant).EVENT_TYPE.HoleGetDown, this._evtHoleDown, this);
        }

        start() {
          super.start();
          this._holeMap = (_crd && cfgHole === void 0 ? (_reportPossibleCrUseOfcfgHole({
            error: Error()
          }), cfgHole) : cfgHole).getHoleMapDown(this.holeMapIndex);
          let rb2d = this.node.getComponent(RigidBody2D);
          rb2d.enabledContactListener = true;
          console.log(rb2d.group);
          rb2d.group = (_crd && EnumPhysicsGroup === void 0 ? (_reportPossibleCrUseOfEnumPhysicsGroup({
            error: Error()
          }), EnumPhysicsGroup) : EnumPhysicsGroup).hole;
          let b2d = this.node.getComponent(BoxCollider2D);
          b2d.group = (_crd && EnumPhysicsGroup === void 0 ? (_reportPossibleCrUseOfEnumPhysicsGroup({
            error: Error()
          }), EnumPhysicsGroup) : EnumPhysicsGroup).hole;
          this._rb2d = rb2d;
          this._b2d = b2d;
        }
        /**
         * 子类重写
         * @param selfCollider 
         * @param otherCollider 
         * @param contact 
         */


        onBeginContact(selfCollider, otherCollider, contact) {
          if (this.type == (_crd && EnumHole === void 0 ? (_reportPossibleCrUseOfEnumHole({
            error: Error()
          }), EnumHole) : EnumHole).canDown) {
            this._pos1 = (_crd && roleManager === void 0 ? (_reportPossibleCrUseOfroleManager({
              error: Error()
            }), roleManager) : roleManager).Inst.convertToNodeSpace(selfCollider.node);
            this._pos2 = (_crd && roleManager === void 0 ? (_reportPossibleCrUseOfroleManager({
              error: Error()
            }), roleManager) : roleManager).Inst.convertToNodeSpace(otherCollider.node);
          }
        } //点击向下键，遥感竖直向下进洞，TODO


        _evtHoleDown() {
          if (this.type == (_crd && EnumHole === void 0 ? (_reportPossibleCrUseOfEnumHole({
            error: Error()
          }), EnumHole) : EnumHole).canDown && this._isCanDown) {
            this._isCanDown = false;

            if (this._pos2.y > this._pos1.y) {
              let transform = this.node.getComponent(UITransform);

              if (this._pos2.x >= this._pos1.x - transform.width / 2 && this._pos2.x < this._pos1.x + transform.width / 2) {
                this._b2d.enabled = false;

                this._startGoDown();
              }
            }
          }
        }

        _startGoDown() {
          (_crd && roleManager === void 0 ? (_reportPossibleCrUseOfroleManager({
            error: Error()
          }), roleManager) : roleManager).Inst.setHoleInfo(this._holeMap);
          (_crd && roleManager === void 0 ? (_reportPossibleCrUseOfroleManager({
            error: Error()
          }), roleManager) : roleManager).Inst.startTranslateScene();
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "type", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return (_crd && EnumHole === void 0 ? (_reportPossibleCrUseOfEnumHole({
            error: Error()
          }), EnumHole) : EnumHole).normal;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "holeMapIndex", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return (_crd && EnumHoleMap === void 0 ? (_reportPossibleCrUseOfEnumHoleMap({
            error: Error()
          }), EnumHoleMap) : EnumHoleMap).nono;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=5cf8123706219737c7e1695dbf8e162f03f03762.js.map
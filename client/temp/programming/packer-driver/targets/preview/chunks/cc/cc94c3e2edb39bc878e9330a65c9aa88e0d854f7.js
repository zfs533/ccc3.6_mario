System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, v3, tween, UITransform, RigidBody2D, BoxCollider2D, ERigidBody2DType, clientEvent, Constant, EnumPhysicsGroup, baseCollider, _dec, _class, _crd, ccclass, property, mushroom;

  function _reportPossibleCrUseOfclientEvent(extras) {
    _reporterNs.report("clientEvent", "../../framework/clientEvent", _context.meta, extras);
  }

  function _reportPossibleCrUseOfConstant(extras) {
    _reporterNs.report("Constant", "../../framework/constant", _context.meta, extras);
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
      v3 = _cc.v3;
      tween = _cc.tween;
      UITransform = _cc.UITransform;
      RigidBody2D = _cc.RigidBody2D;
      BoxCollider2D = _cc.BoxCollider2D;
      ERigidBody2DType = _cc.ERigidBody2DType;
    }, function (_unresolved_2) {
      clientEvent = _unresolved_2.clientEvent;
    }, function (_unresolved_3) {
      Constant = _unresolved_3.Constant;
    }, function (_unresolved_4) {
      EnumPhysicsGroup = _unresolved_4.EnumPhysicsGroup;
    }, function (_unresolved_5) {
      baseCollider = _unresolved_5.baseCollider;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "8e6c0PcXbxJF7FRYPKj6SqM", "mushroom", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Collider2D', 'IPhysics2DContact', 'v3', 'tween', 'UITransform', 'RigidBody2D', 'BoxCollider2D', 'math', 'ERigidBody2DType']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("mushroom", mushroom = (_dec = ccclass('mushroom'), _dec(_class = class mushroom extends (_crd && baseCollider === void 0 ? (_reportPossibleCrUseOfbaseCollider({
        error: Error()
      }), baseCollider) : baseCollider) {
        constructor() {
          super(...arguments);
          this._speed = 1;
          this._normalX = 0;
          this._isActive = false;
          this._group = 0;
        }

        start() {
          super.start();

          this._addListener();

          this._init();

          this.setPhysicsGroup((_crd && EnumPhysicsGroup === void 0 ? (_reportPossibleCrUseOfEnumPhysicsGroup({
            error: Error()
          }), EnumPhysicsGroup) : EnumPhysicsGroup).mushroom);
        }

        _addListener() {}

        onDestroy() {}

        _init() {
          this._speed = (_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
            error: Error()
          }), Constant) : Constant).MoveSpeed / 3;
          this.node.setScale(v3((_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
            error: Error()
          }), Constant) : Constant).MapScale, (_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
            error: Error()
          }), Constant) : Constant).MapScale, 1));
          var bc = this.node.getComponent(BoxCollider2D);
          this._group = bc.group;

          this._removePhysics();

          var pos = this.node.getWorldPosition();
          var height = this.node.getComponent(UITransform).height * (_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
            error: Error()
          }), Constant) : Constant).MapScale;
          this.node.setWorldPosition(v3(pos.x, pos.y - height / (_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
            error: Error()
          }), Constant) : Constant).MapScale, pos.z));
          pos = this.node.getWorldPosition();
          this.node.setWorldPosition(v3(pos.x, pos.y - height, pos.z)); // this.node.setSiblingIndex(3);

          tween(this.node).to(1, {
            worldPosition: v3(pos.x, pos.y, pos.z)
          }).call(() => {
            this._addPhysics();
          }).start();
        }

        _removePhysics() {
          var rb = this.node.getComponent(RigidBody2D);
          rb.type = ERigidBody2DType.Static;
        }

        _addPhysics() {
          var rb = this.node.getComponent(RigidBody2D);
          rb.type = ERigidBody2DType.Dynamic;
          this._isActive = true;
        }

        onBeginContact(selfCollider, otherCollider, contact) {
          // 只在两个碰撞体开始接触时被调用一次
          var name1 = selfCollider.node.name;
          var name2 = otherCollider.node.name;

          if (name1.includes("mushroom")) {
            var normal = contact.getWorldManifold().normal;

            this._evtMushroomMove(normal.x);
          }

          if (name2.includes("mario") && (_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
            error: Error()
          }), Constant) : Constant).CurMap.physicsStatus) {
            (_crd && clientEvent === void 0 ? (_reportPossibleCrUseOfclientEvent({
              error: Error()
            }), clientEvent) : clientEvent).dispatchEvent((_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
              error: Error()
            }), Constant) : Constant).EVENT_TYPE.EnablePhysics, false); // this.scheduleOnce
          }
        }

        _evtMushroomMove(offset) {
          if (offset != this._normalX) {
            this._speed *= -1;
            this._normalX = offset;
          }
        }

        update(deltaTime) {
          if (!this._isActive) return;
          var pos = this.node.getPosition();
          pos.x += this._speed;
          this.node.setPosition(pos);
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=cc94c3e2edb39bc878e9330a65c9aa88e0d854f7.js.map
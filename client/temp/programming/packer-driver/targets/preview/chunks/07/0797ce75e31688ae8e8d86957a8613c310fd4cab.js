System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, UITransform, PhysicsSystem2D, EPhysics2DDrawFlags, CCBoolean, AudioManager, clientEvent, Constant, roleManager, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, map;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfAudioManager(extras) {
    _reporterNs.report("AudioManager", "../../../framework/audioManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfclientEvent(extras) {
    _reporterNs.report("clientEvent", "../../../framework/clientEvent", _context.meta, extras);
  }

  function _reportPossibleCrUseOfConstant(extras) {
    _reporterNs.report("Constant", "../../../framework/constant", _context.meta, extras);
  }

  function _reportPossibleCrUseOfroleManager(extras) {
    _reporterNs.report("roleManager", "../../roles/roleManager", _context.meta, extras);
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
      Node = _cc.Node;
      UITransform = _cc.UITransform;
      PhysicsSystem2D = _cc.PhysicsSystem2D;
      EPhysics2DDrawFlags = _cc.EPhysics2DDrawFlags;
      CCBoolean = _cc.CCBoolean;
    }, function (_unresolved_2) {
      AudioManager = _unresolved_2.AudioManager;
    }, function (_unresolved_3) {
      clientEvent = _unresolved_3.clientEvent;
    }, function (_unresolved_4) {
      Constant = _unresolved_4.Constant;
    }, function (_unresolved_5) {
      roleManager = _unresolved_5.roleManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "7c8c7aOpMZMFrfNQ+E9kVm/", "map", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Vec3', 'director', 'UITransform', 'view', 'v3', 'physics', 'Physics2DUtils', 'PhysicsSystem2D', 'EPhysics2DDrawFlags', 'instantiate', 'CCBoolean']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("map", map = (_dec = ccclass('map'), _dec2 = property(CCBoolean), _dec3 = property(Node), _dec(_class = (_class2 = class map extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "isDebug", _descriptor, this);

          _initializerDefineProperty(this, "mushroomLayer", _descriptor2, this);

          this.mapName = "";
          this.physicsStatus = true;
        }

        start() {
          this.mapName = this.node.name;

          this._evtEnablePhysics(true);

          if (this.isDebug) {
            PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.All;
          }

          this._init();

          this._addListener();

          (_crd && AudioManager === void 0 ? (_reportPossibleCrUseOfAudioManager({
            error: Error()
          }), AudioManager) : AudioManager).instance.playMusic("mario_bg", true);
        }

        _addListener() {
          (_crd && clientEvent === void 0 ? (_reportPossibleCrUseOfclientEvent({
            error: Error()
          }), clientEvent) : clientEvent).on((_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
            error: Error()
          }), Constant) : Constant).EVENT_TYPE.AddToMap, this._evtAddToMap, this);
          (_crd && clientEvent === void 0 ? (_reportPossibleCrUseOfclientEvent({
            error: Error()
          }), clientEvent) : clientEvent).on((_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
            error: Error()
          }), Constant) : Constant).EVENT_TYPE.EnablePhysics, this._evtEnablePhysics, this);
        }

        _evtAddToMap(obj) {
          if (obj.name.includes("mushroom")) {
            this.mushroomLayer.addChild(obj);
          }
        }

        addChildToMap(node) {
          if (node.name.includes("mario")) {
            var marioNode = this.node.getChildByName("marioNode");

            if (marioNode) {
              marioNode.addChild(node);
              return;
            }
          }

          this.node.addChild(node);
        }

        onDestroy() {
          (_crd && clientEvent === void 0 ? (_reportPossibleCrUseOfclientEvent({
            error: Error()
          }), clientEvent) : clientEvent).off((_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
            error: Error()
          }), Constant) : Constant).EVENT_TYPE.AddToMap, this._evtAddToMap, this);
          (_crd && clientEvent === void 0 ? (_reportPossibleCrUseOfclientEvent({
            error: Error()
          }), clientEvent) : clientEvent).off((_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
            error: Error()
          }), Constant) : Constant).EVENT_TYPE.EnablePhysics, this._evtEnablePhysics, this);
        }

        _init() {
          var _this = this;

          return _asyncToGenerator(function* () {
            (_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
              error: Error()
            }), Constant) : Constant).CurMap = _this;
            (_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
              error: Error()
            }), Constant) : Constant).CurMapWidth = _this.node.getComponent(UITransform).width;
            (_crd && roleManager === void 0 ? (_reportPossibleCrUseOfroleManager({
              error: Error()
            }), roleManager) : roleManager).Inst.init(_this);
            (_crd && roleManager === void 0 ? (_reportPossibleCrUseOfroleManager({
              error: Error()
            }), roleManager) : roleManager).Inst.addMarioToMap();
            (_crd && roleManager === void 0 ? (_reportPossibleCrUseOfroleManager({
              error: Error()
            }), roleManager) : roleManager).Inst.addEnemyToMap();
          })();
        }

        _evtEnablePhysics(bool) {
          PhysicsSystem2D.instance.enable = bool;
          this.physicsStatus = bool;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "isDebug", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "mushroomLayer", [_dec3], {
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
//# sourceMappingURL=0797ce75e31688ae8e8d86957a8613c310fd4cab.js.map
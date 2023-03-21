System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5", "__unresolved_6", "__unresolved_7"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Sprite, instantiate, Enum, clientEvent, Constant, ResourcePath, whyType, PoolManager, resourceUtil, getBrickIndex, coin, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, whyBrick;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfclientEvent(extras) {
    _reporterNs.report("clientEvent", "../../framework/clientEvent", _context.meta, extras);
  }

  function _reportPossibleCrUseOfConstant(extras) {
    _reporterNs.report("Constant", "../../framework/constant", _context.meta, extras);
  }

  function _reportPossibleCrUseOfResourcePath(extras) {
    _reporterNs.report("ResourcePath", "../../framework/enum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfwhyType(extras) {
    _reporterNs.report("whyType", "../../framework/enum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPoolManager(extras) {
    _reporterNs.report("PoolManager", "../../framework/poolManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfresourceUtil(extras) {
    _reporterNs.report("resourceUtil", "../../framework/resourceUtil", _context.meta, extras);
  }

  function _reportPossibleCrUseOfgetBrickIndex(extras) {
    _reporterNs.report("getBrickIndex", "../../net/util", _context.meta, extras);
  }

  function _reportPossibleCrUseOfcoin(extras) {
    _reporterNs.report("coin", "./coin", _context.meta, extras);
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
      Sprite = _cc.Sprite;
      instantiate = _cc.instantiate;
      Enum = _cc.Enum;
    }, function (_unresolved_2) {
      clientEvent = _unresolved_2.clientEvent;
    }, function (_unresolved_3) {
      Constant = _unresolved_3.Constant;
    }, function (_unresolved_4) {
      ResourcePath = _unresolved_4.ResourcePath;
      whyType = _unresolved_4.whyType;
    }, function (_unresolved_5) {
      PoolManager = _unresolved_5.PoolManager;
    }, function (_unresolved_6) {
      resourceUtil = _unresolved_6.resourceUtil;
    }, function (_unresolved_7) {
      getBrickIndex = _unresolved_7.getBrickIndex;
    }, function (_unresolved_8) {
      coin = _unresolved_8.coin;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "b7c6dOJnPBOp5iFugkBeb6o", "whyBrick", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Vec3', 'tween', 'v3', 'SpriteFrame', 'SpriteComponent', 'Sprite', 'instantiate', 'Enum', 'UITransform', 'UITransformComponent', 'Prefab']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("whyBrick", whyBrick = (_dec = ccclass('whyBrick'), _dec2 = property({
        type: Enum(_crd && whyType === void 0 ? (_reportPossibleCrUseOfwhyType({
          error: Error()
        }), whyType) : whyType)
      }), _dec(_class = (_class2 = class whyBrick extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "type", _descriptor, this);

          this.index = 0;
          this._isGot = false;
        }

        //是否已经顶过了
        start() {
          this._init();

          this._addListener();
        }

        _addListener() {
          (_crd && clientEvent === void 0 ? (_reportPossibleCrUseOfclientEvent({
            error: Error()
          }), clientEvent) : clientEvent).on((_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
            error: Error()
          }), Constant) : Constant).EVENT_TYPE.TopWhy + this.index, this._evtTopWhy, this);
        }

        onDestroy() {
          (_crd && clientEvent === void 0 ? (_reportPossibleCrUseOfclientEvent({
            error: Error()
          }), clientEvent) : clientEvent).off((_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
            error: Error()
          }), Constant) : Constant).EVENT_TYPE.TopWhy + this.index, this._evtTopWhy, this);
        }

        _evtTopWhy(idx) {
          if (idx == this.index && !this._isGot) {
            switch (this.type) {
              case (_crd && whyType === void 0 ? (_reportPossibleCrUseOfwhyType({
                error: Error()
              }), whyType) : whyType).normal:
                this._playMoveUp();

                break;

              case (_crd && whyType === void 0 ? (_reportPossibleCrUseOfwhyType({
                error: Error()
              }), whyType) : whyType).mushroom:
                this._loadMushroom();

                break;
            }
          }
        }

        async _loadMushroom() {
          this._isGot = true;

          this._setFinishedStatus();

          let pre = await (_crd && resourceUtil === void 0 ? (_reportPossibleCrUseOfresourceUtil({
            error: Error()
          }), resourceUtil) : resourceUtil).loadPiecesPriefabRes("mushroom");

          if (pre) {
            //蘑菇mushroom
            let node = instantiate(pre);
            let pos = this.node.getWorldPosition();
            node.setWorldPosition(pos);
            (_crd && clientEvent === void 0 ? (_reportPossibleCrUseOfclientEvent({
              error: Error()
            }), clientEvent) : clientEvent).dispatchEvent((_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
              error: Error()
            }), Constant) : Constant).EVENT_TYPE.AddToMap, node);
          }
        }

        async _playMoveUp() {
          this._isGot = true;

          this._setFinishedStatus();

          let pre = await (_crd && resourceUtil === void 0 ? (_reportPossibleCrUseOfresourceUtil({
            error: Error()
          }), resourceUtil) : resourceUtil).loadPiecesPriefabRes("coin");

          if (pre) {
            //加载金币并发送消除金币事件
            let node = await (_crd && PoolManager === void 0 ? (_reportPossibleCrUseOfPoolManager({
              error: Error()
            }), PoolManager) : PoolManager).Inst.getNode(pre, this.node);
            let idx = node.getComponent(_crd && coin === void 0 ? (_reportPossibleCrUseOfcoin({
              error: Error()
            }), coin) : coin).index;
            (_crd && clientEvent === void 0 ? (_reportPossibleCrUseOfclientEvent({
              error: Error()
            }), clientEvent) : clientEvent).dispatchEvent((_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
              error: Error()
            }), Constant) : Constant).EVENT_TYPE.CoinRemove + idx);
          }
        }

        _setFinishedStatus() {
          (_crd && resourceUtil === void 0 ? (_reportPossibleCrUseOfresourceUtil({
            error: Error()
          }), resourceUtil) : resourceUtil).setSpriteFrame((_crd && ResourcePath === void 0 ? (_reportPossibleCrUseOfResourcePath({
            error: Error()
          }), ResourcePath) : ResourcePath).textureBrick + "whyDown", this.node.getComponent(Sprite), () => {});
        }

        _init() {
          this.index = (_crd && getBrickIndex === void 0 ? (_reportPossibleCrUseOfgetBrickIndex({
            error: Error()
          }), getBrickIndex) : getBrickIndex)();
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "type", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return (_crd && whyType === void 0 ? (_reportPossibleCrUseOfwhyType({
            error: Error()
          }), whyType) : whyType).normal;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=9b4f77646159e601ec247a52d3634920ef10e364.js.map
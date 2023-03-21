System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Vec3, UITransform, input, Input, KeyCode, AudioManager, clientEvent, Constant, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, joystick;

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
      Vec3 = _cc.Vec3;
      UITransform = _cc.UITransform;
      input = _cc.input;
      Input = _cc.Input;
      KeyCode = _cc.KeyCode;
    }, function (_unresolved_2) {
      AudioManager = _unresolved_2.AudioManager;
    }, function (_unresolved_3) {
      clientEvent = _unresolved_3.clientEvent;
    }, function (_unresolved_4) {
      Constant = _unresolved_4.Constant;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "89e6eu+HPJJbq9Li7bb+BkV", "joystick", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'EventTouch', 'Vec3', 'UITransform', 'input', 'Input', 'EventKeyboard', 'KeyCode', 'view']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("joystick", joystick = (_dec = ccclass('joystick'), _dec2 = property(Node), _dec3 = property(Node), _dec(_class = (_class2 = class joystick extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "joystickBg", _descriptor, this);

          _initializerDefineProperty(this, "joystickBar", _descriptor2, this);

          this._originPos = new Vec3();
          this._R = 100;
          this._offsetX = 0;
          this._isUseful = false;
        }

        onLoad() {
          this.node.on(Node.EventType.TOUCH_START, this._touchStart, this);
          this.node.on(Node.EventType.TOUCH_MOVE, this._touchMove, this);
          this.node.on(Node.EventType.TOUCH_END, this._touchEnd, this);
          this.node.on(Node.EventType.TOUCH_CANCEL, this._touchEnd, this);

          this._originPos.set(this.joystickBg.getPosition().x, this.joystickBg.getPosition().y, 0); //键盘事件test


          input.on(Input.EventType.KEY_DOWN, this._onKeyDown, this);
          input.on(Input.EventType.KEY_UP, this._onKeyUp, this);
        }

        start() {
          this._addListener();
        }

        _touchStart(event) {
          var _this$node$parent, _this$node$parent$get;

          let touchPos = event.getUILocation();
          let pos = new Vec3(touchPos.x, touchPos.y, 0);
          pos = (_this$node$parent = this.node.parent) == null ? void 0 : (_this$node$parent$get = _this$node$parent.getComponent(UITransform)) == null ? void 0 : _this$node$parent$get.convertToNodeSpaceAR(pos);
          /* 控制点击区域在左下半区 */

          if (pos.x > 0 || pos.y > 0) {
            this._isUseful = false;
            return;
          }

          this._isUseful = true;
          this.joystickBg.setPosition(pos);
        }

        _touchMove(event) {
          var _this$joystickBg, _this$joystickBg$getC;

          if (!this._isUseful) {
            return;
          }

          let touchPos = event.getUILocation();
          let pos = new Vec3(touchPos.x, touchPos.y, 0);
          pos = (_this$joystickBg = this.joystickBg) == null ? void 0 : (_this$joystickBg$getC = _this$joystickBg.getComponent(UITransform)) == null ? void 0 : _this$joystickBg$getC.convertToNodeSpaceAR(pos);
          pos.x += this._offsetX;
          let radius = Math.atan2(pos.y, pos.x);
          let out = new Vec3();
          let len = Vec3.subtract(out, pos, new Vec3()).length(); //控制移动范围在摇杆背景圆内

          if (len >= this._R) {
            let xx = Math.cos(radius) * this._R;

            let yy = Math.sin(radius) * this._R;

            this.joystickBar.setPosition(new Vec3(xx, yy, 0));
          } else {
            this.joystickBar.setPosition(pos);
          }

          let bPos = this.joystickBar.getPosition();
          (_crd && clientEvent === void 0 ? (_reportPossibleCrUseOfclientEvent({
            error: Error()
          }), clientEvent) : clientEvent).dispatchEvent((_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
            error: Error()
          }), Constant) : Constant).EVENT_TYPE.Move, bPos);
        }

        _touchEnd(event) {
          if (!this._isUseful) return;
          this._isUseful = false;
          this.joystickBg.setPosition(this._originPos);
          this.joystickBar.setPosition(new Vec3());
          (_crd && clientEvent === void 0 ? (_reportPossibleCrUseOfclientEvent({
            error: Error()
          }), clientEvent) : clientEvent).dispatchEvent((_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
            error: Error()
          }), Constant) : Constant).EVENT_TYPE.Stop);
        }

        _onKeyDown(e) {
          switch (e.keyCode) {
            case KeyCode.KEY_A:
              (_crd && clientEvent === void 0 ? (_reportPossibleCrUseOfclientEvent({
                error: Error()
              }), clientEvent) : clientEvent).dispatchEvent((_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
                error: Error()
              }), Constant) : Constant).EVENT_TYPE.Move, new Vec3(-1, 0, 0));
              break;

            case KeyCode.KEY_D:
              (_crd && clientEvent === void 0 ? (_reportPossibleCrUseOfclientEvent({
                error: Error()
              }), clientEvent) : clientEvent).dispatchEvent((_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
                error: Error()
              }), Constant) : Constant).EVENT_TYPE.Move, new Vec3(1, 0, 0));
              break;

            case KeyCode.SPACE:
              this.jump();
              break;
          }
        }

        _onKeyUp(e) {
          switch (e.keyCode) {
            case KeyCode.KEY_A:
              (_crd && clientEvent === void 0 ? (_reportPossibleCrUseOfclientEvent({
                error: Error()
              }), clientEvent) : clientEvent).dispatchEvent((_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
                error: Error()
              }), Constant) : Constant).EVENT_TYPE.Stop);
              break;

            case KeyCode.KEY_D:
              (_crd && clientEvent === void 0 ? (_reportPossibleCrUseOfclientEvent({
                error: Error()
              }), clientEvent) : clientEvent).dispatchEvent((_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
                error: Error()
              }), Constant) : Constant).EVENT_TYPE.Stop);
              break;
          }
        }

        _addListener() {
          console.log("addlistener");
          (_crd && clientEvent === void 0 ? (_reportPossibleCrUseOfclientEvent({
            error: Error()
          }), clientEvent) : clientEvent).on((_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
            error: Error()
          }), Constant) : Constant).EVENT_TYPE.MoveJoystick, this._evtMoveJoystick, this);
        }

        onDestroy() {
          (_crd && clientEvent === void 0 ? (_reportPossibleCrUseOfclientEvent({
            error: Error()
          }), clientEvent) : clientEvent).off((_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
            error: Error()
          }), Constant) : Constant).EVENT_TYPE.MoveJoystick, this._evtMoveJoystick, this);
        }
        /**
         * 摇杆跟着摄像机移动
         * @param params 
         */


        _evtMoveJoystick(offset) {
          let pos = this.node.getPosition();
          pos.x += offset;
          this._offsetX += offset; // console.log(pos);

          this.node.setPosition(pos);
        }

        jump() {
          (_crd && AudioManager === void 0 ? (_reportPossibleCrUseOfAudioManager({
            error: Error()
          }), AudioManager) : AudioManager).instance.playSound("smb_jumpsmall", false);
          (_crd && clientEvent === void 0 ? (_reportPossibleCrUseOfclientEvent({
            error: Error()
          }), clientEvent) : clientEvent).dispatchEvent((_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
            error: Error()
          }), Constant) : Constant).EVENT_TYPE.Jump);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "joystickBg", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return undefined;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "joystickBar", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return undefined;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=0a8e109f13a5fd433d21c70c2f20ba846273d619.js.map
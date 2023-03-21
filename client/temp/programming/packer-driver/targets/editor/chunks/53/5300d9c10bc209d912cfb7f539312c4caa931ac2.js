System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, view, v3, Vec3, clientEvent, Constant, _dec, _class, _crd, ccclass, property, camera;

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
      view = _cc.view;
      v3 = _cc.v3;
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      clientEvent = _unresolved_2.clientEvent;
    }, function (_unresolved_3) {
      Constant = _unresolved_3.Constant;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "49226LWMBdMILqPtRx1JTJK", "camera", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'view', 'v3', 'Vec3', 'TERRAIN_HEIGHT_BASE']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("camera", camera = (_dec = ccclass('camera'), _dec(_class = class camera extends Component {
        constructor(...args) {
          super(...args);
          this._winSize = view.getVisibleSize();
          this._originPos = new Vec3(0, 0, 1000);
        }

        start() {
          this._init();

          this._addListener();
        }

        _init() {
          console.log("camera pos: " + this.node.getPosition());
        }

        _addListener() {
          (_crd && clientEvent === void 0 ? (_reportPossibleCrUseOfclientEvent({
            error: Error()
          }), clientEvent) : clientEvent).on((_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
            error: Error()
          }), Constant) : Constant).EVENT_TYPE.MoveCamera, this._evtMoveCamera, this);
          (_crd && clientEvent === void 0 ? (_reportPossibleCrUseOfclientEvent({
            error: Error()
          }), clientEvent) : clientEvent).on((_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
            error: Error()
          }), Constant) : Constant).EVENT_TYPE.InitCameraPos, this._evtInitCameraPos, this);
          (_crd && clientEvent === void 0 ? (_reportPossibleCrUseOfclientEvent({
            error: Error()
          }), clientEvent) : clientEvent).on((_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
            error: Error()
          }), Constant) : Constant).EVENT_TYPE.StopCamera, this._evtStopCamera, this);
        }

        onDestroy() {
          (_crd && clientEvent === void 0 ? (_reportPossibleCrUseOfclientEvent({
            error: Error()
          }), clientEvent) : clientEvent).off((_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
            error: Error()
          }), Constant) : Constant).EVENT_TYPE.MoveCamera, this._evtMoveCamera, this);
          (_crd && clientEvent === void 0 ? (_reportPossibleCrUseOfclientEvent({
            error: Error()
          }), clientEvent) : clientEvent).off((_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
            error: Error()
          }), Constant) : Constant).EVENT_TYPE.InitCameraPos, this._evtInitCameraPos, this);
          (_crd && clientEvent === void 0 ? (_reportPossibleCrUseOfclientEvent({
            error: Error()
          }), clientEvent) : clientEvent).off((_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
            error: Error()
          }), Constant) : Constant).EVENT_TYPE.StopCamera, this._evtStopCamera, this);
        }

        _evtInitCameraPos(rolePos) {
          // let pos = v3(rolePos.x-400,this._originPos.y,this._originPos.z);
          // this.node.setPosition(pos);
          this._handleCameraPos(rolePos);

          let pos = this.node.getPosition();
          (_crd && clientEvent === void 0 ? (_reportPossibleCrUseOfclientEvent({
            error: Error()
          }), clientEvent) : clientEvent).dispatchEvent((_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
            error: Error()
          }), Constant) : Constant).EVENT_TYPE.MoveJoystick, pos);
        }
        /**
         * 摄像机跟着角色移动
         * @param params 
         */


        _evtMoveCamera(params) {
          let rolePos = params[0];

          this._handleCameraPos(rolePos);
        }

        _handleCameraPos(rolePos) {
          let pos = this.node.getPosition();
          let gap = this._winSize.width / 2;

          if (pos.x >= 0 && rolePos.x >= 400) {
            pos.x = rolePos.x - gap + 280;

            if (pos.x >= (_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
              error: Error()
            }), Constant) : Constant).CurMapWidth - this._winSize.width) {
              pos.x = (_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
                error: Error()
              }), Constant) : Constant).CurMapWidth - this._winSize.width;
            }

            this.node.setPosition(pos);
            (_crd && clientEvent === void 0 ? (_reportPossibleCrUseOfclientEvent({
              error: Error()
            }), clientEvent) : clientEvent).dispatchEvent((_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
              error: Error()
            }), Constant) : Constant).EVENT_TYPE.MoveJoystick, pos);
          } else {
            this.node.setPosition(v3(0, pos.y, pos.z));
          }
        }

        _evtStopCamera() {}

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=5300d9c10bc209d912cfb7f539312c4caa931ac2.js.map
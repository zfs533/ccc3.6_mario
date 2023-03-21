System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, MarioBodyStatus, Constant, _crd;

  function _reportPossibleCrUseOfmap(extras) {
    _reporterNs.report("map", "../game/ui/map/map", _context.meta, extras);
  }

  function _reportPossibleCrUseOfMarioBodyStatus(extras) {
    _reporterNs.report("MarioBodyStatus", "./enum", _context.meta, extras);
  }

  _export("Constant", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }, function (_unresolved_2) {
      MarioBodyStatus = _unresolved_2.MarioBodyStatus;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "4d5ed0T2NBBi6Ou+7PjRXCp", "constant", undefined);

      _export("Constant", Constant = class Constant {});

      Constant.EVENT_TYPE = {
        Move: 'Move',
        Jump: "Jump",
        MoveCamera: "MoveCamera",
        MoveJoystick: "MoveJoyStick",
        Stop: 'Stop',
        StopCamera: 'StopCamera',
        BrickMove: "brickMove",
        TopWhy: "TopWhy",
        CoinRemove: "CoinRemove",
        MarioDeath: "MarioDeath",
        ChangeStatus: "ChangeStatus",
        AddToMap: "AddToMap",
        TranslateScenes: "TranslateScenes",
        InitCameraPos: "InitCameraPos",
        FinishedGame: "FinishedGame",
        HoleGetDown: "HoleGetDown",
        EnablePhysics: "EnablePhysics",
        MushRoomDestroy: "MushRoomDestroy"
      };
      Constant.MoveSpeed = 10;
      Constant.MapScale = 2.5;
      Constant.CurMap = null;
      Constant.CurMapWidth = 0;
      Constant.FinishedGame = false;
      Constant.BodyStatus = (_crd && MarioBodyStatus === void 0 ? (_reportPossibleCrUseOfMarioBodyStatus({
        error: Error()
      }), MarioBodyStatus) : MarioBodyStatus).normal;

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=4658c011699d3eea033e49b1d6a4fc18217689d9.js.map
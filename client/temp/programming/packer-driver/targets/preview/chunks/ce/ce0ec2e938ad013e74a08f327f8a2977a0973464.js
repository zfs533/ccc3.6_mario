System.register(["__unresolved_0", "cc"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, Constant, _crd;

  function _reportPossibleCrUseOfmap(extras) {
    _reporterNs.report("map", "../game/ui/map/map", _context.meta, extras);
  }

  _export("Constant", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
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
        AddToMap: "AddToMap",
        TranslateScenes: "TranslateScenes",
        InitCameraPos: "InitCameraPos",
        FinishedGame: "FinishedGame",
        HoleGetDown: "HoleGetDown"
      };
      Constant.MoveSpeed = 10;
      Constant.MapScale = 2.5;
      Constant.CurMap = null;
      Constant.CurMapWidth = 0;
      Constant.FinishedGame = false;

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=ce0ec2e938ad013e74a08f327f8a2977a0973464.js.map
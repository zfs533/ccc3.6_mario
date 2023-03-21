System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _crd, AnimMario, MarioStatus, ResourcePath, whyType, RoleEnum, EnumPlayerStatus;

  _export({
    AnimMario: void 0,
    MarioStatus: void 0,
    ResourcePath: void 0,
    whyType: void 0,
    RoleEnum: void 0,
    EnumPlayerStatus: void 0
  });

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "ede0fvcJ5VCb5QeJYUst1mT", "enum", undefined);

      (function (AnimMario) {
        AnimMario["idle"] = "mario_idle";
        AnimMario["walk"] = "mario_walk";
        AnimMario["death"] = "mario_death";
        AnimMario["swim"] = "mario_swim";
        AnimMario["jump"] = "mario_jump";
      })(AnimMario || _export("AnimMario", AnimMario = {}));

      (function (MarioStatus) {
        MarioStatus[MarioStatus["idle"] = 0] = "idle";
        MarioStatus[MarioStatus["walk"] = 1] = "walk";
        MarioStatus[MarioStatus["death"] = 2] = "death";
        MarioStatus[MarioStatus["swim"] = 3] = "swim";
        MarioStatus[MarioStatus["jump"] = 4] = "jump";
      })(MarioStatus || _export("MarioStatus", MarioStatus = {}));

      (function (ResourcePath) {
        ResourcePath["textureBrick"] = "textures/brick/";
      })(ResourcePath || _export("ResourcePath", ResourcePath = {}));

      (function (whyType) {
        whyType[whyType["normal"] = 0] = "normal";
        whyType[whyType["mushroom"] = 1] = "mushroom";
      })(whyType || _export("whyType", whyType = {}));

      (function (RoleEnum) {
        RoleEnum["mario"] = "mario";
        RoleEnum["enemyBlack"] = "enemyBlack";
      })(RoleEnum || _export("RoleEnum", RoleEnum = {}));

      (function (EnumPlayerStatus) {
        EnumPlayerStatus[EnumPlayerStatus["idle"] = 0] = "idle";
        EnumPlayerStatus[EnumPlayerStatus["walk"] = 1] = "walk";
        EnumPlayerStatus[EnumPlayerStatus["jump"] = 2] = "jump";
        EnumPlayerStatus[EnumPlayerStatus["death"] = 3] = "death";
      })(EnumPlayerStatus || _export("EnumPlayerStatus", EnumPlayerStatus = {}));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=528416b526933fe14a07e6530798fb1894fa2b0d.js.map
System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _crd, AnimMario, ResourcePath, whyType, RoleEnum, MarioStatus, EnumPlayerStatus, EnumHole, EnumPhysicsGroup, EnumHoleMap;

  _export({
    AnimMario: void 0,
    ResourcePath: void 0,
    whyType: void 0,
    RoleEnum: void 0,
    MarioStatus: void 0,
    EnumPlayerStatus: void 0,
    EnumHole: void 0,
    EnumPhysicsGroup: void 0,
    EnumHoleMap: void 0
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

      (function (MarioStatus) {
        MarioStatus[MarioStatus["idle"] = 0] = "idle";
        MarioStatus[MarioStatus["walk"] = 1] = "walk";
        MarioStatus[MarioStatus["death"] = 2] = "death";
        MarioStatus[MarioStatus["swim"] = 3] = "swim";
        MarioStatus[MarioStatus["jump"] = 4] = "jump";
        MarioStatus[MarioStatus["finish"] = 5] = "finish";
      })(MarioStatus || _export("MarioStatus", MarioStatus = {}));

      (function (EnumPlayerStatus) {
        EnumPlayerStatus[EnumPlayerStatus["idle"] = 0] = "idle";
        EnumPlayerStatus[EnumPlayerStatus["walk"] = 1] = "walk";
        EnumPlayerStatus[EnumPlayerStatus["death"] = 2] = "death";
        EnumPlayerStatus[EnumPlayerStatus["swim"] = 3] = "swim";
        EnumPlayerStatus[EnumPlayerStatus["jump"] = 4] = "jump";
        EnumPlayerStatus[EnumPlayerStatus["finish"] = 5] = "finish";
      })(EnumPlayerStatus || _export("EnumPlayerStatus", EnumPlayerStatus = {}));

      (function (EnumHole) {
        EnumHole[EnumHole["normal"] = 0] = "normal";
        EnumHole[EnumHole["canDown"] = 1] = "canDown";
      })(EnumHole || _export("EnumHole", EnumHole = {}));

      (function (EnumPhysicsGroup) {
        EnumPhysicsGroup[EnumPhysicsGroup["default"] = 1] = "default";
        EnumPhysicsGroup[EnumPhysicsGroup["mario"] = 2] = "mario";
        EnumPhysicsGroup[EnumPhysicsGroup["brick"] = 4] = "brick";
        EnumPhysicsGroup[EnumPhysicsGroup["why"] = 8] = "why";
        EnumPhysicsGroup[EnumPhysicsGroup["mushroom"] = 16] = "mushroom";
        EnumPhysicsGroup[EnumPhysicsGroup["enemy"] = 32] = "enemy";
        EnumPhysicsGroup[EnumPhysicsGroup["hole"] = 64] = "hole";
      })(EnumPhysicsGroup || _export("EnumPhysicsGroup", EnumPhysicsGroup = {}));

      (function (EnumHoleMap) {
        EnumHoleMap[EnumHoleMap["nono"] = 0] = "nono";
        EnumHoleMap[EnumHoleMap["map1_1"] = 1] = "map1_1";
        EnumHoleMap[EnumHoleMap["map1_1_1"] = 2] = "map1_1_1";
        EnumHoleMap[EnumHoleMap["map1_2_1"] = 3] = "map1_2_1";
        EnumHoleMap[EnumHoleMap["map1_2_1_0"] = 4] = "map1_2_1_0";
        EnumHoleMap[EnumHoleMap["map1_2_2"] = 5] = "map1_2_2";
        EnumHoleMap[EnumHoleMap["map1_2_3"] = 6] = "map1_2_3";
      })(EnumHoleMap || _export("EnumHoleMap", EnumHoleMap = {}));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=96924acf2eb697627f4411071f4fd3f9148112b8.js.map
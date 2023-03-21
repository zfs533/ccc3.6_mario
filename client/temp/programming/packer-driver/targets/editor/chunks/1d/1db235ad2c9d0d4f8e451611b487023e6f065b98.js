System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, _dec, _class, _class2, _crd, ccclass, property, cfgEnemy;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "35440WrMUFMs5ZR9Fz49D/k", "cfgEnemy", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'v3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("cfgEnemy", cfgEnemy = (_dec = ccclass('cfgEnemy'), _dec(_class = (_class2 = class cfgEnemy {}, _class2.data = [{
        id: "enemy1001",
        walk: "e1walk",
        death: "e1death"
      }, {
        id: "enemy2001",
        walk: "e2walk",
        death: "e2death"
      }, {
        id: "enemy2002",
        walk: "e3walk",
        death: "e3death"
      }, {
        id: "enemy2003",
        walk: "e4walk",
        death: "e4death"
      }], _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=1db235ad2c9d0d4f8e451611b487023e6f065b98.js.map
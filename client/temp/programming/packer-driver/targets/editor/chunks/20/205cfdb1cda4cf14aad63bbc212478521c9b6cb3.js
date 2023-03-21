System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, v3, cfgLevel, _crd;

  _export("default", void 0);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      v3 = _cc.v3;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "257acUZg5ROgLST1E9CGZwp", "level", undefined);

      __checkObsolete__(['v3']);

      _export("default", cfgLevel = class cfgLevel {});

      cfgLevel.data = {
        "1_1": [{
          map: "map1_1",
          reLifePos: [v3(400, 750, 0), v3(3580, 750, 0)]
        }],
        "1_2": [{
          map: "map1_2"
        }]
      };

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=205cfdb1cda4cf14aad63bbc212478521c9b6cb3.js.map
System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, v3, cfgHole, _crd;

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

      _cclegacy._RF.push({}, "a87f4aL7T5Bh6K34tHnrxcT", "cfgHole", undefined);

      __checkObsolete__(['v3']);

      _export("default", cfgHole = class cfgHole {});

      cfgHole.data = {
        "map1_1_1": {
          map: "map1_1_1",
          reLifePos: [v3(80, 750, 0)],
          outPos: [v3(80, 750, 0)] //井底活动结束出去后原地图的出身点

        },
        "map1_2_1": {
          map: "map1_2_1",
          reLifePos: [v3(80, 750, 0), v3(4742, 21, 0)]
        },
        "map1_2_2": {
          map: "map1_2_2",
          reLifePos: [v3(80, 750, 0)]
        },
        "map1_2_3": {
          map: "map1_2_3",
          reLifePos: [v3(40, 21, 0)]
        }
      };

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=7dd885ef31e69a25eed1933faf9a2e5db556203b.js.map
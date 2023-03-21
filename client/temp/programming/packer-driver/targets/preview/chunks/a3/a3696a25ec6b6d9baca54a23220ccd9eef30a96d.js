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

      _cclegacy._RF.push({}, "c65c5fvo21EUqo8tXIP4Glz", "cfgLevel", undefined);

      __checkObsolete__(['v3']);

      _export("default", cfgLevel = class cfgLevel {});

      cfgLevel.data = {
        "1": {
          "1": [{
            map: "map1_1",
            // reLifePos:[v3(7300,750,0),v3(3580,750,0)]       //test
            reLifePos: [v3(400, 750, 0), v3(3400, 750, 0)]
          }],
          "2": [{
            map: "map1_2",
            reLifePos: [v3(240, 21, 0)]
          }],
          "3": [{
            map: "map1_3",
            reLifePos: [v3(150, 750, 0)]
          }],
          "4": [{
            map: "map1_4",
            reLifePos: [v3(45, 323, 0)]
          }]
        }
      };

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=a3696a25ec6b6d9baca54a23220ccd9eef30a96d.js.map
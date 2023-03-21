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

      _export("default", cfgHole = class cfgHole {
        /**
         * 获取下井后的地图导航
         * @param index 
         * @returns 
         */
        static getHoleMapDown(index) {
          var arr = ["no", "map1_1", "map1_1_1", "map1_2_1", "map1_2_1_0", "map1_2_2", "map1_2_3"];
          let mapName = arr[index];
          return this.data[mapName];
        }

      });

      cfgHole.data = {
        "map1_1": {
          map: "map1_1",
          reLifePos: [v3(2308, 186, 0)] //井底活动结束出去后原地图的出身点

        },
        "map1_1_1": {
          map: "map1_1_1",
          reLifePos: [v3(80, 750, 0)] // reLifePos:[v3(2308,186,0)//井底活动结束出去后原地图的出身点

        },
        "map1_2_1": {
          isMain: true,
          map: "map1_2_1",
          reLifePos: [v3(80, 750, 0), v3(4742, 21, 0)]
        },
        "map1_2_1_0": {
          isMain: false,
          map: "map1_2_1",
          reLifePos: [v3(4635, 90, 0)]
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
//# sourceMappingURL=76f99729f7a6065fdcb887c903a1867207eea840.js.map
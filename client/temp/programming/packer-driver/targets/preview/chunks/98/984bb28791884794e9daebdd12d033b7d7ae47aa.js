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

      _export("cfgEnemy", cfgEnemy = (_dec = ccclass('cfgEnemy'), _dec(_class = (_class2 = class cfgEnemy {
        static getEnemyData(id) {
          var res;
          this.data.forEach(item => {
            console.log(item.id, id);

            if (item.id == id) {
              res = item;
            }
          });
          return res;
        }

      }, _class2.data = [{
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
      }, {
        id: "enemy3001",
        walk: "walk3001",
        death: "death3001"
      }, {
        id: "enemy3002",
        walk: "walk3002",
        death: "death3002"
      }, {
        id: "enemy3003",
        walk: "walk3003",
        death: "death3003"
      }], _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=984bb28791884794e9daebdd12d033b7d7ae47aa.js.map
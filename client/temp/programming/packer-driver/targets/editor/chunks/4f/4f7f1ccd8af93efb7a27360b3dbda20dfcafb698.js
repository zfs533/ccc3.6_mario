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
          let res;
          this.data.forEach(item => {
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
        death: "e2death",
        path: "textures/roles/enemy/e2/4_0"
      }, {
        id: "enemy2002",
        walk: "e3walk",
        death: "e3death",
        path: "textures/roles/enemy/e2/4_1"
      }, {
        id: "enemy2003",
        walk: "e4walk",
        death: "e4death",
        path: "textures/roles/enemy/e2/4_2"
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
//# sourceMappingURL=4f7f1ccd8af93efb7a27360b3dbda20dfcafb698.js.map
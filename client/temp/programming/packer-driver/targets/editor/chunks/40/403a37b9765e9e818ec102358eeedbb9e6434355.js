System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, _dec, _class, _crd, ccclass, property, EnumPlayerStatus, BaseStatus;

  _export("EnumPlayerStatus", void 0);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "aa9baowlCtCPLnZdlTVUQCt", "baseStatus", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);

      (function (EnumPlayerStatus) {
        EnumPlayerStatus[EnumPlayerStatus["idle"] = 0] = "idle";
        EnumPlayerStatus[EnumPlayerStatus["walk"] = 1] = "walk";
        EnumPlayerStatus[EnumPlayerStatus["jump"] = 2] = "jump";
        EnumPlayerStatus[EnumPlayerStatus["death"] = 3] = "death";
      })(EnumPlayerStatus || _export("EnumPlayerStatus", EnumPlayerStatus = {}));

      _export("BaseStatus", BaseStatus = (_dec = ccclass('BaseStatus'), _dec(_class = class BaseStatus {
        constructor() {
          this._status = EnumPlayerStatus.idle;
        }

        changeStatus(status) {
          if (this._status == status) {
            return;
          }

          this._status = status;

          switch (status) {
            case EnumPlayerStatus.idle:
              break;

            case EnumPlayerStatus.walk:
              break;

            case EnumPlayerStatus.jump:
              break;

            case EnumPlayerStatus.death:
              break;
          }
        }

        getStatus() {
          return this._status;
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=403a37b9765e9e818ec102358eeedbb9e6434355.js.map
System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, EnumPlayerStatus, _dec, _class, _crd, ccclass, property, BaseStatus;

  function _reportPossibleCrUseOfEnumPlayerStatus(extras) {
    _reporterNs.report("EnumPlayerStatus", "../../../framework/enum", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
    }, function (_unresolved_2) {
      EnumPlayerStatus = _unresolved_2.EnumPlayerStatus;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "aa9baowlCtCPLnZdlTVUQCt", "baseStatus", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("BaseStatus", BaseStatus = (_dec = ccclass('BaseStatus'), _dec(_class = class BaseStatus {
        constructor() {
          this._status = (_crd && EnumPlayerStatus === void 0 ? (_reportPossibleCrUseOfEnumPlayerStatus({
            error: Error()
          }), EnumPlayerStatus) : EnumPlayerStatus).idle;
        }

        changeStatus(status) {
          if (this._status == status) {
            return;
          }

          this._status = status;

          switch (status) {
            case (_crd && EnumPlayerStatus === void 0 ? (_reportPossibleCrUseOfEnumPlayerStatus({
              error: Error()
            }), EnumPlayerStatus) : EnumPlayerStatus).idle:
              break;

            case (_crd && EnumPlayerStatus === void 0 ? (_reportPossibleCrUseOfEnumPlayerStatus({
              error: Error()
            }), EnumPlayerStatus) : EnumPlayerStatus).walk:
              break;

            case (_crd && EnumPlayerStatus === void 0 ? (_reportPossibleCrUseOfEnumPlayerStatus({
              error: Error()
            }), EnumPlayerStatus) : EnumPlayerStatus).jump:
              break;

            case (_crd && EnumPlayerStatus === void 0 ? (_reportPossibleCrUseOfEnumPlayerStatus({
              error: Error()
            }), EnumPlayerStatus) : EnumPlayerStatus).death:
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
//# sourceMappingURL=3383e4964388c010824922c773212ed98b684313.js.map
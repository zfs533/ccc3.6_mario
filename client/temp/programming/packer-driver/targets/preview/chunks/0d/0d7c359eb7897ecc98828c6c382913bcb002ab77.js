System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, BaseStatus, EnumPlayerStatus, _dec, _class, _crd, ccclass, property, PlayerStatus;

  function _reportPossibleCrUseOfmario(extras) {
    _reporterNs.report("mario", "../mario/mario", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBaseStatus(extras) {
    _reporterNs.report("BaseStatus", "./baseStatus", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEnumPlayerStatus(extras) {
    _reporterNs.report("EnumPlayerStatus", "./baseStatus", _context.meta, extras);
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
      BaseStatus = _unresolved_2.BaseStatus;
      EnumPlayerStatus = _unresolved_2.EnumPlayerStatus;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "a27a1gatANDi409O1zk9yJS", "playerStatus", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("PlayerStatus", PlayerStatus = (_dec = ccclass('PlayerStatus'), _dec(_class = class PlayerStatus extends (_crd && BaseStatus === void 0 ? (_reportPossibleCrUseOfBaseStatus({
        error: Error()
      }), BaseStatus) : BaseStatus) {
        constructor(player) {
          super();
          this._player = null;
          this._player = player;
        }

        changeStatus(status) {
          super.changeStatus(status);

          if (this._status == status) {
            return;
          }

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
          return super.getStatus();
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=0d7c359eb7897ecc98828c6c382913bcb002ab77.js.map
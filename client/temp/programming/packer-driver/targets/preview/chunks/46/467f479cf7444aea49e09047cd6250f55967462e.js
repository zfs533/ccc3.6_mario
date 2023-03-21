System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, l10n, _crd;

  function _reportPossibleCrUseOfl10n(extras) {
    _reporterNs.report("l10n", "./l10n-manager", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }, function (_unresolved_2) {
      l10n = _unresolved_2.default;
    }],
    execute: async function () {
      _crd = true;

      _cclegacy._RF.push({}, "2f21bx4gAFNj6dct9qDHJHH", "auto-config-intl-manager", undefined);

      // @ts-ignore
      await (_crd && l10n === void 0 ? (_reportPossibleCrUseOfl10n({
        error: Error()
      }), l10n) : l10n).createIntl({});

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=467f479cf7444aea49e09047cd6250f55967462e.js.map
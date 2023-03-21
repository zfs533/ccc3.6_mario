System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, l10n, L10nManager, L10nListenEvent, L10nLabel, _crd;

  function _reportPossibleCrUseOfl10n(extras) {
    _reporterNs.report("l10n", "./core/l10n-manager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfL10nManager(extras) {
    _reporterNs.report("L10nManager", "./core/l10n-manager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfL10nListenEvent(extras) {
    _reporterNs.report("L10nListenEvent", "./core/l10n-listen-event", _context.meta, extras);
  }

  function _reportPossibleCrUseOfL10nLabel(extras) {
    _reporterNs.report("L10nLabel", "./components/l10n-label", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }, function (_unresolved_2) {
      l10n = _unresolved_2.default;
      L10nManager = _unresolved_2.L10nManager;
    }, function (_unresolved_3) {
      L10nListenEvent = _unresolved_3.default;
    }, function (_unresolved_4) {
      L10nLabel = _unresolved_4.default;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "07b54nOFPVJZJ/ENmuVbfjY", "l10n", undefined);

      _export("l10n", l10n);

      _export("L10nManager", L10nManager);

      _export("L10nLabel", L10nLabel);

      _export("L10nListenEvent", L10nListenEvent);

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=8deaa7d417cacb3dbea4cf28c599f8866ba75187.js.map
System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _crd, L10nListenEvent;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "34153BqzJ9LR4lhJDevpA4f", "l10n-listen-event", undefined);

      (function (L10nListenEvent) {
        L10nListenEvent["languageChanged"] = "languageChanged";
        L10nListenEvent["onMissingKey"] = "missingKey";
      })(L10nListenEvent || (L10nListenEvent = {}));

      _export("default", L10nListenEvent);

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=901dd638fed93333f657de726f0ec2c3e3d2d9d7.js.map
System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _crd, ICUType;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "e5dc4ljkiFFpI9LqK8hBCPl", "icu-type", undefined);

      (function (ICUType) {
        ICUType[ICUType["DateTime"] = 0] = "DateTime";
        ICUType[ICUType["Number"] = 1] = "Number";
        ICUType[ICUType["List"] = 2] = "List";
        ICUType[ICUType["RelativeTime"] = 3] = "RelativeTime";
      })(ICUType || (ICUType = {}));

      _export("default", ICUType);

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=9ab42bdb2a95ea296906cf1fc00b14b0c7ef8902.js.map
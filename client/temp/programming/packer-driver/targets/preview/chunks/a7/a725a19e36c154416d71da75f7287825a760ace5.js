System.register(["__unresolved_0"], function (_export, _context) {
  "use strict";

  var arrayLikeToArray;

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
  }

  _export("default", _unsupportedIterableToArray);

  return {
    setters: [function (_unresolved_) {
      arrayLikeToArray = _unresolved_.default;
    }],
    execute: function () {}
  };
});
//# sourceMappingURL=a725a19e36c154416d71da75f7287825a760ace5.js.map
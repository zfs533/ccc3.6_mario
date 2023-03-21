System.register(["__unresolved_0"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _cjsExports, ___esModule, _default, __cjsMetaURL;

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _cjsLoader = _unresolved_.default;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        "use strict"; // Type-only circular import

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        var internalSlotMap = new WeakMap();

        function getInternalSlots(x) {
          var internalSlots = internalSlotMap.get(x);

          if (!internalSlots) {
            internalSlots = Object.create(null);
            internalSlotMap.set(x, internalSlots);
          }

          return internalSlots;
        }

        exports.default = getInternalSlots; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        ___esModule = module.exports.__esModule;
        _default = module.exports.default;
      }, {});
    }
  };
});
//# sourceMappingURL=019181d6eb4bf4314c5d1da54d496bb921fcc345.js.map
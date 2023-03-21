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
        // eslint-disable-next-line import/no-cycle

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
//# sourceMappingURL=8d438b0bfb57b26ded1e989597a29f31e4c3bb1a.js.map
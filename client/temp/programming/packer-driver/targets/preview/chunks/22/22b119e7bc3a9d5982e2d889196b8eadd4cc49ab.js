System.register(["__unresolved_0"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _cjsExports, ___esModule, _DefaultNumberOption, __cjsMetaURL;

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _cjsLoader = _unresolved_.default;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.DefaultNumberOption = void 0;

        function DefaultNumberOption(val, min, max, fallback) {
          if (val !== undefined) {
            val = Number(val);

            if (isNaN(val) || val < min || val > max) {
              throw new RangeError("".concat(val, " is outside of range [").concat(min, ", ").concat(max, "]"));
            }

            return Math.floor(val);
          }

          return fallback;
        }

        exports.DefaultNumberOption = DefaultNumberOption; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        ___esModule = module.exports.__esModule;
        _DefaultNumberOption = module.exports.DefaultNumberOption;
      }, {});
    }
  };
});
//# sourceMappingURL=22b119e7bc3a9d5982e2d889196b8eadd4cc49ab.js.map
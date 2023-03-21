System.register(["__unresolved_0"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _cjsExports, ___esModule, _invariant, _UNICODE_EXTENSION_SEQUENCE_REGEX, __cjsMetaURL;

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
        exports.invariant = exports.UNICODE_EXTENSION_SEQUENCE_REGEX = void 0;
        exports.UNICODE_EXTENSION_SEQUENCE_REGEX = /-u(?:-[0-9a-z]{2,8})+/gi;

        function invariant(condition, message, Err) {
          if (Err === void 0) {
            Err = Error;
          }

          if (!condition) {
            throw new Err(message);
          }
        }

        exports.invariant = invariant; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        ___esModule = module.exports.__esModule;
        _invariant = module.exports.invariant;
        _UNICODE_EXTENSION_SEQUENCE_REGEX = module.exports.UNICODE_EXTENSION_SEQUENCE_REGEX;
      }, {});
    }
  };
});
//# sourceMappingURL=cd0563664ba5ad85797061c8234267549cfe3658.js.map
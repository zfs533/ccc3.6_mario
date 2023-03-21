System.register(["__unresolved_0", "tslib"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _cjsExports, ___esModule, _isMissingLocaleDataError, __cjsMetaURL;

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _cjsLoader = _unresolved_.default;
    }, function (_tslib) {
      _req = _tslib.__cjsMetaURL;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.isMissingLocaleDataError = void 0;

        var tslib_1 = require("tslib");

        var MissingLocaleDataError =
        /** @class */
        function (_super) {
          (0, tslib_1.__extends)(MissingLocaleDataError, _super);

          function MissingLocaleDataError() {
            var _this = _super !== null && _super.apply(this, arguments) || this;

            _this.type = 'MISSING_LOCALE_DATA';
            return _this;
          }

          return MissingLocaleDataError;
        }(Error);

        function isMissingLocaleDataError(e) {
          return e.type === 'MISSING_LOCALE_DATA';
        }

        exports.isMissingLocaleDataError = isMissingLocaleDataError; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        ___esModule = module.exports.__esModule;
        _isMissingLocaleDataError = module.exports.isMissingLocaleDataError;
      }, () => ({
        'tslib': _req
      }));
    }
  };
});
//# sourceMappingURL=fc5618c74ab08434c8503ffe2796d0e861765ebe.js.map
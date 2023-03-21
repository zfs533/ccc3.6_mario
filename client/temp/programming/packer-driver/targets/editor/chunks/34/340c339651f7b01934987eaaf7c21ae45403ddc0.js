System.register(["__unresolved_0", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _cjsExports, ___esModule, _CoerceOptionsToObject, __cjsMetaURL;

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _cjsLoader = _unresolved_.default;
    }, function (_unresolved_2) {
      _req = _unresolved_2.__cjsMetaURL;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.CoerceOptionsToObject = void 0;

        var _262_1 = require("./262");
        /**
         * https://tc39.es/ecma402/#sec-coerceoptionstoobject
         * @param options
         * @returns
         */


        function CoerceOptionsToObject(options) {
          if (typeof options === 'undefined') {
            return Object.create(null);
          }

          return (0, _262_1.ToObject)(options);
        }

        exports.CoerceOptionsToObject = CoerceOptionsToObject; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        ___esModule = module.exports.__esModule;
        _CoerceOptionsToObject = module.exports.CoerceOptionsToObject;
      }, () => ({
        './262': _req
      }));
    }
  };
});
//# sourceMappingURL=340c339651f7b01934987eaaf7c21ae45403ddc0.js.map
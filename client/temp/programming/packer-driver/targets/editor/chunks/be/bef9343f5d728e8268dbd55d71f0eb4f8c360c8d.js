System.register(["__unresolved_0", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _cjsExports, ___esModule, _GetNumberOption, __cjsMetaURL;

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
        /**
         * https://tc39.es/ecma402/#sec-getnumberoption
         * @param options
         * @param property
         * @param min
         * @param max
         * @param fallback
         */

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.GetNumberOption = void 0;

        var DefaultNumberOption_1 = require("./DefaultNumberOption");

        function GetNumberOption(options, property, minimum, maximum, fallback) {
          var val = options[property]; // @ts-expect-error

          return (0, DefaultNumberOption_1.DefaultNumberOption)(val, minimum, maximum, fallback);
        }

        exports.GetNumberOption = GetNumberOption; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        ___esModule = module.exports.__esModule;
        _GetNumberOption = module.exports.GetNumberOption;
      }, () => ({
        './DefaultNumberOption': _req
      }));
    }
  };
});
//# sourceMappingURL=bef9343f5d728e8268dbd55d71f0eb4f8c360c8d.js.map
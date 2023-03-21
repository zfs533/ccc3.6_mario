System.register(["__unresolved_0", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _cjsExports, ___esModule, _UnicodeExtensionValue, __cjsMetaURL;

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
        exports.UnicodeExtensionValue = void 0;

        var utils_1 = require("./utils");
        /**
         * https://tc39.es/ecma402/#sec-unicodeextensionvalue
         * @param extension
         * @param key
         */


        function UnicodeExtensionValue(extension, key) {
          (0, utils_1.invariant)(key.length === 2, 'key must have 2 elements');
          var size = extension.length;
          var searchValue = "-".concat(key, "-");
          var pos = extension.indexOf(searchValue);

          if (pos !== -1) {
            var start = pos + 4;
            var end = start;
            var k = start;
            var done = false;

            while (!done) {
              var e = extension.indexOf('-', k);
              var len = void 0;

              if (e === -1) {
                len = size - k;
              } else {
                len = e - k;
              }

              if (len === 2) {
                done = true;
              } else if (e === -1) {
                end = size;
                done = true;
              } else {
                end = e;
                k = e + 1;
              }
            }

            return extension.slice(start, end);
          }

          searchValue = "-".concat(key);
          pos = extension.indexOf(searchValue);

          if (pos !== -1 && pos + 3 === size) {
            return '';
          }

          return undefined;
        }

        exports.UnicodeExtensionValue = UnicodeExtensionValue; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        ___esModule = module.exports.__esModule;
        _UnicodeExtensionValue = module.exports.UnicodeExtensionValue;
      }, () => ({
        './utils': _req
      }));
    }
  };
});
//# sourceMappingURL=b18585e5312997c43095ab27f693c039e60978b0.js.map
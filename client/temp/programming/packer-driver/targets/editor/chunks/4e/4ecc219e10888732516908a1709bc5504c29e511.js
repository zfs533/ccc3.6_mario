System.register(["__unresolved_0", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _cjsExports, ___esModule, _PartitionPattern, __cjsMetaURL;

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
        exports.PartitionPattern = void 0;

        var utils_1 = require("./utils");
        /**
         * https://tc39.es/ecma402/#sec-partitionpattern
         * @param pattern
         */


        function PartitionPattern(pattern) {
          var result = [];
          var beginIndex = pattern.indexOf('{');
          var endIndex = 0;
          var nextIndex = 0;
          var length = pattern.length;

          while (beginIndex < pattern.length && beginIndex > -1) {
            endIndex = pattern.indexOf('}', beginIndex);
            (0, utils_1.invariant)(endIndex > beginIndex, "Invalid pattern ".concat(pattern));

            if (beginIndex > nextIndex) {
              result.push({
                type: 'literal',
                value: pattern.substring(nextIndex, beginIndex)
              });
            }

            result.push({
              type: pattern.substring(beginIndex + 1, endIndex),
              value: undefined
            });
            nextIndex = endIndex + 1;
            beginIndex = pattern.indexOf('{', nextIndex);
          }

          if (nextIndex < length) {
            result.push({
              type: 'literal',
              value: pattern.substring(nextIndex, length)
            });
          }

          return result;
        }

        exports.PartitionPattern = PartitionPattern; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        ___esModule = module.exports.__esModule;
        _PartitionPattern = module.exports.PartitionPattern;
      }, () => ({
        './utils': _req
      }));
    }
  };
});
//# sourceMappingURL=4ecc219e10888732516908a1709bc5504c29e511.js.map
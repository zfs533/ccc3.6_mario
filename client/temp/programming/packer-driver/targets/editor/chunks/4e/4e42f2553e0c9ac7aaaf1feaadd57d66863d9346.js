System.register(["__unresolved_0", "@formatjs/ecma402-abstract"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _cjsExports, ___esModule, _MakePartsList, __cjsMetaURL;

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _cjsLoader = _unresolved_.default;
    }, function (_formatjsEcma402Abstract) {
      _req = _formatjsEcma402Abstract.__cjsMetaURL;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.MakePartsList = void 0;

        var ecma402_abstract_1 = require("@formatjs/ecma402-abstract");

        function MakePartsList(pattern, unit, parts) {
          var patternParts = (0, ecma402_abstract_1.PartitionPattern)(pattern);
          var result = [];

          for (var _i = 0, patternParts_1 = patternParts; _i < patternParts_1.length; _i++) {
            var patternPart = patternParts_1[_i];

            if (patternPart.type === 'literal') {
              result.push({
                type: 'literal',
                value: patternPart.value
              });
            } else {
              (0, ecma402_abstract_1.invariant)(patternPart.type === '0', "Malformed pattern ".concat(pattern));

              for (var _a = 0, parts_1 = parts; _a < parts_1.length; _a++) {
                var part = parts_1[_a];
                result.push({
                  type: part.type,
                  value: part.value,
                  unit: unit
                });
              }
            }
          }

          return result;
        }

        exports.MakePartsList = MakePartsList; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        ___esModule = module.exports.__esModule;
        _MakePartsList = module.exports.MakePartsList;
      }, () => ({
        '@formatjs/ecma402-abstract': _req
      }));
    }
  };
});
//# sourceMappingURL=4e42f2553e0c9ac7aaaf1feaadd57d66863d9346.js.map
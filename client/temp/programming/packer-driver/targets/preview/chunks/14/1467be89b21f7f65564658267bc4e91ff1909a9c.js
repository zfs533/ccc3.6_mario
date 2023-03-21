System.register(["__unresolved_0", "tslib", "@formatjs/ecma402-abstract", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _req0, _req1, _cjsExports, ___esModule, _BasicFormatMatcher, __cjsMetaURL;

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _cjsLoader = _unresolved_.default;
    }, function (_tslib) {
      _req = _tslib.__cjsMetaURL;
    }, function (_formatjsEcma402Abstract) {
      _req0 = _formatjsEcma402Abstract.__cjsMetaURL;
    }, function (_unresolved_2) {
      _req1 = _unresolved_2.__cjsMetaURL;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.BasicFormatMatcher = void 0;

        var tslib_1 = require("tslib");

        var ecma402_abstract_1 = require("@formatjs/ecma402-abstract");

        var utils_1 = require("./utils");
        /**
         * https://tc39.es/ecma402/#sec-basicformatmatcher
         * @param options
         * @param formats
         */


        function BasicFormatMatcher(options, formats) {
          var bestScore = -Infinity;
          var bestFormat = formats[0];
          (0, ecma402_abstract_1.invariant)(Array.isArray(formats), 'formats should be a list of things');

          for (var _i = 0, formats_1 = formats; _i < formats_1.length; _i++) {
            var format = formats_1[_i];
            var score = 0;

            for (var _a = 0, DATE_TIME_PROPS_1 = utils_1.DATE_TIME_PROPS; _a < DATE_TIME_PROPS_1.length; _a++) {
              var prop = DATE_TIME_PROPS_1[_a];
              var optionsProp = options[prop];
              var formatProp = format[prop];

              if (optionsProp === undefined && formatProp !== undefined) {
                score -= utils_1.additionPenalty;
              } else if (optionsProp !== undefined && formatProp === undefined) {
                score -= utils_1.removalPenalty;
              } else if (optionsProp !== formatProp) {
                var values = void 0;

                if (prop === 'fractionalSecondDigits') {
                  values = [1, 2, 3];
                } else {
                  values = ['2-digit', 'numeric', 'narrow', 'short', 'long'];
                }

                var optionsPropIndex = values.indexOf(optionsProp);
                var formatPropIndex = values.indexOf(formatProp);
                var delta = Math.max(-2, Math.min(formatPropIndex - optionsPropIndex, 2));

                if (delta === 2) {
                  score -= utils_1.longMorePenalty;
                } else if (delta === 1) {
                  score -= utils_1.shortMorePenalty;
                } else if (delta === -1) {
                  score -= utils_1.shortLessPenalty;
                } else if (delta === -2) {
                  score -= utils_1.longLessPenalty;
                }
              }
            }

            if (score > bestScore) {
              bestScore = score;
              bestFormat = format;
            }
          }

          return (0, tslib_1.__assign)({}, bestFormat);
        }

        exports.BasicFormatMatcher = BasicFormatMatcher; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        ___esModule = module.exports.__esModule;
        _BasicFormatMatcher = module.exports.BasicFormatMatcher;
      }, () => ({
        'tslib': _req,
        '@formatjs/ecma402-abstract': _req0,
        './utils': _req1
      }));
    }
  };
});
//# sourceMappingURL=1467be89b21f7f65564658267bc4e91ff1909a9c.js.map
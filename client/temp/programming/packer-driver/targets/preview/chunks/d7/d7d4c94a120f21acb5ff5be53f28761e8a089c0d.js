System.register(["__unresolved_0", "tslib", "@formatjs/ecma402-abstract", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _req0, _req1, _req2, _cjsExports, ___esModule, _BestFitFormatMatcher, _bestFitFormatMatcherScore, __cjsMetaURL;

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
    }, function (_unresolved_3) {
      _req2 = _unresolved_3.__cjsMetaURL;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.BestFitFormatMatcher = exports.bestFitFormatMatcherScore = void 0;

        var tslib_1 = require("tslib");

        var ecma402_abstract_1 = require("@formatjs/ecma402-abstract");

        var utils_1 = require("./utils");

        var skeleton_1 = require("./skeleton");

        function isNumericType(t) {
          return t === 'numeric' || t === '2-digit';
        }
        /**
         * Credit: https://github.com/andyearnshaw/Intl.js/blob/0958dc1ad8153f1056653ea22b8208f0df289a4e/src/12.datetimeformat.js#L611
         * with some modifications
         * @param options
         * @param format
         */


        function bestFitFormatMatcherScore(options, format) {
          var score = 0;

          if (options.hour12 && !format.hour12) {
            score -= utils_1.removalPenalty;
          } else if (!options.hour12 && format.hour12) {
            score -= utils_1.additionPenalty;
          }

          for (var _i = 0, DATE_TIME_PROPS_1 = utils_1.DATE_TIME_PROPS; _i < DATE_TIME_PROPS_1.length; _i++) {
            var prop = DATE_TIME_PROPS_1[_i];
            var optionsProp = options[prop];
            var formatProp = format[prop];

            if (optionsProp === undefined && formatProp !== undefined) {
              score -= utils_1.additionPenalty;
            } else if (optionsProp !== undefined && formatProp === undefined) {
              score -= utils_1.removalPenalty;
            } else if (optionsProp !== formatProp) {
              // extra penalty for numeric vs non-numeric
              if (isNumericType(optionsProp) !== isNumericType(formatProp)) {
                score -= utils_1.differentNumericTypePenalty;
              } else {
                var values = ['2-digit', 'numeric', 'narrow', 'short', 'long'];
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
          }

          return score;
        }

        exports.bestFitFormatMatcherScore = bestFitFormatMatcherScore;
        /**
         * https://tc39.es/ecma402/#sec-bestfitformatmatcher
         * Just alias to basic for now
         * @param options
         * @param formats
         * @param implDetails Implementation details
         */

        function BestFitFormatMatcher(options, formats) {
          var bestScore = -Infinity;
          var bestFormat = formats[0];
          (0, ecma402_abstract_1.invariant)(Array.isArray(formats), 'formats should be a list of things');

          for (var _i = 0, formats_1 = formats; _i < formats_1.length; _i++) {
            var format = formats_1[_i];
            var score = bestFitFormatMatcherScore(options, format);

            if (score > bestScore) {
              bestScore = score;
              bestFormat = format;
            }
          }

          var skeletonFormat = (0, tslib_1.__assign)({}, bestFormat);
          var patternFormat = {
            rawPattern: bestFormat.rawPattern
          };
          (0, skeleton_1.processDateTimePattern)(bestFormat.rawPattern, patternFormat); // Kinda following https://github.com/unicode-org/icu/blob/dd50e38f459d84e9bf1b0c618be8483d318458ad/icu4j/main/classes/core/src/com/ibm/icu/text/DateTimePatternGenerator.java
          // Method adjustFieldTypes

          for (var prop in skeletonFormat) {
            var skeletonValue = skeletonFormat[prop];
            var patternValue = patternFormat[prop];
            var requestedValue = options[prop]; // Don't mess with minute/second or we can get in the situation of
            // 7:0:0 which is weird

            if (prop === 'minute' || prop === 'second') {
              continue;
            } // Nothing to do here


            if (!requestedValue) {
              continue;
            } // https://unicode.org/reports/tr35/tr35-dates.html#Matching_Skeletons
            // Looks like we should not convert numeric to alphabetic but the other way
            // around is ok


            if (isNumericType(patternValue) && !isNumericType(requestedValue)) {
              continue;
            }

            if (skeletonValue === requestedValue) {
              continue;
            }

            patternFormat[prop] = requestedValue;
          } // Copy those over


          patternFormat.pattern = skeletonFormat.pattern;
          patternFormat.pattern12 = skeletonFormat.pattern12;
          patternFormat.skeleton = skeletonFormat.skeleton;
          patternFormat.rangePatterns = skeletonFormat.rangePatterns;
          patternFormat.rangePatterns12 = skeletonFormat.rangePatterns12;
          return patternFormat;
        }

        exports.BestFitFormatMatcher = BestFitFormatMatcher; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        ___esModule = module.exports.__esModule;
        _BestFitFormatMatcher = module.exports.BestFitFormatMatcher;
        _bestFitFormatMatcherScore = module.exports.bestFitFormatMatcherScore;
      }, () => ({
        'tslib': _req,
        '@formatjs/ecma402-abstract': _req0,
        './utils': _req1,
        './skeleton': _req2
      }));
    }
  };
});
//# sourceMappingURL=d7d4c94a120f21acb5ff5be53f28761e8a089c0d.js.map
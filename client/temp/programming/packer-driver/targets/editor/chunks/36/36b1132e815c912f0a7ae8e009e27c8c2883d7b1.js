System.register(["__unresolved_0", "@formatjs/ecma402-abstract", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _req0, _req1, _cjsExports, ___esModule, _PartitionDateTimeRangePattern, __cjsMetaURL;

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _cjsLoader = _unresolved_.default;
    }, function (_formatjsEcma402Abstract) {
      _req = _formatjsEcma402Abstract.__cjsMetaURL;
    }, function (_unresolved_2) {
      _req0 = _unresolved_2.__cjsMetaURL;
    }, function (_unresolved_3) {
      _req1 = _unresolved_3.__cjsMetaURL;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.PartitionDateTimeRangePattern = void 0;

        var ecma402_abstract_1 = require("@formatjs/ecma402-abstract");

        var ToLocalTime_1 = require("./ToLocalTime");

        var FormatDateTimePattern_1 = require("./FormatDateTimePattern");

        var TABLE_2_FIELDS = ['era', 'year', 'month', 'day', 'dayPeriod', 'ampm', 'hour', 'minute', 'second', 'fractionalSecondDigits'];

        function PartitionDateTimeRangePattern(dtf, x, y, implDetails) {
          x = (0, ecma402_abstract_1.TimeClip)(x);

          if (isNaN(x)) {
            throw new RangeError('Invalid start time');
          }

          y = (0, ecma402_abstract_1.TimeClip)(y);

          if (isNaN(y)) {
            throw new RangeError('Invalid end time');
          }
          /** IMPL START */


          var getInternalSlots = implDetails.getInternalSlots,
              tzData = implDetails.tzData;
          var internalSlots = getInternalSlots(dtf);
          /** IMPL END */

          var tm1 = (0, ToLocalTime_1.ToLocalTime)(x, // @ts-ignore
          internalSlots.calendar, internalSlots.timeZone, {
            tzData: tzData
          });
          var tm2 = (0, ToLocalTime_1.ToLocalTime)(y, // @ts-ignore
          internalSlots.calendar, internalSlots.timeZone, {
            tzData: tzData
          });
          var pattern = internalSlots.pattern,
              rangePatterns = internalSlots.rangePatterns;
          var rangePattern;
          var dateFieldsPracticallyEqual = true;
          var patternContainsLargerDateField = false;

          for (var _i = 0, TABLE_2_FIELDS_1 = TABLE_2_FIELDS; _i < TABLE_2_FIELDS_1.length; _i++) {
            var fieldName = TABLE_2_FIELDS_1[_i];

            if (dateFieldsPracticallyEqual && !patternContainsLargerDateField) {
              var rp = fieldName in rangePatterns ? rangePatterns[fieldName] : undefined;

              if (rangePattern !== undefined && rp === undefined) {
                patternContainsLargerDateField = true;
              } else {
                rangePattern = rp;

                if (fieldName === 'ampm') {
                  var v1 = tm1.hour;
                  var v2 = tm2.hour;

                  if (v1 > 11 && v2 < 11 || v1 < 11 && v2 > 11) {
                    dateFieldsPracticallyEqual = false;
                  }
                } else if (fieldName === 'dayPeriod') {// TODO
                } else if (fieldName === 'fractionalSecondDigits') {
                  var fractionalSecondDigits = internalSlots.fractionalSecondDigits;

                  if (fractionalSecondDigits === undefined) {
                    fractionalSecondDigits = 3;
                  }

                  var v1 = Math.floor(tm1.millisecond * Math.pow(10, fractionalSecondDigits - 3));
                  var v2 = Math.floor(tm2.millisecond * Math.pow(10, fractionalSecondDigits - 3));

                  if (!(0, ecma402_abstract_1.SameValue)(v1, v2)) {
                    dateFieldsPracticallyEqual = false;
                  }
                } else {
                  var v1 = tm1[fieldName];
                  var v2 = tm2[fieldName];

                  if (!(0, ecma402_abstract_1.SameValue)(v1, v2)) {
                    dateFieldsPracticallyEqual = false;
                  }
                }
              }
            }
          }

          if (dateFieldsPracticallyEqual) {
            var result_2 = (0, FormatDateTimePattern_1.FormatDateTimePattern)(dtf, (0, ecma402_abstract_1.PartitionPattern)(pattern), x, implDetails);

            for (var _a = 0, result_1 = result_2; _a < result_1.length; _a++) {
              var r = result_1[_a];
              r.source = ecma402_abstract_1.RangePatternType.shared;
            }

            return result_2;
          }

          var result = [];

          if (rangePattern === undefined) {
            rangePattern = rangePatterns.default;
            /** IMPL DETAILS */
            // Now we have to replace {0} & {1} with actual pattern

            for (var _b = 0, _c = rangePattern.patternParts; _b < _c.length; _b++) {
              var patternPart = _c[_b];

              if (patternPart.pattern === '{0}' || patternPart.pattern === '{1}') {
                patternPart.pattern = pattern;
              }
            }
          }

          for (var _d = 0, _e = rangePattern.patternParts; _d < _e.length; _d++) {
            var rangePatternPart = _e[_d];
            var source = rangePatternPart.source,
                pattern_1 = rangePatternPart.pattern;
            var z = void 0;

            if (source === ecma402_abstract_1.RangePatternType.startRange || source === ecma402_abstract_1.RangePatternType.shared) {
              z = x;
            } else {
              z = y;
            }

            var patternParts = (0, ecma402_abstract_1.PartitionPattern)(pattern_1);
            var partResult = (0, FormatDateTimePattern_1.FormatDateTimePattern)(dtf, patternParts, z, implDetails);

            for (var _f = 0, partResult_1 = partResult; _f < partResult_1.length; _f++) {
              var r = partResult_1[_f];
              r.source = source;
            }

            result = result.concat(partResult);
          }

          return result;
        }

        exports.PartitionDateTimeRangePattern = PartitionDateTimeRangePattern; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        ___esModule = module.exports.__esModule;
        _PartitionDateTimeRangePattern = module.exports.PartitionDateTimeRangePattern;
      }, () => ({
        '@formatjs/ecma402-abstract': _req,
        './ToLocalTime': _req0,
        './FormatDateTimePattern': _req1
      }));
    }
  };
});
//# sourceMappingURL=36b1132e815c912f0a7ae8e009e27c8c2883d7b1.js.map
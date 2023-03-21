System.register(["__unresolved_0", "@formatjs/ecma402-abstract", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _req0, _req1, _cjsExports, ___esModule, _FormatDateTimePattern, __cjsMetaURL;

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
        exports.FormatDateTimePattern = void 0;

        var ecma402_abstract_1 = require("@formatjs/ecma402-abstract");

        var utils_1 = require("./utils");

        var ToLocalTime_1 = require("./ToLocalTime");

        function pad(n) {
          if (n < 10) {
            return "0".concat(n);
          }

          return String(n);
        }

        function offsetToGmtString(gmtFormat, hourFormat, offsetInMs, style) {
          var offsetInMinutes = Math.floor(offsetInMs / 60000);
          var mins = Math.abs(offsetInMinutes) % 60;
          var hours = Math.floor(Math.abs(offsetInMinutes) / 60);

          var _a = hourFormat.split(';'),
              positivePattern = _a[0],
              negativePattern = _a[1];

          var offsetStr = '';
          var pattern = offsetInMs < 0 ? negativePattern : positivePattern;

          if (style === 'long') {
            offsetStr = pattern.replace('HH', pad(hours)).replace('H', String(hours)).replace('mm', pad(mins)).replace('m', String(mins));
          } else if (mins || hours) {
            if (!mins) {
              pattern = pattern.replace(/:?m+/, '');
            }

            offsetStr = pattern.replace(/H+/, String(hours)).replace(/m+/, String(mins));
          }

          return gmtFormat.replace('{0}', offsetStr);
        }
        /**
         * https://tc39.es/ecma402/#sec-partitiondatetimepattern
         * @param dtf
         * @param x
         */


        function FormatDateTimePattern(dtf, patternParts, x, _a) {
          var getInternalSlots = _a.getInternalSlots,
              localeData = _a.localeData,
              getDefaultTimeZone = _a.getDefaultTimeZone,
              tzData = _a.tzData;
          x = (0, ecma402_abstract_1.TimeClip)(x);
          /** IMPL START */

          var internalSlots = getInternalSlots(dtf);
          var dataLocale = internalSlots.dataLocale;
          var dataLocaleData = localeData[dataLocale];
          /** IMPL END */

          var locale = internalSlots.locale;
          var nfOptions = Object.create(null);
          nfOptions.useGrouping = false;
          var nf = new Intl.NumberFormat(locale, nfOptions);
          var nf2Options = Object.create(null);
          nf2Options.minimumIntegerDigits = 2;
          nf2Options.useGrouping = false;
          var nf2 = new Intl.NumberFormat(locale, nf2Options);
          var fractionalSecondDigits = internalSlots.fractionalSecondDigits;
          var nf3;

          if (fractionalSecondDigits !== undefined) {
            var nf3Options = Object.create(null);
            nf3Options.minimumIntegerDigits = fractionalSecondDigits;
            nf3Options.useGrouping = false;
            nf3 = new Intl.NumberFormat(locale, nf3Options);
          }

          var tm = (0, ToLocalTime_1.ToLocalTime)(x, // @ts-ignore
          internalSlots.calendar, internalSlots.timeZone, {
            tzData: tzData
          });
          var result = [];

          for (var _i = 0, patternParts_1 = patternParts; _i < patternParts_1.length; _i++) {
            var patternPart = patternParts_1[_i];
            var p = patternPart.type;

            if (p === 'literal') {
              result.push({
                type: 'literal',
                value: patternPart.value
              });
            } else if (p === 'fractionalSecondDigits') {
              var v = Math.floor(tm.millisecond * Math.pow(10, (fractionalSecondDigits || 0) - 3));
              result.push({
                // @ts-expect-error Spec is not there yet
                type: 'fractionalSecond',
                value: nf3.format(v)
              });
            } else if (p === 'dayPeriod') {// TODO
            } else if (utils_1.DATE_TIME_PROPS.indexOf(p) > -1) {
              var fv = '';
              var f = internalSlots[p]; // @ts-ignore

              var v = tm[p];

              if (p === 'year' && v <= 0) {
                v = 1 - v;
              }

              if (p === 'month') {
                v++;
              }

              var hourCycle = internalSlots.hourCycle;

              if (p === 'hour' && (hourCycle === 'h11' || hourCycle === 'h12')) {
                v = v % 12;

                if (v === 0 && hourCycle === 'h12') {
                  v = 12;
                }
              }

              if (p === 'hour' && hourCycle === 'h24') {
                if (v === 0) {
                  v = 24;
                }
              }

              if (f === 'numeric') {
                fv = nf.format(v);
              } else if (f === '2-digit') {
                fv = nf2.format(v);

                if (fv.length > 2) {
                  fv = fv.slice(fv.length - 2, fv.length);
                }
              } else if (f === 'narrow' || f === 'short' || f === 'long') {
                if (p === 'era') {
                  fv = dataLocaleData[p][f][v];
                } else if (p === 'timeZoneName') {
                  var timeZoneName = dataLocaleData.timeZoneName,
                      gmtFormat = dataLocaleData.gmtFormat,
                      hourFormat = dataLocaleData.hourFormat;
                  var timeZone = internalSlots.timeZone || getDefaultTimeZone();
                  var timeZoneData = timeZoneName[timeZone];

                  if (timeZoneData && timeZoneData[f]) {
                    fv = timeZoneData[f][+tm.inDST];
                  } else {
                    // Fallback to gmtFormat
                    fv = offsetToGmtString(gmtFormat, hourFormat, tm.timeZoneOffset, f);
                  }
                } else if (p === 'month') {
                  fv = dataLocaleData.month[f][v - 1];
                } else {
                  fv = dataLocaleData[p][f][v];
                }
              }

              result.push({
                type: p,
                value: fv
              });
            } else if (p === 'ampm') {
              var v = tm.hour;
              var fv = void 0;

              if (v > 11) {
                fv = dataLocaleData.pm;
              } else {
                fv = dataLocaleData.am;
              }

              result.push({
                type: 'dayPeriod',
                value: fv
              });
            } else if (p === 'relatedYear') {
              var v = tm.relatedYear; // @ts-ignore

              var fv = nf.format(v);
              result.push({
                // @ts-ignore TODO: Fix TS type
                type: 'relatedYear',
                value: fv
              });
            } else if (p === 'yearName') {
              var v = tm.yearName; // @ts-ignore

              var fv = nf.format(v);
              result.push({
                // @ts-ignore TODO: Fix TS type
                type: 'yearName',
                value: fv
              });
            }
          }

          return result;
        }

        exports.FormatDateTimePattern = FormatDateTimePattern; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        ___esModule = module.exports.__esModule;
        _FormatDateTimePattern = module.exports.FormatDateTimePattern;
      }, () => ({
        '@formatjs/ecma402-abstract': _req,
        './utils': _req0,
        './ToLocalTime': _req1
      }));
    }
  };
});
//# sourceMappingURL=ead800e3fe2341115335887fb459c866709f21f7.js.map
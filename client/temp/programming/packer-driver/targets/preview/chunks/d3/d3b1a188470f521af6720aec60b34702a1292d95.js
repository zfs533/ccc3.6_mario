System.register(["__unresolved_0", "@formatjs/ecma402-abstract", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5", "@formatjs/intl-localematcher"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _req0, _req1, _req2, _req3, _req4, _req5, _cjsExports, ___esModule, _InitializeDateTimeFormat, __cjsMetaURL;

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
    }, function (_unresolved_4) {
      _req2 = _unresolved_4.__cjsMetaURL;
    }, function (_unresolved_5) {
      _req3 = _unresolved_5.__cjsMetaURL;
    }, function (_unresolved_6) {
      _req4 = _unresolved_6.__cjsMetaURL;
    }, function (_formatjsIntlLocalematcher) {
      _req5 = _formatjsIntlLocalematcher.__cjsMetaURL;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.InitializeDateTimeFormat = void 0;

        var ecma402_abstract_1 = require("@formatjs/ecma402-abstract");

        var BasicFormatMatcher_1 = require("./BasicFormatMatcher");

        var BestFitFormatMatcher_1 = require("./BestFitFormatMatcher");

        var utils_1 = require("./utils");

        var DateTimeStyleFormat_1 = require("./DateTimeStyleFormat");

        var ToDateTimeOptions_1 = require("./ToDateTimeOptions");

        var intl_localematcher_1 = require("@formatjs/intl-localematcher");

        function isTimeRelated(opt) {
          for (var _i = 0, _a = ['hour', 'minute', 'second']; _i < _a.length; _i++) {
            var prop = _a[_i];
            var value = opt[prop];

            if (value !== undefined) {
              return true;
            }
          }

          return false;
        }

        function resolveHourCycle(hc, hcDefault, hour12) {
          if (hc == null) {
            hc = hcDefault;
          }

          if (hour12 !== undefined) {
            if (hour12) {
              if (hcDefault === 'h11' || hcDefault === 'h23') {
                hc = 'h11';
              } else {
                hc = 'h12';
              }
            } else {
              (0, ecma402_abstract_1.invariant)(!hour12, 'hour12 must not be set');

              if (hcDefault === 'h11' || hcDefault === 'h23') {
                hc = 'h23';
              } else {
                hc = 'h24';
              }
            }
          }

          return hc;
        }

        var TYPE_REGEX = /^[a-z0-9]{3,8}$/i;
        /**
         * https://tc39.es/ecma402/#sec-initializedatetimeformat
         * @param dtf DateTimeFormat
         * @param locales locales
         * @param opts options
         */

        function InitializeDateTimeFormat(dtf, locales, opts, _a) {
          var getInternalSlots = _a.getInternalSlots,
              availableLocales = _a.availableLocales,
              localeData = _a.localeData,
              getDefaultLocale = _a.getDefaultLocale,
              getDefaultTimeZone = _a.getDefaultTimeZone,
              relevantExtensionKeys = _a.relevantExtensionKeys,
              tzData = _a.tzData,
              uppercaseLinks = _a.uppercaseLinks; // @ts-ignore

          var requestedLocales = (0, ecma402_abstract_1.CanonicalizeLocaleList)(locales);
          var options = (0, ToDateTimeOptions_1.ToDateTimeOptions)(opts, 'any', 'date');
          var opt = Object.create(null);
          var matcher = (0, ecma402_abstract_1.GetOption)(options, 'localeMatcher', 'string', ['lookup', 'best fit'], 'best fit');
          opt.localeMatcher = matcher;
          var calendar = (0, ecma402_abstract_1.GetOption)(options, 'calendar', 'string', undefined, undefined);

          if (calendar !== undefined && !TYPE_REGEX.test(calendar)) {
            throw new RangeError('Malformed calendar');
          }

          var internalSlots = getInternalSlots(dtf);
          opt.ca = calendar;
          var numberingSystem = (0, ecma402_abstract_1.GetOption)(options, 'numberingSystem', 'string', undefined, undefined);

          if (numberingSystem !== undefined && !TYPE_REGEX.test(numberingSystem)) {
            throw new RangeError('Malformed numbering system');
          }

          opt.nu = numberingSystem;
          var hour12 = (0, ecma402_abstract_1.GetOption)(options, 'hour12', 'boolean', undefined, undefined);
          var hourCycle = (0, ecma402_abstract_1.GetOption)(options, 'hourCycle', 'string', ['h11', 'h12', 'h23', 'h24'], undefined);

          if (hour12 !== undefined) {
            // @ts-ignore
            hourCycle = null;
          }

          opt.hc = hourCycle;
          var r = (0, intl_localematcher_1.ResolveLocale)(availableLocales, requestedLocales, opt, relevantExtensionKeys, localeData, getDefaultLocale);
          internalSlots.locale = r.locale;
          calendar = r.ca;
          internalSlots.calendar = calendar;
          internalSlots.hourCycle = r.hc;
          internalSlots.numberingSystem = r.nu;
          var dataLocale = r.dataLocale;
          internalSlots.dataLocale = dataLocale;
          var timeZone = options.timeZone;

          if (timeZone !== undefined) {
            timeZone = String(timeZone);

            if (!(0, ecma402_abstract_1.IsValidTimeZoneName)(timeZone, {
              tzData: tzData,
              uppercaseLinks: uppercaseLinks
            })) {
              throw new RangeError('Invalid timeZoneName');
            }

            timeZone = (0, ecma402_abstract_1.CanonicalizeTimeZoneName)(timeZone, {
              tzData: tzData,
              uppercaseLinks: uppercaseLinks
            });
          } else {
            timeZone = getDefaultTimeZone();
          }

          internalSlots.timeZone = timeZone;
          opt = Object.create(null);
          opt.weekday = (0, ecma402_abstract_1.GetOption)(options, 'weekday', 'string', ['narrow', 'short', 'long'], undefined);
          opt.era = (0, ecma402_abstract_1.GetOption)(options, 'era', 'string', ['narrow', 'short', 'long'], undefined);
          opt.year = (0, ecma402_abstract_1.GetOption)(options, 'year', 'string', ['2-digit', 'numeric'], undefined);
          opt.month = (0, ecma402_abstract_1.GetOption)(options, 'month', 'string', ['2-digit', 'numeric', 'narrow', 'short', 'long'], undefined);
          opt.day = (0, ecma402_abstract_1.GetOption)(options, 'day', 'string', ['2-digit', 'numeric'], undefined);
          opt.hour = (0, ecma402_abstract_1.GetOption)(options, 'hour', 'string', ['2-digit', 'numeric'], undefined);
          opt.minute = (0, ecma402_abstract_1.GetOption)(options, 'minute', 'string', ['2-digit', 'numeric'], undefined);
          opt.second = (0, ecma402_abstract_1.GetOption)(options, 'second', 'string', ['2-digit', 'numeric'], undefined);
          opt.timeZoneName = (0, ecma402_abstract_1.GetOption)(options, 'timeZoneName', 'string', ['short', 'long'], undefined);
          opt.fractionalSecondDigits = (0, ecma402_abstract_1.GetNumberOption)(options, 'fractionalSecondDigits', 1, 3, // @ts-expect-error
          undefined);
          var dataLocaleData = localeData[dataLocale];
          (0, ecma402_abstract_1.invariant)(!!dataLocaleData, "Missing locale data for ".concat(dataLocale));
          var formats = dataLocaleData.formats[calendar]; // UNSPECCED: IMPLEMENTATION DETAILS

          if (!formats) {
            throw new RangeError("Calendar \"".concat(calendar, "\" is not supported. Try setting \"calendar\" to 1 of the following: ").concat(Object.keys(dataLocaleData.formats).join(', ')));
          }

          var formatMatcher = (0, ecma402_abstract_1.GetOption)(options, 'formatMatcher', 'string', ['basic', 'best fit'], 'best fit');
          var dateStyle = (0, ecma402_abstract_1.GetOption)(options, 'dateStyle', 'string', ['full', 'long', 'medium', 'short'], undefined);
          internalSlots.dateStyle = dateStyle;
          var timeStyle = (0, ecma402_abstract_1.GetOption)(options, 'timeStyle', 'string', ['full', 'long', 'medium', 'short'], undefined);
          internalSlots.timeStyle = timeStyle;
          var bestFormat;

          if (dateStyle === undefined && timeStyle === undefined) {
            if (formatMatcher === 'basic') {
              bestFormat = (0, BasicFormatMatcher_1.BasicFormatMatcher)(opt, formats);
            } else {
              // IMPL DETAILS START
              if (isTimeRelated(opt)) {
                var hc = resolveHourCycle(internalSlots.hourCycle, dataLocaleData.hourCycle, hour12);
                opt.hour12 = hc === 'h11' || hc === 'h12';
              } // IMPL DETAILS END


              bestFormat = (0, BestFitFormatMatcher_1.BestFitFormatMatcher)(opt, formats);
            }
          } else {
            for (var _i = 0, DATE_TIME_PROPS_1 = utils_1.DATE_TIME_PROPS; _i < DATE_TIME_PROPS_1.length; _i++) {
              var prop = DATE_TIME_PROPS_1[_i];
              var p = opt[prop];

              if (p !== undefined) {
                throw new TypeError("Intl.DateTimeFormat can't set option ".concat(prop, " when ").concat(dateStyle ? 'dateStyle' : 'timeStyle', " is used"));
              }
            }

            bestFormat = (0, DateTimeStyleFormat_1.DateTimeStyleFormat)(dateStyle, timeStyle, dataLocaleData);
          } // IMPL DETAIL START
          // For debugging


          internalSlots.format = bestFormat; // IMPL DETAIL END

          for (var prop in opt) {
            var p = bestFormat[prop];

            if (p !== undefined) {
              internalSlots[prop] = p;
            }
          }

          var pattern;
          var rangePatterns;

          if (internalSlots.hour !== undefined) {
            var hc = resolveHourCycle(internalSlots.hourCycle, dataLocaleData.hourCycle, hour12);
            internalSlots.hourCycle = hc;

            if (hc === 'h11' || hc === 'h12') {
              pattern = bestFormat.pattern12;
              rangePatterns = bestFormat.rangePatterns12;
            } else {
              pattern = bestFormat.pattern;
              rangePatterns = bestFormat.rangePatterns;
            }
          } else {
            // @ts-ignore
            internalSlots.hourCycle = undefined;
            pattern = bestFormat.pattern;
            rangePatterns = bestFormat.rangePatterns;
          }

          internalSlots.pattern = pattern;
          internalSlots.rangePatterns = rangePatterns;
          return dtf;
        }

        exports.InitializeDateTimeFormat = InitializeDateTimeFormat; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        ___esModule = module.exports.__esModule;
        _InitializeDateTimeFormat = module.exports.InitializeDateTimeFormat;
      }, () => ({
        '@formatjs/ecma402-abstract': _req,
        './BasicFormatMatcher': _req0,
        './BestFitFormatMatcher': _req1,
        './utils': _req2,
        './DateTimeStyleFormat': _req3,
        './ToDateTimeOptions': _req4,
        '@formatjs/intl-localematcher': _req5
      }));
    }
  };
});
//# sourceMappingURL=d3b1a188470f521af6720aec60b34702a1292d95.js.map
System.register(["__unresolved_0", "tslib", "@formatjs/ecma402-abstract", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5", "__unresolved_6", "__unresolved_7", "__unresolved_8", "__unresolved_9", "__unresolved_10"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _req0, _req1, _req2, _req3, _req4, _req5, _req6, _req7, _req8, _req9, _req10, _cjsExports, ___esModule, _DateTimeFormat, __cjsMetaURL;

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
    }, function (_unresolved_4) {
      _req3 = _unresolved_4.__cjsMetaURL;
    }, function (_unresolved_5) {
      _req4 = _unresolved_5.__cjsMetaURL;
    }, function (_unresolved_6) {
      _req5 = _unresolved_6.__cjsMetaURL;
    }, function (_unresolved_7) {
      _req6 = _unresolved_7.__cjsMetaURL;
    }, function (_unresolved_8) {
      _req7 = _unresolved_8.__cjsMetaURL;
    }, function (_unresolved_9) {
      _req8 = _unresolved_9.__cjsMetaURL;
    }, function (_unresolved_10) {
      _req9 = _unresolved_10.__cjsMetaURL;
    }, function (_unresolved_11) {
      _req10 = _unresolved_11.__cjsMetaURL;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.DateTimeFormat = void 0;

        var tslib_1 = require("tslib");

        var ecma402_abstract_1 = require("@formatjs/ecma402-abstract");

        var get_internal_slots_1 = (0, tslib_1.__importDefault)(require("./get_internal_slots"));
        var links_1 = (0, tslib_1.__importDefault)(require("./data/links"));

        var packer_1 = require("./packer");

        var FormatDateTime_1 = require("./abstract/FormatDateTime");

        var InitializeDateTimeFormat_1 = require("./abstract/InitializeDateTimeFormat");

        var utils_1 = require("./abstract/utils");

        var FormatDateTimeToParts_1 = require("./abstract/FormatDateTimeToParts");

        var FormatDateTimeRangeToParts_1 = require("./abstract/FormatDateTimeRangeToParts");

        var FormatDateTimeRange_1 = require("./abstract/FormatDateTimeRange");

        var skeleton_1 = require("./abstract/skeleton");

        var UPPERCASED_LINKS = Object.keys(links_1.default).reduce(function (all, l) {
          all[l.toUpperCase()] = links_1.default[l];
          return all;
        }, {});
        var RESOLVED_OPTIONS_KEYS = ['locale', 'calendar', 'numberingSystem', 'dateStyle', 'timeStyle', 'timeZone', 'hourCycle', 'weekday', 'era', 'year', 'month', 'day', 'hour', 'minute', 'second', 'timeZoneName'];
        var formatDescriptor = {
          enumerable: false,
          configurable: true,
          get: function get() {
            if (typeof this !== 'object' || !(0, ecma402_abstract_1.OrdinaryHasInstance)(exports.DateTimeFormat, this)) {
              throw TypeError('Intl.DateTimeFormat format property accessor called on incompatible receiver');
            }

            var internalSlots = (0, get_internal_slots_1.default)(this); // eslint-disable-next-line @typescript-eslint/no-this-alias

            var dtf = this;
            var boundFormat = internalSlots.boundFormat;

            if (boundFormat === undefined) {
              // https://tc39.es/proposal-unified-intl-numberformat/section11/numberformat_diff_out.html#sec-number-format-functions
              boundFormat = function boundFormat(date) {
                var x;

                if (date === undefined) {
                  x = Date.now();
                } else {
                  x = Number(date);
                }

                return (0, FormatDateTime_1.FormatDateTime)(dtf, x, {
                  getInternalSlots: get_internal_slots_1.default,
                  localeData: exports.DateTimeFormat.localeData,
                  tzData: exports.DateTimeFormat.tzData,
                  getDefaultTimeZone: exports.DateTimeFormat.getDefaultTimeZone
                });
              };

              try {
                // https://github.com/tc39/test262/blob/master/test/intl402/NumberFormat/prototype/format/format-function-name.js
                Object.defineProperty(boundFormat, 'name', {
                  configurable: true,
                  enumerable: false,
                  writable: false,
                  value: ''
                });
              } catch (e) {// In older browser (e.g Chrome 36 like polyfill.io)
                // TypeError: Cannot redefine property: name
              }

              internalSlots.boundFormat = boundFormat;
            }

            return boundFormat;
          }
        };

        try {
          // https://github.com/tc39/test262/blob/master/test/intl402/NumberFormat/prototype/format/name.js
          Object.defineProperty(formatDescriptor.get, 'name', {
            configurable: true,
            enumerable: false,
            writable: false,
            value: 'get format'
          });
        } catch (e) {// In older browser (e.g Chrome 36 like polyfill.io)
          // TypeError: Cannot redefine property: name
        }

        exports.DateTimeFormat = function (locales, options) {
          // Cannot use `new.target` bc of IE11 & TS transpiles it to something else
          if (!this || !(0, ecma402_abstract_1.OrdinaryHasInstance)(exports.DateTimeFormat, this)) {
            return new exports.DateTimeFormat(locales, options);
          }

          (0, InitializeDateTimeFormat_1.InitializeDateTimeFormat)(this, locales, options, {
            tzData: exports.DateTimeFormat.tzData,
            uppercaseLinks: UPPERCASED_LINKS,
            availableLocales: exports.DateTimeFormat.availableLocales,
            relevantExtensionKeys: exports.DateTimeFormat.relevantExtensionKeys,
            getDefaultLocale: exports.DateTimeFormat.getDefaultLocale,
            getDefaultTimeZone: exports.DateTimeFormat.getDefaultTimeZone,
            getInternalSlots: get_internal_slots_1.default,
            localeData: exports.DateTimeFormat.localeData
          });
          /** IMPL START */

          var internalSlots = (0, get_internal_slots_1.default)(this);
          var dataLocale = internalSlots.dataLocale;
          var dataLocaleData = exports.DateTimeFormat.localeData[dataLocale];
          (0, ecma402_abstract_1.invariant)(dataLocaleData !== undefined, "Cannot load locale-dependent data for ".concat(dataLocale, "."));
          /** IMPL END */
        }; // Static properties


        (0, ecma402_abstract_1.defineProperty)(exports.DateTimeFormat, 'supportedLocalesOf', {
          value: function supportedLocalesOf(locales, options) {
            return (0, ecma402_abstract_1.SupportedLocales)(exports.DateTimeFormat.availableLocales, (0, ecma402_abstract_1.CanonicalizeLocaleList)(locales), options);
          }
        });
        (0, ecma402_abstract_1.defineProperty)(exports.DateTimeFormat.prototype, 'resolvedOptions', {
          value: function resolvedOptions() {
            if (typeof this !== 'object' || !(0, ecma402_abstract_1.OrdinaryHasInstance)(exports.DateTimeFormat, this)) {
              throw TypeError('Method Intl.DateTimeFormat.prototype.resolvedOptions called on incompatible receiver');
            }

            var internalSlots = (0, get_internal_slots_1.default)(this);
            var ro = {};

            for (var _i = 0, RESOLVED_OPTIONS_KEYS_1 = RESOLVED_OPTIONS_KEYS; _i < RESOLVED_OPTIONS_KEYS_1.length; _i++) {
              var key = RESOLVED_OPTIONS_KEYS_1[_i];
              var value = internalSlots[key];

              if (key === 'hourCycle') {
                var hour12 = value === 'h11' || value === 'h12' ? true : value === 'h23' || value === 'h24' ? false : undefined;

                if (hour12 !== undefined) {
                  ro.hour12 = hour12;
                }
              }

              if (utils_1.DATE_TIME_PROPS.indexOf(key) > -1) {
                if (internalSlots.dateStyle !== undefined || internalSlots.timeStyle !== undefined) {
                  value = undefined;
                }
              }

              if (value !== undefined) {
                ro[key] = value;
              }
            }

            return ro;
          }
        });
        (0, ecma402_abstract_1.defineProperty)(exports.DateTimeFormat.prototype, 'formatToParts', {
          value: function formatToParts(date) {
            if (date === undefined) {
              date = Date.now();
            } else {
              date = (0, ecma402_abstract_1.ToNumber)(date);
            }

            return (0, FormatDateTimeToParts_1.FormatDateTimeToParts)(this, date, {
              getInternalSlots: get_internal_slots_1.default,
              localeData: exports.DateTimeFormat.localeData,
              tzData: exports.DateTimeFormat.tzData,
              getDefaultTimeZone: exports.DateTimeFormat.getDefaultTimeZone
            });
          }
        });
        (0, ecma402_abstract_1.defineProperty)(exports.DateTimeFormat.prototype, 'formatRangeToParts', {
          value: function formatRangeToParts(startDate, endDate) {
            var dtf = this;

            if (typeof dtf !== 'object') {
              throw new TypeError();
            }

            if (startDate === undefined || endDate === undefined) {
              throw new TypeError('startDate/endDate cannot be undefined');
            }

            var x = (0, ecma402_abstract_1.ToNumber)(startDate);
            var y = (0, ecma402_abstract_1.ToNumber)(endDate);
            return (0, FormatDateTimeRangeToParts_1.FormatDateTimeRangeToParts)(dtf, x, y, {
              getInternalSlots: get_internal_slots_1.default,
              localeData: exports.DateTimeFormat.localeData,
              tzData: exports.DateTimeFormat.tzData,
              getDefaultTimeZone: exports.DateTimeFormat.getDefaultTimeZone
            });
          }
        });
        (0, ecma402_abstract_1.defineProperty)(exports.DateTimeFormat.prototype, 'formatRange', {
          value: function formatRange(startDate, endDate) {
            var dtf = this;

            if (typeof dtf !== 'object') {
              throw new TypeError();
            }

            if (startDate === undefined || endDate === undefined) {
              throw new TypeError('startDate/endDate cannot be undefined');
            }

            var x = (0, ecma402_abstract_1.ToNumber)(startDate);
            var y = (0, ecma402_abstract_1.ToNumber)(endDate);
            return (0, FormatDateTimeRange_1.FormatDateTimeRange)(dtf, x, y, {
              getInternalSlots: get_internal_slots_1.default,
              localeData: exports.DateTimeFormat.localeData,
              tzData: exports.DateTimeFormat.tzData,
              getDefaultTimeZone: exports.DateTimeFormat.getDefaultTimeZone
            });
          }
        });
        var DEFAULT_TIMEZONE = 'UTC';

        exports.DateTimeFormat.__setDefaultTimeZone = function (timeZone) {
          if (timeZone !== undefined) {
            timeZone = String(timeZone);

            if (!(0, ecma402_abstract_1.IsValidTimeZoneName)(timeZone, {
              tzData: exports.DateTimeFormat.tzData,
              uppercaseLinks: UPPERCASED_LINKS
            })) {
              throw new RangeError('Invalid timeZoneName');
            }

            timeZone = (0, ecma402_abstract_1.CanonicalizeTimeZoneName)(timeZone, {
              tzData: exports.DateTimeFormat.tzData,
              uppercaseLinks: UPPERCASED_LINKS
            });
          } else {
            timeZone = DEFAULT_TIMEZONE;
          }

          exports.DateTimeFormat.__defaultTimeZone = timeZone;
        };

        exports.DateTimeFormat.relevantExtensionKeys = ['nu', 'ca', 'hc'];
        exports.DateTimeFormat.__defaultTimeZone = DEFAULT_TIMEZONE;

        exports.DateTimeFormat.getDefaultTimeZone = function () {
          return exports.DateTimeFormat.__defaultTimeZone;
        };

        exports.DateTimeFormat.__addLocaleData = function __addLocaleData() {
          var data = [];

          for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
          }

          var _loop_1 = function _loop_1(d, locale) {
            var dateFormat = d.dateFormat,
                timeFormat = d.timeFormat,
                dateTimeFormat = d.dateTimeFormat,
                formats = d.formats,
                intervalFormats = d.intervalFormats,
                rawData = (0, tslib_1.__rest)(d, ["dateFormat", "timeFormat", "dateTimeFormat", "formats", "intervalFormats"]);
            var processedData = (0, tslib_1.__assign)((0, tslib_1.__assign)({}, rawData), {
              dateFormat: {
                full: (0, skeleton_1.parseDateTimeSkeleton)(dateFormat.full),
                long: (0, skeleton_1.parseDateTimeSkeleton)(dateFormat.long),
                medium: (0, skeleton_1.parseDateTimeSkeleton)(dateFormat.medium),
                short: (0, skeleton_1.parseDateTimeSkeleton)(dateFormat.short)
              },
              timeFormat: {
                full: (0, skeleton_1.parseDateTimeSkeleton)(timeFormat.full),
                long: (0, skeleton_1.parseDateTimeSkeleton)(timeFormat.long),
                medium: (0, skeleton_1.parseDateTimeSkeleton)(timeFormat.medium),
                short: (0, skeleton_1.parseDateTimeSkeleton)(timeFormat.short)
              },
              dateTimeFormat: {
                full: (0, skeleton_1.parseDateTimeSkeleton)(dateTimeFormat.full).pattern,
                long: (0, skeleton_1.parseDateTimeSkeleton)(dateTimeFormat.long).pattern,
                medium: (0, skeleton_1.parseDateTimeSkeleton)(dateTimeFormat.medium).pattern,
                short: (0, skeleton_1.parseDateTimeSkeleton)(dateTimeFormat.short).pattern
              },
              formats: {}
            });

            var _loop_2 = function _loop_2(calendar) {
              processedData.formats[calendar] = Object.keys(formats[calendar]).map(function (skeleton) {
                return (0, skeleton_1.parseDateTimeSkeleton)(skeleton, formats[calendar][skeleton], intervalFormats[skeleton], intervalFormats.intervalFormatFallback);
              });
            };

            for (var calendar in formats) {
              _loop_2(calendar);
            }

            var minimizedLocale = new Intl.Locale(locale).minimize().toString();
            exports.DateTimeFormat.localeData[locale] = exports.DateTimeFormat.localeData[minimizedLocale] = processedData;
            exports.DateTimeFormat.availableLocales.add(locale);
            exports.DateTimeFormat.availableLocales.add(minimizedLocale);

            if (!exports.DateTimeFormat.__defaultLocale) {
              exports.DateTimeFormat.__defaultLocale = minimizedLocale;
            }
          };

          for (var _a = 0, data_1 = data; _a < data_1.length; _a++) {
            var _b = data_1[_a],
                d = _b.data,
                locale = _b.locale;

            _loop_1(d, locale);
          }
        };

        Object.defineProperty(exports.DateTimeFormat.prototype, 'format', formatDescriptor);
        exports.DateTimeFormat.__defaultLocale = '';
        exports.DateTimeFormat.localeData = {};
        exports.DateTimeFormat.availableLocales = new Set();

        exports.DateTimeFormat.getDefaultLocale = function () {
          return exports.DateTimeFormat.__defaultLocale;
        };

        exports.DateTimeFormat.polyfilled = true;
        exports.DateTimeFormat.tzData = {};

        exports.DateTimeFormat.__addTZData = function (d) {
          exports.DateTimeFormat.tzData = (0, packer_1.unpack)(d);
        };

        try {
          if (typeof Symbol !== 'undefined') {
            Object.defineProperty(exports.DateTimeFormat.prototype, Symbol.toStringTag, {
              value: 'Intl.DateTimeFormat',
              writable: false,
              enumerable: false,
              configurable: true
            });
          }

          Object.defineProperty(exports.DateTimeFormat.prototype.constructor, 'length', {
            value: 1,
            writable: false,
            enumerable: false,
            configurable: true
          });
        } catch (e) {// Meta fix so we're test262-compliant, not important
        } // #endregion ORIGINAL CODE


        _export("default", _cjsExports = module.exports);

        ___esModule = module.exports.__esModule;
        _DateTimeFormat = module.exports.DateTimeFormat;
      }, () => ({
        'tslib': _req,
        '@formatjs/ecma402-abstract': _req0,
        './get_internal_slots': _req1,
        './data/links': _req2,
        './packer': _req3,
        './abstract/FormatDateTime': _req4,
        './abstract/InitializeDateTimeFormat': _req5,
        './abstract/utils': _req6,
        './abstract/FormatDateTimeToParts': _req7,
        './abstract/FormatDateTimeRangeToParts': _req8,
        './abstract/FormatDateTimeRange': _req9,
        './abstract/skeleton': _req10
      }));
    }
  };
});
//# sourceMappingURL=ad6f35ccdbbfb5dd2a82be15822f2bf8ac2de453.js.map
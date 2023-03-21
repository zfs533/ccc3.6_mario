System.register(["__unresolved_0", "tslib", "@formatjs/ecma402-abstract", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _req0, _req1, _req2, _req3, _cjsExports, ___esModule, _NumberFormat, __cjsMetaURL;

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
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.NumberFormat = void 0;

        var tslib_1 = require("tslib");

        var ecma402_abstract_1 = require("@formatjs/ecma402-abstract");

        var currency_digits_generated_1 = require("./currency-digits.generated");

        var numbering_systems_generated_1 = require("./numbering-systems.generated"); // eslint-disable-next-line import/no-cycle


        var get_internal_slots_1 = (0, tslib_1.__importDefault)(require("./get_internal_slots"));
        var RESOLVED_OPTIONS_KEYS = ['locale', 'numberingSystem', 'style', 'currency', 'currencyDisplay', 'currencySign', 'unit', 'unitDisplay', 'minimumIntegerDigits', 'minimumFractionDigits', 'maximumFractionDigits', 'minimumSignificantDigits', 'maximumSignificantDigits', 'useGrouping', 'notation', 'compactDisplay', 'signDisplay'];
        /**
         * https://tc39.es/ecma402/#sec-intl-numberformat-constructor
         */

        exports.NumberFormat = function (locales, options) {
          // Cannot use `new.target` bc of IE11 & TS transpiles it to something else
          if (!this || !(0, ecma402_abstract_1.OrdinaryHasInstance)(exports.NumberFormat, this)) {
            return new exports.NumberFormat(locales, options);
          }

          (0, ecma402_abstract_1.InitializeNumberFormat)(this, locales, options, {
            getInternalSlots: get_internal_slots_1.default,
            localeData: exports.NumberFormat.localeData,
            availableLocales: exports.NumberFormat.availableLocales,
            getDefaultLocale: exports.NumberFormat.getDefaultLocale,
            currencyDigitsData: currency_digits_generated_1.currencyDigitsData,
            numberingSystemNames: numbering_systems_generated_1.numberingSystemNames
          });
          var internalSlots = (0, get_internal_slots_1.default)(this);
          var dataLocale = internalSlots.dataLocale;
          var dataLocaleData = exports.NumberFormat.localeData[dataLocale];
          (0, ecma402_abstract_1.invariant)(dataLocaleData !== undefined, "Cannot load locale-dependent data for ".concat(dataLocale, "."));
          internalSlots.pl = new Intl.PluralRules(dataLocale, {
            minimumFractionDigits: internalSlots.minimumFractionDigits,
            maximumFractionDigits: internalSlots.maximumFractionDigits,
            minimumIntegerDigits: internalSlots.minimumIntegerDigits,
            minimumSignificantDigits: internalSlots.minimumSignificantDigits,
            maximumSignificantDigits: internalSlots.maximumSignificantDigits
          });
          return this;
        };

        function formatToParts(x) {
          return (0, ecma402_abstract_1.FormatNumericToParts)(this, toNumeric(x), {
            getInternalSlots: get_internal_slots_1.default
          });
        }

        try {
          Object.defineProperty(formatToParts, 'name', {
            value: 'formatToParts',
            enumerable: false,
            writable: false,
            configurable: true
          });
        } catch (e) {// In older browser (e.g Chrome 36 like polyfill.io)
          // TypeError: Cannot redefine property: name
        }

        (0, ecma402_abstract_1.defineProperty)(exports.NumberFormat.prototype, 'formatToParts', {
          value: formatToParts
        });
        (0, ecma402_abstract_1.defineProperty)(exports.NumberFormat.prototype, 'resolvedOptions', {
          value: function resolvedOptions() {
            if (typeof this !== 'object' || !(0, ecma402_abstract_1.OrdinaryHasInstance)(exports.NumberFormat, this)) {
              throw TypeError('Method Intl.NumberFormat.prototype.resolvedOptions called on incompatible receiver');
            }

            var internalSlots = (0, get_internal_slots_1.default)(this);
            var ro = {};

            for (var _i = 0, RESOLVED_OPTIONS_KEYS_1 = RESOLVED_OPTIONS_KEYS; _i < RESOLVED_OPTIONS_KEYS_1.length; _i++) {
              var key = RESOLVED_OPTIONS_KEYS_1[_i];
              var value = internalSlots[key];

              if (value !== undefined) {
                ro[key] = value;
              }
            }

            return ro;
          }
        });
        var formatDescriptor = {
          enumerable: false,
          configurable: true,
          get: function () {
            if (typeof this !== 'object' || !(0, ecma402_abstract_1.OrdinaryHasInstance)(exports.NumberFormat, this)) {
              throw TypeError('Intl.NumberFormat format property accessor called on incompatible receiver');
            }

            var internalSlots = (0, get_internal_slots_1.default)(this); // eslint-disable-next-line @typescript-eslint/no-this-alias

            var numberFormat = this;
            var boundFormat = internalSlots.boundFormat;

            if (boundFormat === undefined) {
              // https://tc39.es/proposal-unified-intl-numberformat/section11/numberformat_diff_out.html#sec-number-format-functions
              boundFormat = function (value) {
                // TODO: check bigint
                var x = toNumeric(value);
                return numberFormat.formatToParts(x).map(function (x) {
                  return x.value;
                }).join('');
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

        Object.defineProperty(exports.NumberFormat.prototype, 'format', formatDescriptor); // Static properties

        (0, ecma402_abstract_1.defineProperty)(exports.NumberFormat, 'supportedLocalesOf', {
          value: function supportedLocalesOf(locales, options) {
            return (0, ecma402_abstract_1.SupportedLocales)(exports.NumberFormat.availableLocales, (0, ecma402_abstract_1.CanonicalizeLocaleList)(locales), options);
          }
        });

        exports.NumberFormat.__addLocaleData = function __addLocaleData() {
          var data = [];

          for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
          }

          for (var _a = 0, data_1 = data; _a < data_1.length; _a++) {
            var _b = data_1[_a],
                d = _b.data,
                locale = _b.locale;
            var minimizedLocale = new Intl.Locale(locale).minimize().toString();
            exports.NumberFormat.localeData[locale] = exports.NumberFormat.localeData[minimizedLocale] = d;
            exports.NumberFormat.availableLocales.add(minimizedLocale);
            exports.NumberFormat.availableLocales.add(locale);

            if (!exports.NumberFormat.__defaultLocale) {
              exports.NumberFormat.__defaultLocale = minimizedLocale;
            }
          }
        };

        exports.NumberFormat.__addUnitData = function __addUnitData(locale, unitsData) {
          var _a = exports.NumberFormat.localeData,
              _b = locale,
              existingData = _a[_b];

          if (!existingData) {
            throw new Error("Locale data for \"".concat(locale, "\" has not been loaded in NumberFormat. \nPlease __addLocaleData before adding additional unit data"));
          }

          for (var unit in unitsData.simple) {
            existingData.units.simple[unit] = unitsData.simple[unit];
          }

          for (var unit in unitsData.compound) {
            existingData.units.compound[unit] = unitsData.compound[unit];
          }
        };

        exports.NumberFormat.__defaultLocale = '';
        exports.NumberFormat.localeData = {};
        exports.NumberFormat.availableLocales = new Set();

        exports.NumberFormat.getDefaultLocale = function () {
          return exports.NumberFormat.__defaultLocale;
        };

        exports.NumberFormat.polyfilled = true;

        function toNumeric(val) {
          if (typeof val === 'bigint') {
            return val;
          }

          return (0, ecma402_abstract_1.ToNumber)(val);
        }

        try {
          // IE11 does not have Symbol
          if (typeof Symbol !== 'undefined') {
            Object.defineProperty(exports.NumberFormat.prototype, Symbol.toStringTag, {
              configurable: true,
              enumerable: false,
              writable: false,
              value: 'Intl.NumberFormat'
            });
          } // https://github.com/tc39/test262/blob/master/test/intl402/NumberFormat/length.js


          Object.defineProperty(exports.NumberFormat.prototype.constructor, 'length', {
            configurable: true,
            enumerable: false,
            writable: false,
            value: 0
          }); // https://github.com/tc39/test262/blob/master/test/intl402/NumberFormat/supportedLocalesOf/length.js

          Object.defineProperty(exports.NumberFormat.supportedLocalesOf, 'length', {
            configurable: true,
            enumerable: false,
            writable: false,
            value: 1
          });
          Object.defineProperty(exports.NumberFormat, 'prototype', {
            configurable: false,
            enumerable: false,
            writable: false,
            value: exports.NumberFormat.prototype
          });
        } catch (e) {// Meta fix so we're test262-compliant, not important
        } // #endregion ORIGINAL CODE


        _export("default", _cjsExports = module.exports);

        ___esModule = module.exports.__esModule;
        _NumberFormat = module.exports.NumberFormat;
      }, () => ({
        'tslib': _req,
        '@formatjs/ecma402-abstract': _req0,
        './currency-digits.generated': _req1,
        './numbering-systems.generated': _req2,
        './get_internal_slots': _req3
      }));
    }
  };
});
//# sourceMappingURL=85922f5c434bb3e52e4069e9bbd28a8020e936c0.js.map
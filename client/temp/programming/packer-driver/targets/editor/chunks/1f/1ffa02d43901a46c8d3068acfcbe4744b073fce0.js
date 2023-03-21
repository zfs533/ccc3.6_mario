System.register(["__unresolved_0", "tslib", "@formatjs/ecma402-abstract", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _req0, _req1, _req2, _req3, _cjsExports, ___esModule, _default, __cjsMetaURL;

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

        var tslib_1 = require("tslib");

        var ecma402_abstract_1 = require("@formatjs/ecma402-abstract");

        var InitializeRelativeTimeFormat_1 = require("./abstract/InitializeRelativeTimeFormat");

        var PartitionRelativeTimePattern_1 = require("./abstract/PartitionRelativeTimePattern");

        var get_internal_slots_1 = (0, tslib_1.__importDefault)(require("./get_internal_slots"));

        var RelativeTimeFormat =
        /** @class */
        function () {
          function RelativeTimeFormat(locales, options) {
            // test262/test/intl402/RelativeTimeFormat/constructor/constructor/newtarget-undefined.js
            // Cannot use `new.target` bc of IE11 & TS transpiles it to something else
            var newTarget = this && this instanceof RelativeTimeFormat ? this.constructor : void 0;

            if (!newTarget) {
              throw new TypeError("Intl.RelativeTimeFormat must be called with 'new'");
            }

            return (0, InitializeRelativeTimeFormat_1.InitializeRelativeTimeFormat)(this, locales, options, {
              getInternalSlots: get_internal_slots_1.default,
              availableLocales: RelativeTimeFormat.availableLocales,
              relevantExtensionKeys: RelativeTimeFormat.relevantExtensionKeys,
              localeData: RelativeTimeFormat.localeData,
              getDefaultLocale: RelativeTimeFormat.getDefaultLocale
            });
          }

          RelativeTimeFormat.prototype.format = function (value, unit) {
            if (typeof this !== 'object') {
              throw new TypeError('format was called on a non-object');
            }

            var internalSlots = (0, get_internal_slots_1.default)(this);

            if (!internalSlots.initializedRelativeTimeFormat) {
              throw new TypeError('format was called on a invalid context');
            }

            return (0, PartitionRelativeTimePattern_1.PartitionRelativeTimePattern)(this, Number(value), (0, ecma402_abstract_1.ToString)(unit), {
              getInternalSlots: get_internal_slots_1.default
            }).map(function (el) {
              return el.value;
            }).join('');
          };

          RelativeTimeFormat.prototype.formatToParts = function (value, unit) {
            if (typeof this !== 'object') {
              throw new TypeError('formatToParts was called on a non-object');
            }

            var internalSlots = (0, get_internal_slots_1.default)(this);

            if (!internalSlots.initializedRelativeTimeFormat) {
              throw new TypeError('formatToParts was called on a invalid context');
            }

            return (0, PartitionRelativeTimePattern_1.PartitionRelativeTimePattern)(this, Number(value), (0, ecma402_abstract_1.ToString)(unit), {
              getInternalSlots: get_internal_slots_1.default
            });
          };

          RelativeTimeFormat.prototype.resolvedOptions = function () {
            if (typeof this !== 'object') {
              throw new TypeError('resolvedOptions was called on a non-object');
            }

            var internalSlots = (0, get_internal_slots_1.default)(this);

            if (!internalSlots.initializedRelativeTimeFormat) {
              throw new TypeError('resolvedOptions was called on a invalid context');
            } // test262/test/intl402/RelativeTimeFormat/prototype/resolvedOptions/type.js


            return {
              locale: internalSlots.locale,
              style: internalSlots.style,
              numeric: internalSlots.numeric,
              numberingSystem: internalSlots.numberingSystem
            };
          };

          RelativeTimeFormat.supportedLocalesOf = function (locales, options) {
            return (0, ecma402_abstract_1.SupportedLocales)(RelativeTimeFormat.availableLocales, (0, ecma402_abstract_1.CanonicalizeLocaleList)(locales), options);
          };

          RelativeTimeFormat.__addLocaleData = function () {
            var data = [];

            for (var _i = 0; _i < arguments.length; _i++) {
              data[_i] = arguments[_i];
            }

            for (var _a = 0, data_1 = data; _a < data_1.length; _a++) {
              var _b = data_1[_a],
                  d = _b.data,
                  locale = _b.locale;
              var minimizedLocale = new Intl.Locale(locale).minimize().toString();
              RelativeTimeFormat.localeData[locale] = RelativeTimeFormat.localeData[minimizedLocale] = d;
              RelativeTimeFormat.availableLocales.add(minimizedLocale);
              RelativeTimeFormat.availableLocales.add(locale);

              if (!RelativeTimeFormat.__defaultLocale) {
                RelativeTimeFormat.__defaultLocale = minimizedLocale;
              }
            }
          };

          RelativeTimeFormat.getDefaultLocale = function () {
            return RelativeTimeFormat.__defaultLocale;
          };

          RelativeTimeFormat.localeData = {};
          RelativeTimeFormat.availableLocales = new Set();
          RelativeTimeFormat.__defaultLocale = '';
          RelativeTimeFormat.relevantExtensionKeys = ['nu'];
          RelativeTimeFormat.polyfilled = true;
          return RelativeTimeFormat;
        }();

        exports.default = RelativeTimeFormat;

        try {
          // IE11 does not have Symbol
          if (typeof Symbol !== 'undefined') {
            Object.defineProperty(RelativeTimeFormat.prototype, Symbol.toStringTag, {
              value: 'Intl.RelativeTimeFormat',
              writable: false,
              enumerable: false,
              configurable: true
            });
          } // https://github.com/tc39/test262/blob/master/test/intl402/RelativeTimeFormat/constructor/length.js


          Object.defineProperty(RelativeTimeFormat.prototype.constructor, 'length', {
            value: 0,
            writable: false,
            enumerable: false,
            configurable: true
          }); // https://github.com/tc39/test262/blob/master/test/intl402/RelativeTimeFormat/constructor/supportedLocalesOf/length.js

          Object.defineProperty(RelativeTimeFormat.supportedLocalesOf, 'length', {
            value: 1,
            writable: false,
            enumerable: false,
            configurable: true
          });
        } catch (e) {// Meta fix so we're test262-compliant, not important
        } // #endregion ORIGINAL CODE


        _export("default", _cjsExports = module.exports);

        ___esModule = module.exports.__esModule;
        _default = module.exports.default;
      }, () => ({
        'tslib': _req,
        '@formatjs/ecma402-abstract': _req0,
        './abstract/InitializeRelativeTimeFormat': _req1,
        './abstract/PartitionRelativeTimePattern': _req2,
        './get_internal_slots': _req3
      }));
    }
  };
});
//# sourceMappingURL=1ffa02d43901a46c8d3068acfcbe4744b073fce0.js.map
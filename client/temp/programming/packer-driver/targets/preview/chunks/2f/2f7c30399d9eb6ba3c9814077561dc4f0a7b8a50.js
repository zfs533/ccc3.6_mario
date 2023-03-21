System.register(["__unresolved_0", "__unresolved_1", "__unresolved_2", "@formatjs/intl-localematcher", "__unresolved_3", "__unresolved_4", "__unresolved_5", "__unresolved_6", "__unresolved_7"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _req0, _req1, _req2, _req3, _req4, _req5, _req6, _cjsExports, ___esModule, _InitializeNumberFormat, __cjsMetaURL;

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _cjsLoader = _unresolved_.default;
    }, function (_unresolved_2) {
      _req = _unresolved_2.__cjsMetaURL;
    }, function (_unresolved_3) {
      _req0 = _unresolved_3.__cjsMetaURL;
    }, function (_formatjsIntlLocalematcher) {
      _req1 = _formatjsIntlLocalematcher.__cjsMetaURL;
    }, function (_unresolved_4) {
      _req2 = _unresolved_4.__cjsMetaURL;
    }, function (_unresolved_5) {
      _req3 = _unresolved_5.__cjsMetaURL;
    }, function (_unresolved_6) {
      _req4 = _unresolved_6.__cjsMetaURL;
    }, function (_unresolved_7) {
      _req5 = _unresolved_7.__cjsMetaURL;
    }, function (_unresolved_8) {
      _req6 = _unresolved_8.__cjsMetaURL;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.InitializeNumberFormat = void 0;

        var CanonicalizeLocaleList_1 = require("../CanonicalizeLocaleList");

        var GetOption_1 = require("../GetOption");

        var intl_localematcher_1 = require("@formatjs/intl-localematcher");

        var SetNumberFormatUnitOptions_1 = require("./SetNumberFormatUnitOptions");

        var CurrencyDigits_1 = require("./CurrencyDigits");

        var SetNumberFormatDigitOptions_1 = require("./SetNumberFormatDigitOptions");

        var utils_1 = require("../utils");

        var CoerceOptionsToObject_1 = require("../CoerceOptionsToObject");
        /**
         * https://tc39.es/ecma402/#sec-initializenumberformat
         */


        function InitializeNumberFormat(nf, locales, opts, _a) {
          var getInternalSlots = _a.getInternalSlots,
              localeData = _a.localeData,
              availableLocales = _a.availableLocales,
              numberingSystemNames = _a.numberingSystemNames,
              getDefaultLocale = _a.getDefaultLocale,
              currencyDigitsData = _a.currencyDigitsData; // @ts-ignore

          var requestedLocales = (0, CanonicalizeLocaleList_1.CanonicalizeLocaleList)(locales);
          var options = (0, CoerceOptionsToObject_1.CoerceOptionsToObject)(opts);
          var opt = Object.create(null);
          var matcher = (0, GetOption_1.GetOption)(options, 'localeMatcher', 'string', ['lookup', 'best fit'], 'best fit');
          opt.localeMatcher = matcher;
          var numberingSystem = (0, GetOption_1.GetOption)(options, 'numberingSystem', 'string', undefined, undefined);

          if (numberingSystem !== undefined && numberingSystemNames.indexOf(numberingSystem) < 0) {
            // 8.a. If numberingSystem does not match the Unicode Locale Identifier type nonterminal,
            // throw a RangeError exception.
            throw RangeError("Invalid numberingSystems: ".concat(numberingSystem));
          }

          opt.nu = numberingSystem;
          var r = (0, intl_localematcher_1.ResolveLocale)(availableLocales, requestedLocales, opt, // [[RelevantExtensionKeys]] slot, which is a constant
          ['nu'], localeData, getDefaultLocale);
          var dataLocaleData = localeData[r.dataLocale];
          (0, utils_1.invariant)(!!dataLocaleData, "Missing locale data for ".concat(r.dataLocale));
          var internalSlots = getInternalSlots(nf);
          internalSlots.locale = r.locale;
          internalSlots.dataLocale = r.dataLocale;
          internalSlots.numberingSystem = r.nu;
          internalSlots.dataLocaleData = dataLocaleData;
          (0, SetNumberFormatUnitOptions_1.SetNumberFormatUnitOptions)(nf, options, {
            getInternalSlots: getInternalSlots
          });
          var style = internalSlots.style;
          var mnfdDefault;
          var mxfdDefault;

          if (style === 'currency') {
            var currency = internalSlots.currency;
            var cDigits = (0, CurrencyDigits_1.CurrencyDigits)(currency, {
              currencyDigitsData: currencyDigitsData
            });
            mnfdDefault = cDigits;
            mxfdDefault = cDigits;
          } else {
            mnfdDefault = 0;
            mxfdDefault = style === 'percent' ? 0 : 3;
          }

          var notation = (0, GetOption_1.GetOption)(options, 'notation', 'string', ['standard', 'scientific', 'engineering', 'compact'], 'standard');
          internalSlots.notation = notation;
          (0, SetNumberFormatDigitOptions_1.SetNumberFormatDigitOptions)(internalSlots, options, mnfdDefault, mxfdDefault, notation);
          var compactDisplay = (0, GetOption_1.GetOption)(options, 'compactDisplay', 'string', ['short', 'long'], 'short');

          if (notation === 'compact') {
            internalSlots.compactDisplay = compactDisplay;
          }

          var useGrouping = (0, GetOption_1.GetOption)(options, 'useGrouping', 'boolean', undefined, true);
          internalSlots.useGrouping = useGrouping;
          var signDisplay = (0, GetOption_1.GetOption)(options, 'signDisplay', 'string', ['auto', 'never', 'always', 'exceptZero'], 'auto');
          internalSlots.signDisplay = signDisplay;
          return nf;
        }

        exports.InitializeNumberFormat = InitializeNumberFormat; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        ___esModule = module.exports.__esModule;
        _InitializeNumberFormat = module.exports.InitializeNumberFormat;
      }, () => ({
        '../CanonicalizeLocaleList': _req,
        '../GetOption': _req0,
        '@formatjs/intl-localematcher': _req1,
        './SetNumberFormatUnitOptions': _req2,
        './CurrencyDigits': _req3,
        './SetNumberFormatDigitOptions': _req4,
        '../utils': _req5,
        '../CoerceOptionsToObject': _req6
      }));
    }
  };
});
//# sourceMappingURL=2f7c30399d9eb6ba3c9814077561dc4f0a7b8a50.js.map
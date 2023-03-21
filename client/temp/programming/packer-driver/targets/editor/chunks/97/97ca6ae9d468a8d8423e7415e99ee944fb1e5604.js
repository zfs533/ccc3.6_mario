System.register(["__unresolved_0", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _req0, _req1, _cjsExports, ___esModule, _SetNumberFormatUnitOptions, __cjsMetaURL;

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _cjsLoader = _unresolved_.default;
    }, function (_unresolved_2) {
      _req = _unresolved_2.__cjsMetaURL;
    }, function (_unresolved_3) {
      _req0 = _unresolved_3.__cjsMetaURL;
    }, function (_unresolved_4) {
      _req1 = _unresolved_4.__cjsMetaURL;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.SetNumberFormatUnitOptions = void 0;

        var GetOption_1 = require("../GetOption");

        var IsWellFormedCurrencyCode_1 = require("../IsWellFormedCurrencyCode");

        var IsWellFormedUnitIdentifier_1 = require("../IsWellFormedUnitIdentifier");
        /**
         * https://tc39.es/ecma402/#sec-setnumberformatunitoptions
         */


        function SetNumberFormatUnitOptions(nf, options, _a) {
          if (options === void 0) {
            options = Object.create(null);
          }

          var getInternalSlots = _a.getInternalSlots;
          var internalSlots = getInternalSlots(nf);
          var style = (0, GetOption_1.GetOption)(options, 'style', 'string', ['decimal', 'percent', 'currency', 'unit'], 'decimal');
          internalSlots.style = style;
          var currency = (0, GetOption_1.GetOption)(options, 'currency', 'string', undefined, undefined);

          if (currency !== undefined && !(0, IsWellFormedCurrencyCode_1.IsWellFormedCurrencyCode)(currency)) {
            throw RangeError('Malformed currency code');
          }

          if (style === 'currency' && currency === undefined) {
            throw TypeError('currency cannot be undefined');
          }

          var currencyDisplay = (0, GetOption_1.GetOption)(options, 'currencyDisplay', 'string', ['code', 'symbol', 'narrowSymbol', 'name'], 'symbol');
          var currencySign = (0, GetOption_1.GetOption)(options, 'currencySign', 'string', ['standard', 'accounting'], 'standard');
          var unit = (0, GetOption_1.GetOption)(options, 'unit', 'string', undefined, undefined);

          if (unit !== undefined && !(0, IsWellFormedUnitIdentifier_1.IsWellFormedUnitIdentifier)(unit)) {
            throw RangeError('Invalid unit argument for Intl.NumberFormat()');
          }

          if (style === 'unit' && unit === undefined) {
            throw TypeError('unit cannot be undefined');
          }

          var unitDisplay = (0, GetOption_1.GetOption)(options, 'unitDisplay', 'string', ['short', 'narrow', 'long'], 'short');

          if (style === 'currency') {
            internalSlots.currency = currency.toUpperCase();
            internalSlots.currencyDisplay = currencyDisplay;
            internalSlots.currencySign = currencySign;
          }

          if (style === 'unit') {
            internalSlots.unit = unit;
            internalSlots.unitDisplay = unitDisplay;
          }
        }

        exports.SetNumberFormatUnitOptions = SetNumberFormatUnitOptions; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        ___esModule = module.exports.__esModule;
        _SetNumberFormatUnitOptions = module.exports.SetNumberFormatUnitOptions;
      }, () => ({
        '../GetOption': _req,
        '../IsWellFormedCurrencyCode': _req0,
        '../IsWellFormedUnitIdentifier': _req1
      }));
    }
  };
});
//# sourceMappingURL=97ca6ae9d468a8d8423e7415e99ee944fb1e5604.js.map
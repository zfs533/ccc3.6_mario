System.register(["__unresolved_0"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _cjsExports, ___esModule, _ComputeExponentForMagnitude, __cjsMetaURL;

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _cjsLoader = _unresolved_.default;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.ComputeExponentForMagnitude = void 0;
        /**
         * The abstract operation ComputeExponentForMagnitude computes an exponent by which to scale a
         * number of the given magnitude (power of ten of the most significant digit) according to the
         * locale and the desired notation (scientific, engineering, or compact).
         */

        function ComputeExponentForMagnitude(numberFormat, magnitude, _a) {
          var getInternalSlots = _a.getInternalSlots;
          var internalSlots = getInternalSlots(numberFormat);
          var notation = internalSlots.notation,
              dataLocaleData = internalSlots.dataLocaleData,
              numberingSystem = internalSlots.numberingSystem;

          switch (notation) {
            case 'standard':
              return 0;

            case 'scientific':
              return magnitude;

            case 'engineering':
              return Math.floor(magnitude / 3) * 3;

            default:
              {
                // Let exponent be an implementation- and locale-dependent (ILD) integer by which to scale a
                // number of the given magnitude in compact notation for the current locale.
                var compactDisplay = internalSlots.compactDisplay,
                    style = internalSlots.style,
                    currencyDisplay = internalSlots.currencyDisplay;
                var thresholdMap = void 0;

                if (style === 'currency' && currencyDisplay !== 'name') {
                  var currency = dataLocaleData.numbers.currency[numberingSystem] || dataLocaleData.numbers.currency[dataLocaleData.numbers.nu[0]];
                  thresholdMap = currency.short;
                } else {
                  var decimal = dataLocaleData.numbers.decimal[numberingSystem] || dataLocaleData.numbers.decimal[dataLocaleData.numbers.nu[0]];
                  thresholdMap = compactDisplay === 'long' ? decimal.long : decimal.short;
                }

                if (!thresholdMap) {
                  return 0;
                }

                var num = String(Math.pow(10, magnitude));
                var thresholds = Object.keys(thresholdMap); // TODO: this can be pre-processed

                if (num < thresholds[0]) {
                  return 0;
                }

                if (num > thresholds[thresholds.length - 1]) {
                  return thresholds[thresholds.length - 1].length - 1;
                }

                var i = thresholds.indexOf(num);

                if (i === -1) {
                  return 0;
                } // See https://unicode.org/reports/tr35/tr35-numbers.html#Compact_Number_Formats
                // Special handling if the pattern is precisely `0`.


                var magnitudeKey = thresholds[i]; // TODO: do we need to handle plural here?

                var compactPattern = thresholdMap[magnitudeKey].other;

                if (compactPattern === '0') {
                  return 0;
                } // Example: in zh-TW, `10000000` maps to `0000萬`. So we need to return 8 - 4 = 4 here.


                return magnitudeKey.length - thresholdMap[magnitudeKey].other.match(/0+/)[0].length;
              }
          }
        }

        exports.ComputeExponentForMagnitude = ComputeExponentForMagnitude; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        ___esModule = module.exports.__esModule;
        _ComputeExponentForMagnitude = module.exports.ComputeExponentForMagnitude;
      }, {});
    }
  };
});
//# sourceMappingURL=abc8d1665189d6dbc1eb036758a437809f878291.js.map
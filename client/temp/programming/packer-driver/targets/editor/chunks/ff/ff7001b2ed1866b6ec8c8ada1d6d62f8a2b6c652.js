System.register(["__unresolved_0", "tslib", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _req0, _req1, _req2, _req3, _cjsExports, ___esModule, _PartitionNumberPattern, __cjsMetaURL;

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _cjsLoader = _unresolved_.default;
    }, function (_tslib) {
      _req = _tslib.__cjsMetaURL;
    }, function (_unresolved_2) {
      _req0 = _unresolved_2.__cjsMetaURL;
    }, function (_unresolved_3) {
      _req1 = _unresolved_3.__cjsMetaURL;
    }, function (_unresolved_4) {
      _req2 = _unresolved_4.__cjsMetaURL;
    }, function (_unresolved_5) {
      _req3 = _unresolved_5.__cjsMetaURL;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.PartitionNumberPattern = void 0;

        var tslib_1 = require("tslib");

        var FormatNumericToString_1 = require("./FormatNumericToString");

        var _262_1 = require("../262");

        var ComputeExponent_1 = require("./ComputeExponent");

        var format_to_parts_1 = (0, tslib_1.__importDefault)(require("./format_to_parts"));
        /**
         * https://tc39.es/ecma402/#sec-formatnumberstring
         */

        function PartitionNumberPattern(numberFormat, x, _a) {
          var _b;

          var getInternalSlots = _a.getInternalSlots;
          var internalSlots = getInternalSlots(numberFormat);
          var pl = internalSlots.pl,
              dataLocaleData = internalSlots.dataLocaleData,
              numberingSystem = internalSlots.numberingSystem;
          var symbols = dataLocaleData.numbers.symbols[numberingSystem] || dataLocaleData.numbers.symbols[dataLocaleData.numbers.nu[0]];
          var magnitude = 0;
          var exponent = 0;
          var n;

          if (isNaN(x)) {
            n = symbols.nan;
          } else if (!isFinite(x)) {
            n = symbols.infinity;
          } else {
            if (internalSlots.style === 'percent') {
              x *= 100;
            }

            ;
            _b = (0, ComputeExponent_1.ComputeExponent)(numberFormat, x, {
              getInternalSlots: getInternalSlots
            }), exponent = _b[0], magnitude = _b[1]; // Preserve more precision by doing multiplication when exponent is negative.

            x = exponent < 0 ? x * Math.pow(10, -exponent) : x / Math.pow(10, exponent);
            var formatNumberResult = (0, FormatNumericToString_1.FormatNumericToString)(internalSlots, x);
            n = formatNumberResult.formattedString;
            x = formatNumberResult.roundedNumber;
          } // Based on https://tc39.es/ecma402/#sec-getnumberformatpattern
          // We need to do this before `x` is rounded.


          var sign;
          var signDisplay = internalSlots.signDisplay;

          switch (signDisplay) {
            case 'never':
              sign = 0;
              break;

            case 'auto':
              if ((0, _262_1.SameValue)(x, 0) || x > 0 || isNaN(x)) {
                sign = 0;
              } else {
                sign = -1;
              }

              break;

            case 'always':
              if ((0, _262_1.SameValue)(x, 0) || x > 0 || isNaN(x)) {
                sign = 1;
              } else {
                sign = -1;
              }

              break;

            default:
              // x === 0 -> x is 0 or x is -0
              if (x === 0 || isNaN(x)) {
                sign = 0;
              } else if (x > 0) {
                sign = 1;
              } else {
                sign = -1;
              }

          }

          return (0, format_to_parts_1.default)({
            roundedNumber: x,
            formattedString: n,
            exponent: exponent,
            magnitude: magnitude,
            sign: sign
          }, internalSlots.dataLocaleData, pl, internalSlots);
        }

        exports.PartitionNumberPattern = PartitionNumberPattern; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        ___esModule = module.exports.__esModule;
        _PartitionNumberPattern = module.exports.PartitionNumberPattern;
      }, () => ({
        'tslib': _req,
        './FormatNumericToString': _req0,
        '../262': _req1,
        './ComputeExponent': _req2,
        './format_to_parts': _req3
      }));
    }
  };
});
//# sourceMappingURL=ff7001b2ed1866b6ec8c8ada1d6d62f8a2b6c652.js.map
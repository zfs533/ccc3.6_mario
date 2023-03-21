System.register(["__unresolved_0", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _cjsExports, ___esModule, _ToRawPrecision, __cjsMetaURL;

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _cjsLoader = _unresolved_.default;
    }, function (_unresolved_2) {
      _req = _unresolved_2.__cjsMetaURL;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.ToRawPrecision = void 0;

        var utils_1 = require("../utils");

        function ToRawPrecision(x, minPrecision, maxPrecision) {
          var p = maxPrecision;
          var m;
          var e;
          var xFinal;

          if (x === 0) {
            m = (0, utils_1.repeat)('0', p);
            e = 0;
            xFinal = 0;
          } else {
            var xToString = x.toString(); // If xToString is formatted as scientific notation, the number is either very small or very
            // large. If the precision of the formatted string is lower that requested max precision, we
            // should still infer them from the formatted string, otherwise the formatted result might have
            // precision loss (e.g. 1e41 will not have 0 in every trailing digits).

            var xToStringExponentIndex = xToString.indexOf('e');

            var _a = xToString.split('e'),
                xToStringMantissa = _a[0],
                xToStringExponent = _a[1];

            var xToStringMantissaWithoutDecimalPoint = xToStringMantissa.replace('.', '');

            if (xToStringExponentIndex >= 0 && xToStringMantissaWithoutDecimalPoint.length <= p) {
              e = +xToStringExponent;
              m = xToStringMantissaWithoutDecimalPoint + (0, utils_1.repeat)('0', p - xToStringMantissaWithoutDecimalPoint.length);
              xFinal = x;
            } else {
              e = (0, utils_1.getMagnitude)(x);
              var decimalPlaceOffset = e - p + 1; // n is the integer containing the required precision digits. To derive the formatted string,
              // we will adjust its decimal place in the logic below.

              var n = Math.round(adjustDecimalPlace(x, decimalPlaceOffset)); // The rounding caused the change of magnitude, so we should increment `e` by 1.

              if (adjustDecimalPlace(n, p - 1) >= 10) {
                e = e + 1; // Divide n by 10 to swallow one precision.

                n = Math.floor(n / 10);
              }

              m = n.toString(); // Equivalent of n * 10 ** (e - p + 1)

              xFinal = adjustDecimalPlace(n, p - 1 - e);
            }
          }

          var int;

          if (e >= p - 1) {
            m = m + (0, utils_1.repeat)('0', e - p + 1);
            int = e + 1;
          } else if (e >= 0) {
            m = "".concat(m.slice(0, e + 1), ".").concat(m.slice(e + 1));
            int = e + 1;
          } else {
            m = "0.".concat((0, utils_1.repeat)('0', -e - 1)).concat(m);
            int = 1;
          }

          if (m.indexOf('.') >= 0 && maxPrecision > minPrecision) {
            var cut = maxPrecision - minPrecision;

            while (cut > 0 && m[m.length - 1] === '0') {
              m = m.slice(0, -1);
              cut--;
            }

            if (m[m.length - 1] === '.') {
              m = m.slice(0, -1);
            }
          }

          return {
            formattedString: m,
            roundedNumber: xFinal,
            integerDigitsCount: int
          }; // x / (10 ** magnitude), but try to preserve as much floating point precision as possible.

          function adjustDecimalPlace(x, magnitude) {
            return magnitude < 0 ? x * Math.pow(10, -magnitude) : x / Math.pow(10, magnitude);
          }
        }

        exports.ToRawPrecision = ToRawPrecision; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        ___esModule = module.exports.__esModule;
        _ToRawPrecision = module.exports.ToRawPrecision;
      }, () => ({
        '../utils': _req
      }));
    }
  };
});
//# sourceMappingURL=dd38b167ec837525482372e5a21d965da60fbc1a.js.map
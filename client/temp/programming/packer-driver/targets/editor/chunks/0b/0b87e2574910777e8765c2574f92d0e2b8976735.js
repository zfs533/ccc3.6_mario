System.register(["__unresolved_0", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _cjsExports, ___esModule, _ToRawFixed, __cjsMetaURL;

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
        exports.ToRawFixed = void 0;

        var utils_1 = require("../utils");
        /**
         * TODO: dedup with intl-pluralrules and support BigInt
         * https://tc39.es/ecma402/#sec-torawfixed
         * @param x a finite non-negative Number or BigInt
         * @param minFraction and integer between 0 and 20
         * @param maxFraction and integer between 0 and 20
         */


        function ToRawFixed(x, minFraction, maxFraction) {
          var f = maxFraction;
          var n = Math.round(x * Math.pow(10, f));
          var xFinal = n / Math.pow(10, f); // n is a positive integer, but it is possible to be greater than 1e21.
          // In such case we will go the slow path.
          // See also: https://tc39.es/ecma262/#sec-numeric-types-number-tostring

          var m;

          if (n < 1e21) {
            m = n.toString();
          } else {
            m = n.toString();

            var _a = m.split('e'),
                mantissa = _a[0],
                exponent = _a[1];

            m = mantissa.replace('.', '');
            m = m + (0, utils_1.repeat)('0', Math.max(+exponent - m.length + 1, 0));
          }

          var int;

          if (f !== 0) {
            var k = m.length;

            if (k <= f) {
              var z = (0, utils_1.repeat)('0', f + 1 - k);
              m = z + m;
              k = f + 1;
            }

            var a = m.slice(0, k - f);
            var b = m.slice(k - f);
            m = "".concat(a, ".").concat(b);
            int = a.length;
          } else {
            int = m.length;
          }

          var cut = maxFraction - minFraction;

          while (cut > 0 && m[m.length - 1] === '0') {
            m = m.slice(0, -1);
            cut--;
          }

          if (m[m.length - 1] === '.') {
            m = m.slice(0, -1);
          }

          return {
            formattedString: m,
            roundedNumber: xFinal,
            integerDigitsCount: int
          };
        }

        exports.ToRawFixed = ToRawFixed; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        ___esModule = module.exports.__esModule;
        _ToRawFixed = module.exports.ToRawFixed;
      }, () => ({
        '../utils': _req
      }));
    }
  };
});
//# sourceMappingURL=0b87e2574910777e8765c2574f92d0e2b8976735.js.map
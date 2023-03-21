System.register(["__unresolved_0", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _req0, _req1, _req2, _cjsExports, ___esModule, _FormatNumericToString, __cjsMetaURL;

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
    }, function (_unresolved_5) {
      _req2 = _unresolved_5.__cjsMetaURL;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.FormatNumericToString = void 0;

        var _262_1 = require("../262");

        var ToRawPrecision_1 = require("./ToRawPrecision");

        var utils_1 = require("../utils");

        var ToRawFixed_1 = require("./ToRawFixed");
        /**
         * https://tc39.es/ecma402/#sec-formatnumberstring
         */


        function FormatNumericToString(intlObject, x) {
          var isNegative = x < 0 || (0, _262_1.SameValue)(x, -0);

          if (isNegative) {
            x = -x;
          }

          var result;
          var rourndingType = intlObject.roundingType;

          switch (rourndingType) {
            case 'significantDigits':
              result = (0, ToRawPrecision_1.ToRawPrecision)(x, intlObject.minimumSignificantDigits, intlObject.maximumSignificantDigits);
              break;

            case 'fractionDigits':
              result = (0, ToRawFixed_1.ToRawFixed)(x, intlObject.minimumFractionDigits, intlObject.maximumFractionDigits);
              break;

            default:
              result = (0, ToRawPrecision_1.ToRawPrecision)(x, 1, 2);

              if (result.integerDigitsCount > 1) {
                result = (0, ToRawFixed_1.ToRawFixed)(x, 0, 0);
              }

              break;
          }

          x = result.roundedNumber;
          var string = result.formattedString;
          var int = result.integerDigitsCount;
          var minInteger = intlObject.minimumIntegerDigits;

          if (int < minInteger) {
            var forwardZeros = (0, utils_1.repeat)('0', minInteger - int);
            string = forwardZeros + string;
          }

          if (isNegative) {
            x = -x;
          }

          return {
            roundedNumber: x,
            formattedString: string
          };
        }

        exports.FormatNumericToString = FormatNumericToString; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        ___esModule = module.exports.__esModule;
        _FormatNumericToString = module.exports.FormatNumericToString;
      }, () => ({
        '../262': _req,
        './ToRawPrecision': _req0,
        '../utils': _req1,
        './ToRawFixed': _req2
      }));
    }
  };
});
//# sourceMappingURL=015436a2bd2c5bd5e38bf659aa1a0d35ba511d9b.js.map
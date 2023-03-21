System.register(["__unresolved_0", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _req0, _req1, _cjsExports, ___esModule, _ComputeExponent, __cjsMetaURL;

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
        exports.ComputeExponent = void 0;

        var utils_1 = require("../utils");

        var ComputeExponentForMagnitude_1 = require("./ComputeExponentForMagnitude");

        var FormatNumericToString_1 = require("./FormatNumericToString");
        /**
         * The abstract operation ComputeExponent computes an exponent (power of ten) by which to scale x
         * according to the number formatting settings. It handles cases such as 999 rounding up to 1000,
         * requiring a different exponent.
         *
         * NOT IN SPEC: it returns [exponent, magnitude].
         */


        function ComputeExponent(numberFormat, x, _a) {
          var getInternalSlots = _a.getInternalSlots;

          if (x === 0) {
            return [0, 0];
          }

          if (x < 0) {
            x = -x;
          }

          var magnitude = (0, utils_1.getMagnitude)(x);
          var exponent = (0, ComputeExponentForMagnitude_1.ComputeExponentForMagnitude)(numberFormat, magnitude, {
            getInternalSlots: getInternalSlots
          }); // Preserve more precision by doing multiplication when exponent is negative.

          x = exponent < 0 ? x * Math.pow(10, -exponent) : x / Math.pow(10, exponent);
          var formatNumberResult = (0, FormatNumericToString_1.FormatNumericToString)(getInternalSlots(numberFormat), x);

          if (formatNumberResult.roundedNumber === 0) {
            return [exponent, magnitude];
          }

          var newMagnitude = (0, utils_1.getMagnitude)(formatNumberResult.roundedNumber);

          if (newMagnitude === magnitude - exponent) {
            return [exponent, magnitude];
          }

          return [(0, ComputeExponentForMagnitude_1.ComputeExponentForMagnitude)(numberFormat, magnitude + 1, {
            getInternalSlots: getInternalSlots
          }), magnitude + 1];
        }

        exports.ComputeExponent = ComputeExponent; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        ___esModule = module.exports.__esModule;
        _ComputeExponent = module.exports.ComputeExponent;
      }, () => ({
        '../utils': _req,
        './ComputeExponentForMagnitude': _req0,
        './FormatNumericToString': _req1
      }));
    }
  };
});
//# sourceMappingURL=7fac4939ef810e2e0500f01b8eb7eb4ca66062bc.js.map
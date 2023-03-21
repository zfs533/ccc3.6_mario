System.register(["__unresolved_0", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _req0, _cjsExports, ___esModule, _SetNumberFormatDigitOptions, __cjsMetaURL;

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _cjsLoader = _unresolved_.default;
    }, function (_unresolved_2) {
      _req = _unresolved_2.__cjsMetaURL;
    }, function (_unresolved_3) {
      _req0 = _unresolved_3.__cjsMetaURL;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.SetNumberFormatDigitOptions = void 0;

        var GetNumberOption_1 = require("../GetNumberOption");

        var DefaultNumberOption_1 = require("../DefaultNumberOption");
        /**
         * https://tc39.es/ecma402/#sec-setnfdigitoptions
         */


        function SetNumberFormatDigitOptions(internalSlots, opts, mnfdDefault, mxfdDefault, notation) {
          var mnid = (0, GetNumberOption_1.GetNumberOption)(opts, 'minimumIntegerDigits', 1, 21, 1);
          var mnfd = opts.minimumFractionDigits;
          var mxfd = opts.maximumFractionDigits;
          var mnsd = opts.minimumSignificantDigits;
          var mxsd = opts.maximumSignificantDigits;
          internalSlots.minimumIntegerDigits = mnid;

          if (mnsd !== undefined || mxsd !== undefined) {
            internalSlots.roundingType = 'significantDigits';
            mnsd = (0, DefaultNumberOption_1.DefaultNumberOption)(mnsd, 1, 21, 1);
            mxsd = (0, DefaultNumberOption_1.DefaultNumberOption)(mxsd, mnsd, 21, 21);
            internalSlots.minimumSignificantDigits = mnsd;
            internalSlots.maximumSignificantDigits = mxsd;
          } else if (mnfd !== undefined || mxfd !== undefined) {
            internalSlots.roundingType = 'fractionDigits';
            mnfd = (0, DefaultNumberOption_1.DefaultNumberOption)(mnfd, 0, 20, mnfdDefault);
            var mxfdActualDefault = Math.max(mnfd, mxfdDefault);
            mxfd = (0, DefaultNumberOption_1.DefaultNumberOption)(mxfd, mnfd, 20, mxfdActualDefault);
            internalSlots.minimumFractionDigits = mnfd;
            internalSlots.maximumFractionDigits = mxfd;
          } else if (notation === 'compact') {
            internalSlots.roundingType = 'compactRounding';
          } else {
            internalSlots.roundingType = 'fractionDigits';
            internalSlots.minimumFractionDigits = mnfdDefault;
            internalSlots.maximumFractionDigits = mxfdDefault;
          }
        }

        exports.SetNumberFormatDigitOptions = SetNumberFormatDigitOptions; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        ___esModule = module.exports.__esModule;
        _SetNumberFormatDigitOptions = module.exports.SetNumberFormatDigitOptions;
      }, () => ({
        '../GetNumberOption': _req,
        '../DefaultNumberOption': _req0
      }));
    }
  };
});
//# sourceMappingURL=57b1da155efb5d398c0a6b552b0d40006cf33a35.js.map
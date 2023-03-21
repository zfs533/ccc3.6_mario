System.register(["__unresolved_0", "@formatjs/ecma402-abstract", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _req0, _cjsExports, ___esModule, _PartitionDateTimePattern, __cjsMetaURL;

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _cjsLoader = _unresolved_.default;
    }, function (_formatjsEcma402Abstract) {
      _req = _formatjsEcma402Abstract.__cjsMetaURL;
    }, function (_unresolved_2) {
      _req0 = _unresolved_2.__cjsMetaURL;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.PartitionDateTimePattern = void 0;

        var ecma402_abstract_1 = require("@formatjs/ecma402-abstract");

        var FormatDateTimePattern_1 = require("./FormatDateTimePattern");
        /**
         * https://tc39.es/ecma402/#sec-partitiondatetimepattern
         * @param dtf
         * @param x
         */


        function PartitionDateTimePattern(dtf, x, implDetails) {
          x = (0, ecma402_abstract_1.TimeClip)(x);

          if (isNaN(x)) {
            throw new RangeError('invalid time');
          }
          /** IMPL START */


          var getInternalSlots = implDetails.getInternalSlots;
          var internalSlots = getInternalSlots(dtf);
          /** IMPL END */

          var pattern = internalSlots.pattern;
          return (0, FormatDateTimePattern_1.FormatDateTimePattern)(dtf, (0, ecma402_abstract_1.PartitionPattern)(pattern), x, implDetails);
        }

        exports.PartitionDateTimePattern = PartitionDateTimePattern; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        ___esModule = module.exports.__esModule;
        _PartitionDateTimePattern = module.exports.PartitionDateTimePattern;
      }, () => ({
        '@formatjs/ecma402-abstract': _req,
        './FormatDateTimePattern': _req0
      }));
    }
  };
});
//# sourceMappingURL=ec9ef31827e12eaa4d162d385841ae9f13e5502d.js.map
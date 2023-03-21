System.register(["__unresolved_0", "@formatjs/ecma402-abstract"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _cjsExports, ___esModule, _SingularRelativeTimeUnit, __cjsMetaURL;

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _cjsLoader = _unresolved_.default;
    }, function (_formatjsEcma402Abstract) {
      _req = _formatjsEcma402Abstract.__cjsMetaURL;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.SingularRelativeTimeUnit = void 0;

        var ecma402_abstract_1 = require("@formatjs/ecma402-abstract");
        /**
         * https://tc39.es/proposal-intl-relative-time/#sec-singularrelativetimeunit
         * @param unit
         */


        function SingularRelativeTimeUnit(unit) {
          (0, ecma402_abstract_1.invariant)((0, ecma402_abstract_1.Type)(unit) === 'String', 'unit must be a string');
          if (unit === 'seconds') return 'second';
          if (unit === 'minutes') return 'minute';
          if (unit === 'hours') return 'hour';
          if (unit === 'days') return 'day';
          if (unit === 'weeks') return 'week';
          if (unit === 'months') return 'month';
          if (unit === 'quarters') return 'quarter';
          if (unit === 'years') return 'year';

          if (unit !== 'second' && unit !== 'minute' && unit !== 'hour' && unit !== 'day' && unit !== 'week' && unit !== 'month' && unit !== 'quarter' && unit !== 'year') {
            throw new RangeError('invalid unit');
          }

          return unit;
        }

        exports.SingularRelativeTimeUnit = SingularRelativeTimeUnit; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        ___esModule = module.exports.__esModule;
        _SingularRelativeTimeUnit = module.exports.SingularRelativeTimeUnit;
      }, () => ({
        '@formatjs/ecma402-abstract': _req
      }));
    }
  };
});
//# sourceMappingURL=a31375fc644d8b42969c70a4b76b764b270b227f.js.map
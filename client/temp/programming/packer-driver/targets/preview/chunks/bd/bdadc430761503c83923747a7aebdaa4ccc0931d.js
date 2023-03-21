System.register(["__unresolved_0", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _cjsExports, ___esModule, _IsWellFormedUnitIdentifier, __cjsMetaURL;

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
        exports.IsWellFormedUnitIdentifier = void 0;

        var IsSanctionedSimpleUnitIdentifier_1 = require("./IsSanctionedSimpleUnitIdentifier");
        /**
         * This follows https://tc39.es/ecma402/#sec-case-sensitivity-and-case-mapping
         * @param str string to convert
         */


        function toLowerCase(str) {
          return str.replace(/([A-Z])/g, function (_, c) {
            return c.toLowerCase();
          });
        }
        /**
         * https://tc39.es/ecma402/#sec-iswellformedunitidentifier
         * @param unit
         */


        function IsWellFormedUnitIdentifier(unit) {
          unit = toLowerCase(unit);

          if ((0, IsSanctionedSimpleUnitIdentifier_1.IsSanctionedSimpleUnitIdentifier)(unit)) {
            return true;
          }

          var units = unit.split('-per-');

          if (units.length !== 2) {
            return false;
          }

          var numerator = units[0],
              denominator = units[1];

          if (!(0, IsSanctionedSimpleUnitIdentifier_1.IsSanctionedSimpleUnitIdentifier)(numerator) || !(0, IsSanctionedSimpleUnitIdentifier_1.IsSanctionedSimpleUnitIdentifier)(denominator)) {
            return false;
          }

          return true;
        }

        exports.IsWellFormedUnitIdentifier = IsWellFormedUnitIdentifier; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        ___esModule = module.exports.__esModule;
        _IsWellFormedUnitIdentifier = module.exports.IsWellFormedUnitIdentifier;
      }, () => ({
        './IsSanctionedSimpleUnitIdentifier': _req
      }));
    }
  };
});
//# sourceMappingURL=bdadc430761503c83923747a7aebdaa4ccc0931d.js.map
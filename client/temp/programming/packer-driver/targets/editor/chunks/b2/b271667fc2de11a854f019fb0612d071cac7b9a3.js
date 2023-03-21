System.register(["__unresolved_0"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _cjsExports, ___esModule, _IsSanctionedSimpleUnitIdentifier, _SIMPLE_UNITS, _removeUnitNamespace, _SANCTIONED_UNITS, __cjsMetaURL;

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
        exports.IsSanctionedSimpleUnitIdentifier = exports.SIMPLE_UNITS = exports.removeUnitNamespace = exports.SANCTIONED_UNITS = void 0;
        /**
         * https://tc39.es/ecma402/#table-sanctioned-simple-unit-identifiers
         */

        exports.SANCTIONED_UNITS = ['angle-degree', 'area-acre', 'area-hectare', 'concentr-percent', 'digital-bit', 'digital-byte', 'digital-gigabit', 'digital-gigabyte', 'digital-kilobit', 'digital-kilobyte', 'digital-megabit', 'digital-megabyte', 'digital-petabyte', 'digital-terabit', 'digital-terabyte', 'duration-day', 'duration-hour', 'duration-millisecond', 'duration-minute', 'duration-month', 'duration-second', 'duration-week', 'duration-year', 'length-centimeter', 'length-foot', 'length-inch', 'length-kilometer', 'length-meter', 'length-mile-scandinavian', 'length-mile', 'length-millimeter', 'length-yard', 'mass-gram', 'mass-kilogram', 'mass-ounce', 'mass-pound', 'mass-stone', 'temperature-celsius', 'temperature-fahrenheit', 'volume-fluid-ounce', 'volume-gallon', 'volume-liter', 'volume-milliliter']; // In CLDR, the unit name always follows the form `namespace-unit` pattern.
        // For example: `digital-bit` instead of `bit`. This function removes the namespace prefix.

        function removeUnitNamespace(unit) {
          return unit.slice(unit.indexOf('-') + 1);
        }

        exports.removeUnitNamespace = removeUnitNamespace;
        /**
         * https://tc39.es/ecma402/#table-sanctioned-simple-unit-identifiers
         */

        exports.SIMPLE_UNITS = exports.SANCTIONED_UNITS.map(removeUnitNamespace);
        /**
         * https://tc39.es/ecma402/#sec-issanctionedsimpleunitidentifier
         */

        function IsSanctionedSimpleUnitIdentifier(unitIdentifier) {
          return exports.SIMPLE_UNITS.indexOf(unitIdentifier) > -1;
        }

        exports.IsSanctionedSimpleUnitIdentifier = IsSanctionedSimpleUnitIdentifier; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        ___esModule = module.exports.__esModule;
        _IsSanctionedSimpleUnitIdentifier = module.exports.IsSanctionedSimpleUnitIdentifier;
        _SIMPLE_UNITS = module.exports.SIMPLE_UNITS;
        _removeUnitNamespace = module.exports.removeUnitNamespace;
        _SANCTIONED_UNITS = module.exports.SANCTIONED_UNITS;
      }, {});
    }
  };
});
//# sourceMappingURL=b271667fc2de11a854f019fb0612d071cac7b9a3.js.map
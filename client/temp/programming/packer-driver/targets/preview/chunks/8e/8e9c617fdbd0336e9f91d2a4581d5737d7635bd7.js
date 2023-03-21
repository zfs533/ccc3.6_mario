System.register(["__unresolved_0", "tslib", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5", "__unresolved_6", "__unresolved_7", "__unresolved_8", "__unresolved_9", "__unresolved_10", "__unresolved_11", "__unresolved_12", "__unresolved_13", "__unresolved_14", "__unresolved_15", "__unresolved_16", "__unresolved_17", "__unresolved_18", "__unresolved_19", "__unresolved_20", "__unresolved_21", "__unresolved_22", "__unresolved_23", "__unresolved_24", "__unresolved_25", "__unresolved_26", "__unresolved_27", "__unresolved_28", "__unresolved_29", "__unresolved_30", "__unresolved_31", "__unresolved_32", "__unresolved_33", "__unresolved_34"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _req0, _req1, _req2, _req3, _req4, _req5, _req6, _req7, _req8, _req9, _req10, _req11, _req12, _req13, _req14, _req15, _req16, _req17, _req18, _req19, _req20, _req21, _req22, _req23, _req24, _req25, _req26, _req27, _req28, _req29, _req30, _req31, _req32, _req33, _cjsExports, ___esModule, _invariant, _isMissingLocaleDataError, _defineProperty, _getMagnitude, _setMultiInternalSlots, _setInternalSlot, _isLiteralPart, _getMultiInternalSlots, _getInternalSlot, __cjsMetaURL;

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
    }, function (_unresolved_6) {
      _req4 = _unresolved_6.__cjsMetaURL;
    }, function (_unresolved_7) {
      _req5 = _unresolved_7.__cjsMetaURL;
    }, function (_unresolved_8) {
      _req6 = _unresolved_8.__cjsMetaURL;
    }, function (_unresolved_9) {
      _req7 = _unresolved_9.__cjsMetaURL;
    }, function (_unresolved_10) {
      _req8 = _unresolved_10.__cjsMetaURL;
    }, function (_unresolved_11) {
      _req9 = _unresolved_11.__cjsMetaURL;
    }, function (_unresolved_12) {
      _req10 = _unresolved_12.__cjsMetaURL;
    }, function (_unresolved_13) {
      _req11 = _unresolved_13.__cjsMetaURL;
    }, function (_unresolved_14) {
      _req12 = _unresolved_14.__cjsMetaURL;
    }, function (_unresolved_15) {
      _req13 = _unresolved_15.__cjsMetaURL;
    }, function (_unresolved_16) {
      _req14 = _unresolved_16.__cjsMetaURL;
    }, function (_unresolved_17) {
      _req15 = _unresolved_17.__cjsMetaURL;
    }, function (_unresolved_18) {
      _req16 = _unresolved_18.__cjsMetaURL;
    }, function (_unresolved_19) {
      _req17 = _unresolved_19.__cjsMetaURL;
    }, function (_unresolved_20) {
      _req18 = _unresolved_20.__cjsMetaURL;
    }, function (_unresolved_21) {
      _req19 = _unresolved_21.__cjsMetaURL;
    }, function (_unresolved_22) {
      _req20 = _unresolved_22.__cjsMetaURL;
    }, function (_unresolved_23) {
      _req21 = _unresolved_23.__cjsMetaURL;
    }, function (_unresolved_24) {
      _req22 = _unresolved_24.__cjsMetaURL;
    }, function (_unresolved_25) {
      _req23 = _unresolved_25.__cjsMetaURL;
    }, function (_unresolved_26) {
      _req24 = _unresolved_26.__cjsMetaURL;
    }, function (_unresolved_27) {
      _req25 = _unresolved_27.__cjsMetaURL;
    }, function (_unresolved_28) {
      _req26 = _unresolved_28.__cjsMetaURL;
    }, function (_unresolved_29) {
      _req27 = _unresolved_29.__cjsMetaURL;
    }, function (_unresolved_30) {
      _req28 = _unresolved_30.__cjsMetaURL;
    }, function (_unresolved_31) {
      _req29 = _unresolved_31.__cjsMetaURL;
    }, function (_unresolved_32) {
      _req30 = _unresolved_32.__cjsMetaURL;
    }, function (_unresolved_33) {
      _req31 = _unresolved_33.__cjsMetaURL;
    }, function (_unresolved_34) {
      _req32 = _unresolved_34.__cjsMetaURL;
    }, function (_unresolved_35) {
      _req33 = _unresolved_35.__cjsMetaURL;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.invariant = exports.isMissingLocaleDataError = exports.defineProperty = exports.getMagnitude = exports.setMultiInternalSlots = exports.setInternalSlot = exports.isLiteralPart = exports.getMultiInternalSlots = exports.getInternalSlot = exports._formatToParts = void 0;

        var tslib_1 = require("tslib");

        (0, tslib_1.__exportStar)(require("./CanonicalizeLocaleList"), exports);
        (0, tslib_1.__exportStar)(require("./CanonicalizeTimeZoneName"), exports);
        (0, tslib_1.__exportStar)(require("./CoerceOptionsToObject"), exports);
        (0, tslib_1.__exportStar)(require("./GetNumberOption"), exports);
        (0, tslib_1.__exportStar)(require("./GetOption"), exports);
        (0, tslib_1.__exportStar)(require("./GetOptionsObject"), exports);
        (0, tslib_1.__exportStar)(require("./IsSanctionedSimpleUnitIdentifier"), exports);
        (0, tslib_1.__exportStar)(require("./IsValidTimeZoneName"), exports);
        (0, tslib_1.__exportStar)(require("./IsWellFormedCurrencyCode"), exports);
        (0, tslib_1.__exportStar)(require("./IsWellFormedUnitIdentifier"), exports);
        (0, tslib_1.__exportStar)(require("./NumberFormat/ComputeExponent"), exports);
        (0, tslib_1.__exportStar)(require("./NumberFormat/ComputeExponentForMagnitude"), exports);
        (0, tslib_1.__exportStar)(require("./NumberFormat/CurrencyDigits"), exports);
        (0, tslib_1.__exportStar)(require("./NumberFormat/FormatNumericToParts"), exports);
        (0, tslib_1.__exportStar)(require("./NumberFormat/FormatNumericToString"), exports);
        (0, tslib_1.__exportStar)(require("./NumberFormat/InitializeNumberFormat"), exports);
        (0, tslib_1.__exportStar)(require("./NumberFormat/PartitionNumberPattern"), exports);
        (0, tslib_1.__exportStar)(require("./NumberFormat/SetNumberFormatDigitOptions"), exports);
        (0, tslib_1.__exportStar)(require("./NumberFormat/SetNumberFormatUnitOptions"), exports);
        (0, tslib_1.__exportStar)(require("./NumberFormat/ToRawFixed"), exports);
        (0, tslib_1.__exportStar)(require("./NumberFormat/ToRawPrecision"), exports);

        var format_to_parts_1 = require("./NumberFormat/format_to_parts");

        Object.defineProperty(exports, "_formatToParts", {
          enumerable: true,
          get: function get() {
            return (0, tslib_1.__importDefault)(format_to_parts_1).default;
          }
        });
        (0, tslib_1.__exportStar)(require("./PartitionPattern"), exports);
        (0, tslib_1.__exportStar)(require("./SupportedLocales"), exports);

        var utils_1 = require("./utils");

        Object.defineProperty(exports, "getInternalSlot", {
          enumerable: true,
          get: function get() {
            return utils_1.getInternalSlot;
          }
        });
        Object.defineProperty(exports, "getMultiInternalSlots", {
          enumerable: true,
          get: function get() {
            return utils_1.getMultiInternalSlots;
          }
        });
        Object.defineProperty(exports, "isLiteralPart", {
          enumerable: true,
          get: function get() {
            return utils_1.isLiteralPart;
          }
        });
        Object.defineProperty(exports, "setInternalSlot", {
          enumerable: true,
          get: function get() {
            return utils_1.setInternalSlot;
          }
        });
        Object.defineProperty(exports, "setMultiInternalSlots", {
          enumerable: true,
          get: function get() {
            return utils_1.setMultiInternalSlots;
          }
        });
        Object.defineProperty(exports, "getMagnitude", {
          enumerable: true,
          get: function get() {
            return utils_1.getMagnitude;
          }
        });
        Object.defineProperty(exports, "defineProperty", {
          enumerable: true,
          get: function get() {
            return utils_1.defineProperty;
          }
        });

        var data_1 = require("./data");

        Object.defineProperty(exports, "isMissingLocaleDataError", {
          enumerable: true,
          get: function get() {
            return data_1.isMissingLocaleDataError;
          }
        });
        (0, tslib_1.__exportStar)(require("./types/relative-time"), exports);
        (0, tslib_1.__exportStar)(require("./types/date-time"), exports);
        (0, tslib_1.__exportStar)(require("./types/list"), exports);
        (0, tslib_1.__exportStar)(require("./types/plural-rules"), exports);
        (0, tslib_1.__exportStar)(require("./types/number"), exports);
        (0, tslib_1.__exportStar)(require("./types/displaynames"), exports);

        var utils_2 = require("./utils");

        Object.defineProperty(exports, "invariant", {
          enumerable: true,
          get: function get() {
            return utils_2.invariant;
          }
        });
        (0, tslib_1.__exportStar)(require("./262"), exports); // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        ___esModule = module.exports.__esModule;
        _invariant = module.exports.invariant;
        _isMissingLocaleDataError = module.exports.isMissingLocaleDataError;
        _defineProperty = module.exports.defineProperty;
        _getMagnitude = module.exports.getMagnitude;
        _setMultiInternalSlots = module.exports.setMultiInternalSlots;
        _setInternalSlot = module.exports.setInternalSlot;
        _isLiteralPart = module.exports.isLiteralPart;
        _getMultiInternalSlots = module.exports.getMultiInternalSlots;
        _getInternalSlot = module.exports.getInternalSlot;
      }, () => ({
        'tslib': _req,
        './CanonicalizeLocaleList': _req0,
        './CanonicalizeTimeZoneName': _req1,
        './CoerceOptionsToObject': _req2,
        './GetNumberOption': _req3,
        './GetOption': _req4,
        './GetOptionsObject': _req5,
        './IsSanctionedSimpleUnitIdentifier': _req6,
        './IsValidTimeZoneName': _req7,
        './IsWellFormedCurrencyCode': _req8,
        './IsWellFormedUnitIdentifier': _req9,
        './NumberFormat/ComputeExponent': _req10,
        './NumberFormat/ComputeExponentForMagnitude': _req11,
        './NumberFormat/CurrencyDigits': _req12,
        './NumberFormat/FormatNumericToParts': _req13,
        './NumberFormat/FormatNumericToString': _req14,
        './NumberFormat/InitializeNumberFormat': _req15,
        './NumberFormat/PartitionNumberPattern': _req16,
        './NumberFormat/SetNumberFormatDigitOptions': _req17,
        './NumberFormat/SetNumberFormatUnitOptions': _req18,
        './NumberFormat/ToRawFixed': _req19,
        './NumberFormat/ToRawPrecision': _req20,
        './NumberFormat/format_to_parts': _req21,
        './PartitionPattern': _req22,
        './SupportedLocales': _req23,
        './utils': _req24,
        './data': _req25,
        './types/relative-time': _req26,
        './types/date-time': _req27,
        './types/list': _req28,
        './types/plural-rules': _req29,
        './types/number': _req30,
        './types/displaynames': _req31,
        './utils': _req32,
        './262': _req33
      }));
    }
  };
});
//# sourceMappingURL=8e9c617fdbd0336e9f91d2a4581d5737d7635bd7.js.map
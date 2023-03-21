System.register(["__unresolved_0", "tslib", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5", "__unresolved_6", "__unresolved_7"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _req0, _req1, _req2, _req3, _req4, _req5, _req6, _cjsExports, ___esModule, _isUnicodeLanguageSubtag, _isUnicodeScriptSubtag, _isUnicodeRegionSubtag, _isStructurallyValidLanguageTag, _parseUnicodeLanguageId, _parseUnicodeLocaleId, _getCanonicalLocales, __cjsMetaURL;

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
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.isUnicodeLanguageSubtag = exports.isUnicodeScriptSubtag = exports.isUnicodeRegionSubtag = exports.isStructurallyValidLanguageTag = exports.parseUnicodeLanguageId = exports.parseUnicodeLocaleId = exports.getCanonicalLocales = void 0;

        var tslib_1 = require("tslib");

        var parser_1 = require("./src/parser");

        var emitter_1 = require("./src/emitter");

        var canonicalizer_1 = require("./src/canonicalizer");
        /**
         * https://tc39.es/ecma402/#sec-canonicalizelocalelist
         * @param locales
         */


        function CanonicalizeLocaleList(locales) {
          if (locales === undefined) {
            return [];
          }

          var seen = [];

          if (typeof locales === 'string') {
            locales = [locales];
          }

          for (var _i = 0, locales_1 = locales; _i < locales_1.length; _i++) {
            var locale = locales_1[_i];
            var canonicalizedTag = (0, emitter_1.emitUnicodeLocaleId)((0, canonicalizer_1.canonicalizeUnicodeLocaleId)((0, parser_1.parseUnicodeLocaleId)(locale)));

            if (seen.indexOf(canonicalizedTag) < 0) {
              seen.push(canonicalizedTag);
            }
          }

          return seen;
        }

        function getCanonicalLocales(locales) {
          return CanonicalizeLocaleList(locales);
        }

        exports.getCanonicalLocales = getCanonicalLocales;

        var parser_2 = require("./src/parser");

        Object.defineProperty(exports, "parseUnicodeLocaleId", {
          enumerable: true,
          get: function get() {
            return parser_2.parseUnicodeLocaleId;
          }
        });
        Object.defineProperty(exports, "parseUnicodeLanguageId", {
          enumerable: true,
          get: function get() {
            return parser_2.parseUnicodeLanguageId;
          }
        });
        Object.defineProperty(exports, "isStructurallyValidLanguageTag", {
          enumerable: true,
          get: function get() {
            return parser_2.isStructurallyValidLanguageTag;
          }
        });
        Object.defineProperty(exports, "isUnicodeRegionSubtag", {
          enumerable: true,
          get: function get() {
            return parser_2.isUnicodeRegionSubtag;
          }
        });
        Object.defineProperty(exports, "isUnicodeScriptSubtag", {
          enumerable: true,
          get: function get() {
            return parser_2.isUnicodeScriptSubtag;
          }
        });
        Object.defineProperty(exports, "isUnicodeLanguageSubtag", {
          enumerable: true,
          get: function get() {
            return parser_2.isUnicodeLanguageSubtag;
          }
        });
        (0, tslib_1.__exportStar)(require("./src/types"), exports);
        (0, tslib_1.__exportStar)(require("./src/emitter"), exports);
        (0, tslib_1.__exportStar)(require("./src/likelySubtags.generated"), exports); // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        ___esModule = module.exports.__esModule;
        _isUnicodeLanguageSubtag = module.exports.isUnicodeLanguageSubtag;
        _isUnicodeScriptSubtag = module.exports.isUnicodeScriptSubtag;
        _isUnicodeRegionSubtag = module.exports.isUnicodeRegionSubtag;
        _isStructurallyValidLanguageTag = module.exports.isStructurallyValidLanguageTag;
        _parseUnicodeLanguageId = module.exports.parseUnicodeLanguageId;
        _parseUnicodeLocaleId = module.exports.parseUnicodeLocaleId;
        _getCanonicalLocales = module.exports.getCanonicalLocales;
      }, () => ({
        'tslib': _req,
        './src/parser': _req0,
        './src/emitter': _req1,
        './src/canonicalizer': _req2,
        './src/parser': _req3,
        './src/types': _req4,
        './src/emitter': _req5,
        './src/likelySubtags.generated': _req6
      }));
    }
  };
});
//# sourceMappingURL=93ff7d1747104d67a52bcb1602e48209b3bacc59.js.map
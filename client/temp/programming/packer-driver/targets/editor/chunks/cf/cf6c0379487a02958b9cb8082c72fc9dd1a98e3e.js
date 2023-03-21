System.register(["__unresolved_0", "tslib"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _cjsExports, ___esModule, _emitUnicodeLocaleId, _emitUnicodeLanguageId, __cjsMetaURL;

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _cjsLoader = _unresolved_.default;
    }, function (_tslib) {
      _req = _tslib.__cjsMetaURL;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.emitUnicodeLocaleId = exports.emitUnicodeLanguageId = void 0;

        var tslib_1 = require("tslib");

        function emitUnicodeLanguageId(lang) {
          if (!lang) {
            return '';
          }

          return (0, tslib_1.__spreadArray)([lang.lang, lang.script, lang.region], lang.variants || [], true).filter(Boolean).join('-');
        }

        exports.emitUnicodeLanguageId = emitUnicodeLanguageId;

        function emitUnicodeLocaleId(_a) {
          var lang = _a.lang,
              extensions = _a.extensions;
          var chunks = [emitUnicodeLanguageId(lang)];

          for (var _i = 0, extensions_1 = extensions; _i < extensions_1.length; _i++) {
            var ext = extensions_1[_i];
            chunks.push(ext.type);

            switch (ext.type) {
              case 'u':
                chunks.push.apply(chunks, (0, tslib_1.__spreadArray)((0, tslib_1.__spreadArray)([], ext.attributes, false), ext.keywords.reduce(function (all, kv) {
                  return all.concat(kv);
                }, []), false));
                break;

              case 't':
                chunks.push.apply(chunks, (0, tslib_1.__spreadArray)([emitUnicodeLanguageId(ext.lang)], ext.fields.reduce(function (all, kv) {
                  return all.concat(kv);
                }, []), false));
                break;

              default:
                chunks.push(ext.value);
                break;
            }
          }

          return chunks.filter(Boolean).join('-');
        }

        exports.emitUnicodeLocaleId = emitUnicodeLocaleId; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        ___esModule = module.exports.__esModule;
        _emitUnicodeLocaleId = module.exports.emitUnicodeLocaleId;
        _emitUnicodeLanguageId = module.exports.emitUnicodeLanguageId;
      }, () => ({
        'tslib': _req
      }));
    }
  };
});
//# sourceMappingURL=cf6c0379487a02958b9cb8082c72fc9dd1a98e3e.js.map
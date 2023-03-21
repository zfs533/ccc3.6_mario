System.register(["__unresolved_0", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _req0, _req1, _req2, _cjsExports, ___esModule, _ResolveLocale, _LookupSupportedLocales, _match, __cjsMetaURL;

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
        exports.ResolveLocale = exports.LookupSupportedLocales = exports.match = void 0;

        var CanonicalizeLocaleList_1 = require("./abstract/CanonicalizeLocaleList");

        var ResolveLocale_1 = require("./abstract/ResolveLocale");

        function match(requestedLocales, availableLocales, defaultLocale, opts) {
          var locales = availableLocales.reduce(function (all, l) {
            all.add(l);
            return all;
          }, new Set());
          return (0, ResolveLocale_1.ResolveLocale)(locales, (0, CanonicalizeLocaleList_1.CanonicalizeLocaleList)(requestedLocales), {
            localeMatcher: (opts === null || opts === void 0 ? void 0 : opts.algorithm) || 'best fit'
          }, [], {}, function () {
            return defaultLocale;
          }).locale;
        }

        exports.match = match;

        var LookupSupportedLocales_1 = require("./abstract/LookupSupportedLocales");

        Object.defineProperty(exports, "LookupSupportedLocales", {
          enumerable: true,
          get: function () {
            return LookupSupportedLocales_1.LookupSupportedLocales;
          }
        });

        var ResolveLocale_2 = require("./abstract/ResolveLocale");

        Object.defineProperty(exports, "ResolveLocale", {
          enumerable: true,
          get: function () {
            return ResolveLocale_2.ResolveLocale;
          }
        }); // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        ___esModule = module.exports.__esModule;
        _ResolveLocale = module.exports.ResolveLocale;
        _LookupSupportedLocales = module.exports.LookupSupportedLocales;
        _match = module.exports.match;
      }, () => ({
        './abstract/CanonicalizeLocaleList': _req,
        './abstract/ResolveLocale': _req0,
        './abstract/LookupSupportedLocales': _req1,
        './abstract/ResolveLocale': _req2
      }));
    }
  };
});
//# sourceMappingURL=203449c002f66f6e0c19272963d2cece764342d9.js.map
System.register(["__unresolved_0", "__unresolved_1", "__unresolved_2", "@formatjs/intl-localematcher"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _req0, _req1, _cjsExports, ___esModule, _SupportedLocales, __cjsMetaURL;

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _cjsLoader = _unresolved_.default;
    }, function (_unresolved_2) {
      _req = _unresolved_2.__cjsMetaURL;
    }, function (_unresolved_3) {
      _req0 = _unresolved_3.__cjsMetaURL;
    }, function (_formatjsIntlLocalematcher) {
      _req1 = _formatjsIntlLocalematcher.__cjsMetaURL;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.SupportedLocales = void 0;

        var _262_1 = require("./262");

        var GetOption_1 = require("./GetOption");

        var intl_localematcher_1 = require("@formatjs/intl-localematcher");
        /**
         * https://tc39.es/ecma402/#sec-supportedlocales
         * @param availableLocales
         * @param requestedLocales
         * @param options
         */


        function SupportedLocales(availableLocales, requestedLocales, options) {
          var matcher = 'best fit';

          if (options !== undefined) {
            options = (0, _262_1.ToObject)(options);
            matcher = (0, GetOption_1.GetOption)(options, 'localeMatcher', 'string', ['lookup', 'best fit'], 'best fit');
          }

          if (matcher === 'best fit') {
            return (0, intl_localematcher_1.LookupSupportedLocales)(availableLocales, requestedLocales);
          }

          return (0, intl_localematcher_1.LookupSupportedLocales)(availableLocales, requestedLocales);
        }

        exports.SupportedLocales = SupportedLocales; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        ___esModule = module.exports.__esModule;
        _SupportedLocales = module.exports.SupportedLocales;
      }, () => ({
        './262': _req,
        './GetOption': _req0,
        '@formatjs/intl-localematcher': _req1
      }));
    }
  };
});
//# sourceMappingURL=3c7720c76e1f2b6fb9dbb0d30f1d9d4224d02f2b.js.map
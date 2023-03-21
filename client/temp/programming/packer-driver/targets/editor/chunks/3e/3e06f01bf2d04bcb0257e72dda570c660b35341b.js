System.register(["__unresolved_0", "@formatjs/ecma402-abstract", "@formatjs/intl-localematcher"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _req0, _cjsExports, ___esModule, _InitializeRelativeTimeFormat, __cjsMetaURL;

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _cjsLoader = _unresolved_.default;
    }, function (_formatjsEcma402Abstract) {
      _req = _formatjsEcma402Abstract.__cjsMetaURL;
    }, function (_formatjsIntlLocalematcher) {
      _req0 = _formatjsIntlLocalematcher.__cjsMetaURL;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.InitializeRelativeTimeFormat = void 0;

        var ecma402_abstract_1 = require("@formatjs/ecma402-abstract");

        var intl_localematcher_1 = require("@formatjs/intl-localematcher");

        var NUMBERING_SYSTEM_REGEX = /^[a-z0-9]{3,8}(-[a-z0-9]{3,8})*$/i;

        function InitializeRelativeTimeFormat(rtf, locales, options, _a) {
          var getInternalSlots = _a.getInternalSlots,
              availableLocales = _a.availableLocales,
              relevantExtensionKeys = _a.relevantExtensionKeys,
              localeData = _a.localeData,
              getDefaultLocale = _a.getDefaultLocale;
          var internalSlots = getInternalSlots(rtf);
          internalSlots.initializedRelativeTimeFormat = true;
          var requestedLocales = (0, ecma402_abstract_1.CanonicalizeLocaleList)(locales);
          var opt = Object.create(null);
          var opts = (0, ecma402_abstract_1.CoerceOptionsToObject)(options);
          var matcher = (0, ecma402_abstract_1.GetOption)(opts, 'localeMatcher', 'string', ['best fit', 'lookup'], 'best fit');
          opt.localeMatcher = matcher;
          var numberingSystem = (0, ecma402_abstract_1.GetOption)(opts, // @ts-expect-error TS option is wack
          'numberingSystem', 'string', undefined, undefined);

          if (numberingSystem !== undefined) {
            if (!NUMBERING_SYSTEM_REGEX.test(numberingSystem)) {
              throw new RangeError("Invalid numbering system ".concat(numberingSystem));
            }
          }

          opt.nu = numberingSystem;
          var r = (0, intl_localematcher_1.ResolveLocale)(availableLocales, requestedLocales, opt, relevantExtensionKeys, localeData, getDefaultLocale);
          var locale = r.locale,
              nu = r.nu;
          internalSlots.locale = locale;
          internalSlots.style = (0, ecma402_abstract_1.GetOption)(opts, 'style', 'string', ['long', 'narrow', 'short'], 'long');
          internalSlots.numeric = (0, ecma402_abstract_1.GetOption)(opts, 'numeric', 'string', ['always', 'auto'], 'always');
          var fields = localeData[r.dataLocale];
          (0, ecma402_abstract_1.invariant)(!!fields, "Missing locale data for ".concat(r.dataLocale));
          internalSlots.fields = fields;
          internalSlots.numberFormat = new Intl.NumberFormat(locales);
          internalSlots.pluralRules = new Intl.PluralRules(locales);
          internalSlots.numberingSystem = nu;
          return rtf;
        }

        exports.InitializeRelativeTimeFormat = InitializeRelativeTimeFormat; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        ___esModule = module.exports.__esModule;
        _InitializeRelativeTimeFormat = module.exports.InitializeRelativeTimeFormat;
      }, () => ({
        '@formatjs/ecma402-abstract': _req,
        '@formatjs/intl-localematcher': _req0
      }));
    }
  };
});
//# sourceMappingURL=3e06f01bf2d04bcb0257e72dda570c660b35341b.js.map
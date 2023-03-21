System.register(["__unresolved_0", "@formatjs/ecma402-abstract"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _cjsExports, ___esModule, _DateTimeStyleFormat, __cjsMetaURL;

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
        exports.DateTimeStyleFormat = void 0;

        var ecma402_abstract_1 = require("@formatjs/ecma402-abstract");

        function DateTimeStyleFormat(dateStyle, timeStyle, dataLocaleData) {
          var dateFormat, timeFormat;

          if (timeStyle !== undefined) {
            (0, ecma402_abstract_1.invariant)(timeStyle === 'full' || timeStyle === 'long' || timeStyle === 'medium' || timeStyle === 'short', 'invalid timeStyle');
            timeFormat = dataLocaleData.timeFormat[timeStyle];
          }

          if (dateStyle !== undefined) {
            (0, ecma402_abstract_1.invariant)(dateStyle === 'full' || dateStyle === 'long' || dateStyle === 'medium' || dateStyle === 'short', 'invalid dateStyle');
            dateFormat = dataLocaleData.dateFormat[dateStyle];
          }

          if (dateStyle !== undefined && timeStyle !== undefined) {
            var format = {};

            for (var field in dateFormat) {
              if (field !== 'pattern') {
                // @ts-ignore
                format[field] = dateFormat[field];
              }
            }

            for (var field in timeFormat) {
              if (field !== 'pattern' && field !== 'pattern12') {
                // @ts-ignore
                format[field] = timeFormat[field];
              }
            }

            var connector = dataLocaleData.dateTimeFormat[dateStyle];
            var pattern = connector.replace('{0}', timeFormat.pattern).replace('{1}', dateFormat.pattern);
            format.pattern = pattern;

            if ('pattern12' in timeFormat) {
              var pattern12 = connector.replace('{0}', timeFormat.pattern12).replace('{1}', dateFormat.pattern);
              format.pattern12 = pattern12;
            }

            return format;
          }

          if (timeStyle !== undefined) {
            return timeFormat;
          }

          (0, ecma402_abstract_1.invariant)(dateStyle !== undefined, 'dateStyle should not be undefined');
          return dateFormat;
        }

        exports.DateTimeStyleFormat = DateTimeStyleFormat; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        ___esModule = module.exports.__esModule;
        _DateTimeStyleFormat = module.exports.DateTimeStyleFormat;
      }, () => ({
        '@formatjs/ecma402-abstract': _req
      }));
    }
  };
});
//# sourceMappingURL=bb3df36c0c8153aba728e2844432da128ca7d55d.js.map
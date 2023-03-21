System.register(["__unresolved_0", "@formatjs/ecma402-abstract"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _cjsExports, ___esModule, _ToDateTimeOptions, __cjsMetaURL;

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
        exports.ToDateTimeOptions = void 0;

        var ecma402_abstract_1 = require("@formatjs/ecma402-abstract");
        /**
         * https://tc39.es/ecma402/#sec-todatetimeoptions
         * @param options
         * @param required
         * @param defaults
         */


        function ToDateTimeOptions(options, required, defaults) {
          if (options === undefined) {
            options = null;
          } else {
            options = (0, ecma402_abstract_1.ToObject)(options);
          }

          options = Object.create(options);
          var needDefaults = true;

          if (required === 'date' || required === 'any') {
            for (var _i = 0, _a = ['weekday', 'year', 'month', 'day']; _i < _a.length; _i++) {
              var prop = _a[_i];
              var value = options[prop];

              if (value !== undefined) {
                needDefaults = false;
              }
            }
          }

          if (required === 'time' || required === 'any') {
            for (var _b = 0, _c = ['dayPeriod', 'hour', 'minute', 'second', 'fractionalSecondDigits']; _b < _c.length; _b++) {
              var prop = _c[_b];
              var value = options[prop];

              if (value !== undefined) {
                needDefaults = false;
              }
            }
          }

          if (options.dateStyle !== undefined || options.timeStyle !== undefined) {
            needDefaults = false;
          }

          if (required === 'date' && options.timeStyle) {
            throw new TypeError('Intl.DateTimeFormat date was required but timeStyle was included');
          }

          if (required === 'time' && options.dateStyle) {
            throw new TypeError('Intl.DateTimeFormat time was required but dateStyle was included');
          }

          if (needDefaults && (defaults === 'date' || defaults === 'all')) {
            for (var _d = 0, _e = ['year', 'month', 'day']; _d < _e.length; _d++) {
              var prop = _e[_d];
              options[prop] = 'numeric';
            }
          }

          if (needDefaults && (defaults === 'time' || defaults === 'all')) {
            for (var _f = 0, _g = ['hour', 'minute', 'second']; _f < _g.length; _f++) {
              var prop = _g[_f];
              options[prop] = 'numeric';
            }
          }

          return options;
        }

        exports.ToDateTimeOptions = ToDateTimeOptions; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        ___esModule = module.exports.__esModule;
        _ToDateTimeOptions = module.exports.ToDateTimeOptions;
      }, () => ({
        '@formatjs/ecma402-abstract': _req
      }));
    }
  };
});
//# sourceMappingURL=8d7f494834bac8b29679e24c17eb9ff8b7653cd7.js.map
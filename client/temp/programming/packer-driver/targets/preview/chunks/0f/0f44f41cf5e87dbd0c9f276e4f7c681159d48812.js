System.register(["__unresolved_0", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _cjsExports, ___esModule, _GetOption, __cjsMetaURL;

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
        exports.GetOption = void 0;

        var _262_1 = require("./262");
        /**
         * https://tc39.es/ecma402/#sec-getoption
         * @param opts
         * @param prop
         * @param type
         * @param values
         * @param fallback
         */


        function GetOption(opts, prop, type, values, fallback) {
          if (typeof opts !== 'object') {
            throw new TypeError('Options must be an object');
          }

          var value = opts[prop];

          if (value !== undefined) {
            if (type !== 'boolean' && type !== 'string') {
              throw new TypeError('invalid type');
            }

            if (type === 'boolean') {
              value = Boolean(value);
            }

            if (type === 'string') {
              value = (0, _262_1.ToString)(value);
            }

            if (values !== undefined && !values.filter(function (val) {
              return val == value;
            }).length) {
              throw new RangeError("".concat(value, " is not within ").concat(values.join(', ')));
            }

            return value;
          }

          return fallback;
        }

        exports.GetOption = GetOption; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        ___esModule = module.exports.__esModule;
        _GetOption = module.exports.GetOption;
      }, () => ({
        './262': _req
      }));
    }
  };
});
//# sourceMappingURL=0f44f41cf5e87dbd0c9f276e4f7c681159d48812.js.map
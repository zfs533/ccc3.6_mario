System.register(["__unresolved_0"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _cjsExports, ___esModule, _GetOptionsObject, __cjsMetaURL;

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
        exports.GetOptionsObject = void 0;
        /**
         * https://tc39.es/ecma402/#sec-getoptionsobject
         * @param options
         * @returns
         */

        function GetOptionsObject(options) {
          if (typeof options === 'undefined') {
            return Object.create(null);
          }

          if (typeof options === 'object') {
            return options;
          }

          throw new TypeError('Options must be an object');
        }

        exports.GetOptionsObject = GetOptionsObject; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        ___esModule = module.exports.__esModule;
        _GetOptionsObject = module.exports.GetOptionsObject;
      }, {});
    }
  };
});
//# sourceMappingURL=e377a9c98511a94b05d8949f2a4822f93beff746.js.map
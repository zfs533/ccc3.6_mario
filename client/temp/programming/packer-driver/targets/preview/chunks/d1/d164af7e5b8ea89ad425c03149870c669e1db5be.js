System.register(["__unresolved_0", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _cjsExports, __cjsMetaURL;

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
        'use strict';

        var PluralRules = require('./plural-rules');

        function _interopDefaultLegacy(e) {
          return e && typeof e === 'object' && 'default' in e ? e : {
            'default': e
          };
        }

        var PluralRules__default = /*#__PURE__*/_interopDefaultLegacy(PluralRules);

        if (typeof Intl === 'undefined') {
          if (typeof global !== 'undefined') {
            global.Intl = {
              PluralRules: PluralRules__default['default']
            };
          } else if (typeof window !== 'undefined') {
            window.Intl = {
              PluralRules: PluralRules__default['default']
            };
          } else {
            this.Intl = {
              PluralRules: PluralRules__default['default']
            };
          }

          PluralRules__default['default'].polyfill = true;
        } else if (!Intl.PluralRules) {
          Intl.PluralRules = PluralRules__default['default'];
          PluralRules__default['default'].polyfill = true;
        } else {
          var test = ['en', 'es', 'ru', 'zh'];
          var supported = Intl.PluralRules.supportedLocalesOf(test);

          if (supported.length < test.length) {
            Intl.PluralRules = PluralRules__default['default'];
            PluralRules__default['default'].polyfill = true;
          }
        } // #endregion ORIGINAL CODE


        _export("default", _cjsExports = module.exports);
      }, () => ({
        './plural-rules': _req
      }));
    }
  };
});
//# sourceMappingURL=d164af7e5b8ea89ad425c03149870c669e1db5be.js.map
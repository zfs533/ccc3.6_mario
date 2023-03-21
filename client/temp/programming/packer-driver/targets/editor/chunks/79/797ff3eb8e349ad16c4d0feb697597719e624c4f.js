System.register(["__unresolved_0"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _cjsExports, ___esModule, _shortMorePenalty, _shortLessPenalty, _longMorePenalty, _longLessPenalty, _differentNumericTypePenalty, _additionPenalty, _removalPenalty, _DATE_TIME_PROPS, __cjsMetaURL;

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
        exports.shortMorePenalty = exports.shortLessPenalty = exports.longMorePenalty = exports.longLessPenalty = exports.differentNumericTypePenalty = exports.additionPenalty = exports.removalPenalty = exports.DATE_TIME_PROPS = void 0;
        exports.DATE_TIME_PROPS = ['weekday', 'era', 'year', 'month', 'day', 'hour', 'minute', 'second', 'timeZoneName'];
        exports.removalPenalty = 120;
        exports.additionPenalty = 20;
        exports.differentNumericTypePenalty = 15;
        exports.longLessPenalty = 8;
        exports.longMorePenalty = 6;
        exports.shortLessPenalty = 6;
        exports.shortMorePenalty = 3; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        ___esModule = module.exports.__esModule;
        _shortMorePenalty = module.exports.shortMorePenalty;
        _shortLessPenalty = module.exports.shortLessPenalty;
        _longMorePenalty = module.exports.longMorePenalty;
        _longLessPenalty = module.exports.longLessPenalty;
        _differentNumericTypePenalty = module.exports.differentNumericTypePenalty;
        _additionPenalty = module.exports.additionPenalty;
        _removalPenalty = module.exports.removalPenalty;
        _DATE_TIME_PROPS = module.exports.DATE_TIME_PROPS;
      }, {});
    }
  };
});
//# sourceMappingURL=797ff3eb8e349ad16c4d0feb697597719e624c4f.js.map
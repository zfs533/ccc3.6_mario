System.register(["__unresolved_0"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _cjsExports, ___esModule, _invariant, _UNICODE_EXTENSION_SEQUENCE_REGEX, _defineProperty, _isLiteralPart, _getMultiInternalSlots, _getInternalSlot, _setMultiInternalSlots, _setInternalSlot, _repeat, _getMagnitude, __cjsMetaURL;

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
        exports.invariant = exports.UNICODE_EXTENSION_SEQUENCE_REGEX = exports.defineProperty = exports.isLiteralPart = exports.getMultiInternalSlots = exports.getInternalSlot = exports.setMultiInternalSlots = exports.setInternalSlot = exports.repeat = exports.getMagnitude = void 0;
        /**
         * Cannot do Math.log(x) / Math.log(10) bc if IEEE floating point issue
         * @param x number
         */

        function getMagnitude(x) {
          // Cannot count string length via Number.toString because it may use scientific notation
          // for very small or very large numbers.
          return Math.floor(Math.log(x) * Math.LOG10E);
        }

        exports.getMagnitude = getMagnitude;

        function repeat(s, times) {
          if (typeof s.repeat === 'function') {
            return s.repeat(times);
          }

          var arr = new Array(times);

          for (var i = 0; i < arr.length; i++) {
            arr[i] = s;
          }

          return arr.join('');
        }

        exports.repeat = repeat;

        function setInternalSlot(map, pl, field, value) {
          if (!map.get(pl)) {
            map.set(pl, Object.create(null));
          }

          var slots = map.get(pl);
          slots[field] = value;
        }

        exports.setInternalSlot = setInternalSlot;

        function setMultiInternalSlots(map, pl, props) {
          for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
            var k = _a[_i];
            setInternalSlot(map, pl, k, props[k]);
          }
        }

        exports.setMultiInternalSlots = setMultiInternalSlots;

        function getInternalSlot(map, pl, field) {
          return getMultiInternalSlots(map, pl, field)[field];
        }

        exports.getInternalSlot = getInternalSlot;

        function getMultiInternalSlots(map, pl) {
          var fields = [];

          for (var _i = 2; _i < arguments.length; _i++) {
            fields[_i - 2] = arguments[_i];
          }

          var slots = map.get(pl);

          if (!slots) {
            throw new TypeError("".concat(pl, " InternalSlot has not been initialized"));
          }

          return fields.reduce(function (all, f) {
            all[f] = slots[f];
            return all;
          }, Object.create(null));
        }

        exports.getMultiInternalSlots = getMultiInternalSlots;

        function isLiteralPart(patternPart) {
          return patternPart.type === 'literal';
        }

        exports.isLiteralPart = isLiteralPart;
        /*
          17 ECMAScript Standard Built-in Objects:
            Every built-in Function object, including constructors, that is not
            identified as an anonymous function has a name property whose value
            is a String.
             Unless otherwise specified, the name property of a built-in Function
            object, if it exists, has the attributes { [[Writable]]: false,
            [[Enumerable]]: false, [[Configurable]]: true }.
        */

        function defineProperty(target, name, _a) {
          var value = _a.value;
          Object.defineProperty(target, name, {
            configurable: true,
            enumerable: false,
            writable: true,
            value: value
          });
        }

        exports.defineProperty = defineProperty;
        exports.UNICODE_EXTENSION_SEQUENCE_REGEX = /-u(?:-[0-9a-z]{2,8})+/gi;

        function invariant(condition, message, Err) {
          if (Err === void 0) {
            Err = Error;
          }

          if (!condition) {
            throw new Err(message);
          }
        }

        exports.invariant = invariant; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        ___esModule = module.exports.__esModule;
        _invariant = module.exports.invariant;
        _UNICODE_EXTENSION_SEQUENCE_REGEX = module.exports.UNICODE_EXTENSION_SEQUENCE_REGEX;
        _defineProperty = module.exports.defineProperty;
        _isLiteralPart = module.exports.isLiteralPart;
        _getMultiInternalSlots = module.exports.getMultiInternalSlots;
        _getInternalSlot = module.exports.getInternalSlot;
        _setMultiInternalSlots = module.exports.setMultiInternalSlots;
        _setInternalSlot = module.exports.setInternalSlot;
        _repeat = module.exports.repeat;
        _getMagnitude = module.exports.getMagnitude;
      }, {});
    }
  };
});
//# sourceMappingURL=636e66cad0ef86880f5b38b9b5b919fbf3680711.js.map
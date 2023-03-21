System.register(["__unresolved_0", "tslib"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _cjsExports, ___esModule, _unpack, _pack, __cjsMetaURL;

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _cjsLoader = _unresolved_.default;
    }, function (_tslib) {
      _req = _tslib.__cjsMetaURL;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.unpack = exports.pack = void 0;

        var tslib_1 = require("tslib");

        function pack(data) {
          var zoneNames = Object.keys(data.zones);
          zoneNames.sort(); // so output is stable

          return {
            zones: zoneNames.map(function (zone) {
              return (0, tslib_1.__spreadArray)([zone], data.zones[zone].map(function (_a) {
                var ts = _a[0],
                    others = _a.slice(1);

                return (0, tslib_1.__spreadArray)([ts === '' ? '' : ts.toString(36)], others, true).join(',');
              }), true).join('|');
            }),
            abbrvs: data.abbrvs.join('|'),
            offsets: data.offsets.map(function (o) {
              return o.toString(36);
            }).join('|')
          };
        }

        exports.pack = pack;

        function unpack(data) {
          var abbrvs = data.abbrvs.split('|');
          var offsets = data.offsets.split('|').map(function (n) {
            return parseInt(n, 36);
          });
          var packedZones = data.zones;
          var zones = {};

          for (var _i = 0, packedZones_1 = packedZones; _i < packedZones_1.length; _i++) {
            var d = packedZones_1[_i];

            var _a = d.split('|'),
                zone = _a[0],
                zoneData = _a.slice(1);

            zones[zone] = zoneData.map(function (z) {
              return z.split(',');
            }).map(function (_a) {
              var ts = _a[0],
                  abbrvIndex = _a[1],
                  offsetIndex = _a[2],
                  dst = _a[3];
              return [ts === '' ? -Infinity : parseInt(ts, 36), abbrvs[+abbrvIndex], offsets[+offsetIndex], dst === '1'];
            });
          }

          return zones;
        }

        exports.unpack = unpack; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        ___esModule = module.exports.__esModule;
        _unpack = module.exports.unpack;
        _pack = module.exports.pack;
      }, () => ({
        'tslib': _req
      }));
    }
  };
});
//# sourceMappingURL=6a1c848f4ec06e35de1646735353743afb8eb9bb.js.map
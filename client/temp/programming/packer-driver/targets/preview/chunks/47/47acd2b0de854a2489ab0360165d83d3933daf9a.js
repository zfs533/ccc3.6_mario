System.register(["__unresolved_0", "@formatjs/ecma402-abstract"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _cjsExports, ___esModule, _ToLocalTime, __cjsMetaURL;

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
        exports.ToLocalTime = void 0;

        var ecma402_abstract_1 = require("@formatjs/ecma402-abstract");

        function getApplicableZoneData(t, timeZone, tzData) {
          var _a;

          var zoneData = tzData[timeZone]; // We don't have data for this so just say it's UTC

          if (!zoneData) {
            return [0, false];
          }

          var i = 0;
          var offset = 0;
          var dst = false;

          for (; i <= zoneData.length; i++) {
            if (i === zoneData.length || zoneData[i][0] * 1e3 > t) {
              ;
              _a = zoneData[i - 1], offset = _a[2], dst = _a[3];
              break;
            }
          }

          return [offset * 1e3, dst];
        }
        /**
         * https://tc39.es/ecma402/#sec-tolocaltime
         * @param t
         * @param calendar
         * @param timeZone
         */


        function ToLocalTime(t, calendar, timeZone, _a) {
          var tzData = _a.tzData;
          (0, ecma402_abstract_1.invariant)((0, ecma402_abstract_1.Type)(t) === 'Number', 'invalid time');
          (0, ecma402_abstract_1.invariant)(calendar === 'gregory', 'We only support Gregory calendar right now');

          var _b = getApplicableZoneData(t, timeZone, tzData),
              timeZoneOffset = _b[0],
              inDST = _b[1];

          var tz = t + timeZoneOffset;
          var year = (0, ecma402_abstract_1.YearFromTime)(tz);
          return {
            weekday: (0, ecma402_abstract_1.WeekDay)(tz),
            era: year < 0 ? 'BC' : 'AD',
            year: year,
            relatedYear: undefined,
            yearName: undefined,
            month: (0, ecma402_abstract_1.MonthFromTime)(tz),
            day: (0, ecma402_abstract_1.DateFromTime)(tz),
            hour: (0, ecma402_abstract_1.HourFromTime)(tz),
            minute: (0, ecma402_abstract_1.MinFromTime)(tz),
            second: (0, ecma402_abstract_1.SecFromTime)(tz),
            millisecond: (0, ecma402_abstract_1.msFromTime)(tz),
            inDST: inDST,
            // IMPORTANT: Not in spec
            timeZoneOffset: timeZoneOffset
          };
        }

        exports.ToLocalTime = ToLocalTime; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        ___esModule = module.exports.__esModule;
        _ToLocalTime = module.exports.ToLocalTime;
      }, () => ({
        '@formatjs/ecma402-abstract': _req
      }));
    }
  };
});
//# sourceMappingURL=47acd2b0de854a2489ab0360165d83d3933daf9a.js.map
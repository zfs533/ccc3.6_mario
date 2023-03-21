System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _crd, Router;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "6bcd04PmQ1BDozMVDuuU1is", "routers", undefined);

      _export("Router", Router = {
        /** 用户上线 */
        rut_upLine: "1008",

        /** 移动 */
        rut_move: "1009",

        /** 用户列表 */
        rut_user_list: "1010",

        /** 用户下线 */
        rut_downLine: "1011",

        /** 用户上线 */
        rut_upLineSelf: "1012"
      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=67213ae89fd8ffe435387b7627d41e40f871ef40.js.map
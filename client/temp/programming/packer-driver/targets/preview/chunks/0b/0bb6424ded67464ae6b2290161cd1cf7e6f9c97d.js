System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Vec3, _crd, IpType, ServerType, ServerPort, brickIndex;

  function getIp(type) {
    if (type == IpType.local) {
      return "ws://0.0.0.0:9001/ws";
    } else if (type == IpType.remote) {
      return "ws://0.0.0.0:9001/ws";
    }

    return "";
  }
  /**
   * 将V3 Math.floor
   * @param v3 
   */


  function unitVec3(v3) {
    var re = new Vec3(Math.floor(v3.x), Math.floor(v3.y), Math.floor(v3.z));
    return re;
  }
  /**
   * 复制Vec3数组
   * @param arr 
   * @returns Vec3[]
   */


  function copyVec3Array(arr) {
    var copy = [];

    for (var i = 0; i < arr.length; i++) {
      var v3 = new Vec3(arr[i].x, arr[i].y, arr[i].z);
      copy.push(v3);
    }

    return copy;
  }

  /**
   * 砖头索引
   * @returns 
   */
  function getBrickIndex() {
    return brickIndex++;
  }

  _export({
    getIp: getIp,
    unitVec3: unitVec3,
    copyVec3Array: copyVec3Array,
    getBrickIndex: getBrickIndex,
    IpType: void 0,
    ServerType: void 0,
    ServerPort: void 0
  });

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      Vec3 = _cc.Vec3;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "d5c24V6atZCxL+UXl4i04oU", "util", undefined);

      __checkObsolete__(['Vec3']);

      (function (IpType) {
        IpType[IpType["local"] = 0] = "local";
        IpType[IpType["remote"] = 1] = "remote";
      })(IpType || _export("IpType", IpType = {}));

      (function (ServerType) {
        ServerType[ServerType["connectorServer"] = 100] = "connectorServer";
        ServerType[ServerType["gameServer"] = 101] = "gameServer";
        ServerType[ServerType["userServer"] = 102] = "userServer";
      })(ServerType || _export("ServerType", ServerType = {}));

      (function (ServerPort) {
        ServerPort[ServerPort["gameServer"] = 9000] = "gameServer";
        ServerPort[ServerPort["userServer"] = 9001] = "userServer";
        ServerPort[ServerPort["connector"] = 8999] = "connector";
      })(ServerPort || _export("ServerPort", ServerPort = {}));

      brickIndex = 0;

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=0bb6424ded67464ae6b2290161cd1cf7e6f9c97d.js.map
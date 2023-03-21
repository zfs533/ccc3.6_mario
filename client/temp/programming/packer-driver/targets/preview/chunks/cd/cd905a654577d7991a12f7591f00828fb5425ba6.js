System.register(["__unresolved_0", "cc"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, DataViewUtils, _crd;

  function _reportPossibleCrUseOfHead(extras) {
    _reporterNs.report("Head", "./globalUtils", _context.meta, extras);
  }

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "ed5c2Lh6AxG9aKKIadUSCAn", "dataviewUtils", undefined);

      /* 二进制数据处理 */
      _export("default", DataViewUtils = class DataViewUtils {
        /**
         * 获取消息头数据id,serverType,other
         * @param dataview 
         */
        static getHeadData(dataview) {
          /* 约定，消息头共8个字节，两个字节保存id,连个字节保存服务器类型，四个字节保存其他 */
          var id = dataview.getInt16(0);
          var server = dataview.getInt16(2);
          var router = dataview.getInt32(4);
          var head = {
            id: id,
            serverType: server,
            router: String(router)
          };
          return head;
        }
        /**
         * 获取二进制数据消息体
         * @param dataview 
         * @param byteLength 
         */


        static decoding(dataview, byteLength) {
          var result = "";
          /* 约定，每个字符给两个字节空间存储数据 */

          var count = 0;

          for (var i = 0; i < byteLength; i++) {
            if (count + 8 >= byteLength) {
              break;
            }

            var hh = dataview.getInt16(count + 8);
            count += 2;
            result += String.fromCharCode(hh);
          } // console.log(result);


          return JSON.parse(result);
        }
        /**
         * 封装二进制数据
         * @param id  唯一标示Id
         * @param serverType 服务器类型
         * @param other 其他
         * @param body 消息体（JSON格式）
         */


        static encoding(id, serverType, other, body) {
          var bodyObj = JSON.stringify(body);
          /* 考虑到中文，每个字符给两个字节空间存储数据 */

          var buffer = new ArrayBuffer(bodyObj.length * 2 + 8);
          var dataview = new DataView(buffer);
          /* 唯一标识id */

          dataview.setInt16(0, id);
          /* 服务器类型 */

          dataview.setInt16(2, serverType);
          /* 其他，可做验证，先留着 */

          dataview.setInt32(4, other);
          /* body消息体 */

          var count = 0;

          for (var i = 0; i < bodyObj.length; i++) {
            var code = bodyObj.charCodeAt(i);
            dataview.setInt16(count + 8, code);
            count += 2;
          }

          return dataview.buffer;
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=cd905a654577d7991a12f7591f00828fb5425ba6.js.map
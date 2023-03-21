System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, DataViewUtils, Router, getIp, IpType, clientEvent, user, ChessNet, _crd, Net;

  function _reportPossibleCrUseOfDataViewUtils(extras) {
    _reporterNs.report("DataViewUtils", "./dataviewUtils", _context.meta, extras);
  }

  function _reportPossibleCrUseOfRouter(extras) {
    _reporterNs.report("Router", "./routers", _context.meta, extras);
  }

  function _reportPossibleCrUseOfHead(extras) {
    _reporterNs.report("Head", "./globalUtils", _context.meta, extras);
  }

  function _reportPossibleCrUseOfgetIp(extras) {
    _reporterNs.report("getIp", "./util", _context.meta, extras);
  }

  function _reportPossibleCrUseOfIpType(extras) {
    _reporterNs.report("IpType", "./util", _context.meta, extras);
  }

  function _reportPossibleCrUseOfclientEvent(extras) {
    _reporterNs.report("clientEvent", "../framework/clientEvent", _context.meta, extras);
  }

  function _reportPossibleCrUseOfuser(extras) {
    _reporterNs.report("user", "../game/common/user", _context.meta, extras);
  }

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }, function (_unresolved_2) {
      DataViewUtils = _unresolved_2.default;
    }, function (_unresolved_3) {
      Router = _unresolved_3.Router;
    }, function (_unresolved_4) {
      getIp = _unresolved_4.getIp;
      IpType = _unresolved_4.IpType;
    }, function (_unresolved_5) {
      clientEvent = _unresolved_5.clientEvent;
    }, function (_unresolved_6) {
      user = _unresolved_6.user;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "05fc5bCZjNC6aLY2zJ5gcSX", "net", undefined);

      _export("default", ChessNet = class ChessNet {
        constructor() {
          this.socket = null;
          this.id = 0;
          this.serverType = 0;
          this.isConnected = false;
        }

        static get Inst() {
          if (!this._instance) {
            this._instance = new ChessNet();
          }

          return this._instance;
        }
        /**
         * 初始化连接服务器
         * @param cb 
         */


        init(cb) {
          var ip = (_crd && getIp === void 0 ? (_reportPossibleCrUseOfgetIp({
            error: Error()
          }), getIp) : getIp)((_crd && IpType === void 0 ? (_reportPossibleCrUseOfIpType({
            error: Error()
          }), IpType) : IpType).local);
          console.log(ip);
          this.socket = new WebSocket(ip);
          this.socket.binaryType = "arraybuffer";

          this.socket.onopen = () => {
            this.isConnected = true;
            console.log("--------connect success---------");

            if (cb) {
              cb();
            }
          };

          this.socket.onclose = () => {
            console.log("close");
            this.isConnected = false;
          };

          this.socket.onerror = () => {
            console.log("onerror");
          };

          this.socket.onmessage = req => {
            var message = req.data;
            var buf = new Uint8Array(message).buffer;
            var dtView = new DataView(buf);
            var head = (_crd && DataViewUtils === void 0 ? (_reportPossibleCrUseOfDataViewUtils({
              error: Error()
            }), DataViewUtils) : DataViewUtils).getHeadData(dtView);
            var body = (_crd && DataViewUtils === void 0 ? (_reportPossibleCrUseOfDataViewUtils({
              error: Error()
            }), DataViewUtils) : DataViewUtils).decoding(dtView, buf.byteLength);
            console.log("------------------receiveData------------------");
            console.log("router:" + head.router + " body:" + JSON.stringify(body));
            this.handleRecvdate(head, body);
          };
        }
        /**
         * 主动断开与服务器间的链接
         */


        breakConnect() {
          this.socket.close();
        }
        /**
         * 接收数据，将数据派发出去
         * @param head 
         * @param body 
         */


        handleRecvdate(head, body) {
          (_crd && clientEvent === void 0 ? (_reportPossibleCrUseOfclientEvent({
            error: Error()
          }), clientEvent) : clientEvent).dispatchEvent(head.router, body);

          switch (head.router) {
            case (_crd && Router === void 0 ? (_reportPossibleCrUseOfRouter({
              error: Error()
            }), Router) : Router).rut_upLineSelf:
              (_crd && user === void 0 ? (_reportPossibleCrUseOfuser({
                error: Error()
              }), user) : user).id = body.id;
          }
        }
        /**
         * 向服务器发送数据
         * @param data 
         * @param router 
         */


        sendMsg(data, router) {
          console.log("------------------sendData------------------");
          console.log(data, router);
          var dt = (_crd && DataViewUtils === void 0 ? (_reportPossibleCrUseOfDataViewUtils({
            error: Error()
          }), DataViewUtils) : DataViewUtils).encoding(this.id, this.serverType, Number(router), data);
          this.socket.send(dt);
        }

      });

      ChessNet._instance = null;

      _export("Net", Net = new ChessNet());

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=dbe207dbd8b235593057ea90ead4891b2f736f21.js.map
System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, localConfig, ChessNet, _dec, _class, _crd, ccclass, property, Main;

  function _reportPossibleCrUseOflocalConfig(extras) {
    _reporterNs.report("localConfig", "./framework/localConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfChessNet(extras) {
    _reporterNs.report("ChessNet", "./net/net", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
    }, function (_unresolved_2) {
      localConfig = _unresolved_2.localConfig;
    }, function (_unresolved_3) {
      ChessNet = _unresolved_3.default;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "8865bUl7UFJUaEWg4HIxDFo", "main", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Main", Main = (_dec = ccclass('Main'), _dec(_class = class Main extends Component {
        start() {
          //加载CSV相关配置
          // localConfig.instance.loadConfig(() => {
          //     this._loadFinish();
          // })
          (_crd && ChessNet === void 0 ? (_reportPossibleCrUseOfChessNet({
            error: Error()
          }), ChessNet) : ChessNet).Inst.init();
        }

        _loadFinish() {
          // console.log("loadFinished");
          //获取单张表数据
          var dt = (_crd && localConfig === void 0 ? (_reportPossibleCrUseOflocalConfig({
            error: Error()
          }), localConfig) : localConfig).instance.getTable('map003');
          console.log(dt); //获取表中的某一项
          // dt = localConfig.instance.queryOne("power", "ID", 1);

          dt = (_crd && localConfig === void 0 ? (_reportPossibleCrUseOflocalConfig({
            error: Error()
          }), localConfig) : localConfig).instance.queryByID("map003", "1");
          console.log(dt); //以数组形式还回数据

          dt = (_crd && localConfig === void 0 ? (_reportPossibleCrUseOflocalConfig({
            error: Error()
          }), localConfig) : localConfig).instance.getTableArr("map003");
          console.log(dt);
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=5039830efc32e959deaabcb61e4cb106ff412449.js.map
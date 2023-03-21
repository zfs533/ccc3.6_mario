System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, UITransform, clientEvent, Constant, EnumEnemyStatus, enemy, _dec, _class, _crd, ccclass, property, enemyTortoise;

  function _reportPossibleCrUseOfclientEvent(extras) {
    _reporterNs.report("clientEvent", "../../../framework/clientEvent", _context.meta, extras);
  }

  function _reportPossibleCrUseOfConstant(extras) {
    _reporterNs.report("Constant", "../../../framework/constant", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEnumEnemyStatus(extras) {
    _reporterNs.report("EnumEnemyStatus", "../../../framework/enum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfenemy(extras) {
    _reporterNs.report("enemy", "./enemy", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      UITransform = _cc.UITransform;
    }, function (_unresolved_2) {
      clientEvent = _unresolved_2.clientEvent;
    }, function (_unresolved_3) {
      Constant = _unresolved_3.Constant;
    }, function (_unresolved_4) {
      EnumEnemyStatus = _unresolved_4.EnumEnemyStatus;
    }, function (_unresolved_5) {
      enemy = _unresolved_5.enemy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "32e8ap7h19Hz6kSfhtQkcpd", "enemyTortoise", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Collider2D', 'UITransform', 'IPhysics2DContact', 'Sprite']);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * 普通乌龟
       */

      _export("enemyTortoise", enemyTortoise = (_dec = ccclass('enemyTortoise'), _dec(_class = class enemyTortoise extends (_crd && enemy === void 0 ? (_reportPossibleCrUseOfenemy({
        error: Error()
      }), enemy) : enemy) {
        constructor(...args) {
          super(...args);
          this._isDown = false;
        }

        start() {
          super.start();
          if (this.attactedNode) this.attactedNode.active = false;
          if (this.animComp) this.animComp.active = true;
          this.status = (_crd && EnumEnemyStatus === void 0 ? (_reportPossibleCrUseOfEnumEnemyStatus({
            error: Error()
          }), EnumEnemyStatus) : EnumEnemyStatus).walk;
          this.refreshSpeedByStatus();
        }

        onBeginContact(selfCollider, otherCollider, contact) {
          super.onBeginContact(selfCollider, otherCollider, contact);
          if (this.isDeath) return; // 只在两个碰撞体开始接触时被调用一次

          let name1 = selfCollider.node.name;
          let name2 = otherCollider.node.name;

          if (name2.includes("mario")) {
            let y1 = selfCollider.node.position.y;
            let h2 = selfCollider.node.getComponent(UITransform).height;
            y1 += h2;
            let y2 = otherCollider.node.position.y;

            if (y2 >= y1 && !this.isColider) {
              //这里要动态加载被踩的图片
              this.isColider = true;
              this.scheduleOnce(() => {
                this.isColider = false;
              }, 0.1);
              this.loadInsideTexture();

              if (this.status == (_crd && EnumEnemyStatus === void 0 ? (_reportPossibleCrUseOfEnumEnemyStatus({
                error: Error()
              }), EnumEnemyStatus) : EnumEnemyStatus).walk || this.status == (_crd && EnumEnemyStatus === void 0 ? (_reportPossibleCrUseOfEnumEnemyStatus({
                error: Error()
              }), EnumEnemyStatus) : EnumEnemyStatus).run) {
                this.status = (_crd && EnumEnemyStatus === void 0 ? (_reportPossibleCrUseOfEnumEnemyStatus({
                  error: Error()
                }), EnumEnemyStatus) : EnumEnemyStatus).stand;
              } else if (this.status == (_crd && EnumEnemyStatus === void 0 ? (_reportPossibleCrUseOfEnumEnemyStatus({
                error: Error()
              }), EnumEnemyStatus) : EnumEnemyStatus).stand) {
                this.status = (_crd && EnumEnemyStatus === void 0 ? (_reportPossibleCrUseOfEnumEnemyStatus({
                  error: Error()
                }), EnumEnemyStatus) : EnumEnemyStatus).run;
              }

              this.refreshSpeedByStatus();
            } else if (y2 < y1) {
              (_crd && clientEvent === void 0 ? (_reportPossibleCrUseOfclientEvent({
                error: Error()
              }), clientEvent) : clientEvent).dispatchEvent((_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
                error: Error()
              }), Constant) : Constant).EVENT_TYPE.MarioDeath);
            }
          }
        }

        loadInsideTexture() {
          if (this._isDown) return; // this._isDown = true;
          // let data = this.getData();
          // let sp = this.node.getComponent(Sprite);
          // console.log("data.path "+data.path);
          // resourceUtil.setSpriteIcon(data.path,sp,()=>{
          //     console.log("load finished");
          // })

          if (this.attactedNode) {
            this.attactedNode.active = true;
            this.animComp.active = false;
          }
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=4648e0cc77a8092fd0ff67efde69ba2cbcb65d8c.js.map
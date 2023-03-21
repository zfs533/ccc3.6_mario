System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Collider2D, Component, Contact2DType, _decorator, _dec, _class, _crd, ccclass, property, baseCollider;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      Collider2D = _cc.Collider2D;
      Component = _cc.Component;
      Contact2DType = _cc.Contact2DType;
      _decorator = _cc._decorator;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "2368aC9wBVN6aGeWpOhsh4/", "baseCollider", undefined);

      __checkObsolete__(['Collider2D', 'Component', 'Contact2DType', 'IPhysics2DContact', 'UITransformComponent', '_decorator']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("baseCollider", baseCollider = (_dec = ccclass('baseCollider'), _dec(_class = class baseCollider extends Component {
        start() {
          this._handleCollider();
        }

        _handleCollider() {
          let collider = this.node.getComponent(Collider2D);

          if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
          }
        }
        /**
         * 子类重写
         * @param selfCollider 
         * @param otherCollider 
         * @param contact 
         */


        onBeginContact(selfCollider, otherCollider, contact) {
          // 只在两个碰撞体开始接触时被调用一次
          let name1 = selfCollider.node.name;
          let name2 = otherCollider.node.name;
        }

        onEndContact(selfCollider, otherCollider, contact) {// 只在两个碰撞体结束接触时被调用一次
          // console.log('onEndContact');
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=4a517c63dd8fc4e5ee436dc1cc2106e9b598d63e.js.map
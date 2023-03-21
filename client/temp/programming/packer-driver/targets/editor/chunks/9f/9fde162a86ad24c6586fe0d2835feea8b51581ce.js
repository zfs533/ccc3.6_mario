System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, BoxCollider2D, Collider2D, Component, Contact2DType, RigidBody2D, _decorator, _dec, _class, _crd, ccclass, property, baseCollider;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      BoxCollider2D = _cc.BoxCollider2D;
      Collider2D = _cc.Collider2D;
      Component = _cc.Component;
      Contact2DType = _cc.Contact2DType;
      RigidBody2D = _cc.RigidBody2D;
      _decorator = _cc._decorator;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "2368aC9wBVN6aGeWpOhsh4/", "baseCollider", undefined);

      __checkObsolete__(['BoxCollider2D', 'Collider2D', 'Component', 'Contact2DType', 'IPhysics2DContact', 'RigidBody2D', '_decorator']);

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
        /**
         * 物理分组设置
         * @param group 
         */


        setPhysicsGroup(group) {
          let rb2d = this.node.getComponent(RigidBody2D);
          rb2d.enabledContactListener = true;
          rb2d.group = group;
          let b2d = this.node.getComponent(BoxCollider2D);
          b2d.group = group;
        }

        getRigidBody2d() {
          return this.node.getComponent(RigidBody2D);
        }

        getBoxCollider2d() {
          return this.node.getComponent(BoxCollider2D);
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=9fde162a86ad24c6586fe0d2835feea8b51581ce.js.map
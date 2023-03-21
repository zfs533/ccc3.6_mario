System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, instantiate, NodePool, _dec, _class, _class2, _crd, ccclass, property, PoolManager;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      instantiate = _cc.instantiate;
      NodePool = _cc.NodePool;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "e4062AxdrtIk5DakK+DndZI", "poolManager", undefined);

      __checkObsolete__(['_decorator', 'Node', 'Prefab', 'instantiate', 'NodePool']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("PoolManager", PoolManager = (_dec = ccclass('PoolManager'), _dec(_class = (_class2 = class PoolManager {
        constructor() {
          this._dictPool = {};
          this._dictPrefab = {};
        }

        static get Inst() {
          if (this._instance) {
            return this._instance;
          }

          this._instance = new PoolManager();
          return this._instance;
        }
        /**
         * 根据预设从对象池中获取对应节点
         */


        async getNode(prefab, parent = null) {
          return new Promise(resove => {
            let name = prefab.name;
            this._dictPrefab[name] = prefab;
            let node = null;

            if (this._dictPool.hasOwnProperty(name)) {
              //已有对应的对象池
              let pool = this._dictPool[name];

              if (pool.size() > 0) {
                node = pool.get();
              } else {
                node = instantiate(prefab);
              }
            } else {
              //没有对应对象池，创建他！
              let pool = new NodePool();
              this._dictPool[name] = pool;
              node = instantiate(prefab);
            }

            if (parent) {
              node.parent = parent;
            }

            if (!node) console.log('对象次获取对象异常');
            node.active = true;
            resove(node);
          });
        }
        /**
         * 将对应节点放回对象池中
         */


        setNode(node) {
          if (!node) {
            return;
          }

          let name = node.name;
          let pool = null;

          if (this._dictPool.hasOwnProperty(name)) {
            //已有对应的对象池
            pool = this._dictPool[name];
          } else {
            //没有对应对象池，创建他！
            pool = new NodePool();
            this._dictPool[name] = pool;
          }

          pool.put(node);
        }
        /**
         * 根据名称，清除对应对象池
         */


        clearPool(name) {
          if (this._dictPool.hasOwnProperty(name)) {
            let pool = this._dictPool[name];
            pool.clear();
          }
        } // public static handle = new Map<string, Node[]>();
        // /**
        //  * 获取
        //  * @param prefab 
        //  */
        // public static getNode(prefab: Prefab): Promise<Node> {
        //     return new Promise(resolve => {
        //         const name = prefab.name;
        //         let node: Node = null;
        //         if (this.handle.has(name)) {
        //             node = this.handle.get(name)?.pop() as Node;
        //         }
        //         else {
        //             node = instantiate(prefab) as Node;
        //         }
        //         if (!node) {
        //             node = instantiate(prefab) as Node;
        //         }
        //         resolve(node);
        //     });
        // }
        // /**
        //  * 根据名字获取
        //  * @param name string 
        //  */
        // public static getNodeBy(namee: string): Node {
        //     const name = namee;
        //     let node: Node = null;
        //     if (this.handle.has(name)) {
        //         node = this.handle.get(name)?.pop() as Node;
        //     }
        //     return node;
        // }
        // /**
        //  * 回收
        //  * @param target 
        //  */
        // public static setNode(target: Node) {
        //     const name = target.name;
        //     target.parent = null;
        //     if (this.handle.has(name)) {
        //         this.handle.get(name)?.push(target);
        //     }
        //     else {
        //         this.handle.set(name, [target]);
        //     }
        // }


      }, _class2._instance = void 0, _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=456eabbf36b724425a7dfcc8620fd1330134a63c.js.map
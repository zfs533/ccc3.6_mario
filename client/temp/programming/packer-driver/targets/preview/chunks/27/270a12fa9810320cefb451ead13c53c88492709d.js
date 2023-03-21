System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, instantiate, NodePool, _dec, _class, _class2, _crd, ccclass, property, PoolManager;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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


        getNode(prefab, parent) {
          var _this = this;

          return _asyncToGenerator(function* () {
            if (parent === void 0) {
              parent = null;
            }

            return new Promise(resove => {
              var name = prefab.name;
              _this._dictPrefab[name] = prefab;
              var node = null;

              if (_this._dictPool.hasOwnProperty(name)) {
                //已有对应的对象池
                var pool = _this._dictPool[name];

                if (pool.size() > 0) {
                  node = pool.get();
                } else {
                  node = instantiate(prefab);
                }
              } else {
                //没有对应对象池，创建他！
                var _pool = new NodePool();

                _this._dictPool[name] = _pool;
                node = instantiate(prefab);
              }

              if (parent) {
                node.parent = parent;
              }

              if (!node) console.log('对象次获取对象异常');
              node.active = true;
              resove(node);
            });
          })();
        }
        /**
         * 将对应节点放回对象池中
         */


        setNode(node) {
          if (!node) {
            return;
          }

          var name = node.name;
          var pool = null;

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
            var pool = this._dictPool[name];
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
//# sourceMappingURL=270a12fa9810320cefb451ead13c53c88492709d.js.map
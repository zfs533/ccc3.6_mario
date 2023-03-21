System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, resources, _decorator, CSVManager, resourceUtil, _dec, _class, _class2, _crd, ccclass, property, localConfig;

  function _reportPossibleCrUseOfCSVManager(extras) {
    _reporterNs.report("CSVManager", "./csvManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfresourceUtil(extras) {
    _reporterNs.report("resourceUtil", "./resourceUtil", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      resources = _cc.resources;
      _decorator = _cc._decorator;
    }, function (_unresolved_2) {
      CSVManager = _unresolved_2.CSVManager;
    }, function (_unresolved_3) {
      resourceUtil = _unresolved_3.resourceUtil;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "12facSZhFRGIYa7yxiLVDOp", "localConfig", undefined);

      __checkObsolete__(['resources']);

      __checkObsolete__(['_decorator', 'Component']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("localConfig", localConfig = (_dec = ccclass("localConfig"), _dec(_class = (_class2 = class localConfig {
        constructor() {
          this.csvManager = void 0;
          this.arrCars = void 0;
          this._callback = null;
          this._skills = {};
          this.currentLoad = 0;
          this.cntLoad = 0;
          this.servers = [];
        }

        static get instance() {
          if (this._instance) {
            return this._instance;
          }

          this._instance = new localConfig();
          return this._instance;
        }

        loadConfig(cb) {
          this._callback = cb;
          this.csvManager = new (_crd && CSVManager === void 0 ? (_reportPossibleCrUseOfCSVManager({
            error: Error()
          }), CSVManager) : CSVManager)();
          this.loadCSV();
        }

        loadCSV() {
          //新增数据表 请往该数组中添加....
          resources.loadDir("datas", (err, assets) => {
            if (err) {
              console.log(err);
              return;
            } //+1主要是后续还有技能配置的加载，特殊处理


            this.cntLoad = assets.length; //客户端加载

            assets.forEach((item, index, array) => {
              (_crd && resourceUtil === void 0 ? (_reportPossibleCrUseOfresourceUtil({
                error: Error()
              }), resourceUtil) : resourceUtil).getData(item.name, (err, content) => {
                this.csvManager.addTable(item.name, content);
                this.tryToCallbackOnFinished();
              });
            });
          });
        }

        queryOne(tableName, key, value) {
          return this.csvManager.queryOne(tableName, key, value);
        }

        queryByID(tableName, ID) {
          return this.csvManager.queryByID(tableName, ID);
        }

        getTable(tableName) {
          return this.csvManager.getTable(tableName);
        }

        getTableArr(tableName) {
          return this.csvManager.getTableArr(tableName);
        } // 选出指定表里面所有有 key=>value 键值对的数据


        queryAll(tableName, key, value) {
          return this.csvManager.queryAll(tableName, key, value);
        } // 选出指定表里所有 key 的值在 values 数组中的数据，返回 Object，key 为 ID


        queryIn(tableName, key, values) {
          return this.csvManager.queryIn(tableName, key, values);
        } // 选出符合条件的数据。condition key 为表格的key，value 为值的数组。返回的object，key 为数据在表格的ID，value为具体数据


        queryByCondition(tableName, condition) {
          return this.csvManager.queryByCondition(tableName, condition);
        }

        tryToCallbackOnFinished() {
          if (this._callback) {
            this.currentLoad++;

            if (this.currentLoad >= this.cntLoad) {
              this._callback();
            }
          }
        }

      }, _class2._instance = void 0, _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=28d240ea93d075a0f681f65397d4910da8fac902.js.map
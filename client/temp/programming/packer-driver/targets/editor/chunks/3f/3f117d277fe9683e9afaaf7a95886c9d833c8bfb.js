System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Prefab, SpriteComponent, SpriteFrame, resources, error, Texture2D, instantiate, isValid, find, Color, _dec, _class, _crd, ccclass, resourceUtil;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Prefab = _cc.Prefab;
      SpriteComponent = _cc.SpriteComponent;
      SpriteFrame = _cc.SpriteFrame;
      resources = _cc.resources;
      error = _cc.error;
      Texture2D = _cc.Texture2D;
      instantiate = _cc.instantiate;
      isValid = _cc.isValid;
      find = _cc.find;
      Color = _cc.Color;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "7844e1bOwZK+7JMYjENQU5v", "resourceUtil", undefined);

      __checkObsolete__(['_decorator', 'Prefab', 'Node', 'SpriteComponent', 'SpriteFrame', 'Rect', 'ImageAsset', 'resources', 'error', 'Texture2D', 'instantiate', 'isValid', 'find', 'loader', 'Color']);

      ({
        ccclass
      } = _decorator);

      _export("resourceUtil", resourceUtil = (_dec = ccclass("resourceUtil"), _dec(_class = class resourceUtil {
        /**
         * 加载资源
         * @param url   资源路径
         * @param type  资源类型
         * @param cb    回调
         * @method loadRes
         */
        static loadRes(url, type, cb) {
          resources.load(url, (err, res) => {
            if (err) {
              error(err.message || err);
              cb(err, res);
              return;
            }

            cb(null, res);
          });
        }

        static loadPiecesPriefabRes(modulePath) {
          return new Promise((resolve, reject) => {
            this.loadRes(`prefab/pieces/${modulePath}`, Prefab, (err, prefab) => {
              if (err) {
                console.error('effect load failed', modulePath);
                reject && reject();
                return;
              }

              resolve && resolve(prefab);
            });
          });
        }

        static loadModelRes(modulePath) {
          return new Promise((resolve, reject) => {
            this.loadRes(`prefab/model/${modulePath}`, Prefab, (err, prefab) => {
              if (err) {
                console.error("model load failed", modulePath);
                reject && reject();
                return;
              }

              resolve && resolve(prefab);
            });
          });
        }

        static loadMapModelRes(modulePath) {
          return new Promise((resolve, reject) => {
            this.loadRes(`prefab/map/${modulePath}`, Prefab, (err, prefab) => {
              if (err) {
                console.error("map model load failed", modulePath);
                reject && reject();
                return;
              }

              resolve && resolve(prefab);
            });
          });
        }

        static getMapPrefabRes(prefabPath, cb) {
          this.loadRes("prefab/map/" + prefabPath, Prefab, cb);
        }

        static createMap(path, cb, parent) {
          this.getMapPrefabRes(path, function (err, prefab) {
            if (err) return;
            var node = instantiate(prefab);
            node.setPosition(0, 0, 0);

            if (!parent) {
              parent = find("Canvas");
            }

            parent.addChild(node);
            cb && cb(null, node);
          });
        }

        static loadSpriteFrameRes(path) {
          return new Promise((resolve, reject) => {
            this.loadRes(path, SpriteFrame, (err, img) => {
              if (err) {
                console.error('spriteFrame load failed!', path, err);
                reject && reject();
                return;
              }

              let texture = new Texture2D();
              texture.image = img;
              let sf = new SpriteFrame();
              sf.texture = texture;
              resolve && resolve(sf);
            });
          });
        }

        static setAvatarIcon(name, sprite, cb) {
          this.loadSpriteFrameRes(`textures/avatar/${name}`).then(sf => {
            if (sprite && isValid(sprite)) {
              sprite.spriteFrame = sf;
              cb && cb();
            } else {
              console.log("sprite is null");
            }
          });
        }

        static getMap(level, cb) {
          let levelStr = 'map'; //前面补0

          if (level >= 100) {
            levelStr += level;
          } else if (level >= 10) {
            levelStr += '0' + level;
          } else {
            levelStr += '00' + level;
          }

          this.loadRes(`map/config/${levelStr}`, null, (err, txtAsset) => {
            if (err) {
              cb(err, txtAsset);
              return;
            }

            let content = '';

            if (txtAsset._file) {
              if (window['LZString']) {
                content = window['LZString'].decompressFromEncodedURIComponent(txtAsset._file);
              }

              var objJson = JSON.parse(content);
              cb(null, objJson);
            } else if (txtAsset.text) {
              if (window['LZString']) {
                content = window['LZString'].decompressFromEncodedURIComponent(txtAsset.text);
              }

              var objJson = JSON.parse(content);
              cb(null, objJson);
            } else if (txtAsset.json) {
              cb(null, txtAsset.json);
            } else {
              cb('failed');
            }
          });
        }

        static getUIPrefabRes(prefabPath, cb) {
          this.loadRes("prefab/ui/" + prefabPath, Prefab, cb);
        }

        static createUI(path, cb, parent) {
          this.getUIPrefabRes(path, function (err, prefab) {
            if (err) return;
            var node = instantiate(prefab);
            node.setPosition(0, 0, 0);

            if (!parent) {
              parent = find("Canvas");
            }

            parent.addChild(node);
            cb && cb(null, node);
          });
        }

        static getUICar(name, cb) {
          this.loadRes(`prefab/ui/car/uiCar${name}`, Prefab, cb);
        }

        static getCar(name, cb) {
          this.loadRes(`prefab/car/car${name}`, Prefab, cb);
        }

        static setCarIcon(name, sprite, isBlack, cb) {
          let path = `gamePackage/texture/car/car${name}`;

          if (isBlack) {
            path += 'Black';
          }

          this.setSpriteFrame(path, sprite, cb);
        }

        static getJsonData(fileName, cb) {
          resources.load("datas/" + fileName, function (err, content) {
            if (err) {
              error(err.message || err);
              return;
            }

            if (content.json) {
              cb(err, content.json);
            } else {
              cb('failed!!!');
            }
          });
        }

        static getData(fileName, cb) {
          resources.load("datas/" + fileName, function (err, content) {
            if (err) {
              error(err.message || err);
              return;
            }

            var text = content.text;

            if (!text) {
              resources.load(content.nativeUrl, function (err, content) {
                text = content;
                cb(err, text);
              });
              return;
            }

            cb(err, text);
          });
        }

        static setSpriteFrame(path, sprite, cb) {
          // sprite.node.active = false;
          this.loadRes(path + '/spriteFrame', SpriteFrame, (err, spriteFrame) => {
            if (err) {
              console.error('set sprite frame failed! err:', path, err);
              cb(err);
              return;
            }

            if (sprite && isValid(sprite)) {
              sprite.spriteFrame = spriteFrame; // sprite.node.active = true;

              cb(null);
            }
          });
        }
        /**
         * 获取顾客预制体
         *
         * @static
         * @param {string} name
         * @param {Function} cb
         * @memberof resourceUtil
         */


        static getCustomer(name, cb) {
          this.loadRes(`gamePackage/map/customer/customer${name}`, Prefab, cb);
        }

        static setCustomerIcon(name, sprite, cb) {
          let path = `gamePackage/texture/head/head${name}`;
          this.setSpriteFrame(path, sprite, cb);
        }

        static getEffect(name, cb) {
          this.loadRes(`prefab/effect/${name}`, Prefab, cb);
        }
        /**
        * sprite置灰或者复原
        *
        * @param {object} node
        * @param {boolean} flag
        */


        static setGray(node, flag) {
          var sprites = node.getComponentsInChildren(SpriteComponent);

          for (var i = 0; i < sprites.length; ++i) {
            var sprite = sprites[i];

            if (flag) {
              sprite.color = new Color(255, 255, 255, 255);
            } else {
              sprite.color = new Color(124, 124, 124, 255);
            }
          }
        }
        /**
         * 获取帽子prefab
         * @param name 帽子名称
         * @param cb 
         * @returns 
         */


        static getHat(name) {
          return new Promise((resolve, reject) => {
            this.loadRes(`prefab/model/hat/${name}`, Prefab, (err, prefab) => {
              if (err) {
                console.error('model load failed', name);
                reject && reject();
                return;
              }

              resolve && resolve(prefab);
            });
          });
        }
        /**
        * 获取鞋子prefab
        * @param name 鞋子名称
        * @param cb 
        * @returns 
        */


        static getShoes(name) {
          return new Promise((resolve, reject) => {
            this.loadRes(`prefab/model/shoes/${name}`, Prefab, (err, prefab) => {
              if (err) {
                console.error('model load failed', name);
                reject && reject();
                return;
              }

              resolve && resolve(prefab);
            });
          });
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=3f117d277fe9683e9afaaf7a95886c9d833c8bfb.js.map
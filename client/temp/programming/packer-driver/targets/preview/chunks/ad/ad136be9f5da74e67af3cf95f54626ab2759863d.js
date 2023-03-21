System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5", "__unresolved_6", "__unresolved_7"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Animation, PolygonCollider2D, RigidBody2D, UITransformComponent, v2, v3, Vec3, _decorator, clientEvent, Constant, AnimMario, MarioStatus, baseCollider, brick, whyBrick, roleManager, _dec, _class, _crd, ccclass, property, mario;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  function _reportPossibleCrUseOfclientEvent(extras) {
    _reporterNs.report("clientEvent", "../../../framework/clientEvent", _context.meta, extras);
  }

  function _reportPossibleCrUseOfConstant(extras) {
    _reporterNs.report("Constant", "../../../framework/constant", _context.meta, extras);
  }

  function _reportPossibleCrUseOfAnimMario(extras) {
    _reporterNs.report("AnimMario", "../../../framework/enum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfMarioStatus(extras) {
    _reporterNs.report("MarioStatus", "../../../framework/enum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfbaseCollider(extras) {
    _reporterNs.report("baseCollider", "../../collider/baseCollider", _context.meta, extras);
  }

  function _reportPossibleCrUseOfbrick(extras) {
    _reporterNs.report("brick", "../../pieces/brick", _context.meta, extras);
  }

  function _reportPossibleCrUseOfwhyBrick(extras) {
    _reporterNs.report("whyBrick", "../../pieces/whyBrick", _context.meta, extras);
  }

  function _reportPossibleCrUseOfroleManager(extras) {
    _reporterNs.report("roleManager", "../roleManager", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      Animation = _cc.Animation;
      PolygonCollider2D = _cc.PolygonCollider2D;
      RigidBody2D = _cc.RigidBody2D;
      UITransformComponent = _cc.UITransformComponent;
      v2 = _cc.v2;
      v3 = _cc.v3;
      Vec3 = _cc.Vec3;
      _decorator = _cc._decorator;
    }, function (_unresolved_2) {
      clientEvent = _unresolved_2.clientEvent;
    }, function (_unresolved_3) {
      Constant = _unresolved_3.Constant;
    }, function (_unresolved_4) {
      AnimMario = _unresolved_4.AnimMario;
      MarioStatus = _unresolved_4.MarioStatus;
    }, function (_unresolved_5) {
      baseCollider = _unresolved_5.baseCollider;
    }, function (_unresolved_6) {
      brick = _unresolved_6.brick;
    }, function (_unresolved_7) {
      whyBrick = _unresolved_7.whyBrick;
    }, function (_unresolved_8) {
      roleManager = _unresolved_8.roleManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "ac806RwbEREQ4dNVm/s+bLI", "mario", undefined);

      __checkObsolete__(['Animation', 'BoxCollider2D', 'Collider2D', 'Component', 'IPhysics2DContact', 'PolygonCollider2D', 'RigidBody2D', 'tween', 'UITransformComponent', 'v2', 'v3', 'Vec3', '_decorator']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("mario", mario = (_dec = ccclass('mario'), _dec(_class = class mario extends (_crd && baseCollider === void 0 ? (_reportPossibleCrUseOfbaseCollider({
        error: Error()
      }), baseCollider) : baseCollider) {
        constructor() {
          super(...arguments);
          this._anim = undefined;
          this._rigidbody2d = undefined;
          this._speed = -1;
          this._speedHalf = 0.5;
          this._isMoving = false;
          this._isLeft = false;
          this._isJumping = false;
          this._jumpPoint = new Vec3();
          this._status = 0;
          this._isDeath = false;
          this._lastColliderName = "";
        }

        start() {
          super.start();

          this._init();

          this._addListener();
        }

        _addListener() {
          (_crd && clientEvent === void 0 ? (_reportPossibleCrUseOfclientEvent({
            error: Error()
          }), clientEvent) : clientEvent).on((_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
            error: Error()
          }), Constant) : Constant).EVENT_TYPE.Move, this._evtStartMove, this);
          (_crd && clientEvent === void 0 ? (_reportPossibleCrUseOfclientEvent({
            error: Error()
          }), clientEvent) : clientEvent).on((_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
            error: Error()
          }), Constant) : Constant).EVENT_TYPE.Stop, this._evtStop, this);
          (_crd && clientEvent === void 0 ? (_reportPossibleCrUseOfclientEvent({
            error: Error()
          }), clientEvent) : clientEvent).on((_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
            error: Error()
          }), Constant) : Constant).EVENT_TYPE.Jump, this._evtJump, this);
          (_crd && clientEvent === void 0 ? (_reportPossibleCrUseOfclientEvent({
            error: Error()
          }), clientEvent) : clientEvent).on((_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
            error: Error()
          }), Constant) : Constant).EVENT_TYPE.MarioDeath, this._evtPlayMarioDeath, this);
        }

        onDestroy() {
          (_crd && clientEvent === void 0 ? (_reportPossibleCrUseOfclientEvent({
            error: Error()
          }), clientEvent) : clientEvent).off((_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
            error: Error()
          }), Constant) : Constant).EVENT_TYPE.Move, this._evtStartMove, this);
          (_crd && clientEvent === void 0 ? (_reportPossibleCrUseOfclientEvent({
            error: Error()
          }), clientEvent) : clientEvent).off((_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
            error: Error()
          }), Constant) : Constant).EVENT_TYPE.Stop, this._evtStop, this);
          (_crd && clientEvent === void 0 ? (_reportPossibleCrUseOfclientEvent({
            error: Error()
          }), clientEvent) : clientEvent).off((_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
            error: Error()
          }), Constant) : Constant).EVENT_TYPE.Jump, this._evtJump, this);
          (_crd && clientEvent === void 0 ? (_reportPossibleCrUseOfclientEvent({
            error: Error()
          }), clientEvent) : clientEvent).off((_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
            error: Error()
          }), Constant) : Constant).EVENT_TYPE.MarioDeath, this._evtPlayMarioDeath, this);
        }

        _init() {
          this._speed = (_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
            error: Error()
          }), Constant) : Constant).MoveSpeed / 2;

          this._loadAnimComponent();

          this._loadRigidBody2d();

          this.playIdle();
        }

        _loadAnimComponent() {
          return new Promise(resolve => {
            this._anim = this.node.getComponent(Animation);
            resolve(null);
          });
        }

        _loadRigidBody2d() {
          return new Promise(resolve => {
            this._rigidbody2d = this.node.getComponent(RigidBody2D);
            resolve(null);
          });
        }

        update(deltaTime) {
          if (this._isMoving) {
            console.log(deltaTime);
            var pos = this.node.getPosition();
            pos.x += deltaTime * this._speed * 50;
            this.node.setPosition(pos);
            var scale = this.node.getScale();
            scale.x = this._speed * Math.abs(scale.x);
            this.node.setScale(scale);
          } // if (this._isDeath) return;
          // if(Constant.FinishedGame){
          //     this._speed = this._speedHalf;
          // }
          // //移动状态
          // let pos = this.node.getPosition();
          // if (this._isMoving) {
          //     let scale = this.node.getScale();
          //     let offset = 0;
          //     if (this._isLeft) {
          //         pos.x -= this._speed;
          //         offset = -this._speed;
          //         scale.x = -Math.abs(scale.x);
          //     }
          //     else {
          //         offset = +this._speed;
          //         pos.x += this._speed;
          //         scale.x = Math.abs(scale.x);
          //     }
          //     if (pos.x <= 8) { pos.x = 8; }
          //     if(pos.x>=Constant.CurMapWidth - 8){pos.x = Constant.CurMapWidth - 8;}
          //     this.node.setPosition(pos);
          //     this.node.setScale(scale);
          //     clientEvent.dispatchEvent(Constant.EVENT_TYPE.MoveCamera, [pos, offset]);
          // }
          // if (pos.y < -40) {
          //     this._evtPlayMarioDeath(true);
          //     return;
          // }
          // //起跳状态
          // if (this._isJumping) {
          //     let pos = this.node.getPosition();
          //     if (pos.y <= this._jumpPoint.y + 1) {
          //         this._isJumping = false;
          //         if (!this._isMoving) {
          //             this.playIdle();
          //         }
          //         else {
          //             this.playWalk();
          //         }
          //     }
          // }

        }

        playIdle() {
          var _this = this;

          return _asyncToGenerator(function* () {
            if (_this._isDeath) return;

            if (!_this._anim) {
              yield _this._loadAnimComponent();
            }

            _this._status = (_crd && MarioStatus === void 0 ? (_reportPossibleCrUseOfMarioStatus({
              error: Error()
            }), MarioStatus) : MarioStatus).idle;
            _this._isJumping = false;

            _this._anim.play((_crd && AnimMario === void 0 ? (_reportPossibleCrUseOfAnimMario({
              error: Error()
            }), AnimMario) : AnimMario).idle);
          })();
        }

        playWalk() {
          var _this2 = this;

          return _asyncToGenerator(function* () {
            if (_this2._isDeath) return;
            if (_this2._status == (_crd && MarioStatus === void 0 ? (_reportPossibleCrUseOfMarioStatus({
              error: Error()
            }), MarioStatus) : MarioStatus).walk) return;

            if (!_this2._anim) {
              yield _this2._loadAnimComponent();
            }

            _this2._status = (_crd && MarioStatus === void 0 ? (_reportPossibleCrUseOfMarioStatus({
              error: Error()
            }), MarioStatus) : MarioStatus).walk;

            _this2._anim.play((_crd && AnimMario === void 0 ? (_reportPossibleCrUseOfAnimMario({
              error: Error()
            }), AnimMario) : AnimMario).walk);
          })();
        }

        _evtPlayMarioDeath(isDown) {
          var _this3 = this;

          return _asyncToGenerator(function* () {
            if (isDown === void 0) {
              isDown = false;
            }

            if (_this3._isDeath) return;

            if (!_this3._anim) {
              yield _this3._loadAnimComponent();
            }

            _this3.node.getComponent(PolygonCollider2D).destroy();

            _this3._status = (_crd && MarioStatus === void 0 ? (_reportPossibleCrUseOfMarioStatus({
              error: Error()
            }), MarioStatus) : MarioStatus).death;

            _this3._anim.play((_crd && AnimMario === void 0 ? (_reportPossibleCrUseOfAnimMario({
              error: Error()
            }), AnimMario) : AnimMario).death);

            _this3._isDeath = true;

            var pos = _this3.node.getPosition();

            _this3.node.setPosition(v3(pos.x, pos.y + 2, pos.z));

            if (isDown) {
              _this3._rigidbody2d.applyForce(v2(0, 2800), v2(0, 0), true);
            } else {
              _this3._rigidbody2d.applyForce(v2(0, 1300), v2(0, 0), true);
            } //刷新复活点


            (_crd && roleManager === void 0 ? (_reportPossibleCrUseOfroleManager({
              error: Error()
            }), roleManager) : roleManager).Inst.updateAlivePoint(pos); //先让他复活

            _this3.scheduleOnce(() => {
              _this3.node.destroy(); // roleManager.Inst.addMarioToMap();


              (_crd && clientEvent === void 0 ? (_reportPossibleCrUseOfclientEvent({
                error: Error()
              }), clientEvent) : clientEvent).dispatchEvent((_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
                error: Error()
              }), Constant) : Constant).EVENT_TYPE.TranslateScenes);
            }, 2);
          })();
        }

        playSwim() {
          var _this4 = this;

          return _asyncToGenerator(function* () {
            if (_this4._isDeath) return;

            if (!_this4._anim) {
              yield _this4._loadAnimComponent();
            }

            _this4._status = (_crd && MarioStatus === void 0 ? (_reportPossibleCrUseOfMarioStatus({
              error: Error()
            }), MarioStatus) : MarioStatus).swim;

            _this4._anim.play((_crd && AnimMario === void 0 ? (_reportPossibleCrUseOfAnimMario({
              error: Error()
            }), AnimMario) : AnimMario).swim);
          })();
        }

        playJump() {
          var _this5 = this;

          return _asyncToGenerator(function* () {
            if (_this5._isDeath) return;

            if (!_this5._anim) {
              yield _this5._loadAnimComponent();
            }

            var pos = _this5.node.getPosition();

            _this5._jumpPoint = pos;
            _this5._status = (_crd && MarioStatus === void 0 ? (_reportPossibleCrUseOfMarioStatus({
              error: Error()
            }), MarioStatus) : MarioStatus).jump;

            _this5._anim.play((_crd && AnimMario === void 0 ? (_reportPossibleCrUseOfAnimMario({
              error: Error()
            }), AnimMario) : AnimMario).jump);
          })();
        }
        /**
         * 左右移动
         * @param pos 
         */


        _evtStartMove(pos) {
          if (!this._isMoving || this._status != (_crd && MarioStatus === void 0 ? (_reportPossibleCrUseOfMarioStatus({
            error: Error()
          }), MarioStatus) : MarioStatus).walk) {
            this.playWalk();
          }

          this._isMoving = true;
          this._isLeft = false;

          if (pos.x < 0) {
            this._isLeft = true;
          }

          this._speed = pos.x < 0 ? -1 : 1;
        }

        _evtStop() {
          this._isMoving = false;
          this.playIdle();
        }
        /**
         * 跳，给一个向上的force
         */


        _evtJump() {
          var _this6 = this;

          return _asyncToGenerator(function* () {
            if (!_this6._rigidbody2d) {
              yield _this6._loadRigidBody2d();
            }

            if (_this6._isJumping) {
              return;
            }

            _this6._isJumping = true;

            _this6.playJump();

            var pos = _this6.node.getPosition();

            _this6.node.setPosition(v3(pos.x, pos.y + 2, pos.z));

            _this6._rigidbody2d.applyForce(v2(0, 950), v2(0, 0), true);
          })();
        }
        /**
         * 与砖头上面接触
         */


        handleColliderUp() {
          this._isJumping = false;

          if (this._isMoving) {
            this.playWalk();
          } else {
            this.playIdle();
          }
        }
        /**
         * 碰撞检测
         * @param selfCollider  
         * @param otherCollider 
         * @param contact 
         */


        onBeginContact(selfCollider, otherCollider, contact) {
          // 只在两个碰撞体开始接触时被调用一次
          var name1 = selfCollider.node.name;
          var name2 = otherCollider.node.name;
          if (name2 == this._lastColliderName) return;
          this._lastColliderName = name2;

          if (name2.includes("tower")) {}

          if ((_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
            error: Error()
          }), Constant) : Constant).FinishedGame) return;

          if (name2.includes("flag")) {
            this._check_gameOver();
          }

          if (name1.includes("mario") && name2.includes("wall")) {
            var bk = otherCollider.node.getComponent(_crd && brick === void 0 ? (_reportPossibleCrUseOfbrick({
              error: Error()
            }), brick) : brick);
            var points = contact.getWorldManifold().points;

            if (bk) {
              if (points.length > 0) {
                var cPos = points[0];
                var bPos = otherCollider.node.getWorldPosition();

                if (cPos.y <= bPos.y - 8) {
                  (_crd && clientEvent === void 0 ? (_reportPossibleCrUseOfclientEvent({
                    error: Error()
                  }), clientEvent) : clientEvent).dispatchEvent((_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
                    error: Error()
                  }), Constant) : Constant).EVENT_TYPE.BrickMove + bk.index, bk.index);
                } else if (cPos.y >= bPos.y + 8) {
                  var mar = selfCollider.node.getComponent(mario);
                  mar.handleColliderUp();
                }
              }
            }
          } else if (name1.includes("mario") && name2.includes("coin")) {
            var _bk = otherCollider.node.getComponent(_crd && whyBrick === void 0 ? (_reportPossibleCrUseOfwhyBrick({
              error: Error()
            }), whyBrick) : whyBrick);

            var _points = contact.getWorldManifold().points;

            if (_bk) {
              if (_points.length > 0) {
                var _cPos = _points[0];

                var _bPos = otherCollider.node.getWorldPosition();

                if (_cPos.y <= _bPos.y - 8) {
                  (_crd && clientEvent === void 0 ? (_reportPossibleCrUseOfclientEvent({
                    error: Error()
                  }), clientEvent) : clientEvent).dispatchEvent((_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
                    error: Error()
                  }), Constant) : Constant).EVENT_TYPE.TopWhy + _bk.index, _bk.index);
                } else if (_cPos.y >= _bPos.y + 8) {
                  var _mar = selfCollider.node.getComponent(mario);

                  _mar.handleColliderUp();
                }
              }
            }
          } else if (name1.includes("mario") && name2.includes("hole")) {
            var ut = otherCollider.node.getComponent(UITransformComponent);
            var _points2 = contact.getWorldManifold().points;

            if (ut) {
              if (_points2.length > 0) {
                var _cPos2 = _points2[0];

                var _bPos2 = otherCollider.node.getWorldPosition();

                if (_cPos2.y >= _bPos2.y + ut.height / 2) {
                  var _mar2 = selfCollider.node.getComponent(mario);

                  _mar2.handleColliderUp();
                }
              }
            }
          } else if (name1.includes("mario") && name2.includes("ladder")) {
            var _mar3 = selfCollider.node.getComponent(mario);

            _mar3.handleColliderUp();
          }
        }

        _check_gameOver() {
          console.log("finished_game");
          (_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
            error: Error()
          }), Constant) : Constant).FinishedGame = true;
          (_crd && clientEvent === void 0 ? (_reportPossibleCrUseOfclientEvent({
            error: Error()
          }), clientEvent) : clientEvent).dispatchEvent((_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
            error: Error()
          }), Constant) : Constant).EVENT_TYPE.FinishedGame); // this.playIdle();
          // this.scheduleOnce(()=>{
          //     this.playWalk();
          //     let pos = this.node.getPosition();
          //     let nPos = v3(pos.x+270,20.7,pos.z);
          //     tween(this.node).to(2,{position:nPos}).call(()=>{}).start();
          // },1);
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=ad136be9f5da74e67af3cf95f54626ab2759863d.js.map
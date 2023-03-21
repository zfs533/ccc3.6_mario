System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5", "__unresolved_6", "__unresolved_7"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Animation, PolygonCollider2D, RigidBody2D, UITransform, v2, v3, Vec3, _decorator, clientEvent, Constant, AnimMario, EnumPhysicsGroup, MarioStatus, baseCollider, brick, whyBrick, roleManager, _dec, _class, _crd, ccclass, property, mario;

  function _reportPossibleCrUseOfclientEvent(extras) {
    _reporterNs.report("clientEvent", "../../../framework/clientEvent", _context.meta, extras);
  }

  function _reportPossibleCrUseOfConstant(extras) {
    _reporterNs.report("Constant", "../../../framework/constant", _context.meta, extras);
  }

  function _reportPossibleCrUseOfAnimMario(extras) {
    _reporterNs.report("AnimMario", "../../../framework/enum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEnumPhysicsGroup(extras) {
    _reporterNs.report("EnumPhysicsGroup", "../../../framework/enum", _context.meta, extras);
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
      UITransform = _cc.UITransform;
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
      EnumPhysicsGroup = _unresolved_4.EnumPhysicsGroup;
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

      __checkObsolete__(['Animation', 'BoxCollider2D', 'Collider2D', 'Component', 'IPhysics2DContact', 'PolygonCollider2D', 'RigidBody2D', 'tween', 'UITransform', 'v2', 'v3', 'Vec3', '_decorator']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("mario", mario = (_dec = ccclass('mario'), _dec(_class = class mario extends (_crd && baseCollider === void 0 ? (_reportPossibleCrUseOfbaseCollider({
        error: Error()
      }), baseCollider) : baseCollider) {
        constructor(...args) {
          super(...args);
          this._anim = undefined;
          this._rigidbody2d = undefined;
          this._speed = -1;
          this._speedHalf = 0.5;
          this._isMoving = false;
          this._jumpPoint = new Vec3();
          this._status = 0;
          this._isDeath = false;
          this._lastColliderName = "";
        }

        start() {
          super.start();

          this._init();

          this._addListener();

          this.setPhysicsGroup((_crd && EnumPhysicsGroup === void 0 ? (_reportPossibleCrUseOfEnumPhysicsGroup({
            error: Error()
          }), EnumPhysicsGroup) : EnumPhysicsGroup).mario);
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
          (_crd && clientEvent === void 0 ? (_reportPossibleCrUseOfclientEvent({
            error: Error()
          }), clientEvent) : clientEvent).on((_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
            error: Error()
          }), Constant) : Constant).EVENT_TYPE.ChangeStatus, this._evtChangeStatus, this);
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
          (_crd && clientEvent === void 0 ? (_reportPossibleCrUseOfclientEvent({
            error: Error()
          }), clientEvent) : clientEvent).off((_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
            error: Error()
          }), Constant) : Constant).EVENT_TYPE.ChangeStatus, this._evtChangeStatus, this);
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
          if (this._isDeath) return;

          if (this._isMoving) {
            let pos = this.node.getPosition();
            let speed = deltaTime * this._speed * 250;
            pos.x += speed;

            if (pos.x <= 8) {
              pos.x = 8;
            }

            if (pos.x >= (_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
              error: Error()
            }), Constant) : Constant).CurMapWidth - 8) {
              pos.x = (_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
                error: Error()
              }), Constant) : Constant).CurMapWidth - 8;
            }

            this.node.setPosition(pos);
            let scale = this.node.getScale();
            let gap = this._speed > 0 ? 1 : -1;
            scale.x = gap * Math.abs(scale.x);
            this.node.setScale(scale);
            (_crd && clientEvent === void 0 ? (_reportPossibleCrUseOfclientEvent({
              error: Error()
            }), clientEvent) : clientEvent).dispatchEvent((_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
              error: Error()
            }), Constant) : Constant).EVENT_TYPE.MoveCamera, [pos, speed]);
          }

          let pos = this.node.getPosition();

          if (pos.y < -40) {
            this._evtPlayMarioDeath(true);

            return;
          }

          switch (this._status) {
            case (_crd && MarioStatus === void 0 ? (_reportPossibleCrUseOfMarioStatus({
              error: Error()
            }), MarioStatus) : MarioStatus).jump:
              // console.log(pos.y,this._jumpPoint.y)
              // console.log(Math.abs(pos.y - this._jumpPoint.y))
              if (Math.abs(pos.y - this._jumpPoint.y) < 3) {
                if (this._isMoving) {
                  this.playWalk();
                } else {
                  this.playIdle();
                }
              }

              break;

            case (_crd && MarioStatus === void 0 ? (_reportPossibleCrUseOfMarioStatus({
              error: Error()
            }), MarioStatus) : MarioStatus).finish:
              this._speed = this._speedHalf;
              break;

            case (_crd && MarioStatus === void 0 ? (_reportPossibleCrUseOfMarioStatus({
              error: Error()
            }), MarioStatus) : MarioStatus).idle:
              this.playIdle();
              break;

            case (_crd && MarioStatus === void 0 ? (_reportPossibleCrUseOfMarioStatus({
              error: Error()
            }), MarioStatus) : MarioStatus).walk:
              break;

            default:
              break;
          }
        }

        async playIdle() {
          if (!this._anim) {
            await this._loadAnimComponent();
          }

          if (!this._isCandoAction((_crd && MarioStatus === void 0 ? (_reportPossibleCrUseOfMarioStatus({
            error: Error()
          }), MarioStatus) : MarioStatus).idle)) return;

          this._anim.play((_crd && AnimMario === void 0 ? (_reportPossibleCrUseOfAnimMario({
            error: Error()
          }), AnimMario) : AnimMario).idle);
        }

        async playWalk() {
          if (!this._anim) {
            await this._loadAnimComponent();
          }

          if (!this._isCandoAction((_crd && MarioStatus === void 0 ? (_reportPossibleCrUseOfMarioStatus({
            error: Error()
          }), MarioStatus) : MarioStatus).walk)) return;

          this._anim.play((_crd && AnimMario === void 0 ? (_reportPossibleCrUseOfAnimMario({
            error: Error()
          }), AnimMario) : AnimMario).walk);
        }

        async _evtPlayMarioDeath(isDown = false) {
          if (this._isDeath) return;

          if (!this._anim) {
            await this._loadAnimComponent();
          }

          this.node.getComponent(PolygonCollider2D).destroy();
          this._status = (_crd && MarioStatus === void 0 ? (_reportPossibleCrUseOfMarioStatus({
            error: Error()
          }), MarioStatus) : MarioStatus).death;

          this._anim.play((_crd && AnimMario === void 0 ? (_reportPossibleCrUseOfAnimMario({
            error: Error()
          }), AnimMario) : AnimMario).death);

          this._isDeath = true;
          let pos = this.node.getPosition();
          this.node.setPosition(v3(pos.x, pos.y + 2, pos.z));

          if (isDown) {
            this._rigidbody2d.applyForce(v2(0, 2800), v2(0, 0), true);
          } else {
            this._rigidbody2d.applyForce(v2(0, 1300), v2(0, 0), true);
          } //刷新复活点


          (_crd && roleManager === void 0 ? (_reportPossibleCrUseOfroleManager({
            error: Error()
          }), roleManager) : roleManager).Inst.updateAlivePoint(pos); //先让他复活

          this.scheduleOnce(() => {
            this.node.destroy();
            (_crd && clientEvent === void 0 ? (_reportPossibleCrUseOfclientEvent({
              error: Error()
            }), clientEvent) : clientEvent).dispatchEvent((_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
              error: Error()
            }), Constant) : Constant).EVENT_TYPE.TranslateScenes);
          }, 2);
        }

        async playSwim() {
          if (!this._anim) {
            await this._loadAnimComponent();
          }

          if (!this._isCandoAction((_crd && MarioStatus === void 0 ? (_reportPossibleCrUseOfMarioStatus({
            error: Error()
          }), MarioStatus) : MarioStatus).swim)) return;

          this._anim.play((_crd && AnimMario === void 0 ? (_reportPossibleCrUseOfAnimMario({
            error: Error()
          }), AnimMario) : AnimMario).swim);
        }

        async playJump() {
          if (!this._anim) {
            await this._loadAnimComponent();
          }

          let pos = this.node.getPosition();
          this._jumpPoint = v3(pos.x, pos.y, pos.z);
          pos.y += 5;
          this.node.setPosition(pos);
          if (!this._isCandoAction((_crd && MarioStatus === void 0 ? (_reportPossibleCrUseOfMarioStatus({
            error: Error()
          }), MarioStatus) : MarioStatus).jump)) return;

          this._anim.play((_crd && AnimMario === void 0 ? (_reportPossibleCrUseOfAnimMario({
            error: Error()
          }), AnimMario) : AnimMario).jump);

          this._rigidbody2d.applyForce(v2(0, 950), v2(0, 0), true);
        }
        /**
         * 判断当前动作是否可以执行
         * @param status 
         * @returns 
         */


        _isCandoAction(status) {
          if (this._isDeath) return false;
          if (this._status == (_crd && MarioStatus === void 0 ? (_reportPossibleCrUseOfMarioStatus({
            error: Error()
          }), MarioStatus) : MarioStatus).death) return false;
          if (this._status == status) return false;
          this._status = status;
          return true;
        }
        /**
         * 左右移动
         * @param pos 
         */


        _evtStartMove(pos) {
          if (!this._isMoving || this._status != (_crd && MarioStatus === void 0 ? (_reportPossibleCrUseOfMarioStatus({
            error: Error()
          }), MarioStatus) : MarioStatus).walk) {
            if (this._status != (_crd && MarioStatus === void 0 ? (_reportPossibleCrUseOfMarioStatus({
              error: Error()
            }), MarioStatus) : MarioStatus).jump) {
              this.playWalk();
            }
          }

          this._isMoving = true;
          this._speed = pos.x < 0 ? -1 : 1;
        }

        _evtStop() {
          this._isMoving = false;
          this.playIdle();
        }
        /**
         * 跳，给一个向上的force
         */


        async _evtJump() {
          if (!this._rigidbody2d) {
            await this._loadRigidBody2d();
          }

          if (this._status == (_crd && MarioStatus === void 0 ? (_reportPossibleCrUseOfMarioStatus({
            error: Error()
          }), MarioStatus) : MarioStatus).jump) {
            return;
          }

          this.playJump();
        }
        /**
         * 与砖头上面接触
         */


        handleColliderUp() {
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
          let name1 = selfCollider.node.name;
          let name2 = otherCollider.node.name;
          if (name2 == this._lastColliderName) return;
          this._lastColliderName = name2;

          if (this._status == (_crd && MarioStatus === void 0 ? (_reportPossibleCrUseOfMarioStatus({
            error: Error()
          }), MarioStatus) : MarioStatus).jump) {
            this.handleColliderUp(); //起跳过程中发生碰撞，直接改变状态
          }

          if (name2.includes("tower")) {
            (_crd && roleManager === void 0 ? (_reportPossibleCrUseOfroleManager({
              error: Error()
            }), roleManager) : roleManager).Inst.nextLevel();
          }

          if ((_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
            error: Error()
          }), Constant) : Constant).FinishedGame) return;

          if (name2.includes("flag")) {
            this._check_gameOver();
          }

          if (name1.includes("mario") && name2.includes("wall")) {
            let bk = otherCollider.node.getComponent(_crd && brick === void 0 ? (_reportPossibleCrUseOfbrick({
              error: Error()
            }), brick) : brick);
            let points = contact.getWorldManifold().points;

            if (bk) {
              if (points.length > 0) {
                let cPos = points[0];
                let bPos = otherCollider.node.getWorldPosition();

                if (cPos.y <= bPos.y - 8) {
                  (_crd && clientEvent === void 0 ? (_reportPossibleCrUseOfclientEvent({
                    error: Error()
                  }), clientEvent) : clientEvent).dispatchEvent((_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
                    error: Error()
                  }), Constant) : Constant).EVENT_TYPE.BrickMove + bk.index, bk.index);
                } else if (cPos.y >= bPos.y + 8) {// let mar = selfCollider.node.getComponent(mario);
                  // mar.handleColliderUp();
                }
              }
            }
          } else if (name1.includes("mario") && name2.includes("coin_brick")) {
            let bk = otherCollider.node.getComponent(_crd && whyBrick === void 0 ? (_reportPossibleCrUseOfwhyBrick({
              error: Error()
            }), whyBrick) : whyBrick);
            let points = contact.getWorldManifold().points;

            if (bk) {
              if (points.length > 0) {
                let cPos = points[0];
                let bPos = otherCollider.node.getWorldPosition();

                if (cPos.y <= bPos.y - 8) {
                  (_crd && clientEvent === void 0 ? (_reportPossibleCrUseOfclientEvent({
                    error: Error()
                  }), clientEvent) : clientEvent).dispatchEvent((_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
                    error: Error()
                  }), Constant) : Constant).EVENT_TYPE.TopWhy + bk.index, bk.index);
                } else if (cPos.y >= bPos.y + 8) {// let mar = selfCollider.node.getComponent(mario);
                  // mar.handleColliderUp();
                }
              }
            }
          } else if (name1.includes("mario") && name2.includes("hole")) {
            let ut = otherCollider.node.getComponent(UITransform);
            let points = contact.getWorldManifold().points;

            if (ut) {
              if (points.length > 0) {
                let cPos = points[0];
                let bPos = otherCollider.node.getWorldPosition();

                if (cPos.y >= bPos.y + ut.height / 2) {// let mar = selfCollider.node.getComponent(mario);
                  // mar.handleColliderUp();
                }
              }
            }
          } else if (name1.includes("mario") && name2.includes("ladder")) {// let mar = selfCollider.node.getComponent(mario);
            // mar.handleColliderUp();
          }
        }

        _check_gameOver() {
          (_crd && Constant === void 0 ? (_reportPossibleCrUseOfConstant({
            error: Error()
          }), Constant) : Constant).FinishedGame = true;
          this.playWalk();
          this._status = (_crd && MarioStatus === void 0 ? (_reportPossibleCrUseOfMarioStatus({
            error: Error()
          }), MarioStatus) : MarioStatus).finish;
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

        _evtChangeStatus(status) {
          this._status = status;
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=1127a5d67350da7f1c49742cd05bbf7c5e9ed947.js.map
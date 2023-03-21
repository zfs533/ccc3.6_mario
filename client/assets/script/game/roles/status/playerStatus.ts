import { _decorator, Component, Node } from 'cc';
import { EnumPlayerStatus } from '../../../framework/enum';
import { mario } from '../mario/mario';
import { BaseStatus } from './baseStatus';
const { ccclass, property } = _decorator;

@ccclass('PlayerStatus')
export class PlayerStatus extends BaseStatus {
    private _player:mario = null;
      constructor(player:mario){
        super();
        this._player = player;
      }
      protected changeStatus(status: EnumPlayerStatus): void {
        super.changeStatus(status);
        if(this._status == status){return;}
        switch(status){
          case EnumPlayerStatus.idle:
            break;
          case EnumPlayerStatus.walk:
            break;
          case EnumPlayerStatus.jump:
            break;
          case EnumPlayerStatus.death:
            break;
        }
      }
      public getStatus(): EnumPlayerStatus {
        return super.getStatus();
      }
}


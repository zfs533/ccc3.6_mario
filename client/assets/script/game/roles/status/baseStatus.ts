import { _decorator, Component, Node } from 'cc';
import { EnumPlayerStatus } from '../../../framework/enum';
const { ccclass, property } = _decorator;

@ccclass('BaseStatus')
export class BaseStatus {
    protected _status:EnumPlayerStatus = EnumPlayerStatus.idle;
      protected changeStatus(status:EnumPlayerStatus){
        if(this._status == status){return;}
        this._status = status;
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
    
      protected getStatus(){
        return this._status;
      }
}


import { _decorator, Component, Node, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('translateScens')
export class translateScens extends Component {
    start() {
        this.scheduleOnce(()=>{
            director.loadScene("mario");
        },0.2)
    }

    update(deltaTime: number) {
        
    }
}


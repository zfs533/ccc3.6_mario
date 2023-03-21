import { _decorator, Component, Node, v3 } from 'cc';
const { ccclass, property } = _decorator;

export interface EnemyData{
    id:string;
    walk:string;
    death:string;
    path:string;
}
@ccclass('cfgEnemy')
export class cfgEnemy{
    public static data = [
        {
            id:"enemy1001",walk:"e1walk",death:"e1death"
        },
        {
            id:"enemy2001",walk:"e2walk",death:"e2death",path:"textures/roles/enemy/e2/4_0"
        },
        {
            id:"enemy2002",walk:"e3walk",death:"e3death",path:"textures/roles/enemy/e2/4_1"
        },
        {
            id:"enemy2003",walk:"e4walk",death:"e4death",path:"textures/roles/enemy/e2/4_2"
        },
        {
            id:"enemy3001",walk:"walk3001",death:"death3001"
        },
        {
            id:"enemy3002",walk:"walk3002",death:"death3002"
        },
        {
            id:"enemy3003",walk:"walk3003",death:"death3003"
        },
    ]

    public static getEnemyData(id:string):EnemyData{
        let res;
        this.data.forEach(item=>{
            if(item.id == id){
                res = item;
            }
        })
        return res;
    }
}


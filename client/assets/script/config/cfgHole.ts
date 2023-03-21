
import { v3 } from "cc";

export default class cfgHole{
    public static data = {
        "map1_1":{
            map:"map1_1",
            reLifePos:[v3(2308,186,0)]//井底活动结束出去后原地图的出身点
        },
        "map1_1_1":{
            map:"map1_1_1",
            reLifePos:[v3(80,750,0)],
            // reLifePos:[v3(2308,186,0)//井底活动结束出去后原地图的出身点
        },
        "map1_2_1":{
            map:"map1_2_1",
            reLifePos:[v3(80,750,0),v3(4742,21,0)]
        },
        "map1_2_1_0":{
            map:"map1_2_1",
            reLifePos:[v3(4635,90,0)]
        },
        "map1_2_2":{
            map:"map1_2_2",
            reLifePos:[v3(80,750,0)]
        },
        "map1_2_3":{
            map:"map1_2_3",
            reLifePos:[v3(40,21,0)]
        }
    }

    /**
     * 获取下井后的地图导航
     * @param index 
     * @returns 
     */
    public static getHoleMapDown(index:number){
        var arr = [
            "no",
            "map1_1",
            "map1_1_1",
            "map1_2_1",
            "map1_2_1_0",
            "map1_2_2",
            "map1_2_3",
        ];
        let mapName = arr[index];
        return this.data[mapName];
    }
}
import { v3 } from "cc";

export default class cfgLevel{
    public static data = {
        "1":{
            "1":[
                {
                    map:"map1_1",
                    // reLifePos:[v3(7300,750,0),v3(3580,750,0)]       //test
                    reLifePos:[v3(400,750,0),v3(3400,750,0)]
                },
            ],
            "2":[
                {
                    map:"map1_2",
                    reLifePos:[v3(240,21,0)]
                },
            ],
            "3":[
                {
                    map:"map1_3",
                    reLifePos:[v3(150,750,0)]
                }
            ],
            "4":[
                {
                    map:"map1_4",
                    reLifePos:[v3(45,323,0)]
                }
            ]
        }
    }
}
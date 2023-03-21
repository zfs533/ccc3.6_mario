import { map } from "../game/ui/map/map";
import { MarioBodyStatus } from "./enum";

export class Constant {
    //事件列表
    public static EVENT_TYPE = {
        Move: 'Move',
        Jump: "Jump",
        MoveCamera: "MoveCamera",
        MoveJoystick: "MoveJoyStick",
        Stop: 'Stop',
        StopCamera: 'StopCamera',
        BrickMove: "brickMove",
        TopWhy: "TopWhy",
        CoinRemove: "CoinRemove",
        MarioDeath: "MarioDeath",
        ChangeStatus: "ChangeStatus",
        AddToMap: "AddToMap",
        TranslateScenes:"TranslateScenes",
        InitCameraPos:"InitCameraPos",
        FinishedGame:"FinishedGame",
        HoleGetDown:"HoleGetDown",
        EnablePhysics:"EnablePhysics",
        MushRoomDestroy:"MushRoomDestroy",
    }

    public static MoveSpeed: number = 10;
    public static MapScale: number = 2.5;
    public static CurMap: map = null;
    public static CurMapWidth:number = 0;
    public static FinishedGame:boolean = false;
    public static BodyStatus:MarioBodyStatus = MarioBodyStatus.normal;
}
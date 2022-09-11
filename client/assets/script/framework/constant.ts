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
    }

    public static MoveSpeed: number = 10;
    public static MapScale: number = 1;
}
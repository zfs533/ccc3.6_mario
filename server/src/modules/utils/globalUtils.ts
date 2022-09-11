/**
 * 消息格式
 */
export interface ModelAny {
    code?: number,
    msg?: any,
    err?: any,
}

/**
 * 协议头信息
 */
export interface Head {
    /* 唯一标示id */
    id: number,
    /* 服务器类型 */
    serverType: number,
    router: string,
}
/* ----------- user -----------*/
/**
 * 玩家信息
 */
export interface User {
    id: number,
    x: number,
    y: number,
    z: number,
}

/**
 * 帧同步数据
 */
export interface FrameInfo {
    id: number,
    arr: Position[],
}
export interface Position {
    x: number,
    y: number,
    z: number,
}


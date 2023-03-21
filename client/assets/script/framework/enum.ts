export enum AnimMario {
    idle = "mario_idle",
    walk = "mario_walk",
    death = "mario_death",
    swim = "mario_swim",
    jump = "mario_jump",
}

export enum ResourcePath {
    textureBrick = "textures/brick/",
}

export enum whyType {
    normal = 0,
    mushroom = 1,
}

export enum RoleEnum {
    mario = "mario",
    enemyBlack = "enemy1001",
}

export enum MarioStatus {
    idle = 0,
    walk = 1,
    death = 2,
    swim = 3,
    jump = 4,
    finish = 5,
}

export enum MarioBodyStatus {
    normal = 0,
    huge = 1,
}

export enum EnumPlayerStatus{
    idle = 0,
    walk = 1,
    death = 2,
    swim = 3,
    jump = 4,
    finish = 5,
}

export enum EnumHole{
    normal = 0,
    canDown = 1,
    canLeftIn = 2,
}

//物理分组
export enum EnumPhysicsGroup{
    default = 1 << 0,
    mario = 1 << 1,
    brick = 1 << 2,
    why = 1 << 3,
    mushroom = 1 << 4,
    enemy = 1 << 5,
    hole = 1 << 6,
}

//下井后的地图导航
export enum EnumHoleMap{
    nono = 0,
    map1_1,
    map1_1_1,
    map1_2_1,
    map1_2_1_0,
    map1_2_2,
    map1_2_3,
}

export enum EnumEnemyStatus {
    stand = 0,
    walk  = 1,
    run   = 2,
    death = 3,
}

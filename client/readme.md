# 开发日志
### 基础框架(通用)
- cocoscreator3.3.0
- - 自定义网络连接（websocket）
- - CSV配置文件加载
- - 事件系统
- - 对象池系统
- - 本地存储系统
- - 本地文件动态加载系统
- - 工具类

### mario
- 马里奥与爬虫碰撞
  - 通过碰撞时马里奥的y坐标与爬虫位置来决定谁死
  - 马里奥y>=爬虫y+爬虫高度，爬虫死
  - 反之马里奥死

- 复活点
  - 固定几个复活点，复活位置定在前一个复活点
  - 每通过一个复活点，更新当前复活点为最新复活点
  - 同时设置摄像机位置
- 起点/终点摄像机停止移动

## 状态机器
### eg : 待机 、行走 、跳跃 、死亡 。。。
- 待机状态
  - 可以触发哪些动作
    - 行走
    - 跳跃
    - 死亡
  - 不能触发哪些动作
    - 无
- 行走状态
  - 可以触发哪些动作
    - 停下待机
    - 跳跃
    - 死亡
  - 不能触发哪些动作
    - 无
- 跳跃状态
  - 可以触发哪些动作
    - 前后移动，但不能播放行走动画
    - 死亡
  - 不能触发哪些动作
    - 二次跳跃
- 死亡状态
  - 可以触发哪些动作
    - 无，直接播放死亡game over
  - 不能触发哪些动作
    - 待机
    - 行走
    - 跳跃
    - 二次死亡
  ## 使用状态控制的方式重写移动和起跳
  - 移除原始的布尔值控制
  - 记录地板的水平Y值

  ## 切换场景，转到下一关
  - 通关大小关及子关卡循环遍历的方式来决定下一关应该加载那张地图

  ## 金币碰撞和销毁有问题，刚体/碰撞组件
  - 先给个0.00000001的定时器解决问题，比即可也少不了多少嘛，哈哈
  ## 物理分組 Physics Group
  - mario
  - brick
  - why
  - mushroom
  - enemy   
  - hole      //只于mario产生碰撞

  ## 进下水道
  -  //点击向下键，遥感竖直向下，TODO
  - 将物理碰撞的enable设置为false,角色掉下去，切换场景（设置一下物理变量，使其掉下去掉的慢一点）;


## 切换关卡配置
- 起点，重生点，结束点
- 主线地图配置
   - 只配一张地图，通关终点给特殊标志，目前先通过碰撞检测来
- 可以下去的深井，深井需要配置/绑定mapId
   - 将地图绑定到可以下去的井上
   - 绑定地图同样需要起点，重生点，重点，以及出来后的位置设定
   - 可以通过的井都绑定地图
   - 重写切换关卡设置地图信息
   - 当前测试关卡map1-1，下井map1-1-1，来回都OK
## 关卡怪物配置
- 关联地图，怪物类型，出身位置，活动范围

## 数值UI
- 开始，结束，通关成功，通关失败

## 走通所有关卡（第一大关，四个小关）
- 下一步
   - 1：制作monster
   - 2: 配置monster出身地等信息
   - 3: 编写mongsterAI逻辑
   - 4: 制作滑梯以及编写相关逻辑
## 2023-01-29
- 升级3.7
- cfgEnemy.ts
- baseCollider基类中添加动态设置物理分组方法
## 2023-01-31
- 怪物设置动作状态机，怪物运动速度根据状态改变而改变
- 新建普通乌龟怪物脚本
## 2023-02-15
- 解决跳跃状态持续问题，在跳跃状态与其他任何物体发生碰撞，就改变角色的状态为idle或walk
```typescript
let name1 = selfCollider.node.name;
let name2 = otherCollider.node.name;
if(name2 == this._lastColliderName)return;
this._lastColliderName = name2;
if(this._status == MarioStatus.jump){
  this.handleColliderUp();//起跳过程中发生碰撞，直接改变状态
}
```
## 2023-03-15
- 乌龟碰撞
- 切图
- - tommorm
  - 吃蘑菇变大
  - 吃太阳花发射子弹
<!-- 签到 -->
<template>
    <div class="checkin flex-container">
        <div class="flex-safe-top"></div>
        <div class="top">
            <van-nav-bar left-arrow @click-left="onClickBack" title="签到" right-text="签到规则" style="z-index: 1000;  width: 100%;" :placeholder="true" @click-right="onClickRight">
            </van-nav-bar>
        </div>
        <div class="content">
            <div class="scroll-container check-in-container">
                <div class="center-content ">
                    <div class="img-checkin-spr img-checkin-spr-checkinbg top-bgimg"></div>
                    <div ref="center-up" class="center-item">
                        <div class="title-bar1">
                            <div class="img-checkin-spr img-checkin-spr-wz1"></div>
                        </div>
                        <div class="center-itemdiv">
                            <div class="checkin-day-item" v-for="i in 4" :key="i" :class="onCheckItemClass(i)">
                                <div class="tomorrow" v-if="(continueDays+1) == i && isCheckInToDay">
                                    <div class="img-checkin-spr img-checkin-spr-mr"></div>
                                </div>
                                <p class="font-title" v-if="continueDays < i" :class="((continueDays+1) == i && isCheckInToDay) && 'font-title3'">第{{i}}天</p>
                                <p class="font-title1" v-if="continueDays>=i">第{{i}}天</p>
                                <div class="img-checkin-spr img-checkin-spr-diamond diamond" style="z-index: 1000;" v-if="continueDays<i"></div>
                                <div class="img-checkin-spr img-checkin-spr-ylq finished" style="z-index: 1000;" v-if="continueDays>=i"></div>
                                <div class="rewardType" v-if="rewardType==='diamond' ">
                                    <p class="font-son" v-if="rewardList.length > 0" :class="continueDays>=i&&'font-son1'">{{rewardList[i-1]}}钻石</p>
                                </div>
                                <div class="rewardType" v-else>
                                    <p class="font-son" v-if="rewardList.length > 0" :class="continueDays>=i&&'font-son1'">{{rewardList[i-1]}}天vip</p>
                                </div>
                            </div>
                        </div>
                        <div class="center-itemdiv2">
                            <div class="checkin-day-item" v-for="i in 2" :key="i" :class="onCheckItemClass(i+4)">
                                <div class="tomorrow" v-if="(continueDays+5) == i && isCheckInToDay">
                                    <div class="img-checkin-spr img-checkin-spr-mr"></div>
                                </div>
                                <p class="font-title" v-if="continueDays<i+4" :class="((continueDays+1) == i+4 && isCheckInToDay) && 'font-title3'">第{{i+4}}天</p>
                                <p class="font-title1" v-if="continueDays>=(i+4)">第{{i+4}}天</p>
                                <div class="img-checkin-spr img-checkin-spr-diamond diamond" v-if="continueDays<(i+4)"></div>
                                <div class="img-checkin-spr img-checkin-spr-ylq finished" v-if="continueDays>=(i+4)"></div>
                                <div class="rewardType" v-if="rewardType==='diamond' ">
                                    <p class="font-son" v-if="rewardList.length > 0" :class="continueDays>=i+4&&'font-son1'">{{rewardList[(i+3)]}}钻石</p>
                                </div>
                                <div class="rewardType" v-else>
                                    <p class="font-son" v-if="rewardList.length > 0" :class="continueDays>=i+4&&'font-son1'">{{rewardList[(i+3)]}}天vip</p>
                                </div>
                            </div>
                            <div class="item-last" :class="onCheckItemClass(7)">
                                <div class="tomorrow" v-if="continueDays == 6 && isCheckInToDay">
                                    <div class="img-checkin-spr img-checkin-spr-mr"></div>
                                </div>
                                <p class="last-fonttitle" v-if="continueDays<7" :class="((continueDays+1) == 7 && isCheckInToDay) && 'font-title3'">第7天</p>
                                <p class="last-fonttitle1" v-if="continueDays>=7">第7天</p>
                                <p class="last-son">神秘大礼包</p>
                                <div class="img-checkin-spr img-checkin-spr-giftbox gift-box"></div>
                            </div>
                        </div>
                        <div class="checkin-button img-checkin-spr img-checkin-spr-siginbtn" v-if="!isCheckInToDay" @click="onClickCheckin">
                            立即签到
                        </div>
                        <div class="checkin-button img-checkin-spr img-checkin-spr-siginbtn2 disable" v-else>
                            今日已签到
                        </div>
                    </div>
                    <div class="checkin-center" v-if="taskList.length >0">
                        <!-- <div class="finishedTag" v-if="time<=0">
                            <div class="img-checkin-spr img-checkin-spr-finishedtag finishedTag1"></div>
                        </div> -->
                        <div class="title-bar1">
                            <div class="img-checkin-spr img-checkin-spr-wz2"></div>
                        </div>
                        <div class="down-time-div" v-if="time>0">
                            <span class="down-time-lb">倒计时：</span>
                            <van-count-down :time="time" format="DD 天 HH 时 mm 分 ss 秒" class="down-time" />
                        </div>
                        <div class="scroll-checkin">
                            <div v-for="(tastkeys,idxss) in taskList" :key="tastkeys.name">
                                <div class="csitem">
                                    <p class="cs-itemf1">{{tastkeys.name}}</p>
                                    <p class="cs-itemf2">+{{tastkeys.rewardCnt}}钻石</p>
                                    <div class="cs-itembtn" v-if="tastkeys.status == 'unfinished' && time>0" @click="onClickJump(idxss)">
                                        <div class="img-checkin-spr img-checkin-spr-but3"></div>
                                        <p class="cs-itemspan" v-if="time>0">去完成</p>
                                    </div>
                                    <div class="cs-itembtn2" v-if="tastkeys.status != 'unfinished' || time<=0" @click="onClickGetTaskReword(idxss)">
                                        <p class="cs-itemspan2" v-if="time>0">已完成</p>
                                        <p class="cs-itemspan2" v-if="time<=0">已结束</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <van-action-sheet v-model="isShowRule" title="签到规则">
                    <div class="checkin-bottom" id="checkinRule">
                        <p class="lb">1.连续签到7天，即可获得神秘大礼包</p>
                        <p class="lb">2.连续签到记录，在第8天开始时将清零计算</p>
                        <p class="lb">3.如果中断签到，连续领取记录也将清零</p>
                        <p class="lb">4.钻石可用于视频观看</p>
                    </div>
                </van-action-sheet>
            </div>
            <transition name="van-fade">
                <div class="checkin-dialog" v-if="isShowCheckOkDialog" @click="closeDialog">
                    <div class="sd-center">
                        <div class="title-bar1">
                            <div class="img-checkin-spr img-checkin-spr-bgsuccess"></div>
                        </div>
                        <p class="sd-font" v-if="rewardType==='diamond' ">获得 {{rewardsDiamod}} 颗钻石</p>
                        <p class="sd-font" v-if="rewardType==='vip' ">获得 {{rewardsDiamod}} 天vip</p>
                    </div>
                </div>
            </transition>
        </div>
        <div class="flex-safe-bottom"></div>
    </div>
</template>

<script>
import { pageMixin } from "~/assets/js/mixins";
const TaskType = {
    RechargeDiamond: "rechargeDiamond",
    OpenVip: "openVip",
    FirstConsumeDiamond: "firstConsumeDiamond",
    InvitedFriendsSuccess: "invitedFriendsSuccess",
};
export default {
    name: "checkIn",
    layout: "keepalive",
    mixins: [pageMixin],
    data() {
        return {
            taskActId: "",
            taskList: [],
            rewardList: [],
            isShowRule: false,
            isShowCheckOkDialog: false,
            isCheckInToDay: false,
            rewardsDiamod: 0,
            continueDays: 0,
            time: 0,
            rewardType: "diamod"
        };
    },
    mounted() {
        this.$parent.showTabbar = false;
        // this.hideAllItem();
        this.initCheckinData();
        this.initNewUserTask();
    },
    methods: {
        onClickBack() {
            this.$router.back();
        },
        showCurrentDay(day) {
            // this.hideAllItem();
            this.$nextTick(() => {
                // if (!this.isCheckInToDay && this.continueDays < 7) {
                //     if (this.$refs["item" + (this.continueDays + 1)]) {
                //         this.$refs["item" + (this.continueDays + 1)].style.border = '1.5px solid #000';
                //     }
                // }
                // if (day < 1) return;
                // for (let i = 1; i <= day; i++) {
                //     // this.$refs["item" + i].style.border = "1.5px solid #f5ac59";
                //     if (this.$refs["item" + i]) {
                //         this.$refs["item" + i].style.background = "linear-gradient(#ffc7d5, #ffa5c3)";
                //     }
                // }
                // if (this.isCheckInToDay && this.continueDays < 7) {
                //     if (this.$refs["itemp" + (this.continueDays + 1)]) {
                //         this.$refs["itemp" + (this.continueDays + 1)].style["margin-top"] = "1px";
                //     }
                // }
            });
        },
        hideAllItem() {
            document.querySelectorAll(".checkin .checkin-day-item").forEach((item) => {
                item.style.border = "none";
            });
        },
        //签到
        async onClickCheckin() {

            if (!this.$userStore.checkLogin()) {
                return;
            }

            let res = await this.$api.startCheckin();
            if (res.errorCode !== 0) {
                this.$toast("加载数据出错：" + res.message);
                return;
            }

            this.isCheckInToDay = true;
            this.continueDays = res.data.continueDays;

            let reward = res.data.reward;
            if (reward) {
                // if (reward.type === "diamond") {
                this.rewardsDiamod = reward.count;
                // }
            }
            this.isShowCheckOkDialog = true;
            this.$userStore.updateCheckInStatus(this.isCheckInToDay, this.continueDays);

            // this.showCurrentDay(this.continueDays);


            this.$userStore.updateUserInfo({
                diamond: res.data.diamond,
                vip: res.data.vip,
                vipEffectiveTime: res.data.vipEffectiveTime,
            });
        },
        //任务跳转
        onClickJump(idx) {
            if (!this.$userStore.checkLogin()) {
                return;
            }
            if (this.time <= 0) {
                return;
            }

            let type = this.taskList[idx].type;
            switch (type) {
                case TaskType.RechargeDiamond:
                    this.$router.push({
                        path: "/recharge?type=diamond"
                    });
                    break;
                case TaskType.OpenVip:
                    this.$router.push({
                        path: "/recharge?type=vip"
                    });
                    break;
                case TaskType.FirstConsumeDiamond:
                    this.$router.push({
                        path: "/filter",
                        name: "filter",
                        params: {
                            type: "diamond"
                        }
                    });
                    break;
                case TaskType.InvitedFriendsSuccess:
                    break;
            }
        },
        //领取任务奖励
        async onClickGetTaskReword(idx) {
            if (this.time <= 0) {
                return;
            }
            let actId = this.taskActId;
            let taskId = this.taskList[idx].id;
            let res = await this.$api.getNewUserReward(actId, taskId);
            if (res.errorCode !== 0) {
                this.$toast("加载数据出错：" + res.message);
                return;
            }
            if (this.rewardType === "vip") {
                this.$toast(`领取成功 +${this.taskList[idx].rewardCnt} 天Vip`);
            } else {
                this.$toast(`领取成功 +${this.taskList[idx].rewardCnt} 钻石`);

            }
            this.$api.updateMyInfo();
            this.initNewUserTask();
        },
        closeDialog() {
            this.isShowCheckOkDialog = false;
        },

        initCheckinData() {
            let siginData = this.$main.getCheckinActivityData();
            if (siginData) {
                console.log("initCheckinData", siginData);
                this.rewardList = siginData.rewardCntArr;

                this.isCheckInToDay = this.$userStore.getTodayCheckIn();
                let continueDays = this.$userStore.getCheckInDays();
                this.continueDays = continueDays;
                this.rewardType = siginData.rewardType;
                // this.showCurrentDay(this.continueDays);
            }
        },
        initNewUserTask() {
            let actLimitedData = this.$main.getLimitedActivityData();
            if (actLimitedData) {
                console.log("initNewUserTask:", actLimitedData.remainTime);
                this.taskList = actLimitedData.tasks;
                this.taskActId = actLimitedData.id;
                this.time = actLimitedData.remainTime;
            }
        },
        onClickRight() {
            this.isShowRule = true;
            // document.querySelector('.check-in-container').scrollTop = document.getElementById('checkinRule').offsetTop;
        },
        onCheckItemClass(index) {
            let strClass = "";
            if (!this.isCheckInToDay && this.continueDays == (index - 1))
                strClass += 'oragngeBorder ';
            if (this.isCheckInToDay && this.continueDays >= index)
                strClass += 'checkin-day-item1';
            return strClass;
        }
    },
}
</script>


<style lang="less" scoped>
.checkin {
    background: @common-color1;
}
.van-nav-bar {
    background: @common-color1;
}
.checkin-dialog {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: auto;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 2000;
    .sd-center {
        margin: auto;
        align-items: center;
        width: 100%;
        height: 350px;
        text-align: center;
    }
    .imgs-dbth {
        display: block;
        margin: auto;
        width: 250px;
        height: 55px;
        margin-top: -10px;
    }
    .img-sd {
        display: block;
        margin: auto;
        width: 85%;
    }
    .sd-font {
        font-size: 18px;
        color: @checkin-font-color7;
        margin-top: -155px;
    }
}

.top-bgimg {
    margin: 10px auto;
}

.checkin-button {
    text-align: center;
    margin: 10px auto 0 auto;
    display: flex;
    padding-bottom: 6px;
    justify-content: center;
    align-items: center;
    font-size: 0.45rem;
    color: @checkin-font-color6;
    &.disable {
        color: @theme-color2;
    }
    // .ftz {
    //     margin-top: 9px;
    //     font-size: 24px;
    //     color: #b43906;
    // }
}
.title-bar1 {
    display: flex;
    justify-content: center;
    margin: auto;
    padding-top: 20px;
    padding-bottom: 10px;
    width: 100%;
}
.title-bar-pop {
    display: flex;
    justify-content: center;
    margin-top: -5px;
    width: 100%;
}
.gift-box {
    margin-top: -12px;
    width: 70px;
    height: 64.5px;
    position: relative;
    left: 80px;
    bottom: 40px;
    background-size: calc(70 / 140 * 674px) calc(64.5 / 129 * 416px);
    background-position: calc(70 / 140 * -327px) calc(64.5 / 129 * -173px);
}
.last-son {
    margin-top: -5px;
    font-size: 14px;
    color: @checkin-font-color1;
    left: 10px;
    position: relative;
}
.last-fonttitle {
    margin-top: 6px;
    font-size: 16px;
    color: @checkin-font-color1;
    left: 10px;
    position: relative;
}
.last-fonttitle1 {
    margin-top: 6px;
    font-size: 16px;
    color: @checkin-font-color2;
    left: 10px;
    position: relative;
}

.diamond {
    display: block;
    margin: auto;
    margin-top: -8px;
    width: 37px;
    height: 32px;
}

.tomorrow {
    display: block;
    margin-top: -15px;
    margin-left: 35px;
}

.finished {
    display: block;
    margin: auto;
    margin-top: -18px;
    margin-bottom: 4px;
    width: 38px;
    height: 38px;
    background-size: calc(38 / 76 * 674px) calc(38 / 76 * 416px);
    background-position: calc(38 / 76 * -471px) calc(38 / 76 * -173px);
}

.font-title {
    margin-top: 6px;
    font-size: 16px;
    color: @checkin-font-color1;
}
.font-title1 {
    margin-top: 6px;
    font-size: 16px;
    color: @checkin-font-color2;
}
.font-title3 {
    margin-top: 1px;
}

.font-son {
    margin-top: -1px;
    font-size: 12px;
    color: @checkin-font-color1;
}
.font-son1 {
    color: @checkin-font-color2;
}
.center-content {
    width: 100%;
    align-items: center;
    // background-color: #1e1d1d;
}

.center-itemdiv2 {
    margin: 0;
    width: 100%;
    height: 100px;
    justify-content: center;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;

    .item-last {
        margin-left: 5px;
        margin-right: 5px;

        width: 150px;
        height: 90px;

        background-color: @checkin-bg-color1;
        // border: 1.5px solid;
        // border-color: @share-background-image-border;
        border-radius: 5px;
    }
}

.center-itemdiv {
    margin: 0 auto;
    width: 100%;
    height: 100px;
    justify-content: center;
    flex-wrap: wrap;
    display: flex;
    align-items: center;
}
.center-item {
    margin: 0 auto;
    width: 95%;
    height: 330px;
    background-color: @checkin-bg-color2;
    align-items: center;
    border: 1.5px solid @checkin-border-color2;
    border-radius: 10px;
    .img {
        width: 80px;
        height: 100px;
    }

    .checkin-day-item {
        text-align: center;
        margin-left: 5px;
        margin-right: 5px;
        flex-direction: column;
        align-items: center;
        vertical-align: middle;

        width: 70px;
        height: 90px;
        background-color: @checkin-bg-color1;
        // border: 1.5px solid;
        // border-color: @share-background-image-border;
        border-radius: 5px;
    }
    .checkin-day-item1 {
        height: 90px;
        // margin-top: -96px;
        background-image: @checkin-bg-color3;
        border-radius: 5px;
    }
}

.oragngeBorder {
    border: 1.5px solid;
    border-color: @checkin-border-color1;
    border-radius: 5px;
}

.oragngeBorder1 {
    background-color: @checkin-bg-color3;
}

.checkin-bottom {
    margin: 0 auto;
    margin-bottom: 10px;
    width: 95%;
    height: 170px;
    align-items: center;

    .img2 {
        display: block;
        margin: auto;
        padding-top: 20px;
        padding-bottom: 10px;
        width: 60%;
        margin-bottom: -10px;
    }
    .lb {
        margin-bottom: -10px;
        font-size: 14px;
        color: @checkin-font-color3;
        position: relative;
        left: 20px;
    }
}

.checkin-center {
    margin: 20px auto;
    width: 95%;
    height: 330px;
    background-color: @checkin-bg-color2;
    align-items: center;
    border: 1.5px solid;
    border-color: @checkin-border-color2;
    border-radius: 10px;

    .finishedTag {
        width: 100%;
        height: 0px;
        display: flex;
        justify-content: right;
    }
    .finishedTag1 {
        margin-top: 9px;
        margin-right: 0px;
    }

    .scroll-checkin {
        height: 70%;
        width: 100%;
        overflow: hidden;
        overflow-y: overlay;
        -webkit-overflow-scrolling: touch;
    }

    .csitem {
        margin: 10px auto;
        width: 95%;
        height: 60px;
        background-color: @checkin-bg-color4;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .cs-itemf1 {
            font-size: 16px;
            text-align: left;
            color: @checkin-font-color1;
            padding-left: 10px;
        }
        .cs-itemf2 {
            font-size: 12px;
            text-align: center;
            color: @checkin-font-color3;
        }
        .cs-itembtn {
            display: block;
            width: 100px;
            height: 35px;
            margin-right: 10px;
        }
        .cs-itembtn2 {
            display: block;
            width: 100px;
            height: 38px;
            margin-right: 10px;
            background-color: @checkin-bg-color4;
            border: 1.5px solid;
            border-color: @theme-color2;
            border-radius: 25px;
        }
        .cs-itemspan {
            margin-top: -30px;
            width: 100px;
            position: relative;
            text-align: center;
            font-size: 16px;
            color: @checkin-font-color6;
        }
        .cs-itemspan2 {
            width: 100px;
            margin-top: 7px;
            text-align: center;
            font-size: 16px;
            color: @theme-color2;
        }
    }
    .down-time-div {
        display: flex;
        margin-left: 17px;
        justify-content: center;
        height: 16px;
        margin-top: -5px;
        .down-time-lb {
            font-size: 12px;
            color: @checkin-font-color4;
        }
        .down-time {
            font-size: 12px;
            color: @checkin-font-color4;
        }
    }
}

.flex-safe-top {
    height: var(--safe-top);
    position: fixed;
    width: 100%;
    background: @common-color1;
    top: 0;
}

.flex-safe-bottom {
    height: var(--safe-bottom);
    position: fixed;
    width: 100%;
    background: @common-color1;
    bottom: 0;
}
</style>
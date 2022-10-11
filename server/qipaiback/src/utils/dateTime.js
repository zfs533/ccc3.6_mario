import { dateTimeFmLocal } from "./formatter";
export function getBeforeDate(flag, day, minute) {
    if (flag == "date") {
        let now = new Date();
        let startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - day, 0, 0, 0);
        let endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
        return [dateTimeFmLocal(startDate), dateTimeFmLocal(endDate)];
    }
    else if (flag == "time") {
        let d, s;
        let addZero = value => { return value < 10 ? `0${value}` : value; };
        d = new Date(new Date().getTime() - minute * 60 * 1000);
        s = `${d.getFullYear()}-`;
        s = `${s}${addZero(d.getMonth() + 1)}-`;
        s += `${addZero(d.getDate())} `;
        s += `${addZero(d.getHours())}:`;
        s += `${addZero(d.getMinutes())}:`;
        s += `${addZero(d.getSeconds())}`;
        return s;
    }
}
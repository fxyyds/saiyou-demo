export const getTimeDescription = (timestamp) => {
    const now = new Date().getTime();
    timestamp = new Date(timestamp).getTime();
    const diff = now - timestamp;
    const seconds = Math.floor(diff / 1000);
    if (seconds < 20 || seconds <= 0) {
        return "刚刚";
    }
    if (seconds > 20 && seconds < 60) {
        return `${seconds}秒前`;
    }
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
        return `${minutes}分钟前`;
    }
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
        return `${hours}小时前`;
    }
    const days = Math.floor(hours / 24);
    if (days < 30) {
        return `${days}天前`;
    }
    const months = Math.floor(days / 30);
    if (months < 12) {
        return `${months}个月前`;
    }
    const years = Math.floor(months / 12);
    return `${years}年前`;
}

export const listOfFriendsTime = (timeString) => {
    const date = new Date(timeString);
    const currentDate = new Date();

    const isSameDay = date.getDate() === currentDate.getDate() && date.getMonth() === currentDate.getMonth() && date.getFullYear() === currentDate.getFullYear();
    return isSameDay ? (date.getHours() + ":" + date.getMinutes()) : (date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate());
}

export const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const hour = ("0" + date.getHours()).slice(-2);
    const minute = ("0" + date.getMinutes()).slice(-2);
    const second = ("0" + date.getSeconds()).slice(-2);
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

export function isThreeDaysAgo(dateString) {
    // 将传入的时间字符串转换为Date对象
    var createTime = new Date(dateString);

    // 获取当前时间
    var now = new Date();
    // 计算三天前的时间
    var threeDaysAgo = new Date(now.getTime() - (3 * 24 * 60 * 60 * 1000));
    // 比较createTime和threeDaysAgo
    return createTime <= threeDaysAgo;
}

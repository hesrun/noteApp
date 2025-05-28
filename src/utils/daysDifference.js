const getDaysDifference = (dateString) => {
    const now = new Date();
    const targetDate = new Date(dateString);

    now.setHours(0, 0, 0, 0);
    targetDate.setHours(0, 0, 0, 0);

    const diffInMs = targetDate - now;
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    return Math.round(diffInDays);
};
export default getDaysDifference;

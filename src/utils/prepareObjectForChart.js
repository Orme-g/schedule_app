function transformDateStringToHoursNumber(dateString) {
    if (!dateString) {
        return null;
    }
    const date = new Date(dateString);
    return date.getHours() + date.getMinutes() / 60;
}
function transformDateToDisplay(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
    });
}

function prepareObjectForChart(object) {
    const output = object.map((item) => ({
        employee: item.employee,
        date: transformDateToDisplay(item.DateTimePlanFrom),
        planStart: transformDateStringToHoursNumber(item.DateTimePlanFrom),
        planEnd: transformDateStringToHoursNumber(item.DateTimePlanTo),
        factStart: transformDateStringToHoursNumber(item.DateTimeFactFrom),
        factEnd: transformDateStringToHoursNumber(item.DateTimeFactTo),
    }));
    return output;
}

export default prepareObjectForChart;

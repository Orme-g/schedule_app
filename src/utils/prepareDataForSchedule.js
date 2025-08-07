import { nanoid } from "nanoid";

const todayIs = "2025-07-16T10:00:00+03:00";

function getTime(dateISOString) {
    return dateISOString ? new Date(dateISOString).getTime() : null;
}
function getHours(dateISOString) {
    return dateISOString
        ? new Date(dateISOString).toLocaleTimeString("ru-RU", {
              hour: "2-digit",
              minute: "2-digit",
          })
        : null;
}
function checkIfPast(dateISOString) {
    const compareDate = new Date(dateISOString);
    const todayDate = new Date(todayIs);
    compareDate.setHours(0, 0, 0, 0);
    todayDate.setHours(0, 0, 0, 0);
    return todayDate > compareDate;
}

function prepareDataForSchedule(data) {
    const id = nanoid();
    const {
        employee,
        role,
        store,
        DateTimeFactFrom,
        DateTimeFactTo,
        DateTimePlanFrom,
        DateTimePlanTo,
    } = data;
    const date = new Date(DateTimePlanFrom).toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
    });
    const fullDate = new Date(DateTimePlanFrom).toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
    });
    const timePlanFrom = getTime(DateTimePlanFrom);
    const timePlanTo = getTime(DateTimePlanTo);
    const hoursPlanFrom = getHours(DateTimePlanFrom);
    const hoursPlanTo = getHours(DateTimePlanTo);
    const timeFactFrom = getTime(DateTimeFactFrom);
    const timeFactTo = getTime(DateTimeFactTo);
    const hoursFactFrom = getHours(DateTimeFactFrom);
    const hoursFactTo = getHours(DateTimeFactTo);
    const isPast = checkIfPast(DateTimePlanFrom);
    const isLate = timeFactFrom ? timeFactFrom > timePlanFrom : null;
    const isLeftEarly = timeFactTo ? timeFactTo < timePlanTo : null;
    const isMissing = isPast && !hoursFactFrom && !hoursFactTo;
    return {
        [date]: {
            id,
            employee,
            role,
            store,
            fullDate,
            isLate,
            isLeftEarly,
            isMissing,
            planStart: hoursPlanFrom,
            planEnd: hoursPlanTo,
            factStart: hoursFactFrom,
            factEnd: hoursFactTo,
            isPast,
        },
    };
}

export default prepareDataForSchedule;

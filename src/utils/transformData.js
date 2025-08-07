function transformData(data) {
    const { plan, fact } = data;
    const combinedMap = new Map();
    plan.forEach((item) => {
        const date = item.DateTimePlanFrom.split("T")[0];
        const key = `${item.employee}_${date}`;
        combinedMap.set(key, item);
    });
    fact.forEach((item) => {
        if (!item.DateTimeFactFrom) {
            return;
        }
        const date = item.DateTimeFactFrom.split("T")[0];
        const key = `${item.employee}_${date}`;
        const existingValue = combinedMap.get(key);
        if (existingValue) {
            existingValue.DateTimeFactFrom = item.DateTimeFactFrom;
            existingValue.DateTimeFactTo = item.DateTimeFactTo;
        }
    });

    const groupped = new Map();
    combinedMap.forEach((item) => {
        const { employee } = item;
        if (!groupped.get(employee)) {
            groupped.set(employee, []);
        }
        groupped.get(employee).push(item);
    });
    return Array.from(groupped.values());
}
export default transformData;

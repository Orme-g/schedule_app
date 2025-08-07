function splitChartDataByNumber(array, number = 7) {
    let output = [];
    for (let i = 0; i < array.length; i += number) {
        let arrayPart = array.slice(i, i + number);
        output.push(arrayPart);
    }
    return output;
}

export default splitChartDataByNumber;

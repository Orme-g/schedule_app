import { useState, useEffect, useCallback } from "react";
import transformData from "../../utils/transformData";
import WorkingSchedule from "../../components/workingSchedule/WorkingSchedule";
import ChartBoard from "../../components/chartBoard/ChartBoard";
import ScheduleFilter from "../../components/scheduleFilter/ScheduleFilter";
import ShiftData from "../../components/shiftData/ShiftData";
import splitChartDataByNumber from "../../utils/splitChartDataByNumber";
import { store } from "../../store/store";

import "./SchedulePage.scss";
import prepareObjectForChart from "../../utils/prepareObjectForChart";

const SchedulePage = () => {
    const [prepearedData, setPrepearedData] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(null);
    const [filteredMonth, setFilteredMonth] = useState(null);
    const [filterPeriod, setFilterPeriod] = useState();
    const [chartboardData, setChartboardData] = useState(null);
    const [selectedEmployeeName, setSelectedEmployeeName] = useState(null);
    const setEmployee = store((state) => state.setSelectedEmployee);
    useEffect(() => {
        fetch("/data/database.json")
            .then((data) => data.json())
            .then((data) => {
                setPrepearedData(transformData(data));
            });
    }, []);
    useEffect(() => {
        fetch("/data/july.json")
            .then((data) => data.json())
            .then((data) => {
                setCurrentMonth(data);
                setFilteredMonth(data);
                setFilterPeriod({ start: 0, end: data.length - 1 });
            });
    }, []);

    const handleSelectEmployee = useCallback(
        (employee) => {
            if (employee === selectedEmployeeName) {
                return;
            }
            setSelectedEmployeeName(employee);
            prepearedData.forEach((item) => {
                if (item[0].employee === employee) {
                    const dataForChartboard = prepareObjectForChart(item);
                    const filteredData = dataForChartboard.filter(({ date }) => {
                        const compareDate = Number(date.split(".")[0]);
                        return (
                            compareDate >= filterPeriod.start + 1 &&
                            compareDate <= filterPeriod.end + 1
                        );
                    });
                    const splittedData = splitChartDataByNumber(filteredData);
                    setChartboardData(splittedData);
                }
            });
        },
        [selectedEmployeeName, prepearedData, filterPeriod]
    );
    function applyFilter(filterStart, filterEnd) {
        setFilterPeriod({ start: filterStart, end: filterEnd });
        let filteredData = currentMonth.slice(filterStart, filterEnd + 1);
        setFilteredMonth(filteredData);
        setChartboardData(null);
        setSelectedEmployeeName(null);
        setEmployee(null);
    }

    if (!prepearedData || !currentMonth) {
        return;
    }

    const chartboards = chartboardData?.map((data, index) => (
        <div key={index} className="chartboard-item">
            <ChartBoard employeeData={data} />
        </div>
    ));

    return (
        <div className="schedule-page">
            <h1>График работы сотрудников</h1>
            <div className="schedule-page__filter">
                <ScheduleFilter currentMonth={currentMonth} applyFilter={applyFilter} />
            </div>
            <div className="schedule-page__working-schedule">
                <WorkingSchedule
                    monthData={filteredMonth}
                    employeesData={prepearedData}
                    handleSelectEmployee={handleSelectEmployee}
                />
            </div>
            <div className="schedule-page__shift-data">
                <ShiftData />
            </div>
            <div className="schedule-page__chartboards">
                {chartboards ? (
                    chartboards
                ) : (
                    <div className="schedule-page__notice">
                        Нажмите на имя сотрудника для визуализации графика смен
                    </div>
                )}
            </div>
        </div>
    );
};

export default SchedulePage;

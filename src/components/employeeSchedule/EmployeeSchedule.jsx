import { useMemo } from "react";
import ScheduleCell from "../scheduleCell/ScheduleCell";
import { store } from "../../store/store";
import "./EmployeeSchedule.scss";

const EmployeeSchedule = ({ employeeName, employeeData, monthData, handleSelectEmployee }) => {
    console.log("Parent Render!");
    const { selectedId, selectedEmployee } = store();
    const setSelectedEmployee = store((state) => state.setSelectedEmployee);
    const isSelectedEmployee =
        employeeName && selectedEmployee && employeeName === selectedEmployee
            ? "highlight-name"
            : "";
    function handleClick() {
        handleSelectEmployee(employeeName);
        setSelectedEmployee(employeeName);
    }
    const cumulativeData = useMemo(() => {
        return employeeData.reduce((prev, next) => ({ ...prev, ...next }));
    }, [employeeData]);
    const toDisplay = monthData.map(({ date }) => {
        const cellData = cumulativeData[date];
        let id;
        if (cellData) {
            id = cellData.id;
        }
        const isSelectedId = id === selectedId;
        return <ScheduleCell key={date} cellData={cellData} isSelected={isSelectedId} />;
    });
    return (
        <div className="employee-schedule__employee-data">
            <div className="name-wrapper">
                <div
                    onClick={handleClick}
                    className={`employee-schedule__employee-name ${isSelectedEmployee}`}
                >
                    {employeeName}
                </div>
            </div>

            {toDisplay}
        </div>
    );
};

export default EmployeeSchedule;

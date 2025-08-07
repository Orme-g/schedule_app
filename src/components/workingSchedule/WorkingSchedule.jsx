import { memo } from "react";
import EmployeeSchedule from "../employeeSchedule/EmployeeSchedule";
import prepareDataForSchedule from "../../utils/prepareDataForSchedule";
import "./WorkingSchedule.scss";

const WorkingSchedule = memo(({ monthData, employeesData, handleSelectEmployee }) => {
    const headerCells = monthData.map(({ date, weekday }) => (
        <div key={date} className="working-schedule__header-cell">
            <span>{weekday},</span>
            <span>{date}</span>
        </div>
    ));
    const schedules = employeesData.map((data, index) => {
        const dataForCell = data.map((item) => prepareDataForSchedule(item));
        const employeeName = data[0].employee;
        return (
            <EmployeeSchedule
                key={index}
                employeeName={employeeName}
                employeeData={dataForCell}
                monthData={monthData}
                handleSelectEmployee={handleSelectEmployee}
            />
        );
    });
    return (
        <div className="working-schedule">
            <div className="working-schedule__header">
                <div className="working-schedule__header-dates">{headerCells}</div>
            </div>

            <div className="schedule">{schedules}</div>
        </div>
    );
});

export default WorkingSchedule;

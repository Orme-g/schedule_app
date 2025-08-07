import { memo } from "react";
import { store } from "../../store/store";
import "./ScheduleCell.scss";

const ScheduleCell = memo(({ cellData, isSelected }) => {
    if (!cellData) {
        return <div className="schedule-cell empty-cell"></div>;
    }
    const { planStart, isLate, isLeftEarly, isPast, factStart, factEnd, id } = cellData;
    const setData = store((state) => state.setShiftData);
    const setSelectedId = store((state) => state.setSelectedId);
    function handleClick() {
        setData(cellData);
        setSelectedId(id);
    }

    let displayExtraClass = "";
    if (isPast && factStart && factEnd) {
        displayExtraClass = isLate || isLeftEarly ? "violation" : "no-violation";
    }
    if (isPast && !factStart && !factEnd) {
        displayExtraClass = "was-missing";
    }
    if (!isPast && planStart) {
        displayExtraClass = "future-plan";
    }
    return (
        <div
            onClick={handleClick}
            className={`schedule-cell ${displayExtraClass} ${isSelected ? "selected" : ""}`}
        ></div>
    );
});

export default ScheduleCell;

import { useState, useEffect } from "react";

import "./ScheduleFilter.scss";

const ScheduleFilter = ({ currentMonth, applyFilter }) => {
    const [filterStart, setFilterStart] = useState(0);
    const [filterEnd, setFilterEnd] = useState(currentMonth.length - 1);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    useEffect(() => {
        if (filterStart > filterEnd) {
            setButtonDisabled(true);
        } else {
            setButtonDisabled(false);
        }
    }, [filterEnd, filterStart]);
    const options = currentMonth.map((_, index) => {
        return (
            <option key={index} value={index}>
                {index + 1}
            </option>
        );
    });

    return (
        <div className="schedule-filter">
            <form>
                <label htmlFor="select-from">Отобразить график с:</label>
                <select
                    id="select-from"
                    onChange={(e) => setFilterStart(+e.target.value)}
                    value={filterStart}
                >
                    {options}
                </select>
                <label htmlFor="select-to">по:</label>
                <select
                    id="select-to"
                    onChange={(e) => setFilterEnd(+e.target.value)}
                    value={filterEnd}
                >
                    {options}
                </select>
            </form>

            <button
                className="schedule-page__button"
                disabled={buttonDisabled}
                onClick={() => applyFilter(filterStart, filterEnd)}
            >
                Применить
            </button>
        </div>
    );
};

export default ScheduleFilter;

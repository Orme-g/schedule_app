import { store } from "../../store/store";
import "./ShiftData.scss";

const ShiftData = () => {
    const data = store((state) => state.shiftData);
    if (!data) {
        return <div className="shift-data__notice">Нажмите на смену для отображения данных</div>;
    }
    const {
        employee,
        fullDate,
        store: shop,
        role,
        planStart,
        planEnd,
        factStart,
        factEnd,
        isLate,
        isLeftEarly,
        isMissing,
    } = data;
    let violations = [];
    if (isLate) {
        violations.push("Опоздание");
    }
    if (isLeftEarly) {
        violations.push("Ранний уход");
    }
    if (isMissing) {
        violations.push("Прогул");
    }
    const displayViolations = violations.map((item, index) => {
        return (
            <div key={index} className="shift-data__violation-item">
                {index + 1 + ". " + item}
            </div>
        );
    });

    return (
        <div className="shift-data">
            <div className="shift-data__title">Информация о смене</div>
            <div className="shift-data__content">
                <div className="shift-data__content-left">
                    <div className="shift-data__field">
                        <div className="shift-data__item">Сотрудник:</div>
                        <div className="shift-data__value">{employee}</div>
                    </div>
                    <div className="shift-data__field">
                        <div className="shift-data__item">Дата:</div>
                        <div className="shift-data__value">{fullDate}</div>
                    </div>
                    <div className="shift-data__field">
                        <div className="shift-data__item">Магазин:</div>
                        <div className="shift-data__value">{shop}</div>
                    </div>
                    <div className="shift-data__field">
                        <div className="shift-data__item">Должность:</div>
                        <div className="shift-data__value">{role}</div>
                    </div>
                </div>
                <div className="shift-data__content-right">
                    <div className="shift-data__field">
                        <div className="shift-data__item">Начало смены:</div>
                        <div className="shift-data__value">{planStart} (план)</div>
                    </div>
                    <div className="shift-data__field">
                        <div className="shift-data__item">Начало смены:</div>
                        <div className={`shift-data__value ${isLate ? "highlight-violation" : ""}`}>
                            {factStart ? factStart : "--:--"} (факт)
                        </div>
                    </div>
                    <div className="shift-data__field">
                        <div className="shift-data__item">Конец смены:</div>
                        <div className="shift-data__value">{planEnd} (план)</div>
                    </div>
                    <div className="shift-data__field">
                        <div className="shift-data__item">Конец смены:</div>
                        <div
                            className={`shift-data__value ${
                                isLeftEarly ? "highlight-violation" : ""
                            }`}
                        >
                            {factEnd ? factEnd : "--:--"} (факт)
                        </div>
                    </div>
                    <div className="shift-data__field">
                        <div className="shift-data__item">Нарушения:</div>
                        <div className="shift-data__value">
                            <div className="shift-data__violations-list">
                                {violations.length > 0 ? displayViolations : "Нет"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShiftData;

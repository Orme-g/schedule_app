import ChartItem from "../chartItem/ChartItem";

const START_HOUR = 8;
const END_HOUR = 19;
const HOUR_HEIGHT = 30;
const SVG_HEIGHT = (END_HOUR - START_HOUR) * HOUR_HEIGHT;
const GAP = 10;
const LABEL_WIDTH = 40;

const ChartBoard = ({ employeeData }) => {
    const getY = (hour) => SVG_HEIGHT - (hour - START_HOUR) * HOUR_HEIGHT;
    const getHeight = (to, from) => (to - from) * HOUR_HEIGHT;
    const key = employeeData[0].employee;
    const barWidth = window.innerWidth < 651 ? 30 : 50;
    const columnWidth = window.innerWidth < 651 ? 40 : 60;

    const chartsToRender = employeeData.map((data, index) => {
        const x = LABEL_WIDTH + index * (columnWidth + GAP);
        return (
            <ChartItem
                svgHeight={SVG_HEIGHT}
                key={index}
                x={x}
                data={data}
                getHeight={getHeight}
                getY={getY}
                barWidth={barWidth}
            />
        );
    });
    return (
        <div
            className="chartboard-wrapper"
            style={{
                overflow: "scroll",
            }}
        >
            <svg
                key={key}
                width={"100%"}
                height={SVG_HEIGHT + 20}
                style={{ background: "#e3eff9", borderRadius: "10px" }}
            >
                {Array.from({ length: END_HOUR - START_HOUR + 1 }, (_, i) => {
                    const hour = START_HOUR + i;
                    const y = getY(hour);
                    return (
                        <g key={hour}>
                            <line
                                x1={0}
                                x2={"100%"}
                                y1={y}
                                y2={y}
                                stroke="#99c7f1ff"
                                strokeWidth={1}
                            />
                            <text
                                x={2}
                                y={y + 2}
                                fontSize="11"
                                fill="#0b5497"
                                alignmentBaseline="after-edge"
                            >
                                {hour}:00
                            </text>
                        </g>
                    );
                })}
                <defs>
                    <pattern
                        id="diagonal-stripe-green"
                        patternUnits="userSpaceOnUse"
                        width="4"
                        height="4"
                        patternTransform="rotate(45)"
                    >
                        <line x1="0" y="0" x2="0" y2="8" stroke="#77da8cff" strokeWidth="3" />
                    </pattern>
                    <pattern
                        id="diagonal-stripe-red"
                        patternUnits="userSpaceOnUse"
                        width="4"
                        height="4"
                        patternTransform="rotate(45)"
                    >
                        <line x1="0" y="0" x2="0" y2="8" stroke="#e3697cff" strokeWidth="3" />
                    </pattern>
                </defs>

                {chartsToRender}
            </svg>
        </div>
    );
};

export default ChartBoard;

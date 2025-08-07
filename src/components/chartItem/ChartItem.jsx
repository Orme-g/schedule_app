const ChartItem = ({ data, getHeight, getY, x, svgHeight, barWidth }) => {
    const { planStart, planEnd, factStart, factEnd, date } = data;

    return (
        <>
            {/* План */}
            <rect x={x} y={getY(planEnd)} width={barWidth} height={0} fill="#d9d9d9ff">
                <animate
                    attributeName="height"
                    from="0"
                    to={getHeight(planEnd, planStart)}
                    begin="0.1s"
                    dur="0.4s"
                    fill="freeze"
                />
                <animate
                    attributeName="y"
                    from={getY(planStart)}
                    to={getY(planEnd)}
                    begin="0.1s"
                    dur="0.4s"
                    fill="freeze"
                />
            </rect>
            {/* Факт */}
            {factStart && factEnd && (
                <rect
                    x={x}
                    y={getY(factEnd)}
                    width={barWidth}
                    height={0}
                    fill="url(#diagonal-stripe-green)"
                >
                    <animate
                        attributeName="height"
                        from="0"
                        to={getHeight(factEnd, factStart)}
                        begin="0.5s"
                        dur="0.4s"
                        fill="freeze"
                    />
                    <animate
                        attributeName="y"
                        from={getY(factStart)}
                        to={getY(factEnd)}
                        begin="0.5s"
                        dur="0.4s"
                        fill="freeze"
                    />
                </rect>
            )}
            {/* Опоздание */}
            {factStart && factStart > planStart && (
                <rect
                    x={x}
                    y={getY(factStart)}
                    width={barWidth}
                    height={0}
                    fill="url(#diagonal-stripe-red)"
                >
                    <animate
                        attributeName="height"
                        from="0"
                        to={getHeight(factStart, planStart)}
                        begin="1s"
                        dur="0.3s"
                        fill="freeze"
                    />
                    <animate
                        attributeName="y"
                        from={getY(planStart)}
                        to={getY(factStart)}
                        begin="1s"
                        dur="0.3s"
                        fill="freeze"
                    />
                </rect>
            )}
            {/* Ранний уход */}
            {factEnd && factEnd < planEnd && (
                <rect
                    x={x}
                    y={getY(planEnd)}
                    width={barWidth}
                    height={0}
                    fill="url(#diagonal-stripe-red)"
                >
                    <animate
                        attributeName="height"
                        from="0"
                        to={getHeight(planEnd, factEnd)}
                        begin="1s"
                        dur="0.3s"
                        fill="freeze"
                    />
                    <animate
                        attributeName="y"
                        from={getY(factEnd)}
                        to={getY(planEnd)}
                        begin="1s"
                        dur="0.3s"
                        fill="freeze"
                    />
                </rect>
            )}
            <text
                x={x + barWidth / 2}
                y={svgHeight}
                fontSize="11"
                fill="#0b5497"
                textAnchor="middle"
            >
                {date}
            </text>
        </>
    );
};

export default ChartItem;

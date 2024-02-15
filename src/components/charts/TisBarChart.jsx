import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    ReferenceLine,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

import { isMobile } from '../../helpers/browser';
import {
    BarsTooltip,
    columnVariants,
    horizontalYaxisWidth,
    prepareAvgDeltaPctData,
    shortChartNames,
    verticalYaxisWidth,
} from '../../helpers/charts';
import { labels, t } from '../../helpers/dictionary';
import {
    currencyFormat,
    humanPctFormat,
    humanPctSignFormat,
    numFormat,
    wholeCurrencyFormat,
    wholeNumFormat,
} from '../../helpers/helpers';
import { separators } from '../../helpers/routes';

import HorizontalTick from './HorizontalTick';
import VerticalTick, { tickFontSize } from './VerticalTick';
import LastUpdateTag from '../general/LastUpdateTag';

import './Charts.scss';

function TisBarChart({
    barHeight,
    bars = columnVariants.inOut,
    buttonLink,
    buttonText,
    children,
    className = '',
    currency = false,
    data,
    diffFromAverage = false,
    disclaimer = null,
    lastUpdate = true,
    percent = false,
    scrollable = false,
    showSum = true,
    subtitle,
    timestamp,
    title,
    vertical = false,
}) {
    if (!data || !Array.isArray(data) || !data.length) {
        return null;
    }

    const dataKeys = bars.map((bar) => bar.key);
    const parsedData = diffFromAverage
        ? prepareAvgDeltaPctData(data, dataKeys)
        : data;

    const barElements = bars.map((bar) => (
        <Bar
            key={bar.key}
            dataKey={bar.key}
            fill={bar.color}
            name={t(bar.name)}
            label={bar.label ?? null}
            stackId={bar.stackId ?? null}
        >
            {parsedData.map((dataObj) => (
                <Cell
                    key={`cell-${dataObj[bar.key]}`}
                    fill={dataObj.color ?? bar.color}
                >
                    {bar.labelList ?? null}
                </Cell>
            ))}
        </Bar>
    ));

    let labelLines = 1;
    parsedData.forEach((row) => {
        labelLines = Math.max(
            labelLines,
            row.name.split(separators.newline).length
        );
    });

    let axisNumFormat = currency ? wholeCurrencyFormat : wholeNumFormat;
    let tooltipNumFormat = currency ? currencyFormat : numFormat;
    if (diffFromAverage) {
        axisNumFormat = humanPctSignFormat;
        tooltipNumFormat = humanPctSignFormat;
    } else if (percent) {
        axisNumFormat = humanPctFormat;
        tooltipNumFormat = humanPctFormat;
    }
    const axisConfig = {
        fill: '#333',
        fontSize: tickFontSize,
    };
    const tooltipContent = BarsTooltip(bars, showSum, tooltipNumFormat);

    const refLine = diffFromAverage ? (
        <ReferenceLine
            x={vertical ? 0 : null}
            y={vertical ? null : 0}
            stroke="#000"
        />
    ) : null;

    return (
        <div className={`chart-wrapper ${className}`}>
            {title && <h2 className={subtitle ? '' : 'mb-3'}>{title}</h2>}
            {subtitle && <h6>{subtitle}</h6>}
            {lastUpdate && (
                <LastUpdateTag timestamp={timestamp ?? null}>
                    {disclaimer}
                </LastUpdateTag>
            )}
            <div className={`chart-outer${scrollable ? ' scrollable' : ''}`}>
                <div
                    className={`chart${diffFromAverage ? ' avg-diff' : ''}`}
                    style={
                        vertical
                            ? {
                                  height: `${
                                      (isMobile ? 80 : 55) +
                                      data.length *
                                          (barHeight ??
                                              Math.max(2, labelLines) * 20)
                                  }px`,
                              }
                            : {}
                    }
                >
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={parsedData}
                            layout={vertical ? 'vertical' : 'horizontal'}
                            margin={{
                                top: 5,
                                right: 5,
                                left: 0,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid
                                strokeDasharray="3"
                                horizontal={!vertical}
                                vertical={vertical}
                            />
                            {vertical ? (
                                <XAxis
                                    domain={percent ? [0, 1] : null}
                                    tickCount={7}
                                    tickFormatter={axisNumFormat}
                                    tick={axisConfig}
                                    type="number"
                                />
                            ) : (
                                <XAxis
                                    dataKey="name"
                                    height={15 + labelLines * 15}
                                    minTickGap={-10}
                                    tickFormatter={shortChartNames}
                                    tick={
                                        labelLines > 1 ? (
                                            <HorizontalTick />
                                        ) : (
                                            axisConfig
                                        )
                                    }
                                    type="category"
                                />
                            )}
                            {vertical ? (
                                <YAxis
                                    dataKey="name"
                                    minTickGap={-15}
                                    tick={
                                        labelLines > 1 ? (
                                            <VerticalTick />
                                        ) : (
                                            axisConfig
                                        )
                                    }
                                    tickFormatter={shortChartNames}
                                    type="category"
                                    width={verticalYaxisWidth}
                                />
                            ) : (
                                <YAxis
                                    domain={percent ? [0, 1] : null}
                                    tick={axisConfig}
                                    tickCount={7}
                                    tickFormatter={axisNumFormat}
                                    type="number"
                                    width={horizontalYaxisWidth}
                                />
                            )}
                            <Tooltip content={tooltipContent} />
                            <Legend />
                            {refLine}
                            {barElements}
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            {children}
            {buttonLink && (
                <div className="buttons mt-3 text-center">
                    <Button as={Link} to={buttonLink} variant="secondary">
                        {buttonText ?? t(labels.showMore)}
                    </Button>
                </div>
            )}
        </div>
    );
}

export default TisBarChart;

import {
    Bar,
    CartesianGrid,
    ComposedChart,
    Legend,
    ResponsiveContainer,
    Scatter,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

import { isMobile } from '../../helpers/browser';
import {
    shortChartNames,
    tooltipNameFormat,
    verticalYaxisWidth,
} from '../../helpers/charts';
import { colors } from '../../helpers/constants';
import { labels, t } from '../../helpers/dictionary';
import { numFormat, wholeCurrencyFormat } from '../../helpers/helpers';
import { separators } from '../../helpers/routes';

import HorizontalTick from './HorizontalTick';
import VerticalTick, { tickFontSize } from './VerticalTick';

import './Charts.scss';
import LastUpdateTag from '../general/LastUpdateTag';

function FbRangesChart({
    className = '',
    data,
    disclaimer = null,
    timestamp,
    title,
    subtitle,
    vertical = false,
}) {
    if (!data || !Array.isArray(data) || !data.length) {
        return null;
    }

    const axisConfig = {
        fill: '#333',
        fontSize: tickFontSize,
    };
    const tooltipValueFormat = (value) => {
        if (Array.isArray(value) && value.length > 1) {
            return `${numFormat(value[0])} ~ ${wholeCurrencyFormat(value[1])}`;
        }
        return wholeCurrencyFormat(value);
    };

    let labelLines = 1;
    data.forEach((row) => {
        labelLines = Math.max(
            labelLines,
            row.name.split(separators.newline).length
        );
    });

    return (
        <div className={`chart-wrapper ${className}`}>
            {title && <h2 className={subtitle ? '' : 'mb-3'}>{title}</h2>}
            {subtitle && <h6>{subtitle}</h6>}
            <LastUpdateTag timestamp={timestamp}>{disclaimer}</LastUpdateTag>

            <div className="chart-outer">
                <div
                    className="chart"
                    style={
                        vertical
                            ? {
                                  height: `${
                                      (isMobile ? 80 : 55) +
                                      data.length * Math.max(2, labelLines) * 20
                                  }px`,
                              }
                            : {}
                    }
                >
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart
                            data={data}
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
                                    tick={axisConfig}
                                    tickCount={7}
                                    tickFormatter={wholeCurrencyFormat}
                                    type="number"
                                />
                            ) : (
                                <XAxis
                                    type="category"
                                    dataKey="name"
                                    tickFormatter={shortChartNames}
                                    tick={
                                        labelLines > 1 ? (
                                            <HorizontalTick />
                                        ) : (
                                            axisConfig
                                        )
                                    }
                                    minTickGap={-10}
                                    height={15 + labelLines * 15}
                                />
                            )}
                            {vertical ? (
                                <YAxis
                                    type="category"
                                    dataKey="name"
                                    tickFormatter={shortChartNames}
                                    tick={
                                        labelLines > 1 ? (
                                            <VerticalTick />
                                        ) : (
                                            axisConfig
                                        )
                                    }
                                    minTickGap={-15}
                                    width={verticalYaxisWidth}
                                />
                            ) : (
                                <YAxis
                                    tick={axisConfig}
                                    tickCount={7}
                                    tickFormatter={wholeCurrencyFormat}
                                    type="number"
                                />
                            )}
                            <Tooltip
                                formatter={tooltipValueFormat}
                                labelFormatter={tooltipNameFormat}
                            />
                            <Legend />
                            <Bar
                                key="range"
                                dataKey="range"
                                fill={colors.colorDarkBlue}
                                name={t(labels.ads.meta.ranges.range)}
                            />
                            <Scatter
                                dataKey="est"
                                fill={colors.colorOrange}
                                name={t(labels.ads.meta.ranges.estimate)}
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default FbRangesChart;

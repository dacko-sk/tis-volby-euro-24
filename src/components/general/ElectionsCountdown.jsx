import Countdown from 'react-countdown';

import { labels, t } from '../../helpers/dictionary';
import { dateFormat } from '../../helpers/helpers';

import './ElectionsCountdown.scss';

function ElectionsCountdown({ start = null, end }) {
    const dateEnd = new Date(end).getTime();
    const dateStart = start ? new Date(start).getTime() : dateEnd;
    const dateCurrent = new Date().getTime();

    // Renderer callback with condition
    const renderer = ({ formatted, completed }) => {
        if (completed) {
            // Render a completed state
            return (
                <div className="hero-number">{t(labels.elections.over)}</div>
            );
        }
        // Render a countdown
        return (
            <div className="countdown hero-number">
                <span className="countdown-bg-o me-3" data-label="dní">
                    {formatted.days}
                </span>
                <span className="countdown-bg me-3" data-label="hodín">
                    {formatted.hours}
                </span>
                <span className="countdown-bg me-3" data-label="minút">
                    {formatted.minutes}
                </span>
                <span className="countdown-bg" data-label="sekúnd">
                    {formatted.seconds}
                </span>
            </div>
        );
    };

    return dateCurrent > dateEnd ? (
        <div className="elections-countdown">
            <h2>{t(labels.elections.date)}</h2>
            <div className="hero-number">{dateFormat(end)}</div>
        </div>
    ) : (
        <div className="elections-countdown">
            <h2>
                {t(
                    dateCurrent > dateStart
                        ? labels.elections.timeTillend
                        : labels.elections.timeTillstart
                )}
            </h2>
            <Countdown
                date={dateCurrent > dateStart ? dateEnd : dateStart}
                renderer={renderer}
            />
        </div>
    );
}

export default ElectionsCountdown;

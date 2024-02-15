import { labels, t } from '../../helpers/dictionary';
import { dateTimeFormat } from '../../helpers/helpers';

function LastUpdateTag({ children, timestamp }) {
    return (
        <em className="disclaimer">
            {children && (
                <>
                    {children}
                    <br />
                </>
            )}
            {t(labels.lastUpdate)} {dateTimeFormat(timestamp)}.
        </em>
    );
}

export default LastUpdateTag;

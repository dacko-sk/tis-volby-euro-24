import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import { currencyFormat, isNumeric, numFormat } from '../../helpers/helpers';

import LastUpdateTag from './LastUpdateTag';
import Loading from './Loading';

function HeroNumber({
    className,
    currency = true,
    button,
    disclaimer,
    lastUpdate,
    link,
    number,
    loading = false,
    title,
}) {
    let num = number;
    if (isNumeric(number) && !loading) {
        num = currency ? currencyFormat(number) : numFormat(number);
    }
    return (
        <div className={`${className} text-center`}>
            {title && <h2>{title}</h2>}
            <div className="hero-number">
                {loading ? <Loading small /> : num}
                {lastUpdate ? (
                    <LastUpdateTag timestamp={lastUpdate}>
                        {disclaimer}
                    </LastUpdateTag>
                ) : (
                    <em className="disclaimer">{disclaimer}</em>
                )}
            </div>
            {button && link && (
                <div className="buttons mt-3">
                    <Button as={Link} to={link} variant="secondary">
                        {button}
                    </Button>
                </div>
            )}
        </div>
    );
}

export default HeroNumber;

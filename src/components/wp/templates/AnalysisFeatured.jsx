import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';

import { partyData } from '../../../helpers/constants';
import { badgePctFormat } from '../../../helpers/helpers';
import { routes, segments } from '../../../helpers/routes';
import { transparencyClass } from '../../../helpers/wp';

import useAdsData from '../../../hooks/AdsData';

function AnalysisFeatured({ article }) {
    const { analysis } = article;
    if (analysis.error ?? false) {
        console.log(analysis.error);
        return null;
    }
    if (analysis.lastCol < 0) {
        return null;
    }
    const cls = transparencyClass(analysis.lastScore);

    const { getPartyAdsData, findPartyByWpTags } = useAdsData();
    const name = findPartyByWpTags(article.tags) ?? article.title.rendered;
    const adsData = getPartyAdsData(name);
    const party = partyData(name, null, adsData);

    return (
        <Col>
            <Link
                id={article.slug}
                className={`article analysis-preview score-${cls}`}
                to={routes.party(name, segments.ANALYSIS)}
            >
                <div
                    className="thumb"
                    data-label={badgePctFormat(analysis.lastScore)}
                >
                    {party.image ? (
                        <figure className="text-center">{party.image}</figure>
                    ) : (
                        <div className="cover text-center">
                            <span className="text-white fw-bold">{name}</span>
                        </div>
                    )}
                </div>
            </Link>
        </Col>
    );
}

export default AnalysisFeatured;

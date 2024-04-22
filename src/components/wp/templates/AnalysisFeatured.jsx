import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';

import { badgePctFormat } from '../../../helpers/helpers';
import { routes, segments } from '../../../helpers/routes';
import { transparencyClass } from '../../../helpers/wp';

// import useAccountsData from '../../../hooks/AccountsData';
import Media from '../Media';

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

    // const { findPartyByWpTags } = useAccountsData();
    // const party = findPartyByWpTags(article.tags);
    const logo = /* party && (party.logo ?? false) ? party.logo : */ null;
    const name =
        /* party && (party.fullName ?? false)
            ? party.fbName
            : */ article.title.rendered;

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
                    <figure className="text-center">
                        <Media
                            alt={article.title.rendered}
                            id={article.featured_media}
                            fallback={logo}
                        />
                    </figure>

                    <div className="name text-center">
                        <span className="badge">{name}</span>
                    </div>
                </div>
            </Link>
        </Col>
    );
}

export default AnalysisFeatured;

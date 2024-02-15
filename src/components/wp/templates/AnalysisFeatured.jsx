import Col from 'react-bootstrap/Col';

import { badgePctFormat } from '../../../helpers/helpers';
import { transparencyClass } from '../../../helpers/wp';

// import useAccountsData from '../../../hooks/AccountsData';
import Media from '../Media';

function AnalysisFeatured({ article, clickHandler, keyUpHandler }) {
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
            <div
                id={article.slug}
                className={`article analysis-preview score-${cls}`}
                onClick={clickHandler}
                onKeyUp={keyUpHandler}
                role="link"
                tabIndex={0}
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
            </div>
        </Col>
    );
}

export default AnalysisFeatured;

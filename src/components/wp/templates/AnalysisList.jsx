import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';

import { labels, t } from '../../../helpers/dictionary';
import { badgePctFormat } from '../../../helpers/helpers';
import { routes, segments } from '../../../helpers/routes';
import {
    baseData as abd,
    metaData as amd,
    transparencyClass,
} from '../../../helpers/wp';

// import useAccountsData from '../../../hooks/AccountsData';

function AnalysisList({ article }) {
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
    const logo = /* party && (party.logo ?? false) ? (
            <img
                alt={t(labels.analysis.transparency[cls])}
                className="p-3"
                src={party.logo}
            />
        ) : */ null;
    const name =
        /* party && (party.fullName ?? false)
            ? party.fullName
            : */ article.title.rendered;

    return (
        <Col md={12}>
            <Link
                id={article.slug}
                className={`article hover-bg analysis-preview score-${cls}`}
                to={routes.party(name, segments.ANALYSIS)}
            >
                <Row className="align-items-center">
                    <Col sm>
                        <div
                            className="thumb mb-2 mb-md-0"
                            data-label={t(
                                labels.analysis.transparencyShort[cls]
                            )}
                        >
                            <figure className="text-center text-xxl-start">
                                {logo}
                            </figure>
                        </div>
                    </Col>
                    <Col>
                        <h2>{name}</h2>
                        <Table responsive>
                            <tbody>
                                <tr>
                                    <th>{t(labels.analysis[amd.leader])}</th>
                                    <td>{analysis.meta[amd.leader]}</td>
                                </tr>
                                <tr>
                                    <th>{t(labels.analysis[abd.score])}</th>
                                    <td className="score">
                                        <span
                                            className={`badge me-1 score-${cls}`}
                                        >
                                            {badgePctFormat(analysis.lastScore)}
                                        </span>
                                        {t(labels.analysis.transparency[cls])}
                                    </td>
                                </tr>
                                <tr className="d-none d-sm-table-row">
                                    <th>{t(labels.analysis[abd.date])}</th>
                                    <td>
                                        {
                                            analysis.base[abd.date][
                                                analysis.lastColumn
                                            ]
                                        }
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Link>
        </Col>
    );
}

export default AnalysisList;

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useOutletContext } from 'react-router-dom';

import { setTitle } from '../../helpers/browser';
import { labels, t } from '../../helpers/dictionary';
import { routes, segments } from '../../helpers/routes';
import { wpCat } from '../../helpers/wp';

import { aggregatedKeys as agk } from '../../hooks/AccountsData';
import { csvConfig } from '../../hooks/AdsData';

import TisBarChart from '../../components/charts/TisBarChart';
import AlertWithIcon from '../../components/general/AlertWithIcon';
import HeroNumber from '../../components/general/HeroNumber';
import Posts, { templates } from '../../components/wp/Posts';
import { chartKeys, columnVariants } from '../../helpers/charts';

function PartyOverview() {
    const party = useOutletContext();

    setTitle(party.name);

    return (
        <div className="subpage">
            {party.account === false ? (
                <AlertWithIcon className="my-4" variant="danger">
                    {t(labels.account.noData)}
                </AlertWithIcon>
            ) : (
                <Row className="my-4">
                    <Col lg={6}>
                        <TisBarChart
                            bars={columnVariants.inOutStacked}
                            data={[
                                {
                                    name: t(labels.charts.outgoing),
                                    [chartKeys.OUTGOING]:
                                        party.account?.[agk.outgoing] ?? 0,
                                },
                                {
                                    name: t(labels.charts.incoming),
                                    [chartKeys.INCOMING]:
                                        party.account?.[agk.incoming] ?? 0,
                                },
                            ]}
                            buttonLink={routes.charts}
                            currency
                            lastUpdate={false}
                        />
                    </Col>
                    <Col lg={6}>
                        <HeroNumber
                            button={t(labels.account.allTransactions)}
                            className="mt-xxl-4"
                            lastUpdate={party.account?.[agk.timestamp] ?? null}
                            link={routes.party(
                                party.name,
                                segments.TRANSACTIONS
                            )}
                            loading={!(party.account ?? false)}
                            number={party.account?.[agk.outgoing]}
                            title={t(labels.account.partySpending)}
                        />
                    </Col>
                </Row>
            )}

            {party.hasWp && (
                <>
                    <h2 className="mt-4">{t(labels.news.latest)}</h2>
                    <Posts
                        categories={[wpCat.news]}
                        limit={2}
                        showMoreLink={routes.party(party.name, segments.NEWS)}
                        tags={[party[csvConfig.ACCOUNTS.columns.WP]]}
                        template={templates.condensed}
                    />
                </>
            )}
        </div>
    );
}

export default PartyOverview;

import { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { setTitle } from '../../helpers/browser';
import {
    ageColors,
    attributionColors,
    attributionKeys,
    partyChartLabel,
    columnVariants,
    genderColors,
    genderKeys,
    regionOptions,
    regionKeys,
} from '../../helpers/charts';
import { colors } from '../../helpers/constants';
import { labels, t } from '../../helpers/dictionary';
import { sortByName, sortByNumericProp } from '../../helpers/helpers';
import { segments } from '../../helpers/routes';

import useAdsData from '../../hooks/AdsData';
import { aggregatedKeys } from '../../hooks/AccountsData';

import FbRangesChart from '../charts/FbRangesChart';
import TisBarChart from '../charts/TisBarChart';
import AlertWithIcon from '../general/AlertWithIcon';
import HeroNumber from '../general/HeroNumber';
import Loading from '../general/Loading';
import TisPieChart from '../charts/TisPieChart';

function Meta({
    chartKeys = {
        SPENDING: 'SPENDING',
        RANGES: 'RANGES',
        AMOUNTS: 'AMOUNTS',
        REGIONS: 'REGIONS',
        DEMOGRAPHY: 'DEMOGRAPHY',
        ATTRIBUTION: 'ATTRIBUTION',
    },
}) {
    const [activeKeys, setActiveKeys] = useState([chartKeys.SPENDING]);
    const [loadedCharts, setLoadedCharts] = useState([chartKeys.SPENDING]);

    const {
        metaApiData,
        sheetsData,
        mergedWeeksData,
        findPartyForMetaAccount,
    } = useAdsData();

    // parse data from sheets
    let totalSpending = 0;
    const spendingAggr = {};
    if (sheetsData.lastUpdateFb) {
        Object.entries(mergedWeeksData).forEach(([pageId, pageProps]) => {
            const candidate = findPartyForMetaAccount(pageId);
            if (candidate) {
                totalSpending += pageProps.outgoing;
                if (!(spendingAggr[candidate] ?? false)) {
                    spendingAggr[candidate] = {
                        name: partyChartLabel(candidate, segments.ONLINE),
                        [aggregatedKeys.outgoing]: 0,
                    };
                }
                spendingAggr[candidate][aggregatedKeys.outgoing] +=
                    pageProps.outgoing;
            }
        });
    }

    // parse data from API
    let totalAmount = 0;
    const partiesAggr = {};
    const amountsAggr = {};
    const regionsAggr = {};
    const regionsPercentages = [];
    const regionsBars = [];
    const genderAggr = {};
    const genderPercentages = [];
    const genderBars = [];
    const ageAggr = {};
    const agePercentages = [];
    const ageBars = [];
    const attributions = {};
    const attributionsAggr = {};
    const attributionsPercentages = [];
    const attributionsBars = [];
    const attributionsPie = {
        data: [],
        color: colors.colorLightBlue,
        nameKey: 'name',
        dataKey: 'value',
        label: t(labels.ads.meta.attribution.amount),
    };
    let timestamp = 0;

    if (metaApiData.lastUpdate) {
        Object.entries(metaApiData.pages).forEach(([pageId, pageProps]) => {
            const candidate = findPartyForMetaAccount(pageId);
            const chartLabel = partyChartLabel(candidate, segments.ONLINE);

            if (candidate) {
                totalAmount += pageProps.spend.num;

                if (loadedCharts.includes(chartKeys.RANGES)) {
                    if (partiesAggr[candidate] ?? false) {
                        partiesAggr[candidate].range[0] += pageProps.spend.min;
                        partiesAggr[candidate].range[1] += pageProps.spend.max;
                        partiesAggr[candidate].est += pageProps.spend.est;
                    } else {
                        partiesAggr[candidate] = {
                            name: chartLabel,
                            range: [pageProps.spend.min, pageProps.spend.max],
                            est: pageProps.spend.est,
                        };
                    }
                }

                if (loadedCharts.includes(chartKeys.AMOUNTS)) {
                    if (amountsAggr[candidate] ?? false) {
                        amountsAggr[candidate].num += pageProps.spend.num;
                    } else {
                        amountsAggr[candidate] = {
                            name: chartLabel,
                            num: pageProps.spend.num,
                        };
                    }
                }

                if (loadedCharts.includes(chartKeys.REGIONS)) {
                    // create initial object for party
                    if (!(regionsAggr[chartLabel] ?? false)) {
                        regionsAggr[chartLabel] = {};
                        Object.keys(regionKeys).forEach((key) => {
                            regionsAggr[chartLabel][key] = 0;
                        });
                    }
                    // aggregate regions from all acounts of the party
                    Object.keys(regionKeys).forEach((key) => {
                        if (pageProps.regions[key] ?? false) {
                            regionsAggr[chartLabel][key] +=
                                pageProps.regions[key];
                        }
                    });
                }

                if (loadedCharts.includes(chartKeys.DEMOGRAPHY)) {
                    // create initial objects for party
                    if (!(genderAggr[chartLabel] ?? false)) {
                        genderAggr[chartLabel] = {};
                    }
                    if (!(ageAggr[chartLabel] ?? false)) {
                        ageAggr[chartLabel] = {};
                    }
                    // aggregate gender/ages amounts from all acounts of the party
                    Object.entries(pageProps.demography).forEach(
                        ([dKey, dSize]) => {
                            const [gender, age] = dKey.split('|');
                            genderAggr[chartLabel][gender] =
                                (genderAggr[chartLabel][gender] ?? 0) + dSize;
                            ageAggr[chartLabel][age] =
                                (ageAggr[chartLabel][age] ?? 0) + dSize;
                        }
                    );
                }

                if (loadedCharts.includes(chartKeys.ATTRIBUTION)) {
                    // create initial object for party
                    if (!(attributionsAggr[chartLabel] ?? false)) {
                        attributionsAggr[chartLabel] = {};
                        Object.keys(attributionKeys).forEach((key) => {
                            attributionsAggr[chartLabel][key] = 0;
                        });
                    }
                    // aggregate attributions from all acounts of the party
                    Object.keys(attributionKeys).forEach((key) => {
                        if (pageProps.attribution.mandatory[key] ?? false) {
                            attributionsAggr[chartLabel][key] +=
                                pageProps.attribution.mandatory[key];
                        }
                    });
                }
            }

            if (loadedCharts.includes(chartKeys.ATTRIBUTION)) {
                Object.keys(attributionKeys).forEach((key) => {
                    if (pageProps.attribution.mandatory[key] ?? false) {
                        attributions[key] =
                            (attributions[key] ?? 0) +
                            pageProps.attribution.mandatory[key];
                    }
                });
            }

            timestamp = Math.max(timestamp, pageProps.updated);
        });

        // sort & preprocess aggregated data for charts
        Object.entries(regionsAggr).forEach(([chartLabel, regions]) => {
            const dataPoint = {
                name: chartLabel,
            };
            let sum = 0;
            Object.values(regions).forEach((share) => {
                sum += share;
            });
            Object.entries(regions).forEach(([key, share]) => {
                dataPoint[key] = share / sum;
            });
            regionsPercentages.push(dataPoint);
        });
        regionsPercentages.sort(sortByName);
        Object.entries(regionOptions).forEach(([key, options]) => {
            regionsBars.push({
                key,
                name: t(labels.ads.meta.regions.regionLabels[key]),
                color: options.color,
                stackId: 'regions',
            });
        });

        Object.entries(genderAggr).forEach(([chartLabel, genders]) => {
            const dataPoint = {
                name: chartLabel,
            };
            let sum = 0;
            Object.values(genders).forEach((share) => {
                sum += share;
            });
            Object.entries(genders).forEach(([key, share]) => {
                dataPoint[key] = share / sum;
            });
            genderPercentages.push(dataPoint);
        });
        genderPercentages.sort(sortByNumericProp(genderKeys.female));
        Object.entries(genderColors).forEach(([key, color]) => {
            genderBars.push({
                key,
                name: t(labels.ads.meta.demography.genderLabels[key]),
                color,
                stackId: 'genders',
            });
        });

        Object.entries(ageAggr).forEach(([chartLabel, ages]) => {
            const dataPoint = {
                name: chartLabel,
            };
            let sum = 0;
            Object.values(ages).forEach((aShare) => {
                sum += aShare;
            });
            Object.entries(ages).forEach(([aKey, aShare]) => {
                dataPoint[aKey] = aShare / sum;
            });
            agePercentages.push(dataPoint);
        });
        agePercentages.sort(sortByName);
        Object.entries(ageColors).forEach(([key, color]) => {
            ageBars.push({
                key,
                name: key,
                color,
                stackId: 'ages',
            });
        });

        Object.entries(attributionsAggr).forEach(([chartLabel, attr]) => {
            const dataPoint = {
                name: chartLabel,
            };
            let sum = 0;
            Object.values(attr).forEach((amount) => {
                sum += amount;
            });
            Object.entries(attr).forEach(([key, amount]) => {
                dataPoint[key] = amount / sum;
            });
            if (sum) {
                attributionsPercentages.push(dataPoint);
            }
        });
        attributionsPercentages.sort(sortByNumericProp(attributionKeys.YES));
        Object.entries(attributionColors).forEach(([key, color]) => {
            const name = t(labels.ads.meta.attribution.attrLabels[key]);
            if (attributions[key] ?? false) {
                attributionsPie.data.push({
                    name,
                    value: attributions[key],
                    color,
                });
            }
            attributionsBars.push({
                key,
                name,
                color,
                stackId: 'attr',
            });
        });
    }

    const charts = {
        [chartKeys.SPENDING]: loadedCharts.includes(chartKeys.SPENDING) ? (
            <TisBarChart
                bars={columnVariants.spending}
                currency
                data={Object.values(spendingAggr).sort(
                    sortByNumericProp(aggregatedKeys.outgoing)
                )}
                subtitle={t(labels.ads.meta.spending.disclaimer)}
                timestamp={sheetsData.lastUpdateFb}
                vertical
            />
        ) : null,
        [chartKeys.RANGES]: (
            <FbRangesChart
                data={Object.values(partiesAggr).sort(sortByNumericProp('est'))}
                subtitle={t(labels.ads.meta.ranges.disclaimer)}
                timestamp={timestamp}
                vertical
            />
        ),
        [chartKeys.AMOUNTS]: loadedCharts.includes(chartKeys.AMOUNTS) ? (
            <TisBarChart
                bars={columnVariants.amount}
                data={Object.values(amountsAggr).sort(sortByNumericProp('num'))}
                subtitle={t(labels.ads.meta.amount.disclaimer)}
                timestamp={timestamp}
                vertical
            />
        ) : null,
        [chartKeys.REGIONS]: loadedCharts.includes(chartKeys.REGIONS) ? (
            <TisBarChart
                bars={regionsBars}
                data={regionsPercentages}
                percent
                subtitle={t(labels.ads.meta.regions.allDisclaimer)}
                timestamp={timestamp}
                vertical
            />
        ) : null,
        [chartKeys.DEMOGRAPHY]: loadedCharts.includes(chartKeys.DEMOGRAPHY) ? (
            <Row className="gy-3">
                <Col>
                    <TisBarChart
                        bars={genderBars}
                        data={genderPercentages}
                        percent
                        subtitle={t(
                            labels.ads.meta.demography.gendersDisclaimer
                        )}
                        timestamp={timestamp}
                        title={t(labels.ads.meta.demography.genders)}
                        vertical
                    />
                </Col>
                <Col>
                    <TisBarChart
                        bars={ageBars}
                        data={agePercentages}
                        percent
                        subtitle={t(labels.ads.meta.demography.agesDisclaimer)}
                        timestamp={timestamp}
                        title={t(labels.ads.meta.demography.ages)}
                        vertical
                    />
                </Col>
            </Row>
        ) : null,
        [chartKeys.ATTRIBUTION]: loadedCharts.includes(
            chartKeys.ATTRIBUTION
        ) ? (
            <Row className="gy-3">
                <Col xl={6}>
                    <TisPieChart
                        pie={attributionsPie}
                        percent={false}
                        subtitle={t(labels.ads.meta.attribution.disclaimer)}
                        timestamp={timestamp}
                        title={t(labels.ads.meta.attribution.allTitle)}
                    />
                </Col>
                <Col xl={6}>
                    <TisBarChart
                        bars={attributionsBars}
                        data={attributionsPercentages}
                        percent
                        subtitle={t(labels.ads.meta.attribution.pctDisclaimer)}
                        timestamp={timestamp}
                        title={t(labels.ads.meta.attribution.pctTitle)}
                        vertical
                    />
                </Col>
            </Row>
        ) : null,
    };

    const accordions = [
        [chartKeys.SPENDING, labels.ads.meta.spending.accountsTitle],
        [chartKeys.RANGES, labels.ads.meta.ranges.accountsTitle],
        [chartKeys.AMOUNTS, labels.ads.meta.amount.title],
        [chartKeys.REGIONS, labels.ads.meta.regions.title],
        [chartKeys.DEMOGRAPHY, labels.ads.meta.demography.title],
        [chartKeys.ATTRIBUTION, labels.ads.meta.attribution.title],
    ].map(([key, label]) => (
        <Accordion.Item key={key} eventKey={key}>
            <Accordion.Header>{t(label)}</Accordion.Header>
            <Accordion.Body>{charts[key]}</Accordion.Body>
        </Accordion.Item>
    ));

    const onSelect = (ak) => {
        // open/close accordion
        setActiveKeys(ak);
        // remember if chart was already loaded
        ak.forEach((key) => {
            if (!loadedCharts.includes(key)) {
                setLoadedCharts([...loadedCharts, ...[key]]);
            }
        });
    };

    let content = null;
    if (!sheetsData.loaded) {
        // waiting for data or error in loding
        content = <Loading error={sheetsData.error} />;
    } else {
        content = (
            <Accordion
                className="mt-4"
                activeKey={activeKeys}
                alwaysOpen
                onSelect={onSelect}
            >
                {accordions}
            </Accordion>
        );
    }

    setTitle('Online kampane Meta');

    return (
        <div>
            <AlertWithIcon className="my-4" variant="primary">
                {t(labels.ads.meta.disclaimer)}
            </AlertWithIcon>
            <Row className="gy-3 gy-lg-0 my-4">
                <Col lg={6}>
                    <HeroNumber
                        disclaimer={t(labels.ads.meta.totalDisclaimer)}
                        lastUpdate={sheetsData.lastUpdateFb || null}
                        loading={!sheetsData.loaded}
                        number={totalSpending}
                        title={t(labels.ads.meta.totalSpendingTitle)}
                    />
                </Col>
                <Col lg={6}>
                    <HeroNumber
                        currency={false}
                        disclaimer={t(labels.ads.meta.amount.disclaimer)}
                        lastUpdate={timestamp || null}
                        loading={!metaApiData.loaded}
                        number={totalAmount}
                        title={t(labels.ads.meta.amount.title)}
                    />
                </Col>
            </Row>
            {content}
        </div>
    );
}

export default Meta;

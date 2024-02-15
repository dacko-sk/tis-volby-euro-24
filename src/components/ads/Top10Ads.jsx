import { partyChartLabel, columnVariants } from '../../helpers/charts';
import { labels, t } from '../../helpers/dictionary';
import { sortByNumericProp } from '../../helpers/helpers';
import { routes, segments } from '../../helpers/routes';

import useAdsData from '../../hooks/AdsData';
import { aggregatedKeys } from '../../hooks/AccountsData';

import TisBarChart from '../charts/TisBarChart';

function Top10Ads({
    /* googleColumns = csvConfig.GOOGLE.columns, */
    maxItems = 10,
}) {
    const { findPartyForMetaAccount, mergedWeeksData, sheetsData } =
        useAdsData();

    // parse data
    const spendingFb = {};
    if (sheetsData.lastUpdateFb) {
        Object.entries(mergedWeeksData).forEach(([pageId, pageProps]) => {
            const candidate = findPartyForMetaAccount(pageId);
            if (candidate) {
                if (!(spendingFb[candidate] ?? false)) {
                    spendingFb[candidate] = {
                        name: partyChartLabel(candidate, segments.ONLINE),
                        [aggregatedKeys.outgoing]: 0,
                    };
                }
                spendingFb[candidate][aggregatedKeys.outgoing] +=
                    pageProps.outgoing;
            }
        });
    }
    // const spendingGgl = {};
    // if (sheetsData.lastUpdateGgl) {
    //     sheetsData.googleAds.forEach((pageData) => {
    //         const parentPartyName = findPartyForGoogleAccount(
    //             pageData[googleColumns.ID]
    //         );
    //         const party = findPartyByFbName(parentPartyName);
    //         const partyChartLabel = party
    //             ? getPartyChartLabel(party, segments.ONLINE)
    //             : parentPartyName;
    //         const outgoing = fixNumber(pageData[googleColumns.SPENDING]);
    //         if (parentPartyName) {
    //             if (spendingGgl[parentPartyName] ?? false) {
    //                 spendingGgl[parentPartyName].outgoing += outgoing;
    //             } else {
    //                 spendingGgl[parentPartyName] = {
    //                     name: partyChartLabel,
    //                     outgoing,
    //                 };
    //             }
    //         }
    //     });
    // }

    const columnsFb = Object.values(spendingFb)
        .sort(sortByNumericProp(aggregatedKeys.outgoing))
        .slice(0, maxItems);
    // const columnsGgl = Object.values(spendingGgl)
    //     .sort(sortBySpending)
    //     .slice(0, maxItems);

    return (
        <div id="online-charts">
            <TisBarChart
                bars={columnVariants.spending}
                buttonLink={routes.online()}
                buttonText={t(labels.ads.showMore)}
                currency
                data={columnsFb}
                subtitle={t(labels.ads.meta.spending.partiesDisclaimer)}
                timestamp={sheetsData.lastUpdateFb}
                title={t(labels.ads.meta.topTitle)}
                vertical
            />
            {/* <TisBarChart
                bars={columnVariants.spending}
                buttonLink={routes.online()}
                buttonText={t(labels.ads.showMore)}
                currency
                data={columnsGgl}
                subtitle={t(labels.ads.google.spending.partiesDisclaimer)}
                timestamp={sheetsData.lastUpdateGgl}
                title={t(labels.ads.google.topTitle)}
                vertical
            /> */}
        </div>
    );
}

export default Top10Ads;

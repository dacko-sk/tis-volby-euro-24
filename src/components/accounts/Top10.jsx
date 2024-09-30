import { dates } from '../../helpers/constants';
import { labels, t } from '../../helpers/dictionary';
import {
    chartKeys,
    columnVariants,
    partyChartLabel,
} from '../../helpers/charts';
import { getTimeFromDate, sortByNumericProp } from '../../helpers/helpers';
import { routes } from '../../helpers/routes';
import { finalReports } from '../../helpers/settings';

import useAccountsData, {
    aggregatedKeys as agk,
} from '../../hooks/AccountsData';
import useAdsData, { csvConfig } from '../../hooks/AdsData';

import TisBarChart from '../charts/TisBarChart';

function Top10({ maxItems = 10 }) {
    const { findPartyByName, getAllPartiesNames, getPartyAdsData } =
        useAdsData();

    if (finalReports) {
        const columns = (getAllPartiesNames() ?? []).map((name) => {
            const adsData = getPartyAdsData(name);
            return {
                name: partyChartLabel(name),
                [chartKeys.PRECAMPAIGN]:
                    adsData[csvConfig.ACCOUNTS.columns.PRECAMPAIGN],
                [chartKeys.CAMPAIGN]:
                    adsData[csvConfig.ACCOUNTS.columns.CAMPAIGN],
                [chartKeys.TOTAL]:
                    adsData[csvConfig.ACCOUNTS.columns.PRECAMPAIGN] +
                    adsData[csvConfig.ACCOUNTS.columns.CAMPAIGN],
            };
        });

        return (
            <TisBarChart
                bars={columnVariants.finalReport}
                buttonLink={routes.charts}
                className="mb-4"
                currency
                data={columns
                    .sort(sortByNumericProp(chartKeys.TOTAL))
                    .slice(0, maxItems)}
                subtitle={`${t(labels.charts.finalReport.disclaimer)} ${t(
                    labels.charts.disclaimerClick
                )}`}
                title={t(labels.charts.finalReport.title)}
                timestamp={getTimeFromDate(dates.monitoringEnd)}
                vertical
            />
        );
    }

    const { accountsData } = useAccountsData();

    const columns = (accountsData.data ?? []).flatMap((row) => {
        const party = findPartyByName(row[agk.name]);
        return party
            ? [
                  {
                      name: partyChartLabel(party[0]),
                      [chartKeys.INCOMING]: row[agk.incoming],
                      [chartKeys.OUTGOING]: row[agk.outgoing],
                  },
              ]
            : [];
    });

    return (
        <TisBarChart
            buttonLink={routes.charts}
            className="mb-4"
            currency
            data={columns
                .sort(sortByNumericProp(chartKeys.OUTGOING))
                .slice(0, maxItems)}
            subtitle={`${t(labels.charts.disclaimer)} ${t(
                labels.charts.disclaimerClick
            )}`}
            title={t(labels.charts.top10)}
            timestamp={accountsData.lastUpdate}
            showSum={false}
            vertical
        />
    );
}

export default Top10;

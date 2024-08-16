import { dates } from '../../helpers/constants';
import { labels, t } from '../../helpers/dictionary';
import { getTimeFromDate } from '../../helpers/helpers';

import useAccountsData, {
    aggregatedKeys as agk,
} from '../../hooks/AccountsData';
import useAdsData, { csvConfig } from '../../hooks/AdsData';

import HeroNumber from '../general/HeroNumber';

function TotalSpending({ finalReport = false }) {
    if (finalReport) {
        const { sheetsData, getAllPartiesNames, getPartyAdsData } =
            useAdsData();

        const total = (getAllPartiesNames() ?? [])
            .map((name) => getPartyAdsData(name))
            .reduce(
                (sum, adsData) =>
                    sum +
                    adsData[csvConfig.ACCOUNTS.columns.CAMPAIGN] +
                    adsData[csvConfig.ACCOUNTS.columns.PRECAMPAIGN],
                0
            );

        return (
            <HeroNumber
                disclaimer={t(labels.account.finalReportDisclaimer)}
                lastUpdate={getTimeFromDate(dates.monitoringEnd)}
                loading={!sheetsData.loaded}
                number={total}
                title={t(labels.account.totalSpending)}
            />
        );
    }
    const { accountsData } = useAccountsData();

    const total = (accountsData.data ?? []).reduce(
        (sum, row) => (row[agk.outgoing] > 0 ? sum + row[agk.outgoing] : sum),
        0
    );

    return (
        <HeroNumber
            disclaimer={t(labels.account.totalDisclaimer)}
            lastUpdate={accountsData.lastUpdate ?? null}
            loading={!(accountsData.data ?? false)}
            number={total}
            title={t(labels.account.totalSpending)}
        />
    );
}

export default TotalSpending;

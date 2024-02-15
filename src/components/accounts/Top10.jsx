import { labels, t } from '../../helpers/dictionary';
import { partyChartLabel } from '../../helpers/charts';
import { sortByNumericProp } from '../../helpers/helpers';
import { routes } from '../../helpers/routes';

import useAccountsData, {
    aggregatedKeys as agk,
} from '../../hooks/AccountsData';
import useAdsData from '../../hooks/AdsData';

import TisBarChart from '../charts/TisBarChart';

function Top10({ maxItems = 10 }) {
    const { accountsData } = useAccountsData();
    const { getPartyShortName } = useAdsData();

    const columns = (accountsData.data ?? []).map((row) => ({
        [agk.name]: partyChartLabel(getPartyShortName(row[agk.name])),
        [agk.incoming]: row[agk.incoming],
        [agk.outgoing]: row[agk.outgoing],
    }));

    return (
        <TisBarChart
            buttonLink={routes.charts}
            className="mb-4"
            currency
            data={columns
                .sort(sortByNumericProp(agk.outgoing))
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

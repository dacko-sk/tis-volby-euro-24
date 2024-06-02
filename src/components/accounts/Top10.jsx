import { labels, t } from '../../helpers/dictionary';
import { chartKeys, partyChartLabel } from '../../helpers/charts';
import { sortByNumericProp } from '../../helpers/helpers';
import { routes } from '../../helpers/routes';

import useAccountsData, {
    aggregatedKeys as agk,
} from '../../hooks/AccountsData';
import useAdsData from '../../hooks/AdsData';

import TisBarChart from '../charts/TisBarChart';

function Top10({ maxItems = 10 }) {
    const { accountsData } = useAccountsData();
    const { findPartyByName } = useAdsData();

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

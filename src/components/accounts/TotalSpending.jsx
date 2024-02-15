import { labels, t } from '../../helpers/dictionary';

import useAccountsData, {
    aggregatedKeys as agk,
} from '../../hooks/AccountsData';

import HeroNumber from '../general/HeroNumber';

function TotalSpending() {
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

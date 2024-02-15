import { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { useNavigate, useOutletContext } from 'react-router-dom';

import { setTitle } from '../../helpers/browser';
import { labels, t } from '../../helpers/dictionary';
import { currencyFormat, shortenUrl } from '../../helpers/helpers';
import { routes } from '../../helpers/routes';

import { aggregatedKeys as agk } from '../../hooks/AccountsData';

import AccountTransactions from '../../components/accounts/AccountTransactions';

function PartyTransactions() {
    const party = useOutletContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (party.account === false) {
            // redirect to party overview in case of no transparent account
            navigate(routes.party(party.name));
        }
    }, [party, navigate]);

    if (party.account === false) {
        // stop rendering & let useEffect hook to redirect
        return null;
    }

    setTitle(`${party.name} : ${t(labels.parties.funding)}`);

    return (
        <div className="subpage">
            <h2 className="mt-4 mb-3">{t(labels.account.info)}</h2>

            <Table striped bordered responsive hover>
                <tbody>
                    <tr>
                        <td>{t(labels.charts.incoming)}</td>
                        <td>
                            {currencyFormat(party.account?.[agk.incoming])}
                        </td>
                    </tr>
                    <tr>
                        <td>{t(labels.charts.outgoing)}</td>
                        <td>
                            {currencyFormat(party.account?.[agk.outgoing])}
                        </td>
                    </tr>
                    <tr>
                        <td>{t(labels.account.balance)}</td>
                        <td>
                            {currencyFormat(party.account?.[agk.balance])}
                        </td>
                    </tr>
                    <tr>
                        <td>{t(labels.account.incomesAmount)}</td>
                        <td>{party.account?.[agk.num_incoming]}</td>
                    </tr>
                    <tr>
                        <td>{t(labels.account.expensesAmount)}</td>
                        <td>{party.account?.[agk.num_outgoing]}</td>
                    </tr>
                    <tr>
                        <td>{t(labels.charts.uniqueDonors)}</td>
                        <td>{party.account?.[agk.num_unique_donors]}</td>
                    </tr>
                    <tr>
                        <td>{t(labels.elections.account)}</td>
                        <td>
                            <a
                                href={party.account?.[agk.account]}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {shortenUrl(party.account?.[agk.account])}
                            </a>
                        </td>
                    </tr>
                </tbody>
            </Table>

            <em className="disclaimer">{t(labels.disclaimerAccount)}</em>

            <AccountTransactions accountData={party.account} />
        </div>
    );
}

export default PartyTransactions;

import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { usePapaParse } from 'react-papaparse';

import { labels, t } from '../../helpers/dictionary';
import { currencyFormat, dateFormat } from '../../helpers/helpers';

import {
    buildParserConfig,
    accountKeys,
    getFileName,
} from '../../hooks/AccountsData';

import Loading from '../general/Loading';
import PaginationWithGaps from '../general/PaginationWithGaps';

const indexColumn = 'index';
const allowedColumns = Object.keys(accountKeys);

const formatColumn = (column, value) => {
    switch (column) {
        case 'amount':
            return currencyFormat(value);
        case 'date':
            return dateFormat(value);
        default:
            return value;
    }
};

function AccountTransactions({ pageSize = 25, accountData }) {
    const file = getFileName(accountData);
    const [transactions, setTransactions] = useState(null);
    const [activePage, setActivePage] = useState(1);
    const { readRemoteFile } = usePapaParse();

    // load data on first load
    useEffect(() => {
        if (file) {
            const parserConfig = buildParserConfig(null, setTransactions);
            readRemoteFile(file, parserConfig);
        }
    }, [file]);

    const loadPage = (page) => () => {
        setActivePage(page);
        document.getElementById('acctount-table').scrollIntoView(true);
    };

    if (!transactions) {
        return <Loading />;
    }

    const totalPages = Math.ceil(transactions.data.length / pageSize);

    const headers = [];
    allowedColumns.forEach((key) => {
        headers.push(<th key={key}>{t(labels.account.tableCols[key])}</th>);
    });
    const rows = [];
    for (
        let i = (activePage - 1) * pageSize;
        i < activePage * pageSize;
        i += 1
    ) {
        const tx = transactions.data[i];
        if (tx) {
            const cols = [];
            allowedColumns.forEach((key) => {
                cols.push(<td key={key}>{formatColumn(key, tx[key])}</td>);
            });
            rows.push(<tr key={tx[indexColumn]}>{cols}</tr>);
        } else {
            break;
        }
    }

    return (
        <div className="account-transactions">
            <h2 className="mt-4 mb-3">{t(labels.account.overview)}</h2>
            <Table striped bordered responsive hover id="acctount-table">
                <thead>
                    <tr>{headers}</tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>

            <PaginationWithGaps
                activePage={activePage}
                className="justify-content-center mt-4"
                pageClickCallback={loadPage}
                totalPages={totalPages}
            />

            <div className="text-center">
                <Button
                    className="mt-3"
                    href={file}
                    target="_blank"
                    variant="secondary"
                >
                    {t(labels.account.download)}
                </Button>
            </div>
        </div>
    );
}

export default AccountTransactions;

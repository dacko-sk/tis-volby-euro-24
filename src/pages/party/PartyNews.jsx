import { useOutletContext } from 'react-router-dom';

import { setTitle } from '../../helpers/browser';
import { labels, t } from '../../helpers/dictionary';
import { wpCat } from '../../helpers/wp';

import { csvConfig } from '../../hooks/AdsData';

import AlertWithIcon from '../../components/general/AlertWithIcon';
import Posts, { templates } from '../../components/wp/Posts';

function PartyNews() {
    const party = useOutletContext();

    const content = party.hasWp ? (
        <Posts
            categories={[wpCat.news]}
            tags={[party[csvConfig.ACCOUNTS.columns.WP]]}
            template={templates.list}
        />
    ) : (
        <AlertWithIcon className="my-4" variant="danger">
            {t(labels.news.noData)}
        </AlertWithIcon>
    );

    setTitle(`${party.name} : ${t(labels.news.pageTitle)}`);

    return <div className="subpage">{content}</div>;
}

export default PartyNews;

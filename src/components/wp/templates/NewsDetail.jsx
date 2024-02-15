import { dateTimeFormat } from '../../../helpers/helpers';
import { parseWpHtml } from '../../../helpers/wp';

function NewsDetail({ article }) {
    return (
        <div className="article-body">
            <div className="d-md-flex">
                <div className="article-date my-4 me-auto">
                    {dateTimeFormat(article.date)}
                </div>
            </div>
            {parseWpHtml(article.content.rendered)}
        </div>
    );
}

export default NewsDetail;

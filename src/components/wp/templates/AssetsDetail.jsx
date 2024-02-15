import { parseWpHtml } from '../../../helpers/wp';

function AssetsDetail({ article }) {
    return (
        <div className="article-body assets">
            {parseWpHtml(article.content.rendered)}
        </div>
    );
}

export default AssetsDetail;

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { dateTimeFormat } from '../../../helpers/helpers';
import { parseWpHtml } from '../../../helpers/wp';

import Media from '../Media';
import PartyTags from '../PartyTags';

function NewsCondensed({ article, clickHandler, keyUpHandler }) {
    return (
        <Col className="d-flex" md={6}>
            <div
                id={article.slug}
                className="article hover-bg"
                onClick={clickHandler}
                onKeyUp={keyUpHandler}
                role="link"
                tabIndex={0}
            >
                <h3 className="d-none d-xxl-block">{article.title.rendered}</h3>

                <Row className="align-items-center align-items-xxl-start">
                    <Col xxl="auto" className="align-self-xxl-start">
                        <div className="thumb mb-2 mb-xxl-0 mt-xxl-2">
                            <figure className="text-center text-xxl-start">
                                <Media
                                    alt={article.title.rendered}
                                    id={article.featured_media}
                                />
                            </figure>
                        </div>
                    </Col>
                    <Col>
                        <h3 className="d-block d-xxl-none">
                            {article.title.rendered}
                        </h3>
                        <div className="article-date my-2">
                            {dateTimeFormat(article.date)}
                        </div>
                        <PartyTags
                            className="article-tags my-2"
                            tags={article.tags}
                        />
                        {parseWpHtml(article.excerpt.rendered)}
                    </Col>
                </Row>
            </div>
        </Col>
    );
}

export default NewsCondensed;

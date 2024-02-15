import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { dateTimeFormat } from '../../../helpers/helpers';
import { parseWpHtml } from '../../../helpers/wp';

import Media from '../Media';

function NewsList({ article, clickHandler, keyUpHandler }) {
    return (
        <Col md={12}>
            <div
                id={article.slug}
                className="article hover-bg"
                onClick={clickHandler}
                onKeyUp={keyUpHandler}
                role="link"
                tabIndex={0}
            >
                <Row className="align-items-center">
                    <Col md={5} lg={3}>
                        <div className="thumb mb-2 mb-md-0">
                            <figure className="text-center text-xxl-start">
                                <Media
                                    alt={article.title.rendered}
                                    id={article.featured_media}
                                />
                            </figure>
                        </div>
                    </Col>
                    <Col>
                        <h2>{article.title.rendered}</h2>
                        <div className="article-date my-2">
                            {dateTimeFormat(article.date)}
                        </div>
                        {parseWpHtml(article.excerpt.rendered)}
                    </Col>
                </Row>
            </div>
        </Col>
    );
}

export default NewsList;

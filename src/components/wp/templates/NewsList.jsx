import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { dateTimeFormat } from '../../../helpers/helpers';
import { routes } from '../../../helpers/routes';
import { parseWpHtml } from '../../../helpers/wp';

import Media from '../Media';
import PartyTags from '../PartyTags';

function NewsList({ article }) {
    return (
        <Col md={12}>
            <Link
                id={article.slug}
                className="article hover-bg"
                state={{ article }}
                to={routes.article(article.slug)}
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
                        <PartyTags
                            className="article-tags my-2"
                            tags={article.tags}
                        />
                        <div className="article-excerpt">
                            {parseWpHtml(article.excerpt.rendered)}
                        </div>
                    </Col>
                </Row>
            </Link>
        </Col>
    );
}

export default NewsList;

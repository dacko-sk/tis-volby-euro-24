import { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { labels, t } from '../../helpers/dictionary';

import useCookies, {
    generateSetter,
    setAnaliticsStorage,
} from '../../hooks/Cookies';

import './CookieBanner.scss';

function CookieBanner() {
    const { cookies, setCookies } = useCookies();
    const [checkFunctional, setCheckFunctional] = useState(
        cookies && (cookies.functional ?? false) ? cookies.functional : false
    );
    const [checkAnalytics, setCheckAnalytics] = useState(
        cookies && (cookies.analytics ?? false) ? cookies.analytics : false
    );

    const checkFunctionalChange = (event) => {
        setCheckFunctional(event.target.checked);
    };

    const checkAnalyticsChange = (event) => {
        setCheckAnalytics(event.target.checked);
    };

    const openSettingsClick = () => {
        setCookies(generateSetter(true, checkFunctional, checkAnalytics));
    };

    const acceptSelectionClick = () => {
        setCookies(generateSetter(false, checkFunctional, checkAnalytics));
    };

    const setAllChecks = (enabled) => {
        setCheckFunctional(enabled);
        setCheckAnalytics(enabled);
        setCookies(generateSetter(false, enabled, enabled));
    };

    const rejectAllClick = () => setAllChecks(false);

    const acceptAllClick = () => setAllChecks(true);

    // update google tag privacy rules on first load
    useEffect(() => {
        setAnaliticsStorage(false);
    }, []);

    return (
        <div className="my-3">
            <Button variant="primary" onClick={openSettingsClick}>
                {t(labels.cookies.settings)}
            </Button>
            {cookies.open && (
                <Container fluid className="cookie-banner py-4">
                    <Row className="justify-content-center">
                        <Col xs="auto">
                            <p>
                                {`${t(labels.cookies.about)} `}
                                <a
                                    href="https://transparency.sk/sk/sukromie/"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {t(labels.learnMore)}
                                </a>
                            </p>

                            <Accordion flush className="my-3">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                        {t(labels.cookies.optional)}
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <Form className="d-flex justify-content-center flex-column flex-sm-row">
                                            <Form.Check
                                                className="mx-2"
                                                disabled
                                                checked
                                                type="switch"
                                                id="cookies-necessary"
                                                label={t(
                                                    labels.cookies.types
                                                        .necessary
                                                )}
                                            />
                                            <Form.Check
                                                className="mx-2"
                                                checked={checkFunctional}
                                                onChange={checkFunctionalChange}
                                                type="switch"
                                                label={t(
                                                    labels.cookies.types
                                                        .functional
                                                )}
                                                id="cookies-functional"
                                            />
                                            <Form.Check
                                                className="mx-2"
                                                checked={checkAnalytics}
                                                onChange={checkAnalyticsChange}
                                                type="switch"
                                                label={t(
                                                    labels.cookies.types
                                                        .analytics
                                                )}
                                                id="cookies-analytics"
                                            />
                                        </Form>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>

                            <div className="d-flex justify-content-center flex-column flex-sm-row">
                                <Button
                                    className="mb-2 mb-sm-0 me-0 me-sm-3"
                                    variant="success"
                                    onClick={rejectAllClick}
                                >
                                    {t(labels.cookies.reject)}
                                </Button>
                                <Button
                                    className="mb-2 mb-sm-0 me-0 me-sm-3"
                                    variant="success"
                                    onClick={acceptSelectionClick}
                                >
                                    {t(labels.cookies.selected)}
                                </Button>
                                <Button
                                    // className="m-2"
                                    variant="secondary"
                                    onClick={acceptAllClick}
                                >
                                    {t(labels.cookies.accept)}
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            )}
        </div>
    );
}

export default CookieBanner;

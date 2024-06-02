import { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { useDebouncedCallback } from 'use-debounce';

import { labels, t } from '../../helpers/dictionary';
import { routes } from '../../helpers/routes';

function SearchField() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const params = useParams();
    const query = params.query ?? null;
    const [searchQuery, setSearchQuery] = useState(query);
    const [collapsed, setCollapsed] = useState(true);

    const debouncedSearch = useDebouncedCallback((value) => {
        navigate(routes.search(value));
    }, 500);

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
        debouncedSearch(e.target.value);
    };

    const handleFormSumbit = (e) => {
        e.preventDefault();
    };

    // clear search input when navigating away from search results page
    useEffect(() => {
        if (!query) {
            setSearchQuery(null);
        }
    }, [pathname]);

    return (
        <Form className="mt-2 mt-lg-0 mx-0 mx-lg-2" onSubmit={handleFormSumbit}>
            <InputGroup>
                <Form.Control
                    className="d-lg-none d-xl-block"
                    placeholder={t(labels.search.label)}
                    aria-label={t(labels.search.label)}
                    aria-describedby="search-icon"
                    id="search"
                    onChange={handleInputChange}
                    value={searchQuery || ''}
                />
                <Form.Control
                    className={`position-absolute d-none d-xl-none ${
                        collapsed ? 'd-lg-none' : 'd-lg-block'
                    }`}
                    placeholder={t(labels.search.label)}
                    aria-label={t(labels.search.label)}
                    aria-describedby="search-icon"
                    id="collapsible-search"
                    onChange={handleInputChange}
                    value={searchQuery || ''}
                />
                <InputGroup.Text
                    id="search-icon"
                    className="d-xl-flex"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    🔍
                </InputGroup.Text>
            </InputGroup>
        </Form>
    );
}

export default SearchField;

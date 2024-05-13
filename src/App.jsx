import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import {
    homepage,
    languageRoot,
    languages,
    routes,
    segments,
    urlSegment,
} from './helpers/routes';

import ContextProviders from './ContextProviders';
import Layout from './Layout';

import Analyses from './pages/Analyses';
import Article from './pages/Article';
import Home from './pages/Home';
import News from './pages/News';
import Online from './pages/Online';
import Parties from './pages/Parties';
import PartiesCandidates from './pages/parties/PartiesCandidates';
import PartiesList from './pages/parties/PartiesList';
import Party from './pages/Party';
import PartyNews from './pages/party/PartyNews';
import PartyOnline from './pages/party/PartyOnline';
import PartyOverview from './pages/party/PartyOverview';
import PartyTransactions from './pages/party/PartyTransactions';
import Search from './pages/Search';

import './scss/volby-24.scss';

function App() {
    return (
        <ContextProviders>
            <BrowserRouter>
                <Routes>
                    <Route path={homepage} element={<Layout />}>
                        <Route index element={<Home />} />

                        {Object.keys(languages).map((lang) =>
                            [
                                [routes.home(lang), Home],
                                [routes.analyses(lang), Analyses],
                                [routes.article(true, lang), Article],
                                [routes.news(lang), News],
                                [routes.online(lang), Online],
                                [
                                    routes.parties('', lang),
                                    Parties,
                                    [
                                        ['', PartiesList],
                                        [
                                            segments.CANDIDATES,
                                            PartiesCandidates,
                                        ],
                                    ],
                                ],
                                [
                                    routes.party(true, '', lang),
                                    Party,
                                    [
                                        ['', PartyOverview],
                                        [segments.NEWS, PartyNews],
                                        [segments.ONLINE, PartyOnline],
                                        [
                                            segments.TRANSACTIONS,
                                            PartyTransactions,
                                        ],
                                    ],
                                ],
                                [routes.search(true, lang), Search],
                            ].map(([path, Page, subpages]) => (
                                <Route
                                    key={path}
                                    path={path}
                                    element={<Page />}
                                >
                                    {(subpages ?? []).map(
                                        ([subSegment, SubPage]) => (
                                            <Route
                                                key={path + subSegment}
                                                index={subSegment ? null : true}
                                                path={
                                                    subSegment
                                                        ? urlSegment(
                                                              subSegment,
                                                              lang
                                                          )
                                                        : null
                                                }
                                                element={<SubPage />}
                                            />
                                        )
                                    )}
                                </Route>
                            ))
                        )}

                        {/* fallback */}
                        <Route
                            path="*"
                            element={<Navigate to={languageRoot()} />}
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ContextProviders>
    );
}

export default App;

import siteConfig from '../../package.json';

export const separators = {
    array: '|',
    parts: '_',
    newline: '\n',
    numbers: '-',
    space: '.',
    url: '/',
    value: '~',
};

export const languages = {
    sk: 'sk',
    en: 'en',
};

export const locales = {
    [languages.sk]: 'sk-SK',
    [languages.en]: 'en-US',
};

export const defaultLanguage = Object.values(languages)[0];

export const segments = {
    ANALYSES: 'ANALYSES',
    ANALYSIS: 'ANALYSIS',
    ASSETS: 'ASSETS',
    NEWS: 'NEWS',
    ONLINE: 'ONLINE',
    PARTIES: 'PARTIES',
    SEARCH: 'SEARCH',
    TRANSACTIONS: 'TRANSACTIONS',
};

export const localSegments = {
    [languages.sk]: {
        [segments.ANALYSES]: 'hodnotenia',
        [segments.ANALYSIS]: 'hodnotenie',
        [segments.ASSETS]: 'majetkove-priznania',
        [segments.PARTIES]: 'strany',
        [segments.NEWS]: 'aktuality',
        [segments.ONLINE]: 'online',
        [segments.SEARCH]: 'vyhladavanie',
        [segments.TRANSACTIONS]: 'financovanie',
    },
    [languages.en]: {
        [segments.ANALYSES]: 'assesments',
        [segments.ANALYSIS]: 'assesment',
        [segments.ASSETS]: 'assets',
        [segments.PARTIES]: 'parties',
        [segments.NEWS]: 'news',
        [segments.ONLINE]: 'online',
        [segments.SEARCH]: 'search',
        [segments.TRANSACTIONS]: 'financing',
    },
};

export const homepage = siteConfig.homepage ?? '/';

export const getCurrentLanguage = () =>
    document.location.pathname.substring(
        homepage.length,
        homepage.length + 2
    ) === languages.en
        ? languages.en
        : languages.sk;

export const getCurrentLocale = () => locales[getCurrentLanguage()];

export const languageRoot = (language) =>
    homepage +
    ((language || getCurrentLanguage()) === languages.en
        ? languages.en + separators.url
        : '');

export const localizePath = (lang, path) => {
    const cp = path ?? document.location.pathname;
    const cl = getCurrentLanguage();
    if (cl === lang) {
        return cp;
    }
    const cr = languageRoot();
    const cs = cp.substring(cr.length).split(separators.url);
    const as = Object.entries(localSegments[cl]);
    const ts = cs.map((segment) => {
        let tk = null;
        as.some(([key, translation]) => {
            if (segment === translation) {
                tk = key;
                return true;
            }
            return false;
        });
        return tk ? localSegments[lang][tk] : segment;
    });
    return languageRoot(lang) + ts.join(separators.url);
};

export const urlSegment = (segment, lang) => {
    return localSegments[lang || getCurrentLanguage()][segment] ?? segment;
};

export const routes = {
    analyses: (lang) =>
        languageRoot(lang) + urlSegment(segments.ANALYSES, lang),
    article: (slug, lang) =>
        languageRoot(lang) +
        (slug
            ? urlSegment(segments.NEWS, lang) +
              separators.url +
              (slug === true ? ':slug' : slug)
            : ''),
    home: (lang) => languageRoot(lang),
    news: (lang) => languageRoot(lang) + urlSegment(segments.NEWS, lang),
    online: (lang) => languageRoot(lang) + urlSegment(segments.ONLINE, lang),
    parties: (lang) => languageRoot(lang) + urlSegment(segments.PARTIES, lang),
    party: (slug, subpage, lang) => {
        const niceSlug =
            slug === true
                ? ':slug'
                : encodeURIComponent(slug.replaceAll(' ', separators.space));
        return (
            languageRoot(lang) +
            (slug
                ? urlSegment(segments.PARTIES, lang) +
                  separators.url +
                  niceSlug +
                  (subpage ? separators.url + urlSegment(subpage, lang) : '')
                : '')
        );
    },
    search: (query, lang) =>
        languageRoot(lang) +
        (query
            ? urlSegment(segments.SEARCH, lang) +
              separators.url +
              (query === true ? ':query' : encodeURIComponent(query))
            : ''),
};

export const decodeSlug = (slug) => slug.replaceAll(separators.space, ' ');

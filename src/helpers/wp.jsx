import parse, { attributesToProps, domToReact } from 'html-react-parser';

import { decodeHTMLEntities, isNumeric } from './helpers';
import { routes } from './routes';

export const wpCat = {
    analyses: 948,
    assets: 949,
    featured: 957,
    news: 947,
};

const proxyHttpImages = (html) => {
    const regex = /(http:\/\/cms.transparency.sk\/[^",]+.(png|jpe?g|gif|svg))/i;
    return html.replace(regex, 'https://images.weserv.nl/?url=$1');
};

const parserOptions = {
    replace: ({ name, attribs, children }) => {
        if (
            name === 'div' &&
            attribs &&
            (attribs.class || '').includes('wp-block-image')
        ) {
            // remove "wp-block-image" wrappers, keep just children
            return domToReact(children, parserOptions);
        }
        if (
            name === 'p' &&
            attribs &&
            (attribs.class || '').includes('has-text-align-')
        ) {
            // replace paragraph alignment classes from WP with BS5 classes
            return (
                <p
                    className={attribs.class.replace(
                        /\bhas-text-align-(\w+)\b/g,
                        'text-$1'
                    )}
                >
                    {domToReact(children, parserOptions)}
                </p>
            );
        }
        if (name === 'img' && attribs && attribs.src) {
            const props = {
                ...attributesToProps(attribs),
                // proxy image to force https
                src: proxyHttpImages(attribs.src),
                // add bootstrap 5 classes to images
                className: 'figure-img img-fluid',
            };
            return <img {...props} />;
        }
        if (name === 'a') {
            if (
                children.length &&
                children[0].type === 'text' &&
                children[0].data.startsWith('Continue reading')
            ) {
                // remove "continue reading" links to WP domain
                return <></>;
            }
            if (attribs) {
                if (attribs.rel && attribs.rel.startsWith('lightbox')) {
                    // remove lightbox links
                    // will recursively run parser on children
                    return domToReact(children, parserOptions);
                }
                if (attribs.href.startsWith('http://')) {
                    const props = {
                        ...attributesToProps(attribs),
                        // force http links to https
                        href: attribs.href.replace('http://', 'https://'),
                    };
                    return (
                        <a {...props}>{domToReact(children, parserOptions)}</a>
                    );
                }
            }
        }
        if (name === 'figure') {
            // add bootstrap 5 classes to figures, remove "wp-block-image" class
            return (
                <figure
                    className={`figure text-center w-100 ${(attribs.class || '')
                        .replace('wp-block-image', '')
                        .trim()}`}
                >
                    {domToReact(children, parserOptions)}
                </figure>
            );
        }
        if (name === 'figcaption') {
            // add bootstrap 5 classes to figcaptions
            return (
                <figcaption className="figure-caption col-11 col-md-10 col-lg-8 col-xl-6 mx-auto">
                    {domToReact(children, parserOptions)}
                </figcaption>
            );
        }
        // otherwise no replacement
        return null;
    },
};

export const parseWpHtml = (html) => parse(html, parserOptions);

export const processArticles = (data) =>
    data.map((article) => ({
        ...article,
        title: {
            ...article.title,
            // fix titles
            rendered: decodeHTMLEntities(article.title.rendered),
        },
    }));

/**
 * Analysis helpers
 */
export const resources = {
    methodology: routes.article(
        'ako-sme-hodnotili-transparentnost-kampani-pred-parlamentnymi-volbami-2023'
    ),
    pressRelease: routes.article(
        'len-styri-predvolebne-kampane-su-transparentne'
    ),
    pressRelease2: routes.article(
        'vitazi-poslednych-volieb-vedu-najmenej-transparentne-kampane'
    ),
};

export const metaData = {
    coalition: 'coalition',
    leader: 'leader',
    fb: 'fb',
    web: 'web',
};

export const baseData = {
    date: 'date',
    score: 'score',
};

export const transparencyClasses = {
    good: 'good',
    average: 'average',
    bad: 'bad',
    unknown: 'unknown',
};

export const transparencyIndicators = {
    account: 'account',
    financing: 'financing',
    information: 'information',
};

export const indicatorsCriteria = {
    [transparencyIndicators.account]: 5,
    [transparencyIndicators.financing]: 5,
    [transparencyIndicators.information]: 6,
};

export const transparencyClass = (score) => {
    let cls = transparencyClasses.unknown;
    const num = Number(score);
    if (isNumeric(num) && num > -1) {
        cls = transparencyClasses.bad;
        if (score >= 40) {
            cls =
                score >= 70
                    ? transparencyClasses.good
                    : transparencyClasses.average;
        }
    }
    return cls;
};

export const parseAnalysisData = (html) => {
    if (html) {
        const start = '<tbody><tr>';
        const end = '</tr></tbody>';
        const startPos = html.indexOf(start);
        const endPos = html.indexOf(end);

        if (startPos > -1 && endPos > -1) {
            // parse table
            const tableData = [];
            html.substring(startPos + start.length, endPos)
                .replaceAll('<tr>', '')
                .split('</tr>')
                .forEach((row) => {
                    const cols = [];
                    row.split('</td>').forEach((col, index) => {
                        // ignore first row (names), save the rest into tableData
                        if (index > 0 && col.trim()) {
                            const val = col
                                .replaceAll('<td>', '')
                                .replaceAll(/<a[^>]*>/g, '')
                                .replaceAll(/<\/a>/g, '');
                            const num = Number(val.replaceAll(',', '.'));
                            cols.push(
                                val && isNumeric(num)
                                    ? // not empty & numeric
                                      num
                                    : // string
                                      decodeHTMLEntities(val)
                            );
                        }
                    });
                    tableData.push(cols);
                });

            // extract data from parsed table
            const metaProps = Object.keys(metaData);
            const baseProps = Object.keys(baseData);
            let required = metaProps.length + baseProps.length;
            Object.keys(transparencyIndicators).forEach((group) => {
                required += indicatorsCriteria[group];
            });

            if (tableData.length >= required) {
                const analysis = {
                    base: {},
                    lastColumn: -1,
                    lastScore: -1,
                    meta: {},
                };
                let rowKey = 0;

                // campaign metaData
                metaProps.forEach((prop) => {
                    // only first column is used
                    [analysis.meta[prop]] = tableData[rowKey];
                    rowKey += 1;
                });

                const validColumns = [];
                // get valid columns by checking the score row - it is the last one from the baseProps
                // if empty or not numeric, ignore the column
                tableData[rowKey + baseProps.length - 1].forEach(
                    (column, columnKey) => {
                        if (column !== '') {
                            validColumns.push(columnKey);
                            analysis.lastColumn += 1;
                            analysis.lastScore = isNumeric(column)
                                ? column
                                : -1;
                        }
                    }
                );
                // base campaign data
                baseProps.forEach((prop) => {
                    // remove invalid columns
                    tableData[rowKey].forEach((column, columnKey) => {
                        if (!validColumns.includes(columnKey)) {
                            tableData[rowKey].splice(columnKey, 1);
                        }
                    });
                    // save valid columns as property value
                    analysis.base[prop] = tableData[rowKey];
                    rowKey += 1;
                });

                // transparency analysis indicators
                Object.keys(transparencyIndicators).forEach((group) => {
                    analysis[group] = [];
                    Array.from({ length: indicatorsCriteria[group] }).forEach(
                        () => {
                            // remove invalid columns
                            tableData[rowKey].forEach((column, columnKey) => {
                                if (!validColumns.includes(columnKey)) {
                                    tableData[rowKey].splice(columnKey, 1);
                                }
                            });
                            // save valid columns as property value
                            analysis[group].push(tableData[rowKey]);
                            rowKey += 1;
                        }
                    );
                });

                return analysis;
            }
        }
    }
    return {
        error: 'Corrupted table format',
    };
};

export const sortByScore = (a, b) => {
    if (
        (a.analysis.lastScore ?? false) &&
        (b.analysis.lastScore ?? false) &&
        a.analysis.lastScore !== b.analysis.lastScore
    ) {
        return b.analysis.lastScore - a.analysis.lastScore;
    }
    // if score is identical or invalid, sort by party name
    // return a.title.rendered.localeCompare(b.title.rendered);
    return -1;
};

export const getAnalysedData = (data) => {
    // keep only articles having tags
    return processArticles(data)
        .flatMap((article) =>
            article.tags.length
                ? [
                      {
                          ...article,
                          analysis: parseAnalysisData(article.content.rendered),
                      },
                  ]
                : []
        )
        .sort(sortByScore);
};

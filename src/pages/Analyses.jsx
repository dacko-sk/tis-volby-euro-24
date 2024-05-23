import { Link } from 'react-router-dom';

import { setTitle } from '../helpers/browser';
import { labels, t } from '../helpers/dictionary';
import { getCurrentLanguage, languages } from '../helpers/routes';
import { resources, wpCat } from '../helpers/wp';

import AlertWithIcon from '../components/general/AlertWithIcon';
import Title from '../components/structure/Title';
import Posts, { templates } from '../components/wp/Posts';

function Analyses() {
    setTitle(t(labels.analyses.pageTitle));

    const introText = {
        [languages.sk]: (
            <>
                <AlertWithIcon className="my-4" variant="primary">
                    Tlačová správa k hodnoteniu transparentnosti kampaní:{' '}
                    <Link to={resources.pressRelease}>
                        Najmenej transparentnú kampaň vedie Peter Pellegrini
                    </Link>
                    .
                </AlertWithIcon>

                <p className="mt-4">
                    V poradí šiesta priama voľba prezidenta neunikla pozornosti
                    Transparency International Slovensko, ktorá sleduje kampane
                    všetkých 11 prezidentských kandidátov. Do hodnotenia
                    transparentnosti zaradila šesť kampaní, pri ktorých výdavky
                    ku dňu hodnotenia prekročili hranicu 20-tisíc eur, čo sú
                    4-percentá z limitu výdavkov 500-tisíc eur platiaceho pre
                    prezidentské voľby. Zvyšných päť kandidátov neviedlo žiadnu
                    platenú kampaň, alebo len v minimálnom rozsahu, kvôli čomu
                    ich nebolo možné adekvátne zhodnotiť a porovnať.
                </p>
                <p>
                    Výsledkom hodnotenia je rozradenie kandidátov na princípe
                    semafora do štyroch kategórií:
                </p>
                <ul className="arrows lh-lg">
                    <li>
                        <span className="badge score-good">
                            Transparentná kampaň (zelená farba)
                        </span>
                    </li>
                    <li>
                        <span className="badge score-average">
                            Kampaň s výhradami (oranžová farba)
                        </span>
                    </li>
                    <li>
                        <span className="badge score-bad">
                            Netransparentná kampaň (červená farba)
                        </span>
                    </li>
                    <li>
                        <span className="badge score-unknown">
                            Nedostatok dát / nehodnotené (šedá farba)
                        </span>
                    </li>
                </ul>
                <p>
                    Hodnotenie je doplnené informáciou o dosiahnutom výslednom
                    percentuálnom skóre.
                </p>
                <p>
                    Podstatou hodnotenia je nielen preskúmať dodržiavanie
                    zákonných pravidiel pre vedenie kampaní, ktoré sú však v
                    mnohom deravé, ale aj ochotu kandidátov spraviť pre verejnú
                    kontrolu niečo naviac. Pozostáva z 15 indikátorov
                    rozdelených do troch kategórií:
                </p>
                <ul className="arrows lh-lg">
                    <li>Transparentný účet (50% váha)</li>
                    <li>Financovanie kampane (30% váha)</li>
                    <li>Informovanosť o kampani (20% váha)</li>
                </ul>
                <p>
                    Kľúčovým pre hodnotenie (najvyššia váha) je spôsob, akým
                    kandidát vedie svoj transparentný účet, ktorý má poskytovať
                    úplný a reálny obraz o jeho kampani. Dôležitým je i spôsob
                    financovania kampane, ktorá v prípade prezidentských volieb
                    môže byť postavená iba na daroch.
                </p>
                <p>
                    Hodnotenie vychádza aj z informácií zverejnených na
                    volebných weboch, sociálnych sieťach strán, z dát v knižnici
                    reklám Facebooku, monitoringu outdoorovej kampane agentúrou
                    Kantar, ako aj z testovania odozvy strán na otázky voličov.
                    Kandidátom bola ponúknutá možnosť vyplniť rozšírený formulár
                    majetkového priznania v podobe, ako o ňom v uplynulom
                    volebnom období diskutovala pracovná skupina na pôde
                    parlamentu.
                </p>
                <p className="mb-4">
                    Podrobnejšie výsledky nájdete v sekcii nižšie a v{' '}
                    <Link to={resources.methodology}>Metodike hodnotenia</Link>.
                </p>
            </>
        ),
        [languages.en]: (
            <>
                <AlertWithIcon className="my-4" variant="primary">
                    Press release (Slovak only):{' '}
                    <Link to={resources.pressRelease}>
                        Najmenej transparentnú kampaň vedie Peter Pellegrini
                    </Link>
                    .
                </AlertWithIcon>

                <p className="mt-4">
                    The sixth direct presidential election did not escape the
                    attention of Transparency International Slovakia, which
                    diligently monitors the campaigns of all 11 candidates. Our
                    transparency assesment focused on six campaigns, whose
                    expenditures exceeded 20,000 €, as of the date of the
                    assesment, which constitutes 4 percent of the 500,000 €
                    spending limit applicable to presidential elections. The
                    remaining five candidates either conducted minimal paid
                    campaigns or none at all, rendering it challenging to
                    adequately evaluate and compare them.
                </p>
                <p>
                    To present our findings clearly, we adopted a traffic light
                    system, assigning a color to each candidate based on our
                    assessment:
                </p>
                <ul className="arrows lh-lg">
                    <li>
                        <span className="badge score-good">
                            Transparent campaign (green color)
                        </span>
                    </li>
                    <li>
                        <span className="badge score-average">
                            Campaign with reservations (orange color)
                        </span>
                    </li>
                    <li>
                        <span className="badge score-bad">
                            Non-transparent campaign (red color)
                        </span>
                    </li>
                    <li>
                        <span className="badge score-unknown">
                            Lack of data / not evaluated (grey color)
                        </span>
                    </li>
                </ul>
                <p>
                    The evaluation also includes information about the achieved
                    final percentage score.
                </p>
                <p>
                    The essence of our evaluation extends beyond examining
                    compliance with legal campaign regulations, which are often
                    porous, to assessing candidates&apos; willingness to undergo
                    public scrutiny. It comprises 15 indicators across three
                    categories:
                </p>
                <ul className="arrows lh-lg">
                    <li>Transparent bank account (50% weight)</li>
                    <li>Campaign financing (30% weight)</li>
                    <li>Campaign awareness raising (20% weight)</li>
                </ul>
                <p>
                    Key to the assessment (highest weight) is the way the
                    candidate maintains his transparent account, which should
                    provide a comprehensive and realistic picture of his
                    campaign. Equally significant is the method of campaign
                    financing, which, in presidential elections, is exclusively
                    reliant on donations.
                </p>
                <p>
                    Our evaluation draws from various sources including
                    information published on election websites, social media
                    platforms of candidates, data from Facebook ad library,
                    Kantar agency’s outdoor campaign monitoring, as well as
                    testing of the candidates‘ responses to voters&apos;
                    questions. Candidates were given the option to complete an
                    extended declaration of assets form, as discussed by the
                    parlimentary working group during the previous election
                    period.
                </p>
                <p className="mb-4">
                    For a more detailed overview of the results, please refer to
                    the section below and consult our{' '}
                    <Link to={resources.methodology}>
                        Evaluation Methodology
                    </Link>
                    .
                </p>
            </>
        ),
    };

    return (
        <section>
            <Title>{t(labels.analyses.pageTitle)}</Title>

            <Posts
                categories={[wpCat.featured]}
                noResults={t(labels.analysis.noAnalyses)}
                template={templates.featured}
            />

            {introText[getCurrentLanguage()]}

            <Posts
                categories={[wpCat.analyses]}
                noResults={t(labels.analysis.noAnalyses)}
            />
        </section>
    );
}

export default Analyses;

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
                    Tlačová správa k prvému hodnoteniu transparentnosti kampaní:{' '}
                    <Link to={resources.pressRelease}>
                        Len štyri predvolebné kampane sú transparentné
                    </Link>
                    .
                </AlertWithIcon>

                <AlertWithIcon className="my-4" variant="primary">
                    Tlačová správa k druhému hodnoteniu transparentnosti
                    kampaní:{' '}
                    <Link to={resources.pressRelease2}>
                        Víťazi posledných volieb vedú najmenej transparentné
                        kampane
                    </Link>
                    .
                </AlertWithIcon>

                <p className="mt-4">
                    Koncom septembra 2023 si slovenskí voliči v predčasných
                    voľbách vyberú nové zloženie parlamentu, z ktorého vzíde aj
                    nová vláda. Vo volebných miestnostiach sa budeme rozhodovať
                    medzi kandidátnymi listinami 24 strán a jednej volebnej
                    trojkoalície.
                </p>
                <p>
                    Napriek tomu, že sú to práve politici, ktorí nastavujú
                    limity a pravidlá, v predvolebnom zápase majú mnohí z nich
                    stále problémy s ich dodržiavaním. Ľahostajný prístup k
                    transparentnosti kampane a jej financovania môže mnohé
                    napovedať aj o prístupe politikov k zverenej moci po
                    voľbách. Uvedomujú si to aj voliči. Podľa reprezentatívneho
                    prieskumu agentúry IPSOS pre Transparency by bol
                    netransparentný alebo nehodnoverný spôsob financovania
                    kampane závažnou prekážkou pre voľbu takejto strany až pre
                    46% respondentov.
                </p>
                <p>
                    V Transparency preto dlhodobo férovosť a transparentnosť
                    kampaní monitorujeme a politikov nabádame k zvyšovaniu
                    štandardov. Po prezidentských voľbách 2019, parlamentných
                    voľbách 2020 a samosprávnych voľbách 2022 sme sa aj
                    tentokrát bližšie pozreli na spôsob vedenia kampaní
                    politickými stranami a zostavili{' '}
                    <Link to={resources.pressRelease}>
                        hodnotenie ich transparentnosti
                    </Link>
                    .
                </p>
                <p>
                    Zamerali sme sa predovšetkým na informácie z transparentných
                    účtov, webov a sociálnych sietí strán, kládli sme im však aj
                    podrobnejšie otázky o predkampani, darcoch či veriteľoch a
                    testovali ochotu volebných lídrov vyplniť rozšírené
                    majetkové priznanie.
                </p>
                <p>
                    Z 27 kandidujúcich subjektov sme prvé hodnotenie (zverejnené
                    25.8.2023) spracovali pre 15 strán a druhé hodnotenie
                    (zverejnené 25. 9. 2023) pre 17 strán, ktoré mali v čase
                    hodnotenia na transparentnom účte výdavky za aspoň 50-tisíc
                    eur a aspoň 10 väčších výdavkových transakcií.
                </p>
                <p>
                    Pre lepšiu prehľadnosť sme zvolili princíp semafora - pri
                    každej z hodnotených strán tak svieti jedno z hodnotení:
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
                <p className="mb-4">
                    Podrobnejšie výsledky nájdete v sekcii nižšie a v{' '}
                    <Link to={resources.methodology}>Metodike hodnotenia</Link>.
                </p>
            </>
        ),
        [languages.en]: (
            <>
                <AlertWithIcon className="my-4" variant="primary">
                    First assessment press release (Slovak only):{' '}
                    <Link to={resources.pressRelease}>
                        Len štyri predvolebné kampane sú transparentné
                    </Link>
                    .
                </AlertWithIcon>

                <AlertWithIcon className="my-4" variant="primary">
                    Second assessment press release (Slovak only):{' '}
                    <Link to={resources.pressRelease2}>
                        Víťazi posledných volieb vedú najmenej transparentné
                        kampane
                    </Link>
                    .
                </AlertWithIcon>

                <p className="mt-4">
                    In late September 2023, Slovak voters will head to the polls
                    for early elections, marking a crucial moment that will
                    determine the new composition of the parliament and
                    subsequently, the formation of a fresh government. At
                    polling stations across the country, voters will be faced
                    with a choice among 24 parties and one tripartite coalition.
                </p>
                <p>
                    Despite the fact that politicians establish the limits and
                    rules, many of them struggle to adhere to these regulations
                    during election campaigns. The approach of politicians to
                    campaign transparency and financing speaks volumes about
                    their commitment to the responsibility entrusted to them
                    after the elections, a fact not lost on the discerning
                    voters. According to a representative survey conducted by
                    the IPSOS agency for Transparency, nearly half of the
                    respondents (46%) would be deterred from choosing a party if
                    its campaign financing was non-transparent or unreliable.
                </p>
                <p>
                    At Transparency, we have long been dedicated to monitoring
                    the fairness and transparency of political campaigns, urging
                    politicians to uphold higher standards. Following the 2019
                    presidential elections, the 2020 parliamentary elections,
                    and the 2022 municipal elections, we meticulously examined
                    how political parties conducted their campaigns and assessed
                    their{' '}
                    <Link to={resources.pressRelease}>
                        levels of transparency
                    </Link>
                    .
                </p>
                <p>
                    Our evaluation process involved analyzing information from
                    the parties&apos; transparent accounts, websites, and social
                    networks. We also delved deeper, posing questions about
                    pre-campaign activities, donors, creditors, and assessing
                    the willingness of party leaders to complete extended asset
                    declarations.
                </p>
                <p>
                    Out of the 27 entities running in the elections, we
                    conducted the first assessment (published on 25/08/2023) for
                    15 parties and the second assessment (published on
                    25/09/2023) for 17 parties that, at the time of assessment,
                    had incurred expenses of at least 50,000 euros and at least
                    10 significant spending transactions.
                </p>
                <p>
                    To present our findings clearly, we adopted a traffic light
                    system, assigning a color to each party based on our
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

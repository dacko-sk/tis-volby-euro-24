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
                        Transparentnú eurokampaň vedú len tri strany
                    </Link>
                    .
                </AlertWithIcon>

                <p className="mt-4">
                    Súčasťou monitoringu Volieb do Európskeho parlamentu 2024,
                    ktoré uskutočňuje Transparency International Slovensko (TIS)
                    je i hodnotenie transparentnosti kampaní strán. Vo voľbách
                    kandiduje 24 politických subjektov, TIS do hodnotenia
                    zaradila polovicu, teda 12 strán, ktoré ku dňu hodnotenia
                    vedú kampaň minimálne v rozsahu 50-tisíc eur (výdavky na
                    transparentnom účte). Zvyšné strany viedli kampaň v malom
                    finančnom rozsahu, kvôli čomu ich nebolo možné adekvátne
                    zhodnotiť a porovnať.
                </p>
                <p>
                    Výsledkom hodnotenia je rozradenie strán na princípe
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
                    mnohom deravé, ale aj ochotu politických strán spraviť pre
                    verejnú kontrolu niečo naviac. Pozostáva zo 16 indikátorov
                    rozdelených do troch kategórií:
                </p>
                <ul className="arrows lh-lg">
                    <li>Transparentný účet (50% váha)</li>
                    <li>Financovanie kampane (30% váha)</li>
                    <li>Informovanosť o kampani (20% váha)</li>
                </ul>
                <p>
                    Kľúčovým pre hodnotenie (najvyššia váha) je spôsob, akým
                    strana vedie svoj transparentný účet, ktorý má poskytovať
                    úplný a reálny obraz o jeho kampani. Dôležitým je i spôsob
                    financovania kampane, ktorá v prípade eurovolieb môže byť
                    postavená na štátnych príspevkoch, ktorými strany disponujú,
                    ďalších straníckych financiách, daroch ale aj pôžičkách.
                </p>
                <p>
                    Hodnotenie vychádza aj z informácií zverejnených na
                    volebných weboch, sociálnych sieťach strán, z dát v knižnici
                    reklám Facebooku, monitoringu outdoorovej kampane agentúrou
                    Kantar, ako aj z testovania odozvy strán na otázky voličov.
                    Lídrom kandidátok jednotlivý ch strán bola ponúknutá možnosť
                    vyplniť rozšírený formulár majetkového priznania v podobe,
                    ako o ňom v uplynulom volebnom období diskutovala pracovná
                    skupina na pôde parlamentu.
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
                        Transparentnú eurokampaň vedú len tri strany
                    </Link>
                    .
                </AlertWithIcon>

                <p className="mt-4">
                    As part of the monitoring of the 2024 European Parliament
                    elections conducted by Transparency International Slovakia
                    (TIS), there is an assessment of the transparency of party
                    campaigns. A total of 24 political entities are running in
                    the elections, and TIS has included half of them, i.e., 12
                    parties, in the assessment. These are the parties that, as
                    of the assessment date, have conducted campaigns with a
                    minimum expenditure of 50,000 euros (expenses on a
                    transparent account). The remaining parties conducted
                    campaigns on a small financial scale, making it impossible
                    to adequately assess and compare them.
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
                <p>
                    The evaluation also includes information about the achieved
                    final percentage score.
                </p>
                <p>
                    The essence of the assessment is not only to examine
                    compliance with legal rules for conducting campaigns, which
                    are often quite flawed, but also to assess the willingness
                    of political parties to do something extra for public
                    oversight. It comprises 16 indicators across three
                    categories:
                </p>
                <ul className="arrows lh-lg">
                    <li>Transparent bank account (50% weight)</li>
                    <li>Campaign financing (30% weight)</li>
                    <li>Campaign awareness raising (20% weight)</li>
                </ul>
                <p>
                    Key to the assessment (highest weight) is the way the party
                    maintains its transparent account, which should provide a
                    comprehensive and realistic picture of its campaign. Another
                    important issue is the way of financing the campaign, which
                    in the case of the European elections can be based on state
                    contributions, which the parties have at their disposal,
                    other party finances, donations, but also loans.
                </p>
                <p>
                    Our evaluation draws from various sources including
                    information published on election websites, social media
                    platforms of parties, data from Facebook ad library, Kantar
                    agency’s outdoor campaign monitoring, as well as from
                    testing the response of the parties to voters&#39;
                    questions. Leaders of parties were given the option to
                    complete an extended declaration of assets form, as
                    discussed by the parliamentary working group during the
                    previous election period.
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

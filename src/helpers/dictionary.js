import { elections as el } from './constants';
import {
    attributionKeys as oa,
    genderKeys as og,
    regionKeys as or,
} from './online';
import { getCurrentLanguage, languages } from './routes';
import {
    baseData as abd,
    metaData as amd,
    transparencyIndicators as ati,
    transparencyClasses as atc,
} from './wp';

import { accountKeys as ak } from '../hooks/AccountsData';

export const labels = {
    account: {
        allTransactions: [
            'Zobraziť všetky transakcie',
            'Show all transactions',
        ],
        balance: ['Zostatok', 'Balance'],
        partySpending: ['Priebežné výdavky strany', 'Party spending'],
        download: ['Stiahnuť ako CSV', 'Download as CSV'],
        expensesAmount: ['Počet výdavkov', 'Number of expenses'],
        finalReportDisclaimer: [
            'Súčet výdavkov všetkých strán podľa záverečných správ.',
            'Sum of spendings of all parties.',
        ],
        incomesAmount: ['Počet príjmov', 'Number of incomes'],
        info: ['Detail účtu', 'Account details'],
        noData: [
            'Neevidujeme transparentný účet strany',
            'Transparent account of the party is unknown',
        ],
        overview: [
            'Prehľad transakcií na transparentnom účte',
            'Transparent Account Transactions',
        ],
        tableCols: {
            [ak.account_name]: ['Názov účtu', 'Account name'],
            [ak.date]: ['Dátum', 'Date'],
            [ak.amount]: ['Suma', 'Amount'],
            [ak.message]: ['Popis platby', 'Payment details'],
            [ak.tx_type]: ['Druh platby', 'Type of payment'],
            [ak.vs]: ['VS', 'Variabile symbol'],
            [ak.ss]: ['ŠS', 'Specific symbol'],
        },
        title: ['Transparentné účty', 'Transparent accounts'],
        totalDisclaimer: [
            'Súčet výdavkov na transparentných účtoch všetkých strán.',
            'Sum of spendings on accounts of all parties.',
        ],
        totalSpending: ['Celkové výdavky strán', 'Total parties spending'],
    },
    ads: {
        amount: {
            accountsTitle: [
                'Počet reklám jednotlivých profilov',
                'Number of ads of individual profiles',
            ],
            disclaimer: [
                'Počet reklám od začiatku kampane 10. februára 2024.',
                'Number of ads since the beginning of campaign on February 10, 2024.',
            ],
            partiesTitle: [
                'Súčet počtov reklám všetkých profilov politickej strany',
                'Sum of ads amounts of all party profiles',
            ],
            partyAccountsTitle: [
                'Počet reklám jednotlivých profilov strany',
                'Number of ads of party individual profiles',
            ],
            title: ['Počet reklám', 'Amount of ads'],
        },
        google: {
            disclaimer: [
                'Politickú reklamu strán a ich politikov, zverejnenú prostredníctvom služieb Google Ads a Google Display & Video 360, sledujeme vďaka údajom, ktoré publikuje spoločnosť Google v Centre transparentnosti reklám. Sumy sú uvedené bez DPH.',
                'Political ads of parties and their politicians published in Google Ads and Google Display & Video 360 platforms is monitored thanks to the data published by Google in Google Ads Transparency Center. Amounts are without VAT.',
            ],
            format: {
                disclaimer: [
                    'Podiel jednotlivých formátov Google reklamy na celkových výdavkoch.',
                    'Share of individual Google Ads formats in total expenses.',
                ],
                title: ['Formáty reklamy', 'Ad format'],
            },
            spending: {
                accountsTitle: [
                    'Profily s výdavkami na reklamu nad 100 €',
                    'Profiles with advertising expenses exceeding 100 €',
                ],
                disclaimer: [
                    'Zobrazené sú len politické účty, ktoré prostredníctvom služieb Google Ads a Google Display & Video 360 uverejnili reklamy v hodnote nad 100 € od 10. februára 2024.',
                    'We list only profiles whose spending on Google Ads and Google Display & Video 360 platforms exceeded 100 € since February 10, 2024.',
                ],
            },
            title: ['Google'],
            topTitle: ['Top 10 Google kampaní', 'Top 10 Google campaigns'],
            totalDisclaimer: [
                'Súčet výdavkov politických účtov, ktoré prostredníctvom služieb Google Ads a Google Display & Video 360 uverejnili reklamy v hodnote nad 100 € od 10. februára 2024.',
                'Sum of expenses of profiles whose spending on Google Ads and Google Display & Video 360 platforms exceeded 100 € since February 10, 2024.',
            ],
            totalSpendingTitle: [
                'Výdavky na Google reklamu',
                'Advertising expenses in Google',
            ],
        },
        meta: {
            attribution: {
                allTitle: [
                    'Bilancia všetkých strán',
                    'Attribution by all parties',
                ],
                amount: ['Počet', 'Amount'],
                attrLabels: {
                    [oa.YES]: ['Správne označené', 'Correctly tagged'],
                    [oa.NO]: ['Neoznačené', 'Untagged'],
                    [oa['N/A']]: ['Nezistené', 'Unknown'],
                },
                campaign: ['Kampaň', 'Campaign'],
                disclaimer: [
                    'Povinné označenie objednávateľa a dodávateľa podľa zákona o volebnej kampani od oficiálneho začiatku kampane 10. februára 2024. Za správne označenú reklamu vyhodnocujeme statusy, v TEXTE ktorých je uvedený objednávateľ a dodávateľ reklamy. Statusy bez textu vyhodnocujeme ako "Nezistené".',
                    'Mandatory attribution of customer & supplier since the beginning of campaign on February 10, 2024. We evaluate status as correctly labeled if it contains "objednávateľ" and "dodávateľ" words in the TEXT. Statuses with no text are evaluated as "not detected"',
                ],
                pctTitle: [
                    'Rebríček správnosti označovania',
                    'Chart of attribution correctness',
                ],
                pctDisclaimer: [
                    'Podiel správne označených reklám podľa zákona o volebnej kampani od oficiálneho začiatku kampane 10. februára 2024. Za správne označenú reklamu vyhodnocujeme statusy, v TEXTE ktorých je uvedený objednávateľ a dodávateľ reklamy. Statusy bez textu vyhodnocujeme ako "Nezistené".',
                    'Share of correctly labeled ads since the beginning of campaign on February 10, 2024. We evaluate status as correctly labeled if it contains "objednávateľ" and "dodávateľ" words in the TEXT. Statuses with no text are evaluated as "not detected"',
                ],
                precampaign: ['Predkampaň', 'Precampaign'],
                title: [
                    'Označenie objednávateľa a dodávateľa',
                    'Attribution of customer and supplier',
                ],
            },
            demography: {
                ages: ['Vekové skupiny', 'Age groups'],
                agesDisclaimer: [
                    'Podiel zásahu reklám vo vekových skupinách obyvateľstva od 10. februára 2024.',
                    'Distribution of ads impressions between age groups since February 10, 2024.',
                ],
                genders: ['Pohlavia', 'Genders'],
                gendersDisclaimer: [
                    'Podiel zásahu reklám medzi pohlaviami od 10. februára 2024.',
                    'Distribution of ads impressions between genders since February 10, 2024.',
                ],
                genderLabels: {
                    [og.female]: ['Ženy', 'Females'],
                    [og.male]: ['Muži', 'Males'],
                    [og.unknown]: ['Nezistené', 'Unknown'],
                },
                title: [
                    'Demografické rozloženie reklamy',
                    'Ads demographic distribution',
                ],
            },
            disclaimer: [
                'Politickú reklamu strán a ich politikov na sociálnych sieťach Facebook a Instagram sledujeme vďaka údajom, ktoré publikuje spoločnosť Meta v knižnici Meta Ad Library. Sumy sú uvedené vrátane DPH.',
                'Political ads of parties and their politicians published on Facebook and Instagram platforms is monitored thanks to the data published by Meta in Meta Ad Library. Amounts are with VAT.',
            ],
            ranges: {
                accountsTitle: [
                    'Najviac inzerujúce profily od začiatku kampane',
                    'Profiles with highest advertising expenses range since the beginning of campaign',
                ],
                disclaimer: [
                    'Meta uvádza výdavky za reklamu v 100-eurových intervaloch, preto nie je možné urciť presnú sumu. Zobrazujeme celý interval a odhad výdavkov, ktorý je súčtom stredov intervalov všetkých reklám daného profilu zobrazovaných od 10. februára 2024.',
                    'Meta publishes advertising expenses in 100-eur intervals, therefore it is not possible to determine the exact amount. We show the whole interval and expenses estimate, which is the sum of middles of expenses intervals of all ads of the profile since February 10, 2024.',
                ],
                estimate: ['Odhadované výdavky', 'Estimated expenses'],
                partiesTitle: [
                    'Rozsah výdavkov všetkých profilov politickej strany od 10. februára 2024',
                    'Advertising expenses range of all profiles of the from February 10, 2024',
                ],
                partyAccountsTitle: [
                    'Najviac inzerujúce profily strany od začiatku kampane',
                    'Profiles of the party with highest advertising expenses range since the beginning of campaign',
                ],
                range: ['Skutočný rozsah výdavkov', 'Real expenses interval'],
            },
            regions: {
                allDisclaimer: [
                    'Podiel zásahu online reklamy všetkých strán v krajoch Slovenska od 10. februára 2024. Pre podrobnejšiu analýzu cielenia strán na regióny vzhľadom na veľkosť krajov, kliknite na názov profilu.',
                    'Distribution of ads impressions of all parties between regions of Slovakia since February 10, 2024. Click the profile name for detailed analysis of party targeting on regions based on their sizes.',
                ],
                diffAvg: [
                    'Odchýlka od priemerného zásahu strany v SR',
                    'Deviation from average impressions in Slovakia',
                ],
                diffAvgDisclaimer: [
                    'Odchýlka zásahu reklamy na jedného obyvateľa kraja od priemerného zásahu strany v celej SR.',
                    'Difference between impression per one citizen and average impressions in Slovakia',
                ],
                disclaimer: [
                    'Podiel zásahu online reklamy v krajoch Slovenska od 10. februára 2024. Vnútorný graf zobrazuje veľkosti krajov podľa počtu obyvateľov.',
                    'Distribution of ads impressions between regions of Slovakia since February 10, 2024. The inner chart shows sizes of regions based on number of citizens.',
                ],
                label: ['Podiel zásahu reklám', 'Distribution of impressions'],
                regionLabels: {
                    [or.BA]: ['Bratislavský kraj', 'Bratislava region'],
                    [or.BB]: ['Banskobystrický kraj', 'Banská Bystrica region'],
                    [or.KE]: ['Košický kraj', 'Košice region'],
                    [or.NR]: ['Nitriansky kraj', 'Nitra region'],
                    [or.PO]: ['Prešovský kraj', 'Prešov region'],
                    [or.TN]: ['Trenčiansky kraj', 'Trenčín region'],
                    [or.TT]: ['Trnavský kraj', 'Trnava region'],
                    [or.ZA]: ['Žilinský kraj', 'Žilina region'],
                },
                sizeLabel: [
                    'Podiel populácie SR žijúcej v tomto kraji',
                    'Share of citizens living in this region',
                ],
                title: [
                    'Regionálne rozloženie reklamy',
                    'Regional distribution of ads',
                ],
            },
            spending: {
                accountsTitle: [
                    'Profily s týždennými výdavkami na reklamu nad 100 €',
                    'Profiles with weekly advertising expenses exceeding 100 €',
                ],
                disclaimer: [
                    'Zobrazené sú len profily, ktorých týždňové výdavky od začiatku kampane 10. februára 2024 presiahli 100 €.',
                    'Includes Meta profiles whose weekly advertising expenses from the beginning of campaign on February 10, 2024 exceeded 100 €',
                ],
                partiesDisclaimer: [
                    'Započítané sú len profily na sociálnych sieťach platformy Meta, ktorých týždňové výdavky od začiatku kampane 10. februára 2024 presiahli 100 €. Pre kompletný zoznam započítaných straníckych profilov a podrobnejšie dáta o online kampani, kliknite na názov strany.',
                    'Includes Meta profiles whose weekly advertising expenses from the beginning of campaign on February 10, 2024 exceeded 100 €. Click the party name for complete list of included profiles.',
                ],
                partiesTitle: [
                    'Súčet výdavkov všetkých profilov politickej strany s týždennými výdavkami na reklamu nad 100 €',
                    'Sum of advertising expenses of all profiles of the party with weekly expenses exceeding 100 €',
                ],
                partyAccountsTitle: [
                    'Profily strany s týždennými výdavkami na reklamu nad 100 €',
                    'Party profiles with weekly advertising expenses exceeding 100 €',
                ],
                label: [
                    'Týždňové výdavky na reklamu',
                    'Weekly advertising expenses',
                ],
            },
            title: ['Meta'],
            topTitle: ['Top 10 Meta kampaní', 'Top 10 Meta campaigns'],
            totalDisclaimer: [
                'Súčet výdavkov na politickú reklamu na sociálnych sieťach platformy Meta. Započítané sú všetky profily, ktorých týždňové výdavky od začiatku kampane 10. februára 2024 presiahli 100 €.',
                'Sum of advertising expenses on social networks of Meta. Includes Meta profiles whose weekly advertising expenses from the beginning of campaign on February 10, 2024 exceeded 100 €',
            ],
            totalPartyDisclaimer: [
                'Súčet výdavkov na politickú reklamu na sociálnych sieťach platformy Meta. Započítané sú všetky profily strany, ktorých týždňové výdavky od začiatku kampane 10. februára 2024 presiahli 100 €.',
                'Sum of advertising expenses on social networks of Meta. Includes Meta profiles of the party whose weekly advertising expenses from the beginning of campaign on February 10, 2024 exceeded 100 €',
            ],
            totalSpendingTitle: [
                'Výdavky na Meta reklamu',
                'Advertising expenses in Meta',
            ],
        },
        noAccounts: [
            'Hľadanému výrazu nezodpovedá žiaden online účet.',
            'No online account matches the search query',
        ],
        noData: [
            'Neevidujeme žiaden účet strany s výdavkami na sponzorované príspevky na tejto platforme.',
            'We did not find any profiles of the party with sponsored ads on this platform.',
        ],
        pageTitle: ['Online kampane', 'Online campaigns'],
        percent: ['Podiel', 'Share'],
        showMore: [
            'Zistiť viac o online kampani',
            'Learn more about Online Campaigns',
        ],
    },
    all: ['Zobraziť všetko', 'Show all'],
    analyses: {
        navTitle: ['Hodnotenia', 'Assessments'],
        pageTitle: [
            'Hodnotenie transparentnosti kampaní',
            'Assessment of campaigns transparency',
        ],
        top: ['Top %i hodnotených kampaní', 'Top %i rated campaigns'],
        showAll: ['Zobraziť všetky hodnotenia', 'Show all assessments'],
    },
    analysis: {
        [abd.date]: ['Hodnotenie ku dňu', 'Evaluation date'],
        [abd.score]: ['Celkové hodnotenie', 'Assessment'],
        [amd.coalition]: ['Koalícia', 'Coalition'],
        [amd.fb]: ['FB profil', 'FB profile'],
        [amd.leader]: ['Líder kandidátky', 'Lead candidate'],
        [amd.web]: ['Volebný web', 'Elections web'],
        badges: [
            ['nezistené/netýka sa', 'áno', 'čiastočne', 'nie'],
            ['N/A', 'yes', 'partially', 'no'],
        ],
        history: ['História hodnotení', 'Assessments history'],
        indicators: {
            [ati.account]: [
                {
                    name: [
                        'Označovanie platiteľov a príjemcov',
                        'Identification of payers and recipients',
                    ],
                    desc: [
                        'Na transparentnom účte sú precízne označené vklady strany a príjemcovia platieb, vďaka čomu je možné identifikovať komu strana za kampaň platí.',
                        `The transparent account accurately identifies the party's deposits and recipients of payments, making it possible to identify who the party is paying for the campaign.`,
                    ],
                },
                {
                    name: ['Podrobnosť účtu', 'Account details'],
                    desc: [
                        'Transparentnosť kampane nie je znižovaná využívaním veľkých súhrnných platieb, najčastejšie pre agentúry, ktoré predstavujú značnú časť výdavkov v kampani.',
                        'Campaign transparency is not reduced by the use of large aggregate payments, most often to agencies, which represent a significant part of campaign spending.',
                    ],
                },
                {
                    name: ['Popisovanie výdavkov', 'Description of expenses'],
                    desc: [
                        'Predvolebná kampaň strany je kontrolovateľná vďaka zrozumiteľným a výstižným popisom, ktoré vysvetľujú účel jednotlivých platieb.',
                        `A party's election campaign is easily traceable due to clear and concise descriptions explaining the purpose of each payment.`,
                    ],
                },
                {
                    name: [
                        'Časová reálnosť výdavkov',
                        'Time Reality of Expenses',
                    ],
                    desc: [
                        'Výdavky na transparentom účte zodpovedajú reálnemu priebehu predvolebnej kampane. Strana sa vyhýba väčším zálohovým platbám, či využívaniu väčších faktúr s dlhou dobou splatnosti viac ako jeden mesiac.',
                        'Expenditure on the transparent account corresponds to the actual progress of the electoral campaign. The party avoids large advance payments or the use of large invoices with a long maturity period of more than one month.',
                    ],
                },
                {
                    name: [
                        'Identifikácia bilboardovej kampane',
                        'Identification of Billboard Campaign',
                    ],
                    desc: [
                        'Na transparentnom účte je možné identifikovať výdavky na outdoorovú kampaň strany, minimálne v rozsahu mesačných výdavkov na tento typ reklamy.',
                        `It is possible to identify the expenses for the party&#39;s outdoor campaign on the transparent account, at least to the extent of monthly expenses for this type of advertising.`,
                    ],
                },
            ],
            [ati.financing]: [
                {
                    name: [
                        'Informovanie o financovaní kampane',
                        'Information about Campaign Financing',
                    ],
                    desc: [
                        'Darcovia a veritelia strany sú prehľadne identifikovateľní prostredníctvom transparentného účtu a webu strany.',
                        `Donors and creditors are clearly identifiable through the transparent account and the party&#39;s website.`,
                    ],
                },
                {
                    name: [
                        'Zapájanie, podporovateľov, členov a kandidátov do financovania kampane',
                        'Campaign diversity',
                    ],
                    desc: [
                        'Miera diverzifikácie kampaňových príjmov',
                        'Degree of diversification of campaign revenues, Engaging Supporters, Members, and Candidates in Campaign Financing.',
                    ],
                },
                {
                    name: [
                        'Nezávislosť od veľkých prispievateľov',
                        'Independence on Major Contributors',
                    ],
                    desc: [
                        'Miera závislosti kampane od veľkých darcov a veriteľov, mimo bankových úverov.',
                        'Degree of campaign dependence on major donors and creditors, excluding bank loans.',
                    ],
                },
                {
                    name: [
                        'Včasnosť transparentného účtu',
                        'Timeliness of the Transparent Account',
                    ],
                    desc: [
                        'Strana si založila transparentný účet najneskôr v deň začatia predvolebnej kampane (10.2.2024).',
                        'The party established a transparent account no later than the day the election campaign began (February 10, 2024).',
                    ],
                },
                {
                    name: ['Plán kampane', 'Campaign Plan'],
                    desc: [
                        'Strana proaktívne informuje o plánovanej výške kampane a spôsobe jej financovania, prípadne na vyžiadanie poskytla tieto informácie.',
                        'The party proactively informed about the planned campaign budget and its financing methods, or provided this information upon request.',
                    ],
                },
            ],
            [ati.information]: [
                {
                    name: ['Volebný program', 'Election Program'],
                    desc: [
                        'Strana v čase oficiálnej kampane zverejnila svoj volebný program.',
                        'The party published its election program during the election campaign.',
                    ],
                },
                {
                    name: [
                        'Informovanosť o podujatiach v kampani',
                        'Campaign Events',
                    ],
                    desc: [
                        'Strana v priebehu oficiálnej kampane poskytuje verejnosti informácie o svojich predvolebných akciách, najmä na webovej stránke alebo sociálnej sieti.',
                        `The party provides the public with information about its pre-election events during the official campaign, mainly on the website or social network.`,
                    ],
                },
                {
                    name: ['Označovanie inzercie', 'Marking of Advertising'],
                    desc: [
                        'Strana v zmysle zákona označuje precízne politickú inzerciu na sociálnej sieti, bilbordoch a v tlači doplnením informácie o objednávateľovi a dodávateľovi reklamy.',
                        'In full compliance with the law, the party precisely labels political advertisements on social networks, billboards, and in the press by including information about the advertiser and the supplier of the advertisement.',
                    ],
                },
                {
                    name: [
                        'Poskytnutie informácií z oficiálneho kontaktu strany',
                        'Providing Information from the Official Party Contact',
                    ],
                    desc: [
                        'Test funkčnosti oficiálneho kontaktu strany počas kampane, zaslanie otázky potencionálneho voliča s textom: "Dobrý deň, rada by som sa opýtala, či bude po voľbách do Európskeho parlamentu možnosť uchádzať sa o miesto poslaneckých asistentov poslancov zvolených do EU parlamentu za Vašu stranu. V prípade, že áno, vedeli by ste mi poskytnúť viac detailov?"',
                        `Test of the functionality of the party's official contact during the campaign by sending a question from a potential voter: "Hello, I would like to ask if there will be an opportunity to apply for a position as an assistant to MEPs elected to the European Parliament for your party after the European Parliament elections. If so, could you provide me with more details?"`,
                    ],
                },
                {
                    name: [
                        'Odpoveď potenciálnemu voličovi cez sociálnu sieť',
                        'Response to a Potential Voter via Social Network',
                    ],
                    desc: [
                        'Test ochoty strany komunikovať s voličom cez sociálnu sieť, zaslaním otázky: "Dobrý deň, rada by som sa informovala, či budete v najbližšej dobe, pred eurovoľbami, organizovať aj stretnutie s občanmi, v Bratislave, kde by bola možnosť bližšie spoznať kandidátov Vašej strany."',
                        `Test of the party's willingness to communicate with voters through social networks by sending a question: "Hello, I would like to know if you will be organizing any meetings with citizens in Bratislava before the European elections where it would be possible to get to know the candidates of your party better."`,
                    ],
                },
                {
                    name: [
                        'Majetkové priznanie lídra kandidátky',
                        'Asset Declaration of the Lead Candidate',
                    ],
                    desc: [
                        'Kandidát na vyžiadanie Transparency vyplnil rozšírené majetkové priznanie a súhlasil s jeho zverejnením.',
                        `In response to Transparency's request, the candidate completed an extended asset declaration and consented to its public disclosure.`,
                    ],
                },
            ],
        },
        indicatorTitles: {
            [ati.account]: ['Transparentný účet', 'Transparent Account'],
            [ati.financing]: ['Financovanie kampane', 'Campaign Financing'],
            [ati.information]: [
                'Informovanosť o kampani',
                'Campaign Awareness',
            ],
        },
        meta: ['Údaje o kampani', 'Campaign details'],
        methodology: ['Metodika hodnotenia', 'Methodology'],
        navTitle: ['Hodnotenie', 'Assessment'],
        noAnalyses: [
            'Sekcia sa pripravuje. Hodnotenia kampaní budeme zverejňovať postupne.',
            'Section is being prepared',
        ],
        noAssets: [
            'Nie sú dostupné majetkové priznania pre túto stranu.',
            'No asset declarations available for this party',
        ],
        noData: [
            'Nie je dostupné hodnotenie kampane tejto strany.',
            'Campaign assessment for this party is not available.',
        ],
        references: ['Referencie', 'References'],
        transparency: {
            [atc.good]: ['transparentná kampaň', 'Transparent campaign'],
            [atc.average]: ['kampaň s výhradami', 'Campaign with reservations'],
            [atc.bad]: ['netransparentná kampaň', 'Non-transparent campaign'],
            [atc.unknown]: [
                'nedostatok dát / nehodnotené',
                'Lack of data / not evaluated',
            ],
        },
        transparencyShort: {
            [atc.good]: ['transparentná', 'Transparent'],
            [atc.average]: ['s výhradami', 'With reservations'],
            [atc.bad]: ['netransparentná', 'Non-transparent'],
            [atc.unknown]: ['N/A'],
        },
    },
    charts: {
        amount: ['Suma', 'Amount'],
        campaign: ['Kampaň', 'Campaign'],
        disclaimer: [
            'Grafy obsahujú dáta z transparentných účtov, očistené o vrátené platby.',
            'Graphs contains data from transparent accounts net of return payments.',
        ],
        disclaimerClick: [
            'Po kliknutí na meno strany sa rozbalia podrobnosti.',
            'Click the party name for details.',
        ],
        finalReport: {
            disclaimer: [
                'Grafy obsahujú dáta zo záverečných správ politických strán.',
                'Graphs contains data from parties final reports.',
            ],
            title: [
                'Top 10 kampaní podľa záverečných správ',
                'Top 10 campaigns by final reports',
            ],
        },
        incoming: ['Príjmy', 'Incomes'],
        outgoing: ['Výdavky', 'Expenses'],
        precampaign: ['Predkampaň', 'Precampaign'],
        sum: ['Spolu', 'Total'],
        top10: [
            'Top 10 kampaní podľa výdavkov a príjmov',
            'Top 10 campaigns by incomes and spendings',
        ],
        uniqueDonors: ['Počet unikátnych darcov', 'Number of unique donors'],
        updated: ['Naposledy aktualizované', 'Last updated on'],
    },
    contact: ['Kontakt', 'Contact'],
    cookies: {
        accept: ['Prijať všetky', 'Accept all'],
        about: [
            'Táto webová stránka používa cookies, aby vám priniesla čo najlepší online zážitok.',
            'This website uses cookies to bring you the best online experience.',
        ],
        optional: ['Voliteľné cookies', 'Optional Cookies'],
        reject: ['Odmietnuť všetky', 'Reject all'],
        selected: ['Potvrdiť výber', 'Accept selected'],
        settings: ['Nastavenia cookies', 'Cookies settings'],
        types: {
            analytics: ['Analytické cookies', 'Analytics'],
            functional: ['Funkčné cookies', 'Functional'],
            necessary: ['Nevyhnutné cookies', 'Necessary'],
        },
    },
    donate: {
        buttonShort: ['Darujte', 'Donate'],
        buttonLong: [
            'Darujte na kontrolu volieb',
            'Donate for elections monitoring',
        ],
        modalTitle: [
            'Nenechajme voľby bez kontroly!',
            `Don't let the elections without watch!`,
        ],
        modalText: [
            'Darujte už od 20 €, aby sme ustrážili férovosť volieb.\nĎakujeme.',
            'Donate from 20 € to support elections transparency.\nThank you.',
        ],
    },
    download: ['Stiahnuť', 'Download'],
    elections: {
        [el.p19]: ['Prezidentské\nvoľby 2019', 'President\nelections 2019'],
        [el.n20]: ['Parlamentné\nvoľby 2020', 'Parliamentary\nelections 2020'],
        [el.s22]: ['Samosprávne\nvoľby 2022', 'Municipal\nelections 2022'],
        [el.n23]: ['Parlamentné\nvoľby 2023', 'Parliamentary\nelections 2023'],
        [el.p24]: ['Prezidentské\nvoľby 2024', 'President\nelections 2024'],
        account: ['Transparentný účet', 'Transparent account'],
        date: ['Dátum konania volieb', 'Elections date'],
        over: ['Voľby sa skončili', 'Elections ended'],
        timeTillstart: ['Zostávajúci čas do volieb', 'Time to elections start'],
        timeTillend: [
            'Zostávajúci čas do konca volieb',
            'Time to elections end',
        ],
        title: ['Voľby', 'Elections'],
    },
    errors: {
        loading: [
            'Chyba pri načítaní dát. Prosím načítajte stránku znovu.',
            'Data loading error. Please reload the page.',
        ],
    },
    fbFeed: [
        'Pre zobrazenie facebook vlákna je potrebné prijať ukladanie Funkčných cookies v Nastaveniach cookies',
        'Please accept Functional Cookies in Cookies Settings in order to show Facebook feed',
    ],
    followUs: ['Sledujte nás', 'Follow us'],
    home: {
        navTitle: ['Eurovoľby 2024', 'Euro elections 2024'],
        pageTitle: ['Európske\nvoľby 2024', 'European\nelections 2024'],
    },
    learnMore: ['Zistiť viac', 'Learn more'],
    lastUpdate: ['Naposledy aktualizované', 'Last updated on'],
    news: {
        latest: ['Najnovšie aktuality', 'Latest News (Slovak only)'],
        navTitle: ['Aktuality', 'News'],
        noData: ['Neboli nájdené žiadne články.', 'No articles found.'],
        pageTitle: ['Aktuality', 'News\n(Slovak only)'],
    },
    newsletter: {
        title: ['Newsletter'],
        subscribe: ['Prihlásiť sa na newsletter', 'Subscribe to Newsletter'],
    },
    online: {
        navTitle: ['Online'],
    },
    parties: {
        assets: ['Majetkové priznania', 'Assets'],
        candidatesList: ['Kandidátna listina', 'Candidates list'],
        candidatesLists: ['Kandidátne listiny', 'Candidates lists'],
        extendedAssets: [
            'Rozšírené majetkové priznanie lídra',
            'Extended assets declaration of leader',
        ],
        info: ['Informácie o kampani', 'Campaign details'],
        funding: ['Financovanie', 'Financing'],
        monitoring: [
            'Monitorujeme tieto strany',
            'We monitor the following parties',
        ],
        navTitle: ['Strany', 'Parties'],
        noResults: [
            'Hľadanému výrazu nezodpovedá žiadna strana.',
            'No party matches the search query.',
        ],
        overview: ['Prehľad', 'Overview'],
        report: ['Záverečná správa', 'Final report'],
        reports: ['Záverečné správy', 'Final reports'],
    },
    privacy: ['Ochrana súkromia', 'Privacy Policy'],
    readMore: ['Čítať ďalej…', 'Read more…'],
    tis: [
        'Transparency International Slovensko',
        'Transparency International Slovakia',
    ],
    search: {
        label: ['Vyhľadávanie', 'Search'],
        results: [
            'Výsledky vyhľadávania výrazu',
            'Search results for the query',
        ],
    },
    showMore: ['Zobraziť viac', 'Show more'],
    sponsors: ['Donori projektu', 'Project donors'],
    supportTis: ['Podporte Transparency', 'Support Transparency'],
    usefulInfo: ['Užitočné informácie', 'Useful information'],
    webDev: ['Webové riešenie', 'Web development'],
};

export const t = (label, replacements) => {
    let tl = label;
    if (Array.isArray(label)) {
        tl = label[0] ?? '';
        if (getCurrentLanguage() === languages.en) {
            tl = label[1] ?? tl;
        }
    } else if (labels[label] ?? false) {
        return t(labels[label], replacements);
    }
    if (Array.isArray(replacements)) {
        // Use a regular expression to match placeholders (%s or %i)
        tl = tl.replace(/%[dfis]/g, (match) => {
            // Replace %s with the next string from the array
            // Return the placeholder if no replacement is available
            return replacements.length > 0 ? replacements.shift() : match;
        });
    }
    return tl;
};

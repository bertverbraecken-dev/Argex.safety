import { useState } from "react";

// ─── ARGEX BRAND ──────────────────────────────────────────────────────────────
const AX = {
  clay:       "#C1440E",   // terracotta hoofdkleur
  clayDark:   "#962E06",
  clayDeep:   "#6B1E02",
  clayLight:  "#FAE8E0",
  clayMid:    "#E8693A",
  earth:      "#8B5E3C",
  earthLight: "#F5EDE4",
  sand:       "#F2D9C0",
  green:      "#4A7C59",
  greenLight: "#E8F2EC",
  white:      "#FFFFFF",
  gray900:    "#1C1008",
  gray800:    "#2E1E10",
  gray700:    "#4A3020",
  gray500:    "#7A6050",
  gray300:    "#C8B8A8",
  gray100:    "#F2EDE8",
  gray50:     "#FAF7F4",
  red:        "#C0392B",
  redLight:   "#FFF0EE",
  amber:      "#D97706",
  amberLight: "#FFF8EE",
  blue:       "#1565C0",
  bg:         "#F5F0EA",
};

// ─── SITE INFO ────────────────────────────────────────────────────────────────
const SITE = "Argex — Burcht / Zwijndrecht";
const SITE_SHORT = "Argex";

// ─── GEBRUIKERS ───────────────────────────────────────────────────────────────
const USERS = {
  "admin@argex.be":         { pw:"admin2026",    id:1, name:"Bert Verbraecken",   role:"admin",          avatar:"BV", functie:"Preventieadviseur IDPBW", afdeling:"H&S",       onboardingDone:true  },
  "chef@argex.be":          { pw:"chef2026",     id:2, name:"Georgy Eggermont",   role:"leidinggevende", avatar:"GE", functie:"Ploegchef Productie",    afdeling:"Productie",  onboardingDone:true  },
  "werknemer@argex.be":     { pw:"werk2026",     id:3, name:"Medewerker Demo",    role:"medewerker",     avatar:"MD", functie:"Machine-operator",       afdeling:"Productie",  onboardingDone:true  },
  "aannemer@argex.be":      { pw:"aan2026",      id:4, name:"Externe Aannemer",   role:"aannemer",       avatar:"EA", functie:"Externe aannemer",       afdeling:"Extern",     onboardingDone:true  },
  "nieuw@argex.be":         { pw:"nieuw2026",    id:5, name:"Nieuwe Medewerker",  role:"medewerker",     avatar:"NM", functie:"Medewerker",             afdeling:"Productie",  onboardingDone:false },
};

// ─── PROCEDURES ───────────────────────────────────────────────────────────────
const PROCEDURES = [
  {
    id:1, cat:"Procedures",
    titel:"Werken in en rondom de groeve",
    versie:"v1.0", datum:"Januari 2026", auteur:"Argex H&S",
    tags:["Groeve","Grondverzet","Val","Instorting","Talud"],
    beschrijving:"Veiligheidsregels voor werkzaamheden in en rondom de groeve voor kleiwinning op de site Burcht.",
    kernpunten:[
      "Voer altijd een LMRA uit vóór de start van werkzaamheden in de groeve.",
      "Bewaar voldoende afstand tot het talud en de grondkant — risico op instorting.",
      "Gebruik enkel goedgekeurde rijroutes voor voertuigen (wielladers, dumpers).",
      "Valharnas verplicht bij werken nabij hoogteverschillen of kanten van de groeve.",
      "Meld onveilige situaties (verzakking, instabiliteit, scheuren) onmiddellijk aan de leidinggevende.",
    ],
    verboden:["Werken in de groeve zonder LMRA en toestemming leidinggevende","Roken in of rondom de groeve (explosiegevaar door stof)"],
    pbm:["Veiligheidshelm","Veiligheidsschoenen (S3)","Fluovest","Werkhandschoenen","FFP3-stofmasker bij stofvorming"],
  },
  {
    id:2, cat:"Procedures",
    titel:"Ovens & droogtrommels — hoge temperaturen",
    versie:"v1.0", datum:"Januari 2026", auteur:"Argex H&S",
    tags:["Oven","Droogtrommel","Warmte","Brand","Verbrandingsrisico"],
    beschrijving:"Procedure voor veilig werken rond de draaiovens en droogtrommels voor het bakken van klei-granulaten.",
    kernpunten:[
      "LOTO verplicht bij elk onderhoud aan oven of droogtrommel — nooit werken aan een draaiende installatie.",
      "Bord 'werken aan machine' plaatsen en zone afbakenen vóór de start.",
      "Minimum veilige afstand bewaren tot hete oppervlakken — aanraking verboden zonder hittebestendige PBM's.",
      "Noodstopknop kennen en kunnen bereiken vóór start van werkzaamheden.",
    ],
    verboden:["Werken aan oven of droogtrommel zonder LOTO toegepast te hebben","Oven betreden of aanraken zonder hittebestendige PBM's"],
    pbm:["Hittebestendige handschoenen","Veiligheidsbril of gelaatsscherm","Veiligheidsschoenen (S3)","Veiligheidshelm","Katoen/vlam vertragende werkkledij"],
  },
  {
    id:3, cat:"Procedures",
    titel:"Transportbanden & zeefinstallaties",
    versie:"v1.0", datum:"Januari 2026", auteur:"Argex H&S",
    tags:["Transportband","Zeef","Beknelling","Machine","LOTO"],
    beschrijving:"Procedure voor veilig werken bij en rond transportbanden, zeefinstallaties en sorteerlijnen.",
    kernpunten:[
      "LOTOTO verplicht bij elk onderhoud of interventie aan transportbanden en zeefinstallaties.",
      "Bord 'werken aan machine' zichtbaar plaatsen en werkzone afbakenen met kegels of lint.",
    ],
    verboden:["Een rijdende transportband aanraken of er overheen stappen","Werken aan transportband zonder LOTOTO te hebben toegepast"],
    pbm:["Veiligheidsschoenen (S3)","Werkhandschoenen","Gehoorbescherming (≥85 dB zone)","Veiligheidshelm","FFP3-stofmasker"],
  },
  {
    id:4, cat:"Procedures",
    titel:"Heftruck & intern transport op de site",
    versie:"v1.0", datum:"Januari 2026", auteur:"Argex H&S",
    tags:["Heftruck","Transport","Rijveiligheid","Voetgangers"],
    beschrijving:"Veiligheidsregels voor intern transport met heftrucks en andere voertuigen op de Argex-site.",
    kernpunten:[
      "Vorken 10–15 cm boven de grond tijdens rijden. Maximumsnelheid op de site: 15 km/u.",
      "Oogcontact maken met voetgangers vóór doorrijden. Voetgangers hebben altijd voorrang.",
    ],
    verboden:["Personen vervoeren op vorken, paletten of voorzetstukken","GSM of oortjes gebruiken tijdens het rijden met heftruck"],
    pbm:["Veiligheidsschoenen (S3)","Fluovest","Veiligheidshelm","Veiligheidsgordel (indien aanwezig)"],
  },
  {
    id:5, cat:"Procedures",
    titel:"Silovrachtwagen — pneumatisch lossen",
    versie:"v1.0", datum:"Januari 2026", auteur:"Argex H&S",
    tags:["Silo","Vrachtwagen","Stof","Pneumatisch","Lossen"],
    beschrijving:"Veiligheid bij het pneumatisch lossen van kleikorrels via silovrachtwagens op klantensites.",
    kernpunten:[
      "Externe chauffeurs verplicht aanmelden bij receptie of expeditie (03/250.15.15) vóór lossen.",
      "Productiezone enkel betreden onder begeleiding van Argex-medewerker. FFP3-masker verplicht bij stofvorming.",
    ],
    verboden:["Productiezone betreden zonder begeleiding van Argex-personeel","Lossen zonder aanmelding of goedkeuring van expeditie"],
    pbm:["Veiligheidsschoenen (S3)","Veiligheidshelm","Fluovest","FFP3-stofmasker (kleikorrelstof bevat kristallijn silica)"],
  },
  {
    id:6, cat:"Procedures",
    titel:"Veiligheid bezoekers en aannemers",
    versie:"v1.0", datum:"Januari 2026", auteur:"Argex H&S",
    tags:["Bezoekers","Aannemers","Inductie","Toegang"],
    beschrijving:"Procedure voor veilig onthaal van bezoekers en externe aannemers op de Argex site Burcht.",
    kernpunten:[
      "Aanmelden verplicht bij receptie (hoofdbureel) of expeditie (03/250.15.15) vóór betreden van de site.",
      "Dagelijkse registratie verplicht bij werken langer dan één dag. Register beschikbaar bij onderhoudsdienst, receptie en expeditie.",
    ],
    verboden:["Betreden van de site zonder registratie en begeleiding","Productiezone betreden zonder de verplichte PBM's"],
    pbm:["Veiligheidsschoenen (S3)","Veiligheidshelm","Fluovest"],
  },
  {
    id:7, cat:"Handleidingen",
    titel:"Handleiding PBM's — overzicht per zone",
    versie:"v1.0", datum:"Januari 2026", auteur:"Argex H&S",
    tags:["PBM","Zones","Helm","Handschoenen","Bril"],
    beschrijving:"Overzicht van alle verplichte en aanbevolen PBM's per werkzone op de Argex site.",
    kernpunten:[
      "Productiezone (alle zones): veiligheidshelm + veiligheidsschoenen S3 verplicht voor iedereen.",
      "Zones rijdend verkeer (heftrucks, wielladers, vrachtwagens): fluovest altijd verplicht.",
      "Stofzones (silo's, zeeflijnen, transportbanden, kleivoorbereiding): FFP3/P3-stofmasker verplicht — kleikorrelstof bevat kristallijn silica.",
      "Waterzone (kaaimuur, kanaal): zwemvest/reddingsvest verplicht.",
      "Lassen/slijpen/snijden: veiligheidsbril of gelaatsscherm + werkhandschoenen + lasschort.",
      "Werken op hoogte >2 m: valharnas met gekeurd ankerpunt verplicht.",
    ],
    pbm:["Veiligheidshelm","Veiligheidsschoenen S3","Fluovest","FFP3-stofmasker","Werkhandschoenen","Gehoorbescherming","Veiligheidsbril","Valharnas","Zwemvest"],
  },
  {
    id:8, cat:"Handleidingen",
    titel:"Handleiding brandblussers — gebruik & locaties",
    versie:"v1.0", datum:"Januari 2026", auteur:"Argex H&S",
    tags:["Brand","Blusser","BHV","Locaties"],
    beschrijving:"Praktische handleiding voor gebruik van brandblusser en overzicht van alle locaties op de site.",
    kernpunten:[
      "Brandblussers zijn jaarlijks gekeurd — controleer de keuringssticker vóór gebruik.",
      "Locaties: oven hal, kleivoorbereiding, expeditie, sociaal gebouw, atelier en EHBO-lokaal onderhoudsloods.",
      "Nooduitgangen en blusmiddelen altijd vrijhouden — nooit blokkeren met materiaal.",
    ],
  },
  {
    id:9, cat:"VIK",
    titel:"VIK-P-OD-01 — Kuiswerken omgeving massieven/oven",
    versie:"v1.0", datum:"Januari 2026", auteur:"Bert Verbraecken",
    tags:["Oven","Massieven","Kuiswerken","VIK","Warmte","Stof"],
    locatie:"Omgeving massieven en oven", frequentie:"Dagelijks",
    beschrijving:"Orde en netheid in de omgeving van de massieven en oven. Dagelijkse kuiswerken conform VIK-P-OD-01.",
    risicos:["Draaiende/bewegende delen","Warmtebronnen en hete oppervlakken","Stootgevaar","Stofvorming (kristallijn silica)","Struikelgevaar op en rond de trap"],
    stappen:[
      "Controleer de werkzone vóór de start — personen en obstakels verwijderen.",
      "LMRA uitvoeren: zijn er draaiende delen, hittebronnen of stofrisico aanwezig?",
      "Draag alle verplichte PBM's vóór je de zone betreedt.",
      "Sorteer materiaalresten direct na het kuisen en leg ze apart.",
      "Sprenkel water om stofwolken te voorkomen — geen perslucht gebruiken.",
      "Meld beschadigingen aan installaties onmiddellijk aan de leidinggevende.",
      "Ruim alle arbeidsmiddelen op en verlaat de zone netjes.",
    ],
    kernpunten:[
      "Let op draaiende en bewegende delen — nooit aanraken zonder LOTOTO.",
      "Warmtebronnen zijn aanwezig — draag lange kledij en veiligheidsbril.",
      "Niet overhaast op- en aftrappen lopen. Stootgevaar aanwezig.",
      "Rekening houden met andere personen in de nabije omgeving.",
      "Gebruik de juiste arbeidsmiddelen. Materiaalresten sorteren en apart leggen.",
      "Stofwolken voorkomen door sproeien. Geen perslucht in stofzones.",
    ],
    verboden:["Werken aan draaiende installaties zonder LOTOTO","Perslucht gebruiken om stof te verwijderen (explosiegevaar)"],
    pbm:["Veiligheidshelm","Veiligheidsschoenen S3","Veiligheidsbril","Lange kledij (vlam vertraging)","FFP3-stofmasker"],
  },
  {
    id:10, cat:"VIK",
    titel:"VIK-P-OD-04 — Kuiswerken omgeving bruinkool (ATEX)",
    versie:"v1.0", datum:"Januari 2026", auteur:"Bert Verbraecken",
    tags:["Bruinkool","ATEX","Kuiswerken","Brand","Explosie","VIK"],
    locatie:"Bruinkoolinstallatie", frequentie:"Dagelijks",
    beschrijving:"Kuisen van de omgeving van de bruinkoolinstallatie. ATEX-zone: rookverbod en speciale maatregelen verplicht.",
    risicos:["Explosiegevaar (ATEX) — bruinkoolstof is brandbaar en explosief","Brandgevaar bij stofophoping op warme oppervlakken","Stootgevaar","Struikelgevaar"],
    stappen:[
      "⚠ ATEX-check vóór start: zijn er vonken, open vuur of warmtebronnen in de zone?",
      "Leidinggevende verwittigen vóór de start van kuiswerken.",
      "Enkel ATEX-stofzuiger of natte reiniging gebruiken — perslucht is strikt verboden.",
      "Stof ophoping wegwerken: begin bij warme zones, rond silo's en in kelders.",
      "Aanvoerleidingen controleren op lekken. Lekke leidingen onmiddellijk melden.",
      "Las- of snijwerken in de buurt? Altijd werkvergunning + ATEX-check vóór aanvang.",
      "Zone proper en stofvrij achterlaten. Incident melden via Argex Safety app.",
    ],
    kernpunten:[
      "ATEX-zone: rookverbod strikt — bruinkoolstof is explosief.",
      "Bij incident onmiddellijk de rechtstreekse verantwoordelijke verwittigen.",
      "Aandachtig voor stootgevaar en struikelgevaar.",
      "Geen ontvlambare vloeistoffen gebruiken voor reiniging.",
      "Stofwolken vermijden: sproeien, enkel ATEX-stofzuiger of natte reiniging gebruiken.",
      "Ophoping bruinkoolstof vermijden, zeker in warme zones en rond silo's.",
    ],
    verboden:["Roken in of rondom de bruinkoolzone","Perslucht gebruiken om bruinkoolstof weg te blazen","Las- of snijwerken zonder werkvergunning en ATEX-check"],
    pbm:["Veiligheidshelm","Veiligheidsschoenen S3","Veiligheidsbril","FFP3-stofmasker","ATEX-geschikte kledij"],
  },
  {
    id:11, cat:"VIK",
    titel:"VIK-P-OD-05 — Kuiswerken brandersplatform",
    versie:"v1.0", datum:"Januari 2026", auteur:"Bert Verbraecken",
    tags:["Brander","Platform","Oven","Kuiswerken","Hoogte","VIK"],
    beschrijving:"Dagelijkse kuiswerken rond de brander op het brandersplatform buiten (VIK-P-OD-05).",
    kernpunten:[
      "Let op draaiende en bewegende delen — warmtebronnen aanwezig.",
      "Niet overhaast op- en aftrappen lopen. Stootgevaar.",
      "Rekening houden met andere personen die eventueel onder het platform lopen.",
      "Beschadigingen onmiddellijk melden aan de leidinggevende.",
      "Gebruikte materialen opruimen. Stofwolken vermijden door sproeien.",
    ],
    verboden:["Werken op platform zonder fluovest en veiligheidshelm","Materiaal rondslingeren dat kan vallen op personen onder het platform"],
    pbm:["Veiligheidshelm","Veiligheidsschoenen S3","Veiligheidsbril","Fluovest","Lange kledij","FFP3-stofmasker"],
  },
  {
    id:12, cat:"VIK",
    titel:"VIK-P-OD-06 — Kuiswerken koelkelder",
    versie:"v1.0", datum:"Januari 2026", auteur:"Bert Verbraecken",
    tags:["Koelkelder","Kuiswerken","Besloten ruimte","VIK","Stof"],
    beschrijving:"Kuiswerken in de koelkelder. Helmdracht verplicht bij betreden. P3-stofmasker vereist (VIK-P-OD-06).",
    kernpunten:[
      "Helm verplicht bij betreden van de koelkelder — ook tijdens kuiswerken.",
      "Niet overhaast op- en aftrappen lopen. Stootgevaar en struikelgevaar.",
      "Pas op voor draaiende of bewegende delen.",
      "P3-stofmasker verplicht (kleikorrelstof bevat kristallijn silica).",
      "Correcte arbeidsmiddelen gebruiken. Stofwolken vermijden door sproeien.",
    ],
    verboden:["Koelkelder betreden zonder veiligheidshelm","Werken aan draaiende of bewegende delen zonder LOTOTO"],
    pbm:["Veiligheidshelm (verplicht)","Veiligheidsschoenen S3","FFP3/P3-stofmasker","Werkhandschoenen"],
  },
  {
    id:13, cat:"VIK",
    titel:"VIK-P-OV-01 — Gebruik steenzaagmachine",
    versie:"v2.0", datum:"29/06/2016", auteur:"Argex H&S",
    tags:["Steenzaag","Labo","Oven","Zaagmachine","VIK","Elektrisch"],
    beschrijving:"Veiligheidsinstructiekaart voor het verzagen van refractaire stenen voor de oveninstallatie en labo-onderzoeken.",
    kernpunten:[
      "Bedieningspositie mag enkel verlaten worden als het zaagblad volledig stilstaat.",
      "Bij inzetten zaagblad: steeds draairichting controleren en scherpe kanten beschermen.",
      "Machine minstens 1x per ploegendienst controleren op zichtbare schade.",
      "Gebreken onmiddellijk melden — machine stilzetten en beveiligen tegen herinschakeling.",
      "Enkel voor nat doorzagen van mineraal materiaal. Geen hout, kunststof of metaal zagen.",
      "Aardlekschakelaar (FI) verplicht aanwezig in stroomtoevoer.",
    ],
    verboden:["Machine verlaten met nog draaiend zaagblad","Zagen van hout, kunststof of metaal met steenzaagmachine","Elektrische werken door onbevoegden"],
    pbm:["Veiligheidsbril of gelaatsscherm","Werkhandschoenen","Veiligheidsschoenen S3","Gehoorbescherming","Kledij met lange mouwen"],
  },
  {
    id:14, cat:"VIK",
    titel:"VIK-P-LA-01 — Chemische analyse labo",
    versie:"v1.0", datum:"08/05/2013", auteur:"Argex H&S",
    tags:["Labo","Chemie","Zuur","Analyse","VIK"],
    beschrijving:"Chemische analyse: bepaling van zuuroplosbaar sulfaat, totaal zwavel- en chloridegehalte van korrels conform Europese normering.",
    kernpunten:[
      "Lees eerst de veiligheidsinformatieblad (SDS) van alle gebruikte chemische producten.",
      "Werk altijd in de trekkast bij gebruik van zuren.",
      "Flessen steeds goed afsluiten en onmiddellijk terugplaatsen in de voorziene kast.",
      "Draag kledij met lange mouwen om huidcontact te voorkomen.",
      "Bij twijfel: werken met gevaarlijke producten conform WI MM 5.3 (map labo).",
    ],
    verboden:["Zuren gebruiken buiten de trekkast","Chemische producten laten staan zonder afsluiting"],
    pbm:["Veiligheidsbril","Zuurbestendige werkhandschoenen","Kledij met lange mouwen","Veiligheidsschoenen S3"],
  },
  {
    id:12, cat:"WIK",
    titel:"WIK — Dagelijkse voertuigcontrole heftruck",
    versie:"v1.0", datum:"Januari 2026", auteur:"Argex H&S",
    tags:["Heftruck","WIK","Dagelijkse controle","Onderhoud"],
    beschrijving:"Werkinstructiekaart voor de dagelijkse pre-use controle van de heftruck.",
    kernpunten:[
      "Dagelijkse pre-use controle: remmen, stuurbekrachtiging, vloeistofniveaus, bandenspanning, vorken en mast, verlichting, claxon, veiligheidsgordel. Defect → niet gebruiken, melden.",
    ],
  },
  {
    id:13, cat:"WIK",
    titel:"WIK — Oven opstarten procedure",
    versie:"v1.0", datum:"Januari 2026", auteur:"Argex H&S",
    tags:["Oven","WIK","Opstarten","Procedure"],
    beschrijving:"Stap-voor-stap werkinstructie voor het veilig opstarten van de draaiovens.",
    kernpunten:[
      "Controleer vóór opstarten: afschermingen intact, zone vrij van personen, LOTOTO vrijgegeven, brandblussers bereikbaar, noodstop ontgrendeld. Start pas na goedkeuring leidinggevende.",
    ],
  {
    id:14, cat:"Procedures",
    titel:"LMRA — Laatste Minuut Risico Analyse",
    versie:"v1.0", datum:"Januari 2026", auteur:"Argex H&S",
    tags:["LMRA","Risico","STOP","THINK","GO","Vóór de start"],
    beschrijving:"Voer een LMRA uit vóór elke taak met risico. STOP – THINK – GO. 'Als het niet veilig kan, dan doen we het niet!'",
    kernpunten:[
      "STOP: Ken je taak en de aanwezige risico's vóór de start.",
      "THINK: Controleer werkvergunning, PBM's, nooduitgangen, brandblussers en verzamelplaats.",
      "THINK: Zijn maatregelen getroffen tegen brand, gevaarlijke stoffen en valgevaar?",
      "THINK: Is LOTOTO toegepast op alle machines en installaties waaraan gewerkt wordt?",
      "THINK: Is de werkplek netjes, veilig en zijn struikel-/glijrisico's gekend?",
      "GO: Kan ik de werkzaamheden veilig uitvoeren? JA → starten. NEEN → stop en meld aan leidinggevende.",
      "Bij gewijzigde omstandigheden tijdens het werk: opnieuw LMRA uitvoeren.",
    ],
    verboden:["Starten met risicovolle werkzaamheden zonder LMRA","Doorgaan bij twijfel over veiligheid — altijd stoppen en melden"],
    pbm:["Afhankelijk van taak en risico — zie procedure of VIK"],
  },,
  {
    id:18, cat:"VIK",
    titel:"VIK-P-KO-01 — Vrijmaken densiteitsmeter (ioniserende bron)",
    versie:"v2.0", datum:"29/03/2017", auteur:"Bert Verbraecken",
    tags:["Densiteitsmeter","Ioniserende straling","Koelkelder","VIK","Radioactief"],
    locatie:"Koelkelder — densiteitsmeter", frequentie:"Naar behoefte",
    beschrijving:"Veilig verwijderen van puin bij de ioniserende bron in de koelkelder. Enkel bevoegde personen.",
    risicos:["Ioniserende straling (gammastraling)","Stootgevaar bij afdalen trap","Stofvorming","Val op gladde ondergrond"],
    stappen:[
      "Controleer bevoegdheid: enkel bevoegde personen mogen de densiteitsmeter benaderen.",
      "Respecteer de afbakeningskettingen — nooit verplaatsen of overstappen.",
      "Verblijftijd beperken: werk snel en doelgericht (max. 1000u/jaar op 30cm).",
      "Gebruik een steker (steel met plaat) — handen nooit onder de meetopstelling.",
      "Argex naast de trechter opkuisen en terugscheppen in de trechter.",
      "Steker na het vrijmaken onmiddellijk op zijn plaats terugzetten.",
      "Vergrendelingssleutel teruggeven aan de ploegverantwoordelijke.",
      "Bij beschadiging: STOP — zone 20m afsluiten — leidinggevende + preventieadviseur bellen — AV Controlatom: 02/674 51 20.",
    ],
    kernpunten:[
      "Enkel bevoegde personen mogen deze taak uitvoeren.",
      "Afscherming respecteren: kettingen die zone afbakenen laten hangen.",
      "Verblijftijd minimaliseren. Afstand maximaliseren.",
      "Steker na vrijmaken onmiddellijk opnieuw op zijn plaats zetten.",
      "Argex naast de trechter opkuisen en in trechter scheppen.",
      "Vergrendelingssleutel steeds bij de ploegverantwoordelijke bewaren.",
      "Bij beschadiging: leidinggevende + preventieadviseur verwittigen, zone 20m afsluiten. AV Controlatom: 02/674 51 20.",
    ],
    verboden:["Handen onder de meetopstelling brengen","Bron openen of demonteren zonder toestemming"],
    pbm:["Veiligheidshelm","Veiligheidsschoenen S3","Werkhandschoenen","FFP3-stofmasker"],
  },
  {
    id:19, cat:"VIK",
    titel:"VIK-P-KO-02 — Koeling kuisen zonder stop",
    versie:"v1.0", datum:"06/05/2013", auteur:"Argex H&S",
    tags:["Koeling","Kuiswerken","Brokkenval","VIK","Lopende installatie"],
    beschrijving:"Na een brokkenval de koeling kuisen om continue materiaalstroom te verzekeren en verstoppingen te voorkomen.",
    kernpunten:[
      "Let op pieklawaai — gehoorbescherming verplicht.",
      "Niet overhaast op- en aftrappen lopen. Stootgevaar.",
      "Oppassen voor bewegende delen — nooit aanraken.",
      "Veiligheidsbril en stofmasker dragen.",
      "Alle arbeidsmiddelen na de werken terugplaatsen.",
    ],
    verboden:["Bewegende delen aanraken tijdens werking","Werken zonder stofmasker in koelzone"],
    pbm:["Veiligheidshelm","Veiligheidsbril","Gehoorbescherming","FFP3-stofmasker","Veiligheidsschoenen S3"],
  },
  {
    id:20, cat:"VIK",
    titel:"VIK-P-KO-03 — Koeling kuisen met stop (stilstand)",
    versie:"v1.0", datum:"06/05/2013", auteur:"Argex H&S",
    tags:["Koeling","Kuiswerken","Stilstand","VIK","Roosters"],
    beschrijving:"Tijdens stilstand de koeling kuisen voor goede werking bij opstart. Roosters binnenin kunnen gecontroleerd worden.",
    kernpunten:[
      "Installatie volledig stilleggen. LOTOTO toepassen vóór start.",
      "Let op pieklawaai en bewegende delen bij herstart.",
      "Niet overhaast op- en aftrappen lopen.",
      "Veiligheidsbril en stofmasker dragen. Arbeidsmiddelen nadien terugplaatsen.",
    ],
    verboden:["Werken aan koeling zonder LOTOTO","Roosters controleren bij draaiende installatie"],
    pbm:["Veiligheidshelm","Veiligheidsbril","Gehoorbescherming","FFP3-stofmasker","Veiligheidsschoenen S3"],
  },
  {
    id:21, cat:"VIK",
    titel:"VIK-P-KO-04 — Brokkenval ledigen (wiellader)",
    versie:"v2.0", datum:"29/03/2017", auteur:"Argex H&S",
    tags:["Brokkenval","Wiellader","Kuiswerken","VIK","Warmte"],
    beschrijving:"Brokkenval vrijmaken voor continue materiaalstroom. Enkel voor personen met geldig wielladerattest.",
    kernpunten:[
      "Enkel personen met geldig wielladerattest.",
      "Kijk uit voor andere voertuigen en personen. Warmtebronnen aanwezig.",
      "Ramen en deuren dicht houden. Stofmasker dragen.",
      "Niet roken in voertuigen. Max. 15 km/u.",
    ],
    verboden:["Wiellader bedienen zonder wielladerattest","Roken in of rondom de brokkenvalzone"],
    pbm:["Veiligheidshelm","Veiligheidsbril","FFP3-stofmasker","Werkhandschoenen","Veiligheidsschoenen S3","Fluovest"],
  },
  {
    id:22, cat:"VIK",
    titel:"VIK-P-KV-01 — Kuisen korven en voorplaten",
    versie:"v1.0", datum:"02/05/2013", auteur:"Argex H&S",
    tags:["Korven","Voorplaten","Kuiswerken","VIK","Tonstars"],
    beschrijving:"Gebruikte korven en voorplaten reinigen om als reserve te stockeren. Grondig reinigen voor efficiënte productie.",
    kernpunten:[
      "Juiste arbeidsmiddelen gebruiken. Correcte houding bij tillen zware materialen.",
      "Niet alleen tillen of heffen aan zware onderdelen.",
      "Let op pieklawaai. Orde en netheid voorkomt struikelgevaar.",
      "Alles proper achterlaten na de werken.",
    ],
    verboden:["Zwaar materiaal alleen tillen zonder hulp of hijsgereedschap"],
    pbm:["Veiligheidsbril","Werkhandschoenen","Gehoorbescherming","Veiligheidsschoenen S3"],
  },
  {
    id:23, cat:"VIK",
    titel:"VIK-P-KV-02 — Korven en voorplaten vervangen (tonstars)",
    versie:"v1.0", datum:"02/05/2013", auteur:"Argex H&S",
    tags:["Korven","Voorplaten","Tonstars","LOTO","VIK"],
    beschrijving:"Korven en voorplaten van tonstars vervangen voor continue toevoer naar de oven. Altijd met 2 personen.",
    kernpunten:[
      "Gehele lijn stilleggen. Zekeringen vergrendelen. Noodstoppen induwen.",
      "Waarschuwingsborden plaatsen. Altijd met 2 personen werken.",
      "Alle afschermingen terugplaatsen na de werken. IJzer apart leggen. Niets rondslingeren.",
    ],
    verboden:["Werken met 1 persoon aan tonstars","Noodstop verwijderen zonder vrijgave leidinggevende"],
    pbm:["Veiligheidsbril","Werkhandschoenen","Gehoorbescherming","Veiligheidsschoenen S3"],
  },
  {
    id:24, cat:"VIK",
    titel:"VIK-P-KV-03 — IJzer uit kollergang halen",
    versie:"v1.0", datum:"30/04/2013", auteur:"Argex H&S",
    tags:["Kollergang","IJzer","LOTO","VIK","Kleivoorbereiding"],
    beschrijving:"IJzer in de kollergang verwijderen om slijtage op alle machines te voorkomen. Volledige lijn stilleggen.",
    kernpunten:[
      "Volledige lijn stilleggen. Vergrendelsleutel goed bijhouden.",
      "Noodstoppen vergrendelen. Waarschuwingsbord plaatsen.",
      "Niet overhaast op- en aftrappen lopen. Stootgevaar aanwezig.",
      "Juiste arbeidsmiddelen gebruiken. Niets rondslingeren.",
    ],
    verboden:["Werken aan kollergang zonder volledige lijn stil te leggen","Sleutels achterlaten op of in de machine"],
    pbm:["Veiligheidsbril","Werkhandschoenen","Gehoorbescherming","Veiligheidsschoenen S3"],
  },
  {
    id:25, cat:"VIK",
    titel:"VIK-P-OV-04 — Lossen houtstof (ATEX-docking)",
    versie:"v1.0", datum:"Januari 2026", auteur:"Bert Verbraecken / Max Goosens",
    tags:["Houtstof","ATEX","Lossen","Docking","VIK","Explosie"],
    locatie:"Loszone houtstof — docking", frequentie:"Bij lossen",
    beschrijving:"Veilig werken met de docking voor lossen van houtstof. Enkel bevoegde personen. LOTOTO verplicht bij onderhoud.",
    risicos:["Explosiegevaar (ATEX) — houtstof vormt ontplofbare atmosfeer","Automatisch startende machine — beknelling","Stofblootstelling","Stootgevaar"],
    stappen:[
      "⚠ ATEX-check: controleer of er geen vonken, open vuur of warmtebronnen aanwezig zijn.",
      "Controleer of de machine in veilige toestand is vóór aanvang lossen.",
      "Automatische start: zorg dat niemand in de gevaarzone staat.",
      "Waarschuwingsstickers controleren op zichtbaarheid — vervangen bij slijtage.",
      "Binnenkant machine: enkel betreden na LOTOTO — nooit tijdens werking.",
      "Bij langdurige stilstand rolluik sluiten.",
      "Na gebruik: zone proper achterlaten, schade onmiddellijk melden aan ploegbaas.",
    ],
    kernpunten:[
      "Enkel bevoegden mogen de docking bedienen. Opgelet: automatisch startende machine.",
      "Waarschuwingsstickers steeds zichtbaar. Regelmatig reinigen en vervangen bij slijtage.",
      "Verboden toegang tot binnenkant machine tenzij beveiligd met LOTOTO.",
      "Bij langdurige stilstand: rolluik sluiten. Schade onmiddellijk melden aan leidinggevende.",
    ],
    verboden:["Binnenkant machine betreden zonder LOTOTO","Roken in houtstofzone (ATEX)","Perslucht gebruiken om houtstof te verwijderen"],
    pbm:["Veiligheidshelm","Veiligheidsschoenen S3","FFP3-stofmasker","Werkhandschoenen","ATEX-kledij","Fluovest"],
  },
  {
    id:26, cat:"VIK",
    titel:"VIK-P-ZG-02 — Brokstukken/IJzer uit silo halen",
    versie:"v2.0", datum:"29/03/2017", auteur:"Argex H&S",
    tags:["Silo","IJzer","Brokstukken","VIK","Hoogte","Besloten ruimte"],
    locatie:"Zeefgebouw — silo's", frequentie:"Naar behoefte",
    beschrijving:"Brokstukken of ijzer uit silo verwijderen voor correcte werking volumemeter. Bij voorkeur uitbesteed aan gespecialiseerde firma.",
    risicos:["Valgevaar in silo (besloten ruimte)","Stootgevaar","Stofvorming (kristallijn silica)","Beklemming door bewegende delen"],
    stappen:[
      "⚠ Werken bij voorkeur uitbesteden aan gespecialiseerde firma.",
      "Bij eigen uitvoering: grondig vooroverleg tussen alle betrokken diensten verplicht.",
      "Altijd met minimum 3 personen. Geen toegang voor onbevoegden.",
      "Alle noodstoppen vergrendelen. Waarschuwingsborden plaatsen.",
      "Valharnas correct aandoen + buddy-check voor betreden silo.",
      "Voldoende verlichting voorzien vóór de start.",
      "IJzerresten en brokstukken apart leggen voor verwijdering.",
      "Na werken: alle arbeidsmiddelen terugplaatsen, zone proper achterlaten.",
    ],
    kernpunten:[
      "Bij voorkeur uitbesteden aan gespecialiseerde firma. Eigen personeel enkel bij extreme omstandigheden na grondig vooroverleg.",
      "Altijd met 3 personen. Geen toegang voor onbevoegden.",
      "Alle noodstoppen vergrendelen. Valbeveiliging verplicht. Voldoende verlichting.",
      "Na werken alle arbeidsmiddelen terugplaatsen. IJzerresten apart leggen.",
    ],
    verboden:["Werken in silo met minder dan 3 personen","Silo betreden zonder valbeveiliging","Onbevoegden toegang geven"],
    pbm:["Veiligheidshelm","Werkhandschoenen","FFP3-stofmasker","Valharnas met vanglijn","Veiligheidsschoenen S3"],
  },
  {
    id:27, cat:"VIK",
    titel:"VIK-P-ZG-04 — Algemene kuiswerken zifter",
    versie:"v1.0", datum:"07/05/2013", auteur:"Argex H&S",
    tags:["Zifter","Zeefgebouw","Kuiswerken","VIK","LOTO"],
    beschrijving:"Rein houden van de arbeidsplaatsen in het zeefgebouw. Alle lijnen stilleggen en collega's verwittigen.",
    kernpunten:[
      "Alle lijnen stilleggen. Collega's verwittigen vóór start.",
      "Noodstoppen vergrendelen. Waarschuwingsbord plaatsen.",
      "Let op stootgevaar. Niet overhaast op- en aftrappen lopen.",
      "Afschermingen steeds terugplaatsen na de werken.",
    ],
    verboden:["Kuiswerken starten zonder lijnen stil te leggen","Afschermingen weglaten na de werken"],
    pbm:["Veiligheidshelm","Werkhandschoenen","FFP3-stofmasker","Gehoorbescherming","Veiligheidsschoenen S3"],
  },
  {
    id:28, cat:"VIK",
    titel:"VIK-P-KAD-03 — Bobcat/wiellader kaai",
    versie:"v1.0", datum:"Januari 2026", auteur:"Argex H&S",
    tags:["Bobcat","Wiellader","Kaai","VIK","Hijsen"],
    locatie:"Kaai — buitenterrein", frequentie:"Bij gebruik",
    beschrijving:"Veilig bedienen van bobcat/wiellader op de kaai. Enkel gekwalificeerd personeel met opleiding en veiligheidsfunctie.",
    risicos:["Omkantelen van de machine","Klemmen tussen machineonderdelen (hefarmen, schepbak)","Aanrijding van personen of constructies","Struikelen/vallen bij in- of uitstappen","Instorten van goederen"],
    stappen:[
      "Controleer bevoegdheid: opleiding + veiligheidsfunctie vereist.",
      "Pre-use check: bedieningsfuncties, vergrendeling voorzetstuk, keuringsticker viersprong.",
      "In- en uitstappen: altijd achterwaarts afstappen. 3 contactpunten (2 handen + 1 voet).",
      "Bij vergrendelen/ontgrendelen voorzetstuk: steeds op de grond neerlaten.",
      "Vertrek langzaam. Houd rekening met de omgeving — maak oogcontact.",
      "Rijd enkel als er niemand in de werkzone achter de bobcat aanwezig is.",
      "Max. 15 km/u op de kaai. Claxon gebruiken in bochten en bij deuropeningen.",
      "Motor nooit achterlaten terwijl machine draait. Voorzetstuk op de grond.",
    ],
    kernpunten:[
      "Enkel gekwalificeerd personeel. Nooit achterlaten met draaiende motor.",
      "In- en uitstappen: altijd achterwaarts afstappen. 3 contactpunten gebruiken.",
      "Vóór start: bedieningsfuncties en keuringsticker (label viersprong) controleren.",
      "Max. 15 km/u op de kaai. Oogcontact met personen vóór rijden. Langzaam vertrekken.",
      "Niet rijden als er personen achter de bobcat aanwezig zijn.",
    ],
    verboden:["Bobcat bedienen zonder opleiding en veiligheidsfunctie","Bedieningspositie verlaten met draaiende motor"],
    pbm:["Veiligheidshelm","Veiligheidsschoenen S3","Fluovest","Werkhandschoenen"],
  },
  {
    id:29, cat:"WIK",
    titel:"VIK-W — Batterijlader veilig gebruik",
    versie:"v1.0", datum:"Januari 2026", auteur:"Max Goossens",
    tags:["Batterijlader","Elektrisch","Werf","VIK","Brand"],
    beschrijving:"Veilig gebruik en onderhoud van de batterijlader op de werf. Voorkomen van brand en elektrisering.",
    kernpunten:[
      "Controleer vóór gebruik: geen beschadigingen, stekker intact, LED NIET geel of rood.",
      "Nooit werken in een vochtige ruimte. Enkel gebruiken waarvoor bedoeld.",
      "Na gebruik steeds opruimen. Beschadigingen melden aan leidinggevende.",
      "Onderhoud: altijd stekker uittrekken én accu verwijderen vóór onderhoud.",
    ],
    verboden:["Batterijlader gebruiken bij beschadiging of gele/rode LED","Werken met batterijlader in vochtige omgeving"],
    pbm:["Veiligheidsschoenen S3","Werkhandschoenen","Veiligheidsbril"],
  },
  {
    id:30, cat:"WIK",
    titel:"VIK-W — Cirkelzaag veilig gebruik",
    versie:"v1.0", datum:"Januari 2026", auteur:"Max Goossens",
    tags:["Cirkelzaag","Zaag","Werf","VIK","Elektrisch"],
    beschrijving:"Veilig werken met de cirkelzaag. Enkel ervaren werknemers. Afscherming en zaagblad controleren vóór gebruik.",
    kernpunten:[
      "Enkel ervaren werknemers. Controleer: geen schade, afscherming aanwezig, zaagblad intact.",
      "Nooit werken in vochtige ruimte. Beide handen gebruiken. Goede verlichting.",
      "Na gebruik opruimen. Accu verwijderen vóór onderhoud. Beschadigingen melden.",
    ],
    verboden:["Cirkelzaag gebruiken zonder afscherming","Werken in vochtige omgeving","Onervaren personen laten werken met cirkelzaag"],
    pbm:["Gelaatsscherm","Werkhandschoenen","Gehoorbescherming","Veiligheidsschoenen S3","Kledij met lange mouwen"],
  },
  {
    id:31, cat:"WIK",
    titel:"VIK-W — Decoupeerzaag veilig gebruik",
    versie:"v1.0", datum:"Januari 2026", auteur:"Max Goossens",
    tags:["Decoupeerzaag","Zaag","Werf","VIK","Elektrisch"],
    beschrijving:"Veilig werken met de decoupeerzaag. Enkel ervaren werknemers. Accu en afscherming controleren.",
    kernpunten:[
      "Enkel ervaren werknemers. Controleer: geen schade, afscherming aanwezig, zaagblad en accu intact.",
      "Nooit werken in vochtige ruimte. Beide handen gebruiken. Goede verlichting.",
      "Accu verwijderen vóór onderhoud. Beschadigingen melden.",
    ],
    verboden:["Decoupeerzaag gebruiken bij beschadiging","Werken in vochtige omgeving"],
    pbm:["Veiligheidsbril","Werkhandschoenen","Gehoorbescherming","Veiligheidsschoenen S3","Kledij met lange mouwen"],
  },
  {
    id:32, cat:"WIK",
    titel:"VIK-W — Haakse slijper veilig gebruik",
    versie:"v1.0", datum:"Januari 2026", auteur:"Max Goossens",
    tags:["Haakse slijper","Slijpen","Werf","VIK","Elektrisch","Snijden"],
    beschrijving:"Veilig werken met de haakse slijper. Enkel ervaren werknemers. Afscherming verplicht.",
    kernpunten:[
      "Enkel ervaren werknemers. Controleer: geen schade, afscherming aanwezig, accu/stekker intact.",
      "Nooit werken in vochtige ruimte. Beide handen gebruiken. Goede verlichting.",
      "Accu of stekker verwijderen vóór onderhoud. Beschadigingen melden.",
    ],
    verboden:["Haakse slijper gebruiken zonder afscherming","Werken in vochtige omgeving","Onervaren personen laten werken met haakse slijper"],
    pbm:["Gelaatsscherm (slijpwerk)","Werkhandschoenen","Gehoorbescherming","Veiligheidsschoenen S3","Kledij met lange mouwen","Lasschort bij nabijheid laswerk"],
  },
]

// ─── TOOLBOXEN ────────────────────────────────────────────────────────────────
const TOOLBOXEN_DATA = [
  {
    id:1, titel:"Veiligheid op de Argex site — introductie", duur:"20 min", cat:"Algemeen", verplicht:true, gevolgd:false, datum:null,
    inhoud:[
      "Argex-site overzicht: gevaarlijke zones en signalisatie",
      "PBM's verplicht per zone op onze site",
      "Groeve, ovens en machines — de 3 grote risico's",
      "LMRA: STOP – THINK – GO vóór elke risicovolle taak",
      "Stofblootstelling: gevaren en bescherming",
      "Melden van incidenten via Argex Safety app",
    ],
  },
  {
    id:2, titel:"Kwartsstof & ademhalingsbescherming", duur:"20 min", cat:"Gezondheid", verplicht:true, gevolgd:false, datum:null,
    inhoud:[
      "Kwarts = siliciumdioxide. Deeltjes < 0,0007 mm dringen diep in de longen.",
      "Silicose: chronisch (20j+), versneld (5-15j) of acuut — onomkeerbare longschade.",
      "Grenswaarde kwartsstof inadembaar: 0,1 mg/m³. Zagen/frezen/slijpen = 200x teveel!",
      "P3/FFP3-stofmasker verplicht in alle stofzones (silo's, zeeflijnen, transportbanden, kleivoorbereiding).",
      "Collectieve aanpak: ontstoffingsinstallaties, afzuiging, sproeien. Individuele aanpak: P3-masker.",
    ],
  },
  {
    id:3, titel:"Valbescherming — werken op hoogte", duur:"20 min", cat:"Veiligheid", verplicht:true, gevolgd:false, datum:null,
    inhoud:[
      "Valbeveiliging verplicht vanaf 2 meter vrije valhoogte. Eerst collectieve bescherming (leuning, platform).",
      "Valbeveiliging bestaat uit: ankerpunt, vanglijn, schokdemper en valharnas.",
      "Visuele controle harnas vóór gebruik: geen gebreken, gekeurd (kleur van de tag controleren).",
      "Correct dragen: beenbanden, schouderbanden aanspannen — ring moet mooi in het midden hangen.",
      "Harnas jaarlijks en na elke val keuren door externe dienst. Bewaren op koele, droge plaats.",
    ],
  },
  {
    id:4, titel:"Heffen en aanslaan van lasten — hijsveiligheid", duur:"20 min", cat:"Machines", verplicht:true, gevolgd:false, datum:null,
    inhoud:[
      "Lasten aanslaan = bevoegd persoon (opgeleid, ≥18 jaar, medisch geschikt).",
      "Hijsgereedschappen 3-maandelijks gekeurd via kleurencodering colsonbandjes: Lente=GROEN, Zomer=GEEL, Herfst=BLAUW, Winter=WIT.",
      "Nooit beschadigd toebehoren gebruiken: geen vervormd, gescheurd, verroest, geknoopt of zelfgemaakt materiaal.",
      "Hoek α tussen lengen max. 60° (absoluut nooit >120°). Gebruik lengen lang genoeg.",
      "Nooit onder een opgehangen last lopen. Ga uit de buurt bij het optillen. Draag fluovest.",
    ],
  },
  {
    id:5, titel:"Gehoorbescherming — werken in lawaaiige zones", duur:"15 min", cat:"Gezondheid", verplicht:true, gevolgd:false, datum:null,
    inhoud:[
      "Gehoorverlies is NIET herstelbaar. Vanaf 80 dB aanbevolen, vanaf 85 dB verplicht.",
      "Bij 85 dB gedurende 8u/dag bereik je de veiligheidslimiet. Elke +3 dB halveert de toegelaten tijd.",
      "Zones met verplichte gehoorbescherming: brekers, zeefinstallaties, dieselmotoren, compressoren, ventilatoren.",
      "Beschikbare PBM's: wegwerp oordoppen, herbruikbare oordoppen, otoplastieken (persoonlijk gevormd).",
      "Oordoppen correct inbrengen: nat maken, oprollen, oor omhoog trekken, prop volledig inbrengen.",
    ],
  },
  {
    id:6, titel:"Veilig gebruik van handgereedschappen", duur:"15 min", cat:"Machines", verplicht:true, gevolgd:false, datum:null,
    inhoud:[
      "Gebruik gereedschap enkel waarvoor het bestemd is. Controleer vóór gebruik op slijtage en defecten.",
      "Hamers: gave gladde steel, stevig geborgd in hamerkop, geen bramen op de kop.",
      "Moersleutels: sleutel moet correct passen op de moer — nooit vulplaatjes gebruiken, nooit steel verlengen.",
      "Schroevendraaiers: nooit als beitel gebruiken. Werkstuk nooit vasthouden als schroef wordt aangedraaid.",
      "Vijlen: altijd voorzien van stevig heft. Beitels: koppen regelmatig ontbramen en vlak slijpen.",
    ],
  },
  {
    id:7, titel:"Ioniserende straling — densiteitsmeter", duur:"15 min", cat:"Procesinstallaties", verplicht:true, gevolgd:false, datum:null,
    inhoud:[
      "Densiteitsmeter = gammastraling (ioniserende straling). Dosistempo: 15 µSv/u op contact, <0,5 µSv/u op 1m.",
      "Drie basisprincipes: Afscherming (loodkasteel respecteren), Verblijftijd minimaliseren, Afstand maximaliseren.",
      "Op 30 cm van de bron: max. 1000 uur/jaar. Op 10 cm: max. 25 uur/jaar. Dosismeter niet verplicht.",
      "Nooit handen onder de meetopstelling brengen. Gebruik steeds een steker. Sleutel bronhouder bij ploegbaas.",
      "Bij schade of incident: zone 20m afsluiten, IDFC bellen (Johny Bultheel/Bert Verbraecken), niemand toegang.",
    ],
  },
  {
    id:8, titel:"LMRA — STOP THINK GO vóór elke risicovolle taak", duur:"15 min", cat:"Preventie", verplicht:true, gevolgd:false, datum:null,
    inhoud:[
      "STOP: Ken je taak en de aanwezige risico's vóór de start.",
      "THINK: Controleer werkvergunning, PBM's, nooduitgangen, brandblussers en verzamelplaats.",
      "THINK: LOTOTO toegepast op alle machines? Risico's van struikelen/uitglijden gekend?",
      "GO: Kan ik veilig werken? JA → starten. NEEN → stop en meld aan leidinggevende.",
      "'Als het niet veilig kan, dan doen we het niet!'",
    ],
  },
  {
    id:9, titel:"Evacuatie & brandblussers — noodprocedure", duur:"15 min", cat:"Noodplan", verplicht:true, gevolgd:false, datum:null,
    inhoud:[
      "Evacuatiesignaal: gastoeters op de site. Ken de locatie van de dichtstbijzijnde toeter.",
      "Bij evacuatie: onmiddellijk naar de verzamelplaats (parking bedienden) — nooit terugkeren.",
      "Brandblussers: poederblussers (vaste stoffen/vloeistoffen/gassen) en CO₂-blussers (vloeistoffen/gassen).",
      "Bluspoging enkel bij kleine brand en altijd met twee personen. Hulpdiensten ALTIJD verwittigen (112).",
      "Gebruikte brandblusser onmiddellijk melden zodat die hervuld of vervangen wordt.",
    ],
  },
  {
    id:10, titel:"Heftruck & intern transport — rijveiligheid", duur:"15 min", cat:"Transport", verplicht:true, gevolgd:false, datum:null,
    inhoud:[
      "Vorken 10–15 cm boven de grond tijdens rijden. Maximumsnelheid op de site: 15 km/u.",
      "Claxon gebruiken bij bochten, blinde zones en deuropeningen.",
      "Oogcontact met voetgangers vóór doorrijden. Voetgangers hebben altijd voorrang.",
      "Nooit personen vervoeren op vorken, paletten of voorzetstukken.",
      "GSM of oortjes tijdens het rijden: verboden. Gordel dragen indien aanwezig.",
    ],
  },
  {
    id:11, titel:"Bezoekers & aannemers op de site ontvangen", duur:"15 min", cat:"Aannemers", verplicht:false, gevolgd:false, datum:null,
    inhoud:[
      "Aanmelden verplicht bij receptie of expeditie (03/250.15.15) vóór betreden van de site.",
      "Bezoekers enkel onder begeleiding. Productiezone: helm + veiligheidsschoenen + fluovest verplicht.",
      "Aannemers: dagelijkse registratie bij werken >1 dag. Register bij onderhoudsdienst en expeditie.",
      "Externe chauffeurs: aanmelden bij aankomst, geen toegang productiezone zonder begeleiding.",
    ],
  },
];

// ─── CERTIFICATEN ─────────────────────────────────────────────────────────────
const MIJN_OPL = [
  { naam:"VCA Basis",              datum:"15-03-2023", verval:"15-03-2026", status:"binnenkort" },
  { naam:"Heftruck B+C",           datum:"10-01-2024", verval:"10-01-2027", status:"ok"         },
  { naam:"EHBO Level 1",           datum:"05-06-2023", verval:"05-06-2026", status:"binnenkort" },
  { naam:"Brandbestrijding BHV",   datum:"12-04-2023", verval:"12-04-2025", status:"verlopen"   },
];

const TEAM = [
  { id:2, name:"Georgy Eggermont",  avatar:"GE", functie:"Ploegchef Productie",  afdeling:"Productie", opleidingen:[
    { naam:"VCA VOL",             datum:"20-09-2023", verval:"20-09-2026", ok:true  },
    { naam:"Heftruck B+C",        datum:"20-09-2023", verval:"20-09-2026", ok:true  },
    { naam:"EHBO Level 2",        datum:"15-11-2023", verval:"15-11-2026", ok:true  },
  ]},
  { id:3, name:"Medewerker Productie (in te vullen)", avatar:"MP", functie:"Machine-operator", afdeling:"Productie", opleidingen:[
    { naam:"VCA Basis",           datum:"10-05-2022", verval:"10-05-2025", ok:false },
    { naam:"Heftruck B+C",        datum:"10-05-2022", verval:"10-05-2025", ok:false },
    { naam:"EHBO Level 1",        datum:"10-05-2022", verval:"10-05-2025", ok:false },
  ]},
  { id:6, name:"Medewerker (in te vullen)", avatar:"??", functie:"Medewerker productie", afdeling:"Productie", opleidingen:[
    { naam:"VCA Basis", datum:"In te vullen", verval:"In te vullen", ok:true },
  ]},
];

// ─── CONTACTEN ────────────────────────────────────────────────────────────────
const EHBO_LEDEN = [
  { naam:"EHBO'er productie (in te vullen)", rol:"EHBO'er — Productie / Oven hal",  tel:"0497/51.50.95", email:"operator@argex.be", desc:"EHBO-lokaal in onderhoudsloods. AED aanwezig.", kleur:AX.clay, init:"E1" },
  { naam:"EHBO'er expeditie (in te vullen)", rol:"EHBO'er — Expeditie / Kleivoorbereiding", tel:"03/250.15.15", email:"expeditie@argex.be", desc:"AED in sociaal gebouw (ingang).", kleur:AX.clay, init:"E2" },
  { naam:"Dr. Brigitte Merkus", rol:"Arbeidsarts — Liantis EDPBW", tel:"+32 3 886 05 78", email:"charlotte.vanassche@liantis.be", desc:"Via Liantis (Rijksweg 9, Puurs). Contactpersoon: Charlotte Van Assche.", kleur:AX.green, init:"BM" },
];
// IDFC — Interne Dienst Fysische Controle (ioniserende straling)
const IDFC_CONTACT = "Johny Bultheel (hoofd IDFC) · Nele Vervynckt · Bert Verbraecken";

const VERTROUWENSPERSONEN = [
  { naam:"Nicole Snoeck", rol:"Vertrouwenspersoon intern — HR", tel:"03/250.15.15", email:"hr@argex.be", desc:"Bereikbaar via HR. Strikt vertrouwelijk. Ook voor vragen rond welzijn en alcohol/drugbeleid.", kleur:AX.earth, init:"NS" },
  { naam:"IDEWE — Externe vertrouwenspersoon",        rol:"Ext. vertrouwenspersoon (IDEWE)", tel:"0800 30 801", email:"preventie@idewe.be", desc:"Anoniem en gratis bereikbaar via IDEWE: 0800 30 801.", kleur:AX.earth, init:"VE" },
];

// ─── NOODPLAN ─────────────────────────────────────────────────────────────────
const NOODPLAN_INTERN = "0497/51.50.95";
const VERZAMELPLAATS = "Parking bedienden (aangeduid op evacuatieplan op site)";
const BHV_TEAM = ["Bert Verbraecken (Preventieadviseur)","Ploegverantwoordelijke productie","Magazijnier (zie affiche sociaal gebouw)"];
const AED_LOCATIES = ["EHBO-lokaal onderhoudsloods","Sociaal gebouw (ingang)"];

const NOODSCENARIOS = [
  { id:"brand",     ico:"🔥", label:"Brand",               kleur:"#C0392B", bg:"#FFF0EE", stappen:[
    {nr:1,ico:"🔴",tit:"Alarm slaan",           txt:"Druk op het dichtstbijzijnde brandalarm of bel intern "+NOODPLAN_INTERN+"."},
    {nr:2,ico:"📢",tit:"Collega's verwittigen",  txt:"Waarschuw iedereen in de buurt. Niemand mag achterblijven."},
    {nr:3,ico:"🚪",tit:"Evacueer onmiddellijk",  txt:"Dichtstbijzijnde nooduitgang. NOOIT de lift."},
    {nr:4,ico:"🚒",tit:"Bel 112",                txt:"Locatie, wat brandt, hoeveel personen."},
    {nr:5,ico:"📍",tit:"Verzamelplaats",         txt:VERZAMELPLAATS},
    {nr:6,ico:"🚫",tit:"Niet terugkeren",        txt:"NOOIT terug tot brandweer toestemming geeft."},
  ]},
  { id:"ovenincident", ico:"🌡️", label:"Oven incident",     kleur:"#E65100", bg:"#FFF3E0", stappen:[
    {nr:1,ico:"🛑",tit:"STOP de installatie",   txt:"Noodstop activeren. Oven uitschakelen via bedieningspaneel."},
    {nr:2,ico:"📢",tit:"Verwittig leidinggevende",txt:"Onmiddellijk ploegchef en veiligheidscoördinator verwittigen."},
    {nr:3,ico:"🚫",tit:"Veilige afstand bewaren",txt:"Min. 5m afstand van de oven. Gebied afbakenen."},
    {nr:4,ico:"📞",tit:"Bel hulpdiensten indien nodig",txt:"Bij brand: 112. Bij letsel: 112 + intern "+NOODPLAN_INTERN+"."},
    {nr:5,ico:"🔍",tit:"Bewaar de situatie",     txt:"NIETS aanraken of wijzigen tot veiligheidscoördinator aanwezig is."},
    {nr:6,ico:"📋",tit:"Meld als incident",      txt:"Registreer in de Argex Safety app."},
  ]},
  { id:"machineincident",ico:"⚙️",label:"Machine-incident",  kleur:"#6D4C41", bg:"#EFEBE9", stappen:[
    {nr:1,ico:"🛑",tit:"Machine onmiddellijk stoppen",txt:"Noodstopknop indrukken. LOTO toepassen."},
    {nr:2,ico:"🩺",tit:"EHBO'er bellen",         txt:"Onmiddellijk EHBO'er ter plaatse roepen. Bij ernstig letsel: 112."},
    {nr:3,ico:"🔒",tit:"Zone beveiligen",        txt:"Niemand in de buurt van de machine. Zone afbakenen."},
    {nr:4,ico:"📢",tit:"Leidinggevende verwittig",txt:"Ploegchef + veiligheidscoördinator onmiddellijk informeren."},
    {nr:5,ico:"🔍",tit:"Bewaar de situatie",     txt:"NIETS verplaatsen op de werkplek tot onderzoek klaar."},
    {nr:6,ico:"📋",tit:"Registreer het incident", txt:"Meld zo snel mogelijk in de Argex Safety app."},
  ]},
  { id:"stofincident", ico:"💨", label:"Stofwolk / -explosie",kleur:"#78909C", bg:"#ECEFF1", stappen:[
    {nr:1,ico:"🚫",tit:"Stop alle activiteiten", txt:"Alle machines uitschakelen. Elektriciteit uitschakelen."},
    {nr:2,ico:"🫁",tit:"Verlaat de zone",        txt:"Onmiddellijk de stofwolk verlaten. Mond/neus bedekken."},
    {nr:3,ico:"📵",tit:"Geen vonken of elektriciteit",txt:"Stofwolken zijn explosief. Geen schakelaar aanraken."},
    {nr:4,ico:"📞",tit:"Bel 112 en intern",      txt:"Hulpdiensten verwittigen. Intern: "+NOODPLAN_INTERN+"."},
    {nr:5,ico:"🌬️",tit:"Ventileer de ruimte",   txt:"Na veilige verklaring: ventilatie aanzetten voor stof te doen zakken."},
    {nr:6,ico:"📋",tit:"Meld als incident",      txt:"Registreer in de Argex Safety app."},
  ]},
  { id:"arbeidsongeval",ico:"🚑",label:"Arbeidsongeval",       kleur:"#C0392B", bg:"#FFF0EE", stappen:[
    {nr:1,ico:"🔒",tit:"Beveilig de omgeving",   txt:"Zone veiligstellen. Geen extra slachtoffers."},
    {nr:2,ico:"🩺",tit:"Eerste hulp verlenen",   txt:"EHBO'er bellen. Slachtoffer NIET bewegen."},
    {nr:3,ico:"📞",tit:"Bel 112 bij ernstig letsel",txt:"Intern: "+NOODPLAN_INTERN+". Locatie doorgeven."},
    {nr:4,ico:"📢",tit:"Verwittig leidinggevende",txt:"Ploegchef + veiligheidscoördinator direct informeren."},
    {nr:5,ico:"🔍",tit:"Bewaar de situatie",     txt:"NIETS wijzigen tot onderzoek is afgerond."},
    {nr:6,ico:"📋",tit:"Registreer in de app",   txt:"Zo snel mogelijk melden in Argex Safety."},
  ]},
];

// ─── COMITÉ VERSLAGEN ─────────────────────────────────────────────────────────
const COMITE = [
  { id:1, datum:"12 februari 2026", titel:"CPBW vergadering — 12/02/2026", punten:[
    "Goedkeuring verslag vorige vergadering",
    "GPP en JAP 2026 — herziening na overname door Heidelberg",
    "Maandverslagen IDPBW: veiligheidsverslagen, sitebezoeken, CE-audit, Kiwa-audit",
    "Veiligheidsincidenten jan: kraan sociaal gebouw (29/01), weggeroeste schuif Dano (03/02), trap (05/02), arbeidsongeval Dano knie (07/02)",
    "Statistieken 2026: frequentiegraad 0, ernstgraad 0, doelstelling fg 28,5",
    "Uitgevoerde acties: hoogspanning (03/02), densiteitsmeting (21/01), metaaldetector band 41 (20/01)",
    "Geplande acties feb: kleivoorbereiding, oveninstallatie trap, koolinstallatie houtstof",
    "Toolbox januari: veilig werken met perslucht en hydraulische leidingen",
    "STAVAZA verhuis atelier: risicoanalyse opgesteld, offertes aangevraagd (dak, trap, bureaus, poort)",
  ]},
  { id:2, datum:"22 januari 2026", titel:"CPBW vergadering — 22/01/2026", punten:[
    "Goedkeuring verslag vorige vergadering",
    "GPP en JAP 2026 — herziening door overname Heidelberg",
    "Maandverslagen IDPBW: onthaal nieuwe medewerkers, veiligheidsoverleg, interne audit, JAP-GPP",
    "Veiligheidsincidenten: Dano trap (20/11), Kade kraanbak bouten losgedraaid (15/12)",
    "Statistieken 2025: frequentiegraad 22,57, ernstgraad 0,34, 30 verloren kalenderdagen",
    "Uitgevoerde acties: dagelijkse controle HS-cabines, hitteschild, keertrommel afscherming, trapleuning",
    "Toolbox dec: lassen & lasogen — toolbox jan: melden van ongevallen",
    "Nieuwe punten: verhuis atelier (asbest, veiligheid, planning), kleistock fase 1 en 2",
    "Waterprobleem site: hoofdleiding afgesloten door ondergrondse kruising Sterhoek",
  ]},
];

// ─── INCIDENTEN ───────────────────────────────────────────────────────────────
const INCIDENT_TYPES = [
  { id:"gevaarlijk", ico:"⚠️", label:"Gevaarlijke situatie",  kleur:AX.amber,  bg:AX.amberLight },
  { id:"ongeval",    ico:"🚨", label:"Ongeval met letsel",     kleur:AX.red,    bg:AX.redLight   },
  { id:"materieel",  ico:"🔧", label:"Materiële schade",       kleur:AX.blue,   bg:"#EEF4FF"     },
];
const OORZAKEN = ["Menselijke fout","Onvoldoende instructie","Defect materieel","Onveilige omstandigheid","Ontbrekende PBM's","Procedure niet gevolgd","Tijdsdruk","Communicatiefout","Andere"];
const MOCK_MELDINGEN = [
  { id:1, type:"gevaarlijk", titel:"Weggeroeste schuif in plafond — Kelder Dano", ernst:"matig", status:"in behandeling", datum:"03-02-2026", melder:"Georgy Eggermont", locatie:"Kelder Dano", beschrijving:"Weggeroeste schuif vastgesteld in plafond Kelder Dano. Risico op losraken en val.", oorzaak:"Slijtage / corrosie", directeActie:"Zone afgebakend", actie:"Herstel voorzien met beton", verantwoordelijke:"Bert Verbraecken", deadline:"15-03-2026" },
  { id:2, type:"materieel", titel:"Kraan voorover geheld bij sociaal gebouw", ernst:"hoog", status:"afgehandeld", datum:"29-01-2026", melder:"Georgy Eggermont", locatie:"Sociaal gebouw", beschrijving:"Tijdens verplaatsen van een grijper begon de kraan voorover te hellen. Douchecontainer aan sociaal gebouw geraakt.", oorzaak:"Menselijke fout — stempels niet gebruikt", directeActie:"Operaties gestopt", actie:"Procedure: stempels verplicht bij verplaatsen lasten", verantwoordelijke:"Bert Verbraecken", deadline:"12-02-2026" },
  { id:3, type:"ongeval", titel:"Arbeidsongeval met werkverlet — Kelder Dano", ernst:"hoog", status:"in behandeling", datum:"07-02-2026", melder:"Georgy Eggermont", locatie:"Kelder Dano — B81 richting nieuwe tunnel", beschrijving:"Werknemer kniestoot tegen steen bij passeren onder band B81. Letsels: linkerknie en linkerschouder.", oorzaak:"Onveilige doorgang onder transportband", directeActie:"EHBO verleend, werknemer naar arts", actie:"Onderzoeken hoe doorgang onder band kan vermeden worden", verantwoordelijke:"Bert Verbraecken", deadline:"12-03-2026" },
];

// ─── ONBOARDING ───────────────────────────────────────────────────────────────
const ONBOARDING_STAPPEN = [
  { id:"welkom",     ico:"🏭", tit:"Welkom bij Argex",          desc:"Maak kennis met Argex en het veiligheidsbeleid." },
  { id:"huisregels", ico:"📜", tit:"Huisregels & gedragscode",  desc:"Lees en bevestig de Argex gedragscode." },
  { id:"noodplan",   ico:"🚨", tit:"Noodplan & evacuatie",      desc:"Ken de noodsituaties op onze site." },
  { id:"contacten",  ico:"🩺", tit:"EHBO & vertrouwenspersonen",desc:"Wie kan je helpen op het werk." },
  { id:"toolbox",    ico:"🎬", tit:"Introductietoolbox",        desc:"Verplichte veiligheidstoolbox volgen & tekenen." },
  { id:"quiz",       ico:"🧠", tit:"Kennisquiz",                desc:"5 vragen om de onboarding af te sluiten." },
];
const QUIZ = [
  { v:"Wat doe je EERST bij een incident met de oven?",              opts:["Doorwerken","Noodstop activeren","Foto nemen","Wachten op chef"], juist:1 },
  { v:"Wat is verplicht bij werken in de nabijheid van open stof?",  opts:["Niets extra","Stofmasker FFP2 of hoger","Gewone mondmasker","Zonnebril"], juist:1 },
  { v:"Wat betekent LOTO?",                                          opts:["Lock Out Tag Out","Light Off Turn Off","Load On Take Over","Lassen Op Termijn Organiseren"], juist:0 },
  { v:"Waar ga je bij evacuatie naartoe?",                           opts:["Kantine","Hal 1","De verzamelplaats aangeduid op de site","Parkeerplaats straat"], juist:2 },
  { v:"Hoe meld je een gevaarlijke situatie bij Argex?",             opts:["Niets doen","Alleen mondeling aan chef","Via de Argex Safety app of aan leidinggevende","Per brief"], juist:2 },
];

// ─── CSS ──────────────────────────────────────────────────────────────────────
const css = `
@import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600;700;800;900&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
body{background:#F5F0EA;font-family:'Work Sans',sans-serif;}
@keyframes spin{to{transform:rotate(360deg);}}
@keyframes fadeUp{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}
@keyframes float{0%,100%{transform:translateY(0) rotate(0deg);}50%{transform:translateY(-5px) rotate(3deg);}}
.fu{animation:fadeUp 0.25s ease forwards;}
.clay-float{animation:float 3s ease-in-out infinite;}
input,select,textarea{outline:none;font-family:inherit;}
input:focus,select:focus,textarea:focus{border-color:#C1440E!important;box-shadow:0 0 0 3px rgba(193,68,14,0.12)!important;}
::-webkit-scrollbar{width:5px;}
::-webkit-scrollbar-track{background:#F5F0EA;}
::-webkit-scrollbar-thumb{background:#C8B8A8;border-radius:3px;}
select option{background:#fff;color:#1C1008;}
.rh:hover{background:#FAE8E0!important;cursor:pointer;}
.bh{transition:all .15s;} .bh:hover{filter:brightness(0.91);transform:translateY(-1px);}
`;

// ─── KLEIKORREL LOGO (SVG) ────────────────────────────────────────────────────
const ArgexLogo = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
    {/* Kleikorrel — ronde steen met textuur */}
    <circle cx="30" cy="32" r="22" fill="#C1440E"/>
    <circle cx="30" cy="32" r="22" fill="url(#clayGrad)"/>
    {/* Textuur gaatjes */}
    <circle cx="22" cy="26" r="3" fill="rgba(0,0,0,0.12)"/>
    <circle cx="32" cy="22" r="2.5" fill="rgba(0,0,0,0.10)"/>
    <circle cx="40" cy="28" r="3.5" fill="rgba(0,0,0,0.12)"/>
    <circle cx="24" cy="36" r="2" fill="rgba(0,0,0,0.08)"/>
    <circle cx="36" cy="38" r="2.5" fill="rgba(0,0,0,0.10)"/>
    <circle cx="28" cy="42" r="2" fill="rgba(0,0,0,0.08)"/>
    {/* Glans */}
    <ellipse cx="23" cy="24" rx="6" ry="4" fill="rgba(255,255,255,0.2)" transform="rotate(-20 23 24)"/>
    {/* A letter */}
    <text x="30" y="38" textAnchor="middle" fontSize="16" fontWeight="800" fill="white" fontFamily="Work Sans,sans-serif" letterSpacing="-1">A</text>
    <defs>
      <radialGradient id="clayGrad" cx="35%" cy="30%" r="65%">
        <stop offset="0%" stopColor="#E8693A"/>
        <stop offset="100%" stopColor="#962E06"/>
      </radialGradient>
    </defs>
  </svg>
);

// ─── KLEIKORREL DECORATIEF ────────────────────────────────────────────────────
const ClayBall = ({ size=20, opacity=0.15 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" style={{opacity}}>
    <circle cx="20" cy="20" r="18" fill="#C1440E"/>
    <circle cx="14" cy="15" r="3" fill="rgba(0,0,0,0.15)"/>
    <circle cx="24" cy="12" r="2" fill="rgba(0,0,0,0.12)"/>
    <circle cx="28" cy="22" r="3" fill="rgba(0,0,0,0.15)"/>
    <ellipse cx="15" cy="13" rx="5" ry="3" fill="rgba(255,255,255,0.2)" transform="rotate(-20 15 13)"/>
  </svg>
);

// ─── UI COMPONENTEN ───────────────────────────────────────────────────────────
const Av = ({ i, s=36, c=AX.clay }) => (
  <div style={{width:s,height:s,borderRadius:"50%",background:c+"22",border:`2px solid ${c}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:s*.3,fontWeight:700,color:c,flexShrink:0}}>{i}</div>
);
const Tag = ({ label, color=AX.clay }) => (
  <span style={{fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:4,background:color+"18",color,letterSpacing:".02em",whiteSpace:"nowrap"}}>{label}</span>
);
const Card = ({ children, style={}, onClick, className="" }) => (
  <div className={className} onClick={onClick} style={{background:AX.white,borderRadius:10,border:`1px solid #E8D8CC`,boxShadow:"0 2px 6px rgba(193,68,14,0.06)",padding:20,...style}}>{children}</div>
);
const SectionHead = ({ children, sub, right }) => (
  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:22}}>
    <div style={{display:"flex",alignItems:"center",gap:10}}>
      <div style={{width:4,height:26,background:AX.clay,borderRadius:2}}/>
      <div>
        <h2 style={{fontFamily:"'Work Sans',sans-serif",fontSize:20,fontWeight:800,color:AX.gray900,letterSpacing:"-0.02em"}}>{children}</h2>
        {sub && <div style={{fontSize:12,color:AX.gray500,marginTop:2}}>{sub}</div>}
      </div>
    </div>
    {right && <div>{right}</div>}
  </div>
);
const Btn = ({ onClick, children, variant="primary", disabled, style:sx={} }) => {
  const v = {
    primary:{background:disabled?"#aaa":AX.clay,color:AX.white,border:"none"},
    ghost:{background:"transparent",color:AX.gray700,border:`1.5px solid ${AX.gray300}`},
    danger:{background:AX.redLight,color:AX.red,border:`1px solid ${AX.red}44`},
  };
  return <button onClick={onClick} disabled={disabled} className="bh" style={{padding:"10px 20px",borderRadius:7,cursor:disabled?"not-allowed":"pointer",fontFamily:"inherit",fontWeight:700,fontSize:13,...v[variant],...sx}}>{children}</button>;
};
const Inp = ({ label, type="text", value, onChange, placeholder, rows }) => (
  <div style={{marginBottom:14}}>
    {label && <div style={{fontSize:11,fontWeight:700,color:AX.gray500,letterSpacing:".08em",textTransform:"uppercase",marginBottom:5}}>{label}</div>}
    {rows
      ? <textarea value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} rows={rows} style={{width:"100%",border:`1.5px solid ${AX.gray300}`,borderRadius:7,padding:"10px 13px",color:AX.gray900,fontSize:13,lineHeight:1.6,resize:"vertical"}}/>
      : <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} style={{width:"100%",border:`1.5px solid ${AX.gray300}`,borderRadius:7,padding:"10px 13px",color:AX.gray900,fontSize:13}}/>
    }
  </div>
);
const Sel = ({ label, value, onChange, options }) => (
  <div style={{marginBottom:14}}>
    {label && <div style={{fontSize:11,fontWeight:700,color:AX.gray500,letterSpacing:".08em",textTransform:"uppercase",marginBottom:5}}>{label}</div>}
    <select value={value} onChange={e=>onChange(e.target.value)} style={{width:"100%",border:`1.5px solid ${AX.gray300}`,borderRadius:7,padding:"10px 13px",color:AX.gray900,fontSize:13,background:AX.white,cursor:"pointer"}}>
      {options.map(o=><option key={o.value||o} value={o.value||o}>{o.label||o}</option>)}
    </select>
  </div>
);

// ─── LOGIN ─────────────────────────────────────────────────────────────────────
function Login({ onLogin }) {
  const [email,setEmail]=useState(""); const [pw,setPw]=useState("");
  const [err,setErr]=useState(""); const [loading,setLoading]=useState(false);
  const go = async () => {
    setErr(""); if(!email||!pw){setErr("Vul e-mail en wachtwoord in.");return;}
    setLoading(true); await new Promise(r=>setTimeout(r,700));
    const u = USERS[email.toLowerCase()];
    if(!u||u.pw!==pw){setErr("Ongeldige combinatie.");setLoading(false);return;}
    setLoading(false); onLogin({...u,email:email.toLowerCase()});
  };
  const DEMO = [
    ["admin@argex.be","admin2026","Veiligheidscoördinator"],
    ["chef@argex.be","chef2026","Leidinggevende / Ploegchef"],
    ["werknemer@argex.be","werk2026","Medewerker"],
    ["aannemer@argex.be","aan2026","Aannemer / Extern"],
    ["nieuw@argex.be","nieuw2026","Nieuwe medewerker (onboarding)"],
  ];
  return (
    <div style={{minHeight:"100vh",background:`linear-gradient(160deg,${AX.clayDeep} 0%,${AX.clayDark} 55%,${AX.clay} 100%)`,display:"flex",alignItems:"center",justifyContent:"center",padding:20,position:"relative",overflow:"hidden"}}>
      {/* Achtergrond kleikorrels decoratief */}
      {[[10,15,80],[80,20,60],[5,70,50],[85,75,70],[50,85,40],[20,50,90]].map(([x,y,s],i)=>(
        <div key={i} style={{position:"absolute",left:`${x}%`,top:`${y}%`,opacity:0.08}}><ClayBall size={s} opacity={1}/></div>
      ))}
      <div className="fu" style={{width:"100%",maxWidth:430,position:"relative",zIndex:1}}>
        {/* Header */}
        <div style={{textAlign:"center",marginBottom:28}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:14,background:"rgba(255,255,255,0.1)",backdropFilter:"blur(10px)",borderRadius:14,padding:"14px 28px",border:"1px solid rgba(255,255,255,0.2)"}}>
            <div className="clay-float"><ArgexLogo size={48}/></div>
            <div style={{textAlign:"left"}}>
              <div style={{fontFamily:"'Work Sans',sans-serif",fontSize:22,fontWeight:900,color:AX.white,letterSpacing:"-0.03em",lineHeight:1}}>Argex Safety</div>
              <div style={{fontSize:12,color:"rgba(255,255,255,0.65)",marginTop:3}}>Geëxpandeerde kleikorrels · Burcht</div>
            </div>
          </div>
        </div>
        <div style={{background:AX.white,borderRadius:14,padding:28,boxShadow:"0 20px 60px rgba(100,30,2,0.4)"}}>
          <div style={{fontFamily:"'Work Sans',sans-serif",fontSize:17,fontWeight:800,color:AX.gray900,marginBottom:20}}>Aanmelden</div>
          {[["E-mailadres","email",email,setEmail,"naam@argex.be"],["Wachtwoord","password",pw,setPw,"••••••••"]].map(([l,t,v,s,p])=>(
            <div key={l} style={{marginBottom:14}}>
              <div style={{fontSize:11,fontWeight:700,color:AX.gray500,letterSpacing:".08em",textTransform:"uppercase",marginBottom:5}}>{l}</div>
              <input type={t} value={v} onChange={e=>s(e.target.value)} placeholder={p} style={{width:"100%",border:`1.5px solid ${AX.gray300}`,borderRadius:7,padding:"11px 13px",color:AX.gray900,fontSize:14,fontFamily:"inherit"}}/>
            </div>
          ))}
          {err && <div style={{fontSize:13,color:AX.red,marginBottom:12,padding:"9px 13px",background:AX.redLight,borderRadius:7}}>⚠ {err}</div>}
          <button onClick={go} disabled={loading} className="bh" style={{width:"100%",padding:12,background:loading?"#aaa":AX.clay,color:AX.white,border:"none",borderRadius:8,fontFamily:"'Work Sans',sans-serif",fontWeight:800,fontSize:15,cursor:loading?"not-allowed":"pointer"}}>
            {loading?"Aanmelden…":"Aanmelden →"}
          </button>
          <div style={{marginTop:18}}>
            <div style={{fontSize:11,fontWeight:700,color:AX.gray500,letterSpacing:".08em",textTransform:"uppercase",marginBottom:8}}>🔑 Klik om in te loggen</div>
            {DEMO.map(([e,p,r])=>(
              <div key={e} onClick={()=>{setEmail(e);setPw(p);}}
                style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"9px 12px",borderRadius:8,marginBottom:5,cursor:"pointer",border:`1.5px solid ${AX.clay}22`,background:email===e?AX.clayLight:"#fafafa",transition:"all .15s"}}
                onMouseEnter={ev=>ev.currentTarget.style.background=AX.clayLight} onMouseLeave={ev=>ev.currentTarget.style.background=email===e?AX.clayLight:"#fafafa"}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <div style={{width:28,height:28,borderRadius:"50%",background:AX.clay+"22",border:`1.5px solid ${AX.clay}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:AX.clay,flexShrink:0}}>{r.substring(0,2).toUpperCase()}</div>
                  <div>
                    <div style={{fontSize:12,fontWeight:700,color:AX.gray900}}>{r}</div>
                    <div style={{fontSize:10,color:AX.gray500}}>{e}</div>
                  </div>
                </div>
                <div style={{fontSize:10,color:AX.clay,fontWeight:700,background:AX.clayLight,padding:"2px 8px",borderRadius:4}}>{email===e?"✓ OK":"Klik"}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{textAlign:"center",marginTop:12,fontSize:11,color:"rgba(255,255,255,0.4)"}}>🔒 Beveiligd · Argex · Burcht / Zwijndrecht</div>
      </div>
    </div>
  );
}

// ─── ONBOARDING ────────────────────────────────────────────────────────────────
function Onboarding({ user, onComplete }) {
  const [stap,setStap]=useState(0); const [gedaan,setGedaan]=useState({});
  const [naam,setNaam]=useState(""); const [quizAntw,setQuizAntw]=useState({}); const [quizDone,setQuizDone]=useState(false);
  const h = ONBOARDING_STAPPEN[stap];
  const score = Object.entries(quizAntw).filter(([i,a])=>QUIZ[+i].juist===a).length;
  const bevestig = () => { setGedaan(p=>({...p,[h.id]:true})); if(stap<ONBOARDING_STAPPEN.length-1) setStap(s=>s+1); };

  return (
    <div style={{minHeight:"100vh",background:AX.bg}}>
      <div style={{background:`linear-gradient(90deg,${AX.clayDeep},${AX.clay})`,padding:"0 20px",height:56,display:"flex",alignItems:"center",gap:12}}>
        <ArgexLogo size={32}/>
        <div>
          <div style={{fontFamily:"'Work Sans',sans-serif",fontSize:15,fontWeight:800,color:AX.white}}>Argex Safety</div>
          <div style={{fontSize:11,color:"rgba(255,255,255,0.7)"}}>Onboarding · Welkom, {user.name.split(" ")[0]}</div>
        </div>
      </div>
      <div style={{maxWidth:580,margin:"0 auto",padding:"28px 20px"}}>
        {/* Voortgang */}
        <div style={{marginBottom:22}}>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:AX.gray500,marginBottom:6}}>
            <span>Stap {stap+1} van {ONBOARDING_STAPPEN.length}</span>
            <span style={{color:AX.clay,fontWeight:700}}>{Math.round((Object.keys(gedaan).length/ONBOARDING_STAPPEN.length)*100)}% klaar</span>
          </div>
          <div style={{height:8,background:"#E8D0C0",borderRadius:4,overflow:"hidden"}}>
            <div style={{height:"100%",width:`${(Object.keys(gedaan).length/ONBOARDING_STAPPEN.length)*100}%`,background:`linear-gradient(90deg,${AX.clayDark},${AX.clay})`,borderRadius:4,transition:"width .4s"}}/>
          </div>
          <div style={{display:"flex",gap:5,marginTop:8}}>
            {ONBOARDING_STAPPEN.map((s,i)=>(
              <div key={s.id} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
                <div style={{width:22,height:22,borderRadius:"50%",background:gedaan[s.id]?AX.clay:i===stap?AX.clayLight:"#fff",border:`2px solid ${gedaan[s.id]?AX.clay:i===stap?AX.clay:AX.gray300}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,color:gedaan[s.id]?AX.white:i===stap?AX.clay:AX.gray300}}>{gedaan[s.id]?"✓":i+1}</div>
                <span style={{fontSize:8,color:gedaan[s.id]?AX.clay:i===stap?AX.clay:AX.gray300,fontWeight:700,textTransform:"uppercase",textAlign:"center"}}>{s.tit.split(" ")[0].substring(0,6)}</span>
              </div>
            ))}
          </div>
        </div>

        <Card>
          <div style={{display:"flex",gap:14,alignItems:"center",marginBottom:18,paddingBottom:14,borderBottom:`1px solid ${AX.gray100}`}}>
            <div style={{width:48,height:48,borderRadius:12,background:AX.clayLight,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24}}>{h.ico}</div>
            <div>
              <div style={{fontFamily:"'Work Sans',sans-serif",fontSize:17,fontWeight:800,color:AX.gray900}}>{h.tit}</div>
              <div style={{fontSize:13,color:AX.gray500,marginTop:2}}>{h.desc}</div>
            </div>
          </div>

          {h.id==="welkom" && (
            <div>
              <div style={{background:AX.clayLight,borderRadius:10,padding:16,marginBottom:14,border:`1px solid ${AX.clay}33`}}>
                <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}>
                  <div className="clay-float"><ArgexLogo size={44}/></div>
                  <div>
                    <div style={{fontFamily:"'Work Sans',sans-serif",fontSize:16,fontWeight:800,color:AX.clayDark}}>Argex — Geëxpandeerde kleikorrels</div>
                    <div style={{fontSize:12,color:AX.earth,marginTop:2}}>Producent & verdeler lichte granulaten · Burcht/Zwijndrecht</div>
                  </div>
                </div>
                <div style={{fontSize:13,color:AX.gray700,lineHeight:1.7}}>
                  Argex maakt geëxpandeerde kleikorrels — "de bruine bolletjes uit de bloempotten". Op onze site werken we met grote hoeveelheden klei, hoge temperaturen en zware machines. Veiligheid staat centraal.
                </div>
              </div>
              <div style={{fontSize:13,color:AX.gray600,marginBottom:14,lineHeight:1.7}}>Deze onboarding duurt ±20 minuten en behandelt de huisregels, noodplan, EHBO-contacten en een kennistest.</div>
              <Btn onClick={bevestig}>Laten we beginnen! →</Btn>
            </div>
          )}

          {h.id==="huisregels" && (
            <div>
              <div style={{background:AX.gray50,borderRadius:9,padding:14,fontSize:13,color:AX.gray700,lineHeight:1.85,marginBottom:14,maxHeight:210,overflowY:"auto",border:`1px solid ${AX.gray100}`}}>
                <div style={{fontWeight:800,color:AX.gray900,marginBottom:8}}>Argex — Gedragscode & Huisregels</div>
                {[
                  "Draag altijd de verplichte PBM's in aangewezen zones (helm, bril, handschoenen, veiligheidsschoenen).",
                  "Meld elk incident, hoe klein ook, onmiddellijk aan je leidinggevende of via de app.",
                  "Voer altijd een LMRA uit vóór je aan een risicovolle taak begint.",
                  "LOTO verplicht bij elk onderhoud aan machines en transportbanden.",
                  "Geen gsm bij het bedienen van machines of rijden met heftruck.",
                  "Respecteer alle collega's — nultolerantie voor pesten of agressie.",
                  "Roken uitsluitend in de aangeduide rookzone.",
                  "Houd rijpaden en gangpaden vrij — voetgangers hebben altijd voorrang.",
                  "Bij twijfel over veiligheid: STOP het werk en vraag advies. Dat is je recht én plicht.",
                  "Stofwolken zijn gevaarlijk én explosief — PBM's dragen en melden.",
                ].map((r,i)=><div key={i} style={{paddingBottom:6,paddingTop:i>0?6:0,borderBottom:i<9?`1px solid ${AX.gray100}`:"none"}}>{i+1}. {r}</div>)}
              </div>
              <Inp label="Digitale handtekening — typ je volledige naam" value={naam} onChange={setNaam} placeholder="Volledige naam"/>
              <Btn onClick={bevestig} disabled={naam.trim().length<3}>✅ Ik bevestig de huisregels begrepen te hebben</Btn>
            </div>
          )}

          {h.id==="noodplan" && (
            <div>
              <div style={{display:"flex",gap:10,marginBottom:14}}>
                {[["112","Hulpdiensten",AX.red],[NOODPLAN_INTERN,"Intern noodnum.",AX.clay]].map(([n,l,c])=>(
                  <div key={n} style={{flex:1,background:c+"12",border:`2px solid ${c}33`,borderRadius:10,padding:"12px 14px",textAlign:"center"}}>
                    <div style={{fontSize:11,fontWeight:700,color:c,textTransform:"uppercase"}}>{l}</div>
                    <div style={{fontSize:28,fontWeight:900,color:c,fontFamily:"'Work Sans',sans-serif"}}>{n}</div>
                  </div>
                ))}
              </div>
              <div style={{fontSize:12,color:AX.gray500,marginBottom:10}}>Argex heeft 5 noodscenario's — ook specifiek voor oven-incidenten en stofwolken. Bekijk ze in de Noodplan-module.</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6,marginBottom:14}}>
                {NOODSCENARIOS.map(s=>(
                  <div key={s.id} style={{padding:"8px 6px",borderRadius:8,background:s.bg,border:`1px solid ${s.kleur}33`,textAlign:"center"}}>
                    <div style={{fontSize:18,marginBottom:2}}>{s.ico}</div>
                    <div style={{fontSize:10,fontWeight:700,color:s.kleur}}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div style={{background:AX.clayLight,borderRadius:8,padding:"10px 14px",fontSize:12,color:AX.clayDark,fontWeight:600,marginBottom:14}}>
                📍 Verzamelplaats: {VERZAMELPLAATS}
              </div>
              <Btn onClick={bevestig}>✅ Noodplan begrepen</Btn>
            </div>
          )}

          {h.id==="contacten" && (
            <div>
              {[["EHBO'ers",EHBO_LEDEN],["Vertrouwenspersonen",VERTROUWENSPERSONEN]].map(([tit,lijst])=>(
                <div key={tit} style={{marginBottom:14}}>
                  <div style={{fontSize:11,fontWeight:700,color:AX.gray500,letterSpacing:".08em",textTransform:"uppercase",marginBottom:8}}>{tit}</div>
                  {lijst.map(p=>(
                    <div key={p.naam} style={{display:"flex",gap:10,alignItems:"center",background:AX.gray50,borderRadius:8,padding:"10px 12px",marginBottom:7,border:`1px solid ${AX.gray100}`}}>
                      <Av i={p.init} s={38} c={p.kleur}/>
                      <div>
                        <div style={{fontSize:13,fontWeight:700,color:AX.gray900}}>{p.naam}</div>
                        <div style={{fontSize:11,color:p.kleur,fontWeight:600}}>{p.rol}</div>
                        <div style={{fontSize:12,color:AX.gray500}}>📞 {p.tel}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
              <Btn onClick={bevestig}>✅ Kennisgemaakt</Btn>
            </div>
          )}

          {h.id==="toolbox" && (
            <div>
              <div style={{background:AX.gray50,borderRadius:9,padding:14,marginBottom:14,border:`1px solid ${AX.gray100}`}}>
                <div style={{fontWeight:800,color:AX.gray900,marginBottom:10}}>🎬 Introductietoolbox Argex (20 min)</div>
                {["Argex-site overzicht: gevaarlijke zones en signalisatie","PBM's verplicht per zone op onze site","Groeve, ovens en machines — de 3 grote risico's","LOTO procedure bij onderhoud","Stofblootstelling: gevaren en bescherming","Melden van incidenten via Argex Safety"].map((p,i)=>(
                  <div key={i} style={{fontSize:13,color:AX.gray700,paddingBottom:5,borderBottom:i<5?`1px solid ${AX.gray100}`:"none"}}>{i+1}. {p}</div>
                ))}
                <div style={{background:AX.clayLight,borderRadius:7,padding:"9px 12px",marginTop:10,fontSize:12,color:AX.clayDark}}>
                  ✅ Echte app: video + voortgang + digitale handtekening vereist.
                </div>
              </div>
              <Btn onClick={bevestig}>✍ Toolbox gevolgd & ondertekend</Btn>
            </div>
          )}

          {h.id==="quiz" && !quizDone && (
            <div>
              {QUIZ.map((q,i)=>(
                <div key={i} style={{marginBottom:18}}>
                  <div style={{fontSize:13,fontWeight:700,color:AX.gray900,marginBottom:8}}>{i+1}. {q.v}</div>
                  <div style={{display:"flex",flexDirection:"column",gap:6}}>
                    {q.opts.map((o,j)=>(
                      <div key={j} onClick={()=>setQuizAntw(p=>({...p,[i]:j}))}
                        style={{padding:"9px 13px",borderRadius:7,cursor:"pointer",fontSize:13,transition:"all .15s",background:quizAntw[i]===j?AX.clayLight:AX.gray50,border:`1.5px solid ${quizAntw[i]===j?AX.clay:AX.gray300}`,color:quizAntw[i]===j?AX.clayDark:AX.gray700,fontWeight:quizAntw[i]===j?700:400}}>
                        {["A","B","C","D"][j]}. {o}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <Btn onClick={()=>setQuizDone(true)} disabled={Object.keys(quizAntw).length<QUIZ.length}>📊 Resultaat bekijken</Btn>
            </div>
          )}

          {h.id==="quiz" && quizDone && (
            <div style={{textAlign:"center",padding:"12px 0"}}>
              <div className="clay-float" style={{display:"inline-block",marginBottom:12}}><ArgexLogo size={64}/></div>
              <div style={{fontFamily:"'Work Sans',sans-serif",fontSize:26,fontWeight:900,color:score>=4?AX.clay:AX.amber,marginBottom:8}}>{score}/5 correct</div>
              <div style={{fontSize:14,color:AX.gray500,marginBottom:20}}>
                {score===5?"Uitstekend! Je kent de Argex veiligheidsregels perfect.":score>=3?"Goed resultaat! Welkom bij het Argex-team!":"Bekijk het noodplan en de huisregels nog eens aandachtig."}
              </div>
              {score>=3
                ? <Btn onClick={onComplete}>🚀 Aan de slag bij Argex! →</Btn>
                : <Btn variant="ghost" onClick={()=>{setQuizDone(false);setQuizAntw({});}}>🔄 Quiz opnieuw</Btn>}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

// ─── DASHBOARD ─────────────────────────────────────────────────────────────────
function Dashboard({ user, setTab }) {
  const isLead = user.role==="leidinggevende"||user.role==="admin";
  const openToolboxen = TOOLBOXEN_DATA.filter(t=>t.verplicht&&!t.gevolgd).length;
  const mijnVerlopen = MIJN_OPL.filter(o=>o.status!=="ok").length;
  const snelLinks = [
    {ico:"🩺",lbl:"EHBO & Contacten",tab:"contacten"},
    {ico:"🚨",lbl:"Noodplan",tab:"noodplan"},
    {ico:"📚",lbl:"Procedures",tab:"bibliotheek"},
    {ico:"⚠️",lbl:"Incident melden",tab:"incidenten"},
  ];
  return (
    <div className="fu">
      {/* Header kaart */}
      <div style={{background:`linear-gradient(135deg,${AX.clayDeep},${AX.clay})`,borderRadius:14,padding:"20px 20px",marginBottom:20,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",right:-10,top:-10,opacity:0.12}}><ClayBall size={120} opacity={1}/></div>
        <div style={{position:"absolute",right:60,bottom:-20,opacity:0.08}}><ClayBall size={80} opacity={1}/></div>
        <div style={{display:"flex",alignItems:"center",gap:14,position:"relative"}}>
          <div className="clay-float"><ArgexLogo size={48}/></div>
          <div>
            <div style={{fontFamily:"'Work Sans',sans-serif",fontSize:17,fontWeight:900,color:AX.white}}>Welkom, {user.name.split(" ")[0]}!</div>
            <div style={{fontSize:13,color:"rgba(255,255,255,0.7)",marginTop:2}}>🏭 Argex · Burcht / Zwijndrecht</div>
            <div style={{fontSize:12,color:"rgba(255,255,255,0.6)",marginTop:1}}>{user.functie} · {user.afdeling}</div>
            {openToolboxen>0 && <div style={{fontSize:12,color:"#FFD700",fontWeight:700,marginTop:6}}>⚠ {openToolboxen} verplichte toolbox(en) te volgen!</div>}
          </div>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10,marginBottom:22}}>
        {[
          {v:openToolboxen, l:"Toolboxen te doen",    c:openToolboxen>0?AX.red:AX.green, ico:"🎬"},
          {v:MIJN_OPL.filter(o=>o.status==="ok").length, l:"Certs geldig",c:AX.green, ico:"✅"},
          {v:mijnVerlopen,  l:"Certs vervallen",       c:mijnVerlopen>0?AX.amber:AX.green, ico:"⚠"},
          {v:MOCK_MELDINGEN.filter(m=>m.status!=="afgehandeld").length, l:"Open incidenten", c:AX.clay, ico:"⚠️"},
        ].map(s=>(
          <Card key={s.l} style={{borderLeft:`4px solid ${s.c}`}}>
            <div style={{fontSize:11,color:AX.gray500,marginBottom:4}}>{s.ico} {s.l}</div>
            <div style={{fontSize:28,fontWeight:900,color:s.c,fontFamily:"'Work Sans',sans-serif"}}>{s.v}</div>
          </Card>
        ))}
      </div>

      <div style={{fontSize:11,fontWeight:700,color:AX.gray500,letterSpacing:".08em",textTransform:"uppercase",marginBottom:10}}>Snelle toegang</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8,marginBottom:22}}>
        {snelLinks.map(({ico,lbl,tab})=>(
          <Card key={lbl} className="rh" onClick={()=>setTab(tab)} style={{display:"flex",alignItems:"center",gap:12,padding:"13px 16px",cursor:"pointer"}}>
            <div style={{width:34,height:34,borderRadius:8,background:AX.clayLight,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17}}>{ico}</div>
            <span style={{fontSize:13,fontWeight:700,color:AX.gray800}}>{lbl}</span>
            <span style={{marginLeft:"auto",color:AX.gray300,fontSize:14}}>→</span>
          </Card>
        ))}
      </div>

      {isLead && (
        <>
          <div style={{fontSize:11,fontWeight:700,color:AX.gray500,letterSpacing:".08em",textTransform:"uppercase",marginBottom:10}}>Open incidenten</div>
          <Card style={{marginBottom:16}}>
            {MOCK_MELDINGEN.filter(m=>m.status!=="afgehandeld").length===0
              ? <div style={{textAlign:"center",padding:12,color:AX.green,fontWeight:700}}>✅ Geen open incidenten!</div>
              : MOCK_MELDINGEN.filter(m=>m.status!=="afgehandeld").map(m=>{
                  const t=INCIDENT_TYPES.find(x=>x.id===m.type);
                  return (<div key={m.id} style={{display:"flex",gap:12,alignItems:"center",padding:"10px 0",borderBottom:`1px solid ${AX.gray100}`}}>
                    <div style={{width:34,height:34,borderRadius:8,background:t.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,flexShrink:0}}>{t.ico}</div>
                    <div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:AX.gray900}}>{m.titel}</div><div style={{fontSize:11,color:AX.gray500}}>{m.datum} · {m.locatie}</div></div>
                    <Tag label={m.status} color={AX.amber}/>
                  </div>);
                })
            }
          </Card>
          <div style={{fontSize:11,fontWeight:700,color:AX.gray500,letterSpacing:".08em",textTransform:"uppercase",marginBottom:10}}>Team certificaten</div>
          <Card>
            {TEAM.map(m=>{
              const nok=m.opleidingen.filter(o=>!o.ok);
              if(!nok.length) return null;
              return (<div key={m.id} style={{marginBottom:10,paddingBottom:10,borderBottom:`1px solid ${AX.gray100}`}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:5}}><Av i={m.avatar} s={26} c={AX.amber}/><span style={{fontSize:13,fontWeight:700,color:AX.gray900}}>{m.name}</span></div>
                {nok.map(o=><div key={o.naam} style={{marginLeft:34,fontSize:12,color:AX.red,marginBottom:2}}>⚠ {o.naam} — verval: {o.verval}</div>)}
              </div>);
            })}
          </Card>
        </>
      )}
    </div>
  );
}

// ─── BIBLIOTHEEK ──────────────────────────────────────────────────────────────
function Bibliotheek() {
  const [actieveCat,setActieveCat]=useState("Alles");
  const [zoek,setZoek]=useState("");
  const [geselecteerd,setGeselecteerd]=useState(null);
  const CATS=["Alles","Procedures","VIK","WIK","Handleidingen"];
  const CAT_ICONS={"Procedures":"📋","Handleidingen":"📖","VIK":"🛡","WIK":"🔧"};

  const gefilterd=PROCEDURES.filter(d=>{
    if(actieveCat!=="Alles"&&d.cat!==actieveCat) return false;
    if(zoek&&!d.titel.toLowerCase().includes(zoek.toLowerCase())&&!d.tags.some(t=>t.toLowerCase().includes(zoek.toLowerCase()))) return false;
    return true;
  });

  if(geselecteerd) {
    const d=PROCEDURES.find(x=>x.id===geselecteerd);
    return (
      <div className="fu">
        <button onClick={()=>setGeselecteerd(null)} style={{background:"transparent",border:`1px solid ${AX.gray300}`,color:AX.gray700,padding:"7px 13px",borderRadius:7,cursor:"pointer",fontSize:13,fontFamily:"inherit",marginBottom:20}}>← Terug</button>
        <Card>
          <div style={{display:"flex",gap:14,alignItems:"flex-start",marginBottom:18,paddingBottom:16,borderBottom:`1px solid ${AX.gray100}`}}>
            <div style={{width:52,height:52,borderRadius:12,background:AX.clayLight,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,flexShrink:0}}>{CAT_ICONS[d.cat]}</div>
            <div style={{flex:1}}>
              <Tag label={d.cat}/>
              <div style={{fontFamily:"'Work Sans',sans-serif",fontSize:17,fontWeight:800,color:AX.gray900,marginTop:6,marginBottom:4}}>{d.titel}</div>
              <div style={{display:"flex",gap:10,fontSize:12,color:AX.gray500,flexWrap:"wrap"}}>
                <span>Versie: <strong>{d.versie}</strong></span><span>Datum: <strong>{d.datum}</strong></span><span>Auteur: <strong>{d.auteur}</strong></span>
              </div>
            </div>
          </div>
          {/* Locatie + frequentie */}
          {(d.locatie||d.frequentie)&&<div style={{display:"flex",gap:6,marginBottom:12,flexWrap:"wrap"}}>
            {d.locatie&&<div style={{background:AX.clayLight,borderRadius:6,padding:"4px 10px",fontSize:11,fontWeight:700,color:AX.clayDark}}>📍 {d.locatie}</div>}
            {d.frequentie&&<div style={{background:AX.greenLight,borderRadius:6,padding:"4px 10px",fontSize:11,fontWeight:700,color:AX.green}}>🔄 {d.frequentie}</div>}
          </div>}
          <div style={{fontSize:14,color:AX.gray700,lineHeight:1.7,marginBottom:16}}>{d.beschrijving}</div>
          <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:16}}>{d.tags.map(t=><Tag key={t} label={t} color={AX.earth}/>)}</div>

          {/* Risico's */}
          {d.risicos&&<div style={{background:"#FFF8EE",borderRadius:9,padding:14,marginBottom:14,border:`1px solid ${AX.amber}44`}}>
            <div style={{fontSize:12,fontWeight:700,color:AX.amber,textTransform:"uppercase",letterSpacing:".08em",marginBottom:8}}>⚠️ Risico's</div>
            {d.risicos.map((r,i)=><div key={i} style={{display:"flex",gap:8,fontSize:13,color:AX.gray700,padding:"5px 0",borderBottom:i<d.risicos.length-1?`1px solid ${AX.gray100}`:"none"}}>
              <span style={{color:AX.amber,flexShrink:0,fontWeight:700}}>▲</span>{r}
            </div>)}
          </div>}

          {/* Stap-voor-stap */}
          {d.stappen&&<div style={{marginBottom:16}}>
            <div style={{fontSize:12,fontWeight:700,color:AX.gray500,textTransform:"uppercase",letterSpacing:".08em",marginBottom:10}}>📋 Stap-voor-stap uitvoering</div>
            {d.stappen.map((s,i)=>(
              <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom:8}}>
                <div style={{width:24,height:24,borderRadius:"50%",background:AX.clay,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,color:"#fff",flexShrink:0,marginTop:2}}>{i+1}</div>
                <div style={{fontSize:13,color:AX.gray700,lineHeight:1.6,paddingBottom:8,borderBottom:i<d.stappen.length-1?`1px solid ${AX.gray100}`:"none",flex:1}}>{s}</div>
              </div>
            ))}
          </div>}

          {/* Kernpunten */}
          {d.kernpunten&&<div style={{marginBottom:16}}>
            <div style={{fontSize:12,fontWeight:700,color:AX.gray500,textTransform:"uppercase",letterSpacing:".08em",marginBottom:10}}>✅ Kernpunten</div>
            {d.kernpunten.map((k,i)=><div key={i} style={{display:"flex",gap:10,padding:"7px 0",borderBottom:`1px solid ${AX.gray100}`,fontSize:13,color:AX.gray700}}><span style={{color:AX.clay,fontWeight:700,flexShrink:0}}>✓</span>{k}</div>)}
          </div>}

          {/* Verboden */}
          {d.verboden&&<div style={{background:AX.redLight,borderRadius:9,padding:14,marginBottom:14,border:`1px solid ${AX.red}33`}}>
            <div style={{fontSize:12,fontWeight:700,color:AX.red,textTransform:"uppercase",letterSpacing:".08em",marginBottom:8}}>🚫 Verboden handelingen</div>
            {d.verboden.map((v,i)=><div key={i} style={{fontSize:13,color:AX.red,padding:"5px 0",borderBottom:i<d.verboden.length-1?`1px solid #fdd`:""}}> ✗ {v}</div>)}
          </div>}

          {/* PBM's */}
          {d.pbm&&<div style={{background:AX.clayLight,borderRadius:9,padding:14,border:`1px solid ${AX.clay}33`,marginBottom:14}}>
            <div style={{fontSize:12,fontWeight:700,color:AX.clayDark,textTransform:"uppercase",letterSpacing:".08em",marginBottom:8}}>🦺 Verplichte PBM's</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:6}}>{d.pbm.map(p=><Tag key={p} label={p} color={AX.clayDark}/>)}</div>
          </div>}

          <div style={{background:AX.sand,borderRadius:9,padding:"10px 14px",fontSize:12,color:AX.earth,border:`1px solid ${AX.earth}33`}}>
            📋 {d.auteur} · Argex NV · Burcht/Zwijndrecht
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="fu">
      <SectionHead sub={`${PROCEDURES.length} documenten — procedures, VIK's en handleidingen`}>Documentenbibliotheek</SectionHead>
      <div style={{background:AX.sand,borderRadius:10,padding:"12px 16px",marginBottom:18,border:`1px solid ${AX.earth}33`,fontSize:13,color:AX.earth}}>
        📋 Klik op een document voor de volledige procedure, verboden handelingen en verplichte PBM's. Stuur daarna de aangepaste bestanden door en ik verwerk ze in de app.
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8,marginBottom:18}}>
        {CATS.filter(c=>c!=="Alles").map(c=>(
          <Card key={c} className="rh" onClick={()=>setActieveCat(actieveCat===c?"Alles":c)} style={{padding:"12px 16px",borderLeft:`4px solid ${actieveCat===c?AX.clay:AX.gray300}`,background:actieveCat===c?AX.clayLight:AX.white}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:20}}>{CAT_ICONS[c]}</span>
              <div>
                <div style={{fontSize:13,fontWeight:700,color:actieveCat===c?AX.clayDark:AX.gray900}}>{c}</div>
                <div style={{fontSize:11,color:AX.gray500}}>{PROCEDURES.filter(d=>d.cat===c).length} documenten</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div style={{position:"relative",marginBottom:16}}>
        <span style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",color:AX.gray400,fontSize:14}}>🔍</span>
        <input value={zoek} onChange={e=>setZoek(e.target.value)} placeholder="Zoek op titel of trefwoord…" style={{width:"100%",border:`1.5px solid ${AX.gray300}`,borderRadius:8,padding:"10px 12px 10px 36px",color:AX.gray900,fontSize:13,fontFamily:"inherit"}}/>
      </div>
      {gefilterd.map(d=>(
        <Card key={d.id} className="rh" onClick={()=>setGeselecteerd(d.id)} style={{padding:"13px 16px",marginBottom:7}}>
          <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
            <div style={{width:38,height:38,borderRadius:8,background:AX.clayLight,display:"flex",alignItems:"center",justifyContent:"center",fontSize:19,flexShrink:0}}>{CAT_ICONS[d.cat]}</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:8,flexWrap:"wrap",marginBottom:3}}>
                <div style={{fontSize:14,fontWeight:700,color:AX.gray900,flex:1}}>{d.titel}</div>
                <Tag label={d.cat}/>
              </div>
              <div style={{fontSize:11,color:AX.gray500,marginBottom:5}}>{d.versie} · {d.datum} · {d.auteur}</div>
              <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>{d.tags.slice(0,4).map(t=><Tag key={t} label={t} color={AX.earth}/>)}</div>
            </div>
            <span style={{color:AX.gray300,fontSize:14,flexShrink:0}}>→</span>
          </div>
        </Card>
      ))}
    </div>
  );
}

// ─── TOOLBOXEN ─────────────────────────────────────────────────────────────────
function Toolboxen() {
  const [toolboxen,setToolboxen]=useState(TOOLBOXEN_DATA);
  const [actief,setActief]=useState(null);
  const [signing,setSigning]=useState(false);
  const [signNaam,setSignNaam]=useState("");
  const teken=(id)=>{setToolboxen(p=>p.map(t=>t.id===id?{...t,gevolgd:true,datum:new Date().toLocaleDateString("nl-BE")}:t));setSigning(false);setActief(null);setSignNaam("");};

  if(actief){
    const t=toolboxen.find(x=>x.id===actief);
    return (
      <div className="fu">
        <button onClick={()=>setActief(null)} style={{background:"transparent",border:`1px solid ${AX.gray300}`,color:AX.gray700,padding:"7px 13px",borderRadius:7,cursor:"pointer",fontSize:13,fontFamily:"inherit",marginBottom:20}}>← Terug</button>
        <SectionHead>{t.titel}</SectionHead>
        <Card>
          <div style={{display:"flex",gap:7,marginBottom:14,flexWrap:"wrap"}}>
            <Tag label={t.cat}/><Tag label={t.duur} color={AX.gray500}/>{t.verplicht&&<Tag label="Verplicht" color={AX.red}/>}
          </div>
          <div style={{background:AX.gray50,borderRadius:9,padding:14,marginBottom:14,border:`1px solid ${AX.gray100}`}}>
            <div style={{fontWeight:800,color:AX.gray900,marginBottom:10}}>🎬 {t.titel} ({t.duur})</div>
            {(t.inhoud||[]).map((p,i)=>(
              <div key={i} style={{display:"flex",gap:10,fontSize:13,color:AX.gray700,paddingBottom:7,paddingTop:i>0?7:0,borderBottom:i<(t.inhoud.length-1)?`1px solid ${AX.gray100}`:"none"}}>
                <span style={{color:AX.clay,fontWeight:700,flexShrink:0}}>{i+1}.</span>{p}
              </div>
            ))}
            <div style={{background:AX.clayLight,borderRadius:7,padding:"9px 12px",fontSize:12,color:AX.clayDark,marginTop:12}}>
              ✅ Echte app: voortgang bijhouden + digitale handtekening vereist.
            </div>
          </div>
          {!t.gevolgd&&!signing&&<Btn onClick={()=>setSigning(true)}>✍ Toolbox ondertekenen</Btn>}
          {t.gevolgd&&<div style={{color:AX.green,fontWeight:700,fontSize:14}}>✅ Gevolgd op {t.datum}</div>}
          {signing&&<div style={{marginTop:14,borderTop:`1px solid ${AX.gray100}`,paddingTop:14}}>
            <div style={{fontSize:13,color:AX.gray500,marginBottom:8}}>Typ je naam als digitale handtekening:</div>
            <input value={signNaam} onChange={e=>setSignNaam(e.target.value)} placeholder="Volledige naam" style={{width:"100%",border:`1.5px solid ${AX.gray300}`,borderRadius:7,padding:"10px 13px",color:AX.gray900,fontSize:13,fontFamily:"inherit",marginBottom:10}}/>
            <div style={{display:"flex",gap:8}}><Btn onClick={()=>teken(t.id)} disabled={signNaam.trim().length<3}>✅ Bevestigen</Btn><Btn variant="ghost" onClick={()=>setSigning(false)}>Annuleren</Btn></div>
          </div>}
        </Card>
      </div>
    );
  }

  return (
    <div className="fu">
      <SectionHead sub={`${toolboxen.filter(t=>t.gevolgd).length}/${toolboxen.length} gevolgd`}>Toolboxen</SectionHead>
      {toolboxen.filter(t=>t.verplicht&&!t.gevolgd).length>0&&(
        <div style={{background:AX.redLight,border:`1px solid ${AX.red}33`,borderRadius:10,padding:"11px 16px",marginBottom:16,fontSize:13,color:AX.red,fontWeight:700}}>
          ⚠ Nog {toolboxen.filter(t=>t.verplicht&&!t.gevolgd).length} verplichte toolbox(en) te volgen!
        </div>
      )}
      {[["⚠ Verplicht — te volgen",toolboxen.filter(t=>t.verplicht&&!t.gevolgd),AX.red],["✅ Gevolgd",toolboxen.filter(t=>t.gevolgd),AX.green],["📚 Optioneel",toolboxen.filter(t=>!t.verplicht&&!t.gevolgd),AX.gray500]].map(([tit,lijst,klr])=>lijst.length>0&&(
        <div key={tit} style={{marginBottom:20}}>
          <div style={{fontSize:11,fontWeight:700,color:AX.gray500,letterSpacing:".08em",textTransform:"uppercase",marginBottom:8}}>{tit}</div>
          {lijst.map(t=>(
            <Card key={t.id} className="rh" onClick={()=>setActief(t.id)} style={{marginBottom:7,display:"flex",justifyContent:"space-between",alignItems:"center",padding:"13px 16px"}}>
              <div>
                <div style={{fontSize:14,fontWeight:700,color:AX.gray900,marginBottom:4}}>{t.titel}</div>
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}><Tag label={t.cat}/><Tag label={t.duur} color={AX.gray500}/>{t.datum&&<span style={{fontSize:11,color:AX.green,fontWeight:700}}>✓ {t.datum}</span>}</div>
              </div>
              <span style={{color:klr,fontSize:18}}>{t.gevolgd?"✅":t.verplicht?"⚠":"→"}</span>
            </Card>
          ))}
        </div>
      ))}
    </div>
  );
}

// ─── OPLEIDINGEN ──────────────────────────────────────────────────────────────
function Opleidingen({ user }) {
  const isLead=user.role==="leidinggevende"||user.role==="admin";
  const [sel,setSel]=useState(null);
  const klr=s=>({ok:AX.green,binnenkort:AX.amber,verlopen:AX.red}[s]);
  const lbl=s=>({ok:"Geldig",binnenkort:"Binnenkort",verlopen:"Verlopen"}[s]);
  return (
    <div className="fu">
      <SectionHead>{isLead?"Opleidingen & Certificaten":"Mijn Opleidingen"}</SectionHead>
      <div style={{display:"flex",gap:8,marginBottom:14}}>
        {["ok","binnenkort","verlopen"].map(s=>(
          <Card key={s} style={{flex:1,textAlign:"center",borderTop:`3px solid ${klr(s)}`}}>
            <div style={{fontSize:22,fontWeight:900,color:klr(s),fontFamily:"'Work Sans',sans-serif"}}>{MIJN_OPL.filter(o=>o.status===s).length}</div>
            <div style={{fontSize:11,color:AX.gray500}}>{lbl(s)}</div>
          </Card>
        ))}
      </div>
      {MIJN_OPL.map(o=>(
        <Card key={o.naam} style={{marginBottom:7,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div><div style={{fontSize:14,fontWeight:700,color:AX.gray900,marginBottom:3}}>{o.naam}</div><div style={{fontSize:12,color:AX.gray500}}>Behaald: {o.datum} · Geldig tot: <span style={{color:klr(o.status),fontWeight:700}}>{o.verval}</span></div></div>
          <Tag label={lbl(o.status)} color={klr(o.status)}/>
        </Card>
      ))}
      <Card style={{background:AX.clayLight,border:`1px solid ${AX.clay}33`,marginBottom:22}}>
        <div style={{fontSize:12,color:AX.clayDark}}>💡 Verlopen certificaat? Meld dit aan je leidinggevende voor herinschrijving.</div>
      </Card>
      {isLead&&(
        <>
          <div style={{fontSize:11,fontWeight:700,color:AX.gray500,letterSpacing:".08em",textTransform:"uppercase",marginBottom:10}}>Team certificaten</div>
          {TEAM.map(m=>(
            <Card key={m.id} className="rh" onClick={()=>setSel(sel===m.id?null:m.id)} style={{marginBottom:8}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:sel===m.id?10:0}}>
                <div style={{display:"flex",gap:10,alignItems:"center"}}>
                  <Av i={m.avatar} s={38} c={m.opleidingen.some(o=>!o.ok)?AX.amber:AX.green}/>
                  <div><div style={{fontSize:14,fontWeight:700,color:AX.gray900}}>{m.name}</div><div style={{fontSize:12,color:AX.gray500}}>{m.functie} · {m.afdeling}</div></div>
                </div>
                <div style={{display:"flex",gap:8,alignItems:"center"}}>
                  {m.opleidingen.some(o=>!o.ok)&&<Tag label={`${m.opleidingen.filter(o=>!o.ok).length} verlopen`} color={AX.red}/>}
                  <span style={{color:AX.gray300,fontSize:13}}>{sel===m.id?"▲":"▼"}</span>
                </div>
              </div>
              {sel===m.id&&<div style={{borderTop:`1px solid ${AX.gray100}`,paddingTop:10}}>
                {m.opleidingen.map(o=>(
                  <div key={o.naam} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:`1px solid ${AX.gray100}`}}>
                    <div><div style={{fontSize:13,color:AX.gray900}}>{o.naam}</div><div style={{fontSize:11,color:AX.gray500}}>Geldig tot {o.verval}</div></div>
                    <Tag label={o.ok?"Geldig":"Verlopen"} color={o.ok?AX.green:AX.red}/>
                  </div>
                ))}
              </div>}
            </Card>
          ))}
        </>
      )}
    </div>
  );
}

// ─── NOODPLAN ─────────────────────────────────────────────────────────────────
function Noodplan() {
  const [actief,setActief]=useState(null);
  const sc=actief?NOODSCENARIOS.find(s=>s.id===actief):null;
  if(sc) return (
    <div className="fu">
      <button onClick={()=>setActief(null)} style={{background:"transparent",border:`1px solid ${AX.gray300}`,color:AX.gray700,padding:"7px 13px",borderRadius:7,cursor:"pointer",fontSize:13,fontFamily:"inherit",marginBottom:20}}>← Terug</button>
      <div style={{background:sc.bg,border:`1px solid ${sc.kleur}33`,borderRadius:12,padding:"16px 18px",marginBottom:18,display:"flex",alignItems:"center",gap:12}}>
        <div style={{fontSize:36}}>{sc.ico}</div>
        <div><div style={{fontFamily:"'Work Sans',sans-serif",fontSize:20,fontWeight:800,color:AX.gray900}}>{sc.label}</div><div style={{fontSize:13,color:AX.gray500}}>Volg de stappen in volgorde op</div></div>
      </div>
      <div style={{display:"flex",gap:10,marginBottom:16}}>
        {[["112","Hulpdiensten",AX.red],[NOODPLAN_INTERN,"Intern noodnum.",AX.clay]].map(([n,l,c])=>(
          <div key={n} style={{flex:1,background:c+"12",border:`2px solid ${c}33`,borderRadius:10,padding:"10px 14px",textAlign:"center"}}>
            <div style={{fontSize:11,fontWeight:700,color:c,textTransform:"uppercase"}}>{l}</div>
            <div style={{fontSize:28,fontWeight:900,color:c,fontFamily:"'Work Sans',sans-serif"}}>{n}</div>
          </div>
        ))}
      </div>
      {sc.stappen.map((s,i)=>(
        <div key={s.nr} style={{display:"flex",gap:0,alignItems:"stretch",marginBottom:8}}>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",marginRight:12}}>
            <div style={{width:36,height:36,borderRadius:"50%",background:sc.kleur,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:800,color:"#fff",flexShrink:0}}>{s.nr}</div>
            {i<sc.stappen.length-1&&<div style={{width:2,flex:1,background:sc.kleur+"33",marginTop:4}}/>}
          </div>
          <Card style={{flex:1,padding:"12px 14px",marginBottom:0,display:"flex",gap:10,alignItems:"flex-start"}}>
            <span style={{fontSize:20,flexShrink:0}}>{s.ico}</span>
            <div><div style={{fontSize:13,fontWeight:700,color:AX.gray900,marginBottom:2}}>{s.tit}</div><div style={{fontSize:12,color:AX.gray500,lineHeight:1.6}}>{s.txt}</div></div>
          </Card>
        </div>
      ))}
    </div>
  );
  return (
    <div className="fu">
      <SectionHead sub="Klik op een scenario voor de stap-voor-stap procedure">Noodplan & Evacuatie</SectionHead>
      <div style={{display:"flex",gap:10,marginBottom:18}}>
        {[["112","Hulpdiensten",AX.red],[NOODPLAN_INTERN,"Intern noodnum.",AX.clay]].map(([n,l,c])=>(
          <Card key={n} style={{flex:1,textAlign:"center",borderTop:`4px solid ${c}`}}>
            <div style={{fontSize:11,fontWeight:700,color:c,textTransform:"uppercase"}}>{l}</div>
            <div style={{fontSize:34,fontWeight:900,color:c,fontFamily:"'Work Sans',sans-serif"}}>{n}</div>
          </Card>
        ))}
      </div>
      <div style={{background:AX.clayLight,borderRadius:10,padding:"10px 16px",marginBottom:18,fontSize:13,color:AX.clayDark,fontWeight:600}}>
        📍 Verzamelplaats: {VERZAMELPLAATS}
      </div>
      <div style={{background:AX.sand,borderRadius:10,padding:"10px 16px",marginBottom:16,fontSize:12,color:AX.earth,border:`1px solid ${AX.earth}33`}}>
        📋 Noodplan Argex — Burcht/Zwijndrecht · Preventieadviseur: Bert Verbraecken
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10,marginBottom:20}}>
        {NOODSCENARIOS.map(s=>(
          <Card key={s.id} className="rh" onClick={()=>setActief(s.id)} style={{padding:"14px 16px",borderLeft:`4px solid ${s.kleur}`,cursor:"pointer"}}>
            <div style={{fontSize:28,marginBottom:6}}>{s.ico}</div>
            <div style={{fontSize:14,fontWeight:800,color:AX.gray900,marginBottom:2}}>{s.label}</div>
            <div style={{fontSize:11,color:s.kleur,fontWeight:700}}>{s.stappen.length} stappen →</div>
          </Card>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        <Card><div style={{fontSize:11,fontWeight:700,color:AX.gray500,marginBottom:8,textTransform:"uppercase",letterSpacing:".08em"}}>BHV Team</div>{BHV_TEAM.map(b=><div key={b} style={{fontSize:12,color:AX.gray700,marginBottom:4}}>🦺 {b}</div>)}</Card>
        <Card><div style={{fontSize:11,fontWeight:700,color:AX.gray500,marginBottom:8,textTransform:"uppercase",letterSpacing:".08em"}}>AED Locaties</div>{AED_LOCATIES.map(a=><div key={a} style={{fontSize:12,color:AX.gray700,marginBottom:4}}>❤️ {a}</div>)}</Card>
      </div>
    </div>
  );
}

// ─── CONTACTEN ─────────────────────────────────────────────────────────────────
function Contacten() {
  return (
    <div className="fu">
      <SectionHead sub="Jouw contactpersonen op de Argex site">EHBO & Contacten</SectionHead>

      {/* ── Noodnummers balk ── */}
      <div style={{display:"flex",gap:8,marginBottom:18}}>
        {[["112","Hulpdiensten",AX.red],["0497/51.50.95","Operator Argex",AX.clay],["03/250.15.15","Expeditie Argex",AX.clayDark]].map(([nr,lbl,c])=>(
          <div key={nr} style={{flex:1,background:c+"15",border:`2px solid ${c}33`,borderRadius:10,padding:"10px 8px",textAlign:"center"}}>
            <div style={{fontSize:10,fontWeight:700,color:c,textTransform:"uppercase",marginBottom:2}}>{lbl}</div>
            <div style={{fontSize:16,fontWeight:900,color:c,fontFamily:"'Work Sans',sans-serif"}}>{nr}</div>
          </div>
        ))}
      </div>

      {/* ── Liantis — Externe Preventiedienst ── */}
      <div style={{fontSize:11,fontWeight:700,color:AX.gray500,letterSpacing:".08em",textTransform:"uppercase",marginBottom:8}}>🏥 Externe Preventiedienst — Liantis</div>
      <Card style={{marginBottom:20,borderLeft:`4px solid ${AX.green}`}}>
        <div style={{display:"flex",gap:12,alignItems:"center",marginBottom:12,paddingBottom:12,borderBottom:`1px solid ${AX.gray100}`}}>
          <div style={{width:44,height:44,borderRadius:10,background:AX.green+"20",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>🏥</div>
          <div>
            <div style={{fontSize:14,fontWeight:800,color:AX.gray900}}>Liantis EDPBW</div>
            <div style={{fontSize:12,color:AX.green,fontWeight:600}}>Externe Dienst voor Preventie en Bescherming op het Werk</div>
            <div style={{fontSize:11,color:AX.gray500}}>Rijksweg 9, Puurs</div>
          </div>
        </div>
        {[
          {rol:"Contactpersoon", naam:"Charlotte Van Assche", tel:"+32 3 886 05 78", email:"charlotte.vanassche@liantis.be", init:"CV"},
          {rol:"Arbeidsarts", naam:"Dr. Brigitte Merkus", tel:"+32 3 886 05 78", email:"charlotte.vanassche@liantis.be", init:"BM"},
        ].map(p=>(
          <div key={p.naam} style={{display:"flex",gap:10,alignItems:"center",marginBottom:10}}>
            <div style={{width:36,height:36,borderRadius:"50%",background:AX.green+"22",border:`2px solid ${AX.green}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:AX.green,flexShrink:0}}>{p.init}</div>
            <div style={{flex:1}}>
              <div style={{fontSize:13,fontWeight:700,color:AX.gray900}}>{p.naam}</div>
              <div style={{fontSize:11,color:AX.green,fontWeight:600}}>{p.rol}</div>
              <div style={{fontSize:11,color:AX.gray500}}>📞 {p.tel} · ✉ {p.email}</div>
            </div>
          </div>
        ))}
        <div style={{background:AX.green+"12",borderRadius:7,padding:"8px 12px",fontSize:12,color:AX.green,fontWeight:600,marginTop:4}}>
          🗓 Medisch toezicht, preventieadvies, welzijn op het werk
        </div>
      </Card>

      {/* ── EHBO & Vertrouwenspersonen ── */}
      {[["EHBO'ers",EHBO_LEDEN],["Vertrouwenspersonen",VERTROUWENSPERSONEN]].map(([tit,lijst])=>(
        <div key={tit} style={{marginBottom:22}}>
          <div style={{fontSize:11,fontWeight:700,color:AX.gray500,letterSpacing:".08em",textTransform:"uppercase",marginBottom:10}}>{tit}</div>
          {lijst.map(p=>(
            <Card key={p.naam} style={{marginBottom:10}}>
              <div style={{display:"flex",gap:14,alignItems:"center"}}>
                <Av i={p.init} s={50} c={p.kleur}/>
                <div style={{flex:1}}>
                  <div style={{fontSize:15,fontWeight:700,color:AX.gray900}}>{p.naam}</div>
                  <Tag label={p.rol} color={p.kleur}/>
                  <div style={{fontSize:12,color:AX.gray500,marginTop:6,lineHeight:1.6}}>{p.desc}</div>
                  <div style={{display:"flex",gap:14,marginTop:8,flexWrap:"wrap"}}>
                    <a href={`tel:${p.tel}`} style={{fontSize:13,color:p.kleur,fontWeight:700,textDecoration:"none"}}>📞 {p.tel}</a>
                    <a href={`mailto:${p.email}`} style={{fontSize:13,color:AX.gray500,textDecoration:"none"}}>✉ {p.email}</a>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ))}
      <Card style={{background:AX.clayLight,border:`1px solid ${AX.clay}33`}}>
        <div style={{fontSize:12,color:AX.clayDark,lineHeight:1.7}}>🔒 <strong>Vertrouwelijk:</strong> Gesprekken met de vertrouwenspersoon zijn strikt vertrouwelijk. Anoniem via IDEWE: <strong>0800 30 801</strong> (gratis, 24/7).</div>
      </Card>
    </div>
  );
}

// ─── INCIDENTEN ────────────────────────────────────────────────────────────────
function Incidenten({ user }) {
  const [view,setView]=useState("lijst"); const [meldingen,setMeldingen]=useState(MOCK_MELDINGEN);
  const [detailId,setDetailId]=useState(null); const [filter,setFilter]=useState("alles");
  const leeg={type:"",ernst:"matig",datum:new Date().toISOString().split("T")[0],tijd:"",locatie:"",beschrijving:"",letsel:"",getuigen:"",directeActie:"",oorzaak:"",actie:"",verantwoordelijke:"",deadline:""};
  const [form,setForm]=useState(leeg); const [stap,setStap]=useState(0);
  const set=k=>v=>setForm(p=>({...p,[k]:v}));
  const isLead=user.role==="leidinggevende"||user.role==="admin";
  const ERNST=[{id:"laag",label:"Laag",kleur:AX.green},{id:"matig",label:"Matig",kleur:AX.amber},{id:"hoog",label:"Hoog",kleur:AX.red},{id:"kritiek",label:"Kritiek",kleur:"#7B1FA2"}];

  const verstuur=()=>{
    const nieuw={id:meldingen.length+1,...form,status:"gemeld",melder:user.name,titel:form.beschrijving.substring(0,45)+(form.beschrijving.length>45?"…":"")};
    setMeldingen(p=>[nieuw,...p]); setForm(leeg); setStap(0); setView("lijst");
  };

  if(view==="detail"&&detailId){
    const m=meldingen.find(x=>x.id===detailId); const t=INCIDENT_TYPES.find(x=>x.id===m.type);
    const SI=["gemeld","onderzoek","afgehandeld"]; const si=SI.indexOf(m.status);
    return (
      <div className="fu">
        <button onClick={()=>{setView("lijst");setDetailId(null);}} style={{background:"transparent",border:`1px solid ${AX.gray300}`,color:AX.gray700,padding:"7px 13px",borderRadius:7,cursor:"pointer",fontSize:13,fontFamily:"inherit",marginBottom:20}}>← Terug</button>
        <div style={{background:t.bg,border:`1px solid ${t.kleur}33`,borderRadius:12,padding:"16px 18px",marginBottom:14}}>
          <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
            <div style={{fontSize:32}}>{t.ico}</div>
            <div style={{flex:1}}><Tag label={t.label} color={t.kleur}/><div style={{fontFamily:"'Work Sans',sans-serif",fontSize:17,fontWeight:800,color:AX.gray900,marginTop:5,marginBottom:3}}>{m.titel}</div><div style={{fontSize:12,color:AX.gray500}}>{m.datum} · {m.locatie} · {m.melder}</div></div>
          </div>
        </div>
        <Card style={{marginBottom:12}}>
          <div style={{display:"flex",alignItems:"center",gap:0}}>
            {["Gemeld","In onderzoek","Afgehandeld"].map((s,i)=>(
              <div key={s} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                <div style={{display:"flex",alignItems:"center",width:"100%"}}>
                  {i>0&&<div style={{flex:1,height:3,background:i<=si?AX.clay:AX.gray100}}/>}
                  <div style={{width:26,height:26,borderRadius:"50%",background:i<=si?AX.clay:"#fff",border:`2.5px solid ${i<=si?AX.clay:AX.gray300}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:i<=si?AX.white:AX.gray400,fontWeight:800,flexShrink:0}}>{i<si?"✓":i+1}</div>
                  {i<2&&<div style={{flex:1,height:3,background:i<si?AX.clay:AX.gray100}}/>}
                </div>
                <span style={{fontSize:10,fontWeight:700,color:i<=si?AX.clay:AX.gray400,textTransform:"uppercase",textAlign:"center"}}>{s}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card style={{marginBottom:12}}>
          <div style={{fontSize:13,color:AX.gray800,lineHeight:1.7,marginBottom:12}}>{m.beschrijving}</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            {[["📍 Locatie",m.locatie],["📅 Datum",m.datum],["👤 Getuigen",m.getuigen||"—"],m.letsel&&["🩺 Letsel",m.letsel]].filter(Boolean).map(([l,v])=>(
              <div key={l} style={{background:AX.gray50,borderRadius:8,padding:"9px 12px"}}><div style={{fontSize:11,color:AX.gray500,marginBottom:2}}>{l}</div><div style={{fontSize:13,color:AX.gray900,fontWeight:700}}>{v}</div></div>
            ))}
          </div>
        </Card>
        <Card style={{marginBottom:12,borderLeft:`4px solid ${AX.clay}`}}>
          {[["🔍 Oorzaak",m.oorzaak||"—"],["✅ Direct actie",m.directeActie||"—"],["🔧 Corrigerende maatregel",m.actie||"—"]].map(([l,v])=>(
            <div key={l} style={{marginBottom:10}}><div style={{fontSize:11,color:AX.gray500,marginBottom:2}}>{l}</div><div style={{fontSize:13,color:AX.gray900}}>{v}</div></div>
          ))}
          <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
            {[["👤 Verantwoordelijke",m.verantwoordelijke||"—"],["📅 Deadline",m.deadline||"—"]].map(([l,v])=>(
              <div key={l} style={{background:AX.clayLight,borderRadius:7,padding:"9px 12px",flex:1}}><div style={{fontSize:11,color:AX.gray500,marginBottom:2}}>{l}</div><div style={{fontSize:13,fontWeight:700,color:AX.clayDark}}>{v}</div></div>
            ))}
          </div>
        </Card>
        {isLead&&m.status!=="afgehandeld"&&(
          <div style={{display:"flex",gap:8}}>
            {m.status==="gemeld"&&<Btn onClick={()=>setMeldingen(p=>p.map(x=>x.id===m.id?{...x,status:"onderzoek"}:x))}>🔍 In onderzoek</Btn>}
            {m.status==="onderzoek"&&<Btn onClick={()=>setMeldingen(p=>p.map(x=>x.id===m.id?{...x,status:"afgehandeld"}:x))}>✅ Afhandelen</Btn>}
          </div>
        )}
      </div>
    );
  }

  if(view==="nieuw") return (
    <div className="fu">
      <button onClick={()=>{setView("lijst");setStap(0);setForm(leeg);}} style={{background:"transparent",border:`1px solid ${AX.gray300}`,color:AX.gray700,padding:"7px 13px",borderRadius:7,cursor:"pointer",fontSize:13,fontFamily:"inherit",marginBottom:20}}>← Annuleren</button>
      <SectionHead sub="Vul zo volledig mogelijk in">Nieuwe melding</SectionHead>
      <div style={{display:"flex",gap:6,marginBottom:20}}>
        {["Type","Details","Analyse","Bevestig"].map((s,i)=>(
          <div key={s} style={{flex:1,padding:"7px 0",textAlign:"center",borderRadius:7,fontSize:11,fontWeight:700,background:stap===i?AX.clay:i<stap?AX.clayLight:"#fff",color:stap===i?AX.white:i<stap?AX.clayDark:AX.gray400,border:`1.5px solid ${stap===i?AX.clay:i<stap?AX.clay+"44":AX.gray200}`}}>{i<stap?"✓ ":""}{s}</div>
        ))}
      </div>
      {stap===0&&<Card>
        <div style={{fontFamily:"'Work Sans',sans-serif",fontSize:16,fontWeight:800,color:AX.gray900,marginBottom:14}}>Wat wil je melden?</div>
        {INCIDENT_TYPES.map(t=>(<div key={t.id} onClick={()=>set("type")(t.id)} style={{display:"flex",gap:14,alignItems:"center",padding:14,borderRadius:10,marginBottom:8,cursor:"pointer",background:form.type===t.id?t.bg:"#fafafa",border:`2px solid ${form.type===t.id?t.kleur:AX.gray200}`,transition:"all .15s"}}>
          <div style={{width:44,height:44,borderRadius:10,background:t.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}}>{t.ico}</div>
          <div style={{fontSize:14,fontWeight:700,color:AX.gray900}}>{t.label}</div>
          {form.type===t.id&&<div style={{marginLeft:"auto",width:22,height:22,borderRadius:"50%",background:t.kleur,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,color:"#fff"}}>✓</div>}
        </div>))}
        <div style={{marginTop:14}}><Btn onClick={()=>setStap(1)} disabled={!form.type}>Volgende →</Btn></div>
      </Card>}
      {stap===1&&<Card>
        <div style={{fontFamily:"'Work Sans',sans-serif",fontSize:16,fontWeight:800,color:AX.gray900,marginBottom:14}}>Wat is er gebeurd?</div>
        {form.type==="ongeval"&&<div style={{background:AX.redLight,border:`1px solid ${AX.red}33`,borderRadius:9,padding:"10px 14px",marginBottom:14,fontSize:13,color:AX.red,fontWeight:700}}>🚨 Bij ernstig letsel: bel direct <strong>112</strong> + intern <strong>{NOODPLAN_INTERN}</strong></div>}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 12px"}}><Inp label="Datum" type="date" value={form.datum} onChange={set("datum")}/><Inp label="Tijdstip" type="time" value={form.tijd} onChange={set("tijd")}/></div>
        <Inp label="Locatie / zone" value={form.locatie} onChange={set("locatie")} placeholder="bijv. Groeve sectie B, Oven 2, Transportband 3…"/>
        <Inp label="Beschrijving" value={form.beschrijving} onChange={set("beschrijving")} placeholder="Wat is er precies gebeurd?" rows={4}/>
        {form.type==="ongeval"&&<Inp label="Letsel" value={form.letsel} onChange={set("letsel")} placeholder="bijv. Brandwond linkerarm…"/>}
        <Inp label="Getuigen" value={form.getuigen} onChange={set("getuigen")} placeholder="Namen of 'geen getuigen'"/>
        <Inp label="Direct genomen actie" value={form.directeActie} onChange={set("directeActie")} placeholder="bijv. Noodstop ingedrukt, EHBO toegepast…"/>
        <div style={{display:"flex",gap:8}}><Btn variant="ghost" onClick={()=>setStap(0)}>← Terug</Btn><Btn onClick={()=>setStap(2)} disabled={!form.beschrijving||!form.locatie}>Volgende →</Btn></div>
      </Card>}
      {stap===2&&<Card>
        <div style={{fontFamily:"'Work Sans',sans-serif",fontSize:16,fontWeight:800,color:AX.gray900,marginBottom:14}}>Oorzaak & corrigerende actie</div>
        <div style={{marginBottom:14}}>
          <div style={{fontSize:11,fontWeight:700,color:AX.gray500,letterSpacing:".08em",textTransform:"uppercase",marginBottom:10}}>Ernst</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:7}}>
            {ERNST.map(e=>(<div key={e.id} onClick={()=>set("ernst")(e.id)} style={{padding:"10px 12px",borderRadius:8,cursor:"pointer",border:`2px solid ${form.ernst===e.id?e.kleur:AX.gray200}`,background:form.ernst===e.id?e.kleur+"15":"#fafafa",transition:"all .15s"}}>
              <div style={{fontSize:13,fontWeight:700,color:form.ernst===e.id?e.kleur:AX.gray700}}>{e.label}</div>
            </div>))}
          </div>
        </div>
        <Sel label="Oorzaak" value={form.oorzaak} onChange={set("oorzaak")} options={["Selecteer oorzaak...",...OORZAKEN]}/>
        <Inp label="Corrigerende maatregel" value={form.actie} onChange={set("actie")} placeholder="Wat moet er gebeuren?" rows={3}/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 12px"}}><Inp label="Verantwoordelijke" value={form.verantwoordelijke} onChange={set("verantwoordelijke")} placeholder="Naam…"/><Inp label="Deadline" type="date" value={form.deadline} onChange={set("deadline")}/></div>
        <div style={{display:"flex",gap:8}}><Btn variant="ghost" onClick={()=>setStap(1)}>← Terug</Btn><Btn onClick={()=>setStap(3)}>Controleren →</Btn></div>
      </Card>}
      {stap===3&&<Card>
        <div style={{fontFamily:"'Work Sans',sans-serif",fontSize:16,fontWeight:800,color:AX.gray900,marginBottom:14}}>Controleer je melding</div>
        {[["Type",INCIDENT_TYPES.find(x=>x.id===form.type)?.label],["Datum",form.datum],["Locatie",form.locatie],["Beschrijving",form.beschrijving],form.letsel&&["Letsel",form.letsel],["Oorzaak",form.oorzaak||"—"],["Corrigerende maatregel",form.actie||"—"],["Verantwoordelijke",form.verantwoordelijke||"—"],["Deadline",form.deadline||"—"]].filter(Boolean).map(([l,v])=>(
          <div key={l} style={{display:"flex",gap:10,padding:"7px 0",borderBottom:`1px solid ${AX.gray100}`,flexWrap:"wrap"}}><span style={{fontSize:12,color:AX.gray500,minWidth:130,flexShrink:0}}>{l}</span><span style={{fontSize:13,color:AX.gray900,fontWeight:700,flex:1}}>{v}</span></div>
        ))}
        <div style={{display:"flex",gap:8,marginTop:14}}><Btn variant="ghost" onClick={()=>setStap(2)}>← Aanpassen</Btn><Btn onClick={verstuur}>📤 Indienen</Btn></div>
      </Card>}
    </div>
  );

  const gefilterd=filter==="alles"?meldingen:meldingen.filter(m=>m.status===filter);
  return (
    <div className="fu">
      <SectionHead sub={`${meldingen.length} meldingen`} right={<Btn onClick={()=>{setStap(0);setForm(leeg);setView("nieuw");}}>+ Nieuwe melding</Btn>}>Incidenten</SectionHead>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:18}}>
        {[["gemeld","Gemeld",AX.amber],["onderzoek","In onderzoek",AX.blue],["afgehandeld","Afgehandeld",AX.green]].map(([s,l,c])=>(
          <Card key={s} style={{textAlign:"center",borderTop:`3px solid ${c}`,cursor:"pointer",background:filter===s?c+"10":AX.white}} onClick={()=>setFilter(filter===s?"alles":s)}>
            <div style={{fontSize:22,fontWeight:900,color:c,fontFamily:"'Work Sans',sans-serif"}}>{meldingen.filter(m=>m.status===s).length}</div>
            <div style={{fontSize:11,color:AX.gray500}}>{l}</div>
          </Card>
        ))}
      </div>
      {gefilterd.map(m=>{
        const t=INCIDENT_TYPES.find(x=>x.id===m.type);
        const sc={gemeld:AX.amber,onderzoek:AX.blue,afgehandeld:AX.green}[m.status];
        return (<Card key={m.id} className="rh" onClick={()=>{setDetailId(m.id);setView("detail");}} style={{marginBottom:8,padding:"13px 16px"}}>
          <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
            <div style={{width:40,height:40,borderRadius:9,background:t?.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{t?.ico}</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",justifyContent:"space-between",gap:8,flexWrap:"wrap",marginBottom:3}}>
                <div style={{fontSize:14,fontWeight:700,color:AX.gray900,flex:1}}>{m.titel}</div>
                <Tag label={m.status==="gemeld"?"Nieuw":m.status==="onderzoek"?"Onderzoek":"Afgehandeld"} color={sc}/>
              </div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}><span style={{fontSize:11,color:AX.gray500}}>📅 {m.datum}</span><span style={{fontSize:11,color:AX.gray500}}>📍 {m.locatie}</span></div>
            </div>
          </div>
        </Card>);
      })}
    </div>
  );
}

// ─── COMITÉ ────────────────────────────────────────────────────────────────────
function Comite() {
  const [open,setOpen]=useState(null);
  return (
    <div className="fu">
      <SectionHead sub="Openbaar voor alle medewerkers — CPBW verslagen Argex">CPBW Vergadering</SectionHead>
      <div style={{background:AX.sand,borderRadius:10,padding:"10px 16px",marginBottom:16,fontSize:12,color:AX.earth,border:`1px solid ${AX.earth}33`}}>
        📋 Verslagen CPBW Argex NV — Voorzitter: Dhr. Johny Bultheel · IDPBW: Bert Verbraecken
      </div>
      {COMITE.map(v=>(
        <Card key={v.id} className="rh" onClick={()=>setOpen(open===v.id?null:v.id)} style={{marginBottom:8}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:open===v.id?10:0}}>
            <div><div style={{fontSize:14,fontWeight:700,color:AX.gray900}}>{v.titel}</div><div style={{fontSize:12,color:AX.gray500,marginTop:2}}>📅 {v.datum}</div></div>
            <span style={{color:AX.gray400}}>{open===v.id?"▲":"▼"}</span>
          </div>
          {open===v.id&&<div style={{borderTop:`1px solid ${AX.gray100}`,paddingTop:10}}>{v.punten.map((p,i)=><div key={i} style={{fontSize:13,color:AX.gray700,padding:"6px 0",borderBottom:i<v.punten.length-1?`1px solid ${AX.gray100}`:"none",display:"flex",gap:8}}><span style={{color:AX.clay,fontWeight:700,flexShrink:0}}>{i+1}.</span>{p}</div>)}</div>}
        </Card>
      ))}
    </div>
  );
}

// ─── INSPECTIE ─────────────────────────────────────────────────────────────────
function Inspectie() {
  const ITEMS = [
    {cat:"Orde & netheid",      punt:"Gangpaden vrij van obstakels en spillage"},
    {cat:"Orde & netheid",      punt:"Kleikorrels niet op rijpaden (uitglijdrisico)"},
    {cat:"Groeve & terrein",    punt:"Veilige afstand tot groeverand gerespecteerd"},
    {cat:"Groeve & terrein",    punt:"Rijpaden bij groeve in goede staat"},
    {cat:"Ovens & installaties",punt:"Veiligheidskapjes ovens aanwezig en intact"},
    {cat:"Ovens & installaties",punt:"Minimumafstand 1,5m tot warme oppervlakken"},
    {cat:"Transportbanden",     punt:"Alle transportbanden hebben actieve beveiligingen"},
    {cat:"Transportbanden",     punt:"Noodstopknoppen zichtbaar en toegankelijk"},
    {cat:"PBM's & signalisatie",punt:"PBM's beschikbaar op werkposten"},
    {cat:"PBM's & signalisatie",punt:"Veiligheidsborden intact en zichtbaar"},
    {cat:"Brandveiligheid",     punt:"Brandblussers zichtbaar en vrij toegankelijk"},
    {cat:"Brandveiligheid",     punt:"Nooduitgangen niet geblokkeerd"},
    {cat:"Noodvoorzieningen",   punt:"AED aanwezig en batterijindicator groen"},
    {cat:"Noodvoorzieningen",   punt:"EHBO-kit volledig en niet vervallen"},
  ];
  const [its,setIts]=useState(ITEMS.map(i=>({...i,ok:null})));
  const [loc,setLoc]=useState(""); const [klaar,setKlaar]=useState(false);
  const toggle=(i,v)=>setIts(p=>p.map((x,j)=>j===i?{...x,ok:v}:x));
  const inv=its.filter(x=>x.ok!==null).length;
  const score=Math.round((its.filter(x=>x.ok===true).length/its.length)*100);
  const cats=[...new Set(its.map(i=>i.cat))];

  if(klaar) return (
    <div className="fu">
      <SectionHead>Inspectie Rapport</SectionHead>
      <Card style={{textAlign:"center",marginBottom:14,borderTop:`4px solid ${score>=80?AX.green:score>=50?AX.amber:AX.red}`}}>
        <div style={{fontSize:40,marginBottom:6}}>{score>=80?"✅":score>=50?"⚠":"🔴"}</div>
        <div style={{fontFamily:"'Work Sans',sans-serif",fontSize:28,fontWeight:900,color:score>=80?AX.green:score>=50?AX.amber:AX.red}}>{score}%</div>
        <div style={{fontSize:12,color:AX.gray500,marginTop:3}}>{loc||"Locatie niet opgegeven"} · {new Date().toLocaleDateString("nl-BE")} · Argex</div>
      </Card>
      {its.filter(x=>x.ok===false).length>0&&<Card style={{borderLeft:`4px solid ${AX.red}`,marginBottom:12}}><div style={{fontSize:13,fontWeight:700,color:AX.gray900,marginBottom:8}}>Verbeterpunten</div>{its.filter(x=>x.ok===false).map((x,i)=><div key={i} style={{fontSize:12,color:AX.red,padding:"5px 0",borderBottom:`1px solid ${AX.gray100}`}}>✗ {x.punt}</div>)}</Card>}
      <Btn onClick={()=>{setIts(ITEMS.map(i=>({...i,ok:null})));setKlaar(false);setLoc("");}}>+ Nieuwe inspectie</Btn>
    </div>
  );

  return (
    <div className="fu">
      <SectionHead sub="Werkplaatsinspectie uitvoeren">Werkplaatsinspectie</SectionHead>
      <input value={loc} onChange={e=>setLoc(e.target.value)} placeholder="Locatie / zone (bijv. Groeve sectie A, Oven hal, Transportband 2…)" style={{width:"100%",border:`1.5px solid ${AX.gray300}`,borderRadius:7,padding:"10px 13px",color:AX.gray900,fontSize:13,fontFamily:"inherit",marginBottom:14}}/>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:14,fontSize:12,color:AX.gray500}}>
        <span>{inv}/{its.length} ingevuld</span>
        <div style={{height:5,width:100,background:AX.gray100,borderRadius:3,overflow:"hidden",alignSelf:"center"}}>
          <div style={{height:"100%",width:`${(inv/its.length)*100}%`,background:AX.clay,transition:"width .3s"}}/>
        </div>
      </div>
      {cats.map(cat=>(
        <div key={cat} style={{marginBottom:14}}>
          <div style={{fontSize:11,fontWeight:700,color:AX.gray500,letterSpacing:".08em",textTransform:"uppercase",marginBottom:7}}>{cat}</div>
          {its.map((item,i)=>item.cat===cat&&(
            <Card key={i} style={{marginBottom:6,display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 14px",background:item.ok===true?AX.greenLight:item.ok===false?AX.redLight:AX.white,borderColor:item.ok===true?AX.green+"44":item.ok===false?AX.red+"44":AX.gray200}}>
              <div style={{fontSize:13,color:AX.gray800,flex:1,paddingRight:10}}>{item.punt}</div>
              <div style={{display:"flex",gap:5,flexShrink:0}}>
                {[true,false,null].map((v,j)=>(
                  <button key={j} onClick={()=>toggle(i,v)} style={{padding:"5px 10px",borderRadius:5,border:`1.5px solid ${item.ok===v?v===true?AX.green:v===false?AX.red:"#888":AX.gray200}`,cursor:"pointer",fontFamily:"inherit",fontSize:11,fontWeight:700,background:item.ok===v?v===true?AX.green:v===false?AX.red:"#888":"transparent",color:item.ok===v?"#fff":AX.gray500}}>
                    {v===true?"OK":v===false?"NOK":"—"}
                  </button>
                ))}
              </div>
            </Card>
          ))}
        </div>
      ))}
      <Btn onClick={()=>setKlaar(true)} disabled={inv<its.length}>📊 Rapport genereren</Btn>
      {inv<its.length&&<span style={{fontSize:12,color:AX.gray500,marginLeft:10}}>Vul alle punten in</span>}
    </div>
  );
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
const NAV=[
  {id:"dashboard",   ico:"⊞", lbl:"Home",      roles:["admin","leidinggevende","medewerker","aannemer"]},
  {id:"toolboxen",   ico:"🎬", lbl:"Toolboxen", roles:["admin","leidinggevende","medewerker","aannemer"]},
  {id:"opleidingen", ico:"🎓", lbl:"Opleiding", roles:["admin","leidinggevende","medewerker"]},
  {id:"bibliotheek", ico:"📚", lbl:"Procedures",roles:["admin","leidinggevende","medewerker","aannemer"]},
  {id:"contacten",   ico:"🩺", lbl:"EHBO",      roles:["admin","leidinggevende","medewerker","aannemer"]},
  {id:"noodplan",    ico:"🚨", lbl:"Noodplan",  roles:["admin","leidinggevende","medewerker","aannemer"]},
  {id:"incidenten",  ico:"⚠️", lbl:"Incident",  roles:["admin","leidinggevende","medewerker","aannemer"]},
  {id:"comite",      ico:"📋", lbl:"Comité",    roles:["admin","leidinggevende","medewerker"]},
  {id:"inspectie",   ico:"🔍", lbl:"Inspectie", roles:["admin","leidinggevende"]},
];
const ROLE_LABELS={admin:"Veiligheidscoördinator",leidinggevende:"Leidinggevende",medewerker:"Medewerker",aannemer:"Aannemer"};

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
function MainApp({ user, onLogout }) {
  const [tab,setTab]=useState("dashboard");
  const nav=NAV.filter(n=>n.roles.includes(user.role));
  const renderTab=()=>{
    switch(tab){
      case "dashboard":   return <Dashboard user={user} setTab={setTab}/>;
      case "toolboxen":   return <Toolboxen/>;
      case "opleidingen": return <Opleidingen user={user}/>;
      case "bibliotheek": return <Bibliotheek/>;
      case "contacten":   return <Contacten/>;
      case "noodplan":    return <Noodplan/>;
      case "incidenten":  return <Incidenten user={user}/>;
      case "comite":      return <Comite/>;
      case "inspectie":   return <Inspectie/>;
      default:            return <Dashboard user={user} setTab={setTab}/>;
    }
  };
  return (
    <div style={{display:"flex",height:"100vh",background:AX.bg,fontFamily:"'Work Sans',sans-serif",color:AX.gray900}}>
      {/* Sidebar */}
      <div style={{width:68,background:`linear-gradient(180deg,${AX.clayDeep} 0%,${AX.clayDark} 100%)`,display:"flex",flexDirection:"column",alignItems:"center",paddingTop:12,flexShrink:0}}>
        <div style={{marginBottom:14}}><ArgexLogo size={36}/></div>
        <div style={{flex:1,display:"flex",flexDirection:"column",gap:1,width:"100%",padding:"0 5px",overflowY:"auto"}}>
          {nav.map(n=>(
            <button key={n.id} onClick={()=>setTab(n.id)} style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"8px 3px",borderRadius:8,border:"none",cursor:"pointer",fontFamily:"inherit",transition:"all .15s",background:tab===n.id?"rgba(255,255,255,0.2)":"transparent",marginBottom:1}}>
              <span style={{fontSize:17}}>{n.ico}</span>
              <span style={{fontSize:7.5,fontWeight:700,letterSpacing:".03em",textTransform:"uppercase",color:tab===n.id?AX.white:"rgba(255,255,255,0.45)"}}>{n.lbl.substring(0,7)}</span>
            </button>
          ))}
        </div>
        <div style={{padding:"10px 5px",borderTop:"1px solid rgba(255,255,255,0.15)",width:"100%",display:"flex",flexDirection:"column",alignItems:"center",gap:5}}>
          <div style={{width:30,height:30,borderRadius:"50%",background:"rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,color:AX.white}}>{user.avatar}</div>
          <button onClick={onLogout} style={{fontSize:7.5,color:"rgba(255,255,255,0.35)",background:"transparent",border:"none",cursor:"pointer",fontFamily:"inherit",textTransform:"uppercase",letterSpacing:".03em"}}>Uit</button>
        </div>
      </div>
      {/* Main */}
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
        <div style={{height:52,background:AX.white,borderBottom:`1px solid #E8D8CC`,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 22px",flexShrink:0,boxShadow:"0 2px 6px rgba(193,68,14,0.06)"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{fontFamily:"'Work Sans',sans-serif",fontSize:16,fontWeight:800,color:AX.gray900}}>Argex Safety</div>
            <div style={{fontSize:12,color:AX.gray500}}>· Burcht / Zwijndrecht</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <Tag label={ROLE_LABELS[user.role]} color={AX.clay}/>
            <span style={{fontSize:13,color:AX.gray700,fontWeight:700}}>{user.name}</span>
            <div style={{width:7,height:7,borderRadius:"50%",background:AX.green}}/>
          </div>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:22}}>{renderTab()}</div>
      </div>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [user,setUser]=useState(null);
  const [onboardingDone,setOnboardingDone]=useState(false);
  return (
    <>
      <style>{css}</style>
      {!user
        ? <Login onLogin={u=>{setUser(u);setOnboardingDone(u.onboardingDone);}}/>
        : !onboardingDone
        ? <Onboarding user={user} onComplete={()=>setOnboardingDone(true)}/>
        : <MainApp user={user} onLogout={()=>{setUser(null);setOnboardingDone(false);}}/>
      }
    </>
  );
}

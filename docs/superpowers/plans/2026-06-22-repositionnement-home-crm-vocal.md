# Repositionnement home — CRM vocal + site à parité · Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Repositionner la home `index.html` (et ajouter une page `/loi-aout-2026`) pour mener avec le CRM vocal + le site à parité, sans casser le squelette existant.

**Architecture :** Site statique mono-fichier (`index.html`, ~1990 lignes, Tailwind CDN + styles inline + Iconify). On **garde l'ordre des sections** et on **adapte le discours** in place. Une seule page nouvelle (`loi-aout-2026.html`), autonome. Rendu vérifié via Chrome headless (déjà utilisé en maquette).

**Tech Stack :** HTML statique, Tailwind (CDN), Google Fonts (Space Grotesk / Geist), Iconify. Pas de build, pas de framework de test. Déploiement Vercel (auto sur push).

**Validation de la copy :** Conformément à la spec, la copy finale est **validée section par section avec l'utilisateur pendant l'exécution**. Les textes ci-dessous sont des **propositions concrètes** (pas des placeholders) : on les applique, on montre le rendu, on ajuste si besoin, puis on commite.

**Branche :** `feature/repositionnement-crm-vocal` (déjà créée, spec + maquettes commitées en `f61843d`).

**Spec de référence :** `docs/superpowers/specs/2026-06-22-repositionnement-home-crm-vocal-design.md`

---

## Structure des fichiers

| Fichier | Rôle | Action |
|---|---|---|
| `index.html` | La home (16 sections, ordre conservé) | Modifier in place |
| `loi-aout-2026.html` | Page « loi expliquée » (libre + lead magnet) | **Créer** |
| `assets/` | Visuels (vidéos Juliette OK ; `site-desktop.webp`/`site-mobile.webp` obsolètes) | Remplacer/retirer 2 visuels |
| `sitemap.xml` | Référencement | Ajouter l'URL `/loi-aout-2026` |

**Ancres de lignes dans `index.html`** (référence, peuvent bouger après édition) :
`<head>` title=6 / meta desc=7 · hero=835 (badge=846, H1=850-858, payoff=862, CTA=881-885, trust=888-895) · scarcity-bar=929 · marquee=941 · problème=968 · shift 2026=1014 · solution=1066 · juliette=1131 · demo vitrine=1221 · dashboard=1308 · (section 1394) · pages & outils=1448 · comment ça marche=1580 · avant/après=1613 (« vs. un Site Agent » h2=1617) · stats=1699 · testimonial=1721 · garanties=1744 · faq=1778 · cta-final=1881 · footer=1909 (tagline=1915) · exit-modal lead magnet=1950.

---

## Task 1 : SEO — `<title>` + `<meta>` (corrige le snippet Google)

**Files:**
- Modify: `index.html:6-7` (+ ajouter og/twitter si absents)

- [ ] **Step 1 : Remplacer le `<title>` et la `<meta name="description">`**

Remplacer la ligne 6 :
```html
<title>Site Agent · La vitrine qui ne dort jamais · Système1-Immo™</title>
```
par :
```html
<title>CRM vocal immobilier + le site qui remplit ton CRM · Système1-Immo™</title>
```

Remplacer la ligne 7 :
```html
<meta name="description" content="Votre vitrine capture les leads, Juliette les qualifie et les relance avec la science du comportement. Vous restez la star locale. Branchée en 5 minutes." />
```
par :
```html
<meta name="description" content="Le premier CRM vocal immobilier et le site qui remplit votre CRM. Vos vendeurs viennent à vous, qualifiés — sans démarchage à froid. Système1-Immo™." />
```

- [ ] **Step 2 : Ajouter/mettre à jour les balises Open Graph / Twitter (juste après la meta description)**

Si des balises `og:`/`twitter:` existent déjà, aligner leur contenu sur le nouveau title/description. Sinon, ajouter :
```html
<meta property="og:title" content="CRM vocal immobilier + le site qui remplit ton CRM · Système1-Immo™" />
<meta property="og:description" content="Le premier CRM vocal immobilier et le site qui remplit votre CRM. Vos vendeurs viennent à vous, qualifiés — sans démarchage à froid." />
<meta property="og:type" content="website" />
```

- [ ] **Step 3 : Vérifier**

Run: `grep -n "<title>\|name=\"description\"" index.html`
Expected : le `<title>` ne commence **plus** par « Site Agent » ; il commence par « CRM vocal immobilier ».

- [ ] **Step 4 : Commit**
```bash
git add index.html
git commit -m "SEO: title/meta menés par le CRM vocal (corrige le snippet 'site agent')"
```

---

## Task 2 : Hero — variante A (texte validé)

**Files:**
- Modify: `index.html:843-895` (badge, H1, payoff, CTA, + ajout bandeau loi)

> Conserver la mécanique d'animation : classes `.word` (H1), `.reveal` / `transition-delay`, `.badge-velox`, `.btn-primary`. On change le **contenu**, pas les composants.

- [ ] **Step 1 : Badge (ligne 846)** — remplacer
```html
        SITE AGENT · PAR UN AGENT, POUR LES AGENTS
```
par
```html
        SYSTÈME1-IMMO™ · LA PROSPECTION NOUVELLE GÉNÉRATION
```

- [ ] **Step 2 : H1 (lignes 851-857)** — remplacer les word-spans par
```html
        <span class="word" style="animation-delay: 0.05s">La</span>
        <span class="word" style="animation-delay: 0.13s">prospection</span>
        <span class="word" style="animation-delay: 0.21s">immobilière</span>
        <br>
        <span class="word" style="animation-delay: 0.30s">entre</span>
        <span class="word" style="animation-delay: 0.36s">dans</span>
        <span class="word gradient-text" style="animation-delay: 0.44s">une</span>
        <span class="word gradient-text" style="animation-delay: 0.50s">nouvelle</span>
        <span class="word gradient-text" style="animation-delay: 0.56s">ère.</span>
```

- [ ] **Step 3 : Payoff gradient (ligne 862)** — remplacer
```html
        Votre vitrine a travaillé tout le week-end.
```
par
```html
        Le premier CRM vocal + le site qui remplit votre CRM.
```

- [ ] **Step 4 : Conserver la ligne d'autorité (867, Nordine/Freddy) telle quelle.** Conserver le teaser « Je ne prospecte plus. 50 ventes par an. » (872) et le lien « Voir comment ↓ » (874).

- [ ] **Step 5 : CTA primaire (lignes 881-884)** — remplacer le lien `#demo` par le CTA de conversion WhatsApp (cohérent avec la sticky-CTA) :
```html
        <a href="https://wa.me/33632360308?text=Bonjour%2C%20je%20veux%20plus%20d%27infos%20sur%20Syst%C3%A8me1-Immo." target="_blank" rel="noopener" class="btn-primary magnetic ripple px-9 py-4 text-base">
          Je veux plus d'info
          <iconify-icon icon="tabler:arrow-right" width="18" height="18" style="color:white"></iconify-icon>
        </a>
```

- [ ] **Step 6 : Ajouter le bandeau loi** juste après le trust chip (après la ligne 895, avant le `<span id="visitorCount">`) :
```html
      <!-- Bandeau loi 11 août (evergreen : fait daté, pas de "bientôt") -->
      <a href="loi-aout-2026.html" class="reveal mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl flex-wrap justify-center hover:opacity-90 transition" style="transition-delay:1.4s; background:rgba(242,180,90,.07); border:1px solid rgba(242,180,90,.25); color:#FAD9A4">
        <iconify-icon icon="tabler:scale" width="18" height="18" style="color:#F2B45A"></iconify-icon>
        <span class="text-sm font-medium">11 août 2026 · loi n°2025-594 : la prospection téléphonique à froid devient interdite sans accord préalable.</span>
        <span class="text-sm font-bold underline" style="color:#FBE3B5">Ce que vous avez encore le droit de faire →</span>
      </a>
```

- [ ] **Step 7 : Rendre le hero et vérifier visuellement**

Run :
```bash
"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --disable-gpu --hide-scrollbars --virtual-time-budget=5000 --window-size=1440,1000 --screenshot="/tmp/home-hero.png" "file:///C:/Users/MDB3M/Documents/IA/PROJET%20SYSTEME1_immo/systeme1-immo-site/index.html"
```
Ouvrir `/tmp/home-hero.png` : H1 = « La prospection immobilière entre dans une nouvelle ère. », payoff = CRM vocal + site, bandeau loi visible, CTA = « Je veux plus d'info ».

- [ ] **Step 8 : Vérifier la disparition de l'ancien discours**

Run: `grep -n "Lundi, 9h\|a travaillé tout le week-end\|Voir Site Agent" index.html`
Expected : **aucun résultat**.

- [ ] **Step 9 : Commit**
```bash
git add index.html
git commit -m "Hero: variante A (nouvelle ère, CRM vocal + site, bandeau loi)"
```

---

## Task 3 : Créer la page `loi-aout-2026.html` (libre + lead magnet)

**Files:**
- Create: `loi-aout-2026.html`

- [ ] **Step 1 : Créer la page autonome** (réutilise Tailwind CDN + fonts + palette du site ; ton agent-à-agent ; evergreen ; sources .gouv). Contenu complet :

```html
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Loi démarchage téléphonique 2026 : ce que les agents immobiliers ont (encore) le droit de faire · Système1-Immo™</title>
<meta name="description" content="La loi n°2025-594 et le 11 août 2026, expliqués simplement par des agents : ce qui devient interdit, ce que vous gardez le droit de faire, et comment rester en règle." />
<meta name="theme-color" content="#070B14">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Geist:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<script src="https://cdn.tailwindcss.com"></script>
<script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>
<style>
  :root{ --navy-950:#070B14; --navy-800:#0F1523; --cool-50:#F5F7FB; --cool-200:#E4E7EC; --cool-400:#98A2B3; --accent:#5BA3E8; --amber:#F2B45A; --success:#52C77A; }
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Geist',system-ui,sans-serif;background:var(--navy-950);color:var(--cool-200);line-height:1.6}
  .font-display{font-family:'Space Grotesk',sans-serif;letter-spacing:-.02em}
  .wrap{max-width:780px;margin:0 auto;padding:0 24px}
  .card{background:var(--navy-800);border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:24px;margin:16px 0}
  a{color:var(--accent)}
  h1{color:#fff} h2{color:#fff}
  .ok{color:var(--success)} .warn{color:var(--amber)}
</style>
</head>
<body>
  <header class="wrap" style="padding-top:28px;padding-bottom:8px">
    <a href="index.html" class="inline-flex items-center gap-2" style="color:var(--cool-400)">
      <iconify-icon icon="tabler:arrow-left" width="16"></iconify-icon> Retour à Système1-Immo
    </a>
  </header>

  <main class="wrap" style="padding-top:24px;padding-bottom:64px">
    <p class="font-display warn" style="font-weight:600;letter-spacing:.1em;text-transform:uppercase;font-size:13px">Loi n°2025-594 · 11 août 2026</p>
    <h1 class="font-display" style="font-size:40px;font-weight:700;margin:12px 0 18px">La loi du 11 août 2026, expliquée simplement.<br>Par des agents, pour des agents.</h1>
    <p style="font-size:19px;color:var(--cool-400)">Autour de nous, beaucoup d'agents sont perdus : qu'a-t-on encore le droit de faire au téléphone ? Nous aussi, ça nous a fait réfléchir. Voici l'essentiel, sans jargon.</p>

    <div class="card">
      <h2 class="font-display" style="font-size:22px;margin-bottom:8px">Le résumé en 30 secondes</h2>
      <p>La loi inverse la règle. Avant, le particulier devait s'inscrire sur une liste (Bloctel) pour ne PAS être démarché. À partir du 11 août 2026, c'est l'inverse : <strong style="color:var(--cool-50)">aucun appel de prospection sans son accord préalable</strong>. La pige au téléphone (appeler un propriétaire inconnu) tombe dans le « interdit par défaut ».</p>
    </div>

    <div class="card">
      <h2 class="font-display warn" style="font-size:22px;margin-bottom:8px">Ce qui devient interdit</h2>
      <p>La <strong style="color:var(--cool-50)">prospection téléphonique à froid sans consentement préalable</strong> : appeler un propriétaire que vous ne connaissez pas, à partir d'un numéro trouvé sur une annonce ou un fichier, pour décrocher un mandat. Le consentement doit être « libre, spécifique, éclairé, univoque et révocable » — et c'est à vous de prouver que vous l'avez.</p>
    </div>

    <div class="card">
      <h2 class="font-display ok" style="font-size:22px;margin-bottom:8px">Ce que vous gardez le droit de faire</h2>
      <ul style="padding-left:18px;display:flex;flex-direction:column;gap:8px">
        <li>Appeler un client avec qui vous avez déjà un <strong style="color:var(--cool-50)">contrat ou un mandat</strong> (appel « de service »).</li>
        <li>Recontacter une personne qui vous a <strong style="color:var(--cool-50)">donné son accord</strong> (formulaire, prise de contact, demande d'estimation…).</li>
        <li>Travailler tous les leads <strong style="color:var(--cool-50)">entrants</strong> (inbound) : ceux qui viennent à vous et laissent leurs coordonnées de leur plein gré.</li>
      </ul>
    </div>

    <div class="card">
      <h2 class="font-display" style="font-size:22px;margin-bottom:8px">Les sanctions</h2>
      <p>Le contrat conclu après un démarchage irrégulier est <strong style="color:var(--cool-50)">nul</strong>. L'amende administrative peut atteindre <strong style="color:var(--cool-50)">75 000 €</strong> (personne physique) et <strong style="color:var(--cool-50)">375 000 €</strong> (personne morale).</p>
    </div>

    <div class="card" style="border-color:rgba(91,163,232,.35)">
      <h2 class="font-display" style="font-size:22px;margin-bottom:8px">Comment Système1-Immo vous met en règle</h2>
      <p>Notre logique, c'est l'<strong style="color:var(--cool-50)">inbound consenti</strong> : votre site fait venir les vendeurs à vous (ils laissent leurs coordonnées avec leur accord), et Juliette, le CRM vocal, travaille ces leads sans jamais passer un appel à froid. Vous prospectez plus — du bon côté de la loi.</p>
      <a href="https://wa.me/33632360308?text=Bonjour%2C%20je%20veux%20comprendre%20comment%20rester%20en%20r%C3%A8gle%20avec%20Syst%C3%A8me1-Immo." target="_blank" rel="noopener" class="inline-flex items-center gap-2 mt-3" style="font-weight:600">Parler à un agent de l'équipe <iconify-icon icon="tabler:arrow-right" width="16"></iconify-icon></a>
    </div>

    <div class="card" style="text-align:center">
      <h2 class="font-display" style="font-size:20px;margin-bottom:6px">Bonus : la checklist complète en PDF</h2>
      <p style="color:var(--cool-400);margin-bottom:14px">« Loi du 11 août : ma to-do d'agent en règle. » Gratuit.</p>
      <form id="loiLeadForm" class="flex flex-col sm:flex-row gap-2 justify-center" novalidate>
        <input type="email" required placeholder="Votre email d'agent" autocomplete="email" style="background:var(--navy-950);border:1px solid rgba(255,255,255,.12);border-radius:10px;padding:12px 14px;color:#fff;min-width:240px" />
        <button type="submit" style="background:linear-gradient(135deg,#5BA3E8,#3B8DE0);color:#fff;font-weight:600;border:none;border-radius:10px;padding:12px 20px;cursor:pointer">Recevoir la checklist</button>
      </form>
      <p style="font-size:12px;color:var(--cool-400);margin-top:8px">Cœur de l'explication 100% gratuit et sans email. Le PDF, c'est juste un bonus.</p>
    </div>

    <div class="card">
      <h2 class="font-display" style="font-size:18px;margin-bottom:8px">Sources officielles</h2>
      <ul style="padding-left:18px;color:var(--cool-400)">
        <li><a href="https://www.service-public.gouv.fr/particuliers/actualites/A18384" target="_blank" rel="noopener">service-public.gouv.fr — démarchage téléphonique, nouvelles règles</a></li>
        <li><a href="https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006069565/LEGISCTA000032221441/2026-08-11" target="_blank" rel="noopener">Légifrance — Code de la consommation, art. L223-1 à L223-7</a></li>
        <li>Loi n°2025-594 du 30 juin 2025.</li>
      </ul>
    </div>
  </main>
</body>
</html>
```

- [ ] **Step 2 : Câbler le formulaire lead magnet** — lire le JS du formulaire exit-intent existant dans `index.html` (modal `#exitForm`, ~ligne 1967) pour réutiliser **le même endpoint/mécanisme** de capture. Brancher `#loiLeadForm` dessus. *(Dépendance : confirmer l'endpoint réel pendant l'exécution — ne PAS inventer d'URL d'API.)*

- [ ] **Step 3 : Rendre la page et vérifier**

Run :
```bash
"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --disable-gpu --hide-scrollbars --virtual-time-budget=5000 --window-size=1000,1400 --screenshot="/tmp/loi.png" "file:///C:/Users/MDB3M/Documents/IA/PROJET%20SYSTEME1_immo/systeme1-immo-site/loi-aout-2026.html"
```
Ouvrir `/tmp/loi.png` : les 7 blocs présents, sources cliquables, aucun mot « bientôt ».

- [ ] **Step 4 : Vérifier evergreen + lexique sur la page**

Run: `grep -niE "bientôt|prochainement|dans quelques mois|neuro|manipulation|persuasion" loi-aout-2026.html`
Expected : **aucun résultat**.

- [ ] **Step 5 : Ajouter l'URL au sitemap**

Dans `sitemap.xml`, ajouter une entrée `<url><loc>https://systeme1-immo.com/loi-aout-2026.html</loc></url>` (suivre le format existant des autres `<url>`).

- [ ] **Step 6 : Commit**
```bash
git add loi-aout-2026.html sitemap.xml
git commit -m "Page /loi-aout-2026 : loi 11 août expliquée (libre + lead magnet + sources .gouv)"
```

---

## Task 4 : Sections « problème » + « shift 2026 » (injection de la loi)

**Files:**
- Modify: `index.html` sections @968 (problème) et @1014 (shift 2026)

- [ ] **Step 1 : Section « problème » (@968, h2 @972)** — lire la section, garder les 3 cartes, recadrer l'intro autour du nouveau monde. Proposition de h2 :
```
Sans la pige à froid, comment remplir votre CRM ?
```
Et adapter le sous-titre/3 cartes : les outils testés (site DIY, site agence, pas de site) ne **remplissent** ni n'**entretiennent** le CRM. *(Copy validée avec l'utilisateur.)*

- [ ] **Step 2 : Section « shift 2026 » (@1014, h2 @1018)** — c'est le **point d'injection de la loi**. Proposition de h2 :
```
Le vrai virage de 2026 : la prospection à froid, c'est fini.
```
Garder le format 3 cartes ; recadrer (avant : la pige au téléphone / après : l'inbound consenti). Ajouter un lien vers la page loi :
```html
<a href="loi-aout-2026.html" class="inline-flex items-center gap-1 font-medium hover:underline" style="color:var(--accent-blue)">Comprendre la loi du 11 août <iconify-icon icon="tabler:arrow-right" width="14"></iconify-icon></a>
```

- [ ] **Step 3 : Vérifier visuellement** (rendu Chrome de la zone) + valider la copy avec l'utilisateur.

- [ ] **Step 4 : Commit**
```bash
git add index.html
git commit -m "Sections problème + shift 2026 recadrées sur la loi (lien /loi)"
```

---

## Task 5 : Section « solution / timeline » — le DUO à parité

**Files:**
- Modify: `index.html` section @1066 (h2 @1071 « Sa vitrine a attrapé le lead. Juliette a fait le reste. »)

- [ ] **Step 1 : Recadrer le h2 (1071)** vers la parité site ↔ Juliette autour du CRM. Proposition :
```html
<h2 class="font-display text-5xl md:text-7xl font-bold mb-4 mt-6 tracking-tight leading-[1.05]" style="color:var(--cool-50)">Votre site remplit le CRM.<br><span class="gradient-text">Juliette l'entretient.</span></h2>
```

- [ ] **Step 2 : Adapter la timeline (`#timelineWrap`, 1075+)** pour montrer les **deux** mouvements (le site capture → le CRM se remplit ; Juliette qualifie/relance à la voix). Garder le fil rouge « le CRM ». Insérer la phrase signature : « Fini les tableurs imbuvables : tout se fait en parlant ou en tapant. » *(Copy validée avec l'utilisateur.)*

- [ ] **Step 3 : Vérifier + valider la copy.**

- [ ] **Step 4 : Commit**
```bash
git add index.html
git commit -m "Section solution: le duo site/Juliette à parité autour du CRM"
```

---

## Task 6 : Section « Juliette » — le CRM vocal (recadrage léger)

**Files:**
- Modify: `index.html` section @1131 (h2 @1138)

- [ ] **Step 1 : Recadrage léger** — formuler « le CRM vocal qui vous parle et répond à vos prospects », évoquer la voix en voiture entre deux visites. **Conserver le garde-fou vérifiable** (« s'appuie sur le CRM », « validation avant envoi ») ; **pas** de claim « Juliette parle à votre place ». Garder les 2 vidéos réelles (`#juliette-demos`).

- [ ] **Step 2 : Vérifier qu'aucun mot banni n'est introduit**

Run: `grep -niE "neuro|manipulation|persuasion|biais cognitif" index.html`
Expected : aucun nouveau résultat dans la section Juliette.

- [ ] **Step 3 : Commit**
```bash
git add index.html
git commit -m "Section Juliette: cadrage CRM vocal (te parle / répond aux prospects)"
```

---

## Task 7 : Section « démo vitrine » — « le site qui remplit le CRM » + visuels

**Files:**
- Modify: `index.html` section @1221 (h2 @1225)
- Replace: `site-desktop.webp`, `site-mobile.webp`

- [ ] **Step 1 : Recadrer le discours** : la vitrine = « le site qui **remplit** votre CRM » (capture), pas « devenez star via un site ». Adapter les callouts.

- [ ] **Step 2 : Remplacer les visuels obsolètes** `site-desktop.webp` / `site-mobile.webp` (montrent encore la version « vendre seul » particuliers). *(Dépendance : nouveaux visuels « site agent » à fournir. Si indisponibles à l'exécution : retirer temporairement le bloc démo-vitrine ou afficher un placeholder neutre — décision à prendre avec l'utilisateur, ne pas laisser un visuel mensonger.)*

- [ ] **Step 3 : Vérifier + valider.**

- [ ] **Step 4 : Commit**
```bash
git add index.html assets
git commit -m "Section démo: le site qui remplit le CRM + visuels à jour"
```

---

## Task 8 : Section « pages & outils » — la suite + science (1 ligne)

**Files:**
- Modify: `index.html` section @1448 (h2 @1455 « 9 modules. 11 blocs. 1 machine à leads. »)

- [ ] **Step 1 : Garder les cartes modules.** Ajouter le cadrage « **toute la suite** » (Sniper/scraping, newsletter, guide vendeur, avis, blog, Roue des Leads) et **une seule ligne** évoquant la science du comportement comme moteur (parcimonie), p.ex. :
```
Tous ces outils sont pensés avec la science du comportement — discrètement, pour vous faire vendre plus.
```

- [ ] **Step 2 : Vérifier que « science du comportement » apparaît un nombre minimal de fois sur la page**

Run: `grep -nic "science du comportement" index.html`
Expected : un petit nombre (≈ 1-3), jamais dans un `<h1>`/`<h2>`.

- [ ] **Step 3 : Commit**
```bash
git add index.html
git commit -m "Section pages & outils: la suite + science du comportement en 1 ligne"
```

---

## Task 9 : Sections « avant/après », « CTA final » — retirer « Site Agent », cadrer « nouvelle ère »

**Files:**
- Modify: `index.html` section @1613 (h2 @1617 « vs. un Site Agent »), section @1881 (cta-final, h2 @1886)

- [ ] **Step 1 : Avant/après (1617)** — remplacer le cadrage « Site Agent » par l'opposition loi. Proposition de h2 :
```html
<h2 class="font-display text-5xl md:text-7xl font-bold mb-4 mt-6 tracking-tight" style="color:var(--cool-50)">L'agent qui subit la loi<br>vs. <span class="gradient-text">l'agent équipé.</span></h2>
```
Adapter les 6 points « avant » (subit la fin de la pige) / « après » (inbound consenti, CRM rempli/entretenu).

- [ ] **Step 2 : CTA final (1886)** — recadrer sur « nouvelle ère » + conserver les 2 CTA (WhatsApp + email). Vérifier les liens WhatsApp/mail.

- [ ] **Step 3 : Vérifier la disparition de « Site Agent » comme nom de produit**

Run: `grep -ni "Site Agent" index.html`
Expected : plus aucune occurrence en tant que **nom de produit vedette** (vérifier chaque résultat restant).

- [ ] **Step 4 : Commit**
```bash
git add index.html
git commit -m "Avant/après + CTA final: cadrage loi/nouvelle ère, retrait 'Site Agent'"
```

---

## Task 10 : FAQ — question dédiée à la loi

**Files:**
- Modify: `index.html` section @1778 (faq)

- [ ] **Step 1 : Ajouter/ajuster 1-2 questions** sur la loi du 11 août, avec lien vers `loi-aout-2026.html`. Exemple de Q :
```
« La loi de 2026 sur le démarchage, ça me concerne ? » → Oui : la prospection téléphonique à froid sans accord préalable devient interdite le 11 août 2026. Système1-Immo vous fait passer à l'inbound consenti. [En savoir plus → loi-aout-2026.html]
```
Registre FAQ : on peut être précis, toujours **sans** mots bannis.

- [ ] **Step 2 : Commit**
```bash
git add index.html
git commit -m "FAQ: question dédiée à la loi du 11 août (lien /loi)"
```

---

## Task 11 : Footer — tagline recadrée + pont Lab (texte)

**Files:**
- Modify: `index.html:1915` (tagline) et bloc brand @1911-1916

- [ ] **Step 1 : Tagline (1915)** — remplacer
```html
      <p style="color:var(--cool-400)">La vitrine immobilière conçue avec la science du comportement.</p>
```
par
```html
      <p style="color:var(--cool-400)">Le CRM vocal et le site qui remplissent votre CRM — pour vendre plus, du bon côté de la loi.</p>
```

- [ ] **Step 2 : Ajouter le pont Lab (texte, pas d'image — pas de logo Lab en local)** juste après la tagline (après 1915) :
```html
      <p class="mt-4 text-xs" style="color:var(--cool-500)">
        Ces applications sont conçues grâce aux travaux du
        <a href="https://systeme1-immo-lab.com" target="_blank" rel="noopener" class="hover:text-white" style="color:var(--cool-400);text-decoration:underline">Lab Système1-Immo</a>.
      </p>
```
*(Si l'utilisateur fournit un logo « Système1-Immo Lab », l'ajouter ici en `<img>` à la place/au-dessus du texte.)*

- [ ] **Step 3 : Vérifier le pont**

Run: `grep -n "systeme1-immo-lab.com" index.html`
Expected : 1 occurrence, dans le footer.

- [ ] **Step 4 : Commit**
```bash
git add index.html
git commit -m "Footer: tagline recadrée + pont vers le Lab (texte)"
```

---

## Task 12 : Vérification finale (definition of done)

**Files:** aucun (vérifications), puis nettoyage optionnel.

- [ ] **Step 1 : Lexique banni** — `grep -niE "\bneuro|manipulation|persuasion|biais cognitif|\bhack\b|optimisé pour convertir" index.html loi-aout-2026.html`
  Expected : seulement d'éventuelles occurrences **maîtrisées** dans la FAQ (désamorçage « manipulation »). Aucune ailleurs.

- [ ] **Step 2 : Evergreen** — `grep -niE "bientôt|prochainement|dans quelques mois|à venir|prends de l'avance" index.html loi-aout-2026.html`
  Expected : aucun résultat.

- [ ] **Step 3 : Snippet** — `grep -n "<title>" index.html` ne commence plus par « Site Agent ».

- [ ] **Step 4 : Structure préservée** — `grep -nE "id=\"(hero|solution|juliette|demo|dashboard|pages|faq|cta-final)\"" index.html` : les sections sont dans le **même ordre** qu'avant (hero → … → cta-final).

- [ ] **Step 5 : Liens vers /loi fonctionnent** — `grep -nc "loi-aout-2026.html" index.html` ≥ 3 (hero, shift 2026, FAQ).

- [ ] **Step 6 : Rendu complet** — capturer la home entière et la page loi avec Chrome headless, ouvrir les images, vérifier qu'aucune section n'est cassée.

- [ ] **Step 7 : Nettoyage (optionnel, à valider avec l'utilisateur)** — supprimer le dossier `mockup/` (maquettes jetables) :
```bash
git rm -r mockup
git commit -m "Nettoyage: suppression des maquettes hero jetables"
```

- [ ] **Step 8 : Commit final / récap** — vérifier `git log --oneline` et que le working tree est propre.

---

## Dépendances à confirmer pendant l'exécution (ne pas inventer)
1. **Endpoint de capture lead** (formulaire `/loi` + exit-intent) : lire le JS existant pour réutiliser le même mécanisme. Le dossier `api/` à la racine peut contenir l'endpoint.
2. **Nouveaux visuels** « site agent » pour remplacer `site-desktop.webp` / `site-mobile.webp`.
3. **Logo « Système1-Immo Lab »** (sinon pont texte).
4. **Copy section par section** : validée avec l'utilisateur au fil (préférence explicite).

---

## Self-review (couverture spec)
- Spec §4 hero → Task 2 ✅ · §5 sections (ordre conservé) → Tasks 2,4,5,6,7,8,9,10 ✅ · §6 pont Lab → Task 11 ✅ · §7 SEO → Task 1 ✅ · §8 page /loi → Task 3 ✅ · §3 evergreen/lexique → vérifs Tasks 6,8,12 ✅ · §10 DoD → Task 12 ✅ · visuels obsolètes → Task 7 ✅.
- Placeholders : les « copy validée avec l'utilisateur » sont **intentionnels** (préférence user), accompagnés d'une **proposition concrète** à chaque fois — pas des TODO vides.
- Cohérence : page cible `loi-aout-2026.html` créée (Task 3) avant le câblage des liens (Tasks 2,4,10) au sens où le fichier existe avant la vérif finale (Task 12 step 5).

# Repositionnement de la home — du « Site Agent » au CRM vocal Système1‑Immo™

**Date :** 2026‑06‑22
**Périmètre :** `index.html` (home) + nouvelle page `/loi-aout-2026` + footer.
**Principe directeur :** **on garde le squelette/le « chemin » existant, on adapte le discours.** Pas de réarchitecture.

---

## 1. Contexte — pourquoi ce changement

La home actuelle vend « **Site Agent** » (un constructeur de vitrine) :
- Répartition mesurée : **~70 % vitrine / ~20 % CRM vocal (Juliette) / ~7 % science**, sans section science dédiée.
- Le `<title>` commence par « **Site Agent** » → c'est pour ça que le **snippet Google** parle de « site agent ».
- Le hero est 100 % vitrine (« Votre vitrine a travaillé tout le week‑end »).

Or la vraie vedette, c'est le **CRM vocal** (« ça pète et ça n'existe pas ») et la marque **Système1‑Immo™** = la science du comportement appliquée à l'immo. Le site sous‑pondère ces deux actifs.

**Timing :** la **loi n° 2025‑594 du 30 juin 2025** rend, au **11 août 2026**, le démarchage téléphonique à froid interdit sans consentement préalable (opt‑in). Le canal n°1 des agents (la pige au téléphone) bascule dans l'illégal‑par‑défaut → Système1‑Immo est la réponse *inbound* légale. C'est notre *why now*.

**Résultat attendu :** une home qui mène avec le CRM vocal + le site (à parité), portée par l'urgence loi, qui corrige le snippet Google, sans casser le chemin narratif existant.

---

## 2. La pyramide (positionnement verrouillé)

- **Sommet — marque + why now :** la prospection immobilière entre dans une **nouvelle ère** (déclencheur = loi 11 août).
- **2 outils phares à parité :**
  - **Le site internet → remplit le CRM** (capture les vendeurs, 24/7).
  - **Juliette, le CRM vocal → entretient le CRM** (qualifie, relance, met à jour à la voix).
  - **Fil rouge = le CRM.** « Fini les tableurs imbuvables : tout se fait en parlant ou en tapant. »
- **Moteur (moat) :** la science du comportement — **discrète**, jamais dans les titres.
- **Résultat :** devenir la **star locale**, vendre plus.

---

## 3. Principes éditoriaux (à appliquer partout)

1. **Evergreen / présent.** Jamais « bientôt », « dans X mois », « prends de l'avance », « plus tard vous aurez ». On énonce des faits datés au présent (« la loi du 11 août 2026 change… »), vrais avant ET après la date. *« C'est maintenant. »*
2. **Science à dose homéopathique.** « Science du comportement » autorisé, rare, jamais dans un titre/accroche.
3. **Lexique banni côté public :** `neuroscience` / `neuro-`, `manipulation`, `persuasion`, `biais cognitif`, `hack`, `optimisé pour convertir`. (La FAQ peut traiter le sujet « manipulation » pour le désamorcer — registre contrôlé.)
4. **Claim vérifiable.** Pour la loi : « la prospection téléphonique **à froid, sans accord préalable**, devient interdite » — jamais « le téléphone est interdit » (faux). Pour Juliette : garde‑fou vérifiable (« s'appuie sur le CRM », « validation avant envoi »), jamais l'absolu.
5. **Ton agent‑à‑agent.** Empathie d'initié (« nous aussi, agents, ça nous a fait réfléchir ») → montre qu'on est de leur côté.
6. **Marque :** **Système1‑Immo™** (logo, footer, `title`). « Système 1 » accepté à l'oral / en eyebrow.

---

## 4. Le hero (variante A — texte validé)

- **Eyebrow :** « Système 1 · la prospection immobilière nouvelle génération »
- **H1 :** « La prospection immobilière entre dans **une nouvelle ère**. »
- **Sous‑titre :** « Le **premier CRM vocal** et **ton site qui remplit ton CRM**. Les vendeurs viennent à toi, déjà qualifiés. Tu deviens la star locale — **sans démarcher à froid**. »
- **2 cartes outils (parité) :** « Ton site internet · remplit ton CRM » / « Juliette, le CRM vocal · entretient ton CRM »
- **CTA :** « Je veux plus d'info → » + « Sans engagement · Tarif fondateur »
- **Bandeau loi (pied de hero) :** « 11 août 2026 · loi n° 2025‑594 : la prospection téléphonique à froid devient interdite sans accord préalable. » + lien **« Ce que vous avez encore le droit de faire → »** vers `/loi-aout-2026`.

*(Maquette de référence rendue : `mockup/hero-a.png`. Le design final — couleurs/typo/animations — relève d'une session design ultérieure ; ici on fige le texte et la composition, pas le pixel.)*

---

## 5. Adaptation du discours — section par section (ordre EXISTANT conservé)

> Règle : on garde chaque section et sa place. On change le **message**, pas la **structure**.

| # | Section existante | Adaptation du discours |
|---|---|---|
| 1 | **Hero** | Remplacé par la variante A (§4). Nouveau `title`/`meta` (§7). |
| 2 | **Marquee logos réseaux** | Inchangé. |
| 3 | **Le problème** (3 outils testés) | Garder le format 3 cartes. Recadrer : *sans la pige à froid, comment tu remplis ton CRM ?* Les outils actuels ne **remplissent** ni n'**entretiennent** le CRM. |
| 4 | **Le shift 2026** | **Point d'injection de la loi.** Le vrai shift 2026 = la fin de la prospection à froid. Garder le format 3 cartes ; lien vers `/loi`. |
| 5 | **La solution / timeline** | Recadrer en **le duo qui remplit + entretient le CRM**. Rééquilibrer site ↔ Juliette (parité), fil rouge CRM. |
| 6 | **Juliette (vidéos)** | Garder (cœur du CRM vocal). Discours : « le CRM vocal qui te parle et répond à tes prospects », voix en voiture. Garde‑fou vérifiable, pas de claim « parle à ta place ». |
| 7 | **Démo vitrine en ligne** | Garder la section. **Remplacer les visuels obsolètes** `site-desktop.webp` / `site-mobile.webp` (encore « vendre seul » particuliers). Discours : « le site qui **remplit** ton CRM ». |
| 8 | **Back‑office en vrai** (carrousel) | Inchangé (preuve produit). Légendes : parler « CRM rempli/entretenu ». |
| 9 | **Pages & outils** (9 modules) | Garder. **Ici** : évoquer **la suite** (Sniper/scraping, newsletter, guide vendeur, avis, blog, Roue des Leads) + **la science du comportement en UNE ligne** (parcimonie = le moteur). |
| 10 | **Comment ça marche** | Inchangé. |
| 11 | **Avant / après** | Garder le format. « Avant » = l'agent qui subit la fin de la pige ; « après » = l'agent équipé (inbound consenti). |
| 12 | **Stats** | Inchangé. |
| 13 | **Témoignage Nordine** | Garder (autorité fondateur). Marque = Système1‑Immo™. |
| 14 | **Garanties** | Inchangé. |
| 15 | **FAQ** | Garder. Ajuster/ajouter 1–2 questions « loi 11 août » avec lien `/loi`. Registre légitime pour un peu plus de précision (toujours sans mots bannis). |
| 16 | **CTA final + footer** | CTA recadré « nouvelle ère ». **Footer : ajouter le pont Lab** (§6). |

---

## 6. Pont vers le Lab (footer uniquement)

Cohérence avec `systeme1-immo-lab.com` (Nordine, qui vend les formations **Neuro‑Agent™** avec un discours neuro assumé) :
- **Uniquement dans le footer** : logo **Système1‑Immo Lab** + phrase type *« Ces applications sont conçues grâce aux travaux du Lab Système1‑Immo »* + lien vers le Lab.
- **Rien d'autre, nulle part ailleurs.** Pas de vocabulaire neuro répété sur le site produit (les visiteurs venant du Lab y sont déjà acquis ; les visiteurs directs ne doivent pas être effrayés).

---

## 7. SEO — corriger le snippet

- **`<title>` (proposition à affiner) :** « CRM vocal immobilier + le site qui remplit ton CRM · Système1‑Immo™ » — ne commence **plus** par « Site Agent ».
- **`<meta name="description">` (proposition) :** « Système1‑Immo : le premier CRM vocal immobilier et le site qui remplit ton CRM. Tes vendeurs viennent à toi, qualifiés — sans démarchage à froid. »
- Vérifier `og:title` / `og:description` cohérents.

---

## 8. Nouvelle page `/loi-aout-2026` (libre + lead magnet)

**Objectif :** vulgariser la loi (confiance + autorité + SEO/GEO + capture de leads).

- **Accès libre** (le cœur pédagogique n'est PAS derrière un mur).
- **Ton :** agent‑à‑agent, empathique, evergreen.
- **Structure proposée :**
  1. Le résumé en 30 secondes (ce qui change le 11 août 2026).
  2. **Ce qui devient interdit** : la prospection téléphonique à froid sans consentement préalable.
  3. **Ce que vous gardez le droit de faire** : appel « de service » à un client déjà sous mandat/contrat ; inbound consenti ; etc.
  4. **Les sanctions** : nullité du contrat + amende jusqu'à 75 000 € (personne physique) / 375 000 € (personne morale).
  5. **Comment Système1‑Immo vous met en règle** : l'inbound consenti (le site capture avec consentement, Juliette travaille le CRM).
  6. **Sources officielles** (liens) : service‑public.gouv.fr, Légifrance (art. L223‑1 à L223‑7), n° de loi.
  7. **Encart lead magnet** : « Télécharge la checklist complète (PDF) » → email → CRM.
- **SEO page :** `title` ciblant « loi démarchage téléphonique 2026 agents immobiliers ».

---

## 9. Hors périmètre

- Refonte **visuelle/design** de la home (couleurs, typo, animations) → **session ultérieure**.
- **Copy final mot‑à‑mot** de chaque section (hors hero, déjà figé) → rédigé à l'implémentation, validé au fil. La spec fige la **direction**, pas chaque phrase.
- Pages légales (déjà faites), `quiz.html`, `adn-agent/`.
- Le PDF du lead magnet lui‑même (création du contenu PDF = tâche séparée).

---

## 10. Vérification (definition of done)

- **Snippet :** `title`/`meta` mis à jour, ne commencent plus par « Site Agent ».
- **Hero :** variante A en place ; bandeau loi → `/loi-aout-2026` fonctionne.
- **Structure préservée :** les 16 sections sont dans le même ordre qu'avant.
- **Page `/loi` :** existe, libre d'accès, sources .gouv cliquables, encart lead magnet présent, **aucun mot « bientôt »** (evergreen).
- **Footer :** logo Lab + phrase + lien présents.
- **Lexique :** recherche de `neuro`, `manipulation`, `persuasion`, `biais cognitif` → absents hors FAQ contrôlée ; « science du comportement » ≤ usages comptés.
- **Visuels :** `site-desktop.webp` / `site-mobile.webp` « vendre seul » remplacés (ou retirés).
- **Git :** travail réalisé sur une **branche feature** (pas `main`).

---

## 11. Maquette jetable

Les fichiers `mockup/hero-*.html|css|png` ont servi à choisir le hero. **Supprimables** une fois le repositionnement implémenté.

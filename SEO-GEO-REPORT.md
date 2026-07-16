# Rapport SEO + GEO — systeme1-immo.com

> Travail réalisé sur la branche `feature/seo-geo-optimization`. Additif et structurel uniquement.
> Aucune copy de conversion modifiée, aucun design touché, aucune donnée inventée. Domaine `.fr` intouché.
> Date : 16 juillet 2026.

## Ce qui a été fait, par phase

### Phase 1 — Accès crawlers IA & fichiers racine
- **`robots.txt`** : autorise désormais explicitement GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, Perplexity-User, ClaudeBot, Claude-User, anthropic-ai, Google-Extended, Applebot-Extended, Bingbot. `Disallow: /.vercel/` et `Sitemap:` conservés.
- **`llms.txt`** (nouveau) : résumé GEO structuré (produit, méthode/Lab, société/fondateurs, pages légales).
- **`site.webmanifest`** (nouveau) + `<link rel="manifest">` dans `index.html` (icônes déjà présentes).
- **`SEO-GEO-AUDIT.md`** (nouveau) : état des lieux Phase 0.

### Phase 2 — SEO technique on-page
- **`vercel.json`** : redirection 301 `systeme1-immo.com` (apex) → `https://www.systeme1-immo.com` (scopée sur l'hôte, `.fr` non touché).
- **`loi-aout-2026.html`** : remplacement du CDN de dev `cdn.tailwindcss.com` (JS bloquant) par le CSS local `tailwind.min.css` ; Iconify passé en `async` + `preconnect` ; ajout canonical + Open Graph + Twitter Card (`og:type=article`) ; `<title>` réduit à 54c, description à 151c.
- **Pages légales** (`mentions-legales.html`, `cgu.html`, `confidentialite.html`) : ajout canonical + Open Graph + Twitter.
- **`index.html`** : contenu principal enveloppé dans `<main>` (le `<nav>` sticky et les couches d'ambiance restent hors `<main>` pour ne pas casser le sticky) ; `decoding="async"` ajouté aux 12 `<img>` ; `preconnect` vers `code.iconify.design`.

### Phase 3 — Données structurées JSON-LD (graphe d'entités)
- **`index.html`** : graphe enrichi. `Organization` gagne `founder` (→ Nordine, Freddy) et `sameAs` (→ Lab). `SoftwareApplication` reçoit `@id #app` + `applicationSubCategory`. Ajout de deux `Person` (`#nordine`, `#freddy`) reliées par `worksFor`. `FAQPage` reçoit `@id #faq` + `isPartOf #app` (les 14 Q/R existantes, déjà fidèles, n'ont PAS été réécrites).
- **`loi-aout-2026.html`** : nouveau graphe `Organization` + `Article` (author/publisher = Organization, `datePublished`/`dateModified` réels) + `WebPage` + `BreadcrumbList` (Accueil → Loi du 11 août 2026).

### Phase 4 — Couche GEO & scaffolding
- **`loi-aout-2026.html`** : marqueur de fraîcheur **visible** « Mis à jour le 16 juillet 2026 » sous le H1, aligné avec `dateModified`.
- **`docs/_geo-page-template.html`** (nouveau) : squelette GEO-ready commenté (H1=question, intro answer-first, H2, bloc FAQ + `FAQPage`, `BreadcrumbList`, canonical, OG, marqueur de date, maillage interne), `noindex`, prêt pour les futures pages de catégorie. Emplacement d'une future page « méthode/Lab » prévu dedans.
- **`vercel.json`** : `/docs/(.*)` passé en `noindex` (protège le template ET les specs internes contre l'indexation).

### Phase 5 — Vérification & livrables
- `npm run build:css` : OK (le CSS recompilé est byte-identique à l'existant → la bascule CSS de la page loi est visuellement neutre).
- `sitemap.xml` : `lastmod` des 5 pages indexables mis à 2026-07-16.
- Ce rapport.

## Validations effectuées
- **JSON-LD** : tous les blocs `ld+json` (home = graphe 6 entités + FAQPage ; page loi = graphe 4 entités) parsés sans erreur JSON.
- **Canonical + Open Graph** : présents sur les 5 pages indexables (vérifié par script).
- **Aucun `cdn.tailwindcss.com`** résiduel sur les pages indexables.
- **Classes Tailwind de la page loi** (`inline-flex`, `items-center`, `gap-2`, `mt-3`, `font-display`) présentes dans `tailwind.min.css`.
- **Ressources servies en HTTP 200** (serveur local) : pages, CSS local, `assets/og-share.jpg`, `site.webmanifest`, `llms.txt`, `robots.txt`, `sitemap.xml`.
- **Structure `<main>`** : 1 ouvrant / 1 fermant, aucun sélecteur CSS `body > …` ni parcours DOM fragile qui pourrait casser.

> ⚠️ **QA visuelle live non exécutée** : l'extension Chrome n'était pas connectée pendant la session. Les changements à risque (bascule CSS de la page loi, wrapper `<main>` de la home) ont été vérifiés structurellement (classes présentes, CSS byte-identique, pas de sélecteur fragile). Un coup d'œil visuel de ta part sur ces 2 pages avant déploiement reste recommandé.

## Actions HORS-REPO (à faire côté plateformes, je ne peux pas les faire)

1. **Cloudflare — débloquer les crawlers IA.** Autoriser `robots.txt` ne suffit pas si Cloudflare bloque au niveau CDN (config par défaut depuis 2025). Dashboard Cloudflare → Bot Management / AI Audit → autoriser les AI crawlers. Vérification après déploiement :
   ```bash
   curl -s -A "GPTBot"        -o /dev/null -w "%{http_code}\n" https://www.systeme1-immo.com/
   curl -s -A "PerplexityBot" -o /dev/null -w "%{http_code}\n" https://www.systeme1-immo.com/
   curl -s -A "ClaudeBot"     -o /dev/null -w "%{http_code}\n" https://www.systeme1-immo.com/
   # Tout doit renvoyer 200. Un 403/429 = blocage CDN à lever.
   ```
2. **Redirections de domaine `.fr` et autres hôtes.** La redirection apex `.com` → www est dans `vercel.json`, mais tu m'as demandé de ne PAS toucher au `.fr`. Si `systeme1-immo.fr` / `www.systeme1-immo.fr` servent le site marketing, décide de la stratégie (301 → `.com`, ou site distinct) côté Vercel/DNS. Test de la redirection apex après déploiement :
   ```bash
   curl -sI https://systeme1-immo.com/ | grep -i "location"   # doit pointer vers https://www.systeme1-immo.com/
   ```
3. **Avis.** N'ajoute un schema `Review`/`aggregateRating` QUE quand de vrais avis existent (Google Business, Trustpilot, Capterra). Aucun n'a été ajouté (garde-fou YMYL respecté).
4. **GA4.** Crée un segment de trafic référé par les IA (chatgpt.com, perplexity.ai, gemini.google.com…) pour mesurer la visibilité GEO.
5. **URL presse Nordine.** Si tu veux renforcer l'autorité (E-E-A-T) de Nordine, fournis l'URL de son profil / article dans le *Journal de l'Agence* : je l'ajouterai au `sameAs` du `Person #nordine`.
6. **Accès direct aux specs internes.** `docs/` est désormais en `noindex`, mais les fichiers `.md` internes (`docs/superpowers/…`) restent **téléchargeables** publiquement si on connaît l'URL (car `outputDirectory: "."`). Recommandation : sortir `docs/` du dossier déployé, ou le bloquer via une règle d'accès. À décider.

## Propositions de CONTENU (non appliquées — elles touchent la copy)

1. **Intro answer-first de la page loi.** Aujourd'hui, sous le H1, une phrase d'accroche empathique précède la réponse. Pour les IA, la réponse directe devrait arriver en phrase 1. Proposition d'intro : *« À partir du 11 août 2026 (loi n°2025-594), appeler un propriétaire que vous ne connaissez pas pour décrocher un mandat devient interdit sans son accord préalable. Voici ce qui change, et ce que vous gardez le droit de faire. »* — puis l'accroche empathique actuelle en 2e paragraphe.
2. **Bloc FAQ sur la page loi.** La page n'a pas de Q/R, donc pas de `FAQPage` (je n'en invente pas). Ajouter 3-4 vraies questions (« Puis-je encore faire de la pige au téléphone ? », « Un client existant, ça compte ? », « Quelles sanctions ? ») permettrait d'ajouter un `FAQPage` et de capter des requêtes longue traîne.
3. **Share card dédiée à la page loi.** Elle réutilise l'image de marque générique `og-share.jpg`. Une image 1200×630 spécifique « Loi 11 août 2026 » améliorerait le taux de clic au partage.
4. **`<title>` de la home (67c).** Conservé tel quel (choix marketing délibéré, non pénalisant). Si tu veux passer sous 60c : *« CRM vocal immobilier + le site qui remplit ton CRM »* (sans le suffixe marque).

## Commandes de vérification à lancer contre la PROD (après déploiement)

```bash
# 1. Accès crawlers IA (attendu : 200 partout)
curl -s -A "GPTBot"        -o /dev/null -w "GPTBot %{http_code}\n"        https://www.systeme1-immo.com/
curl -s -A "PerplexityBot" -o /dev/null -w "Perplexity %{http_code}\n"   https://www.systeme1-immo.com/
curl -s -A "ClaudeBot"     -o /dev/null -w "ClaudeBot %{http_code}\n"    https://www.systeme1-immo.com/

# 2. Fichiers racine servis (attendu : 200)
curl -s -o /dev/null -w "robots %{http_code}\n"   https://www.systeme1-immo.com/robots.txt
curl -s -o /dev/null -w "llms %{http_code}\n"     https://www.systeme1-immo.com/llms.txt
curl -s -o /dev/null -w "sitemap %{http_code}\n"  https://www.systeme1-immo.com/sitemap.xml

# 3. Redirection apex -> www (attendu : 301 + Location www)
curl -sI https://systeme1-immo.com/ | grep -iE "HTTP/|location"
```

Après déploiement, valide aussi chaque page dans le **Rich Results Test** de Google (https://search.google.com/test/rich-results) et re-soumets le `sitemap.xml` dans la Search Console.

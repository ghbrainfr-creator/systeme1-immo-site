# Audit SEO + GEO — systeme1-immo.com

> État des lieux Phase 0 (lecture seule). Domaine canonique : `https://www.systeme1-immo.com/`.
> Date de l'audit : juillet 2026.

## 1. Stack & génération du `<head>`

- **HTML statique pur.** Aucun framework de rendu. Seul build : Tailwind CLI (`npm run build:css` → `tailwind.min.css`).
- **Chaque page possède son propre `<head>` écrit à la main** (pas de template ni de head-manager). Conséquence : les métadonnées (title, description, canonical, OG, JSON-LD) se maintiennent **page par page**.
- Incohérence de chargement CSS : la home charge `tailwind.min.css` (local), mais `loi-aout-2026.html` chargeait `cdn.tailwindcss.com` (CDN de développement, JS bloquant non destiné à la production) — corrigé en Phase 2.

## 2. Inventaire des pages

**Indexables (présentes dans `sitemap.xml`) :**

| Page | title | meta desc | OG/Twitter | canonical | 1 H1 | JSON-LD |
|---|---|---|---|---|---|---|
| `index.html` | ✅ (67c) | ✅ | ✅ complet | ✅ www | ✅ | ✅ (2 blocs) |
| `loi-aout-2026.html` | ❌ 112c | ❌ 166c | ❌ | ❌ | ✅ | ❌ |
| `mentions-legales.html` | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ |
| `cgu.html` | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ |
| `confidentialite.html` | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ |

**En `noindex` (via `vercel.json` `X-Robots-Tag`) — hors périmètre SEO :** `quiz.html`, `adn-agent/*`, `guides/*`, `mockup/*`, `assets/checklist-loi-source.html`.

- `lang="fr"` présent et correct sur toutes les pages. Aucun `alt` d'image manquant sur l'ensemble du site.
- Le « duplicate content » potentiel entre `quiz.html` et `adn-agent/index.html` (titres identiques) est **déjà neutralisé** par le `noindex`.

## 3. Fichiers techniques

| Fichier | État initial |
|---|---|
| `robots.txt` | Présent mais minimal (n'autorisait pas explicitement les crawlers IA) |
| `sitemap.xml` | Présent, correct (5 URLs www, `lastmod` réels) |
| `llms.txt` | **Absent** |
| `site.webmanifest` / `manifest.json` | **Absent** (icônes 192px + apple-touch pourtant présentes) |
| `humans.txt` | Absent (non prioritaire) |
| Favicons | Complets (`.ico`, `.svg`, 48px, 192px, apple-touch) |
| Vérification Google Search Console | Présente (`googlec3bce9cdfcf030fd.html`) |

## 4. Données structurées (JSON-LD) existantes

Un seul fichier en contient : `index.html`, avec **2 blocs séparés** :

- **Bloc 1 (`@graph`)** : `Organization` + `WebSite` + `SoftwareApplication` + `VideoObject`.
- **Bloc 2** : `FAQPage` **déjà complet — les 14 questions** de la FAQ visible (wording légèrement reformulé mais fidèle).

Lacunes : les 2 `Person` fondateurs manquent ; `FAQPage` est hors du `@graph` (pas de `@id`, pas de `isPartOf`) ; `SoftwareApplication` sans `@id` ; pas de `sameAs` vers le Lab (`systeme1-immo-lab.com`). Les autres pages n'ont aucun balisage structuré.

## 5. Stratégie de domaine

- `vercel.json` : **aucune redirection** (ni apex→www, ni `.fr`→`.com`). Risque de contenu dupliqué si plusieurs hôtes servent le même contenu.
- Le `.fr` est utilisé pour le produit (vitrines agents `*.systeme1-immo.fr`) et les emails → **ne pas rediriger le `.fr`**.
- **Décision retenue** : redirection 301 `systeme1-immo.com` (apex) → `www.systeme1-immo.com` dans `vercel.json`. La normalisation du `.fr` et des autres hôtes est une action **hors-repo** (dashboard Vercel/DNS).

## 6. Performance (points faibles)

- **Fonts Google** chargées en `<link>` bloquant (avec `preconnect` + `display=swap` déjà en place, donc acceptable).
- **`decoding="async"` absent** sur les 12 `<img>` de la home (correctif facile).
- Pas de `preconnect`/`dns-prefetch` vers `code.iconify.design` (script tiers).
- Grosse animation Canvas 2D inline en fin de `<body>` (non bloquante, à **conserver** — signature visuelle voulue).
- Points forts : dimensions `width/height` explicites (bon CLS), `preload` du LCP hero + `fetchpriority=high`, vidéos en `preload=none`/`metadata`.

---

## Plan d'action priorisé

1. **Phase 1** — `robots.txt` (crawlers IA), `llms.txt`, `site.webmanifest` + `<link rel=manifest>`.
2. **Phase 2** — `vercel.json` (301 apex→www) ; `loi-aout-2026.html` (CSS local, canonical, OG, title/desc) ; canonical + OG sur pages légales ; `decoding=async`, `dns-prefetch` iconify, `<main>` sur la home.
3. **Phase 3** — Fusion du `@graph` home + 2 `Person` + `sameAs` Lab ; `Article` + `BreadcrumbList` sur la page loi.
4. **Phase 4** — Marqueur de fraîcheur visible sur la page loi + `dateModified` ; template GEO réutilisable.
5. **Phase 5** — Build, validation JSON-LD, `SEO-GEO-REPORT.md`, commandes de vérification crawler.

**Garde-fous respectés :** additif/structurel uniquement, aucune donnée inventée (ni `Review` ni `aggregateRating`), copy de conversion et design intouchés, `.fr` intouché.

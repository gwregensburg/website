# Gemeinschaftlich Wohnen Regensburg – Webseite

Quellcode der Webseite [gemeinschaftlich-wohnen-regensburg.de](https://gemeinschaftlich-wohnen-regensburg.de), gebaut mit [Hugo](https://gohugo.io/) und dem Theme [Hextra](https://github.com/imfing/hextra), gehostet auf GitHub Pages.

## Inhalte bearbeiten (ohne Git)
Veranstaltungen, Aktuelles und Bibliothek werden im Browser über [Pages CMS](https://app.pagescms.org) bearbeitet. Die Konfiguration liegt in `.pages.yml`.
- Redakteur:innen werden in Pages CMS per E-Mail eingeladen und brauchen kein GitHub-Konto.
- Jedes Speichern ist ein Commit auf `main` mit `deploy` in der Nachricht, die Webseite wird danach automatisch neu gebaut (dauert ca. 1–2 Minuten).
- Jede Veranstaltung ist eine eigene Datei in `data/events/` (`<datum>-<titel>.yaml`). Auf der Webseite wird nach Datum sortiert, vergangene Veranstaltungen verschwinden mit dem täglichen Neubau.
- Startseite und Layout-Seiten (viele Shortcodes) sind bewusst nicht im CMS und werden direkt im Repository bearbeitet.

## Entwicklung
### Dev Container
Der einfachste Weg ist, den mitgelieferten Devcontainer zu verwenden: `CMD SHIFT P` / `CTRL SHIFT P` → `Dev Containers: Reopen in container`.

### Manuelle Installation (Mac)
```sh
brew install hugo uv
make init    # Theme (Git-Submodule) laden
make start   # lokaler Server auf http://localhost:1313/
```

### Veröffentlichen
GitHub Actions baut und veröffentlicht die Seite (`.github/workflows/pages.yaml`):
- bei Commits auf `main`, deren Nachricht `deploy` enthält,
- täglich um 3 Uhr (UTC) automatisch,
- manuell über den Actions-Tab.

## Umfrage PLK
`make evaluate-plk-survey` wertet den Umfrage-Export aus und schreibt die aggregierten Ergebnisse nach `data/plk.yaml`. Der Export selbst (`data/Wohnprojekte in der PLK.json`) enthält Namen und E-Mail-Adressen und darf **nie** committet werden (`.gitignore`).

## TODO (Content)
- [Broschüre raumFAIR](https://raumfair.de/wp-content/uploads/2022/03/ZAM-Projekt_raumFAIR_a.pdf)
- [Leika Leipzig](https://leika-leipzig.com)
- https://vimeo.com/716729861
- [Wohnen im Alter - Kalkbreite](https://www.kalkbreite.net/wp-content/uploads/2023/02/230219_Doku_Zollhaus2023_web.pdf)
- Klimaschutz im gemeinsamen Wohnen
- Mobilitätskonzepte
- Energiegenossenschaft

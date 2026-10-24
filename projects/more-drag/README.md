# MoRe-Drag project page

Academic project page for **Drag as Evidence: Motion-Grounded Latent Recomposition for Drag-Based Editing**, NeurIPS 2026.

URL: https://xinyu-pu.github.io/projects/more-drag/

Adapted directly from the GeoDrag page in this repository. Uses its Bulma layout and original stylesheet, with small spacing and typography refinements in `styles.css`. No build step is required.

- `index.html`: paper information, abstract, method, experiments, and citation.
- `styles.css`: small overrides to the GeoDrag layout.
- `script.js`: BibTeX copying.
- `assets/`: the supplied paper PDF and figures rendered from Figures 1, 3, and 6. Original labels and annotations are retained.
- `static/css/`: the existing GeoDrag/Bulma styles.

Quantitative results are transcribed from Table 1, including both base editors and their MoRe-Drag variants. Code and data are not yet linked; replace the “Code (coming soon)” status after public release. The citation omits unconfirmed proceedings volume, page numbers, and DOI.

For local preview, run `python3 -m http.server 8765` from the repository root, then open `http://localhost:8765/projects/more-drag/`.

Template attribution and CC BY-SA 4.0 notice are retained in the page footer.

'use strict';
document.getElementById('copy-citation').addEventListener('click', async () => {
  const citation = document.getElementById('bibtex-code');
  const status = document.getElementById('copy-status');
  try {
    await navigator.clipboard.writeText(citation.textContent);
    document.getElementById('copy-citation').textContent = 'Copied';
    status.textContent = 'BibTeX copied to clipboard.';
  } catch {
    const range = document.createRange();
    range.selectNodeContents(citation);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    status.textContent = 'Citation selected. Press Ctrl+C or ⌘C to copy.';
  }
});

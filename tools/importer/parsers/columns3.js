/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Extract first block name as Header
  rows.push(['Columns']);

  // Extract content elements
  const contentCells = [];

  // Extract left column: unordered list and the CTA link
  const leftColumn = document.createElement('div');
  const unorderedList = element.querySelector('ul');
  if (unorderedList) {
    leftColumn.append(unorderedList.cloneNode(true));
  }

  const ctaLink = element.querySelector('a');
  if (ctaLink) {
    const link = document.createElement('a');
    link.href = ctaLink.href;
    link.textContent = ctaLink.textContent;
    leftColumn.append(link);
  }
  contentCells.push(leftColumn);

  // Extract right column: images and preview link
  const rightColumn = document.createElement('div');
  const images = element.querySelectorAll('img');
  if (images.length > 0) {
    images.forEach((img) => {
      rightColumn.append(img.cloneNode(true));
    });
  }

  const previewLink = element.querySelector('a.preview-link');
  if (previewLink) {
    const previewAnchor = document.createElement('a');
    previewAnchor.href = previewLink.href;
    previewAnchor.textContent = previewLink.textContent;
    rightColumn.append(previewAnchor);
  }
  contentCells.push(rightColumn);

  rows.push(contentCells);

  // Create table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace element with table
  element.replaceWith(table);
}
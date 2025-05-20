/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Extract header row
  const headerRow = ['Columns'];
  cells.push(headerRow);

  // Extract content rows dynamically
  const contentRow1 = [];

  // Extract image dynamically and handle missing image
  const img = element.querySelector('img');
  if (img && img.hasAttribute('src')) {
    const imageElement = document.createElement('img');
    imageElement.src = img.getAttribute('src');
    imageElement.alt = img.getAttribute('alt') || '';
    contentRow1.push(imageElement);
  }

  // Extract text and description dynamically and handle missing description
  const description = element.querySelector('.text-image-item__description');
  if (description) {
    const descriptionElement = document.createElement('div');
    descriptionElement.innerHTML = description.innerHTML;
    contentRow1.push(descriptionElement);
  }

  if (contentRow1.length > 0) {
    cells.push(contentRow1);
  }

  // Create table dynamically
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the table
  element.replaceWith(table);
}
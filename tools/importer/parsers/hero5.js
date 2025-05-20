/* global WebImporter */

export default function parse(element, { document }) {
  // Extract relevant content from the HTML
  const backgroundImageElement = element.querySelector('.hero-banner-image');
  const backgroundImageUrl = backgroundImageElement ? backgroundImageElement.style.backgroundImage.replace('url(', '').replace(')', '') : '';
  const titleElement = element.querySelector('.hero-banner-image__title');
  const imageElement = element.querySelector('.hero-banner-image__img');

  // Create and validate extracted elements
  const title = titleElement ? document.createElement('h2') : null;
  if (title) {
    title.textContent = titleElement.textContent.trim();
  }

  const image = imageElement ? document.createElement('img') : null;
  if (image) {
    image.src = imageElement.src;
    image.alt = imageElement.alt;
  }

  const contentRow = [];
  if (backgroundImageUrl) {
    const backgroundImage = document.createElement('div');
    backgroundImage.style.backgroundImage = `url(${backgroundImageUrl})`;
    contentRow.push(backgroundImage);
  }
  if (title) {
    contentRow.push(title);
  }
  if (image) {
    contentRow.push(image);
  }

  // Ensure each row matches the example format
  const cells = [
    ['Hero'], // Header row
    [contentRow] // Second row with extracted content
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the structured table
  element.replaceWith(blockTable);
}
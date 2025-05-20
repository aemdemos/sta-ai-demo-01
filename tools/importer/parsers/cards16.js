/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Add header row for the block name
  rows.push(['Cards']);

  // Process each card from the HTML
  const cards = element.querySelectorAll('.teaser-icon-item');

  cards.forEach((card) => {
    const cardImage = card.querySelector('img');
    const cardTitle = card.querySelector('.teaser-icon-item__title');
    const cardDesc = card.querySelector('.teaser-icon-item__desc');
    const cardCTA = card.querySelector('.teaser-icon-item__cta button');

    const imageElement = document.createElement('img');
    imageElement.src = cardImage?.src || '';
    imageElement.alt = cardImage?.alt || '';

    const contentElements = [];

    if (cardTitle) {
      const titleElement = document.createElement('strong');
      titleElement.textContent = cardTitle.textContent.trim();
      contentElements.push(titleElement);
    }

    if (cardDesc) {
      const descElement = document.createElement('p');
      descElement.textContent = cardDesc.textContent.trim();
      contentElements.push(descElement);
    }

    if (cardCTA) {
      const ctaElement = document.createElement('a');
      ctaElement.href = cardCTA.getAttribute('data-component') || '#';
      ctaElement.textContent = cardCTA.textContent.trim();
      contentElements.push(ctaElement);
    }

    rows.push([imageElement, contentElements]);
  });

  // Create the table using the helper function
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
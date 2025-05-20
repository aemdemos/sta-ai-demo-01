/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to create rows for cards
  const getCardRow = (card) => {
    const image = card.querySelector('.icon-item__icon');
    const content = card.querySelector('.icon-item__content');
    
    const imageElement = document.createElement('img');
    imageElement.src = image.src;
    imageElement.alt = image.alt;

    const textContent = [];
    const title = content.querySelector('strong');
    if (title) {
      const headingElement = document.createElement('h3');
      headingElement.textContent = title.textContent;
      textContent.push(headingElement);
    }
    const description = content.querySelector('p');
    if (description) {
      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = description.textContent.replace(title.textContent, '');
      textContent.push(descriptionElement);
    }

    return [imageElement, textContent];
  };

  // Extract cards from the element
  const cards = Array.from(element.querySelectorAll('.icon-item'));

  // Structure the table with a header row and rows for each card
  const rows = [['Cards'], ...cards.map((card) => getCardRow(card))];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
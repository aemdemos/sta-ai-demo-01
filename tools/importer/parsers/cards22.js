/* global WebImporter */
export default function parse(element, { document }) {
  // Extract table header dynamically matching Example Markdown Structure
  const cardsHeader = ['Cards'];

  // Prepare rows dynamically based on `.teaser-item` elements
  const rows = Array.from(element.querySelectorAll('.teaser-item')).map(card => {
    // Extract image element dynamically
    const image = card.querySelector('img');
    const imgElement = document.createElement('img');
    imgElement.src = image.src;
    imgElement.alt = image.alt;

    // Extract text content dynamically
    const descriptionElement = card.querySelector('.teaser-item__desc p');
    const description = descriptionElement ? descriptionElement.textContent : '';

    return [imgElement, description];
  });

  // Combine header and rows to create final table data
  const tableData = [cardsHeader, ...rows];

  // Generate block table using WebImporter helper method
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace original element with the block table
  element.replaceWith(block);
}
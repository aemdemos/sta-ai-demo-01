/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the carousel items
  const items = element.querySelectorAll('.teaser-item');

  // Prepare the array for the table rows
  const rows = [];
  rows.push(['Cards']); // Add the header row

  items.forEach((item) => {
    const image = item.querySelector('img');
    const description = item.querySelector('.teaser-item__desc p');

    if (image && description) {
      const imgElement = document.createElement('img');
      imgElement.src = image.src;
      imgElement.alt = image.alt;

      const textContent = document.createElement('div');
      textContent.textContent = description.textContent;

      rows.push([imgElement, textContent]);
    }
  });

  // Create the table using WebImporter.DOMUtils.createTable
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
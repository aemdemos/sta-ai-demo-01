/* global WebImporter */
export default function parse(element, { document }) {
  const sections = [];

  // Split the content into sections based on the separator
  const rawSections = element.innerHTML.split('---');

  rawSections.forEach((rawSection, index) => {
    const container = document.createElement('div');
    container.innerHTML = rawSection;

    const columns = [];
    container.querySelectorAll('.two-column-icon-item__col').forEach((col) => {
      const cellContent = [];

      // Extract image and combine with text
      const img = col.querySelector('img');
      if (img) {
        const image = document.createElement('img');
        image.src = img.src;
        image.alt = img.alt || '';
        cellContent.push(image);
      }

      const text = col.querySelector('.icon-item__content p strong');
      if (text) {
        cellContent.push(document.createTextNode(text.textContent.trim()));
      }

      columns.push(cellContent); // Place combined content into the same cell
    });

    // Create table for the section
    const headerRow = ['Columns'];
    const tableRows = [headerRow, columns];
    const table = WebImporter.DOMUtils.createTable(tableRows, document);

    // Add section metadata separator if not the first section
    if (index > 0) {
      const hr = document.createElement('hr');
      sections.push(hr);
    }

    sections.push(table);
  });

  // Replace the original element with the processed sections
  element.replaceWith(...sections);
}
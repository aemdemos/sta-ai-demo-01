/* global WebImporter */
export default function parse(element, { document }) {
    // Helper to create the block table
    const rows = [];

    // Add the header row
    const headerRow = ['Columns'];
    rows.push(headerRow);

    const itemsContainer = element.querySelector('.icon-block__items');
    const items = itemsContainer ? itemsContainer.querySelectorAll('.teaser-icon-item') : [];

    const row = Array.from(items).map(item => {
        const img = item.querySelector('img');
        const title = item.querySelector('.teaser-icon-item__title');

        const cellContent = [];

        if (img) {
            const imageElement = document.createElement('img');
            imageElement.src = img.src;
            imageElement.alt = img.alt || '';
            cellContent.push(imageElement);
        }

        if (title) {
            const titleElement = document.createElement('p');
            titleElement.textContent = title.textContent.trim();
            cellContent.push(titleElement);
        }

        return cellContent;
    });

    rows.push(row);

    // Create the block table
    const table = WebImporter.DOMUtils.createTable(rows, document);

    // Replace the original element
    element.replaceWith(table);
}
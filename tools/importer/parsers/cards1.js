/* global WebImporter */
export default function parse(element, { document }) {
    const cells = [['Cards']];

    const items = element.querySelectorAll('.teaser-item');

    items.forEach((item) => {
        // Extract image
        const image = document.createElement('img');
        const imgElement = item.querySelector('img');
        image.src = imgElement ? imgElement.src : '';

        // Extract title
        const titleElement = item.querySelector('.teaser-item__title');
        const title = titleElement ? document.createElement('h3') : null;
        if (title) title.textContent = titleElement.textContent.trim();

        // Extract subtitle
        const subtitleElement = item.querySelector('.teaser-item__subtitle');
        const subtitle = subtitleElement ? document.createElement('h4') : null;
        if (subtitle) subtitle.textContent = subtitleElement.textContent.trim();

        // Extract description
        const descriptionElement = item.querySelector('.teaser-item__desc');
        const description = descriptionElement ? document.createElement('p') : null;
        if (description) description.innerHTML = descriptionElement.innerHTML.trim();

        // Extract CTA link
        const button = item.querySelector('a');
        const link = document.createElement('a');
        if (button) {
            link.href = button.href;
            link.textContent = button.textContent.trim();
        }

        // Combine content for the text cell
        const textContent = [subtitle, title, description, link].filter(el => el && (el.textContent || el.href));

        // Add row to cells array
        cells.push([image, textContent]);
    });

    // Create table using WebImporter.DOMUtils.createTable()
    const table = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the new table
    element.replaceWith(table);
}
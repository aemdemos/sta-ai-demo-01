/* global WebImporter */
export default function parse(element, { document }) {
    // Extract relevant content from the input element
    const img = element.querySelector('img');
    const title = element.querySelector('h5');

    // Ensure the image and title are properly extracted
    const imgElement = img ? document.createElement('img') : null;
    if (imgElement) {
        imgElement.src = img.src;
        imgElement.alt = img.alt;
    }

    const titleText = title ? title.textContent.trim() : '';

    // Create table cells
    const cells = [
        ['Columns'], // Header row EXACTLY matching the example
        [imgElement, titleText].filter(Boolean), // Ensure content is populated dynamically
    ];

    // Create block table
    const block = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the new block table
    element.replaceWith(block);
}
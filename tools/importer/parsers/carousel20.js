/* global WebImporter */
export default function parse(element, { document }) {
    // Define header row
    const headerRow = ['Carousel'];

    // Initialize rows for carousel content
    const rows = [];

    // Attempt to dynamically extract carousel-like structure
    const images = element.querySelectorAll('.hero-banner-video__video-wrapper img');
    const texts = element.querySelectorAll('.hero-banner-video__text');

    if (images.length === 0 || texts.length === 0) {
        console.error('No valid carousel structure found');
        return;
    }

    images.forEach((image, index) => {
        const textContent = [];

        // Extract title
        const title = texts[index]?.querySelector('h2');
        if (title) {
            const titleElement = document.createElement('strong');
            titleElement.textContent = title.textContent.trim();
            textContent.push(titleElement);
        }

        // Extract description
        const description = texts[index]?.querySelector('p');
        if (description) {
            const descriptionElement = document.createElement('p');
            descriptionElement.textContent = description.textContent.trim();
            textContent.push(descriptionElement);
        }

        rows.push([image, textContent]);
    });

    // Create table using WebImporter.DOMUtils.createTable
    const tableData = [headerRow, ...rows];
    const carouselTable = WebImporter.DOMUtils.createTable(tableData, document);

    // Replace original element with the new carousel block table
    element.replaceWith(carouselTable);
}
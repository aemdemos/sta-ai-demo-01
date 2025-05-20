/* global WebImporter */
export default function parse(element, { document }) {
    // Extract necessary parts
    const heroBanner = element.querySelector('.hero-banner-image');
    const backgroundImageUrl = heroBanner?.style.backgroundImage.match(/url\("(.*?)"\)/)?.[1];
    const title = heroBanner?.querySelector('.hero-banner-image__title')?.textContent.trim();
    const description = heroBanner?.querySelector('.hero-banner-image__desc')?.textContent.trim();
    const imageElement = heroBanner?.querySelector('.hero-banner-image__img');
    const imageSrc = imageElement?.src;
    const imageAlt = imageElement?.alt;

    // Construct the table data
    const tableData = [
        ['Hero'], // Correct header row with only one column
        [
            (() => {
                const content = [];
                if (backgroundImageUrl) {
                    const img = document.createElement('img');
                    img.src = backgroundImageUrl;
                    img.alt = 'Background Image';
                    content.push(img);
                }
                if (title) {
                    const h1 = document.createElement('h1');
                    h1.textContent = title;
                    content.push(h1);
                }
                if (description) {
                    const p = document.createElement('p');
                    p.textContent = description;
                    content.push(p);
                }
                if (imageSrc) {
                    const img = document.createElement('img');
                    img.src = imageSrc;
                    img.alt = imageAlt || 'Hero Image';
                    content.push(img);
                }
                return content;
            })()
        ]
    ];

    // Create the block table
    const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

    // Replace the original element with the block table
    element.replaceWith(blockTable);
}
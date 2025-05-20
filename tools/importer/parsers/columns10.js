/* global WebImporter */
export default function parse(element, { document }) {
  // Extract dynamic content from the provided HTML
  const textContent = element.querySelector('.hero-banner-image-descr__text h3');
  const image = element.querySelector('.hero-banner-image-descr__image');

  // Handle cases with missing or empty data
  const text = textContent ? textContent.textContent.trim() : 'Missing content';
  const img = image ? image.cloneNode(true) : document.createTextNode('Missing image');

  // Create the block table for the content
  const cells = [
    ['Columns'], // Correct header row matching example structure
    [
      document.createTextNode(text), // Text content extracted and handled properly
      img // Cloned image element or fallback
    ]
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}
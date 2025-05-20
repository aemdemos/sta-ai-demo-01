/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to extract text content
  const extractTextContent = (parent) => {
    if (!parent) return '';
    return parent.textContent.trim();
  };

  // Create header row matching the example
  const headerRow = ['Cards (no images)'];

  // Extract relevant content
  const cards = [];

  // First card: "I'm not done..."
  const firstCardTitle = element.querySelector('.text-item__title');
  const firstCardDescription = element.querySelector('.text-item__content');
  let firstCardContent = '';

  if (firstCardTitle) {
    firstCardContent += `<h2>${extractTextContent(firstCardTitle)}</h2>`;
  }

  if (firstCardDescription) {
    firstCardContent += `<p>${extractTextContent(firstCardDescription)}</p>`;
  }

  if (firstCardContent) {
    cards.push([firstCardContent]);
  }

  // Second card: "An overview of the programme"
  const overviewSection = element.querySelector('.icons-block-item');
  const overviewTitle = overviewSection.querySelector('.icons-block-item__title');
  const overviewIconItems = overviewSection.querySelectorAll('.icon-item');
  let overviewCardContent = '';

  if (overviewTitle) {
    overviewCardContent += `<h2>${extractTextContent(overviewTitle)}</h2>`;
  }

  overviewIconItems.forEach((iconItem) => {
    const iconTitle = iconItem.querySelector('.icon-item__title');
    const iconDescription = iconItem.querySelector('.icon-item__content');

    if (iconTitle) {
      overviewCardContent += `<h5>${extractTextContent(iconTitle)}</h5>`;
    }

    if (iconDescription) {
      overviewCardContent += `<p>${extractTextContent(iconDescription)}</p>`;
    }
  });

  if (overviewCardContent) {
    cards.push([overviewCardContent]);
  }

  // Combine header and content rows
  const cells = [headerRow, ...cards];

  // Block table creation
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
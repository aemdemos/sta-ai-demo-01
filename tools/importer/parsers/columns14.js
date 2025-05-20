/* global WebImporter */
export default function parse(element, { document }) {
  // Create the header row for the table
  const headerRow = ['Columns'];

  // Extract content from the first column - text content
  const textContent = element.querySelector('.tree-column-teaser-block__text');
  const textParagraphs = textContent ? Array.from(textContent.querySelectorAll('p')).map(p => p.cloneNode(true)) : [];

  // Extract content from the second column - image and download link
  const imageContent = element.querySelector('.simple-teaser-item img');
  const downloadLink = element.querySelector('.simple-teaser-item a');

  // Construct the cell values for the second column
  const secondColumnContent = [];
  if (imageContent) {
    secondColumnContent.push(imageContent.cloneNode(true));
  }
  if (downloadLink) {
    const linkClone = downloadLink.cloneNode(true);
    secondColumnContent.push(linkClone);
  }

  // Create the rows for the table
  const columnRow = [
    textParagraphs,
    secondColumnContent.length > 0 ? secondColumnContent : ['No content available'],
  ];

  // Create the table block
  const tableData = [
    headerRow,
    columnRow,
  ];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the table block
  element.replaceWith(blockTable);
}
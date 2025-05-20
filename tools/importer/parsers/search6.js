/* global WebImporter */
export default function parse(element, { document }) {
  // Validate input element and document
  if (!element || !document) {
    console.error('Invalid arguments passed to parse function.');
    return;
  }

  // Extract the search form element
  const searchForm = element.querySelector('.header__search-form form');

  // Validate that the form exists
  if (!searchForm) {
    console.error('Search form not found within the element.');
    return;
  }

  // Extract the action URL dynamically from the form
  const actionURL = searchForm.getAttribute('action');

  // Validate the action URL
  if (!actionURL) {
    console.error('Form action URL is missing or invalid.');
    return;
  }

  // Create the header row dynamically, exactly matching the example
  const headerRow = ['Search'];

  // Create the content row dynamically using the extracted URL
  const contentRow = [actionURL];

  // Build the table structure
  const cells = [headerRow, contentRow];

  // Create the table block using WebImporter.DOMUtils.createTable
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
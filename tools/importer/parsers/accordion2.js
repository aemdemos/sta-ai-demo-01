/* global WebImporter */

export default function parse(element, { document }) {
  const rows = [];

  // Header row (matches the example exactly)
  rows.push(['Accordion']);

  // Process each item in the menu
  const menuItems = element.querySelectorAll('.header-main-nav-item');

  menuItems.forEach((menuItem) => {
    const titleElement = menuItem.querySelector('a > .menu-item-title');
    const title = titleElement ? titleElement.textContent.trim() : '';

    // Skip rows with empty titles
    if (!title) return;

    const dropdownMenu = menuItem.querySelector('ul.dropdown-menu');
    const contents = [];

    if (dropdownMenu) {
      const subItems = dropdownMenu.querySelectorAll('.header-main-nav-item > a');

      subItems.forEach((subItem) => {
        const subTitleElement = subItem.querySelector('.menu-item-title');
        const subTitle = subTitleElement ? subTitleElement.textContent.trim() : '';

        const link = subItem.getAttribute('href');

        // Skip rows with empty subtitles or links
        if (!subTitle || !link) return;

        const linkElement = document.createElement('a');
        linkElement.href = link;
        linkElement.textContent = subTitle;

        contents.push(linkElement);
      });
    }

    // Consolidate child items into their parent row
    rows.push([title, contents.length ? contents : '']);
  });

  // Consolidate rows to match example markdown structure
  const consolidatedRows = rows.filter((row, index) => {
    if (index === 0) return true; // Keep header row
    return row[1] && row[1].length > 0; // Keep rows with content
  });

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(consolidatedRows, document);
  element.replaceWith(table);
}
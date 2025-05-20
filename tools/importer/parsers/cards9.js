/* global WebImporter */
export default function parse(element, { document }) {
  const cards = [];

  // Extract all teaser items
  const items = element.querySelectorAll('.teaser-item');
  items.forEach((item) => {
    const image = item.querySelector('img');
    const title = item.querySelector('.teaser-item__title');
    const description = item.querySelector('.teaser-item__desc p');
    const cta = item.querySelector('a');

    const imageElement = document.createElement('img');
    imageElement.src = image.src;
    imageElement.alt = image.alt;

    const textContent = [];
    if (title) {
      const titleElement = document.createElement('strong');
      titleElement.textContent = title.textContent;
      textContent.push(titleElement);
      textContent.push(document.createElement('br'));
    }
    if (description) {
      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = description.textContent;
      textContent.push(descriptionElement);
      textContent.push(document.createElement('br'));
    }
    if (cta) {
      const ctaElement = document.createElement('a');
      ctaElement.href = cta.href;
      ctaElement.textContent = cta.textContent;
      textContent.push(ctaElement);
    }

    cards.push([imageElement, textContent]);
  });

  // Create the block table
  const cells = [
    ['Cards'],
    ...cards,
  ];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(blockTable);
}
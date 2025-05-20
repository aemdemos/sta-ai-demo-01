/* global WebImporter */
export default function parse(element, { document }) {
  // Extract necessary elements from the input
  const titleElement = element.querySelector('.text-with-bg__title');
  const title = titleElement ? (() => {
    const heading = document.createElement('h1');
    heading.textContent = titleElement.textContent.trim();
    return heading;
  })() : null;

  const descriptionElement = element.querySelector('.text-with-bg__desc');
  const description = descriptionElement ? (() => {
    const div = document.createElement('div');
    div.innerHTML = descriptionElement.innerHTML.trim();
    return div;
  })() : null;

  const ctaElement = element.querySelector('a.button');
  const cta = ctaElement ? (() => {
    const link = document.createElement('a');
    link.href = ctaElement.href;
    link.textContent = ctaElement.textContent.trim();
    return link;
  })() : null;

  // Extract background image URL
  const backgroundImageElement = element.querySelector('.text-with-bg__bg');
  const backgroundImageStyle = (backgroundImageElement && backgroundImageElement.style.backgroundImage) || '';
  const backgroundImageUrlMatch = backgroundImageStyle.match(/url\(['"]?(.*?)['"]?\)/);
  const backgroundImageUrl = backgroundImageUrlMatch ? backgroundImageUrlMatch[1] : null;

  const backgroundImage = backgroundImageUrl ? (() => {
    const img = document.createElement('img');
    img.src = backgroundImageUrl;
    return img;
  })() : null;

  // Combine all content into a single cell
  const combinedContent = (() => {
    const fragment = document.createDocumentFragment();
    if (backgroundImage) fragment.appendChild(backgroundImage);
    if (title) fragment.appendChild(title);
    if (description) fragment.appendChild(description);
    if (cta) fragment.appendChild(cta);
    return fragment;
  })();

  // Create table cells with correct structure
  const cells = [
    ['Hero'],
    [combinedContent]
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
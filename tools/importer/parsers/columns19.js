/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the title
  const titleElement = element.querySelector('.hero-banner-image-descr__title');
  const title = titleElement ? titleElement.textContent.trim() : '';

  // Extract the description
  const descriptionElement = element.querySelector('.hero-banner-image-descr__text > p');
  const description = descriptionElement ? descriptionElement.textContent.trim() : '';

  // Extract the download link
  const downloadLinkElement = element.querySelector('.cta-download-link');
  const downloadLink = downloadLinkElement ? downloadLinkElement.href : '';
  const downloadText = downloadLinkElement ? downloadLinkElement.textContent.trim() : '';

  // Extract the image
  const imageElement = element.querySelector('.hero-banner-image-descr__image');
  const imageSrc = imageElement ? imageElement.src : '';
  const imageAlt = imageElement ? imageElement.alt : '';

  // Combine the title and description into a single cell
  const combinedContent = document.createElement('div');
  if (title) {
    const titleNode = document.createElement('p');
    titleNode.textContent = title;
    combinedContent.appendChild(titleNode);
  }
  if (description) {
    const descriptionNode = document.createElement('p');
    descriptionNode.textContent = description;
    combinedContent.appendChild(descriptionNode);
  }

  // Create the table cells with properly structured rows
  const cells = [
    ['Columns'],
    [
      combinedContent,
      [
        (() => {
          const img = document.createElement('img');
          img.src = imageSrc;
          img.alt = imageAlt;
          return img;
        })(),
        (() => {
          const link = document.createElement('a');
          link.href = downloadLink;
          link.textContent = downloadText;
          return link;
        })(),
      ],
    ],
  ];

  // Create the table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
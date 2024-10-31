// Define the BookPreview class that extends the HTMLElement base class
class BookPreview extends HTMLElement {
    constructor() {
        super(); // Call the parent class (HTMLElement) constructor
        this.attachShadow({ mode: 'open' }); // Attach a shadow DOM for encapsulated styling and markup
        this.render(); // Initial render of the component
    }

    // Lifecycle method triggered when the element is added to the DOM
    connectedCallback() {
        // Ensure attribute-based data is available when the component is added to the DOM
        this.render();
    }

    // Specify the attributes to watch for changes
    static get observedAttributes() {
        return ['title', 'author', 'image', 'id']; // These attributes will trigger re-rendering if changed
    }

    // Called whenever an observed attribute is changed
    attributeChangedCallback() {
        // Re-render if any observed attribute changes
        this.render();
    }

    // Render method to define the HTML structure and styles for the component
    render() {
        // HTML structure for book preview
        const template = document.createElement('template'); // Create a template element to hold the markup and styles
        template.innerHTML = `
            <style>
                /* Define styling for the preview component */
                .preview {
  border-width: 0;
  width: 100%;
  font-family: Roboto, sans-serif;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  text-align: left;
  border-radius: 8px;
  border: 1px solid rgba(var(--color-dark), 0.15);
  background: rgba(var(--color-light), 1);
}

@media (min-width: 60rem) {
  .preview {
    padding: 1rem;
  }
}

.preview_hidden {
  display: none;
}

.preview:hover {
  background: rgba(var(--color-blue), 0.05);
}

.preview__image {
  width: 48px;
  height: 70px;
  object-fit: cover;
  background: grey;
  border-radius: 2px;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
}

.preview__info {
  padding: 1rem;
}

.preview__title {
  margin: 0 0 0.5rem;
  font-weight: bold;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
  color: rgba(var(--color-dark), 0.8)
}

.preview__author {
  color: rgba(var(--color-dark), 0.4);
}
            </style>
            <button class="preview" data-preview="${this.getAttribute('id')}">
                <img class="preview__image" src="${this.getAttribute('image')}" />
                <div class="preview__info">
                    <h3 class="preview__title">${this.getAttribute('title')}</h3>
                    <div class="preview__author">${this.getAttribute('author')}</div>
                </div>
            </button>
        `;

        // Clear previous content and attach the new template
        this.shadowRoot.innerHTML = ''; // Clear any previous content in the shadow root
        this.shadowRoot.appendChild(template.content.cloneNode(true)); // Attach the template content to the shadow root
    }
}

// Define the custom <book-preview> element, linking it to the BookPreview class
customElements.define('book-preview', BookPreview);


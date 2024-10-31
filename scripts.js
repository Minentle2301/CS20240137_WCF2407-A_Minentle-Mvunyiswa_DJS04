// Import data like books, authors, genres, and a constant for books per page
import { books, authors, genres, BOOKS_PER_PAGE } from './data.js';

// Create a class for handling the book list
class BookList {
    constructor() {
        this.page = 1; // Set initial page to 1
        this.matches = books; // Set initial book matches to all books
        this.init(); // Initialize app setup and rendering
    }

    // Initialize and call essential functions to set up the page
    init() {
        this.renderBooks(); // Display initial set of books
        this.renderGenres(); // Populate genres filter dropdown
        this.renderAuthors(); // Populate authors filter dropdown
        this.setupTheme(); // Set theme according to system preference
        this.setupEventListeners(); // Set up event listeners for interaction
        this.updateShowMoreButton(); // Update the "Show More" button text and state
    }

    // Renders initial set of books on the page
    renderBooks() {
        const starting = document.createDocumentFragment(); // Create a fragment for efficient DOM updates
        const bookPreviews = this.matches.slice(0, BOOKS_PER_PAGE).map(this.createBookPreview.bind(this)); // Slice and create previews
        bookPreviews.forEach(element => starting.appendChild(element)); // Append previews to fragment
        document.querySelector('[data-list-items]').appendChild(starting); // Add fragment to the DOM
    }

    // Create individual book preview element
    createBookPreview({ author, id, image, title }) {
        const element = document.createElement('button'); // Create button for preview
        element.classList.add('preview'); // Add 'preview' class
        element.setAttribute('data-preview', id); // Add book ID for data-attribute
        element.innerHTML = ` // Set up preview structure with image, title, and author name
            <img class="preview__image" src="${image}" />
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[author]}</div>
            </div>
        `;
        return element; // Return constructed preview element
    }

    // Renders genre options for filtering books
    renderGenres() {
        const genreHtml = this.createSelectOptions(genres, 'any', 'All Genres'); // Create options fragment
        document.querySelector('[data-search-genres]').appendChild(genreHtml); // Append genres to dropdown
    }

    // Renders author options for filtering books
    renderAuthors() {
        const authorsHtml = this.createSelectOptions(authors, 'any', 'All Authors'); // Create options fragment
        document.querySelector('[data-search-authors]').appendChild(authorsHtml); // Append authors to dropdown
    }

    // Utility for creating option elements for dropdowns
    createSelectOptions(data, defaultValue, defaultText) {
        const fragment = document.createDocumentFragment(); // Create fragment for options
        const firstElement = document.createElement('option'); // Create default option
        firstElement.value = defaultValue; // Set default option value
        firstElement.innerText = defaultText; // Set default option text
        fragment.appendChild(firstElement); // Append default option

        Object.entries(data).forEach(([id, name]) => { // Loop through data entries
            const element = document.createElement('option'); // Create new option element
            element.value = id; // Set option value
            element.innerText = name; // Set option text
            fragment.appendChild(element); // Append option to fragment
        });

        return fragment; // Return fragment with all options
    }

    // Sets up theme based on system preference
    setupTheme() {
        const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches; // Check for dark mode
        const theme = isDarkMode ? 'night' : 'day'; // Choose theme
        document.querySelector('[data-settings-theme]').value = theme; // Set theme in settings
        this.updateThemeStyles(theme); // Apply theme styles
    }

    // Updates styles according to theme
    updateThemeStyles(theme) {
        if (theme === 'night') { // If night theme, apply dark colors
            document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
            document.documentElement.style.setProperty('--color-light', '10, 10, 20');
        } else { // Else apply light colors
            document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
            document.documentElement.style.setProperty('--color-light', '255, 255, 255');
        }
    }

    // Sets up event listeners for various interactive elements
    setupEventListeners() {
        document.querySelector('[data-search-cancel]').addEventListener('click', () => this.closeOverlay('[data-search-overlay]')); // Search cancel button
        document.querySelector('[data-settings-cancel]').addEventListener('click', () => this.closeOverlay('[data-settings-overlay]')); // Settings cancel button
        document.querySelector('[data-header-search]').addEventListener('click', () => this.openOverlay('[data-search-overlay]')); // Open search overlay
        document.querySelector('[data-header-settings]').addEventListener('click', () => this.openOverlay('[data-settings-overlay]')); // Open settings overlay
        document.querySelector('[data-list-close]').addEventListener('click', () => this.closeOverlay('[data-list-active]')); // Close book details
        document.querySelector('[data-settings-form]').addEventListener('submit', this.handleThemeChange.bind(this)); // Handle theme change
        document.querySelector('[data-search-form]').addEventListener('submit', this.handleSearch.bind(this)); // Handle search form submit
        document.querySelector('[data-list-button]').addEventListener('click', this.loadMoreBooks.bind(this)); // Load more books
        document.querySelector('[data-list-items]').addEventListener('click', this.showBookDetails.bind(this)); // Show book details on click
    }

    // Closes overlay modal based on selector
    closeOverlay(selector) {
        document.querySelector(selector).open = false; // Set overlay open attribute to false
    }

    // Opens overlay modal based on selector
    openOverlay(selector) {
        document.querySelector(selector).open = true; // Set overlay open attribute to true
        if (selector === '[data-search-overlay]') { // If opening search overlay, focus on search input
            document.querySelector('[data-search-title]').focus();
        }
    }

    // Handles theme change form submission
    handleThemeChange(event) {
        event.preventDefault(); // Prevent default form submission
        const formData = new FormData(event.target); // Get form data
        const { theme } = Object.fromEntries(formData); // Extract theme from form data
        this.updateThemeStyles(theme); // Update theme styles
        this.closeOverlay('[data-settings-overlay]'); // Close settings overlay
    }

    // Handles search functionality for filtering books
    handleSearch(event) {
        event.preventDefault(); // Prevent default form submission
        const formData = new FormData(event.target); // Get form data
        const filters = Object.fromEntries(formData); // Extract filters
        const result = this.filterBooks(filters); // Filter books based on criteria
        this.updateMatches(result); // Update matches based on result
        this.renderFilteredBooks(result); // Render filtered books
        this.updateShowMoreButton(); // Update "Show More" button
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
        this.closeOverlay('[data-search-overlay]'); // Close search overlay
    }

    // Filters books based on given criteria
    filterBooks(filters) {
        return books.filter(book => { // Filter through each book
            const genreMatch = filters.genre === 'any' || book.genres.includes(filters.genre); // Match genre
            const titleMatch = filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase()); // Match title
            const authorMatch = filters.author === 'any' || book.author === filters.author; // Match author
            return genreMatch && titleMatch && authorMatch; // Return book if all match
        });
    }

    // Updates matched books and displays no results message if needed
    updateMatches(result) {
        this.page = 1; // Reset page to 1 for filtered results
        this.matches = result; // Update matches with filtered results

        const messageElement = document.querySelector('[data-list-message]'); // Get no results message element
        messageElement.classList.toggle('list__message_show', result.length < 1); // Show message if no results
    }

    // Render filtered books to the list
    renderFilteredBooks(result) {
        document.querySelector('[data-list-items]').innerHTML = ''; // Clear current list
        const newItems = document.createDocumentFragment(); // Create fragment for efficiency
        const bookPreviews = result.slice(0, BOOKS_PER_PAGE).map(this.createBookPreview.bind(this)); // Slice and create previews
        bookPreviews.forEach(element => newItems.appendChild(element)); // Append previews to fragment
        document.querySelector('[data-list-items]').appendChild(newItems); // Add to DOM
    }

    // Updates "Show More" button text and disables if no more books
    updateShowMoreButton() {
        const button = document.querySelector('[data-list-button]'); // Get button element
        const remainingBooks = this.matches.length - (this.page * BOOKS_PER_PAGE); // Calculate remaining books
        button.disabled = remainingBooks <= 0; // Disable button if no books left
        button.innerHTML = `
            <span>Show more</span>
            <span class="list__remaining"> (${Math.max(remainingBooks, 0)})</span>
        `; // Update button text with remaining count
    }

    // Load more books into the list
    loadMoreBooks() {
        const fragment = document.createDocumentFragment(); // Create fragment for efficiency
        const nextBooks = this.matches.slice(this.page * BOOKS_PER_PAGE, (this.page + 1) * BOOKS_PER_PAGE); // Slice next set of books
        nextBooks.map(this.createBookPreview.bind(this)).forEach(element => fragment.appendChild(element)); // Append to fragment
        document.querySelector('[data-list-items]').appendChild(fragment); // Add to DOM
        this.page += 1; // Increment page count
        this.updateShowMoreButton(); // Update "Show More" button
    }

    // Show detailed information about a selected book
    showBookDetails(event) {
        const pathArray = Array.from(event.path || event.composedPath()); // Get event path
        const activeBook = pathArray.find(node => node?.dataset?.preview); // Find clicked preview button

        if (activeBook) { // If preview found, get book details
            const bookId = activeBook.dataset.preview; // Get book ID
            const active = books.find(book => book.id === bookId); // Find book in data
            if (active) { // If book found, populate details
                document.querySelector('[data-list-active]').open = true; // Open details overlay
                document.querySelector('[data-list-blur]').src = active.image; // Set background image
                document.querySelector('[data-list-image]').src = active.image; // Set book image
                document.querySelector('[data-list-title]').innerText = active.title; // Set book title
                document.querySelector('[data-list-subtitle]').innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`; // Set author and year
                document.querySelector('[data-list-description]').innerText = active.description; // Set description
            }
        }
    }
}

// Initialize the BookList application
new BookList();

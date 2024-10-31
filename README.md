# DJS03 Project Brief: Book Connect - Abstractions

Dive into the delightful world of "Book Connect," where literary adventures await at your fingertips! Browse, explore, and uncover your next great read from a vast, vibrant collection. Whether you're a fan of thrilling mysteries, epic fantasies, or heartwarming romances, "Book Connect" brings the magic of books directly to you. Happy reading! 

The "Book Connect" project provides an opportunity for students to refine a fully functional version of an application. The focus of this project is to enhance the code's maintainability, extendibility, and readability by applying concepts of objects and functions for abstraction. This will not only streamline future modifications but also consolidate students' understanding of higher-level programming concepts, including documentation, Styleguides, and abstraction principles.

![alt text](image.png)

#### Goals

- **Refactor Existing Code**: Analyse and refactor the given JavaScript and HTML code to improve its structure using objects and functions.
- **Implement Abstraction**: Use abstraction to hide the complex reality while exposing only the necessary parts. This involves creating more generic functions that can perform tasks in a more flexible way.
- **Documentation**: Write clear comments and documentation for the new code structure to explain the purpose and functionality of code blocks, functions, and objects.
- **Follow Styleguides**: Adhere to established coding conventions and Styleguides to ensure code readability and maintainability.

#### Tasks

1. **Code Analysis**: Start by understanding the current implementation of the "Book Connect" application, including its HTML structure and JavaScript functionality.
2. **Plan Refactoring**: Identify sections of the code that can be made more abstract and modular. Look for patterns and repetitive code that can be simplified.
3. **Implement Abstraction**:
   - **Objects**: Define objects to represent key elements of the application, such as books, authors, and genres. Utilise the provided data (e.g., `authors`, `genres`, `books`) to populate these objects.
   - **Functions**: Create functions that handle repetitive tasks, such as rendering the book list, handling user interactions, and applying filters.
4. **Enhance Functionality**: Ensure that the application remains fully functional after refactoring. Test all features to confirm that users can still search, filter, and view books as intended.
5. **Documentation and Comments**: Throughout the refactoring process, document your code. Provide comments that explain the purpose and functionality of objects and functions.
6. **Adherence to Styleguides**: Ensure your code follows JavaScript and HTML coding standards and best practices for readability and maintainability.

#### Discussion and Reflection

After completing the tasks, prepare a brief presentation for your coaching group on the following:
- The rationale behind the refactoring decisions made, including the choice of objects and functions.
- How abstraction has made the code more maintainable and extendable.
- Any challenges faced during the refactoring process and how they were overcome.
- Reflections on how this exercise has deepened your understanding of JavaScript programming concepts.

#### Submission Guidelines

Submit the refactored version of the "Book Connect" application, including all HTML, CSS, and JavaScript files. Ensure that your code is well-documented and adheres to the specified Styleguides. Include a written report covering the discussion and reflection points outlined above.

Make sure to submit your project to the LMS on the DJS03 Project Tab.

Table of Contents

Overview
Code Structure
Installation
Usage
Methods
Event Handling

Overview
The application dynamically renders a list of books from provided data and supports various functionalities, such as:


Displaying books in a preview grid with pagination
Filtering books by genre, author, or title
Displaying detailed information about each book
Customizing the application’s theme based on user preference or system settings
Code Structure
The application’s logic is encapsulated in the BookList class, which is divided into the following sections:


Data Imports: Book, author, genre data, and pagination constants are imported from a separate data file.

Initialization: The BookList constructor initializes key properties and calls the init() method to set up the UI.

UI Rendering Functions: Functions for rendering books, genres, authors, and filtered content to the DOM.

Theme Handling: Functions to detect system theme, apply styles, and manage theme preferences.

Event Handling: Functions that manage user interactions such as search, filtering, opening/closing overlays, and loading more books.
Installation

Ensure the data.js file is in the same directory, containing book, author, and genre data.

Usage
Display Books: On page load, a set number of books display in the preview grid.

Filter and Search: Use dropdowns for genres and authors, or the search bar, to filter books.

Theme Customization: The application theme adjusts to the system's dark mode, or users can manually set the theme in settings.
Pagination: Click the "Show More" button to load additional books.
Methods
Each function in the BookList class has a specific purpose, as outlined below:

constructor()
Initializes key properties such as page (pagination tracking) and matches (currently matched books).
Calls init() to set up the UI and prepare event listeners.
init()
Responsible for calling the primary rendering and setup functions:
renderBooks() displays the initial set of book previews.
renderGenres() and renderAuthors() populate genre and author dropdowns for filtering.
setupTheme() applies the theme based on system preference.
setupEventListeners() registers all user interactions.
updateShowMoreButton() initializes the "Show More" button.
renderBooks()
Dynamically renders books in a grid layout, appending them to a specified container. Uses createBookPreview() for each book.
createBookPreview({ author, id, image, title })
Creates an individual book preview component with image, title, and author.
Returns a button element that triggers book detail view on click.
renderGenres() and renderAuthors()
Populate the genre and author dropdown menus with options using createSelectOptions().
createSelectOptions(data, defaultValue, defaultText)
Utility function for generating option elements from data. Accepts a default option value and text.
setupTheme() and updateThemeStyles(theme)
Detects the user’s system theme and applies it. Updates theme styles based on user choice.
setupEventListeners()
Registers click and submit events for various elements (e.g., search cancel, settings cancel, form submissions).
closeOverlay(selector) and openOverlay(selector)
Opens or closes a modal overlay, useful for search and settings overlays.
handleThemeChange(event)
Updates theme based on user input from the settings form.
handleSearch(event)
Handles filtering of books based on the search form input, updating the matched books and rendering them.
filterBooks(filters)
Filters books based on user-specified criteria (title, genre, author).
updateMatches(result)
Updates the current matches with the search results and displays a message if no results are found.
renderFilteredBooks(result)
Renders the filtered list of books and clears previous results.
updateShowMoreButton()
Adjusts the "Show More" button based on the remaining number of books, disabling it if no more books are available.
loadMoreBooks()
Appends additional books to the existing list as the user navigates through pages.
showBookDetails(event)
Displays a detailed view of the selected book, including title, author, publication year, and description.
Event Handling
The application responds to various user interactions, primarily managed by setupEventListeners(). These include:

Overlay Control: Toggle search and settings overlays.
Form Submissions: Handle theme changes and search form submissions.


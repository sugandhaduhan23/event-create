# GIT REPO

# VIDEO LINK
  **https://drive.google.com/file/d/1rc4uM-fDH6ofdEOc38PFoAHwh6UgY2Fp/view?usp=sharing**

# Project Setup
  
  ## Run the following command
    npm install
  
  ## Start the server
    npm run dev

# Database

  1. No setup required.
  2. The initial data is loaded in the indexedDB. Hence once the application loads in the browser, a utility function has been created which will load the data in the DB.
  3. Initial data will just have Name, Email and age field.

# Functional Features 

  1. The initial data is automatically loaded in the `IndexedDB` when the application starts.  
  2. Users can toggle between `light` and `dark themes` through the header.  
  3. The `Add User` button opens a sliding window containing a user form. After submitting the form, the new user is displayed in the `table`.  
  4. The fields `Name`, `Age`, and `Email` are mandatory when adding a new entry.  
  5. Users can create `dynamic fields` for the table by clicking `Add Field`. They must provide a `label` (mandatory) and `type` for each field.  
  6. Only `dynamic fields` can be removed. A `delete button` is displayed next to these fields.  
  7. Addition and deletion of `dynamic fields` will also update the `table` as well as the `charts`.  
  8. The `reusable dynamic form` is designed to be highly configurable. It can be used for `static fields` only, `dynamic fields` only, or a combination of both.  
  9. Clicking `View Trends` displays all columns, including `dynamic ones`, as buttons (except for the `Name` column, as it doesn't have visualizable data). `Pie charts` are generated for each dataset, and hovering over the `charts` reveals exact counts.  
  10. Clicking `Edit` in the `table` opens the same `reusable sliding window` with the `user form` pre-filled with the selected user's data, allowing for editing.  
  11. If no data is present in the `table`, a `No Data` message is displayed for better user experience, and `pagination` is hidden. The `View Trends` button is also hidden, as there would be no data to visualize.   


# Non Functional Features 
  1. The application is fully responsive and adapts seamlessly to various screen sizes.  
  2. User preferences, such as the selected theme, are stored in **localStorage**. This ensures that the chosen theme is applied automatically when the user revisits the application.  
  3. To handle large datasets, only a subset of data is loaded into the DOM, reducing the number of DOM nodes and improving performance. If connected to a real API, IndexedDB would be utilized (as currently implemented) to significantly enhance data load speed and provide offline support for non-sensitive data.  
  4. The application is optimized to prevent unnecessary re-renders by leveraging React features like `React.memo` and `useMemo` where applicable, boosting overall performance.  
  5. To further enhance performance, redundant API calls are avoided by using IndexedDB as the endpoint. Data is fetched from the application's state, minimizing unnecessary requests (simulated in the current setup using IndexedDB).  
  6. Loading spinner was introduced for smooth user experience during asynchronous operations.
  7. Inputs are validated and santized thoroughly.
  8. Styles have been scoped to the corresponding components and common styles are put in index.css.
 
# Future Enhancements & Improvements(Could not implement due to time constraints)
  1. The table can be enhanced by adding an inline editing feature.  
  2. Virtual scrolling can be implemented to improve performance further.  
  3. A functionality to delete users can be introduced.  
  4. While adding dynamic fields, standard and custom validations can be configured.  
  5. The ability to edit dynamic column configurations can be implemented.  

# DESIGN PRINCIPLES USED

  ## Modularity
  - Components are divided based on their specific responsibilities, adhering to the Single Responsibility Principle.
  - Functions within components are broken into smaller, focused units, ensuring readability and testability.
  - This modular design allows seamless updates and fosters scalable architecture. 

  ## Reusability
  - Multiple reusable components (e.g., form fields, table, dynamic form, sliding windoe, buttons etc) were developed to adhere to the DRY (Don’t Repeat Yourself) principle.
  - The structure makes the application easier to maintain and reduces redundancy in the codebase. 

  ## Security
  - Inputs are validated thoroughly.
  - Data sanitization is implemented to prevent injection attacks or security vulnerabilities.
  - Comprehensive error handling ensures the application behaves predictably even under edge cases.

  ## User Accessibility
  - Both dark and light themes are supported, enhancing the user experience for diverse preferences.
  - Semantic HTML and ARIA tags are used to improve screen reader compatibility and web accessibility standards (WCAG).

  ## Performance Optimization
  - Features like useMemo and React.memo were strategically applied to avoid unnecessary re-renders.
  - Optimized state management ensures minimal computations and faster data updates.
  - Derived states are utilized to reduce the complexity of maintaining multiple state variables.

  ## KISS Principle
  - The design follows the Keep It Simple, Stupid (KISS) principle, ensuring straightforward logic without unnecessary complexity.
  - The application remains user-friendly and developer-friendly.

  ## Enhanced Usability
  - Minimum clicks are required for critical operations (e.g., adding or removing fields), streamlining the user journey.
  - Dynamic addition/removal of form fields allows flexible customization based on user needs.

  ## Scalability and Future-Proofing
  - The application is built to handle large datasets efficiently, adhering to the given performance requirements.
  - Client-side data management ensures a seamless experience even without a backend.

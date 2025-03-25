# TypeScript File Uploader

As a software engineer dedicated to expanding my expertise in modern web development, I've created a TypeScript-based file uploader application. This project serves as a practical exploration of TypeScript's capabilities, particularly in handling asynchronous operations, class-based structures, and DOM manipulation in a browser environment.

This software allows users to seamlessly upload files to a server via drag-and-drop or file selection. The application demonstrates asynchronous file uploads using the `fetch` API and provides a dynamic interface to display uploaded files as downloadable links. This project is intended to show the power of typescript in creating interactive and robust web applications.

[Software Demo Video](https://youtu.be/oXD42-C73Wo)

# Development Environment

This project was developed using Visual Studio Code as the primary code editor, leveraging its excellent TypeScript support and debugging capabilities. The application utilizes Node.js and Express.js on the server side to handle file uploads and serve static files. Multer was used as the middleware to manage multipart/form-data for file uploads. The client-side is pure TypeScript, compiled to ES modules using the TypeScript compiler (tsc). The client side also leverages the fetch API for asynchronous communication with the server.

The project relies on:

* TypeScript: For type-safe JavaScript development.
* Node.js: For the server-side environment.
* Express.js: For creating the web server and handling routes.
* Multer: For handling file uploads on the server.
* HTML/CSS: For the user interface.

# Useful Websites

-   [TypeScript Documentation](https://www.typescriptlang.org/docs/)
-   [Express.js Documentation](https://expressjs.com/en/api.html)
-   [Multer Documentation](https://github.com/expressjs/multer)

# Future Work

-   Implement progress indicators for file uploads.
-   Add client-side file size and type validation.
-   Implement a more robust file management system on the server (e.g., database integration).
-   Add user authentication and authorization.
-   Add functionality to delete uploaded files.
-   Implement a download manager for multiple files.
-   Improve the CSS for a more responsive and user-friendly interface.
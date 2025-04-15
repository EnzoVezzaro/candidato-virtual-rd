# Candidato Virtual

## Project Description

Candidato Virtual is a web application built with React, TypeScript, and Vite. It serves as a virtual representation of a political candidate, providing information about their biography, proposals, and frequently asked questions. The application also includes a chat interface powered by a Retrieval-Augmented Generation (RAG) system, allowing users to interact with the candidate and ask questions about their platform.

## Technologies Used

*   **React:** A JavaScript library for building user interfaces.
*   **TypeScript:** A superset of JavaScript that adds static typing.
*   **Vite:** A build tool that provides a fast and efficient development experience.
*   **Tailwind CSS:** A utility-first CSS framework for rapidly styling custom designs.
*   **Radix UI:** A set of unstyled, accessible UI primitives.
*   **RAG (Retrieval-Augmented Generation):** An AI framework for enhancing the accuracy and reliability of generative models by grounding them on external knowledge sources.

## Project Structure

The project is structured as follows:

*   `public/`: Contains static assets such as images, fonts, and the `robots.txt` file.
*   `src/`: Contains the application's source code.
    *   `components/`: Contains reusable UI components.
        *   `Chat/`: Contains components related to the chat interface.
        *   `ui/`: Contains UI components built with Radix UI and Tailwind CSS.
    *   `config/`: Contains configuration files.
    *   `data/`: Contains data files, such as the knowledge base for the RAG system.
    *   `hooks/`: Contains custom React hooks.
    *   `lib/`: Contains utility functions and providers.
        *   `providers/ai/`: Contains AI provider implementations (e.g., OpenAI, Google).
    *   `pages/`: Contains the application's pages.
    *   `rag/`: Contains files related to the RAG system.
        *   `documents/`: Contains the documents used for the RAG system.
    *   `store/`: Contains the application's state management logic (if any).
    *   `utils/`: Contains utility functions.
*   `index.html`: The main HTML file.
*   `vite.config.ts`: The Vite configuration file.
*   `tailwind.config.ts`: The Tailwind CSS configuration file.
*   `tsconfig.json`: The TypeScript configuration file.
*   `package.json`: The project's package file, containing dependencies and scripts.

## Installation

1.  Clone the repository:

    ```bash
    git clone <repository_url>
    ```
2.  Navigate to the project directory:

    ```bash
    cd candidato-virtual-rd
    ```
3.  Install the dependencies:

    ```bash
    npm install
    ```

## Usage

1.  Start the development server:

    ```bash
    npm run dev
    ```
2.  Open your browser and navigate to `http://localhost:5173` (or the port specified by Vite).
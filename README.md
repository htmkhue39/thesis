# React + Vite

This template provides a minimal setup to get React working in Vite with HMR (Hot Module Replacement) and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## How to run

Follow these steps to set up and run the project:

1. **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd <repository_name>
    ```

2. **Install the dependencies:**
    ```bash
    npm install
    ```

3. **Start the JSON server:**
    Make sure you have `json-server` installed globally. If not, install it using:
    ```bash
    npm install -g json-server
    ```

    Start the JSON server with the `db.json` file:
    ```bash
    json-server --watch db.json --port 3001
    ```

    This will start a local server at `http://localhost:3001` serving data from the `db.json` file.

4. **Start the development server:**
    In another terminal window, start the Vite development server:
    ```bash
    npm run dev
    ```

    This will start the Vite development server. You should see output indicating that the server is running and providing a local URL (typically `http://localhost:3000`) where you can view your React application.

5. **Build the project for production:**
    ```bash
    npm run build
    ```

    This command will create an optimized production build of your application in the `dist` directory.

6. **Preview the production build:**
    ```bash
    npm run serve
    ```

    This will start a local server to serve the files from the `dist` directory, allowing you to preview the production build locally.

## Additional Information

- **Vite Documentation:** [https://vitejs.dev/](https://vitejs.dev/)
- **React Documentation:** [https://reactjs.org/](https://reactjs.org/)
- **JSON Server Documentation:** [https://github.com/typicode/json-server](https://github.com/typicode/json-server)

Feel free to customize the setup according to your project's needs.

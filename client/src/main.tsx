/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { SearchProvider } from "./context/SearchCtx.tsx";
import { NewNoteProvider } from "./context/NewNoteCtx.tsx";
import { EditNoteProvider } from "./context/EditNoteCtx.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SearchProvider>
      <NewNoteProvider>
        <EditNoteProvider>
          <Router>
            <App />
          </Router>
        </EditNoteProvider>
      </NewNoteProvider>
    </SearchProvider>
  </React.StrictMode>
);

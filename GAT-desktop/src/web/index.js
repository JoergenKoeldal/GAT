import ReactDOM from "react-dom/client";
import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import App from "./app";
import Home from "./home/home";
import Login from "./login/login";
import Statistics from "./statistics/statistics";

const container = document.getElementById("app");

const root = ReactDOM.createRoot(container);

root.render(
  <BrowserRouter>
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<App />}>
              <Route path="/home" element={<Home />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route
                  path="*"
                  element={(
                      <main style={{ padding: "1rem" }}>
                          <p>There's nothing here!</p>
                        </main>
                    )}
                />
            </Route>
        </Routes>
    </BrowserRouter>,
);

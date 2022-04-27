import ReactDOM from "react-dom/client";
import React from "react";

function App() {
    return <h1>This is my React app!</h1>;

}

const container = document.getElementById("app");

const root = ReactDOM.createRoot(container);

root.render(<App />);

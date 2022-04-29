import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function App() {
    return (
        <div>
            <h1 className="bg-red-900">GAT</h1>
            <nav>
                <Link to="/home">home</Link>
                {" "}
                |
                {" "}
                <Link to="/statistics">statistik</Link>
            </nav>
            <Outlet />
        </div>
    );
}

import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function App() {
    return (
      <div>
          <h1>GAT</h1>
          <nav
              style={{
                    borderBottom: "solid 1px",
                    paddingBottom: "1rem",
                }}
            >
              <Link to="/home">home</Link>
              {" "}
              |{" "}
              <Link to="/statistics">statistik</Link>
            </nav>
          <Outlet />
        </div>
    );
}

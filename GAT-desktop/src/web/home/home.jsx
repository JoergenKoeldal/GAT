import React from "react";
import Button from "../util/button";

export default function Home() {
    return (
        <div>

            <h1>Home page</h1>

            <Button onClick={() => { window.location.href = "/login"; }}>  </Button>

            <p> hej </p>

        </div>
    );
}

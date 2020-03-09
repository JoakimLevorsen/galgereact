import React, { useState } from "react";
import "./App.css";
import SignIn from "./auth/SignIn";
import Game from "./game/Game";

export default () => {
    const [authorized, setAuth] = useState(false);

    return (
        <div className="App">
            {!authorized ? (
                <SignIn didSignIn={() => setAuth(true)} />
            ) : (
                <Game />
            )}
        </div>
    );
};

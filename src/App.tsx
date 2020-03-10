import React, { useState } from "react";
import "./App.css";
import SignIn from "./auth/SignIn";
import Game from "./game/Game";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
    palette: {
        primary: { main: "#f35588" },
        secondary: { main: "#05dfd7" },
    },
    typography: {
        fontSize: 18,
    },
});

export const colors = {
    yellow: "#fff591",
    green: "#a3f7bf",
};

export default () => {
    const [authorized, setAuth] = useState(false);

    return (
        <div className="App" style={{ background: colors.green }}>
            <ThemeProvider theme={theme}>
                {!authorized ? (
                    <SignIn didSignIn={() => setAuth(true)} />
                ) : (
                    <Game signOut={() => setAuth(false)} />
                )}
            </ThemeProvider>
        </div>
    );
};

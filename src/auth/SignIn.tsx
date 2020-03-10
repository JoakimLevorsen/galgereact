import React, { useState } from "react";
import { TextField, Button, Paper, Typography } from "@material-ui/core";
import Axios from "axios";
import Spacer from "../components/Spacer";
import Watermelon from "../components/Watermelon";

interface Props {
    didSignIn: () => void;
}

export default (props: Props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Lav tim sign in
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const signIn = () =>
        Axios.get("")
            .then(() => props.didSignIn())
            .catch(e => {
                console.error(e);
                alert("En intern fejl opstod. Prøv igen");
            });

    return (
        <Paper
            className="SignInPage"
            style={{
                display: "flex",
                flexDirection: "column",
                width: 300,
                background: "white",
                padding: 20,
            }}
        >
            <Typography variant="h4" color="primary" align="center">
                Log ind
            </Typography>
            <Watermelon />
            <Spacer />
            <TextField
                value={username}
                label="Brugernavn"
                onChange={e => setUsername(e.target.value)}
            />
            <TextField
                value={password}
                label="Kodeord"
                type="password"
                onChange={e => setPassword(e.target.value)}
            />
            <Spacer />
            <Button
                color="primary"
                style={{ marginTop: 10 }}
                onClick={() => props.didSignIn()}
            >
                Log ind
            </Button>
        </Paper>
    );
};

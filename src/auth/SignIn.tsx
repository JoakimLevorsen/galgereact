import React, { useState } from "react";
import { TextField, Button, Paper } from "@material-ui/core";
import Axios from "axios";

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
            style={{
                display: "flex",
                flexDirection: "column",
                height: 200,
                width: 300,
                background: "white",
                padding: 20,
            }}
        >
            <h2>Log ind</h2>
            <TextField
                value={username}
                label="Brugernavn"
                onChange={e => setUsername(e.target.value)}
            />
            <TextField
                value={password}
                label="Kodeord"
                onChange={e => setPassword(e.target.value)}
            />
            <Button onClick={() => props.didSignIn()}>Log ind</Button>
        </Paper>
    );
};

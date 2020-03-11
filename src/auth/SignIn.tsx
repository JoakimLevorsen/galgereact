import React, { useState } from "react";
import {
    TextField,
    Button,
    Paper,
    Typography,
    LinearProgress,
} from "@material-ui/core";
import Axios from "axios";
import Spacer from "../components/Spacer";
import Watermelon from "../components/Watermelon";
import { API_URL } from "../API_URL";

interface Props {
    didSignIn: () => void;
}

export let globalUsername: string | undefined;

export default (props: Props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [signingIn, setSigningIn] = useState(false);

    // Lav tim sign in
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const signIn = () => {
        setSigningIn(true);
        Axios.get(API_URL + "/login", {
            params: { username, password },
        })
            .then(r => {
                console.log("Got response", r);
                const status = r.data;
                if (status === true) {
                    globalUsername = username;
                    props.didSignIn();
                } else alert("Forkert brugernavn/kodeord");
                setSigningIn(false);
            })
            .catch(e => {
                console.error(e);
                setSigningIn(false);
                alert("En intern fejl opstod. Prøv igen");
            });
    };

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
            {signingIn ? <LinearProgress /> : <div style={{ height: 4 }} />}
            <Spacer />
            <TextField
                value={username}
                disabled={signingIn}
                label="Brugernavn"
                onChange={e => setUsername(e.target.value)}
            />
            <TextField
                value={password}
                disabled={signingIn}
                label="Kodeord"
                type="password"
                onChange={e => setPassword(e.target.value)}
            />
            <Spacer />
            <Button
                color="primary"
                disabled={signingIn}
                style={{ marginTop: 10 }}
                onClick={() => signIn()}
            >
                Log ind
            </Button>
        </Paper>
    );
};

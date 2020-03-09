import React, { useState } from "react";
import { Box, TextField, Button } from "@material-ui/core";
import Axios from "axios";

interface Props {
    didSignIn: () => void;
}

export default (props: Props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Lav tim sign in
    const signIn = Axios.get("")
        .then(() => props.didSignIn())
        .catch(e => {
            console.error(e);
            alert("En intern fejl opstod. Prøv igen");
        });

    return (
        <Box>
            <TextField
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
            <TextField
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <Button onClick={() => signIn}>Log ind</Button>
        </Box>
    );
};

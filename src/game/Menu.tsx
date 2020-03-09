import { Paper, Button } from "@material-ui/core";
import React from "react";
import { GamePage } from "./Game";

interface Props {
    setGameState: (page: GamePage) => void;
}

export default ({ setGameState }: Props) => (
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
        <h2>Menu</h2>
        <Button onClick={() => setGameState("Game")}>Spil</Button>
        <Button onClick={() => setGameState("Scores")}>Se highscores</Button>
    </Paper>
);

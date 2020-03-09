import { Paper, Button, Typography } from "@material-ui/core";
import React from "react";
import { GamePage } from "./Game";
import Spacer from "../components/Spacer";

interface Props {
    setGameState: (page: GamePage) => void;
}

export default ({ setGameState }: Props) => (
    <Paper
        className="GameMenu"
        style={{
            display: "flex",
            flexDirection: "column",
            height: 200,
            width: 300,
            background: "white",
            padding: 20,
        }}
    >
        <Typography variant="h4" color="primary" align="center">
            Menu
        </Typography>
        <Spacer size={0.5} />
        <Button onClick={() => setGameState("Game")}>Spil</Button>
        <Spacer />
        <Button onClick={() => setGameState("Scores")}>Se highscores</Button>
        <Spacer size={3} />
    </Paper>
);

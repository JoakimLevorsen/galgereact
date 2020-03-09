import React, { useState } from "react";
import {
    AppBar,
    Typography,
    Toolbar,
    Button,
    IconButton,
} from "@material-ui/core";
import Menu from "./Menu";
import Scores from "./Scores";
import GameOver from "./GameOver";
import PlayArea from "./PlayArea";
import HighScore from "../highscore";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

interface Props {
    signOut: () => void;
}

export type GamePage = "Menu" | "Game" | "GameOver" | "Scores";

export default ({ signOut }: Props) => {
    const [gameState, setGameState] = useState<GamePage>("Menu");
    const [finishedGame, setFinishedGame] = useState<HighScore | null>(null);

    const getContentForState = () => {
        switch (gameState) {
            case "Menu":
                return <Menu setGameState={setGameState} />;
            case "Game":
                return (
                    <PlayArea gameFinished={score => setFinishedGame(score)} />
                );
            case "GameOver":
                return (
                    <GameOver
                        goToMenu={() => setGameState("Menu")}
                        game={finishedGame!}
                    />
                );
            case "Scores":
                return <Scores />;
        }
    };
    return (
        <div>
            <AppBar>
                <Toolbar>
                    <IconButton
                        disabled={gameState === "Menu"}
                        onClick={() => setGameState("Menu")}
                    >
                        <ArrowBackIcon
                            className={
                                gameState === "Menu"
                                    ? "BackButton disabledAnim"
                                    : "BackButton"
                            }
                            color="secondary"
                        />
                    </IconButton>
                    <Typography style={{ flex: 1 }} variant="h6">
                        Galgeleg
                    </Typography>
                    <Button color="inherit" onClick={() => signOut()}>
                        Log ud
                    </Button>
                </Toolbar>
            </AppBar>
            <div>{getContentForState()}</div>
        </div>
    );
};

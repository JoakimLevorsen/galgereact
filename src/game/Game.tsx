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
import Lost from "./Lost";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

interface Props {
    signOut: () => void;
}

export type GamePage = "Menu" | "Game" | "GameOver" | "Scores" | "Lost";

export default ({ signOut }: Props) => {
    const [gameState, setGameState] = useState<GamePage>("Menu");
    const [finishedGame, setFinishedGame] = useState<HighScore | null>(null);
    const [gameWord, setGameWord] = useState<string | null>(null);

    const getContentForState = () => {
        switch (gameState) {
            case "Menu":
                return <Menu setGameState={setGameState} />;
            case "Game":
                return (
                    <PlayArea
                        gameWon={score => {
                            setFinishedGame(score);
                            setGameState("GameOver");
                        }}
                        gameLost={word => {
                            setGameWord(word);
                            setGameState("Lost");
                        }}
                    />
                );
            case "GameOver":
                return <GameOver game={finishedGame!} />;
            case "Scores":
                return <Scores />;
            case "Lost":
                return <Lost word={gameWord!} />;
        }
    };
    return (
        <>
            <AppBar>
                <Toolbar>
                    <IconButton
                        disabled={gameState === "Menu"}
                        onClick={() => setGameState("Menu")}
                        color="inherit"
                    >
                        <ArrowBackIcon
                            className={
                                gameState === "Menu"
                                    ? "BackButton disabledAnim"
                                    : "BackButton"
                            }
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
            <div className="fullSize">{getContentForState()}</div>
        </>
    );
};

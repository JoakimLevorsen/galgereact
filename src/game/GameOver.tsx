import React from "react";
import { Typography } from "@material-ui/core";
import HighScore from "../highscore";
import HighScoreList from "../components/HighScoreList";

interface Props {
    goToMenu: () => void;
    game: HighScore;
}

export default ({ goToMenu, game }: Props) => (
    <>
        <Typography variant="h1">TILLYKKE</Typography>
        <Typography>Ordet var {"Sovs"}</Typography>
        <HighScoreList selectedGame={game} />
    </>
);

import React from "react";
import { Typography } from "@material-ui/core";
import HighScore from "../Highscore";
import HighScoreList from "../components/HighScoreList";

interface Props {
    game: HighScore;
}

export default ({ game }: Props) => (
    <>
        <Typography variant="h1">TILLYKKE</Typography>
        <Typography>Ordet var {game.word}</Typography>
        <HighScoreList selectedGame={game} />
    </>
);

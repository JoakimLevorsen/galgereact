import React from "react";
import { Typography } from "@material-ui/core";
import HighScoreList from "../components/HighScoreList";

interface Props {
    word: string;
}

export default ({ word }: Props) => (
    <>
        <Typography align="center" variant="h1">
            Desværre, du tabte
        </Typography>
        <Typography align="center">Ordet var {word}</Typography>
        <HighScoreList />
    </>
);

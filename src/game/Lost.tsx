import React from "react";
import { Typography } from "@material-ui/core";
import HighScoreList from "../components/HighScoreList";

interface Props {
    word: string;
}

export default ({ word }: Props) => (
    <>
        <Typography variant="h1">Desværre, du tabte</Typography>
        <Typography>Ordet var {word}</Typography>
        <HighScoreList />
    </>
);

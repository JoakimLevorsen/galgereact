import React from "react";
import { Button } from "@material-ui/core";
import HighScore from "../highscore";

interface Props {
    goToMenu: () => void;
    game: HighScore;
}

export default ({ goToMenu }: Props) => (
    <div>
        <Button onClick={() => goToMenu()}>Tilbage</Button>
    </div>
);

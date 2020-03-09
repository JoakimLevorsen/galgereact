import React from "react";
import { Button } from "@material-ui/core";
import HighScore from "../highscore";

interface Props {
    gameFinished: (result: HighScore) => void;
}

export default (props: Props) => (
    <div>
        <Button>Tilbage</Button>
    </div>
);

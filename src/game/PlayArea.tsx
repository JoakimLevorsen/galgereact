import React from "react";
import { Button } from "@material-ui/core";
import HighScore from "../highscore";

interface Props {
    gameFinished: (result: HighScore) => void;
}

export default (props: Props) => (
    <div
        style={{
            flex: 1,
            flexDirection: "row",
            display: "flex",
            height: "100%",
        }}
        className="playArea"
    >
        <div
            style={{ flex: "0 300px", background: "white" }}
            className="hangMan"
        ></div>
        <div className="wordContainer">
            <div>Forkerte A D AA I FOA EK FIJOD</div>
            <div>_ _ _ _ _ _ _ _ _ _ _ _</div>
        </div>
    </div>
);

import React, { useState, useEffect } from "react";
import HighScore, { loadHighScores } from "../Highscore";
import { Card, Typography } from "@material-ui/core";
import Spacer from "./Spacer";

interface Props {
    selectedGame?: HighScore;
}

export default ({ selectedGame }: Props) => {
    const [list, setList] = useState<HighScore[]>([]);

    useEffect(() => {
        const list = loadHighScores();
        setList(list);
        setTimeout(() => scrollCurrentGameIntoView(list), 400);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const scrollCurrentGameIntoView = (listToUse: HighScore[]) => {
        if (selectedGame) {
            const currentGame = listToUse.findIndex(
                h => h.uniqueness === selectedGame!.uniqueness
            );
            if (currentGame !== -1) {
                const target = document.querySelector(`#A${currentGame}`);
                if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                }
            }
        }
    };

    const formatTime = (input: Date) => {
        let timeInSeconds = Math.floor(input.getTime() / 1000);
        let timeInMinutes = 0;
        while (timeInSeconds > 60) {
            timeInSeconds -= 60;
            timeInMinutes++;
        }
        return {
            min: timeInMinutes.toString().padStart(2, "0"),
            sec: timeInSeconds.toString().padStart(2, "0"),
        };
    };

    return (
        <div
            style={{
                maxHeight: "100%",
                height: "100%",
                overflow: "scroll",
                minWidth: "80vw",
            }}
        >
            {list.length === 0 && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                    }}
                >
                    <Typography variant="h2">
                        Ingen scores endnu, du må hellere komme igang med at
                        spille!
                    </Typography>
                </div>
            )}
            {list.map((score, index) => {
                const {
                    name,
                    time,
                    word,
                    wrongLettersGuessed,
                    calcScore,
                    uniqueness,
                } = score;
                const { min, sec } = formatTime(time);
                return (
                    <Card
                        key={index}
                        id={"A" + index}
                        className={
                            uniqueness === selectedGame?.uniqueness
                                ? "newScore"
                                : ""
                        }
                        style={{
                            margin: 15,
                            display: "flex",
                            alignItems: "center",
                            padding: 15,
                        }}
                    >
                        <Typography variant="h2">{index + 1}.</Typography>
                        <Typography>{name}</Typography>
                        <Spacer />
                        <Typography>{word}</Typography>
                        <Spacer />
                        <div style={{ textAlign: "right" }}>
                            <Typography>{calcScore()} point</Typography>
                            <Typography>
                                {wrongLettersGuessed} forkerte
                            </Typography>
                            <Typography>
                                {min}:{sec}
                            </Typography>
                        </div>
                    </Card>
                );
            })}
        </div>
    );
};

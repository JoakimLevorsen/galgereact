import React, { useState, useEffect } from "react";
import HighScore, { loadHighScores } from "../highscore";
import { Card, Typography } from "@material-ui/core";

export default () => {
    const [list, setList] = useState<HighScore[]>([]);

    useEffect(() => {
        setList(loadHighScores());
    }, []);

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
        <div style={{ maxHeight: "100%", overflow: "scroll" }}>
            {list.map(({ name, time, word, wrongLettersGuessed }) => {
                const { min, sec } = formatTime(time);
                return (
                    <Card
                        style={{
                            margin: 15,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: 15,
                        }}
                    >
                        <Typography>{name}</Typography>
                        <Typography>
                            {min}:{sec}
                        </Typography>
                        <div style={{ textAlign: "right" }}>
                            <Typography>{word}</Typography>
                            <Typography>
                                {wrongLettersGuessed} forkerte
                            </Typography>
                        </div>
                    </Card>
                );
            })}
        </div>
    );
};

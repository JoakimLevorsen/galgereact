import React, { Component } from "react";
import HighScore, { saveHighScore } from "../highscore";
import Spacer from "../components/Spacer";
import { CircularProgress } from "@material-ui/core";

interface Props {
    gameFinished: (result: HighScore) => void;
}

interface State {
    secondsPlayed: number;
    minutesPlayed: number;
    wrongGuessed: Set<string>;
    secretWord?: string;
    correctlyGuessed: Set<string>;
}

export default class PlayArea extends Component<Props> {
    private gameStart: Date | null = null;
    private didUnmount = false;

    state: State = {
        secondsPlayed: 0,
        minutesPlayed: 0,
        wrongGuessed: new Set(),
        correctlyGuessed: new Set(),
    };

    componentDidMount() {
        this.gameStart = new Date();
        this.makeTimer();
        this.addKeyboardListener();
        setTimeout(() => this.setState({ secretWord: "SOVS" }), 1000);
    }

    makeTimer = () =>
        setTimeout(() => {
            if (this.didUnmount) return;
            const timeTaken = new Date().getTime() - this.gameStart!.getTime();
            let secondsPlayed = Math.floor(timeTaken / 1000);
            let minutesPlayed = 0;
            while (secondsPlayed > 60) {
                secondsPlayed -= 60;
                minutesPlayed++;
            }
            this.setState({ secondsPlayed, minutesPlayed });
            this.makeTimer();
        }, 1000);

    addKeyboardListener = () =>
        document.addEventListener("keydown", event => {
            const key = event.key.toUpperCase();
            if (!this.didUnmount && /^[A-ZÆØÅ]$/.test(key)) {
                const {
                    wrongGuessed,
                    correctlyGuessed,
                    secretWord,
                } = this.state;
                if (!secretWord || !this.gameStart) return;
                if (!(wrongGuessed.has(key) && correctlyGuessed.has(key))) {
                    if (secretWord.includes(key)) {
                        correctlyGuessed.add(key);
                        this.setState({ correctlyGuessed });
                        // Now we check if we have won
                        if (!this.secretWord.includes("_")) {
                            const newScore = new HighScore(
                                "TODO",
                                new Date(
                                    new Date().getTime() -
                                        this.gameStart.getTime()
                                ),
                                secretWord,
                                wrongGuessed.size
                            );
                            saveHighScore(newScore);
                            this.props.gameFinished(newScore);
                        }
                    } else {
                        wrongGuessed.add(key);
                        this.setState({ wrongGuessed });
                    }
                }
            }
        });

    componentWillUnmount = () => (this.didUnmount = true);

    private get secretWord() {
        const letters = Array.from(this.state.secretWord ?? "").map(l =>
            this.state.correctlyGuessed.has(l) ? l : "_"
        );
        return letters.reduce((pV, v) => `${pV} ${v}`);
    }

    renderGame = () => (
        <div className="wordContainer">
            <div className="countDown">
                {this.state.minutesPlayed.toString().padStart(2, "0")}:
                {this.state.secondsPlayed.toString().padStart(2, "0")}
            </div>
            <Spacer />
            <div>
                {this.state.wrongGuessed.size > 0 && "Forkerte "}
                {Array.from(this.state.wrongGuessed).reduce(
                    (pV, v) => (pV === "" ? v : `${pV} ${v}`),
                    ""
                )}
            </div>
            <div>{this.secretWord}</div>
            <Spacer />
        </div>
    );

    render = () => (
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
            {this.state.secretWord ? (
                this.renderGame()
            ) : (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flex: 1,
                    }}
                >
                    <CircularProgress />
                </div>
            )}
        </div>
    );
}

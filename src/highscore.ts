export default class HighScore {
    public timeInMs: number;
    public score: number;
    readonly twoMinInMs = 120000;

    constructor(
        public name: string,
        public time: Date,
        public word: string,
        public wrongLettersGuessed: number
    ) {
        this.timeInMs = time.getTime();
        this.score = this.calcScore();
    }

    private calcScore(): number {
        return (
            this.twoMinInMs -
            this.timeInMs +
            500 * this.word.length -
            500 * this.wrongLettersGuessed
        );
    }
}

const key = "highScore";

export const saveHighScore = (highScore: HighScore) => {
    if (localStorage) {
        localStorage.setItem(
            key,
            JSON.stringify(
                [...loadHighScores(), highScore].sort(
                    (a, b) => b.score - a.score
                )
            )
        );
    } else {
        alert("Sorry, your browser does not support web storage.");
    }
};

export const loadHighScores = (): HighScore[] => {
    if (localStorage) {
        return JSON.parse(localStorage.getItem(key) ?? "[]") as HighScore[];
    } else {
        alert("Sorry, your browser does not support web storage.");
        return [];
    }
};

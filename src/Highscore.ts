interface RawHighScore {
    name: string;
    time: string;
    word: string;
    wrongLettersGuessed: number;
    timeInMs: number;
    score: number;
}

const twoMinInMs = 120000;

export default class HighScore {
    public timeInMs: number;
    public score: number;

    constructor(
        public name: string,
        public time: Date,
        public word: string,
        public wrongLettersGuessed: number,
        public uniqueness = Symbol("Highscore")
    ) {
        this.timeInMs = time.getTime();
        this.score = this.calcScore();
    }

    public calcScore = () =>
        Math.floor(
            (twoMinInMs - this.timeInMs) / 10 +
                500 * this.word.length -
                500 * this.wrongLettersGuessed
        );
}

const key = "highScore";

let cachedScores: HighScore[] | undefined;

export const saveHighScore = (highScore: HighScore) => {
    if (localStorage) {
        const newList = [...loadHighScores(), highScore].sort(
            (a, b) => b.score - a.score
        );
        cachedScores = newList;
        localStorage.setItem(key, JSON.stringify(newList));
    } else {
        alert("Sorry, your browser does not support web storage.");
    }
};

export const loadHighScores = (): HighScore[] => {
    if (cachedScores) return cachedScores;
    if (localStorage) {
        return (JSON.parse(
            localStorage.getItem(key) ?? "[]"
        ) as RawHighScore[]).map(
            ({ name, time, word, wrongLettersGuessed }) =>
                new HighScore(name, new Date(time), word, wrongLettersGuessed)
        );
    } else {
        alert("Sorry, your browser does not support web storage.");
        return [];
    }
};

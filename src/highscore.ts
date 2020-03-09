export default class HighScore {
    public timeInMs: number
    public highScore: number
    readonly twoMinInMs = 120000

    constructor(public name: string, public time: Date, public word: string, public wrongLettersGuessed: number) {
        this.timeInMs = time.getTime()
        this.highScore = this.calcScore()
    }

    private calcScore(): number {
        return (this.twoMinInMs - this.timeInMs + (500 * this.word.length) - (1000 * this.wrongLettersGuessed))
    }

    private saveHighScore(highScore: HighScore) {

    }

    private loadHighScores() {

    }
}
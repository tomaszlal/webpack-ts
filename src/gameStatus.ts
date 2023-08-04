import { GameManager } from "./GameManager";
import { TetriminoRun } from "./tetriminoRun";
import { TetrisBoard } from "./tetrisBoard";

export class GameStatus {
    private score: number = 0;
    private timeInterval: number = 2000;
    private timer = setInterval(() => { }, 0);
    private timerOn = false;
    public gameManager: GameManager;

    constructor(gameManager: GameManager) {
        this.gameManager = gameManager;

        console.log(this.timer);


    }


    public startTimer(): void {
        if (!this.timerOn) {
            this.timer = setInterval(() => {
                console.log(`Interval = ${this.timeInterval}`);
                this.gameManager.goDown();
            }, this.timeInterval);
            this.timerOn = true;
        }
    }


    public stopTimer(): void {
        if (this.timerOn) {
            console.log(`Stop interval = ${this.timer}`);
            clearInterval(this.timer);
            this.timerOn = false;
        }
    }

    public changeInterval(time: number): void {
        this.stopTimer();
        this.timeInterval = time;
        this.startTimer();

    }

    public setScore(score: number): void {
        this.score = score;
    }

    public getScore(): number {
        return this.score;
    }

    public getTimeInterval(): number {
        return this.timeInterval;
    }

    public addOnePoint(): void {
        this.score += 1;
    }
    
}
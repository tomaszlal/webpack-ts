import { GameManager } from "./GameManager";
import { TetriminoRun } from "./tetriminoRun";
import { TetrisBoard } from "./tetrisBoard";

export class GameStatus {
    private score:number = 0;
    private timeInterval:number = 2000;
    private interval = setInterval(()=>{},0);
    // public tetriminoRun: TetriminoRun;
    // public tetrisBoard: TetrisBoard;
    public gameManager:GameManager;

    constructor(gameManager:GameManager) {

        
        this.gameManager = gameManager;

        console.log(this.interval);
        
        // this.tetriminoRun = tetriminoRun;
        // this.tetrisBoard = tetrisBoard;
        // tetrisBoard: TetrisBoard,tetriminoRun: TetriminoRun
        

        // setInterval(() = > this.printMsg(), 2000);
        // clearInterval(myInterval);
    }

    
    public startInterval():void{
        
            this.interval = setInterval(() => {
                console.log(`Interval = ${this.timeInterval}`);                
                this.gameManager.goDown();
            }, this.timeInterval);
    
            

    }

   
    public stopInterval():void{
        console.log(`Stop interval = ${this.interval}`);
        clearInterval(this.interval);
        
    }





    public setScore(score:number) :void{
        this.score  = score;
    }

    public getScore():number {
        return this.score;
    }
}
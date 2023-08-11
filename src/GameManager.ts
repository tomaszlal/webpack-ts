import * as PIXI from "pixi.js";
import { TetrisBoard } from "./TetrisBoard";
import { Tetrimino } from "./model/tetimino";
import { Directions } from "./model/directions";
import { TypeOfTet } from "./model/TypeOfTet";
import { TypeOfKey } from "./model/TypeOfKey";
import { TetriminoRun } from "./TetriminoRun";
import { GameStatus } from "./GameStatus";

export class GameManager {
    private app: PIXI.Application;
    public boardContainer: PIXI.Container = new PIXI.Container();
    public infoContainer: PIXI.Container = new PIXI.Container();
    public listOfTypeOfTet: Array<TypeOfTet> = [];
    public tetrisBoard: TetrisBoard;
    public tetriminoRun: TetriminoRun;
    public gameStatus: GameStatus;
    public oneBlockSize: number = 24;
    public scoreText: PIXI.Text = new PIXI.Text("Score : 254", require('./fonts/FontDigits.json'));
    public tetrimino: Tetrimino = {
        type: TypeOfTet.I,
        fields: [],
    };

    public constructor() {
        (<any>window).__PIXI_INSPECTOR_GLOBAL_HOOK__ &&
            (<any>window).__PIXI_INSPECTOR_GLOBAL_HOOK__.register({
                PIXI: PIXI,
            });
        this.app = new PIXI.Application({
            width: 600,
            height: 700,
            backgroundColor: 0xbbbbbb,
        });
        document.body.appendChild(this.app.view);
        this.tetrisBoard = new TetrisBoard();
        this.tetriminoRun = new TetriminoRun(this.tetrisBoard);
        this.gameStatus = new GameStatus(this);


        // ['keydown' as const, 'keyup' as const]
        ["keydown" as const].forEach((eventName) => {
            document.addEventListener(eventName, (e) => {
                this.onKey(e);
            });
        });

        Object.values(TypeOfTet).forEach(letter => {
            this.listOfTypeOfTet.push(letter);
        });

        this.init();
    }

    public addTicker(): void {
        let tetTextures: Map<TypeOfTet, PIXI.Texture> = new Map<TypeOfTet, PIXI.Texture>();
        this.listOfTypeOfTet.forEach(typeOfTet => {
            tetTextures.set(typeOfTet, PIXI.Texture.from(`/assets/images/tet_${typeOfTet}.png`));
        })
        console.log(tetTextures.get(TypeOfTet.L));
        const textureEmptyBlock = PIXI.Texture.from("/assets/images/tet_0.png");
        const tetBoard = this.tetrisBoard.getBoard();
        this.app.ticker.add((delta) => {
            let i = 0;
            (this.boardContainer.children as PIXI.Sprite[]).forEach((element) => {
                if (!tetTextures.has(tetBoard[i].value as TypeOfTet)) {
                    element.texture = textureEmptyBlock;
                } else {
                    element.texture = tetTextures.get((tetBoard[i].value as TypeOfTet)) as PIXI.Texture;
                }
                i++;
            });
            this.scoreText.text = `Score : ${this.gameStatus.getScore()}`;
        });
    }

    public init() {
        //info container
        this.infoContainer.width = this.tetrisBoard.COLS * this.oneBlockSize;
        this.infoContainer.height = this.tetrisBoard.COLS * this.oneBlockSize;
        this.infoContainer.addChild(this.scoreText);
        this.infoContainer.x =
            this.app.screen.width / 4 - (this.tetrisBoard.COLS * this.oneBlockSize) / 2;
        this.infoContainer.y =
            this.app.screen.height / 2 - (this.tetrisBoard.ROWS * this.oneBlockSize) / 2;
        this.app.stage.addChild(this.infoContainer);
        // this.infoContainer.
        // board container
        this.boardContainer.width = this.tetrisBoard.COLS * this.oneBlockSize;
        this.boardContainer.height = this.tetrisBoard.COLS * this.oneBlockSize;
        // this.boardContainer.pivot.set(this.boardContainer.width/2, this.boardContainer.height/2);
        this.boardContainer.x =
            this.app.screen.width / 4 + this.app.screen.width / 2 - (this.tetrisBoard.COLS * this.oneBlockSize) / 2;
        this.boardContainer.y =
            this.app.screen.height / 2 - (this.tetrisBoard.ROWS * this.oneBlockSize) / 2;
        console.log(this.boardContainer);
        this.app.stage.addChild(this.boardContainer);
        this.generateViewBoard();
        this.randomTetrimino();
        this.gameStatus.startTimer();
        // this.gameStatus.stopInterval();
    }

    private generateViewBoard() {
        const textureEmptyBlock = PIXI.Texture.from("/assets/images/tet_0.png");

        this.tetrisBoard.getBoard().forEach((field) => {
            let block: PIXI.Sprite = new PIXI.Sprite();
            block = PIXI.Sprite.from(textureEmptyBlock);
            block.x = field.x * this.oneBlockSize;
            block.y = field.y * this.oneBlockSize;
            this.boardContainer.addChild(block);
        });
    }

    public onKey(e: KeyboardEvent) {
        console.log(e);
        switch (e.key) {
            case TypeOfKey.DOWN:
                this.goDown();
                this.gameStatus.addOnePoint();
                break;
            case TypeOfKey.RIGHT:
                this.tetrimino = this.tetriminoRun.swipRightWithCheck(this.tetrimino);
                break;
            case TypeOfKey.LEFT:
                this.tetrimino = this.tetriminoRun.swipLeftWithCheck(this.tetrimino);
                break;
            case TypeOfKey.UP:
                this.tetrimino = this.tetriminoRun.rotate(this.tetrimino);
                break;
            default:
                break;
        }
    }

    public goDown() {
        if (this.tetriminoRun.checkMove(this.tetrimino, Directions.DOWN)) {
            this.tetrimino = this.tetriminoRun.swipDown(this.tetrimino);
        } else {


            // test
            // console.log(`linia 21: filled ${this.tetrisBoard.checkLine(21)}`);
            console.log(this.tetrisBoard.checkAllLines());
            if (this.tetrisBoard.checkLine(21)){
                this.tetrisBoard.clearLine(21);
                this.tetrisBoard.moveLinesDown(21);
            }
            if (this.tetrisBoard.checkLine(20)){
                this.tetrisBoard.clearLine(20);
                this.tetrisBoard.moveLinesDown(20);
            }
            if (this.tetrisBoard.checkLine(19)) {
                this.tetrisBoard.clearLine(19);
                this.tetrisBoard.moveLinesDown(19);
            }
            if (this.tetrisBoard.checkLine(18)) {
                this.tetrisBoard.clearLine(18);
                this.tetrisBoard.moveLinesDown(18);
            }


            this.randomTetrimino();
            //dodanie nowego tetrimino po braku moźliwości ruchu w dół!!!!!






            // this.gameStatus.changeInterval(this.gameStatus.getTimeInterval()-100);
        }
    }

    public randomTetrimino() {
        // this.tetrimino = this.tetrisBoard.insertTetrimino(TypeOfTet.Z);
        this.tetrimino = this.tetrisBoard.insertTetrimino(this.listOfTypeOfTet[Math.floor(Math.random() * (this.listOfTypeOfTet.length-1))]);
    }
}

//dodawanie sprite PIXI
// // first block tetris
// let texture = PIXI.Texture.from('/assets/images/tet_1.png');
// this.tetrisBlock1 = PIXI.Sprite.from(texture);
// this.tetrisBlock1.anchor.x = 0.5;
// this.tetrisBlock1.anchor.y = 0.5;
// this.tetrisBlock1.x = this.app.screen.width / 2;
// this.tetrisBlock1.y = this.app.screen.height / 2;
// this.app.stage.addChild(this.tetrisBlock1);

// this.tetrisBlock1.interactive=true;
// this.tetrisBlock1.on('pointertap', ()=> {
//     this.tetrisBlock1.y += 100;
//     if (this.tetrisBlock1.y >= this.app.screen.height){
//         this.tetrisBlock1.y = 100;
//     }
// })

// // second block tetris
// texture = PIXI.Texture.from('/assets/images/tet_2.png');
// this.tetrisBlock2 = PIXI.Sprite.from(texture);
// this.tetrisBlock2.anchor.x = 0.5;
// this.tetrisBlock2.anchor.y = 0.5;
// this.tetrisBlock2.x = 200;
// this.tetrisBlock2.y = 200;
// this.app.stage.addChild(this.tetrisBlock2);
// this.tetrisBlock2.interactive = true;
// this.tetrisBlock2.on('pointertap', () => {
//     this.tetrisBlock2.x +=100;
//     if (this.tetrisBlock2.x >= this.app.screen.width) {
//         this.tetrisBlock2.x = 100;
//     }
// })

// resources wykorzystanie przyklad

// this.loaderPixi.add('tet1','/assets/images/tet_1.png')
// .add('tet2','/assets/images/tet_2.png')
// .add('tet','/assets/images/tet.png')
// .load();

// this.loaderPixi.onComplete.add((resources)=>{
// console.log(resources.resources);

// });

// resources.resources.
// conveert objects from resourses to aray
// let resourcesArray = Object.keys(resources.resources).map((key) =>[key, resources.resources[key]]);
// console.log(resourcesArray);

// //generate sprites from resourses
// resourcesArray.forEach(element =>{
//     console.log(element[1].texture);
//     this.sprites.push(PIXI.Sprite.from(element[1].texture));
// })

// console.log("Sprites loaded");
// console.log(this.sprites);

// this.sprites.forEach(element => {
//     element.interactive = true;
//     element.anchor.set(0.5);
//     element.x = Math.random() * this.app.screen.width;
//     element.y = Math.random() * this.app.screen.height;
//     element.on("pointertap", () =>{
//         element.rotation+= Math.PI/2;
//     })
//     this.app.stage.addChild(element);
// })

// //create the tetris block from element tet (tetContainer
// this.tetContainer.width = 96;
// this.tetContainer.height = this.oneBlockSize;

// for (let i = 0; i <4 ;i++) {
//     const element = PIXI.Sprite.from(resources.resources.tet.texture);
//     element.x = i*this.oneBlockSize;
//     element.y = 0;
//     this.tetContainer.addChild(element);
// }
// this.tetContainer.x = 0;
// this.tetContainer.y = 0;
// // this.tetContainer.pivot.x = this.tetContainer.width /2;
// // this.tetContainer.pivot.y = this.tetContainer.height /2;
// this.app.stage.addChild(this.tetContainer);

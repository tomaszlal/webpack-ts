import * as PIXI from "pixi.js";
import { ArrayBoard, Field } from "./model/board";
import { TetrisBoard } from "./tetrisBoard";
import { Tetrimino } from "./model/tetimino";
import { Directions } from "./model/directions";
import { TypeOfTet } from "./model/type_of_tet";

export class GameManager {
    private app: PIXI.Application;
    // public tetrisBlock1:PIXI.Sprite = new PIXI.Sprite();
    // public tetrisBlock2:PIXI.Sprite = new PIXI.Sprite();
    // public loaderPixi:PIXI.Loader = new PIXI.Loader();
    // public sprites: Array<PIXI.Sprite> = [];
    // public tetContainer: PIXI.Container = new PIXI.Container();
    public boardContainer: PIXI.Container = new PIXI.Container();

    // public xField: Array<string> = [];
    // public yLine: Array<Array<string>> = [];

    private tetrisBoard: TetrisBoard;
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
            height: 800,
            backgroundColor: 0xeeeeee,
        });
        document.body.appendChild(this.app.view);
        this.tetrisBoard = new TetrisBoard();
        // ['keydown' as const, 'keyup' as const]
        ["keydown" as const].forEach((eventName) => {
            document.addEventListener(eventName, (e) => {
                this.onKey(e);
            });
        });

        this.init();
    }

    public addTicker(): void {
        const texTetI = PIXI.Texture.from("/assets/images/tet_I.png");
        const texTetT = PIXI.Texture.from("/assets/images/tet_T.png");
        const texTetO = PIXI.Texture.from("/assets/images/tet_O.png");
        const texTetL = PIXI.Texture.from("/assets/images/tet_L.png");
        const texTetJ = PIXI.Texture.from("/assets/images/tet_J.png");
        const texTetS = PIXI.Texture.from("/assets/images/tet_S.png");
        const texTetZ = PIXI.Texture.from("/assets/images/tet_Z.png");
        const textureEmptyBlock = PIXI.Texture.from("/assets/images/tet_empty.png");
        this.app.ticker.add((delta) => {
            let i = 0;
            this.boardContainer.children.forEach((element) => {
                switch (this.tetrisBoard.getBoard()[i].value) {
                    case "I":
                        (element as PIXI.Sprite).texture = texTetI;
                        break;
                    case "T":
                        (element as PIXI.Sprite).texture = texTetT;
                        break;
                    case "O":
                        (element as PIXI.Sprite).texture = texTetO;
                        break;
                    case "L":
                        (element as PIXI.Sprite).texture = texTetL;
                        break;
                    case "J":
                        (element as PIXI.Sprite).texture = texTetJ;
                        break;
                    case "S":
                        (element as PIXI.Sprite).texture = texTetS;
                        break;
                    case "Z":
                        (element as PIXI.Sprite).texture = texTetZ;
                        break;
                    default:
                        (element as PIXI.Sprite).texture = textureEmptyBlock;
                        break;
                }
                i++;
            });
        });
    }

    public init() {
        // this.tetrisBoard.setAllFieldsInBoardRandom();
        // console.log(this.tetrisBoard.getBoard());
        // console.log(this.tetrisBoard.moveDown(this.tetrimino));

        // this.tetrisBoard.setField(85);
        // this.tetrisBoard.setField(65);

        //init container - board
        this.boardContainer.width = this.tetrisBoard.COLS * 24;
        this.boardContainer.height = this.tetrisBoard.COLS * 24;
        // this.boardContainer.pivot.set(this.boardContainer.width/2, this.boardContainer.height/2);
        this.boardContainer.x =
            this.app.screen.width / 2 - (this.tetrisBoard.COLS * 24) / 2;
        this.boardContainer.y =
            this.app.screen.height / 2 - (this.tetrisBoard.ROWS * 24) / 2;
        console.log(this.boardContainer);
        this.app.stage.addChild(this.boardContainer);

        this.generateViewBoard();


        // this.tetrimino = this.tetrisBoard.insertTeriminoI();
        // this.tetrimino = this.tetrisBoard.insertTetriminoT();
        this.tetrimino = this.tetrisBoard.insertTetrimino(TypeOfTet.S)
    }

    private generateViewBoard() {
        const textureEmptyBlock = PIXI.Texture.from("/assets/images/tet_empty.png");

        this.tetrisBoard.getBoard().forEach((field) => {
            let block: PIXI.Sprite = new PIXI.Sprite();
            block = PIXI.Sprite.from(textureEmptyBlock);
            block.x = field.x * 24;
            block.y = field.y * 24;
            this.boardContainer.addChild(block);
        });
    }

    onKey(e: KeyboardEvent) {
        console.log(e);
        switch (e.key) {
            case "ArrowDown":
                {
                    console.log(this.tetrisBoard.checkMove(this.tetrimino, Directions.DOWN));

                    if (this.tetrisBoard.checkMove(this.tetrimino, Directions.DOWN)) {
                        this.tetrimino = this.tetrisBoard.moveDown(this.tetrimino);
                    } else {

                        //this is the test 
                        let randOfType = Math.floor(Math.random() * (7 - 1 + 1) + 1);
                        switch (randOfType) {
                            case 1:
                                this.tetrimino = this.tetrisBoard.insertTetrimino(TypeOfTet.I);
                                break;
                            case 2:
                                this.tetrimino = this.tetrisBoard.insertTetrimino(TypeOfTet.T);
                                break;
                            case 3:
                                this.tetrimino = this.tetrisBoard.insertTetrimino(TypeOfTet.O);
                                break;
                            case 4:
                                this.tetrimino = this.tetrisBoard.insertTetrimino(TypeOfTet.L);
                                break;
                            case 5:
                                this.tetrimino = this.tetrisBoard.insertTetrimino(TypeOfTet.J);
                                break;
                            case 6:
                                this.tetrimino = this.tetrisBoard.insertTetrimino(TypeOfTet.S);
                                break;
                            case 7:
                                this.tetrimino = this.tetrisBoard.insertTetrimino(TypeOfTet.Z);
                                break;
                            default:
                                break;
                        }
                        //dodanie nowego tetrimino po braku moźliwości ruchu w dół!!!!!
                    }
                }

                break;
            case "ArrowRight":
                {
                    console.log(this.tetrisBoard.checkMove(this.tetrimino, Directions.RIGHT));

                    if (this.tetrisBoard.checkMove(this.tetrimino, Directions.RIGHT)) {
                        this.tetrimino = this.tetrisBoard.moveRight(this.tetrimino);
                    } else {
                        // this.tetrimino = this.tetrisBoard.insertTeriminoO();
                    }
                }

                break;
            case "ArrowLeft":
                {
                    console.log(this.tetrisBoard.checkMove(this.tetrimino, Directions.LEFT));

                    if (this.tetrisBoard.checkMove(this.tetrimino, Directions.LEFT)) {
                        this.tetrimino = this.tetrisBoard.moveLeft(this.tetrimino);
                    } else {
                        // this.tetrimino = this.tetrisBoard.insertTeriminoO();
                    }
                }

                break;
            case "ArrowUp":
                {
                    this.tetrimino = this.tetrisBoard.rotate(this.tetrimino);
                }

                break;
            default:
                break;
        }
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
// this.tetContainer.height = 24;

// for (let i = 0; i <4 ;i++) {
//     const element = PIXI.Sprite.from(resources.resources.tet.texture);
//     element.x = i*24;
//     element.y = 0;
//     this.tetContainer.addChild(element);
// }
// this.tetContainer.x = 0;
// this.tetContainer.y = 0;
// // this.tetContainer.pivot.x = this.tetContainer.width /2;
// // this.tetContainer.pivot.y = this.tetContainer.height /2;
// this.app.stage.addChild(this.tetContainer);

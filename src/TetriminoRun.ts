import { TypeOfTet } from "./model/TypeOfTet";
import { Directions } from "./model/directions";
import { Tetrimino } from "./model/tetimino";
import { TetrisBoard } from "./TetrisBoard";
import { TetriminoRotate } from "./TetriminoRotate";

export class TetriminoRun {
    public tetrisBoard: TetrisBoard;
    public tetriminoRotate: TetriminoRotate;

    constructor(tetrisBoard: TetrisBoard) {
        this.tetrisBoard = tetrisBoard;
        this.tetriminoRotate = new TetriminoRotate(tetrisBoard);
    }

    public swipLeftWithCheck(tetrimino: Tetrimino): Tetrimino {
        if (this.checkMove(tetrimino, Directions.LEFT)) {
            const newTetrimino: Tetrimino = this.getNewTempTetrimino(tetrimino);
            tetrimino.fields.forEach(field => {
                this.tetrisBoard.clearField(field);
                newTetrimino.fields.push(field - 1);
            });
            newTetrimino.fields.forEach(field => {
                this.tetrisBoard.setField(field, newTetrimino.type);
            });
            return newTetrimino;
        }
        return tetrimino;
    }

    public swipRightWithCheck(tetrimino: Tetrimino): Tetrimino {
        if (this.checkMove(tetrimino, Directions.RIGHT)) {
            const newTetrimino: Tetrimino = this.getNewTempTetrimino(tetrimino);
            tetrimino.fields.forEach(field => {
                this.tetrisBoard.clearField(field);
                newTetrimino.fields.push(field + 1);
            });
            newTetrimino.fields.forEach(field => {
                this.tetrisBoard.setField(field, newTetrimino.type);
            });
            return newTetrimino;
        }
        return tetrimino;
    }

    private getNewTempTetrimino(tetrimino: Tetrimino): Tetrimino {
        return {
            type: tetrimino.type,
            fields: []
        };
    }

    public swipDown(tetrimino: Tetrimino): Tetrimino {
        const newTetrimino: Tetrimino = this.getNewTempTetrimino(tetrimino);
        tetrimino.fields.forEach(field => {
            this.tetrisBoard.clearField(field);
            newTetrimino.fields.push(field + this.tetrisBoard.COLS);
        });
        newTetrimino.fields.forEach(field => {
            this.tetrisBoard.setField(field, newTetrimino.type);
        });
        return newTetrimino;
    }

    public checkMove(tetrimino: Tetrimino, direction: Directions): boolean {    //direction:  "R" or "L" or "D"
        let isMovePossible = false;
        switch (direction) {
            case Directions.DOWN: {
                isMovePossible = this.isMovePosiibleDown(tetrimino);
            }

                break;
            case Directions.RIGHT: {
                isMovePossible = this.isMovePossibleRight(tetrimino);
            }
                break;
            case Directions.LEFT: {
                isMovePossible = this.isMovePossibleLeft(tetrimino);
            }
                break;
            default:
                break;
        }
        return isMovePossible;

    }

    private isMovePossibleLeft(tetrimino: Tetrimino) {
        let isMovePossible = true;
        let checkList: Array<boolean> = [];
        tetrimino.fields.forEach(field => {
            if (!tetrimino.fields.includes(field - 1)) {
                if (field % this.tetrisBoard.COLS > 0) {
                    checkList.push(true);
                    if (this.tetrisBoard.isEmpty(field - 1)) {
                        checkList.push(true);
                    } else {
                        checkList.push(false);
                    }
                } else {
                    checkList.push(false);
                }
            }
        });
        checkList.forEach(check => {
            isMovePossible = isMovePossible && check;
        });
        return isMovePossible;
    }

    private isMovePossibleRight(tetrimino: Tetrimino) {
        let isMovePossible = true;
        let checkList: Array<boolean> = [];
        tetrimino.fields.forEach(field => {
            if (!tetrimino.fields.includes(field + 1)) {
                if (field % this.tetrisBoard.COLS < this.tetrisBoard.COLS - 1) {
                    checkList.push(true);
                    if (this.tetrisBoard.isEmpty(field + 1)) {
                        checkList.push(true);
                    } else {
                        checkList.push(false);
                    }
                } else {
                    checkList.push(false);
                }
            }
        });
        checkList.forEach(check => {
            isMovePossible = isMovePossible && check;
        });
        return isMovePossible;
    }

    private isMovePosiibleDown(tetrimino: Tetrimino) {
        let isMovePossible = true;
        let checkList: Array<boolean> = [];
        tetrimino.fields.forEach(field => {
            if (!tetrimino.fields.includes(field + this.tetrisBoard.COLS)) { //jeżeli tetermino nie zawiera kolejnych pol po dodaniu szerokosci planszy 
                console.log(field);
                if (field + this.tetrisBoard.COLS < this.tetrisBoard.COLS * this.tetrisBoard.ROWS) { //jeżeli pole +10(szerokosc planszy) nie wychodzi poza wielkosc planszy
                    checkList.push(true);
                    if (this.tetrisBoard.isEmpty(field + this.tetrisBoard.COLS)) { //czy poniżej jednego z najniższego pola planszy znajduje się 
                        checkList.push(true);
                    } else {
                        checkList.push(false);
                    }
                } else {
                    checkList.push(false);
                }
            }
        });
        checkList.forEach(check => {
            isMovePossible = isMovePossible && check;
        });
        return isMovePossible;
    }

    public rotate(tetrimino: Tetrimino): Tetrimino {
        const newTetrimino: Tetrimino = this.getNewTempTetrimino(tetrimino);
        const min = Math.min(...tetrimino.fields);
        const max = Math.max(...tetrimino.fields);
        tetrimino.fields = tetrimino.fields.sort((a, b) => a - b);
        let answer: Tetrimino = { type: tetrimino.type, fields: [] }
        switch (tetrimino.type) {
            case TypeOfTet.I:
                answer = this.tetriminoRotate.checkAndRotateTetriminoI(tetrimino, min, max, newTetrimino);
                if (answer !== tetrimino) return answer;
                break;
            case TypeOfTet.T:
                answer = this.tetriminoRotate.checkAndRotateTetriminoT(tetrimino, min, max, newTetrimino);
                if (answer !== tetrimino) return answer;
                break;
            case TypeOfTet.L:
                answer = this.tetriminoRotate.checkAndRotateTetriminoL(tetrimino, min, max, newTetrimino);
                if (answer !== tetrimino) return answer;
                break;
            case TypeOfTet.J:
                answer = this.tetriminoRotate.checkAndRotateTetriminoJ(tetrimino, min, max, newTetrimino);
                if (answer !== tetrimino) return answer;
                break;
            case TypeOfTet.S:
                answer = this.tetriminoRotate.checkAndRotateTetriminoS(tetrimino, min, max, newTetrimino);
                if (answer !== tetrimino) return answer;
                break;
            case TypeOfTet.Z:
                answer = this.tetriminoRotate.checkAndRotateTetriminoZ(tetrimino, min, max, newTetrimino);
                if (answer !== tetrimino) return answer;
                break;

        }

        return tetrimino;
    }

  
}

import { TypeOfTet } from "./model/TypeOfTet";
import { Directions } from "./model/directions";
import { Tetrimino } from "./model/tetimino";
import { TetrisBoard } from "./tetrisBoard";

export class TetriminoRun {
    public tetrisBoard: TetrisBoard;

    constructor(tetrisBoard: TetrisBoard) {
        this.tetrisBoard = tetrisBoard;
    }

    public swipLeftWithCheck(tetrimino: Tetrimino): Tetrimino {
        if (this.checkMove(tetrimino, Directions.LEFT)) {
            let newTetrimino: Tetrimino = {
                type: tetrimino.type,
                fields: []
            };
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
            let newTetrimino: Tetrimino = {
                type: tetrimino.type,
                fields: []
            };
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

    public swipDown(tetrimino: Tetrimino): Tetrimino {
        let newTetrimino: Tetrimino = {
            type: tetrimino.type,
            fields: []
        };
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
                isMovePossible = true;
                let checkList: Array<boolean> = [];
                tetrimino.fields.forEach(field => {         //sprawdzenie wszystkich pol w tetermino
                    if (!tetrimino.fields.includes(field + this.tetrisBoard.COLS)) {        //jeżeli tetermino nie zawiera kolejnych pol po dodaniu szerokosci planszy 
                        console.log(field);
                        if (field + this.tetrisBoard.COLS < this.tetrisBoard.COLS * this.tetrisBoard.ROWS) { //jeżeli pole +10(szerokosc planszy) nie wychodzi poza wielkosc planszy
                            checkList.push(true);
                            if (this.tetrisBoard.isEmpty(field + this.tetrisBoard.COLS)) {       //czy poniżej jednego z najniższego pola planszy znajduje się 
                                checkList.push(true);
                            } else {
                                checkList.push(false);
                            }
                        } else {
                            checkList.push(false);
                        }
                    }
                })
                checkList.forEach(check => {
                    isMovePossible = isMovePossible && check;
                })
            }

                break;
            case Directions.RIGHT: {
                isMovePossible = true;
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
                })
                checkList.forEach(check => {
                    isMovePossible = isMovePossible && check;
                })
            }
                break;
            case Directions.LEFT: {
                isMovePossible = true;
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
                })
                checkList.forEach(check => {
                    isMovePossible = isMovePossible && check;
                })
            }
                break;
            default:
                break;
        }
        return isMovePossible;

    }

    public rotate(tetrimino: Tetrimino): Tetrimino {
        let newTetrimino: Tetrimino = {
            type: tetrimino.type,
            fields: []
        };
        const min = Math.min(...tetrimino.fields);
        const max = Math.max(...tetrimino.fields);
        tetrimino.fields = tetrimino.fields.sort((a, b) => a - b);

        switch (tetrimino.type) {
            case TypeOfTet.I:
                const middle = tetrimino.fields[1];
                if (max - min === 30) {   // tetriminoI set vertical alignment
                    console.log(min, max, middle);
                    let arrForTestLine: Array<number> = [];
                    for (let i = -1; i < 3; i++) {
                        arrForTestLine.push(middle + i);
                    }
                    if (this.tetrisBoard.isEmpty(middle - 1) && this.tetrisBoard.isEmpty(middle + 1) && this.tetrisBoard.isEmpty(middle + 2)
                        && this.tetrisBoard.areInTheSameLine(arrForTestLine)) {
                        console.log("da sie");
                        tetrimino.fields.forEach(field => {
                            this.tetrisBoard.clearField(field);
                        })
                        for (let i = -1; i < 3; i++) {
                            this.tetrisBoard.setField(middle + i, newTetrimino.type);
                            newTetrimino.fields.push(middle + i);
                        }
                        return newTetrimino;
                    }
                } else {
                    if ((middle + this.tetrisBoard.COLS < this.tetrisBoard.COLS * this.tetrisBoard.ROWS) && (middle + 2 * this.tetrisBoard.COLS < this.tetrisBoard.COLS * this.tetrisBoard.ROWS)) {
                        if (this.tetrisBoard.isEmpty(middle + this.tetrisBoard.COLS) && this.tetrisBoard.isEmpty(middle + 2 * this.tetrisBoard.COLS)) {
                            console.log("da sie2");
                            tetrimino.fields.forEach(field => {
                                this.tetrisBoard.clearField(field);
                            })
                            for (let i = -this.tetrisBoard.COLS; i < 3 * this.tetrisBoard.COLS; i += this.tetrisBoard.COLS) {
                                this.tetrisBoard.setField(middle + i, newTetrimino.type);
                                newTetrimino.fields.push(middle + i);
                            }
                            return newTetrimino;
                        }
                    }


                }
                break;
            case TypeOfTet.T:
                if (max - min === 11) {  //is in position T or reverse
                    if (min + 1 === tetrimino.fields[1]) {
                        if (min + 2 * this.tetrisBoard.COLS < this.tetrisBoard.COLS * this.tetrisBoard.ROWS && this.tetrisBoard.isEmpty(min + this.tetrisBoard.COLS) && this.tetrisBoard.isEmpty(min + 2 * this.tetrisBoard.COLS)) {
                            tetrimino.fields.forEach(field => this.tetrisBoard.clearField(field));
                            for (let i = 0; i < 3 * this.tetrisBoard.COLS; i += this.tetrisBoard.COLS) {
                                newTetrimino.fields.push(min + i);
                            }
                            newTetrimino.fields.push(max);
                            newTetrimino.fields.forEach(field => this.tetrisBoard.setField(field, newTetrimino.type));
                            console.log(newTetrimino.fields);
                            return newTetrimino;
                        }
                    } else {
                        if (this.tetrisBoard.isEmpty(max - this.tetrisBoard.COLS) && this.tetrisBoard.isEmpty(max - 2 * this.tetrisBoard.COLS)) {
                            tetrimino.fields.forEach(field => this.tetrisBoard.clearField(field));
                            for (let i = 0; i > (-3 * this.tetrisBoard.COLS); i -= this.tetrisBoard.COLS) {
                                newTetrimino.fields.push(max + i);
                            }
                            newTetrimino.fields.push(min);
                            newTetrimino.fields.forEach(field => this.tetrisBoard.setField(field, newTetrimino.type));
                            return newTetrimino;
                        }

                    }
                } else {
                    if (min + this.tetrisBoard.COLS + 1 === tetrimino.fields[2]) {
                        let arrForTestLine: Array<number> = [];
                        for (let i = 0; i < 3; i++) {
                            arrForTestLine.push(max + i);
                        }
                        if (this.tetrisBoard.isEmpty(max + 1) && this.tetrisBoard.isEmpty(max + 2) && this.tetrisBoard.areInTheSameLine(arrForTestLine)) {
                            for (let i = 0; i < 3; i++) {
                                newTetrimino.fields.push(max + i);
                            }
                            newTetrimino.fields.push(tetrimino.fields[2]);
                            tetrimino.fields.forEach(field => this.tetrisBoard.clearField(field));
                            newTetrimino.fields.forEach(field => this.tetrisBoard.setField(field, newTetrimino.type));
                            return newTetrimino;
                        }
                    } else {
                        let arrForTestLine: Array<number> = [];
                        for (let i = 0; i < 3; i++) {
                            arrForTestLine.push(min - i);
                        }
                        if (this.tetrisBoard.isEmpty(min - 1) && this.tetrisBoard.isEmpty(min - 2) && this.tetrisBoard.areInTheSameLine(arrForTestLine)) {
                            for (let i = 0; i < 3; i++) {
                                newTetrimino.fields.push(min - i);
                            }
                            newTetrimino.fields.push(tetrimino.fields[1]);
                            tetrimino.fields.forEach(field => this.tetrisBoard.clearField(field));
                            newTetrimino.fields.forEach(field => this.tetrisBoard.setField(field, newTetrimino.type));
                            return newTetrimino;
                        }

                    }


                }
                break;
            case TypeOfTet.L:
                if (max - min === 21) {
                    if (min + 1 === tetrimino.fields[1]) { //axe shape
                        let arrForTestLine: Array<number> = [];
                        for (let i = 0; i < 3; i++) {
                            arrForTestLine.push(min + this.tetrisBoard.COLS + i);
                        }
                        if (this.tetrisBoard.isEmpty(min + this.tetrisBoard.COLS) && this.tetrisBoard.isEmpty(min + this.tetrisBoard.COLS * 2) && this.tetrisBoard.isEmpty(min + this.tetrisBoard.COLS + 2) && this.tetrisBoard.areInTheSameLine(arrForTestLine)) {
                            for (let i = 0; i < 3; i++) {
                                newTetrimino.fields.push(min + this.tetrisBoard.COLS + i);
                            }
                            newTetrimino.fields.push(min + 2 * this.tetrisBoard.COLS);
                            tetrimino.fields.forEach(field => this.tetrisBoard.clearField(field));
                            newTetrimino.fields.forEach(field => this.tetrisBoard.setField(field, newTetrimino.type));
                            return newTetrimino;
                        }

                    } else { //L-shape
                        let arrForTestLine: Array<number> = [];
                        for (let i = 0; i < 3; i++) {
                            arrForTestLine.push(max - this.tetrisBoard.COLS - i);
                        }
                        if (this.tetrisBoard.isEmpty(min + 1) && this.tetrisBoard.isEmpty(max - this.tetrisBoard.COLS) && this.tetrisBoard.isEmpty(max - this.tetrisBoard.COLS - 2) && this.tetrisBoard.areInTheSameLine(arrForTestLine)) {
                            for (let i = 0; i < 3; i++) {
                                newTetrimino.fields.push(max - this.tetrisBoard.COLS - i);
                            }
                            newTetrimino.fields.push(min + 1);
                            tetrimino.fields.forEach(field => this.tetrisBoard.clearField(field));
                            newTetrimino.fields.forEach(field => this.tetrisBoard.setField(field, newTetrimino.type));
                            return newTetrimino;


                        }
                    }


                } else {//horizontal

                    if (min + 1 === tetrimino.fields[1]) {
                        if (this.tetrisBoard.isEmpty(max + 1) && this.tetrisBoard.isEmpty(max + 2) && this.tetrisBoard.isEmpty(max - 19)) {
                            for (let i = 0; i < 3; i++) {
                                newTetrimino.fields.push(max + 1 - i * this.tetrisBoard.COLS);
                            }
                            newTetrimino.fields.push(max + 2);
                            tetrimino.fields.forEach(field => this.tetrisBoard.clearField(field));
                            newTetrimino.fields.forEach(field => this.tetrisBoard.setField(field, newTetrimino.type));
                            return newTetrimino;
                        }

                    } else {
                        if (min - 1 + 2 * this.tetrisBoard.COLS < this.tetrisBoard.COLS * this.tetrisBoard.ROWS) {
                            if (this.tetrisBoard.isEmpty(min - 1) && this.tetrisBoard.isEmpty(min - 2) && this.tetrisBoard.isEmpty(min + 19)) {
                                for (let i = 0; i < 3; i++) {
                                    newTetrimino.fields.push(min - 1 + i * this.tetrisBoard.COLS);
                                }
                                newTetrimino.fields.push(min - 2);
                                tetrimino.fields.forEach(field => this.tetrisBoard.clearField(field));
                                newTetrimino.fields.forEach(field => this.tetrisBoard.setField(field, newTetrimino.type));
                                return newTetrimino;
                            }
                        }
                    }
                }
                break;
            case TypeOfTet.J:
                if (max - min === 20) { //shape is J or rotate 180
                    if (min + this.tetrisBoard.COLS === tetrimino.fields[1]) { //shape J
                        let arrForTestLine: Array<number> = [];
                        for (let i = 0; i < 3; i++) {
                            arrForTestLine.push(min + this.tetrisBoard.COLS - i);
                        }
                        if (this.tetrisBoard.isEmpty(min + this.tetrisBoard.COLS - 1) && this.tetrisBoard.isEmpty(min + this.tetrisBoard.COLS - 2) && this.tetrisBoard.areInTheSameLine(arrForTestLine)) {
                            for (let i = 0; i < 3; i++) {
                                newTetrimino.fields.push(min + this.tetrisBoard.COLS - i);
                            }
                            newTetrimino.fields.push(max);
                            tetrimino.fields.forEach(field => this.tetrisBoard.clearField(field));
                            newTetrimino.fields.forEach(field => this.tetrisBoard.setField(field, newTetrimino.type));
                            return newTetrimino;
                        }

                    } else { //shape rotate 180 J
                        let arrForTestLine: Array<number> = [];
                        for (let i = 0; i < 3; i++) {
                            arrForTestLine.push(min + this.tetrisBoard.COLS + i);
                        }
                        if (this.tetrisBoard.isEmpty(min + this.tetrisBoard.COLS + 1) && this.tetrisBoard.isEmpty(min + this.tetrisBoard.COLS + 2) && this.tetrisBoard.areInTheSameLine(arrForTestLine)) {
                            for (let i = 0; i < 3; i++) {
                                newTetrimino.fields.push(min + this.tetrisBoard.COLS + i);
                            }
                            newTetrimino.fields.push(min);
                            tetrimino.fields.forEach(field => this.tetrisBoard.clearField(field));
                            newTetrimino.fields.forEach(field => this.tetrisBoard.setField(field, newTetrimino.type));
                            return newTetrimino;
                        }
                    }
                } else {
                    if (min + 1 === tetrimino.fields[1]) {
                        if (min + 1 + 2 * this.tetrisBoard.COLS < this.tetrisBoard.COLS * this.tetrisBoard.ROWS) {
                            if (this.tetrisBoard.isEmpty(min + 1 + 2 * this.tetrisBoard.COLS) && this.tetrisBoard.isEmpty(min + 1 + this.tetrisBoard.COLS)) {
                                for (let i = 0; i < 3; i++) {
                                    newTetrimino.fields.push(min + 1 + i * this.tetrisBoard.COLS);
                                }
                                newTetrimino.fields.push(min + 2);
                                tetrimino.fields.forEach(field => this.tetrisBoard.clearField(field));
                                newTetrimino.fields.forEach(field => this.tetrisBoard.setField(field, newTetrimino.type));
                                return newTetrimino;
                            }
                        }
                    } else {
                        if (this.tetrisBoard.isEmpty(min + 1) && this.tetrisBoard.isEmpty(min + 1 - this.tetrisBoard.COLS)) {
                            for (let i = 0; i < 3; i++) {
                                newTetrimino.fields.push(max - 1 - i * this.tetrisBoard.COLS);
                            }
                            newTetrimino.fields.push(min + this.tetrisBoard.COLS);
                            tetrimino.fields.forEach(field => this.tetrisBoard.clearField(field));
                            newTetrimino.fields.forEach(field => this.tetrisBoard.setField(field, newTetrimino.type));
                            return newTetrimino;
                        }
                    }

                }
                break;
            case TypeOfTet.S:
                if (max - min === 10) { //shape S horizontal
                    if (max + this.tetrisBoard.COLS < this.tetrisBoard.COLS * this.tetrisBoard.ROWS) {
                        if (this.tetrisBoard.isEmpty(min - 1) && this.tetrisBoard.isEmpty(max + this.tetrisBoard.COLS)) {
                            for (let i = 0; i < 2; i++) {
                                newTetrimino.fields.push(min - 1 + i * this.tetrisBoard.COLS);
                                newTetrimino.fields.push(max + i * this.tetrisBoard.COLS);
                            }
                            tetrimino.fields.forEach(field => this.tetrisBoard.clearField(field));
                            newTetrimino.fields.forEach(field => this.tetrisBoard.setField(field, newTetrimino.type));
                            return newTetrimino;
                        }
                    }

                } else { //shape S vertical
                    let arrForTestLine: Array<number> = [];
                    for (let i = 0; i < 2; i++) {
                        arrForTestLine.push(min + 1 + i);
                    }
                    if (this.tetrisBoard.isEmpty(min + 1) && this.tetrisBoard.isEmpty(min + 2) && this.tetrisBoard.areInTheSameLine(arrForTestLine)) {
                        for (let i = 0; i < 2; i++) {
                            newTetrimino.fields.push(min + 1 + i);
                            newTetrimino.fields.push(min + this.tetrisBoard.COLS + i);
                        }
                        tetrimino.fields.forEach(field => this.tetrisBoard.clearField(field));
                        newTetrimino.fields.forEach(field => this.tetrisBoard.setField(field, newTetrimino.type));
                        return newTetrimino;
                    }
                }
                break;
            case TypeOfTet.Z:
                if (max - min === 12) {//shape Z horizontal
                    if (max - 1 + this.tetrisBoard.COLS < this.tetrisBoard.COLS * this.tetrisBoard.ROWS) {
                        if (this.tetrisBoard.isEmpty(min + 2) && this.tetrisBoard.isEmpty(max - 1 + this.tetrisBoard.COLS)) {
                            for (let i = 0; i < 2; i++) {
                                newTetrimino.fields.push(min + 2 + i * this.tetrisBoard.COLS);
                                newTetrimino.fields.push(max - 1 + i * this.tetrisBoard.COLS);
                            }
                            tetrimino.fields.forEach(field => this.tetrisBoard.clearField(field));
                            newTetrimino.fields.forEach(field => this.tetrisBoard.setField(field, newTetrimino.type));
                            return newTetrimino;
                        }
                    }
                } else { //shape Z Vertical
                    let arrForTestLine: Array<number> = [];
                    for (let i = 0; i < 2; i++) {
                        arrForTestLine.push(min - 1 - i);
                    }
                    if (this.tetrisBoard.isEmpty(min - 1) && this.tetrisBoard.isEmpty(min - 2) && this.tetrisBoard.areInTheSameLine(arrForTestLine)) {
                        for (let i = 0; i < 2; i++) {
                            newTetrimino.fields.push(min - 1 - i);
                            newTetrimino.fields.push(max - this.tetrisBoard.COLS + i);
                        }
                        tetrimino.fields.forEach(field => this.tetrisBoard.clearField(field));
                        newTetrimino.fields.forEach(field => this.tetrisBoard.setField(field, newTetrimino.type));
                        return newTetrimino;
                    }
                }
                break;

        }

        return tetrimino;
    }
}
import { PI_2 } from "pixi.js";
import { ArrayBoard, Field } from "./model/board";
import { Directions } from "./model/directions";
import { Tetrimino } from "./model/tetimino";
import { TypeOfTet } from "./model/type_of_tet";

export class TetrisBoard {

    private board: ArrayBoard = [];
    public COLS = 10;
    public ROWS = 22


    constructor() {
        this.setAllFieldsInBoard("0");
    }

    public getBoard(): ArrayBoard {
        return this.board;
    }

    public setAllFieldsInBoard(sign: string): void {
        for (let y = 0; y < this.ROWS; y++) {
            for (let x = 0; x < this.COLS; x++) {
                const field: Field = {
                    "x": x,
                    "y": y,
                    "value": sign
                }
                this.board.push(field);
            }
        }
    }

    // public setAllFieldsInBoardRandom(): void {
    //     this.board = [];
    //     for (let y = 0; y < this.ROWS; y++) {
    //         for (let x = 0; x < this.COLS; x++) {
    //             const field: Field = {
    //                 "x": x,
    //                 "y": y,
    //                 "value": ""
    //             }
    //             if (Math.random() > 0.5) {
    //                 field.value = "0";
    //             } else {
    //                 field.value = "X";
    //             }
    //             this.board.push(field);
    //         }

    //     }
    // }

    // public setField(field: number): void {
    //     this.board.forEach(element => {
    //         if (element === this.board[field]) {
    //             element.value = "X";
    //         }
    //     })
    // }
    public setField(field: number, typeOfTet: TypeOfTet): void {
        this.board.forEach(element => {
            if (element === this.board[field]) {
                element.value = typeOfTet;
            }
        })
    }

    private clearField(field: number): void {
        this.board.forEach(element => {
            if (element === this.board[field]) {
                element.value = "0";
            }
        })
    }

    private isEmpty(field: number): boolean {
        return this.board[field].value == "0";
    }

    private areInTheSameLine(fields: Array<number>): boolean {
        let sameLine: boolean = true;
        let line: number = Math.floor(fields.shift() as number / this.COLS);
        fields.forEach(field => {
            sameLine = (Math.floor(field / this.COLS) == line) && sameLine
        })
        return sameLine;
    }


    // Tetrimino „I” – cztery elementy w jednym szeregu
    // Tetrimino „T” – trzy elementy w rzędzie i jeden dołączony do środkowego elementu
    // Tetrimino „O” – cztery elementy połączone w kwadrat
    // Tetrimino „L” – trzy elementy w rzędzie i jeden dołączony do lewego elementu od spodu
    // Tetrimino „J” – trzy elementy w rzędzie i jeden dołączony do prawego elementu od spodu
    // Tetrimino „S” – tetrimino „O” po przesunięciu dwóch górnych elementów w prawo
    // Tetrimino „Z” – tetrimino „O” po przesunięciu dwóch górnych elementów w lewo

    

    public insertTetrimino(type: TypeOfTet): Tetrimino {
        let tetrimino: Tetrimino = {
            type,
            fields: []
        }
        switch (type) {
            case TypeOfTet.I:
                tetrimino.fields = [4, 14, 24, 34];
                break;

            case TypeOfTet.T:
                tetrimino.fields = [4, 5, 6, 15];
                break;

            case TypeOfTet.O:
                tetrimino.fields = [4, 5, 14, 15];
                break;

            case TypeOfTet.L:
                tetrimino.fields = [4, 14, 24, 25];
                break;

            case TypeOfTet.J:
                tetrimino.fields = [5, 15, 25, 24];
                break;

            case TypeOfTet.S:
                tetrimino.fields = [5, 6, 14, 15];
                break;

            case TypeOfTet.Z:
                tetrimino.fields = [4, 5, 15, 16];
                break;

            default:
                tetrimino.fields = [4, 5, 14, 15];
                break;
        }
        tetrimino.fields.forEach(field => {
            this.setField(field, tetrimino.type);
        })
        return tetrimino;
    }

    public checkMove(tetrimino: Tetrimino, direction: Directions): boolean {    //direction:  "R" or "L" or "D"
        let isMovePossible = false;
        switch (direction) {
            case Directions.DOWN: {
                isMovePossible = true;
                let checkList: Array<boolean> = [];
                tetrimino.fields.forEach(field => {         //sprawdzenie wszystkich pol w tetermino
                    if (!tetrimino.fields.includes(field + this.COLS)) {        //jeżeli tetermino nie zawiera kolejnych pol po dodaniu szerokosci planszy 
                        console.log(field);
                        if (field + this.COLS < this.COLS * this.ROWS) { //jeżeli pole +10(szerokosc planszy) nie wychodzi poza wielkosc planszy
                            checkList.push(true);
                            if (this.isEmpty(field + this.COLS)) {       //czy poniżej jednego z najniższego pola planszy znajduje się 
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
                        if (field % this.COLS < this.COLS - 1) {
                            checkList.push(true);
                            if (this.isEmpty(field + 1)) {
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
                        if (field % this.COLS > 0) {
                            checkList.push(true);
                            if (this.isEmpty(field - 1)) {
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

    public moveDown(tetrimino: Tetrimino): Tetrimino {
        let newTetrimino: Tetrimino = {
            type: tetrimino.type,
            fields: []
        };
        tetrimino.fields.forEach(field => {
            this.clearField(field);
            newTetrimino.fields.push(field + this.COLS);
        });
        newTetrimino.fields.forEach(field => {
            this.setField(field, newTetrimino.type);
        });
        return newTetrimino;
    }

    public moveRight(tetrimino: Tetrimino): Tetrimino {
        let newTetrimino: Tetrimino = {
            type: tetrimino.type,
            fields: []
        };
        tetrimino.fields.forEach(field => {
            this.clearField(field);
            newTetrimino.fields.push(field + 1);
        });
        newTetrimino.fields.forEach(field => {
            this.setField(field, newTetrimino.type);
        });
        return newTetrimino;

    }

    public moveLeft(tetrimino: Tetrimino): Tetrimino {
        let newTetrimino: Tetrimino = {
            type: tetrimino.type,
            fields: []
        };
        tetrimino.fields.forEach(field => {
            this.clearField(field);
            newTetrimino.fields.push(field - 1);
        });
        newTetrimino.fields.forEach(field => {
            this.setField(field, newTetrimino.type);
        });
        return newTetrimino;

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
                if (max - min == 30) {   // tetriminoI set vertical alignment
                    console.log(min, max, middle);
                    let arrForTestLine: Array<number> = [];
                    for (let i = -1; i < 3; i++) {
                        arrForTestLine.push(middle + i);
                    }
                    if (this.isEmpty(middle - 1) && this.isEmpty(middle + 1) && this.isEmpty(middle + 2)
                        && this.areInTheSameLine(arrForTestLine)) {
                        console.log("da sie");
                        tetrimino.fields.forEach(field => {
                            this.clearField(field);
                        })
                        for (let i = -1; i < 3; i++) {
                            this.setField(middle + i, newTetrimino.type);
                            newTetrimino.fields.push(middle + i);
                        }
                        return newTetrimino;
                    }
                } else {
                    if ((middle + this.COLS < this.COLS * this.ROWS) && (middle + 2 * this.COLS < this.COLS * this.ROWS)) {
                        if (this.isEmpty(middle + this.COLS) && this.isEmpty(middle + 2 * this.COLS)) {
                            console.log("da sie2");
                            tetrimino.fields.forEach(field => {
                                this.clearField(field);
                            })
                            for (let i = -this.COLS; i < 3 * this.COLS; i += this.COLS) {
                                this.setField(middle + i, newTetrimino.type);
                                newTetrimino.fields.push(middle + i);
                            }
                            return newTetrimino;
                        }
                    }


                }
                break;
            case TypeOfTet.T:
                if (max - min == 11) {  //is in position T or reverse
                    if (min + 1 == tetrimino.fields[1]) {
                        if (min + 2 * this.COLS < this.COLS * this.ROWS && this.isEmpty(min + this.COLS) && this.isEmpty(min + 2 * this.COLS)) {
                            tetrimino.fields.forEach(field => this.clearField(field));
                            for (let i = 0; i < 3 * this.COLS; i += this.COLS) {
                                newTetrimino.fields.push(min + i);
                            }
                            newTetrimino.fields.push(max);
                            newTetrimino.fields.forEach(field => this.setField(field, newTetrimino.type));
                            console.log(newTetrimino.fields);
                            return newTetrimino;
                        }
                    } else {
                        if (this.isEmpty(max - this.COLS) && this.isEmpty(max - 2 * this.COLS)) {
                            tetrimino.fields.forEach(field => this.clearField(field));
                            for (let i = 0; i > (-3 * this.COLS); i -= this.COLS) {
                                newTetrimino.fields.push(max + i);
                            }
                            newTetrimino.fields.push(min);
                            newTetrimino.fields.forEach(field => this.setField(field, newTetrimino.type));
                            return newTetrimino;
                        }

                    }
                } else {
                    if (min + this.COLS + 1 == tetrimino.fields[2]) {
                        let arrForTestLine: Array<number> = [];
                        for (let i = 0; i < 3; i++) {
                            arrForTestLine.push(max + i);
                        }
                        if (this.isEmpty(max + 1) && this.isEmpty(max + 2) && this.areInTheSameLine(arrForTestLine)) {
                            for (let i = 0; i < 3; i++) {
                                newTetrimino.fields.push(max + i);
                            }
                            newTetrimino.fields.push(tetrimino.fields[2]);
                            tetrimino.fields.forEach(field => this.clearField(field));
                            newTetrimino.fields.forEach(field => this.setField(field, newTetrimino.type));
                            return newTetrimino;
                        }
                    } else {
                        let arrForTestLine: Array<number> = [];
                        for (let i = 0; i < 3; i++) {
                            arrForTestLine.push(min - i);
                        }
                        if (this.isEmpty(min - 1) && this.isEmpty(min - 2) && this.areInTheSameLine(arrForTestLine)) {
                            for (let i = 0; i < 3; i++) {
                                newTetrimino.fields.push(min - i);
                            }
                            newTetrimino.fields.push(tetrimino.fields[1]);
                            tetrimino.fields.forEach(field => this.clearField(field));
                            newTetrimino.fields.forEach(field => this.setField(field, newTetrimino.type));
                            return newTetrimino;
                        }

                    }


                }
                break;
            case TypeOfTet.L:
                if (max - min == 21) {
                    if (min + 1 == tetrimino.fields[1]) { //axe shape
                        let arrForTestLine: Array<number> = [];
                        for (let i = 0; i < 3; i++) {
                            arrForTestLine.push(min + this.COLS + i);
                        }
                        if (this.isEmpty(min + this.COLS) && this.isEmpty(min + this.COLS * 2) && this.isEmpty(min + this.COLS + 2) && this.areInTheSameLine(arrForTestLine)) {
                            for (let i = 0; i < 3; i++) {
                                newTetrimino.fields.push(min + this.COLS + i);
                            }
                            newTetrimino.fields.push(min + 2 * this.COLS);
                            tetrimino.fields.forEach(field => this.clearField(field));
                            newTetrimino.fields.forEach(field => this.setField(field, newTetrimino.type));
                            return newTetrimino;
                        }

                    } else { //L-shape
                        let arrForTestLine: Array<number> = [];
                        for (let i = 0; i < 3; i++) {
                            arrForTestLine.push(max - this.COLS - i);
                        }
                        if (this.isEmpty(min + 1) && this.isEmpty(max - this.COLS) && this.isEmpty(max - this.COLS - 2) && this.areInTheSameLine(arrForTestLine)) {
                            for (let i = 0; i < 3; i++) {
                                newTetrimino.fields.push(max - this.COLS - i);
                            }
                            newTetrimino.fields.push(min + 1);
                            tetrimino.fields.forEach(field => this.clearField(field));
                            newTetrimino.fields.forEach(field => this.setField(field, newTetrimino.type));
                            return newTetrimino;


                        }
                    }


                } else {//horizontal

                    if (min + 1 == tetrimino.fields[1]) {
                        if (this.isEmpty(max + 1) && this.isEmpty(max + 2) && this.isEmpty(max - 19)) {
                            for (let i = 0; i < 3; i++) {
                                newTetrimino.fields.push(max + 1 - i * this.COLS);
                            }
                            newTetrimino.fields.push(max + 2);
                            tetrimino.fields.forEach(field => this.clearField(field));
                            newTetrimino.fields.forEach(field => this.setField(field, newTetrimino.type));
                            return newTetrimino;
                        }

                    } else {
                        if (min - 1 + 2 * this.COLS < this.COLS * this.ROWS) {
                            if (this.isEmpty(min - 1) && this.isEmpty(min - 2) && this.isEmpty(min + 19)) {
                                for (let i = 0; i < 3; i++) {
                                    newTetrimino.fields.push(min - 1 + i * this.COLS);
                                }
                                newTetrimino.fields.push(min - 2);
                                tetrimino.fields.forEach(field => this.clearField(field));
                                newTetrimino.fields.forEach(field => this.setField(field, newTetrimino.type));
                                return newTetrimino;
                            }
                        }
                    }
                }
                break;
            case TypeOfTet.J:
                if (max - min == 20) { //shape is J or rotate 180
                    if (min + this.COLS == tetrimino.fields[1]) { //shape J
                        let arrForTestLine: Array<number> = [];
                        for (let i = 0; i < 3; i++) {
                            arrForTestLine.push(min + this.COLS - i);
                        }
                        if (this.isEmpty(min + this.COLS - 1) && this.isEmpty(min + this.COLS - 2) && this.areInTheSameLine(arrForTestLine)) {
                            for (let i = 0; i < 3; i++) {
                                newTetrimino.fields.push(min + this.COLS - i);
                            }
                            newTetrimino.fields.push(max);
                            tetrimino.fields.forEach(field => this.clearField(field));
                            newTetrimino.fields.forEach(field => this.setField(field, newTetrimino.type));
                            return newTetrimino;
                        }

                    } else { //shape rotate 180 J
                        let arrForTestLine: Array<number> = [];
                        for (let i = 0; i < 3; i++) {
                            arrForTestLine.push(min + this.COLS + i);
                        }
                        if (this.isEmpty(min + this.COLS + 1) && this.isEmpty(min + this.COLS + 2) && this.areInTheSameLine(arrForTestLine)) {
                            for (let i = 0; i < 3; i++) {
                                newTetrimino.fields.push(min + this.COLS + i);
                            }
                            newTetrimino.fields.push(min);
                            tetrimino.fields.forEach(field => this.clearField(field));
                            newTetrimino.fields.forEach(field => this.setField(field, newTetrimino.type));
                            return newTetrimino;
                        }
                    }
                } else {
                    if (min + 1 == tetrimino.fields[1]) {
                        if (min + 1 + 2 * this.COLS < this.COLS * this.ROWS) {
                            if (this.isEmpty(min + 1 + 2 * this.COLS) && this.isEmpty(min + 1 + this.COLS)) {
                                for (let i = 0; i < 3; i++) {
                                    newTetrimino.fields.push(min + 1 + i * this.COLS);
                                }
                                newTetrimino.fields.push(min + 2);
                                tetrimino.fields.forEach(field => this.clearField(field));
                                newTetrimino.fields.forEach(field => this.setField(field, newTetrimino.type));
                                return newTetrimino;
                            }
                        }
                    } else {
                        if (this.isEmpty(min + 1) && this.isEmpty(min + 1 - this.COLS)) {
                            for (let i = 0; i < 3; i++) {
                                newTetrimino.fields.push(max - 1 - i * this.COLS);
                            }
                            newTetrimino.fields.push(min + this.COLS);
                            tetrimino.fields.forEach(field => this.clearField(field));
                            newTetrimino.fields.forEach(field => this.setField(field, newTetrimino.type));
                            return newTetrimino;
                        }
                    }

                }
                break;
            case TypeOfTet.S:
                if (max - min == 10) { //shape S horizontal
                    if (max + this.COLS < this.COLS * this.ROWS) {
                        if (this.isEmpty(min - 1) && this.isEmpty(max + this.COLS)) {
                            for (let i = 0; i < 2; i++) {
                                newTetrimino.fields.push(min - 1 + i * this.COLS);
                                newTetrimino.fields.push(max + i * this.COLS);
                            }
                            tetrimino.fields.forEach(field => this.clearField(field));
                            newTetrimino.fields.forEach(field => this.setField(field, newTetrimino.type));
                            return newTetrimino;
                        }
                    }

                } else { //shape S vertical
                    let arrForTestLine: Array<number> = [];
                    for (let i = 0; i < 2; i++) {
                        arrForTestLine.push(min + 1 + i);
                    }
                    if (this.isEmpty(min + 1) && this.isEmpty(min + 2) && this.areInTheSameLine(arrForTestLine)) {
                        for (let i = 0; i < 2; i++) {
                            newTetrimino.fields.push(min + 1 + i);
                            newTetrimino.fields.push(min + this.COLS + i);
                        }
                        tetrimino.fields.forEach(field => this.clearField(field));
                        newTetrimino.fields.forEach(field => this.setField(field, newTetrimino.type));
                        return newTetrimino;
                    }
                }
                break;
            case TypeOfTet.Z:
                if (max - min == 12) {//shape Z horizontal
                    if (max - 1 + this.COLS < this.COLS * this.ROWS) {
                        if (this.isEmpty(min + 2) && this.isEmpty(max - 1 + this.COLS)) {
                            for (let i = 0; i < 2; i++) {
                                newTetrimino.fields.push(min + 2 + i * this.COLS);
                                newTetrimino.fields.push(max - 1 + i * this.COLS);
                            }
                            tetrimino.fields.forEach(field => this.clearField(field));
                            newTetrimino.fields.forEach(field => this.setField(field, newTetrimino.type));
                            return newTetrimino;
                        }
                    }
                } else { //shape Z Vertical
                    let arrForTestLine: Array<number> = [];
                    for (let i = 0; i < 2; i++) {
                        arrForTestLine.push(min - 1 - i);
                    }
                    if (this.isEmpty(min - 1) && this.isEmpty(min - 2) && this.areInTheSameLine(arrForTestLine)) {
                        for (let i = 0; i < 2; i++) {
                            newTetrimino.fields.push(min - 1 - i);
                            newTetrimino.fields.push(max - this.COLS + i);
                        }
                        tetrimino.fields.forEach(field => this.clearField(field));
                        newTetrimino.fields.forEach(field => this.setField(field, newTetrimino.type));
                        return newTetrimino;
                    }
                }
                break;

        }

        return tetrimino;
    }
}



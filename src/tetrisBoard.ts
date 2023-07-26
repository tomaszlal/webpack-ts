import { ArrayBoard, Field } from "./model/board";
import { Tetrimino } from "./model/tetimino";

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

    public setAllFieldsInBoardRandom(): void {
        this.board = [];
        for (let y = 0; y < this.ROWS; y++) {
            for (let x = 0; x < this.COLS; x++) {
                const field: Field = {
                    "x": x,
                    "y": y,
                    "value": ""
                }
                if (Math.random() > 0.5) {
                    field.value = "0";
                } else {
                    field.value = "X";
                }
                this.board.push(field);
            }

        }
    }

    public setField(field: number): void {
        this.board.forEach(element => {
            if (element === this.board[field]) {
                element.value = "X";
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
        if (this.board[field].value == "0") return true;
        else return false;
    }


    // Tetrimino „I” – cztery elementy w jednym szeregu
    // Tetrimino „T” – trzy elementy w rzędzie i jeden dołączony do środkowego elementu
    // Tetrimino „O” – cztery elementy połączone w kwadrat
    // Tetrimino „L” – trzy elementy w rzędzie i jeden dołączony do lewego elementu od spodu
    // Tetrimino „J” – trzy elementy w rzędzie i jeden dołączony do prawego elementu od spodu
    // Tetrimino „S” – tetrimino „O” po przesunięciu dwóch górnych elementów w prawo
    // Tetrimino „Z” – tetrimino „O” po przesunięciu dwóch górnych elementów w lewo

    public insertTeriminoO(): Tetrimino {
        this.board[4].value = "X";
        this.board[5].value = "X";
        this.board[14].value = "X";
        this.board[15].value = "X";
        const tetrimino = {
            "type": "O",
            "fields": [15, 5, 4, 14]
        }
        return tetrimino;
    }

    public insertTeriminoI(): Tetrimino {
        this.board[4].value = "X";
        this.board[14].value = "X";
        this.board[24].value = "X";
        this.board[34].value = "X";
        const tetrimino = {
            "type": "I",
            "fields": [14, 4, 34, 24]
        }
        return tetrimino;
    }

    public checkMove(tetrimino: Tetrimino, direction: string): boolean {    //direction:  "R" or "L" or "D"

        let isMovePossible = false;
        switch (direction) {
            case "D": {
                isMovePossible = true;
                let checkList: Array<boolean> = [];
                tetrimino.fields.forEach(field => {         //sprawdzenie wszystkich pol w tetermino
                    if (!tetrimino.fields.includes(field + this.COLS)) {        //jeżeli tetermino nie zawiera kolejnych pol po dodaniu szerokosci planszy 
                        console.log(field);
                        if (field + this.COLS < this.COLS * this.ROWS) { //jeżeli pole +10(szerokosc planszy) nie wychodzi poza wielkosc planszy
                            checkList.push(true);
                            if (this.board[field + this.COLS].value == "0") {       //czy poniżej jednego z najniższego pola planszy znajduje się 
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
            case "R": {
                isMovePossible = true;
                let checkList: Array<boolean> = [];
                tetrimino.fields.forEach(field => {
                    if (!tetrimino.fields.includes(field + 1)) {
                        if (field % this.COLS < this.COLS - 1) {
                            checkList.push(true);
                            if (this.board[field + 1].value == "0") {
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
            case "L": {
                isMovePossible = true;
                let checkList: Array<boolean> = [];
                tetrimino.fields.forEach(field => {
                    if (!tetrimino.fields.includes(field - 1)) {
                        if (field % this.COLS > 0) {
                            checkList.push(true);
                            if (this.board[field - 1].value == "0") {
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
            this.setField(field);
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
            this.setField(field);
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
            this.setField(field);
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
        const middle = tetrimino.fields.sort((a, b) => a - b)[1];
        if (max - min == 30) {   // tetriminoI ustawione pionowo
            console.log(min, max, middle);
            if (this.isEmpty(middle - 1) && this.isEmpty(middle + 1) && this.isEmpty(middle + 2)
                && Math.floor((middle - 1) / this.COLS) == Math.floor((middle + 1) / this.COLS)
                && Math.floor((middle + 1) / this.COLS) == Math.floor((middle + 2) / this.COLS)) {
                console.log("da sie");
                tetrimino.fields.forEach(field => {
                    this.clearField(field);
                })
                for (let i = -1; i < 3; i++) {
                    this.setField(middle + i);
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
                    for (let i = -this.COLS; i < 3*this.COLS; i+=this.COLS) {
                        this.setField(middle + i);
                        newTetrimino.fields.push(middle + i);
                    }
                    return newTetrimino;
                }
            }


        }






        return tetrimino;
    }
}



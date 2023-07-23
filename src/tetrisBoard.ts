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
                const field:Field = {
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

    private setField(field:number):void {
        const newBoard:ArrayBoard = [];
        this.board.forEach(element =>{
            if (element === this.board[field]){
                element.value = "X";
            }
            newBoard.push(element);
            
        })
    }

    private clearField(field:number):void {
        const newBoard:ArrayBoard = [];
        this.board.forEach(element =>{
            if (element === this.board[field]){
                element.value = "0";
            }
            newBoard.push(element);
            
        })
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
            "type":"O",
            "fields":[4,5,14,15]
        }
        return tetrimino;
    }

    public moveDown(tetrimino:Tetrimino):Tetrimino {
        let newTetrimino:Tetrimino = {
            type: tetrimino.type,
            fields: []
        };
        
        switch (tetrimino.type) {
            case "O":
                newTetrimino.fields.push(tetrimino.fields[2]);
                newTetrimino.fields.push(tetrimino.fields[3]);
                this.setField(tetrimino.fields[2]+10);
                this.setField(tetrimino.fields[3]+10);
                newTetrimino.fields.push(tetrimino.fields[2]+10);
                newTetrimino.fields.push(tetrimino.fields[3]+10);
                this.clearField(tetrimino.fields[0]);
                this.clearField(tetrimino.fields[1]);
                // console.log(newTetrimino);
                
                break;
        
            default:
                break;
        }
        return newTetrimino;
        
    }
}



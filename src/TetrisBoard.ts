import { ArrayBoard, Field } from "./model/board";
import { Tetrimino, firstTeriminos } from "./model/tetimino";
import { TypeOfTet } from "./model/TypeOfTet";

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

    public setAllFieldsInBoard(value: string): void {
        for (let y = 0; y < this.ROWS; y++) {
            for (let x = 0; x < this.COLS; x++) {
                const field: Field = { x, y,value }
                this.board.push(field);
            }
        }
    }


    public setField(field: number, typeOfTet: TypeOfTet): void {
        this.board.forEach(element => {
            if (element === this.board[field]) {
                element.value = typeOfTet;
            }
        })
    }

    public clearField(field: number): void {
        this.board.forEach(element => {
            if (element === this.board[field]) {
                element.value = "0";
            }
        })
    }

    public isEmpty(field: number): boolean {
        return this.board[field].value === "0";
    }

    public areInTheSameLine(fields: Array<number>): boolean {
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
        const basicTetrimines: firstTeriminos = require("./model/first_tetriminos.json");
        console.log(basicTetrimines);
        let tetrimino: Tetrimino = {
            type,
            fields: []
        }
        basicTetrimines.forEach(basic => {
            if (basic.type == type) {
                tetrimino.fields = basic.fields;
            }
        })

        tetrimino.fields.forEach(field => {
            this.setField(field, tetrimino.type);
        })
        return tetrimino;
    }

   
    public checkLine(line: number): boolean {
        let isLineFilled = true;
        for (let i = line *this.COLS; i < line * this.COLS + this.COLS; i++) {
            isLineFilled = isLineFilled &&  !this.isEmpty(i);
            console.log(`field :${i} is empty: ${this.isEmpty(i)}`);
         }
        return isLineFilled;
    }


  
    
}



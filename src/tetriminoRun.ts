import { TypeOfTet } from "./model/TypeOfTet";
import { Directions } from "./model/directions";
import { Tetrimino } from "./model/tetimino";
import { TetrisBoard } from "./TetrisBoard";

export class TetriminoRun {
    public tetrisBoard: TetrisBoard;

    constructor(tetrisBoard: TetrisBoard) {
        this.tetrisBoard = tetrisBoard;
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
                answer = this.checkAndRotateTetriminoI(tetrimino, min, max, newTetrimino);
                if (answer !== tetrimino) return answer;
                break;
            case TypeOfTet.T:
                answer = this.checkAndRotateTetriminoT(tetrimino, min, max, newTetrimino);
                if (answer !== tetrimino) return answer;
                break;
            case TypeOfTet.L:
                answer = this.checkAndRotateTetriminoL(tetrimino, min, max, newTetrimino);
                if (answer !== tetrimino) return answer;
                break;
            case TypeOfTet.J:
                answer = this.checkAndRotateTetriminoJ(tetrimino, min, max, newTetrimino);
                if (answer !== tetrimino) return answer;
                break;
            case TypeOfTet.S:
                answer = this.checkAndRotateTetriminoS(tetrimino, min, max, newTetrimino);
                if (answer !== tetrimino) return answer;
                break;
            case TypeOfTet.Z:
                answer = this.checkAndRotateTetriminoZ(tetrimino, min, max, newTetrimino);
                if (answer !== tetrimino) return answer;
                break;

        }

        return tetrimino;
    }

    private getArrForTestLine4Fields(field: number) {
        let arrForTestLine: Array<number> = [];
        for (let i = -1; i < 3; i++) {
            arrForTestLine.push(field + i);
        }
        return arrForTestLine;
    }

    private getArrForTestLine3FieldsOnRight(field: number) {
        let arrForTestLine: Array<number> = [];
        for (let i = 0; i < 3; i++) {
            arrForTestLine.push(field + i);
        }
        return arrForTestLine;
    }

    private getArrForTestLine3FieldsOnLeft(field: number) {
        let arrForTestLine: Array<number> = [];
        for (let i = 0; i < 3; i++) {
            arrForTestLine.push(field - i);
        }
        return arrForTestLine;
    }

    private getArrForTestLine2FieldsOnRight(field: number) {
        let arrForTestLine: Array<number> = [];
        for (let i = 0; i < 2; i++) {
            arrForTestLine.push(field + i);
        }
        return arrForTestLine;
    }

    private getArrForTestLine2FieldsOnLeft(field: number) {
        let arrForTestLine: Array<number> = [];
        for (let i = 0; i < 2; i++) {
            arrForTestLine.push(field - i);
        }
        return arrForTestLine;
    }

    private checkAndRotateTetriminoI(tetrimino: Tetrimino, min: number, max: number, newTetrimino: Tetrimino): Tetrimino {
        const middle = tetrimino.fields[1];
        if (max - min === 30) {   // tetriminoI set vertical alignment
            console.log(min, max, middle);
            if (this.canRotateIVertical
                (middle)) {
                tetrimino.fields.forEach(field => this.tetrisBoard.clearField(field));
                for (let i = -1; i < 3; i++) {
                    this.tetrisBoard.setField(middle + i, newTetrimino.type);
                    newTetrimino.fields.push(middle + i);
                }
                return newTetrimino;
            }
        } else {
            if (this.canRotateIHorizontal(middle)) {
                tetrimino.fields.forEach(field => this.tetrisBoard.clearField(field));
                for (let i = -this.tetrisBoard.COLS; i < 3 * this.tetrisBoard.COLS; i += this.tetrisBoard.COLS) {
                    this.tetrisBoard.setField(middle + i, newTetrimino.type);
                    newTetrimino.fields.push(middle + i);
                }
                return newTetrimino;
            }
        }
        return tetrimino;

    }
    private checkAndRotateTetriminoT(tetrimino: Tetrimino, min: number, max: number, newTetrimino: Tetrimino): Tetrimino {

        if (max - min === 11) {  //is in position T or reverse
            if (min + 1 === tetrimino.fields[1]) {
                if (this.canRotateT(min)) {
                    
                    for (let i = 0; i < 3 * this.tetrisBoard.COLS; i += this.tetrisBoard.COLS) {
                        newTetrimino.fields.push(min + i);
                    }
                    newTetrimino.fields.push(max);
                    this.clearOldAndSetNewTetimino(tetrimino, newTetrimino);
                    console.log(newTetrimino.fields);
                    return newTetrimino;
                }
            } else {
                if (this.canRotateTInverse(max)) {
                    
                    for (let i = 0; i > (-3 * this.tetrisBoard.COLS); i -= this.tetrisBoard.COLS) {
                        newTetrimino.fields.push(max + i);
                    }
                    newTetrimino.fields.push(min);
                    this.clearOldAndSetNewTetimino(tetrimino, newTetrimino);
                    return newTetrimino;
                }

            }
        } else {
            if (min + this.tetrisBoard.COLS + 1 === tetrimino.fields[2]) {
                // const arrForTestLine = this.getArrForTestLine3FieldsOnRight(max);
                if (this.canRotateTLeft(max)) {
                    for (let i = 0; i < 3; i++) {
                        newTetrimino.fields.push(max + i);
                    }
                    newTetrimino.fields.push(tetrimino.fields[2]);
                    this.clearOldAndSetNewTetimino(tetrimino, newTetrimino);
                    return newTetrimino;
                }
            } else {
                if (this.canRotateTRight(min)) {
                    for (let i = 0; i < 3; i++) {
                        newTetrimino.fields.push(min - i);
                    }
                    newTetrimino.fields.push(tetrimino.fields[1]);
                    this.clearOldAndSetNewTetimino(tetrimino, newTetrimino);
                    return newTetrimino;
                }
            }
        }
        return tetrimino;
    }

    private checkAndRotateTetriminoL(tetrimino: Tetrimino, min: number, max: number, newTetrimino: Tetrimino): Tetrimino {
        if (max - min === 21) {
            if (min + 1 === tetrimino.fields[1]) { //axe shape
                 if (this.canRotateLInverse(min)) {
                    for (let i = 0; i < 3; i++) {
                        newTetrimino.fields.push(min + this.tetrisBoard.COLS + i);
                    }
                    newTetrimino.fields.push(min + 2 * this.tetrisBoard.COLS);
                    this.clearOldAndSetNewTetimino(tetrimino, newTetrimino);
                    return newTetrimino;
                }

            } else { //L-shape
                // const arrForTestLine = this.getArrForTestLine3FieldsOnLeft(max - this.tetrisBoard.COLS);
                if (this.canRotateL(max, min)) {
                    for (let i = 0; i < 3; i++) {
                        newTetrimino.fields.push(max - this.tetrisBoard.COLS - i);
                    }
                    newTetrimino.fields.push(min + 1);
                    this.clearOldAndSetNewTetimino(tetrimino, newTetrimino);
                    return newTetrimino;


                }
            }


        } else {//horizontal
            if (min + 1 === tetrimino.fields[1]) {
                if (this.canRotateLRight(max)) {
                    for (let i = 0; i < 3; i++) {
                        newTetrimino.fields.push(max + 1 - i * this.tetrisBoard.COLS);
                    }
                    newTetrimino.fields.push(max + 2);
                    this.clearOldAndSetNewTetimino(tetrimino, newTetrimino);
                    return newTetrimino;
                }

            } else {
                // if (min - 1 + 2 * this.tetrisBoard.COLS < this.tetrisBoard.COLS * this.tetrisBoard.ROWS) {
                //     if (this.tetrisBoard.isEmpty(min - 1) && this.tetrisBoard.isEmpty(min - 2) && this.tetrisBoard.isEmpty(min + 19)) {
                if (this.canRotateLLeft(min)) {
                    for (let i = 0; i < 3; i++) {
                        newTetrimino.fields.push(min - 1 + i * this.tetrisBoard.COLS);
                    }
                    newTetrimino.fields.push(min - 2);
                    this.clearOldAndSetNewTetimino(tetrimino, newTetrimino);
                    return newTetrimino;
                }
                //     }
                // }
            }
        }
        return tetrimino;
    }

    private checkAndRotateTetriminoJ(tetrimino: Tetrimino, min: number, max: number, newTetrimino: Tetrimino): Tetrimino {
        if (max - min === 20) { //shape is J or rotate 180
            if (min + this.tetrisBoard.COLS === tetrimino.fields[1]) { //shape J
                // min + this.tetrisBoard.COLS    LEFT-

                if (this.canRotateJ(min)) {
                    for (let i = 0; i < 3; i++) {
                        newTetrimino.fields.push(min + this.tetrisBoard.COLS - i);
                    }
                    newTetrimino.fields.push(max);
                    this.clearOldAndSetNewTetimino(tetrimino, newTetrimino);
                    return newTetrimino;
                }

            } else { //shape rotate 180 J
                // min + this.tetrisBoard.COLS  RIGHT

                if (this.canRotateJInverse(min)) {
                    for (let i = 0; i < 3; i++) {
                        newTetrimino.fields.push(min + this.tetrisBoard.COLS + i);
                    }
                    newTetrimino.fields.push(min);
                    this.clearOldAndSetNewTetimino(tetrimino, newTetrimino);
                    return newTetrimino;
                }
            }
        } else {
            if (min + 1 === tetrimino.fields[1]) {
                if (this.canRotatJLeft(min)) {
                    for (let i = 0; i < 3; i++) {
                        newTetrimino.fields.push(min + 1 + i * this.tetrisBoard.COLS);
                    }
                    newTetrimino.fields.push(min + 2);
                    this.clearOldAndSetNewTetimino(tetrimino, newTetrimino);
                    return newTetrimino;
                }
            } else {
                if (this.canRotateJRight(min)) {
                    for (let i = 0; i < 3; i++) {
                        newTetrimino.fields.push(max - 1 - i * this.tetrisBoard.COLS);
                    }
                    newTetrimino.fields.push(min + this.tetrisBoard.COLS);
                    this.clearOldAndSetNewTetimino(tetrimino, newTetrimino);
                    return newTetrimino;
                }
            }

        }
        return tetrimino;
    }

    private checkAndRotateTetriminoS(tetrimino: Tetrimino, min: number, max: number, newTetrimino: Tetrimino): Tetrimino {
        if (max - min === 10) { //shape S horizontal
            if (this.canRotateSHorizontal(min, max)) {
                for (let i = 0; i < 2; i++) {
                    newTetrimino.fields.push(min - 1 + i * this.tetrisBoard.COLS);
                    newTetrimino.fields.push(max + i * this.tetrisBoard.COLS);
                }
                this.clearOldAndSetNewTetimino(tetrimino, newTetrimino);
                return newTetrimino;
            }
        } else { //shape S vertical
            if (this.canRotateSVertical(min)) {
                for (let i = 0; i < 2; i++) {
                    newTetrimino.fields.push(min + 1 + i);
                    newTetrimino.fields.push(min + this.tetrisBoard.COLS + i);
                }
                this.clearOldAndSetNewTetimino(tetrimino, newTetrimino);
                return newTetrimino;
            }
        }
        return tetrimino;
    }
   

    private checkAndRotateTetriminoZ(tetrimino: Tetrimino, min: number, max: number, newTetrimino: Tetrimino): Tetrimino {
        if (max - min === 12) {//shape Z horizontal
            if (this.canRotateZHorizontal(min, max)) {
                for (let i = 0; i < 2; i++) {
                    newTetrimino.fields.push(min + 2 + i * this.tetrisBoard.COLS);
                    newTetrimino.fields.push(max - 1 + i * this.tetrisBoard.COLS);
                }
                this.clearOldAndSetNewTetimino(tetrimino, newTetrimino);
                return newTetrimino;
            }
        } else { //shape Z Vertical
            // min - 1   LEFT 2
            // let arrForTestLine = this.getArrForTestLine2FieldsOnLeft(min - 1);
            if (this.canRotateZVertical(min)) {
                for (let i = 0; i < 2; i++) {
                    newTetrimino.fields.push(min - 1 - i);
                    newTetrimino.fields.push(max - this.tetrisBoard.COLS + i);
                }
                this.clearOldAndSetNewTetimino(tetrimino, newTetrimino);
                return newTetrimino;
            }
        }
        return tetrimino;
    }
    private clearOldAndSetNewTetimino(tetrimino: Tetrimino, newTetrimino: Tetrimino) {
        tetrimino.fields.forEach(field => this.tetrisBoard.clearField(field));
        newTetrimino.fields.forEach(field => this.tetrisBoard.setField(field, newTetrimino.type));
    }

    private canRotateIVertical(middle: number): boolean {
        let canRotate = true;
        const arrForTestLine: Array<number> = this.getArrForTestLine4Fields(middle);
        for (let i = -1; i < 3; i++) {
            if (i === 0) continue;
            canRotate &&= this.tetrisBoard.isEmpty(middle + i);
        }
        canRotate &&= this.tetrisBoard.areInTheSameLine(arrForTestLine);
        return canRotate;
    }

    private isRotatedIIsOnBoard(middle: number): boolean {
        let isOnBoard = middle + this.tetrisBoard.COLS < this.tetrisBoard.COLS * this.tetrisBoard.ROWS;
        isOnBoard &&= middle + 2 * this.tetrisBoard.COLS < this.tetrisBoard.COLS * this.tetrisBoard.ROWS;
        return isOnBoard;
    }

    private canRotateIHorizontal(middle: number): boolean {
        let canRotate = this.isRotatedIIsOnBoard(middle);
        if (canRotate) {
            canRotate &&= this.tetrisBoard.isEmpty(middle + this.tetrisBoard.COLS);
            canRotate &&= this.tetrisBoard.isEmpty(middle + 2 * this.tetrisBoard.COLS)
        }
        return canRotate;
    }

    private canRotateT(min: number): boolean {
        let canRotate = min + 2 * this.tetrisBoard.COLS < this.tetrisBoard.COLS * this.tetrisBoard.ROWS;
        canRotate &&= this.tetrisBoard.isEmpty(min + this.tetrisBoard.COLS);
        canRotate &&= this.tetrisBoard.isEmpty(min + 2 * this.tetrisBoard.COLS);
        return canRotate;
    }

    private canRotateTInverse(max: number): boolean {
        return this.tetrisBoard.isEmpty(max - this.tetrisBoard.COLS)
            && this.tetrisBoard.isEmpty(max - 2 * this.tetrisBoard.COLS);
    }

    private canRotateTLeft(max: number): boolean {
        const arrForTestLine = this.getArrForTestLine3FieldsOnRight(max);
        let canRotate = this.tetrisBoard.isEmpty(max + 1);
        canRotate &&= this.tetrisBoard.isEmpty(max + 2);
        canRotate &&= this.tetrisBoard.areInTheSameLine(arrForTestLine);
        return canRotate;
    }

    private canRotateTRight(min: number): boolean {
        const arrForTestLine = this.getArrForTestLine3FieldsOnLeft(min);
        let canRotate = this.tetrisBoard.isEmpty(min - 1);
        canRotate &&= this.tetrisBoard.isEmpty(min - 2);
        canRotate &&= this.tetrisBoard.areInTheSameLine(arrForTestLine);
        return canRotate;
    }

    private canRotateLInverse(min: number): boolean {
        const arrForTestLine = this.getArrForTestLine3FieldsOnRight(min + this.tetrisBoard.COLS);
        let canRotate = this.tetrisBoard.isEmpty(min + this.tetrisBoard.COLS);
        canRotate &&= this.tetrisBoard.isEmpty(min + this.tetrisBoard.COLS * 2);
        canRotate &&= this.tetrisBoard.isEmpty(min + this.tetrisBoard.COLS + 2);
        canRotate &&= this.tetrisBoard.areInTheSameLine(arrForTestLine);
        return canRotate;
    }

    private canRotateL(max: number, min: number): boolean {
        const arrForTestLine = this.getArrForTestLine3FieldsOnLeft(max - this.tetrisBoard.COLS);
        let canRotate = this.tetrisBoard.isEmpty(min + 1);
        canRotate &&= this.tetrisBoard.isEmpty(max - this.tetrisBoard.COLS);
        canRotate &&= this.tetrisBoard.isEmpty(max - this.tetrisBoard.COLS - 2);
        canRotate &&= this.tetrisBoard.areInTheSameLine(arrForTestLine);
        return canRotate;
    }

    private canRotateLRight(max: number): boolean {
        let canRotate = this.tetrisBoard.isEmpty(max + 1);
        canRotate &&= this.tetrisBoard.isEmpty(max + 2);
        canRotate &&= this.tetrisBoard.isEmpty(max - 19);
        return canRotate;
    }

    private canRotateLLeft(min: number): boolean {
        let canRotate = this.isRotatedLIsOnBoard(min);
        if (canRotate) {
            canRotate &&= this.tetrisBoard.isEmpty(min - 1);
            canRotate &&= this.tetrisBoard.isEmpty(min - 2);
            canRotate &&= this.tetrisBoard.isEmpty(min + 19);
        }
        return canRotate;
    }

    private isRotatedLIsOnBoard(min: number): boolean {
        return min - 1 + 2 * this.tetrisBoard.COLS < this.tetrisBoard.COLS * this.tetrisBoard.ROWS;
    }

    private canRotateJ(min: number): boolean {
        let arrForTestLine = this.getArrForTestLine3FieldsOnLeft(min + this.tetrisBoard.COLS);
        let canRotate = this.tetrisBoard.isEmpty(min + this.tetrisBoard.COLS - 1);
        canRotate &&= this.tetrisBoard.isEmpty(min + this.tetrisBoard.COLS - 2);
        canRotate &&= this.tetrisBoard.areInTheSameLine(arrForTestLine);
        return canRotate;
    }

    private canRotateJInverse(min: number): boolean {
        let arrForTestLine = this.getArrForTestLine3FieldsOnRight(min + this.tetrisBoard.COLS);
        let canRotate = this.tetrisBoard.isEmpty(min + this.tetrisBoard.COLS + 1);
        canRotate &&= this.tetrisBoard.isEmpty(min + this.tetrisBoard.COLS + 2);
        canRotate &&= this.tetrisBoard.areInTheSameLine(arrForTestLine);
        return canRotate;
    }

    private isRotatedJIsOnBoard(min: number): boolean {
        return min - 1 + 2 * this.tetrisBoard.COLS < this.tetrisBoard.COLS * this.tetrisBoard.ROWS;
    }

    private canRotatJLeft(min: number): boolean {
        let canRotate = this.isRotatedJIsOnBoard(min);
        if (canRotate) {
            canRotate &&= this.tetrisBoard.isEmpty(min + 1 + 2 * this.tetrisBoard.COLS);
            canRotate &&= this.tetrisBoard.isEmpty(min + 1 + this.tetrisBoard.COLS);
        }
        return canRotate;
    }

    private canRotateJRight(min: number): boolean {
        let canRotate = this.tetrisBoard.isEmpty(min + 1);
        canRotate &&= this.tetrisBoard.isEmpty(min + 1 - this.tetrisBoard.COLS);
        return canRotate;
    }

    private isRotetedSIsOnBoard(max: number): boolean {
        return max + this.tetrisBoard.COLS < this.tetrisBoard.COLS * this.tetrisBoard.ROWS;
    }

    private canRotateSHorizontal(min: number, max: number): boolean {
        let canRotate = this.isRotetedSIsOnBoard(max);
        if (canRotate) {
            canRotate &&= this.tetrisBoard.isEmpty(min - 1);
            canRotate &&= this.tetrisBoard.isEmpty(max + this.tetrisBoard.COLS);
        }
        return canRotate;
    }

    private canRotateSVertical(min: number): boolean {
        let arrForTestLine = this.getArrForTestLine2FieldsOnRight(min + 1);
        let canRotate = this.tetrisBoard.isEmpty(min + 1);
        canRotate &&= this.tetrisBoard.isEmpty(min + 2);
        canRotate &&= this.tetrisBoard.areInTheSameLine(arrForTestLine);
        return canRotate;
    }

    private isRotetedZIsOnBoard(max: number): boolean {
        return max - 1 + this.tetrisBoard.COLS < this.tetrisBoard.COLS * this.tetrisBoard.ROWS;
    }

    private canRotateZHorizontal(min: number, max: number): boolean {
        let canRotate = this.isRotetedZIsOnBoard(max);
        if (canRotate) {
            canRotate &&= this.tetrisBoard.isEmpty(min + 2);
            canRotate &&= this.tetrisBoard.isEmpty(max - 1 + this.tetrisBoard.COLS);
        }
        return canRotate;
    }

    private canRotateZVertical(min: number): boolean {
        let arrForTestLine = this.getArrForTestLine2FieldsOnLeft(min - 1);
        let canRotate = this.tetrisBoard.isEmpty(min - 1);
        canRotate &&= this.tetrisBoard.isEmpty(min - 2);
        canRotate &&= this.tetrisBoard.areInTheSameLine(arrForTestLine);
        return canRotate;
    }


}

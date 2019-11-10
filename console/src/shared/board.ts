import { Result } from "./result";
import { Player } from "./player";

export class Board {
    private _columns: number;
    private _rows: number;
    private _inRow: number;
    private _heights: number[];
    private _board: Player[][];
    private _result: Result;
    private _lastX: number;
    private _lastY: number;

    public get board(): Player[][] {
        return JSON.parse(JSON.stringify(this._board));
    }
    public get rows(): number {
        return this._rows;
    }
    public get columns(): number {
        return this._columns;
    }


    constructor(columns: number, rows: number, inRow: number, board: Player[][], heights: number[]) {
        this._columns = columns;
        this._rows = rows;
        this._inRow = inRow;
        this._board = board;
        this._heights = heights;
        this._result = Result.GameOn;
    }

    public clone(): Board {
        let board = JSON.parse(JSON.stringify(this._board));
        let heights = JSON.parse(JSON.stringify(this._heights));
        return new Board(this._columns, this._rows, this._inRow, board, heights);
    }
    public allowedMoves(): number[] {
        let moves = [];
        if (this._result === Result.GameOn) {
            this._heights.forEach((value, inx) => {
                if (value < this._rows) {
                    moves.push(inx);
                }
            });
        }
        return moves;
    }

    public move(col: number, player: number): void {
        let height = this._heights[col];
        this._heights[col]++;
        this._board[col][height] = player;
        this._lastX = col;
        this._lastY = height;
    }

    public getResult(): Result {
        if (this._result !== Result.GameOn) {
            return this._result;
        }
        if (this._lastX == undefined || this._lastY == undefined) {
            return Result.GameOn;
        }
        let player = this._board[this._lastX][this._lastY];
        if (this.playerWon(this._lastX, this._lastY, player)) {
            if (player === Player.Player0) {
                return this._result = Result.WonPlayer0;
            }
            else if (player === Player.Player1) {
                return this._result = Result.WonPlayer1;
            }
        }
        else if (this.allowedMoves().length === 0) {
            return this._result = Result.Draw;
        }
        else {
            this._result = Result.GameOn;
            return this._result;
        }
    }
    private playerWon(x: number, y: number, id: number): boolean {
        if (this.pointsDown(x, y, id) + 1 >= this._inRow)
            return true;
        if (this.pointsLeftDown(x, y, id) + this.pointsRightUp(x, y, id) + 1 >= this._inRow)
            return true;
        if (this.pointsRightDown(x, y, id) + this.pointsLeftUp(x, y, id) + 1 >= this._inRow)
            return true;
        if (this.pointsRight(x, y, id) + this.pointsLeft(x, y, id) + 1 >= this._inRow)
            return true;
        return false;
    }
    private pointsLeftUp(x: number, y: number, id: number): number {
        let points = 0;
        let i = x - 1;
        let j = y + 1;
        while (points < this._inRow && i >= 0 && y < this._rows) {
            if (this._board[i][j] == id) {
                i--;
                j++;
                points++;
            }
            else {
                break;
            }
        }
        return points;
    }
    private pointsLeft(x: number, y: number, id: number): number {
        let points = 0;
        let i = x - 1;
        let j = y;
        while (points < this._inRow && i >= 0) {
            if (this._board[i][j] == id) {
                i--;
                points++;
            }
            else {
                break;
            }
        }
        return points;
    }
    private pointsLeftDown(x: number, y: number, id: number): number {
        let points = 0;
        let i = x - 1;
        let j = y - 1;
        while (points < this._inRow && i >= 0 && j >= 0) {
            if (this._board[i][j] == id) {
                i--;
                j--;
                points++;
            }
            else {
                break;
            }
        }
        return points;
    }
    private pointsDown(x: number, y: number, id: number): number {
        let points = 0;
        let i = x;
        let j = y - 1;
        while (points < this._inRow && j >= 0) {
            if (this._board[i][j] == id) {
                j--;
                points++;
            }
            else {
                break;
            }
        }
        return points;
    }

    private pointsRightDown(x: number, y: number, id: number): number {
        let points = 0;
        let i = x + 1;
        let j = y - 1;
        while (points < this._inRow && i < this._columns && j >= 0) {
            if (this._board[i][j] == id) {
                i++;
                j--;
                points++;
            }
            else {
                break;
            }
        }
        return points;
    }

    private pointsRight(x: number, y: number, id: number): number {
        let points = 0;
        let i = x + 1;
        let j = y;
        while (points < this._inRow && i < this._columns) {
            if (this._board[i][j] == id) {
                i++;
                points++;
            }
            else {
                break;
            }
        }
        return points;
    }

    private pointsRightUp(x: number, y: number, id: number): number {
        let i = x + 1;
        let j = y + 1;
        let points = 0;
        while (points < this._inRow && i < this._columns && j < this._rows) {
            if (this._board[i][j] == id) {
                i++;
                j++
                points++;
            }
            else {
                break;
            }
        }
        return points;
    }
}
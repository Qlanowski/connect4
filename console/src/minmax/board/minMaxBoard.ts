import { Player } from "../../shared/player";
import { MovesHistoryNode } from "./movesHistoryNode";
import { Result } from "../../shared/result";

export class MinMaxBoard {
    private _width: number;
    private _height: number;
    private _inRowToWin: number;
    private _fields: Player[][];
    private _piecesInColumnCount: number[];
    private _movesHistory: MovesHistoryNode[];
    private _status: Result;

    public get width(): number {
        return this._width;
    }

    public get height(): number {
        return this._height;
    }

    public get inRowToWin(): number {
        return this._inRowToWin;
    }

    public get status(): Result {
        return this._status;
    }

    public get winner(): Player {
        switch(this._status) {
            case Result.WonPlayer0:
                return Player.Player0;
            case Result.WonPlayer1:
                return Player.Player1;
            default:
                return Player.None;
        }
    }

    public get lastMove(): number {
        if (this._movesHistory.length <= 0) {
            throw new Error('No moves done yet');
        }
        else {
            return this._movesHistory[this._movesHistory.length - 1].x;
        }
    }

    public get movesDoneCount(): number {
        return this._movesHistory.length;
    }
    
    constructor(width: number, height: number, inRowToWin: number) {
        this._width = width;
        this._height = height;
        this._inRowToWin = inRowToWin;
        this._fields = Array(width).fill(-1).map(() => Array(height).fill(Player.None));
        this._piecesInColumnCount = Array(width).fill(0);
        this._movesHistory = [];
        this._status = Result.GameOn;
    }

    public getField(x: number, y: number): Player {
        return this._fields[x][y];
    }

    public getPiecesInColumnCount(x: number): number {
        if (!this.isValidColumn(x)) {
            throw new Error(`Invalid column number given - ${x}`);
        }
        else {
            return this._piecesInColumnCount[x];
        }
    }

    public getAllAvailableMoves(): number[] {
        const result: number[] = [];
        for (let x = 0; x < this._width; x++) {
            if (!this.isColumnFull(x)) {
                result.push(x);
            }
        }
        return result;
    }

    public makeMove(x: number, player: Player) {
        const isStatusValid: boolean = this._status === Result.GameOn;
        const canPlayerMakeMove: boolean = this.canPlayerMakeMove(player);
        const isMoveValid: boolean = this.isMoveValid(x);
        const isGameFinished: boolean = this.isGameFinished();
        if (isStatusValid && canPlayerMakeMove && isMoveValid && !isGameFinished) {
            this._movesHistory.push(new MovesHistoryNode(player, x));
            this._fields[x][this._piecesInColumnCount[x]] = player;
            this._piecesInColumnCount[x]++;
            this.updateStatus();
        }
        else {
            if (isGameFinished || !isStatusValid) {
                throw new Error('Game already finished');
            }
            else {
                throw new Error(`Player ${player} cannot make move in column ${x}`);
            }
        }
    }

    public undoLastMove() {
        if (this._movesHistory.length > 0) {
            let lastMove = this._movesHistory.pop();
            this._piecesInColumnCount[lastMove.x]--;
            this._fields[lastMove.x][this._piecesInColumnCount[lastMove.x]] = Player.None;
            this._status = Result.GameOn;
        }
        else {
            throw new Error('Cannot undo last move - no moves done yet');
        }
    }

    private canPlayerMakeMove(player: Player) {
        const length: number = this._movesHistory.length;
        return length === 0 || this._movesHistory[length - 1].player !== player;
    }

    private isGameFinished(): boolean {
        return this._movesHistory.length >= this._width * this._height;
    }

    private isMoveValid(x: number): boolean {
        return this.isValidColumn(x) && !this.isColumnFull(x);
    }

    private isValidColumn(x: number): boolean {
        return x >= 0 && x < this._width;
    }

    private isColumnFull(x: number): boolean {
        return this._piecesInColumnCount[x] >= this.height;
    }

    private setWinner(player: Player) {
        switch(player) {
            case Player.Player0:
                this._status = Result.WonPlayer0;
                break;
            case Player.Player1:
                this._status = Result.WonPlayer1;
                break;
            default:
                throw new Error(`Invalid player given - ${player}`);
        }
    }

    private getVerticalWinner(): Player {
        for (let x = 0; x < this._width; x++) {
            let inRow = 0;
            let potentialWinner = this._fields[x][0];
            for (let y = 0; y < this._piecesInColumnCount[x] && potentialWinner !== Player.None; y++) {
                if (this._fields[x][y] === potentialWinner) {
                    inRow++;
                }
                else {
                    if (inRow >= this._inRowToWin) {
                        return potentialWinner;
                    }
                    inRow = 1;
                    potentialWinner = this._fields[x][y];
                }
            }
            if (inRow >= this._inRowToWin && potentialWinner !== Player.None) {
                return potentialWinner;
            }
        }

        return Player.None;
    }

    private getHorizontalWinner(): Player {
        for (let y = 0; y < this._height; y++) {
            let inRow = 0;
            let potentialWinner = this._fields[0][y];
            for (let x = 0; x < this._width; x++) {
                if (this._fields[x][y] === potentialWinner) {
                    inRow++;
                }
                else {
                    if (inRow >= this._inRowToWin && potentialWinner !== Player.None) {
                        return potentialWinner;
                    }
                    inRow = 1;
                    potentialWinner = this._fields[x][y];
                }
            }
            if (inRow >= this._inRowToWin && potentialWinner !== Player.None) {
                return potentialWinner;
            }
        }

        return Player.None;
    }

    private getDiagonalWinner(): Player {
        for (let x = 0; x < this._width; x++) {
            let inRow = 0;
            let potentialWinner = this._fields[x][0];
            for (let y = 0; y < Math.min(this._height, this._width - x); y++) {
                if (this._fields[x + y][y] === potentialWinner) {
                    inRow++;
                }
                else {
                    if (inRow >= this._inRowToWin && potentialWinner !== Player.None) {
                        return potentialWinner;
                    }
                    inRow = 1;
                    potentialWinner = this._fields[x + y][y];
                }
            }
            if (inRow >= this._inRowToWin && potentialWinner !== Player.None) {
                return potentialWinner;
            }
        }

        return Player.None;
    }

    private getAntiDiagonalWinner(): Player {
        for (let x = 0; x < this._width; x++) {
            let inRow = 0;
            let potentialWinner = this._fields[x][0];
            for (let y = 0; y < Math.min(this._height, x); y++) {
                if (this._fields[x - y][y] === potentialWinner) {
                    inRow++;
                }
                else {
                    if (inRow >= this._inRowToWin && potentialWinner !== Player.None) {
                        return potentialWinner;
                    }
                    inRow = 1;
                    potentialWinner = this._fields[x - y][y];
                }
            }
            if (inRow >= this._inRowToWin && potentialWinner !== Player.None) {
                return potentialWinner;
            }
        }

        return Player.None;
    }

    private getWinner(): Player {
        const vertialWinner = this.getVerticalWinner();
        if (vertialWinner !== Player.None) {
            return vertialWinner;
        }

        const horizontalWinner = this.getHorizontalWinner();
        if (horizontalWinner !== Player.None) {
            return horizontalWinner;
        }

        const diagonalWinner = this.getDiagonalWinner();
        if (diagonalWinner !== Player.None) {
            return diagonalWinner;
        }

        return this.getAntiDiagonalWinner();
    }

    private updateStatus() {
        if (this.canGameBeFinished()) {
            const winner = this.getWinner();
            if (winner !== Player.None) {
                this.setWinner(winner);
            }
            else {
                if (this.isGameFinished()) {
                    this._status = Result.Draw;
                }
            }
        }
    }

    private canGameBeFinished():boolean {
        if (this._status !== Result.GameOn) {
            return false;
        }

        return this.isGameFinished() || this._movesHistory.length >= this.inRowToWin * 2 - 1;
    }
}
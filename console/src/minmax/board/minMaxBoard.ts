import { Player } from "../../shared/player";
import { MovesHistoryNode } from "./movesHistoryNode";

export class MinMaxBoard {
    private _width: number;
    private _height: number;
    private _inRowToWin: number;
    private _fields: Player[][];
    private _piecesInColumnCount: number[];
    private _movesHistory: MovesHistoryNode[];

    public get width(): number {
        return this._width;
    }

    public get height(): number {
        return this._height;
    }

    public get inRowToWin(): number {
        return this._inRowToWin;
    }
    
    constructor(width: number, height: number, inRowToWin: number) {
        this._width = width;
        this._height = height;
        this._inRowToWin = inRowToWin;
        this._fields = Array(width).map(() => Array(height).fill(Player.None));
        this._piecesInColumnCount = Array(width).fill(0);
        this._movesHistory = [];
    }

    public getField(x: number, y: number): Player {
        return this._fields[x][y];
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
        if (this.canPlayerMakeMove(player) && this.isMoveValid(x)) {
            this._movesHistory.push(new MovesHistoryNode(player, x));
            this._fields[x][this._piecesInColumnCount[x]] = player;
            this._piecesInColumnCount[x]++;
        }
        else {
            throw new Error(`Player ${player} cannot make move in column ${x}`);
        }
    }

    public undoLastMove() {
        if (this._movesHistory.length > 0) {
            let lastMove = this._movesHistory.pop();
            this._piecesInColumnCount[lastMove.x]--;
            this._fields[lastMove.x][this._piecesInColumnCount[lastMove.x]] = Player.None;
        }
        else {
            throw new Error('Cannot undo last move - no moves done yet');
        }
    }

    private canPlayerMakeMove(player: Player) {
        const length: number = this._movesHistory.length;
        return length === 0 || this._movesHistory[length - 1].player !== player;
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
}
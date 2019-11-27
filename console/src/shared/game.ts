import { Board } from "./board";
import { Player } from "./player";
import { Result } from "./result";
export class Game {
    public board: Board;

    constructor(columns: number, rows: number, inRow: number) {
        let board = new Array(columns).fill(0).map(() => Array(rows).fill(Player.None));
        let heights = new Array(columns).fill(0);
        this.board = new Board(columns, rows, inRow, board, heights);
    }

    public gameOn(): boolean {
        return this.board.getResult() == Result.GameOn;
    }
    public result(): Result {
        return this.board.getResult();
    }

    public allowedMoves(): number[] {
        return this.board.allowedMoves();
    }

    public move(col: number, player: Player): void {
        if (col > this.board.columns || this.board.heights[col] === this.board.rows) {
            console.error("invalid move");
        }
        this.board.move(col, player);
    }

    public printWhoWon(): void {
        switch (this.board.getResult()) {
            case Result.Draw:
                console.log("Draw");
                break;
            case Result.WonPlayer0:
                console.log("Player 0 Won");
                break;
            case Result.WonPlayer1:
                console.log("Player 1 Won");
                break;
            default:
                console.log("Game is on, why are you asking who win?!");
                break;
        }
    }
    public printBoard(): void {
        console.log("Current Position:");
        printBoard(this.board);
    }
}

export function printBoard(board: Board): void {
    for (let y = board.rows - 1; y >= 0; y--) {
        let row = "";
        for (let x = 0; x < board.columns; x++) {
            switch (board.board[x][y]) {
                case Player.None:
                    row += "-";
                    break;
                case Player.Player0:
                    row += "O";
                    break;
                case Player.Player1:
                    row += "X";
                    break;
            }
        }
        console.log(row);
    }
    let rowNumbers = "";
    for (let x = 0; x < board.columns; x++) {
        rowNumbers += x.toString();
    }
    console.log(rowNumbers);
}
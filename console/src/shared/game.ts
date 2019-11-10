import { Board } from "./board";
import { Player } from "./player";
import { Result } from "./result";
export class Game {
    private board: Board;

    constructor(columns: number, rows: number, inRow: number) {
        let board = new Array(columns).fill(0).map(() => Array(rows).fill(Player.None));
        let heights = new Array(columns).fill(0);
        this.board = new Board(columns, rows, inRow, board, heights);
    }

    public gameOn(): boolean {
        return this.board.getResult() == Result.GameOn;
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
                console.log("Human Won");
                break;
            case Result.WonPlayer1:
                console.log("Bot won");
                break;
            default:
                console.log("Game is on, why are you asking who win?!");
                break;
        }
    }
    public printBoard(): void {
        console.log("Current Position:");
        for (let y = this.board.rows - 1; y >= 0; y--) {
            for (let x = 0; x < this.board.columns; x++) {
                switch (this.board.board[x][y]) {
                    case Player.None:
                        process.stdout.write("-");
                        break;
                    case Player.Player0:
                        process.stdout.write("O");
                        break;
                    case Player.Player1:
                        process.stdout.write("X");
                        break;
                }
            }
            process.stdout.write("\n");
        }
        for (let x = 0; x < this.board.columns; x++) {
            process.stdout.write(x.toString());
        }
        console.log("\n");
    }
}
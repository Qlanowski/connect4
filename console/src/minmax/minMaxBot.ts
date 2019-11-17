import { Bot } from "../shared/bot";
import { Board } from "../shared/board";
import { Player } from "../shared/player";
import { MinMaxAlgorithm } from "./minMaxAlgoritm";

export class MinMaxBot implements Bot {
    // Bot is Player 0 - no idea why I have to assume that
    private readonly myPlayer: Player = Player.Player0;
    private readonly opponentPlayer: Player = Player.Player1;
    private currentBoard: Board;
    private algoritm: MinMaxAlgorithm;

    constructor(columns: number, rows: number, inRow: number, timeout: number) {
        let boardArr: Player[][] = new Array(columns).fill(0).map(() => Array(rows).fill(Player.None));
        let heights: number[] = new Array(columns).fill(0);
        this.currentBoard = new Board(columns, rows, inRow, boardArr, heights);
        this.algoritm = new MinMaxAlgorithm(timeout, 10);
    }

    playerMove(move: number): void {
        this.currentBoard.move(move, this.opponentPlayer);
    }

    makeMove(): number {
        let bestScore = Number.MIN_VALUE;
        let bestMove = Number.MIN_VALUE;
        let allowedMoves = this.currentBoard.allowedMoves();
        allowedMoves.forEach(move => {
            let board = this.currentBoard.clone();
            board.move(move, this.myPlayer);
            let score = this.algoritm.getScore(board, this.myPlayer);
            if(bestScore < score) {
                bestScore = score;
                bestMove = move;
            }
        });
        return bestMove;
    }
}
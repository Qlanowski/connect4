import { Bot } from "../shared/bot";
import { Board } from "../shared/board";
import { Player } from "../shared/player";
import { MinMaxHeuristic } from "./heuristics/minMaxHeuristic";

export class MinMaxBot implements Bot {
    // Bot is Player 0 - no idea why I have to assume that
    private timeout: number
    private currentBoard: Board;
    private heuristic: MinMaxHeuristic;

    constructor(columns: number, rows: number, inRow: number, timeout: number) {
        this.timeout = timeout;
        let boardArr: Player[][] = new Array(columns).fill(0).map(() => Array(rows).fill(Player.None));
        let heights: number[] = new Array(columns).fill(0);
        this.currentBoard = new Board(columns, rows, inRow, boardArr, heights);
    }

    playerMove(move: number): void {
        this.currentBoard.move(move, Player.Player1);
    }

    makeMove(): number {
        let bestScore = Number.MIN_VALUE;
        let bestMove = Number.MIN_VALUE;
        let allowedMoves = this.currentBoard.allowedMoves();
        allowedMoves.forEach(move => {
            let board = this.currentBoard.clone();
            board.move(move, Player.Player0);
            let score = this.heuristic.getScore(board);
            if(bestScore < score) {
                bestScore = score;
                bestMove = move;
            }
        });
        return bestMove;
    }
}
import { Bot } from "../shared/bot";
import { Player } from "../shared/player";
import { MinMaxAlgorithm } from "./minMaxAlgoritm";
import { MinMaxBoard } from "./board/minMaxBoard";
import { MinMaxEvaluation } from "./evaluation/minMaxEvaluation";

export class MinMaxBot implements Bot {
    // Bot is Player 0 - no idea why I have to assume that
    private readonly myPlayer: Player = Player.Player0;
    private readonly opponentPlayer: Player = Player.Player1;
    private board: MinMaxBoard;
    private algoritm: MinMaxAlgorithm;

    constructor(columns: number, rows: number, inRow: number, timeout: number, evaluation: MinMaxEvaluation) {
        this.board = new MinMaxBoard(columns, rows, inRow);
        const depthLimit = 10;
        this.algoritm = new MinMaxAlgorithm(timeout, evaluation, depthLimit);
    }

    playerMove(move: number): void {
        this.board.makeMove(move, this.opponentPlayer);
    }

    makeMove(): number {
        let bestScore = Number.POSITIVE_INFINITY;
        let allowedMoves = this.board.getAllAvailableMoves();
        if (allowedMoves.length === 0) {
            throw new Error('No moves available');
        }
        let bestMove = allowedMoves[0];
        for (const move of allowedMoves) {
            this.board.makeMove(move, this.myPlayer);

            if (this.board.winner === this.myPlayer) {
                return move;
            }

            let score = this.algoritm.getScore(this.board, this.opponentPlayer);
            this.board.undoLastMove();

            console.debug(`move: ${move}, score: ${score}`);
            if(bestScore > score) {
                bestScore = score;
                bestMove = move;
            }
        }

        this.board.makeMove(bestMove, this.myPlayer);

        return bestMove;
    }
}
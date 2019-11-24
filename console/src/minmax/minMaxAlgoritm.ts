import { Player } from "../shared/player";
import { MinMaxEvaluation } from "./evaluation/minMaxEvaluation";
import { BoardHelper } from "./boardHelper";
import { MinMaxBoard } from "./board/minMaxBoard";

export class MinMaxAlgorithm {
    private timeout: number;
    private evaluation: MinMaxEvaluation;
    private depthLimit: number;

    constructor(timeout: number, evaluation: MinMaxEvaluation, depthLimit: number = Number.POSITIVE_INFINITY) {
        this.timeout = timeout;
        this.evaluation = evaluation;
        this.depthLimit = depthLimit;
    }

    public getScore(board: MinMaxBoard, player: Player): number {
        let startTime: number = Date.now();
        return this.getAlphaBetaScore(
            board, 
            player, 
            Number.NEGATIVE_INFINITY, 
            Number.POSITIVE_INFINITY, 
            0, 
            startTime);
    }

    private getAlphaBetaScore(
        board: MinMaxBoard, 
        player: Player, 
        alpha: number, 
        beta: number, 
        depth: number, 
        startTime: number): number {

        if (Date.now() - startTime > this.timeout
        || depth > this.depthLimit) {
            return this.evaluation.getScore(board, player);
        }

        let allowedMoves = board.getAllAvailableMoves();
        allowedMoves.forEach(move => {
            board.makeMove(move, player);

            if (board.winner === player) {
                let score = this.evaluation.getMaxScore(board);
                board.undoLastMove();
                return score;
            }

            let score = -this.getAlphaBetaScore(
                board, 
                BoardHelper.getOpponent(player), 
                -beta,
                -alpha, 
                depth + 1, 
                startTime);

            board.undoLastMove();

            alpha = Math.max(alpha, score);
            if (alpha >= beta) {
                return beta;
            }
        });
        return alpha;
    }
}
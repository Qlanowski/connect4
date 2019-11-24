import { Player } from "../shared/player";
import { MinMaxEvaluation } from "./evaluation/minMaxEvaluation";
import { BoardHelper } from "./boardHelper";
import { MinMaxBoard } from "./board/minMaxBoard";
import { MinMaxBot } from "./minMaxBot";

export class MinMaxAlgorithm {
    private readonly timeout: number;
    private readonly evaluation: MinMaxEvaluation;
    private readonly depthLimit: number;

    constructor(timeout: number, evaluation: MinMaxEvaluation, depthLimit: number) {
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

        if (this.canPlayerWin(board, player)) {
            return this.evaluation.getMaxScore(board);
        }

        for (const move of board.getAllAvailableMoves()) {
            board.makeMove(move, player);

            let score = -this.getAlphaBetaScore(
                board, 
                BoardHelper.getOpponent(player), 
                Number.NEGATIVE_INFINITY,
                Number.POSITIVE_INFINITY, 
                depth + 1, 
                startTime);

            board.undoLastMove();

            alpha = Math.max(alpha, score);
            if (alpha >= beta) {
                return beta;
            }
        }

        return alpha;
    }

    private canPlayerWin(board: MinMaxBoard, player: Player): boolean {
        for (const move of board.getAllAvailableMoves()) {
            board.makeMove(move, player);

            if (board.winner === player) {
                board.undoLastMove();
                return true;
            }

            board.undoLastMove();
        }

        return false;
    }
}
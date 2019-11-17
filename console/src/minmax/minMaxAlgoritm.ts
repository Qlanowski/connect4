import { Board } from "../shared/board";
import { Player } from "../shared/player";
import { MinMaxHeuristic } from "./heuristics/minMaxHeuristic";
import { BoardHelper } from "./boardHelper";

export class MinMaxAlgorithm {
    private timeout: number;
    private heuristic: MinMaxHeuristic;
    private depthLimit: number;

    constructor(timeout: number, heuristic: MinMaxHeuristic, depthLimit: number = Number.POSITIVE_INFINITY) {
        this.timeout = timeout;
        this.heuristic = heuristic;
        this.depthLimit = depthLimit;
    }

    public getScore(board: Board, player: Player): number {
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
        board: Board, 
        player: Player, 
        alpha: number, 
        beta: number, 
        depth: number, 
        startTime: number): number {
        if (Date.now() - startTime > this.timeout
        || depth > this.depthLimit) {
            return this.heuristic.getScore(board, player);
        }

        let allowedMoves = board.allowedMoves();
        allowedMoves.forEach(move => {
            if (BoardHelper.isWinningMove(board, move, player)) {
                return this.heuristic.getMaxScore(board);
            }
        });
        
        allowedMoves.forEach(move => {
            let clonedBoard = board.clone();
            clonedBoard.move(move, player);
            let score = -this.getAlphaBetaScore(
                clonedBoard, 
                BoardHelper.getOpponent(player), 
                -beta,
                -alpha, 
                depth + 1, 
                startTime);
                
                alpha = Math.max(alpha, score);
                if (alpha >= beta) {
                    return beta;
                }
        });
    }
}
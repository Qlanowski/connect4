import { Board } from "../shared/board";
import { Player } from "../shared/player";
import { MinMaxHeuristic } from "./heuristics/minMaxHeuristic";
import { BoardHelper } from "./boardHelper";

export class MinMaxAlgorithm {
    private heuristic: MinMaxHeuristic;
    private timeout: number;
    private depthLimit: number;

    constructor(timeout: number, depthLimit: number = Number.POSITIVE_INFINITY) {
        this.depthLimit = depthLimit;
        this.timeout = timeout;
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
        if (Date.now() - startTime > this.timeout || depth > this.depthLimit) {
            return this.heuristic.getScore(board, player);
        }

        let allowedMoves = board.allowedMoves();
        let scoreUpperBound = (board.columns * board.rows + 1 - board.moveCounter) / 2;
        allowedMoves.forEach(move => {
            if (BoardHelper.isWinningMove(board, move, player)) {
                return scoreUpperBound;
            }
        });

        beta = Math.min(beta, scoreUpperBound);
        
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
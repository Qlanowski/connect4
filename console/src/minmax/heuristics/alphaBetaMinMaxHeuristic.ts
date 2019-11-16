import { MinMaxHeuristic } from "./minMaxHeuristic";
import { Board } from "../../shared/board";
import { Player } from "../../shared/player";
import { BoardHelper } from "../boardHelper";

export class AlphaBetaMinMaxHeuristic implements MinMaxHeuristic {
    public getScore(board: Board, player: Player): number {
        return this.getScoreHelper(board, player, Number.MIN_VALUE, Number.MAX_VALUE);
    }

    private getScoreHelper(board: Board, player: Player, alpha: number, beta: number): number {
        let allowedMoves = board.allowedMoves();
        allowedMoves.forEach(move => {
            if (BoardHelper.isWinningMove(board, move, player)) {
                return (board.columns * board.rows + 1 - board.moveCounter) / 2;
            }
        });

        let upperBoundScore = (board.columns * board.rows + 1 - board.moveCounter) / 2;

        if(beta > upperBoundScore) {
            beta = upperBoundScore;
            if(alpha >= beta) return beta;
        }

        let actualBestScore = - board.columns * board.rows;
        allowedMoves.forEach(move => {
            let clonedBoard = board.clone();
            clonedBoard.move(move, player);
            let actualScore = -this.getScoreHelper(clonedBoard, BoardHelper.getOpponent(player), -beta, -alpha);
            if (actualScore > beta) {
                return beta;
            }
            if(actualScore > alpha) {
                alpha = actualScore;
            }
        });

        return alpha;
    }
}
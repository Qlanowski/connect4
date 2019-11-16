import { MinMaxHeuristic } from "./minMaxHeuristic";
import { Board } from "../../shared/board";
import { Player } from "../../shared/player";
import { BoardHelper } from "../boardHelper";

export class BasicMinMaxHeuristic implements MinMaxHeuristic {
    public getScore(board: Board, player: Player): number {
        let allowedMoves = board.allowedMoves();
        allowedMoves.forEach(move => {
            if (BoardHelper.isWinningMove(board, move, player)) {
                return (board.columns * board.rows + 1 - board.moveCounter) / 2;
            }
        });

        let actualBestScore = - board.columns * board.rows;
        allowedMoves.forEach(move => {
            let clonedBoard = board.clone();
            clonedBoard.move(move, player);
            let actualScore = -this.getScore(clonedBoard, BoardHelper.getOpponent(player));
            if (actualScore > actualBestScore) {
                actualBestScore = actualScore;
            }
        });

        return actualBestScore;
    }
}
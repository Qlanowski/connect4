import { MinMaxHeuristic } from "./minMaxHeuristic";
import { Board } from "../../shared/board";
import { Player } from "../../shared/player";
import { Result } from "../../shared/result";

export class BasicMinMaxHeuristic implements MinMaxHeuristic {
    getScore(board: Board, player: Player): number {
        let allowedMoves = board.allowedMoves();
        allowedMoves.forEach(move => {
            if (this.isWinningMove(board, move, player)) {
                return (board.columns * board.rows + 1 - board.moveCounter) / 2;
            }
        });

        let actualBestScore = - board.columns * board.rows;
        allowedMoves.forEach(move => {
            let clonedBoard = board.clone();
            clonedBoard.move(move, player);
            let actualScore = this.getScore(clonedBoard, this.getOpponent(player));
            if (actualScore > actualBestScore) {
                actualBestScore = actualScore
            }
        });

        return actualBestScore;
    }

    private isWinningMove(board: Board, move: number, player: Player) {
        let clonedBoard = board.clone();
        clonedBoard.move(move, player);
        let result = clonedBoard.getResult();
        return this.isWinner(player, result);
    }

    private isWinner(player: Player, result: Result) {
        return (player === Player.Player0 && result === Result.WonPlayer0)
        || (player === Player.Player1 && result === Result.WonPlayer1);
    }

    private getOpponent(myPlayer: Player): Player {
        switch(myPlayer) {
            case Player.Player0:
                return Player.Player1;
            case Player.Player1:
                return Player.Player0;
            default:
                return Player.None;
        }
    }

}
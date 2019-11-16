import { Player } from "../shared/player";
import { Result } from "../shared/result";
import { Board } from "../shared/board";

export class BoardHelper {
    
    public static isWinningMove(board: Board, move: number, player: Player) {
        let clonedBoard = board.clone();
        clonedBoard.move(move, player);
        let result = clonedBoard.getResult();
        return this.isWinner(player, result);
    }

    public static isWinner(player: Player, result: Result) {
        return (player === Player.Player0 && result === Result.WonPlayer0)
        || (player === Player.Player1 && result === Result.WonPlayer1);
    }

    public static getOpponent(myPlayer: Player): Player {
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
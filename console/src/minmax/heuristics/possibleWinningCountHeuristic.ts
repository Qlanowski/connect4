import { MinMaxHeuristic } from "./minMaxHeuristic";
import { Board } from "../../shared/board";
import { Player } from "../../shared/player";

export class PossibleWinningCountHeuristic implements MinMaxHeuristic {
    public getScore(board: Board, player: Player): number {
        throw new Error("Method not implemented.");
    }
    
    public getMaxScore(board: Board) {
        throw new Error("Method not implemented.");
    }

    private maxVerticalInRow(board: Board, player: Player, x: number, y: number): number {
        let counter: number = 0;
        let fields = board.board;
        for(let i = x - 1; i >= 0 && fields[i][y] === player; i--) {
            counter++;
        }
        for(let i = x; i < board.rows && fields[i][y] === player; i++) {
            counter++;
        }
        return counter;
    }

}
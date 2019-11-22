import { MinMaxHeuristic } from "./minMaxHeuristic";
import { Board } from "../../shared/board";
import { Player } from "../../shared/player";

export class ConstMatrixHeuristic implements MinMaxHeuristic {
    private readonly scoreMatrix: number[][] = 
    [
        [ 3, 4, 5, 7, 5, 4, 3 ],
        [ 4, 6, 8, 10, 8, 6, 4],
        [ 5, 8, 11, 13, 11, 8, 5],
        [ 5, 8, 11, 13, 11, 8, 5],
        [ 4, 6, 8, 10, 8, 6, 4],
        [ 3, 4, 5, 7, 5, 4, 3 ]
    ];

    public getScore(board: Board, player: Player): number {
        this.validateBoard(board);
        //console.log(board.lastX + " " + board.lastY);
        let score = this.scoreMatrix[board.lastX][board.lastY];
        return score;
    }    
    
    public getMaxScore(board: Board): number {
        this.validateBoard(board);
        return 1000;
    }

    private validateBoard(board: Board) {
        if(board.rows !== 7 || board.columns !== 6) {
            throw new Error("invalid board size");
        }
    }
}
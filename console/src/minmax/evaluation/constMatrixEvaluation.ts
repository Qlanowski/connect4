import { MinMaxEvaluation } from "./minMaxEvaluation";
import { Player } from "../../shared/player";
import { MinMaxBoard } from "../board/minMaxBoard";

export class ConstMatrixEvaluation implements MinMaxEvaluation {
    private readonly scoreMatrix: number[][] = 
    [
        [ 3, 4, 5, 7, 5, 4, 3 ],
        [ 4, 6, 8, 10, 8, 6, 4],
        [ 5, 8, 11, 13, 11, 8, 5],
        [ 5, 8, 11, 13, 11, 8, 5],
        [ 4, 6, 8, 10, 8, 6, 4],
        [ 3, 4, 5, 7, 5, 4, 3 ]
    ];

    public getScore(board: MinMaxBoard, player: Player): number {
        this.validateBoard(board);
        let score = 0;
        for (let x = 0; x < board.width; x++) {
            for (let y = 0; y < board.height; y++) {
                if (board.getField(x, y) === player) {
                    score += this.scoreMatrix[y][x];
                }
            }
        }
        return score;
    }    
    
    public getMaxScore(board: MinMaxBoard): number {
        this.validateBoard(board);
        return 10000;
    }

    private validateBoard(board: MinMaxBoard) {
        if(board.width !== 7 || board.height !== 6) {
            throw new Error("invalid board size");
        }
    }
}
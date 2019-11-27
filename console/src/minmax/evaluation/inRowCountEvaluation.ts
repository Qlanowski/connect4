import { MinMaxEvaluation } from "./minMaxEvaluation";
import { MinMaxBoard } from "../board/minMaxBoard";
import { Player } from "../../shared/player";

export class InRowCountEvaluation implements MinMaxEvaluation {
    getScore(board: MinMaxBoard, player: Player): number {
        const score = this.getVerticalInRowScore(board, player)
        + this.getHorizontalInRowScore(board, player)
        + this.getDiagonalInRowScore(board, player)
        + this.getAntiDiagonalInRowScore(board, player);

        return score;
    }    
    
    getMaxScore(board: MinMaxBoard): number {
        return Math.pow(10, board.inRowToWin) * 1000;
    }

    private getVerticalInRowScore(board: MinMaxBoard, player: Player): number {
        let score = 0;

        for (let x = 0; x < board.width; x++) {
            let inRow = 0;
            for (let y = 0; y < board.getPiecesInColumnCount(x); y++) {
                if (board.getField(x, y) === player) {
                    inRow++;
                }
                else {
                    score += Math.pow(10, inRow)
                    inRow = 0;
                }
            }
            score += Math.pow(10, inRow); 
        }

        return score;
    }

    private getHorizontalInRowScore(board: MinMaxBoard, player: Player): number {
        let score = 0;

        for (let y = 0; y < board.height; y++) {
            let inRow = 0;
            for (let x = 0; x < board.width; x++) {
                if (board.getField(x, y) === player) {
                    inRow++;
                }
                else {
                    score += Math.pow(10, inRow);
                    inRow = 0;
                }
            }
            score += Math.pow(10, inRow);
        }

        return score;
    }

    private getDiagonalInRowScore(board: MinMaxBoard, player: Player): number {
        let score = 0;

        for (let x = 0; x < board.width; x++) {
            let inRow = 0;
            for (let y = 0; y < Math.min(board.height, board.width - x); y++) {
                if (board.getField(x + y, y) === player) {
                    inRow++;
                }
                else {
                    score += Math.pow(10, inRow);
                    inRow = 0;
                }
            }
            score += Math.pow(10, inRow);
        }

        return score;
    }

    private getAntiDiagonalInRowScore(board: MinMaxBoard, player: Player): number {
        let score = 0;

        for (let x = 0; x < board.width; x++) {
            let inRow = 0;
            for (let y = 0; y < Math.min(board.height, x); y++) {
                if (board.getField(x - y, y) === player) {
                    inRow++;
                }
                else {
                    score += Math.pow(10, inRow);
                    inRow = 0;
                }
            }
            score += Math.pow(10, inRow);
        }

        return score;
    }
}
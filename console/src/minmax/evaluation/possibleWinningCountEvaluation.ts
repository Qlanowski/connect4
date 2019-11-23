import { MinMaxEvaluation } from "./minMaxEvaluation";
import { Board } from "../../shared/board";
import { Player } from "../../shared/player";
import { BoardHelper } from "../boardHelper";

export class PossibleWinningCountEvaluation implements MinMaxEvaluation {
    public getScore(board: Board, player: Player): number {
        let opponent = BoardHelper.getOpponent(player);
        let score = this.getPlayerWinPossibilitiesCount(board, player) / 2 - this.getPlayerWinPossibilitiesCount(board, opponent);
        return score;
    }
    
    public getMaxScore(board: Board): number {
        return board.columns * board.columns;
    }

    private getPlayerWinPossibilitiesCount(board: Board, player: Player): number {
        return this.getVerticalWinPossibiltiesCount(board, player)
        + this.getHorizontalWinPossibilitiesCount(board, player)
        + this.getDiagonalWinPossibilitiesCount(board, player)
        + this.getAntiDiagonalWinPossibilitiesCount(board, player);
    }

    private getVerticalWinPossibiltiesCount(board: Board, player: Player): number {
        let fields = board.board;
        let counter = 0;
        if (board.rows < board.inRow) {
            return 0;
        }

        for(let j = 0; j < board.columns; j++) {
            let height = board.heights[j];
            if (height === 0 || (fields[j][height - 1] === player && board.rows - height >= board.inRow)) {
                counter++;
            }
        }
        return counter;
    }

    private getHorizontalWinPossibilitiesCount(board: Board, player: Player): number {
        let fields = board.board;
        let counter = 0;
        let opponent = BoardHelper.getOpponent(player);
        if (board.columns < board.inRow) {
            return 0;
        }

        for(let i = 0; i < board.rows; i++) {
            let possible = 0;
            for(let j = 0; j < board.columns; j++) {
                if (fields[j][i] !== opponent && (i === 0 || fields[j][i - 1] !== Player.None)) {
                    possible++;
                }
                else {
                    if(possible >= board.inRow) {
                        counter++;
                    }
                    possible = 0;
                }
            }
        }

        return counter;
    }

    private getDiagonalWinPossibilitiesCount(board: Board, player: Player): number {
        let fields = board.board;
        let counter = 0;
        let opponent = BoardHelper.getOpponent(player);
        if (board.columns < board.inRow || board.rows < board.inRow) {
            return 0;
        }

        for(let j = 0; j < board.columns; j++) {
            let iMax = Math.min(board.columns - j, board.rows);
            let possible = 0;
            for(let i = 0; i < iMax; i++) {
                let x = i;
                let y = i + j;
                if (fields[y][x] !== opponent && (x === 0 || fields[y][x - 1] !== Player.None)) {
                    possible++;
                }
                else {
                    if (possible >= board.inRow) {
                        counter++;
                    }
                    possible = 0;
                }
            }
        }

        return counter;
    }

    private getAntiDiagonalWinPossibilitiesCount(board: Board, player: Player): number {
        let fields = board.board;
        let counter = 0;
        let opponent = BoardHelper.getOpponent(player);
        if (board.columns < board.inRow || board.rows < board.inRow) {
            return 0;
        }

        for(let j = 0; j < board.columns; j++) {
            let iMax = Math.min(j + 1, board.rows);
            let possible = 0;
            for(let i = 0; i < iMax; i++) {
                let x = i;
                let y = j - i;
                if (fields[y][x] !== opponent && (x === 0 || fields[y][x - 1] !== Player.None)) {
                    possible++;
                }
                else {
                    if (possible >= board.inRow) {
                        counter++;
                    }
                    possible = 0;
                }
            }
        }

        return counter;
    }

}
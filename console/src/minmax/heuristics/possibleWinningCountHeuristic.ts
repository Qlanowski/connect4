import { MinMaxHeuristic } from "./minMaxHeuristic";
import { Board } from "../../shared/board";
import { Player } from "../../shared/player";

export class PossibleWinningCountHeuristic implements MinMaxHeuristic {
    public getScore(board: Board, player: Player): number {
        throw new Error("Method not implemented.");
    }
    
    public getMaxScore(board: Board): number {
        return Number.POSITIVE_INFINITY;
    }

    private getVerticalWinPossibiltiesCount(board: Board, player: Player): number {
        let fields = board.board;
        let counter = 0;
        if (board.rows < board.inRow) {
            return 0;
        }
        for(let j = 0; j < board.columns; j++) {
            let height = board.heights[j];
            if (height === 0 
                || (fields[height - 1][j] === player 
                    && board.rows - height >= board.inRow)) {
                        counter++;
                    }
        }
        return counter;
    }

    private getHorizontalWinPossibilitiesCount(board: Board, player: Player): number {
        
    }

}
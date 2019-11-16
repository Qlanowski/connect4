import { Board } from "../../shared/board";

export interface MinMaxHeuristic {
    getScore(board: Board): number;
}
import { Board } from "../../shared/board";
import { Player } from "../../shared/player";

export interface MinMaxEvaluation {
    getScore(board: Board, player: Player): number;
    getMaxScore(board:Board): number;
}
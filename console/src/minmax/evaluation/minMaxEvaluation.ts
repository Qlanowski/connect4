import { Player } from "../../shared/player";
import { MinMaxBoard } from "../board/minMaxBoard";

export interface MinMaxEvaluation {
    getScore(board: MinMaxBoard, player: Player): number;
    getMaxScore(board: MinMaxBoard): number;
}
import { PlayerType } from "./player-type";

export interface GameConfig {
    readonly milisecondsForAlgorithm?: number;
    readonly boardRows?: number;
    readonly boardColumns?: number;
    readonly playerOne?: PlayerType;
    readonly playerTwo?: PlayerType;
}
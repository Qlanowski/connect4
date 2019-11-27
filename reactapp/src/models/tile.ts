import { Player } from './imported';

export interface Tile {
    playerOcupping: Player;
    isWinningMove: boolean;
}
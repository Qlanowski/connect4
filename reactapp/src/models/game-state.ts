import { Tile } from './tile';
import { Result } from './imported';
import { Player } from './imported';

export interface GameState  {
    readonly board?: Tile[][];
    readonly result: Result;
    readonly playerMoving: Player;
}
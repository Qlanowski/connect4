import { Tile } from './tile';
import { Result } from './imported';
import { Player } from './imported';
import { GameConfig } from './game-config';

export interface GameState  {
    readonly board?: Tile[][];
    readonly gameConfig?: GameConfig;
    readonly result: Result;
    readonly playerMoving: Player;
}
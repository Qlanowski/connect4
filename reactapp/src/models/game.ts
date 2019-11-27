import { GameConfig } from './game-config';
import { GameState } from './game-state';

export interface Game {
    readonly gameConfig: GameConfig,
    readonly gameState: GameState
}
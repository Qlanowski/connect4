import { Action } from 'redux';
import { Tile } from '../../../models/tile';
import { GameConfig } from '../../../models/game-config';

export enum GAME_STATE_ACTION_TYPE {
    MOVE_MADE = 'MOVE_MADE', GAME_STARTED = 'GAME_STARTED', GAME_RESTARTED = 'GAME_RESTARTED',
    NEW_GAME = 'NEW_GAME'
}

export interface GameStateGameStartedAction extends Action<GAME_STATE_ACTION_TYPE.GAME_STARTED> {
    newConfig: GameConfig;
}

export interface GameStateMoveMadeAction extends Action<GAME_STATE_ACTION_TYPE.MOVE_MADE> {
    column: number;
}

export interface GameStateGameRestartedAction extends Action<GAME_STATE_ACTION_TYPE.GAME_RESTARTED> {}

export interface GameStateNewGameAction extends Action<GAME_STATE_ACTION_TYPE.NEW_GAME> {}

export type GameStateActions = GameStateGameStartedAction | GameStateMoveMadeAction | GameStateGameRestartedAction |
                                GameStateNewGameAction;
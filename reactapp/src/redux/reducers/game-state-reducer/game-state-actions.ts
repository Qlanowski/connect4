import { Action } from 'redux';
import { Tile } from '../../../models/tile';

export enum GAME_STATE_ACTION_TYPE {
    MOVE_MADE = 'MOVE_MADE', GAME_STARTED = 'GAME_STARTED'
}



export interface GameStateGameStartedAction extends Action<GAME_STATE_ACTION_TYPE.GAME_STARTED> {
    initialBoard: Tile[][];
}

export interface GameStateMoveMadeAction extends Action<GAME_STATE_ACTION_TYPE.MOVE_MADE> {
    column: number;
}

export type GameStateActions = GameStateGameStartedAction | GameStateMoveMadeAction;
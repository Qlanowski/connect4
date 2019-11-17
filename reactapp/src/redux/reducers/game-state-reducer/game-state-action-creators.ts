import { ActionCreator } from 'redux';
import { GameStateMoveMadeAction, GameStateGameStartedAction, GAME_STATE_ACTION_TYPE } from './game-state-actions';
import { GameConfig } from '../../../models/game-config';

export const gameStateMoveMadeActionCreator: ActionCreator<GameStateMoveMadeAction> = (column: number): GameStateMoveMadeAction => {
    return {
        column,
        type: GAME_STATE_ACTION_TYPE.MOVE_MADE
    };
};

export const gameStateGameStartedActionCreator: ActionCreator<GameStateGameStartedAction> = (newConfig: GameConfig): GameStateGameStartedAction => {

    return {
        type: GAME_STATE_ACTION_TYPE.GAME_STARTED,
        newConfig
    };
};
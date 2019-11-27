import { ActionCreator } from 'redux';
import { GameStateMoveMadeAction, GameStateGameStartedAction, 
    GameStateGameRestartedAction, GameStateNewGameAction, GAME_STATE_ACTION_TYPE } from './game-state-actions';
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

export const gameStateGameRestartedActionCreator: ActionCreator<GameStateGameRestartedAction> = (): GameStateGameRestartedAction => {
    return {
        type: GAME_STATE_ACTION_TYPE.GAME_RESTARTED,
    };
};

export const gameStateNewGameActionCreator: ActionCreator<GameStateNewGameAction> = (): GameStateNewGameAction => {
    return {
        type: GAME_STATE_ACTION_TYPE.NEW_GAME,
    };
};
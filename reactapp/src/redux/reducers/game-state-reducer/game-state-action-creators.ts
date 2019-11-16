import { ActionCreator } from 'redux';
import { GameStateMoveMadeAction, GameStateGameStartedAction, GAME_STATE_ACTION_TYPE } from './game-state-actions';
import { Player } from '../../../models/imported';

export const gameStateMoveMadeActionCreator: ActionCreator<GameStateMoveMadeAction> = (column: number): GameStateMoveMadeAction => {
    return {
        column,
        type: GAME_STATE_ACTION_TYPE.MOVE_MADE
    };
};

export const gameStateGameStartedActionCreator: ActionCreator<GameStateGameStartedAction> = (rows: number, columns: number): GameStateGameStartedAction => {
    const nullArr = Array(rows).fill(0).map(row => Array(columns).fill(null));
    const initialBoard = nullArr.map(row => row.map(x => ({playerOcupping: Player.None, isWinningMove: false})));

    return {
        type: GAME_STATE_ACTION_TYPE.GAME_STARTED,
        initialBoard
    };
};
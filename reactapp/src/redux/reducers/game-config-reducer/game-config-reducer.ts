import { Reducer } from 'redux';
import { GameConfigActions, GAME_CONFIG_ACTION_TYPE } from './game-config-actions';
import { GameConfig } from '../../../models/game-config';

const initialGameConfig = {};

export const gameConfigReducer: Reducer<GameConfig, GameConfigActions> =  (state: GameConfig = initialGameConfig, action: GameConfigActions): GameConfig => {
    switch (action.type) {
        case GAME_CONFIG_ACTION_TYPE.SETUP_COMPLETE:
            return {
                ...action.newGameConfig
            };
    }
    return state;
}
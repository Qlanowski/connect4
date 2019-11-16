import { ActionCreator } from 'redux';
import { GameConfigSetupCompleteAction, GAME_CONFIG_ACTION_TYPE } from './game-config-actions';
import { GameConfig } from '../../../models/game-config';


export const gameConfigSetupCompleteActionCreator: ActionCreator<GameConfigSetupCompleteAction> = (gameConfig: GameConfig): GameConfigSetupCompleteAction => {
    return {
        newGameConfig : {...gameConfig},
        type: GAME_CONFIG_ACTION_TYPE.SETUP_COMPLETE
    }
}
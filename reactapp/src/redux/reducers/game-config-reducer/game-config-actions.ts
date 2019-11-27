import { Action } from 'redux';
import { GameConfig } from '../../../models/game-config';

export enum GAME_CONFIG_ACTION_TYPE {
    SETUP_COMPLETE = 'SETUP_COMPLETE'
}

export interface GameConfigSetupCompleteAction extends Action<GAME_CONFIG_ACTION_TYPE.SETUP_COMPLETE> {
    newGameConfig: GameConfig;
}

export type GameConfigActions = GameConfigSetupCompleteAction;
import { combineReducers } from "redux";
import { gameConfigReducer } from './game-config-reducer/game-config-reducer';
import { gameStateReducer } from './game-state-reducer/game-state-reducer';
import { Game } from '../../models/game';


export const rootReducer = gameStateReducer;


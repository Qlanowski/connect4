import { rootReducer } from './reducers/root-reducer';
import { Store, createStore } from 'redux';
import { Game } from '../models/game';

export const store: Store<Game> = createStore(rootReducer);
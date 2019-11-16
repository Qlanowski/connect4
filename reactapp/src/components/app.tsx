import * as React from 'react';
import { GameBoard } from './game-board/game-board';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

const App: React.FC = () => <Provider store={store}><GameBoard></GameBoard></Provider>

export default App;
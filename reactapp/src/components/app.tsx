import * as React from 'react';
import { GameBoard } from './game-panel/game-board/game-board';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { Main } from './main/main';

const App: React.FC = () => <Provider store={store}><Main></Main></Provider>

export default App;
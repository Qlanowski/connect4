import * as React from 'react';
import { connect } from 'react-redux';

import { GameConfigSetup } from '../game-config-setup/game-config-setup';
import { Result } from '../../models/imported';
import { GameBoard } from '../game-board/game-board';
import { GameState } from '../../models/game-state';

interface MainProps {
    result: Result;
}

const MainDisconnected: React.FC<MainProps> = ({result}) => {
    return result === Result.NotStarted ? <GameConfigSetup></GameConfigSetup> : <GameBoard></GameBoard>
}

const mapStateToProps = (store: GameState) => {
    return {
        result: store.result
    }
}

export const Main = connect(
    mapStateToProps,
    null
)(MainDisconnected);


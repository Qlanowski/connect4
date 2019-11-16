import * as React from 'react';
import { GameConfigForm } from './game-config-form/game-config-form';
import { GameConfig } from '../../models/game-config';
import { connect } from 'react-redux';
import { gameStateGameStartedActionCreator } from '../../redux/reducers/game-state-reducer/game-state-action-creators';


interface GameConfigSetupProps {
    startGame: (gameConfig: GameConfig) => void;
}

const GameConfigSetupDisconnected: React.FC<GameConfigSetupProps> = ({ startGame }) => {
    const handleSubmit = (newConfig: GameConfig) => { startGame(newConfig) };
    return (
        <GameConfigForm handleSubmit={handleSubmit}></GameConfigForm>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        startGame: (gameConfig: GameConfig) => {
            dispatch(gameStateGameStartedActionCreator(gameConfig))
        }
    }
}

export const GameConfigSetup = connect(null, mapDispatchToProps)(GameConfigSetupDisconnected);

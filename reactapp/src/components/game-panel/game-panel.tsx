import { connect } from 'react-redux';
import * as React from 'react';
import styled from 'styled-components';

import { Player } from '../../models/imported';
import { Tile } from '../../models/tile';
import { Result } from '../../models/imported';
import { GameBoard } from './game-board/game-board';
import { GameState } from '../../models/game-state';
import { gameStateMoveMadeActionCreator, gameStateGameRestartedActionCreator, 
        gameStateNewGameActionCreator } from '../../redux/reducers/game-state-reducer/game-state-action-creators';
import { GamePanelSidebar } from './game-panel-sidebar/game-panel-sidebar';

const GamePanelContainer = styled.div
    `
width: 90vmin;
height: 90vmin;
margin: 5vmin auto;
background-color: #aaaaee;
display: flex;
flex-direction: column;
`;

interface GamePanelProps {
    board: Tile[][];
    playerMoving: Player;
    makeMove: (column: number) => void;
    restartGame: () => void;
    newGame: () => void;
    result: Result;
}

const GamePanelDisconnected: React.FC<GamePanelProps> = ({ board, playerMoving, makeMove, result, restartGame, newGame }) => {
    const handleColumnClick = (column: number): void => {
        if (result === Result.GameOn)
            makeMove(column);
    }
    return (
        <GamePanelContainer>
            <GameBoard board={board} onColumnClick={handleColumnClick}></GameBoard>
            <GamePanelSidebar playerMoving={playerMoving} result={result}
            gameRestarted={() => restartGame()} newGame={() => newGame()}
            ></GamePanelSidebar>
        </GamePanelContainer>
    );
}

const mapStateToProps = (store: GameState) => {
    return {
        board: store.board,
        playerMoving: store.playerMoving,
        result: store.result
    }
}

const mapDispatchToProps = dispatch => {
    return {
        makeMove: (col: number) => dispatch(gameStateMoveMadeActionCreator(col)),
        restartGame: () => dispatch(gameStateGameRestartedActionCreator()),
        newGame: () => dispatch(gameStateNewGameActionCreator())
    }
}

export const GamePanel = connect(
    mapStateToProps,
    mapDispatchToProps
)(GamePanelDisconnected);


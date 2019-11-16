import { connect} from 'react-redux';
import * as React from 'react';
import styled from 'styled-components';

import { Player } from '../../models/imported';
import { Tile } from '../../models/tile';
import { GameBoardColumn } from './game-board-column/game-board-column';
import { GameState } from '../../models/game-state';
import { gameStateMoveMadeActionCreator, gameStateGameStartedActionCreator } from '../../redux/reducers/game-state-reducer/game-state-action-creators';

const GameBoardContainer = styled.div
    `
width: 90vmin;
height: 90vmin;
margin: 5vmin auto;
background-color: #aaaaee;
display: flex;
`;

interface GameBoardProps {
    board: Tile[][];
    playerMoving: Player;
    makeMove: (column: number) => void;
}

const GameBoardDisconnected: React.FC<GameBoardProps> = ({ board, playerMoving, makeMove }) => {
    const handleColumnClick = (column: number): void => {
        makeMove(column);
    }
    return (
        <GameBoardContainer>
            {
                board ? board.map((columnTiles, columnIndex) => <GameBoardColumn handleClick={handleColumnClick} tiles={columnTiles} column={columnIndex} key={columnIndex}></GameBoardColumn>)
                : null
            }
        </GameBoardContainer>)
        ;
}

const mapStateToProps = (store: GameState) => {
    return {
        board: store.board,
        playerMoving: store.playerMoving
    }
}

const mapDispatchToProps = dispatch => {
    return {
        makeMove: (col: number) => dispatch(gameStateMoveMadeActionCreator(col)),
    }
}

export const GameBoard = connect(
    mapStateToProps,
    mapDispatchToProps
)(GameBoardDisconnected);


import { connect} from 'react-redux';
import * as React from 'react';
import styled from 'styled-components';

import { Player } from '../../models/imported';
import { Tile } from '../../models/tile';
import { GameBoardColumn } from './game-board-column/game-board-column';
import { Game } from '../../models/game';
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
    startGame: (rows: number, columns: number) => void;
}

const GameBoardDisconnected: React.FC<GameBoardProps> = ({ board, playerMoving, makeMove, startGame }) => {
    const ROWS = 5, COLS = 5;
    const handleColumnClick = (column: number): void => {
        makeMove(column);
    }
    React.useEffect(() => {
        startGame(ROWS, COLS)
    }, []);
    return (
        <GameBoardContainer>
            {
                board ? board.map((columnTiles, columnIndex) => <GameBoardColumn handleClick={handleColumnClick} tiles={columnTiles} column={columnIndex} key={columnIndex}></GameBoardColumn>)
                : null
            }
        </GameBoardContainer>)
        ;
}

const mapStateToProps = (store: Game) => {
    return {
        board: store.gameState.board,
        playerMoving: store.gameState.playerMoving
    }
}

const mapDispatchToProps = dispatch => {
    return {
        makeMove: (col: number) => dispatch(gameStateMoveMadeActionCreator(col)),
        startGame: (rows: number, columns: number) => dispatch(gameStateGameStartedActionCreator(rows, columns))
    }
}

export const GameBoard = connect(
    mapStateToProps,
    mapDispatchToProps
)(GameBoardDisconnected);


import * as React from 'react';
import styled from 'styled-components';

import { Tile } from '../../../../models/tile';
import { GameBoardColumn } from './game-board-column/game-board-column';

const GameBoardContainer = styled.div
    `
background-color: #aaaaee;
display: flex;
flex: 1;
`;

interface GameBoardProps {
    board: Tile[][];
    onColumnClick: (column: number) => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({ board, onColumnClick }) => {
    const handleColumnClick = (column: number): void => {
        onColumnClick(column);
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


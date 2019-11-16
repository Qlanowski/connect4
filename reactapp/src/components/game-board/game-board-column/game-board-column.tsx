import * as React from 'react';
import styled from 'styled-components';
import { GameBoardTile } from './game-board-tile/game-board-tile';
import { Tile } from '../../../models/tile';

const GameBoardColumnContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column-reverse;
    cursor: pointer;
`;

export interface GameBoardColumnProps  {
    tiles: Tile[];
    column: number;
    handleClick: (column: number) => void;
};

export const GameBoardColumn: React.FC<GameBoardColumnProps> = ({tiles, column, handleClick}: GameBoardColumnProps) => {
    return (
    <GameBoardColumnContainer onClick={() => handleClick(column)}>
        {
            tiles.map((tile, index) => <GameBoardTile tile={tile} key={index}></GameBoardTile>)
        }
    </GameBoardColumnContainer>
    );
};
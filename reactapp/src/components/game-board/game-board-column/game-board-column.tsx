import * as React from 'react';
import styled from 'styled-components';
import { Player } from '../../../models/imported';
import { GameBoardTile } from './game-board-tile/game-board-tile';

const GameBoardColumnContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column-reverse;
    cursor: pointer;
`;

export interface GameBoardColumnProps  {
    tiles: Player[];
    handleClick: (tiles: Player[]) => void;
};

export const GameBoardColumn: React.FC<GameBoardColumnProps> = ({tiles, handleClick}: GameBoardColumnProps) => {
    return (
    <GameBoardColumnContainer onClick={() => handleClick(tiles)}>
        {
            tiles.map((tile, index) => <GameBoardTile player={tile} key={index}></GameBoardTile>)
        }
    </GameBoardColumnContainer>
    );
};
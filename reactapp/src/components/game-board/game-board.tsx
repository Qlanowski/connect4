import { Player } from '../../models/imported';
import * as React from 'react';
import styled from 'styled-components';
import { GameBoardColumn } from './game-board-column/game-board-column';

const GameBoardContainer = styled.div
`
width: 90vmin;
height: 90vmin;
margin: 5vmin auto;
background-color: #aaaaee;
display: flex;
`;

export const GameBoard: React.FC = () => {
    const ROWS = 5, COLS = 5;
    const [playerMoving, setPlayerMoving] = React.useState<Player>(Player.Player0);
    const initBoard = Array(ROWS).fill(0).map(row => Array(COLS).fill(Player.None));
    const [board, setBoard] = React.useState<Player[][]>(initBoard);
    
    const handleColumnClick = (tiles: Player[]) => {
        const editedTileIndex = tiles.findIndex(tile => tile === Player.None);
        const newTiles = tiles.slice();
        newTiles[editedTileIndex] = playerMoving;
        const newBoard = board.map(boardColumn => boardColumn === tiles ? newTiles : boardColumn);
        setBoard(newBoard);
        setPlayerMoving(playerMoving === Player.Player0 ? Player.Player1 : Player.Player0);
    }

    return (
    <GameBoardContainer>
        {
            board.map((column, index) => <GameBoardColumn handleClick={handleColumnClick} tiles={column} key={index}></GameBoardColumn>)
        }
    </GameBoardContainer>)
    ;
}


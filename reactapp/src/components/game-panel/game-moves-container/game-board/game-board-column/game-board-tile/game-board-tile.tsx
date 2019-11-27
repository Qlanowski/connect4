import { Tile } from "../../../../../../models/tile";
import { Player } from "../../../../../../models/imported";
import * as React from 'react';
import styled from 'styled-components';
const cross = require('./cross.png');

export interface GameBoardTileProps {
    tile: Tile;
};

const GameBoardTileContainer = styled.div`
    background-color: #4d66a3;
    flex: 1 1;
    height: auto;
    border: 2px solid #1d2c52;
`;

const GameBoardCircle = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: ${props => props.circleColor};
    overflow:hidden;
`;

const GameBoardCross = styled.img`
    max-width: 50%;
    margin: 0 auto;
    display: block;
`

export const GameBoardTile: React.FC<GameBoardTileProps> = ({tile}) => {
    const getTileCircleColor = (player: Player): string => {
        switch (player) {
            case Player.Player0:
                return 'red';
            case Player.Player1:
                return 'yellow';
            default:
                return 'white';
        }
    }
    const tileCircleColor = getTileCircleColor(tile.playerOcupping);
    return (
    <GameBoardTileContainer>
        <GameBoardCircle circleColor={tileCircleColor}> 
            { tile.isWinningMove ? <GameBoardCross src={cross}></GameBoardCross> : null }
        </GameBoardCircle>
    </GameBoardTileContainer>
    )
}
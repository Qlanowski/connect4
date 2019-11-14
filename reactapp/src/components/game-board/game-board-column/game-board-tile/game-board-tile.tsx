import { Player } from "../../../../models/imported";
import * as React from 'react';
import styled from 'styled-components';

export interface GameBoardTileProps {
    player: Player;
};

interface GameBoardCircleProps {
    circleColor: string;
}

const GameBoardTileContainer = styled.div`
    background-color: #4d66a3;
    flex: 1;
    border: 2px solid #1d2c52;
`;

const GameBoardCircle = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: ${props => props.circleColor};
`;

export const GameBoardTile: React.FC<GameBoardTileProps> = ({player}: GameBoardTileProps) => {
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
    const tileCircleColor = getTileCircleColor(player);
    return (
    <GameBoardTileContainer>
        <GameBoardCircle circleColor={tileCircleColor}></GameBoardCircle>
    </GameBoardTileContainer>
    )
}
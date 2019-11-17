import * as React from 'react';
import styled from 'styled-components';
import { Result, Player } from '../../../../models/imported';

const GameInfo = styled.h1`
    font-size: 1.5em;
`

interface GamePanelSidebarTextProps {
    result: Result,
    playerMoving: Player
}

export const GamePanelSidebarText: React.FC<GamePanelSidebarTextProps> =
    ({ result, playerMoving }) => {
        const getResultText = (result: Result): string => {
            switch (result) {
                case Result.GameOn:
                    return 'Game on!';
                case Result.Draw:
                    return 'Game drawn!';
                case Result.WonPlayer0:
                    return 'Red player won!';
                case Result.WonPlayer1:
                    return 'Yellow player won!';
            }
        }
        const getPlayerMovingText = (playerMoving: Player): string => {
            return playerMoving === Player.Player0 ? "Red player's move" : "Yellow player's move";
        }
        return (
            <GameInfo>{result === Result.GameOn ? getPlayerMovingText(playerMoving) : getResultText(result)}</GameInfo>
        )
    }
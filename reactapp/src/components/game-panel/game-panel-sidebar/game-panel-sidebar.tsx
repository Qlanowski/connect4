import * as React from 'react';
import styled from 'styled-components';

import { Result } from '../../../models/imported';
import { Player } from '../../../models/imported';

import { GamePanelSidebarButtons } from './game-panel-sidebar-buttons/game-panel-sidebar-buttons';
import { GamePanelSidebarText } from './game-panel-sidebar-text/game-panel-sidebar-text'; 
interface GamePanelSidebarProps {
    result: Result;
    playerMoving: Player;
    gameRestarted: () => void;
    newGame: () => void;
}

const GamePanelSidebarContainer = styled.div`
    padding: 2vmin;
    text-align: center;
    background-color: #fff;
`;

export const GamePanelSidebar: React.FC<GamePanelSidebarProps> = ({result, playerMoving, gameRestarted, newGame}) => {

    return (
        <GamePanelSidebarContainer>
        <GamePanelSidebarText result={result} playerMoving={playerMoving}></GamePanelSidebarText>
        {result !== Result.GameOn ? 
            <GamePanelSidebarButtons gameRestarted={gameRestarted} newGame={newGame}></GamePanelSidebarButtons>
             :
            null }
        </GamePanelSidebarContainer>
    );
}
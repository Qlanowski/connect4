import * as React from 'react';
import styled from 'styled-components';

interface GamePanelSidebarButtonsProps {
    gameRestarted: () => void;
    newGame: () => void;
}

export const GamePanelSidebarButtons: React.FC<GamePanelSidebarButtonsProps> = 
({gameRestarted, newGame}) => {
    return (
    <div>
        <button onClick={() => gameRestarted()}>Restart game</button> 
        <button onClick={() => newGame()}>New Game</button>
    </div>
    )
}
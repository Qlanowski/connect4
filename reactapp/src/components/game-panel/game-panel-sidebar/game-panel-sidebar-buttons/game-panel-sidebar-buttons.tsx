import * as React from 'react';
import styled from 'styled-components';

interface GamePanelSidebarButtonsProps {
    gameRestarted: () => void;
    newGame: () => void;
}

export const DefaultButton = styled.button`
    background: #fff;
    margin: 5px auto;
    border-radius: 6px;
    height: 35px;
    line-height: 35px;
    border: 1px solid #aaa;
    box-shadow: 0px;
    outline: none;
    transition: 0.15s;
    padding: 0 10px;
    margin: 0 4px;
    text-align: center;
    cursor: pointer;
    &:hover {
        background: #eee;
    }
  `

export const GamePanelSidebarButtons: React.FC<GamePanelSidebarButtonsProps> = 
({gameRestarted, newGame}) => {
    return (
    <div>
        <DefaultButton onClick={() => gameRestarted()}>Restart game</DefaultButton> 
        <DefaultButton onClick={() => newGame()}>New Game</DefaultButton>
    </div>
    )
}
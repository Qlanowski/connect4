import { connect } from 'react-redux';
import * as React from 'react';
import styled from 'styled-components';

import { Player } from '../../models/imported';
import { Tile } from '../../models/tile';
import { Result } from '../../models/imported';
import { GameBoard } from './game-board/game-board';
import { GameState } from '../../models/game-state';
import {
    gameStateMoveMadeActionCreator, gameStateGameRestartedActionCreator,
    gameStateNewGameActionCreator
} from '../../redux/reducers/game-state-reducer/game-state-action-creators';
import { GamePanelSidebar } from './game-panel-sidebar/game-panel-sidebar';
import { GameConfig } from '../../models/game-config';
import { Bot } from '../../../../console/src/shared/bot';
import { BotWorkerService } from '../../services/bot/bot-worker-service';


const GamePanelContainer = styled.div
    `
width: 90vmin;
height: 90vmin;
margin: 5vmin auto;
background-color: #aaaaee;
display: flex;
flex-direction: column;
`;

interface GamePanelProps {
    board: Tile[][];
    playerMoving: Player;
    makeMove: (column: number) => void;
    restartGame: () => void;
    newGame: () => void;
    result: Result;
    gameConfig: GameConfig;
}

const botWorkerService = new BotWorkerService();

const GamePanelDisconnected: React.FC<GamePanelProps> = ({ board, playerMoving, makeMove, result, restartGame, newGame, gameConfig }) => {
    const [isBotMakingMove, setIsBotMakingMove] = React.useState<boolean>(false);


    React.useEffect(() => {
        const callback = (event) => {
            setIsBotMakingMove(false);
            if (event.data !== null)
                makeMove(event.data);
        };
        
        botWorkerService.subscribeToBotMove(callback);

        return () => botWorkerService.unsubscribeFromBotMove(callback);
    }, []);

    React.useEffect(() => {
        if (result === Result.GameOn)
            botWorkerService.initializeBots(gameConfig);
    }, [result]);

    React.useEffect(() => {
        if (result === Result.GameOn) {
            setIsBotMakingMove(true);
            botWorkerService.makeMove(playerMoving);
        }
    }, [playerMoving])

    const handleColumnClick = (column: number): void => {
        if (result !== Result.GameOn || isBotMakingMove)
            return;
        botWorkerService.moveMade(playerMoving, column);
        makeMove(column);
    }
    return (
        <GamePanelContainer>
            <GameBoard board={board} onColumnClick={handleColumnClick}></GameBoard>
            <GamePanelSidebar playerMoving={playerMoving} result={result}
                gameRestarted={() => restartGame()} newGame={() => newGame()}
            ></GamePanelSidebar>
        </GamePanelContainer>
    );
}

const mapStateToProps = (store: GameState) => {
    return {
        board: store.board,
        playerMoving: store.playerMoving,
        result: store.result,
        gameConfig: store.gameConfig
    }
}

const mapDispatchToProps = dispatch => {
    return {
        makeMove: (col: number) => dispatch(gameStateMoveMadeActionCreator(col)),
        restartGame: () => dispatch(gameStateGameRestartedActionCreator()),
        newGame: () => dispatch(gameStateNewGameActionCreator())
    }
}

export const GamePanel = connect(
    mapStateToProps,
    mapDispatchToProps
)(GamePanelDisconnected);


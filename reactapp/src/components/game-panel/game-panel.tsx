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
import { BotInstanceProvider } from '../../services/bot-instance-provider';

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

const botInstanceProvider = new BotInstanceProvider();

const GamePanelDisconnected: React.FC<GamePanelProps> = ({ board, playerMoving, makeMove, result, restartGame, newGame, gameConfig }) => {
    const [isBotMakingMove, setIsBotMakingMove] = React.useState<boolean>(false);


    React.useEffect(() => {
        if (result === Result.GameOn)
            botInstanceProvider.initializeBots(gameConfig);
    }, [result]);

    React.useEffect(() => {
        const botMoving = playerMoving === Player.Player0 ? botInstanceProvider.getPlayer1Bot() : botInstanceProvider.getPlayer2Bot();
        const botWaiting = playerMoving === Player.Player0 ? botInstanceProvider.getPlayer2Bot() : botInstanceProvider.getPlayer1Bot();
        setIsBotMakingMove(true);
        setTimeout(function () {
            handleBotMoving(botMoving, botWaiting);
            setIsBotMakingMove(false);
        })
    }, [playerMoving])

    const handleColumnClick = (column: number): void => {
        if (result !== Result.GameOn || isBotMakingMove)
            return;
            
        const botWaiting = playerMoving === Player.Player0 ? botInstanceProvider.getPlayer2Bot() : botInstanceProvider.getPlayer1Bot();
        if (botWaiting !== null)
            botWaiting.playerMove(column);
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

    function handleBotMoving(botMoving: Bot, botWaiting: Bot) {
        if (botMoving === null || result !== Result.GameOn) {
            return;
        }
        const moveToMake = botMoving.makeMove();
        console.log(moveToMake);
        makeMove(moveToMake);
        if (botWaiting !== null) {
            botWaiting.playerMove(moveToMake);
        }
    }
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


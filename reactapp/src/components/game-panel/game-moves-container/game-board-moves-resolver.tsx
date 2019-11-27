import * as React from 'react'
import { Result, Player } from '../../../models/imported'
import { Tile } from '../../../models/tile'
import { BotWorkerService } from '../../../services/bot/bot-worker-service';
import { GameBoardSolverService } from '../../../services/game-board-solver-service';
import { GameConfig } from '../../../models/game-config';
import { GameBoard } from './game-board/game-board';

interface GameMovesContainerProps {
    handleMove: (column: number) => void;
    result: Result;
    playerMoving: Player;
    board: Tile[][];
    gameConfig: GameConfig
}

const botWorkerService = new BotWorkerService();
const gameBoardSolverService = new GameBoardSolverService();

export const GameBoardMovesResolver: React.FC<GameMovesContainerProps> = ({handleMove, result, playerMoving, board, gameConfig}) => {
    const [isBotMakingMove, setIsBotMakingMove] = React.useState<boolean>(false);

    React.useEffect(() => {
        const callback = (event) => {
            setIsBotMakingMove(false);
            if (event.data !== null)
                handleMove(event.data);
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
        if (!canPlayerMove(result, board, column, isBotMakingMove))
            return;
        botWorkerService.moveMade(playerMoving, column);
        handleMove(column);
    }
    
    function canPlayerMove(result: Result, board: Tile[][], column: number, isBotMakingMove: boolean): boolean {
        return !isBotMakingMove && result === Result.GameOn && gameBoardSolverService.canMove(board, column);
    }

    return (
        <GameBoard board={board} onColumnClick={handleColumnClick}></GameBoard>
    )
}

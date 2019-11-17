import { Reducer } from 'redux';
import { GameStateActions, GAME_STATE_ACTION_TYPE, GameStateNewGameAction,
    GameStateGameStartedAction, GameStateMoveMadeAction, GameStateGameRestartedAction } from './game-state-actions';
import { GameState } from '../../../models/game-state';
import { Player, Result } from '../../../models/imported';
import { GameBoardSolverService } from '../../../services/game-board-solver-service';

const gameBoardSolverService = new GameBoardSolverService();
const initialGameState: GameState = { playerMoving: Player.Player0, result: Result.NotStarted };

export const gameStateReducer: Reducer<GameState, GameStateActions> = (state: GameState = initialGameState, action: GameStateActions): GameState => {
    switch (action.type) {
        case GAME_STATE_ACTION_TYPE.GAME_STARTED:
            return resolveGameStartedAction(state, action);
        case GAME_STATE_ACTION_TYPE.MOVE_MADE:
            return resolveMoveMadeAction(state, action);
        case GAME_STATE_ACTION_TYPE.GAME_RESTARTED:
            return resolveGameRestartedAction(state, action);
        case GAME_STATE_ACTION_TYPE.NEW_GAME:
            return resolveNewGameAction(state, action);
    }
    return state;
}

function resolveGameStartedAction (state: GameState, action: GameStateGameStartedAction): GameState  {
    const gameConfig = action.newConfig;
    const nullArr = Array(gameConfig.boardColumns).fill(0).map(row => Array(gameConfig.boardRows).fill(null));
    const initialBoard = nullArr.map(row => row.map(x => ({playerOcupping: Player.None, isWinningMove: false})));
    return {
        ...state,
        gameConfig,
        board: initialBoard,
        result: Result.GameOn
    };
}

function resolveGameRestartedAction(state: GameState, action: GameStateGameRestartedAction): GameState {
    const board = state.board.map(column => column.map(tile => ({playerOcupping: Player.None, isWinningMove: false})));
    return {
        ...state,
        board,
        result: Result.GameOn
    }
}

function resolveNewGameAction(state: GameState, action: GameStateNewGameAction): GameState {
    return {...initialGameState};
}

function resolveMoveMadeAction (state: GameState, action: GameStateMoveMadeAction): GameState {
    const board = gameBoardSolverService.makeMove(state.board, action.column, state.playerMoving);
    const checkInfo = gameBoardSolverService.checkBoard(board, action.column, state.gameConfig.toWin);
    const result = checkInfo.result;
    if (checkInfo.winningMoves) {
        checkInfo.winningMoves.forEach(winningMove => board[winningMove.x][winningMove.y] = {...board[winningMove.x][winningMove.y],
                                                                                            isWinningMove: true});
    }
    return {
        ...state,
        board,
        playerMoving: state.playerMoving === Player.Player0 ? Player.Player1 : Player.Player0,
        result
    }
}
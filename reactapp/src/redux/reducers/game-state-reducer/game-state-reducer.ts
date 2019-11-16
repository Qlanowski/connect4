import { Reducer } from 'redux';
import { GameStateActions, GAME_STATE_ACTION_TYPE, GameStateGameStartedAction, GameStateMoveMadeAction } from './game-state-actions';
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
    }
    return state;
}

function resolveGameStartedAction (state: GameState, action: GameStateGameStartedAction): GameState  {
    const gameConfig = action.newConfig;
    const nullArr = Array(gameConfig.boardRows).fill(0).map(row => Array(gameConfig.boardColumns).fill(null));
    const initialBoard = nullArr.map(row => row.map(x => ({playerOcupping: Player.None, isWinningMove: false})));
    return {
        ...state,
        gameConfig,
        board: initialBoard,
        result: Result.GameOn
    };
}

function resolveMoveMadeAction (state: GameState, action: GameStateMoveMadeAction): GameState {
    return {
        ...state,
        board: gameBoardSolverService.makeMove(state.board, action.column, state.playerMoving),
        playerMoving: state.playerMoving === Player.Player0 ? Player.Player1 : Player.Player0
    }
}
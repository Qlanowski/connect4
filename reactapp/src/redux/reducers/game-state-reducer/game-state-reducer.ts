import { Reducer } from 'redux';
import { GameStateActions, GAME_STATE_ACTION_TYPE } from './game-state-actions';
import { GameState } from '../../../models/game-state';
import { Player, Result } from '../../../models/imported';
import { GameBoardSolverService } from '../../../services/game-board-solver-service';

const gameBoardSolverService = new GameBoardSolverService();

const initialBoard = Array();
const initialGameState: GameState = { playerMoving: Player.Player0, result: Result.NotStarted };

export const gameStateReducer: Reducer<GameState, GameStateActions> = (state: GameState = initialGameState, action: GameStateActions): GameState => {
    switch (action.type) {
        case GAME_STATE_ACTION_TYPE.GAME_STARTED:
            return {
                ...state,
                board: action.initialBoard,
                result: Result.GameOn
            };
        case GAME_STATE_ACTION_TYPE.MOVE_MADE:
            return {
                ...state,
                board: gameBoardSolverService.makeMove(state.board, action.column, state.playerMoving),
                playerMoving: state.playerMoving === Player.Player0 ? Player.Player1 : Player.Player0
            }
    }
    return state;
}
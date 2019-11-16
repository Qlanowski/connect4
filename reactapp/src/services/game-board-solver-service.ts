import { Tile } from '../models/tile';
import { Player } from '../models/imported';

export class GameBoardSolverService {
    makeMove(board: Tile[][], column: number, playerMoving: Player): Tile[][] {
        const editedTileIndex = board[column].findIndex(tile => tile.playerOcupping === Player.None);
        const newTiles = board[column].slice();
        newTiles[editedTileIndex] = {...newTiles[editedTileIndex], playerOcupping: playerMoving};
        const newBoard = board.map(boardColumn => boardColumn === board[column] ? newTiles : boardColumn);

        return newBoard;
    }
}
import { Tile } from '../models/tile';
import { Player, Result } from '../models/imported';
import { Point } from '../models/point';
import { WinnerCheckInfo } from '../models/winner-check-info';

interface ColumnInfo {
    maxInOrder: number,
    playerInStreak: Player,
    winningMoves: Point[]
}

interface TilePoint {
    tile: Tile,
    point: Point
}

export class GameBoardSolverService {
    makeMove(board: Tile[][], column: number, playerMoving: Player): Tile[][] {
        const editedTileIndex = board[column].findIndex(tile => tile.playerOcupping === Player.None);
        if (editedTileIndex === -1)
            return null;
        const newTiles = board[column].slice();
        newTiles[editedTileIndex] = { ...newTiles[editedTileIndex], playerOcupping: playerMoving };
        const newBoard = board.map(boardColumn => boardColumn === board[column] ? newTiles : boardColumn);
        return newBoard;
    }

    checkBoard(board: Tile[][], changedColumnIndex: number, toWin: number): WinnerCheckInfo {
        const firstNoneIndex = board[changedColumnIndex].findIndex(column => column.playerOcupping === Player.None);
        const changedTileYPos = firstNoneIndex !== -1 ? firstNoneIndex - 1 : board[changedColumnIndex].length - 1;
        const changedTilePosition = {x: changedColumnIndex, y: changedTileYPos};
        
        let columnInfo: ColumnInfo = this.checkBottomTop(board, changedTilePosition, toWin);
        if (columnInfo.maxInOrder >= toWin) {
            return this.columnInfoToWinnerCheckInfo(columnInfo);
        }
        columnInfo = this.checkLeftRight(board, changedTilePosition, toWin);
        if (columnInfo.maxInOrder >= toWin) {
            return this.columnInfoToWinnerCheckInfo(columnInfo);
        }
        columnInfo = this.checkBottomTop(board, changedTilePosition, toWin);
        if (columnInfo.maxInOrder >= toWin) {
            return this.columnInfoToWinnerCheckInfo(columnInfo);
        }
        columnInfo = this.checkBottomLeftTopRight(board, changedTilePosition, toWin);
        if (columnInfo.maxInOrder >= toWin) {
            return this.columnInfoToWinnerCheckInfo(columnInfo);
        }
        columnInfo = this.checkBottomRightTopLeft(board, changedTilePosition, toWin);
        if (columnInfo.maxInOrder >= toWin) {
            return this.columnInfoToWinnerCheckInfo(columnInfo);
        }
        if (changedTileYPos === board[changedColumnIndex].length - 1 && this.checkDraw(board)) {
            return {
                result: Result.Draw
            }
        }

        return {
            result: Result.GameOn
        }
    }
    
    private checkDraw(board: Tile[][]): boolean {
        const topRow = board.map(column => column[column.length - 1]);
        const emptyTiles = topRow.reduce<number>((prev, curr) => curr.playerOcupping === Player.None ? prev + 1 : prev, 0);
        return emptyTiles === 0;
    }

    private columnInfoToWinnerCheckInfo(columnInfo: ColumnInfo): WinnerCheckInfo {
        return {
            result: columnInfo.playerInStreak === Player.Player0 ? Result.WonPlayer0 : Result.WonPlayer1,
            winningMoves: columnInfo.winningMoves
        }
    }

    private checkBottomTop(board: Tile[][], changedTilePosition: Point, toWin: number): ColumnInfo {
        const sliceIndex = changedTilePosition.y + 1;
        const columnToCheck = sliceIndex < board[changedTilePosition.x].length ? 
                                    board[changedTilePosition.x].slice(0, sliceIndex) : board[changedTilePosition.x].slice();
        const tilePointColumnToCheck = columnToCheck.map((tile, index) => ({tile, point: {x: changedTilePosition.x, y: index}}))
        return this.checkBoardColumn(tilePointColumnToCheck, toWin);
    }

    private checkLeftRight(board: Tile[][], changedTilePosition: Point, toWin: number): ColumnInfo {
        const columnToCheck = board
                                .map(column => column[changedTilePosition.y])
                                .map((tile, index) => ({tile, point: {x: index, y: changedTilePosition.y}}));
        return this.checkBoardColumn(columnToCheck, toWin);
    }

    private checkBottomLeftTopRight(board: Tile[][], changedTilePosition: Point, toWin: number): ColumnInfo {
        const startX = changedTilePosition.x - changedTilePosition.y > 0 ? 
                        changedTilePosition.x - changedTilePosition.y : 0;
        const startY = startX > 0 ? 0 : changedTilePosition.y - changedTilePosition.x;
        const columnToCheck = board
            .reduce<Tile[]>((prev, curr, index) => {
                return board[startX + index] !== undefined && board[startX + index][startY + index] !== undefined ?
                    prev.concat(board[startX + index][startY + index]) : prev;
            }, [])
            .map((tile, index) => ({tile, point: {x: startX + index, y: startY + index}}));
        return this.checkBoardColumn(columnToCheck, toWin);
    }

    private checkBottomRightTopLeft(board: Tile[][], changedTilePosition: Point, toWin: number): ColumnInfo {
        const columnsCount = board.length;
        const reversedXPos = columnsCount - changedTilePosition.x - 1;
        const xYDiff = reversedXPos - changedTilePosition.y;
        const startX = xYDiff > 0 ? 
                        columnsCount - xYDiff - 1 : columnsCount - 1;
        const startY = startX !== columnsCount - 1 ? 0 : changedTilePosition.y - reversedXPos;
        const columnToCheck = board
            .reduce<Tile[]>((prev, curr, index) => {
                return board[startX - index] && board[startX - index][startY + index] ?
                    prev.concat(board[startX - index][startY + index]) : prev;
            }, [])
            .map((tile, index) => ({tile, point: {x: startX - index, y: startY + index}}));
        return this.checkBoardColumn(columnToCheck, toWin);
    }

    private checkBoardColumn(column: TilePoint[], toWin: number): ColumnInfo {
        const initialInfo: ColumnInfo = {
            maxInOrder: 0,
            winningMoves: [],
            playerInStreak: Player.None
        };
        if (column.length < toWin) {
            return {...initialInfo};
        }

        const columnInfos: ColumnInfo[] = column.reduce<ColumnInfo[]>((info, tilePoint) => {
            if (info.length > 0 && 
                tilePoint.tile.playerOcupping === info[info.length - 1].playerInStreak &&
                tilePoint.tile.playerOcupping !== Player.None
                ) {
                    const lastInfo = info[info.length - 1];
                    info[info.length - 1] = {
                        maxInOrder: lastInfo.maxInOrder + 1,
                        playerInStreak: lastInfo.playerInStreak,
                        winningMoves: lastInfo.winningMoves.concat({ ...tilePoint.point })
                    }
                    return info;
                } else {
                    return info.concat({
                        maxInOrder: 1,
                        playerInStreak: tilePoint.tile.playerOcupping,
                        winningMoves: [{...tilePoint.point}]
                    })
                }

        }, []);
        return columnInfos.reduce<ColumnInfo>((maxInfo, currentInfo) => {
            return currentInfo.maxInOrder > maxInfo.maxInOrder ? currentInfo : maxInfo;
        }, {...initialInfo});
    }



}
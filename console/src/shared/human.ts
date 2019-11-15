import { Bot } from "./bot";
import { readNumber } from "../app";
import { Board } from "./board";

export class HumanBot implements Bot {
    private board: Board;

    constructor(board: Board) { this.board = board; }
    public playerMove(move: number): void {
    }
    public makeMove(): number {
        return readNumber("Select column:", this.board.allowedMoves());
    }
}
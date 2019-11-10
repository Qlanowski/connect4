#!/usr/bin/env node
import { Bot } from "./shared/bot";
import { McstBot } from "./mcst/mcst";
import { Game } from "./shared/game";
import * as ReadLine from "readline-sync"
import minimist from "minimist";

type ArgumentsShape = {
    columns: string;
    rows: string;
    forWin: string;
    botId: string;
    turn: string;
    timeout: string;
};
const args = minimist<ArgumentsShape>(process.argv.slice(2), {
    boolean: ["help"],
    string: ["columns", "rows", "forWin", "botId", "turn", "timeout"]
});

function printHelp(): void {
    console.log("Connect4 console game usage: ");
    console.log("");
    console.log("--help        print help");
    console.log("--columns    columns on board");
    console.log("--rows       rows on board");
    console.log("--forWin     count of checkers in row for win");
    console.log("--botId      selecting bot to play with");
    console.log("--turn       who starts 0-human 1-bot");
    console.log("--timeout    time for bot to think in milliseconds");
    console.log("");
}

function readNumber(text: string, allowedvalues: number[]): number {
    while (true) {
        try {
            let strNum = ReadLine.question(text);
            let num = +strNum;
            if (allowedvalues.length === 0 || allowedvalues.includes(num)) {
                console.log(num);
                return num;
            }
        } catch {
            console.log("error. try again\n");
        }
    }
}

function run(columns: number, rows: number, inRowForWin: number, botId: number, turn: number, timeout: number) {
    let bot: Bot;

    switch (botId) {
        case 0:
            bot = new McstBot(columns, rows, inRowForWin, timeout);
            break;
        default:
            bot = new McstBot(columns, rows, inRowForWin, timeout);
            break;
    }
    let game: Game = new Game(columns, rows, inRowForWin);

    while (game.gameOn()) {
        if (turn === 0) {
            let move = readNumber("Select column:", game.allowedMoves());
            bot.playerMove(move);
            game.move(move, turn);
            turn = 1;
            game.printBoard();
        }
        else {
            let move = bot.makeMove();
            game.move(move, turn);
            turn = 0;
            game.printBoard();
        }

    }
    game.printWhoWon();
}
function readArgs() {
    if (args.columns && args.rows && args.forWin && args.botId && args.turn && args.timeout) {
        let columns: number = +args.columns;
        let rows: number = +args.rows;
        let inRowForWin: number = +args.forWin;
        let botId: number = +args.botId;
        let turn: number = +args.turn;
        let timeout: number = +args.timeout;
        run(columns, rows, inRowForWin, botId, turn, timeout);
    } else {
        let columns = 5;
        let rows = 4;
        let inRowForWin = 3;
        let botId = 0;
        let turn = 1;
        let timeout = 1000;
        run(columns, rows, inRowForWin, botId, turn, timeout);
        // printHelp();
    }
}

readArgs();
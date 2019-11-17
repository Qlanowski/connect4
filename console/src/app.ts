#!/usr/bin/env node
import { Bot } from "./shared/bot";
import { McstBot } from "./mcst/mcst";
import { PnsBot } from "./pns/pns";
import { Game } from "./shared/game";
import * as ReadLine from "readline-sync"
import minimist from "minimist";
import { HumanBot } from "./shared/human";
import { MinMaxBot } from "./minmax/minMaxBot";

type ArgumentsShape = {
    columns: string;
    rows: string;
    forWin: string;
    bot0Id: string;
    bot1Id: string;
    turn: string;
    timeout: string;
};
const args = minimist<ArgumentsShape>(process.argv.slice(2), {
    boolean: ["help"],
    string: ["columns", "rows", "forWin", "bot0Id", "bot1Id", "turn", "timeout"]
});

function printHelp(): void {
    console.log("Connect4 console game usage: ");
    console.log("");
    console.log("--help        print help");
    console.log("--columns    columns on board");
    console.log("--rows       rows on board");
    console.log("--forWin     count of checkers in row for win");
    console.log("--bot0Id      selecting bot0 to play with");
    console.log("--bot1Id      selecting bot1 to play with");
    console.log("--turn       who starts 0-bot0 1-bot1");
    console.log("--timeout    time for bot to think in milliseconds");
    console.log("");
}

export function readNumber(text: string, allowedvalues: number[]): number {
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
function pickBot(id: number, game: Game, columns: number, rows: number, inRowForWin: number, timeout: number): Bot {
    let bot: Bot;
    switch (id) {
        case 0:
            bot = new McstBot(columns, rows, inRowForWin, timeout);
            break;
        case 1:
            bot = new PnsBot(columns, rows, inRowForWin, timeout);
            break;
        case 2:
            bot = new MinMaxBot(columns, rows, inRowForWin, timeout);
            break;
        case 3:
            bot = new HumanBot(game.board);
            break;
        default:
            bot = new HumanBot(game.board);
            break;
    }
    return bot;
}

function run(columns: number, rows: number, inRowForWin: number, bot0Id: number, bot1Id: number, turn: number, timeout: number) {
    let game: Game = new Game(columns, rows, inRowForWin);
    let bot0: Bot = pickBot(bot0Id, game, columns, rows, inRowForWin, timeout);
    let bot1: Bot = pickBot(bot1Id, game, columns, rows, inRowForWin, timeout);

    while (game.gameOn()) {
        if (turn === 0) {
            let move = bot0.makeMove();
            bot1.playerMove(move);
            game.move(move, turn);
            turn = 1;
            game.printBoard();
        }
        else {
            let move = bot1.makeMove();
            bot0.playerMove(move);
            game.move(move, turn);
            turn = 0;
            game.printBoard();
        }

    }
    game.printWhoWon();
}
function readArgs() {
    if (args.columns && args.rows && args.forWin && args.bot0Id && args.bot1Id && args.turn && args.timeout) {
        let columns: number = +args.columns;
        let rows: number = +args.rows;
        let inRowForWin: number = +args.forWin;
        let bot0Id: number = +args.bot0Id;
        let bot1Id: number = +args.bot1Id;
        let turn: number = +args.turn;
        let timeout: number = +args.timeout;
        run(columns, rows, inRowForWin, bot0Id, bot1Id, turn, timeout);
    } else {
        printHelp();
    }
}

readArgs();
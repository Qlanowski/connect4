import { Bot } from "./shared/bot";
import { McstBot } from "./mcst/mcst";
import { Game } from "./shared/game";
import * as ReadLine from "readline-sync"

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

function run() {
    // let botId: number = readNumber("BotId 0,1,2: ", [0, 1, 2]);
    // let turn: number = readNumber("Who starts 0-human, 1-bot: ", [0, 1]);
    // let columns: number = readNumber("How many columns: ", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    // let rows: number = readNumber("How many rows: ", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    // let inRowForWin: number = readNumber("How many in row to win: ", [2, 3, 4, 5, 6]);
    // let timeout: number = readNumber("Time in ms for bot to think: ", []);
    let botId: number = 0;
    let turn: number = 0;
    let columns: number = 5;
    let rows: number = 5;
    let inRowForWin: number = 3;
    let timeout: number = 1000;

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
        game.printBoard();
        if (turn === 0) {
            let move = readNumber("Select column:", game.allowedMoves());
            bot.playerMove(move);
            game.move(move, turn);
            turn = 1;
            game.printBoard();
        }
        else {
            let move = -1;
            setTimeout(() => {
                if (move === -1) {
                    console.log("Bot lost on time.\n");
                    return;
                }
            }, timeout);

            move = bot.makeMove();
            game.move(move, turn);
            turn = 0;
        }

    }
    game.printBoard();
    game.printWhoWon();
}
run();
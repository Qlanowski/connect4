#!/usr/bin/env node
import { Bot } from "./shared/bot";
import { Game } from "./shared/game";
import { pickBot } from "./app";
import { Result } from "./shared/result";
import { createObjectCsvWriter } from "csv-writer";

interface Match {
    columns: number;
    rows: number;
    forWin: number;
    bot0Id: number;
    bot1Id: number;
    timeout: number;
    bot0win: number;
    bot1win: number;
    draw: number;
}
interface BoardSize {
    rows: number;
    columns: number;
    forWin: number;
}

export interface BotPair {
    bot0Id: number;
    bot1Id: number;
}

function saveMatchesToFile(matches: Match[], filename: string) {
    const csvWriter = createObjectCsvWriter({
        path: filename,
        header: [
            { id: 'bot0Id', title: 'bot0Id' },
            { id: 'bot1Id', title: 'bot1Id' },
            { id: 'columns', title: 'columns' },
            { id: 'rows', title: 'rows' },
            { id: 'forWin', title: 'forWin' },
            { id: 'timeout', title: 'timeout' },
            { id: 'bot0win', title: 'bot0win' },
            { id: 'bot1win', title: 'bot1win' },
            { id: 'draw', title: 'draw' },
        ]
    });

    csvWriter.writeRecords(matches)
        .then(() => {
            console.log('...Done');
        });
}

function playMatch(match: Match, turn: number) {
    let game: Game = new Game(match.columns, match.rows, match.forWin);
    let bot0: Bot = pickBot(match.bot0Id, game, match.columns, match.rows, match.forWin, match.timeout);
    let bot1: Bot = pickBot(match.bot1Id, game, match.columns, match.rows, match.forWin, match.timeout);
    while (game.gameOn()) {
        if (turn === 0) {
            let move = bot0.makeMove();
            bot1.playerMove(move);
            game.move(move, turn);
            turn = 1;
        }
        else {
            let move = bot1.makeMove();
            bot0.playerMove(move);
            game.move(move, turn);
            turn = 0;
        }
    }


    switch (game.result()) {
        case Result.WonPlayer0:
            match.bot0win++;
            console.log("Bot 0 won");
            break;
        case Result.WonPlayer1:
            match.bot1win++;
            console.log("Bot 1 won");
            break;
        case Result.Draw:
            match.draw++;
            console.log("Draw");
            break;
    }
}

function run() {
    const boardsPath: string = "boards.csv";
    const timeoutsPath: string = "timeouts.csv";
    const gamesForSettings: number = 2;
    const timeouts = [10, 11, 12];
    const avgTimeout: number = 10;
    const avgBoard: BoardSize = {
        rows: 6,
        columns: 7,
        forWin: 4
    }
    const boards: BoardSize[] = [
        {
            rows: 6,
            columns: 7,
            forWin: 4
        },
        {
            rows: 10,
            columns: 12,
            forWin: 5
        },
        {
            rows: 20,
            columns: 20,
            forWin: 5
        },
    ];
    const botPairs: BotPair[] = [
        {
            bot0Id: 0,
            bot1Id: 1
        },
        {
            bot0Id: 0,
            bot1Id: 2
        },
        {
            bot0Id: 1,
            bot1Id: 2
        }
    ]
    let boardMatches: Match[] = [];
    let matchesCount = boards.length * botPairs.length * gamesForSettings + timeouts.length * botPairs.length * gamesForSettings;
    let counter = 0;

    console.log("##### BOARDS ########");
    for (let pair of botPairs) {
        for (let boardsize of boards) {
            let match: Match = {
                columns: boardsize.columns,
                rows: boardsize.rows,
                forWin: boardsize.forWin,
                bot0Id: pair.bot0Id,
                bot1Id: pair.bot1Id,
                timeout: avgTimeout,
                bot0win: 0,
                bot1win: 0,
                draw: 0,
            }
            boardMatches.push(match);
            for (let i = 0; i < gamesForSettings; i++) {
                counter++;
                console.log(`${counter}/${matchesCount} - Match started: `);
                console.log(match);
                playMatch(match, i % 2);
            }
        }
    }
    saveMatchesToFile(boardMatches, boardsPath);


    console.log("##### TIMEOUT ########");
    let timeoutMatches: Match[] = [];
    let boardsize = avgBoard;
    for (let pair of botPairs) {
        for (let timeout of timeouts) {
            let match: Match = {
                columns: boardsize.columns,
                rows: boardsize.rows,
                forWin: boardsize.forWin,
                bot0Id: pair.bot0Id,
                bot1Id: pair.bot1Id,
                timeout: timeout,
                bot0win: 0,
                bot1win: 0,
                draw: 0,
            }
            timeoutMatches.push(match);
            for (let i = 0; i < gamesForSettings; i++) {
                counter++;
                console.log(`${counter}/${matchesCount} - Match started: `);
                console.log(match);
                playMatch(match, i % 2);
            }
        }
    }
    saveMatchesToFile(timeoutMatches, timeoutsPath);
}
run();
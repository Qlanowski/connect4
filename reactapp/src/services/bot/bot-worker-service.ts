import { GameConfig } from "../../models/game-config";
import { BotWorkerMessageType } from './worker/bot-worker-message-type';
import BotWorker from './worker/bot.worker';
import { Player } from "../../models/imported";


const botWorker = new BotWorker();

export class BotWorkerService {
    initializeBots(config: GameConfig) {
        botWorker.postMessage({type: BotWorkerMessageType.Init, data: config});
    }

    moveMade(player: Player, column: number) {
        botWorker.postMessage({type: BotWorkerMessageType.MoveMade, data: {player, column}});
    }

    makeMove(player: Player) {
        botWorker.postMessage({type: BotWorkerMessageType.MakeMove, data: player});
    }

    subscribeToBotMove(callback) {
        botWorker.addEventListener('message', (event) => {
            callback(event.data);
        });
    }
}
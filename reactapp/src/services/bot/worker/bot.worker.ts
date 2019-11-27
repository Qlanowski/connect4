import { BotWorkerMessageType } from './bot-worker-message-type';
import { BotController } from '../bot-controller';
import { GameConfig } from '../../../models/game-config';
import { Player } from '../../../models/imported';

const ctx: Worker = self as any;
const botController = new BotController();

// Respond to message from parent thread
ctx.addEventListener("message", (message) => {
    switch (message.data.type) {
        case BotWorkerMessageType.Init:
            const config = message.data.data as GameConfig;
            botController.initializeBots(config);
            break;
        case BotWorkerMessageType.MakeMove:
            const column = botController.makeMove(message.data.data as Player);
            ctx.postMessage(column);
            break;
        case BotWorkerMessageType.MoveMade:
            const player = message.data.data.player as Player;
            const c = message.data.data.column;
            botController.handleMove(player, c);
            break;
    }
});

export default {} as typeof Worker & (new () => Worker);
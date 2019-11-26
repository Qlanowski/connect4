import { Bot } from '../../../console/src/shared/bot';
import { BotFactory } from './bot-factory';
import { GameConfig } from '../models/game-config';

const botFactory = new BotFactory();

export function BotInstanceProvider() {
    let player1Bot: Bot = null;
    let player2Bot: Bot = null;

    this.initializeBots = function(gameConfig: GameConfig): void {
        player1Bot = botFactory.getBot(gameConfig.playerOne, gameConfig);
        player2Bot = botFactory.getBot(gameConfig.playerTwo, gameConfig);
1    }

    this.getPlayer1Bot = function(): Bot {
        return player1Bot;
    }

    this.getPlayer2Bot = function(): Bot {
        return player2Bot;
    }
}
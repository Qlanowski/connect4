import { Bot } from '../../../../console/src/shared/bot';
import { BotFactory } from './bot-factory';
import { GameConfig } from '../../models/game-config';
import { Player } from '../../models/imported';

const botFactory = new BotFactory();

export function BotController() {
    let player1Bot: Bot = null;
    let player2Bot: Bot = null;

    this.initializeBots = function(gameConfig: GameConfig): void {
        player1Bot = botFactory.getBot(gameConfig.playerOne, gameConfig);
        player2Bot = botFactory.getBot(gameConfig.playerTwo, gameConfig);
1    }

    this.makeMove = function(player: Player): number {
        const playerBotMoving = player === Player.Player0 ? player1Bot : player2Bot;
        if (playerBotMoving === null)
            return null;
        const column = playerBotMoving.makeMove();
        this.handleMove(player, column);
        return column;
    }

    this.handleMove = function(player: Player, column: number) {
        const playerBotToInform = player === Player.Player0 ? player2Bot : player1Bot;
        if (playerBotToInform !== null)
            playerBotToInform.playerMove(column);
    }

}
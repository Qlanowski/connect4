import { PlayerType } from '../../models/player-type';
import { Bot } from '../../../../console/src/shared/bot';
import { PnsBot } from '../../../../console/src/pns/pns';
import { McstBot } from '../../../../console/src/mcst/mcst';
import { MinMaxBot } from '../../../../console/src/minmax/minMaxBot';
import { ConstMatrixEvaluation } from '../../../../console/src/minmax/evaluation/constMatrixEvaluation';
import { GameConfig } from '../../models/game-config';

export class BotFactory {
    getBot(playerType: PlayerType, gameConfig: GameConfig): Bot {
        switch (playerType) {
            case PlayerType.Mcst:
                return new McstBot(gameConfig.boardColumns, gameConfig.boardRows, gameConfig.toWin, gameConfig.milisecondsForAlgorithm);
            case PlayerType.Pns:
                return new PnsBot(gameConfig.boardColumns, gameConfig.boardRows, gameConfig.toWin, gameConfig.milisecondsForAlgorithm);
            case PlayerType.MinMax:
                const ev = new ConstMatrixEvaluation();
                return new MinMaxBot(gameConfig.boardColumns, gameConfig.boardRows, gameConfig.toWin, gameConfig.milisecondsForAlgorithm, ev);
        }
        return null;
    }
}
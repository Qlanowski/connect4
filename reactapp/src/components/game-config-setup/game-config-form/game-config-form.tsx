import * as React from 'react';
import { GameConfig } from '../../../models/game-config';
import { PlayerType } from '../../../models/player-type';
import { GameConfigPlayerSelect } from './game-config-player-select/game-config-player.select';

interface GameConfigFormProps {
    handleSubmit: (config: GameConfig) => void;
}

export const GameConfigForm: React.FC<GameConfigFormProps> = ({ handleSubmit }) => {
    const initialConfig: GameConfig = {
        playerOne: PlayerType.Human, 
        playerTwo: PlayerType.Human
    }
    const [formConfig, setFormConfig] = React.useState<GameConfig>(initialConfig);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>, newConfig: GameConfig) => {
        event.preventDefault();
        handleSubmit(newConfig);
    }

    const handleNumberChange = (event: React.FormEvent<HTMLInputElement>, key: keyof GameConfig): void => {
        const numberFromInput = event.currentTarget.valueAsNumber;
        const newNumber = isNaN(numberFromInput) ? 0 : numberFromInput;
        setFormConfig({ ...formConfig, [key]: newNumber });
    }

    const handlePlayerTypeChange = (playerType: PlayerType, key: keyof GameConfig): void => {
        setFormConfig({...formConfig, [key]: playerType});
    }

    return (
        <form onSubmit={(event) => onSubmit(event, formConfig)}>
        <label>
          Board rows:
          <input min="0" type="number" onChange={(event) => handleNumberChange(event, "boardRows")} />
        </label>
        <label>
            Board columns:
          <input min="0" type="number" onChange={(event) => handleNumberChange(event, "boardColumns")} />
        </label>
        <label>
            Ms for algorithm:
          <input min="0" type="number" 
          onChange={(event) => handleNumberChange(event, "milisecondsForAlgorithm")} />
        </label>
        <label>
            To win:
          <input min="0" type="number" 
          onChange={(event) => handleNumberChange(event, "toWin")} />
        </label>
        <label>Player one:
            <GameConfigPlayerSelect 
            handleChange={(playerType) => handlePlayerTypeChange(playerType, "playerOne")}>
            </GameConfigPlayerSelect>
        </label>
        <label>Player two:
            <GameConfigPlayerSelect 
            handleChange={(playerType) => handlePlayerTypeChange(playerType, "playerTwo")}>
            </GameConfigPlayerSelect>
        </label>
        <input type="submit" value="Rozpocznij grę!"></input>
        </form>
    )
}
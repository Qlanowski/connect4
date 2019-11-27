import * as React from 'react';
import { GameConfig } from '../../../models/game-config';
import { PlayerType } from '../../../models/player-type';
import { GameConfigPlayerSelect } from './game-config-player-select/game-config-player.select';
import { TextInput, PlayerChoiceContainer, PlayerChoiceColumn, SubmitInput, FormContainer } from './game-config-form-styles';

interface GameConfigFormProps {
    handleSubmit: (config: GameConfig) => void;
}

export const GameConfigForm: React.FC<GameConfigFormProps> = ({ handleSubmit }) => {
    const initialConfig: GameConfig = {
        playerOne: PlayerType.Human,
        playerTwo: PlayerType.Human,
        boardColumns: 5,
        boardRows: 5,
        milisecondsForAlgorithm: 1000,
        toWin: 4
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
        setFormConfig({ ...formConfig, [key]: playerType });
    }

    return (
        <FormContainer>
            <form onSubmit={(event) => onSubmit(event, formConfig)}>
                <label>
                    Board rows:
          <TextInput min="0" onChange={(event) => handleNumberChange(event, "boardRows")} />
                </label>
                <label>
                    Board columns:
          <TextInput min="0" onChange={(event) => handleNumberChange(event, "boardColumns")} />
                </label>
                <label>
                    Ms for algorithm:
          <TextInput min="0"
                        onChange={(event) => handleNumberChange(event, "milisecondsForAlgorithm")} />
                </label>
                <label>
                    To win:
          <TextInput min="0"
                        onChange={(event) => handleNumberChange(event, "toWin")} />
                </label>
                <PlayerChoiceContainer>
                    <PlayerChoiceColumn>
                        <label>Player one:
                <GameConfigPlayerSelect initialValue={initialConfig.playerOne}
                                handleChange={(playerType) => handlePlayerTypeChange(playerType, "playerOne")}>
                            </GameConfigPlayerSelect>
                        </label>
                    </PlayerChoiceColumn>

                    <PlayerChoiceColumn>
                        <label>Player two:
                <GameConfigPlayerSelect initialValue={initialConfig.playerTwo}
                                handleChange={(playerType) => handlePlayerTypeChange(playerType, "playerTwo")}>
                            </GameConfigPlayerSelect>
                        </label>
                    </PlayerChoiceColumn>
                </PlayerChoiceContainer>
                <SubmitInput value="Start game!"></SubmitInput>
            </form>
        </FormContainer>
    )
}
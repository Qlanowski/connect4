import * as React from 'react'
import { PlayerType } from '../../../../models/player-type';
import { SelectInput } from '../game-config-form-styles';

interface GameConfigPlayerSelectProps {
    handleChange: (playerType: PlayerType) => void;
    initialValue: PlayerType;
};

export const GameConfigPlayerSelect: React.FC<GameConfigPlayerSelectProps> = ({handleChange, initialValue}) => {
    const [playerType, setPlayerType] = React.useState<PlayerType>(initialValue);
    const changePlayerType = (event: React.FormEvent<HTMLSelectElement>): void => {
        const val = event.currentTarget.value as PlayerType;
        setPlayerType(val);
        handleChange(val);
    }

    return (
        <SelectInput value={playerType} onChange={(event) => changePlayerType(event)}>
        {Object.keys(PlayerType).map(key => (
            <option key={key} value={key}>
                {PlayerType[key]}
            </option>
        ))}
    </SelectInput>
    );
}
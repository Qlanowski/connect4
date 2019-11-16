import * as React from 'react'
import { PlayerType } from '../../../../models/player-type';

interface GameConfigPlayerSelectProps {
    handleChange: (playerType: PlayerType) => void;
};

export const GameConfigPlayerSelect: React.FC<GameConfigPlayerSelectProps> = ({handleChange}) => {
    const [playerType, setPlayerType] = React.useState<PlayerType>(PlayerType.Human);
    const changePlayerType = (event: React.FormEvent<HTMLSelectElement>): void => {
        const val = event.currentTarget.value;
        setPlayerType(PlayerType[val]);
        handleChange(PlayerType[val]);
    }

    return (
        <select value={playerType} onChange={(event) => changePlayerType(event)}>
        {Object.keys(PlayerType).map(key => (
            <option key={key} value={key}>
                {PlayerType[key]}
            </option>
        ))}
    </select>
    );
}
import * as React from 'react';
import { GameConfigForm } from './game-config-form/game-config-form';
import { GameConfig } from '../../models/game-config';

export const GameConfigSetup: React.FC = () => {
    const handleSubmit = (newConfig: GameConfig) => {console.log(newConfig)};
    
    return (
        <GameConfigForm handleSubmit={handleSubmit}></GameConfigForm>
    )
}
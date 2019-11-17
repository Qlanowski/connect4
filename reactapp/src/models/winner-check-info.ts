import { Result } from './imported';
import { Point } from './point';

export interface WinnerCheckInfo {
    result: Result,
    winningMoves?: Point[]
}
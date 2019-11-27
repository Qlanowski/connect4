import { Player } from "../../shared/player";

export class MovesHistoryNode {
    private _player: Player;
    private _x: number;

    public get player() {
        return this._player;
    }

    public get x() {
        return this._x;
    }

    constructor(player: Player, x: number) {
        this._player = player;
        this._x = x;
    }
}
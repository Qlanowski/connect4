export interface Bot {
    playerMove(col: number): void;
    makeMove(): number;
}
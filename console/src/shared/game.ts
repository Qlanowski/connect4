enum Result {
    GameOn,
    WonPlayer0,
    WonPlayer1,
    Draw,
}
export class Game {
    private result: Result;
    private columns: number;
    private rows: number;
    private inRow: number;
    private board: number[][]; //-1 empty 0-player0 1-player1
    private columnCount: number[];

    constructor(columns: number, rows: number, inRow: number) {
        this.columns = columns;
        this.rows = rows;
        this.inRow = inRow;
        this.board = new Array(rows).fill(0).map(() => Array(columns).fill(-1));
        this.result = Result.GameOn;
        this.columnCount = new Array(columns).fill(0);
    }

    public gameOn(): boolean {
        return this.result == Result.GameOn;
    }

    public allowedMoves(): number[] {
        let moves = [];
        this.columnCount.forEach((value, inx) => {
            if (value < this.rows) {
                moves.push(inx);
            }
        });
        return moves;
    }

    public move(col: number, player: number): void {
        let height = this.columnCount[col];
        this.columnCount[col]++;
        this.board[col][height] = player;
        this.checkResult(col, height);
    }

    public printWhoWon(): void {
        switch (this.result) {
            case Result.Draw:
                console.log("Draw");
                break;
            case Result.WonPlayer0:
                console.log("Human Won");
                break;
            case Result.WonPlayer1:
                console.log("Bot won");
                break;
            default:
                console.log("Game is on, why are you asking who win?!");
                break;
        }
    }
    public printBoard(): void {
        console.log("Current Position:");
        for (let y = this.rows - 1; y >= 0; y--) {
            for (let x = 0; x < this.columns; x++) {
                switch (this.board[x][y]) {
                    case -1:
                        process.stdout.write("-");
                        break;
                    case 0:
                        process.stdout.write("O");
                        break;
                    case 1:
                        process.stdout.write("X");
                        break;
                }
            }
            process.stdout.write("\n");
        }
        for (let x = 0; x < this.columns; x++) {
            process.stdout.write(x.toString());
        }
        console.log("\n");
    }

    private checkResult(x: number, y: number): void {
        let player = this.board[x][y];
        if (this.playerWon(x, y, player)) {
            if (player === 0) {
                this.result = Result.WonPlayer0;
            }
            else if (player === 1) {
                this.result = Result.WonPlayer1;
            }
        }
        else if (this.allowedMoves().length === 0) {
            this.result = Result.Draw;
        }
    }
    private playerWon(x: number, y: number, id: number): boolean {
        //go right up
        let points = 1;
        let i = x + 1;
        let j = y + 1;
        while (points < this.inRow && i < this.columns && j < this.rows) {
            if (this.board[i][j] == id) {
                i++;
                j++
                points++;
            }
            else {
                break;
            }
        }
        if (points === this.inRow) return true;

        //go right
        points = 1;
        i = x + 1;
        j = y;
        while (points < this.inRow && i < this.columns) {
            if (this.board[i][j] == id) {
                i++;
                points++;
            }
            else {
                break;
            }
        }
        if (points === this.inRow) return true;

        //go right down
        points = 1;
        i = x + 1;
        j = y - 1;
        while (points < this.inRow && i < this.columns && j >= 0) {
            if (this.board[i][j] == id) {
                i++;
                j--;
                points++;
            }
            else {
                break;
            }
        }
        if (points === this.inRow) return true;

        //go down
        points = 1;
        i = x;
        j = y - 1;
        while (points < this.inRow && j >= 0) {
            if (this.board[i][j] == id) {
                j--;
                points++;
            }
            else {
                break;
            }
        }
        if (points === this.inRow) return true;

        //go left down
        points = 1;
        i = x - 1;
        j = y - 1;
        while (points < this.inRow && i >= 0 && j >= 0) {
            if (this.board[i][j] == id) {
                i--;
                j--;
                points++;
            }
            else {
                break;
            }
        }
        if (points === this.inRow) return true;

        //go left 
        points = 1;
        i = x - 1;
        j = y;
        while (points < this.inRow && i >= 0) {
            if (this.board[i][j] == id) {
                i--;
                points++;
            }
            else {
                break;
            }
        }
        if (points === this.inRow) return true;

        //go left up 
        points = 1;
        i = x - 1;
        j = y + 1;
        while (points < this.inRow && i >= 0 && y < this.rows) {
            if (this.board[i][j] == id) {
                i--;
                j++;
                points++;
            }
            else {
                break;
            }
        }
        if (points === this.inRow) return true;

        return false;
    }

}
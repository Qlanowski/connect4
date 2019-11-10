import { Bot } from "../shared/bot";
import { Player } from "../shared/player";
import { Board } from "../shared/board";
import { Result } from "../shared/result";

export class McstBot implements Bot {
    //Bot is Player 0
    private currentBoard: Board;
    private node: Node;
    private timeout: number;

    constructor(columns: number, rows: number, inRow: number, timeout: number) {
        this.timeout = timeout;
        let board: Player[][] = new Array(columns).fill(0).map(() => Array(rows).fill(Player.None));
        let heights: number[] = new Array(columns).fill(0);
        this.currentBoard = new Board(columns, rows, inRow, board, heights);
        this.node = new Node(-1, null, this.currentBoard.allowedMoves(), Player.Player1);
    }
    public playerMove(move: number): void {
        this.currentBoard.move(move, Player.Player1);
        let newNode = this.node.childNodes.find(n => n.move === move);
        if (newNode) {
            this.node = newNode;
        }
        else {
            this.node = new Node(move, null, this.currentBoard.allowedMoves(), Player.Player1);
        }
    }
    public makeMove(): number {
        return this.mcts();
    }

    private mcts(): number {
        let start = new Date().getTime();
        while (new Date().getTime() - start < this.timeout) {
            let node = this.node;
            let board: Board = this.currentBoard.clone();

            //selection
            while (node.untriedMoves.length === 0 && node.childNodes.length > 0) {//jeśli aktualny node ma wszystkie ruchy odwiedzone przynajmniej raz
                node = node.selection();
                board.move(node.move, node.player);
            }
            //expand
            if (node.untriedMoves.length > 0) {//jeśli istnieja ruchy nie sprawdzone wychodzace z tego noda
                let move = selectRandom(node.untriedMoves);
                node.untriedMoves = node.untriedMoves.filter(m => m !== move);
                let movePlayer = node.player === Player.Player0 ? Player.Player1 : Player.Player0;
                board.move(move, movePlayer);
                let currNode = node;
                node = new Node(move, currNode, board.allowedMoves(), movePlayer);
                currNode.childNodes.push(node);
            }
            //rollout
            let result: Result = board.getResult();
            let nextPlayer = node.player === Player.Player0 ? Player.Player1 : Player.Player0;
            while (result === Result.GameOn) {
                board.move(selectRandom(board.allowedMoves()), nextPlayer);
                nextPlayer = nextPlayer === Player.Player0 ? Player.Player1 : Player.Player0;
                result = board.getResult();
            }
            let points: number;
            switch (result) {
                case Result.WonPlayer0:
                    points = 1;
                    break;
                case Result.Draw:
                    points = 0;
                    break;
                case Result.WonPlayer1:
                    points = -1;
                    break;
            }
            //backpropagate
            while (node.parent !== null) {
                node.update(points);
                node = node.parent;
            }
        }

        let foo = (x: Node) => x.wins / x.visits;
        let bestNode = this.node.childNodes.reduce((prev, current) => (foo(prev) > foo(current)) ? prev : current);
        console.log(bestNode.wins, bestNode.visits);
        this.node = bestNode;
        return bestNode.move;
    }
}

export class Node {
    move: number;
    parent: Node;
    untriedMoves: number[];
    childNodes: Node[];
    wins: number;
    visits: number;
    player: Player;

    constructor(move: number, parent: Node, untriedMoves: number[], player: Player) {
        this.parent = parent;
        this.untriedMoves = untriedMoves;
        this.childNodes = [];
        this.wins = 0;
        this.visits = 0;
        this.move = move;
        this.player = player;
    }
    ucb(): number {
        if (this.visits != 0) {
            return this.wins / this.visits + Math.sqrt(2 * Math.log(this.parent.visits) / this.visits);
        }
        return Number.MAX_VALUE;
    }
    selection(): Node {
        return this.childNodes.reduce((prev, current) => (prev.ucb() > current.ucb()) ? prev : current);
    }

    update(result: number): void {
        this.wins += result;
        this.visits += 1;
    }
}

function selectRandom(arr: number[]): number {
    return arr[Math.floor(Math.random() * arr.length)];
}

import { Bot } from "../shared/bot";

export class McstBot implements Bot {
    constructor(COLUMN: number, ROW: number, LINE: number, timeout: number) {

    }
    public playerMove(col: number): void {
        //throw new Error("Method not implemented.");
    }
    public makeMove(): number {
        return 0;
        //throw new Error("Method not implemented.");
    }
}

export class Node {
    state: Connect4;
    parent: Node;
    move: any;
    untriedMoves: number[];
    childNodes: Node[];
    wins: number;
    visits: number;
    player: number;

    constructor(move: number, parent: Node, state: Connect4) {
        this.state = state.clone();
        this.parent = parent;
        this.move = move;
        this.untriedMoves = state.getMoves();
        this.childNodes = [];
        this.wins = 0;
        this.visits = 0;
        this.player = state.player;
    }
    ucb(): number {
        return this.wins / this.visits + Math.sqrt(2 * Math.log(this.visits) / this.visits);
    }
    selection(): Node {
        return this.childNodes.sort((a: Node, b: Node) => a.ucb() - b.ucb())[0];
    }

    expand(move, state) {
        let child = new Node(this.move, this, state);
        this.untriedMoves = this.untriedMoves.filter(m => m !== move);
        this.childNodes.push(child);
        return child;
    }

    update(result) {
        this.wins += result;
        this.visits += 1;
    }
}
function MCTS(currentState: Connect4, itermax: number, currentNode: Node, timeout: number = 100): [Node, number] {

    let rootnode = new Node(null, null, currentState);
    if (currentNode !== null) {
        rootnode = currentNode;
    }

    let start = new Date().getTime();
    let performedIterations: number;
    for (let i = 0; i < itermax; i++) {
        let node = rootnode;
        let state: Connect4 = currentState.clone();

        //selection
        while (node.untriedMoves == [] && node.childNodes != []) {
            node = node.selection();
            state.move(node.move);
        }
        //expand
        if (node.untriedMoves != []) {
            let move = selectRandom(node.untriedMoves);
            node.untriedMoves = node.untriedMoves.filter(m => m === move);
            state.move(move);
            node = node.expand(move, state);
        }
        //rollout
        while (state.getMoves()) {
            state.move(selectRandom(state.getMoves()));
        }
        //backpropagate

        while (node !== null) {
            node.update(state.result(node.player))
            node = node.parent;
        }

        performedIterations = i;
        let duration = new Date().getTime() - start;
        if (duration > timeout) {
            break;
        }
    }

    let foo = (x: Node) => x.wins / x.visits;
    let sortedChildNodes = this.rootnode.childNodes.sort((a: Node, b: Node) => foo(a) - foo(b))[0];
    console.log("AI\'s computed winning percentages");
    for (let node of sortedChildNodes) {
        console.log(`Move: ${node.move}  Win Rate: ${Math.round(foo(node) * 10000) / 100}`);

    }
    console.log(`Simulations performed: ${performedIterations}\n`);
    return [rootnode, sortedChildNodes[0].move];
}

function selectRandom(arr: number[]): number {
    return arr[Math.floor(Math.random() * arr.length)];
}

class Connect4 {
    bitboard: number[];
    dirs: number[];
    heights: number[];
    lowestRow: number[];
    board: number[][];
    topRow: number[];
    ROW: number;
    COLUMN: number;
    LINE: number;
    player: number;

    constructor(ROW, COLUMN, LINE) {
        this.bitboard = [0, 0];
        this.dirs = [1, (ROW + 1), (ROW + 1) - 1, (ROW + 1) + 1];
        this.heights = new Array(COLUMN).filter(ROW + 1);
        this.lowestRow = new Array(COLUMN).fill(0);
        this.board = new Array(ROW).fill(0).map(() => Array(COLUMN).fill(0));
        let i = 1;
        this.topRow = new Array(COLUMN).fill(i => { i * (ROW + 1); i++ });
        this.ROW = ROW;
        this.COLUMN = COLUMN;
        this.LINE = LINE;
        this.player = 1;
    }

    clone(): Connect4 {
        let clone = new Connect4(this.ROW, this.COLUMN, this.LINE)
        clone.bitboard = JSON.parse(JSON.stringify(this.bitboard));
        clone.heights = JSON.parse(JSON.stringify(this.heights));
        clone.lowestRow = JSON.parse(JSON.stringify(this.lowestRow));
        clone.board = JSON.parse(JSON.stringify(this.board));
        clone.topRow = JSON.parse(JSON.stringify(this.topRow));
        clone.player = this.player;
        return clone;
    }

    move(col: number) {
        let m2 = 1 << this.heights[col];
        this.heights[col] += 1;
        this.player ^= 1;
        this.bitboard[this.player] ^= m2;
        this.board[this.lowestRow[col]][col] = this.player + 1;
        this.lowestRow[col] += 1;

    }

    result(player: number): number {
        if (this.winner(player)) return 1;
        if (this.winner(player ^ 1)) return 0;
        if (this.draw()) return 0.5
    }

    //checks if column is full
    isValidMove(col): boolean {
        return this.heights[col] != this.topRow[col]
    }

    //evaluate board, find out if there's a winner
    winner(color: number) {
        for (let d of this.dirs) {
            let bb = this.bitboard[color];
            for (let i = 1; i < this.LINE; i++)
                bb &= this.bitboard[color] >> (i * d);
            if (bb != 0) return true;
        }
        return false;
    }

    printBoard() {
        //let board = np.flip(self.board, axis = 0)
        // for row in board:
        //     sys.stdout.write('\t')
        // for col in row:
        //     output = '-OX'[col];
        //     console.log(output);
        //     console.log('\n');
        //     console.log('\t');
        // for (let i = 0; i < this.COLUMN; i++) {
        //     console.log(i + 1);
        // }
        // console.log('\n\n');
    }

    draw(): boolean {
        return this.getMoves().length == 0 && !this.winner(this.player) && !this.winner(this.player ^ 1);
    }

    complete() {
        return this.winner(this.player) || this.winner(this.player ^ 1) || this.getMoves().length == 0;
    }

    getMoves(): number[] {
        if (this.winner(this.player) || this.winner(this.player ^ 1)) {
            return [];
        }

        let listMoves = [];
        for (let i = 0; i < this.COLUMN; i++) {
            if (this.lowestRow[i] < this.ROW) {
                listMoves.push(i);
            }
        }
        return listMoves;
    }
}

// function begin_game(board, order = 0, itermax = 20000, timeout = 2) {
//     let players = ['Human', 'AI']
//     let node = new Node(null, null, board);
//     while (true) {

//         if order == 0: col = get_input(board)
//         elif order == 1:
//         print('AI\'s thinking...')
//         start = time.clock()
//         let [playedNode, col] = MCTS(board, itermax, node, timeout);
//         timeout = time.clock() - start
//         print('AI played column %s\n' % (col + 1))
//         board.move(col)
//         board.print_board();
//         playedNode = gotoChildNode(playedNode, board, col);
//         order ^= 1;
//         if (board.complete()) {
//             break;
//         }
//     }
//     if (board.draw()) {
//         print('%s won' % players[board.player]);
//     }
//     else {
//         console.log('Draw');
//     }


// }
// function gotoChildNode(node: Node, board: Connect4, move: number) {
//     for (let childnode of node.childNodes) {
//         if (childnode.move == move)
//             return childnode;
//         return new Node(null, null, board);
//     }
// }
// const oROW = 6;
// const oCOLUMN = 7;
// const oLINE = 4;
// const AIstarts = 0;
// //console.log("\n%s-IN-A-ROW (Size: %s by %s)\n" % (oLINE, oROW, oCOLUMN))
// let c4 = new Connect4(oROW, oCOLUMN, oLINE);
// //c4.print_board();

// const max_iters = 10000
// const timeout = 3
// begin_game(c4, AIstarts, max_iters, timeout);
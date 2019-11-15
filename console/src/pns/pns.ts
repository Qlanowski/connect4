import { Bot } from "../shared/bot";
import { Player } from '../shared/player';
import { Board } from "../shared/board";
import { Result } from "../shared/result";
import { PNnode } from "./pn-node";
import { PNtype } from "./pn-node";
import { new_pn_node } from "./pn-node";

//let PN_SEARCH_SIZE_LIMIT_ = 50000;

export class PnsBot implements Bot {
    //Bot is Player 1(X)
    private currentBoard: Board;
    private root: PNnode;
    private timeout: number;
    private moveNumber: number;


    constructor(columns: number, rows: number, inRow: number, timeout: number) {
        this.timeout = timeout;
        let boardArr: Player[][] = new Array(columns).fill(0).map(() => Array(rows).fill(Player.None));
        let heights: number[] = new Array(columns).fill(0);
        this.currentBoard = new Board(columns, rows, inRow, boardArr, heights);
        this.root = new PNnode();
        this.root.position = -1;
        this.moveNumber = 0;
        this.root.type = PNtype.OR
    }
    public playerMove(move: number): void {
        this.currentBoard.move(move, Player.Player0);
        this.moveNumber++;

    }
    public makeMove(): number {

        if(this.moveNumber == 0){
            let nextMove = Math.floor(this.currentBoard.columns/2);
            this.currentBoard.move(nextMove, Player.Player1);
            return nextMove;
        }  
        
        this.root = new_pn_node(-1, PNtype.OR, 1, 1);
        this.root.board = this.currentBoard.clone();

        this.search();

        let nextMove: number = this.select_next_move();
        this.currentBoard.move(nextMove, Player.Player1);
        // for(let child of this.root.children)
        // {
            
        //     console.log("child move: " + child.position + " proof " + child.proof + " disproof " + child.disproof + " "+child.board.getResult());

        // }
        return nextMove;         
    }

    // starts developing the tree

    search() {
        this.select_most_proving();
        this.develop_node(this.root);
        this.root.update_ancestors();
        if (this.root.children.length == 1) {
            return;
        }
        let start = new Date().getTime();
        while (this.root.proof != 0 && this.root.disproof != 0 && new Date().getTime() - start < this.timeout) {

            let mostProvingNode = this.select_most_proving();
            this.develop_node(mostProvingNode);
            mostProvingNode.update_ancestors();
        }
    }
    develop_node(node: PNnode) {

        let allowedMoves = node.board.allowedMoves();

        for(let move of allowedMoves){
            node.add_child(move, node.type == PNtype.OR ? PNtype.AND : PNtype.OR, 1, 1);
        }

        for(let i=0; i<node.children.length; i++){
            let result = node.children[i].board.getResult();
            if(result == Result.WonPlayer0 || result == Result.Draw){
                    node.children[i].proof = Number.MAX_VALUE;
                    node.children[i].disproof = 0;                         
            }
            else if(result == Result.WonPlayer1)
            {
                node.children[i].disproof = Number.MAX_VALUE;
                node.children[i].proof = 0;     
                
            }
        }   

    }
    

    select_most_proving(): PNnode {
        let selected_node = this.root;
    
        while (selected_node.children.length > 0) { // go deeper the DAG until a leaf node is reached
            let i = 0;
    
            if (selected_node.type == PNtype.OR){
                while (selected_node.child(i).proof != selected_node.proof) ++i;
            }
            else if (selected_node.type == PNtype.AND){
                while (selected_node.child(i).disproof != selected_node.disproof) ++i;
            }
            selected_node = selected_node.child(i);
        }
        return selected_node;
    }

    public printBoard(): void {
        console.log("PN Current Position:");
        for (let y = this.currentBoard.rows - 1; y >= 0; y--) {
            for (let x = 0; x < this.currentBoard.columns; x++) {
                switch (this.currentBoard.board[x][y]) {
                    case Player.None:
                        process.stdout.write("-");
                        break;
                    case Player.Player0:
                        process.stdout.write("O");
                        break;
                    case Player.Player1:
                        process.stdout.write("X");
                        break;
                }
            }
            process.stdout.write("\n");
        }
        for (let x = 0; x < this.currentBoard.columns; x++) {
            process.stdout.write(x.toString());
        }
        console.log("\n");
    }
    
    select_next_move(): number {

        if (this.root.proof == 0) { // if value == TRUE, select the proving children
            let i = 0;
            while (this.root.child(i).proof != 0) ++i;
            return this.root.child(i).position;
        }
        else if (this.root.disproof == 0) { // if value == FALSE, select the most developed node
            let best_node = this.root.child(0);
            for (let i = 1; i < this.root.children.length; ++i) {
                if (best_node.subtree_size < this.root.child(i).subtree_size)
                    best_node = this.root.child(i);
            }
            return best_node.position;
        }
        else { // else select the most proving node
            let best_node = this.root.child(0);
            let best_ratio: number = this.root.child(0).proof / this.root.child(0).disproof;

            for (let i = 1; i < this.root.children.length; ++i) {
                let new_ratio = this.root.child(i).proof / this.root.child(i).disproof;
                if (best_ratio > new_ratio) {
                    best_node = this.root.child(i);
                    best_ratio = new_ratio;
                }
            }
            return best_node.position;
        }
    }

    
}
import { Board } from "../shared/board";
import { Player } from '../shared/player';

export enum PNtype { OR, AND };

export function new_pn_node(pos: number, type: PNtype, proof: number, disproof: number): PNnode{
    let node: PNnode = new PNnode();
    node.position = pos;
    node.type = type;
    node.proof = proof;
    node.disproof = disproof;
    node.children = new Array();
    return node;
} 

function new_pn_node2(pos: number, type: PNtype, proof: number, disproof: number, parent: PNnode): PNnode{
    let node: PNnode = new_pn_node(pos, type, proof, disproof);
    node.parent = parent;
    return node;
} 

export class PNnode {

      
    constructor(){
        this.proof = 1;
        this.disproof = 1;
        this.subtree_size = 1;
    }

    update_ancestors() {
        this.set_proof_and_disproof();
        if(this.parent != null){
            this.parent.update_ancestors();       
        }
    }

    
    set_proof_and_disproof() {
        if (this.children.length == 0) { // treat draw as a loss
            if(this.type == PNtype.AND)
            {
                this.proof = 0; 
                this.disproof = Number.MAX_VALUE;
            }
            else if(this.type == PNtype.OR)
            {
                this.proof = Number.MAX_VALUE;
                this.disproof = 0;
            }
            return;
        }

        this.subtree_size = this.sum_subtree_sizes();
        if(this.type == PNtype.AND)
        {
            this.proof = this.sum_children_proof();
            this.disproof = this.min_children_disproof();
        }
        else if(this.type == PNtype.OR)
        {
            this.proof = this.min_children_proof();
            this.disproof = this.sum_children_disproof();
        }

    }
    
    add_child(pos: number, type: PNtype, proof: number, disproof: number) { 
        let node: PNnode = new_pn_node2(pos,type,proof,disproof,this);
        node.board = this.board.clone();
        node.board.move(pos,type == PNtype.OR ? Player.Player0 : Player.Player1);
        this.children.push(node); 
    }
    child(index: number): PNnode { return this.children[index]; }

    sum_subtree_sizes(): number{
        let sum: number = 0;
        for(let child of this.children){
            sum += child.subtree_size;
        }       
        return sum;
    }
    sum_children_proof(): number{
        let sum: number = 0;
        for (let child of this.children) {
            if (child.proof == Number.MAX_VALUE)
                return Number.MAX_VALUE;
            sum += child.proof;
        }
        return sum;
    }
    sum_children_disproof(): number{
        let sum: number = 0;
        for (let child of this.children) {
            if (child.disproof == Number.MAX_VALUE)
                return Number.MAX_VALUE;
            sum += child.disproof;
        }

        return sum;
    }
    min_children_proof(): number{
        let min: number = Number.MAX_VALUE;
        for (let child of this.children) {
            if (min > child.proof)
                min = child.proof;
        }        
        return min;
    }
    min_children_disproof(): number{
        let min = Number.MAX_VALUE;
        for (let child of this.children) {
            if (min > child.disproof)
                min = child.disproof;
        }
        return min;
    }


    public proof: number;
    public disproof: number;
    public position: number;
    public type: PNtype;
    public subtree_size: number;
    public children: PNnode[];
    public parent: PNnode;
    public board: Board;
    
    };

import Card from "./card";

export default class Player {
    name: string;
    hand: Card[];
    balance: number;
    isTable: boolean;


    constructor(name: string, balance: number = 0, isTable: boolean = false) {
        this.name = name;
        this.hand = [];
        this.balance = balance;
        this.isTable = isTable;
    }
}
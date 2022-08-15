import Card from "./card";

export default class Deck {
    
    cards: Card[];
    constructor() {
        this.cards = [];
        const figures = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        const nipes = [
            'clubs', //paus 
            'diamonds', //ouros 
            'hearts', //coração
            'spades' //espadas
        ];
        for (const figure of figures) {
            for (const nipe of nipes) {
                this.cards.push(new Card(figure, nipe));
            }
        }
    }
}
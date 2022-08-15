import Card from "./card";
import Deck from "./deck";
import Player from "./player";
import Round from "./round";

const SECURITY_FACTOR = 1

export default class Cassino{
    Decks: Deck[];

    players: Player[];
    table: Player;

    playedCards: Card[];
    cardsToCome: Card[];

    rounds: Round[];
    
    constructor(numberOfDecks: number, players: Player[]){
        this.Decks = [];
        this.playedCards = [];
        this.cardsToCome = [];
        this.rounds = [];
        for(let i = 0; i < numberOfDecks; i++){
            this.Decks.push(new Deck());
        }
        this.table = new Player("Table", 0, true);
        this.players = players;
        this.players.push(this.table);
    }

    start(rounds: number){
        if (this.cardsToCome.length === 0){
            this.shuffle();
        }
        for(let i = 0; i < rounds; i++){
            this.playRound();
        }
    }

    shuffle(){
        let cards = this.Decks.reduce((acc, deck) => {
            return acc.concat(deck.cards);
        }, <Card[]>[]);

        cards = cards.sort(() => Math.random() - 0.5);
        this.cardsToCome = cards;
        this.playedCards = [];
    }

    drawCard(){
        if (this.cardsToCome.length === 0) throw new Error("No cards to draw");
        let card = <Card>this.cardsToCome.shift();
        this.playedCards.push(card);
        return card;
    }
            

    playRound(){
        // validate if there are enough cards to play the round, if there are not, shuffle the deck
        if (this.cardsToCome.length <= this.players.length * 2 + this.players.length * SECURITY_FACTOR) 
            this.shuffle();
        // validate if all players have empty hands
        if (this.players.some(x => x.hand.length > 0)) throw new Error("Some players have cards");

        this.dealCards();
        this.askPlayersToPlay();
        let roundResult = this.calculateResults();
        this.calculatePlayerBalances(roundResult);
        this.showResult(roundResult);
        this.showPlayersBalances();
        this.showDecks();
        this.clearPlayersHands();
    }

    dealCards(){
        for (let j = 0; j < 2; j++) {
            for(let i = 0; i < this.players.length; i++){
                this.players[i].hand.push(this.drawCard());
            }
        }
    }

    askPlayersToPlay(){
        for(let i = 0; i < this.players.length; i++){
            let player = this.players[i];
            if (!player.isTable){
                while (player.hand.reduce((acc, card) => acc + card.value, 0) <= 11){
                    player.hand.push(this.drawCard());
                }
            } else {
                while (player.hand.reduce((acc, card) => acc + card.value, 0) < 17){
                    player.hand.push(this.drawCard());
                }
            }          
        }
    }

    calculatePlayerBalances(roundResults: Round){
        for(let i = 0; i < this.players.length; i++){
            let player = this.players[i];
            if (!player.isTable){
                let playerResult = roundResults.playersHands.find(x => x.player === player.name);
                if (!playerResult) throw new Error("Player not found");
                if (playerResult.winner && playerResult.blackjack){
                    player.balance += 15;
                }
                else if (playerResult.winner){
                    player.balance += 10;
                }
                else if (playerResult.draw){
                    // nada acontece
                }
                else {
                    player.balance -= 10;
                }
            }
        }
    }                

    calculateResults(): Round{
        let result = new Round(this.players)
        this.rounds.push(result);
        return result;
    }

    showResult(round: Round){
        console.log("Round results:");
        console.log(JSON.stringify(round,null,'\t'));
    }

    showPlayersBalances(){
        console.log("Players balances:");
        console.log(JSON.stringify(this.players.map(x => {return {name: x.name, balance: x.balance}}),null,'\t'));
    }

    clearPlayersHands(){
        this.players.forEach(x => x.hand = []);
    }

    showDecks(){
        console.log("Cards:");
        console.log(JSON.stringify(`cards to come: ${this.cardsToCome.length}`,null,'\t'));
        console.log(JSON.stringify(`played cards: ${this.playedCards.length}`,null,'\t'));
    }
}
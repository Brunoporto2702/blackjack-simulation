import Card from "./card";
import Player from "./player";

interface playersHands {
    hand: Card[];
    player: string;
    winner: boolean;
    draw: boolean;
    blackjack: boolean;
}

export default class Round {
    playersHands: playersHands[];

    constructor(players: Player[]) {
        let normalPlayers = players.filter(x => !x.isTable);
        let table = <Player>players.find(x => x.isTable);
        let tableResult = table.hand.reduce((acc, card) => acc + card.value, 0);

        this.playersHands = normalPlayers.map(player => {
            // verify if the player beat the table
            let winner = false;
            let playerResult = player.hand.reduce((acc, card) => acc + card.value, 0);
            if (tableResult > 21 && playerResult <= 21) winner = true;
            if (playerResult > tableResult && playerResult <= 21) winner = true;

            // verify if the player has a blackjack
            let blackjack = false;
            if (playerResult === 21) blackjack = true;

            // verify if the player has a draw
            let draw = false;
            if (!winner && playerResult === tableResult) draw = true;

            return {
                hand: player.hand,
                player: player.name,
                winner: winner,
                draw: draw,
                blackjack: blackjack
            }
        });

        this.playersHands.push({
            hand: table.hand,
            player: table.name,
            winner: false,
            draw: false,
            blackjack: false
        });
    }
}

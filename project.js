class Card {
    constructor(rank, suit) {
        this.rank = rank;
        this.suit = suit;
    }

    toString() {
        return `${this.rank} of ${this.suit}`;
    }
}

// deck.js
class Deck {
    constructor() {
        this.cards = [];
        this.initializeDeck();
        this.shuffle();
    }

    initializeDeck() {
        const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        const suits = ['hearts', 'diamonds', 'clubs', 'spades'];

        for (const suit of suits) {
            for (const rank of ranks) {
                this.cards.push(new Card(rank, suit));
            }
        }
    }

    shuffle() {
        // Implement shuffle logic (e.g., Fisher-Yates algorithm)
    }

    deal() {
        return this.cards.pop();
    }
}

// player.js
class Player {
    constructor(name) {
        this.name = name;
        this.hand = [];
        this.score = 0;
    }

    addCards(cards) {
        this.hand.push(...cards);
    }

    playCard() {
        return this.hand.pop();
    }

    incrementScore() {
        this.score += 1;
    }
}

// game.js
class Game {
    constructor() {
        this.player1 = new Player("Player 1");
        this.player2 = new Player("Player 2");
        this.deck = new Deck();
        this.dealCards();
    }

    dealCards() {
        while (this.deck.cards.length > 0) {
            this.player1.addCards([this.deck.deal()]);
            this.player2.addCards([this.deck.deal()]);
        }
    }

    playRound() {
        const card1 = this.player1.playCard();
        const card2 = this.player2.playCard();

        const roundWinner = this.determineRoundWinner(card1, card2);

        if (roundWinner === this.player1) {
            this.player1.incrementScore();
        } else if (roundWinner === this.player2) {
            this.player2.incrementScore();
        }
    }

    determineRoundWinner(card1, card2) {
        if (card1.rank > card2.rank) {
            return this.player1;
        } else if (card1.rank < card2.rank) {
            return this.player2;
        } else {
            return null; // It's a tie
        }
    }

    playGame() {
        while (this.player1.hand.length > 0 && this.player2.hand.length > 0) {
            this.playRound();
        }
    }

    determineWinner() {
        console.log(`Final Score - ${this.player1.name}: ${this.player1.score}, ${this.player2.name}: ${this.player2.score}`);
        if (this.player1.score > this.player2.score) {
            console.log(`${this.player1.name} wins the game!`);
        } else if (this.player1.score < this.player2.score) {
            console.log(`${this.player2.name} wins the game!`);
        } else {
            console.log("It's a tie!");
        }
    }
}

const warGame = new Game();
warGame.playGame();
warGame.determineWinner();
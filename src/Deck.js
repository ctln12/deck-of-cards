import React, { Component } from 'react';
import axios from "axios";
import Card from "./Card";

class Deck extends Component {
  constructor(props){
    super(props);
    this.state = { deckId: undefined, remainingCards: undefined, cards: [] };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount(){
    axios.get("https://deckofcardsapi.com/api/deck/new/shuffle")
      .then(response => {
        this.setState({ deckId: response.data.deck_id, remainingCards: response.data.remaining })
      })
  }
  handleClick(evt){
    axios.get(`https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/`)
      .then(response => {
        const card = { id: response.data.cards[0].code, imgUrl: response.data.cards[0].image, value: response.data.cards[0].value, suit: response.data.cards[0].suit };
        this.setState({...this.state, remainingCards: response.data.remaining, cards: [...this.state.cards, card] });
      })
  }
  render() {
    if (this.state.remainingCards === 0) { alert('Deck of cards is empty!') }
    return (
      <div className="Deck">
        <button onClick={this.handleClick} disabled={this.state.remainingCards === 0}>GIMME A CARD!</button>
        <div className="cards">
          {this.state.cards.map(card => <Card card={card} key={card.id} />)}
        </div>
      </div>
    );
  }
}

export { Deck };

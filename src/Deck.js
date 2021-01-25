import React, { Component } from 'react';
import axios from 'axios';
import Card from './Card';
import './Deck.css'

const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

class Deck extends Component {
  constructor(props){
    super(props);
    this.state = { deck: null, cards: [] };
    this.getCard = this.getCard.bind(this);
  }
  async componentDidMount(){
    let deck = await axios.get(`${API_BASE_URL}/new/shuffle`);
    this.setState({ deck: deck.data });
  }
  async getCard(evt){
    let deckId = this.state.deck.deck_id;
    try {
      let cardUrl = `${API_BASE_URL}/${deckId}/draw/`;
      let cardRes = await axios.get(cardUrl);
      if (!cardRes.data.success) {
        throw new Error("No cards remaining!");
      }
      let card = cardRes.data.cards[0];
      this.setState(st => ({
        cards: [
          ...st.cards,
          {
            id: card.code,
            imgUrl: card.image,
            name: `${card.value} of ${card.suit.toLowerCase()}`
          }
        ]
      }));
    } catch (error) {
      alert(error);
    }
  }
  render() {
    const cards = this.state.cards.map(card => <Card imgUrl={card.imgUrl} name={card.name} key={card.id} />);
    return (
      <div className="Deck">
        <h1>Card Dealer</h1>
        <button onClick={this.getCard}>GIMME A CARD!</button>
        <div className="cards">{cards}</div>
      </div>
    );
  }
}

export default Deck;

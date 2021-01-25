import React, { Component } from 'react';
import axios from "axios";

class Deck extends Component {
  constructor(props){
    super(props);
    this.state = { deckId: undefined }
  }
  componentDidMount(){
    axios.get("https://deckofcardsapi.com/api/deck/new/shuffle")
      .then(response => {
        this.setState({ deckId: response.data.deck_id })
      })
  }
  render() {
    return (
      <div className="Deck">
        Deck
      </div>
    );
  }
}

export { Deck };

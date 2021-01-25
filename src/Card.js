import React, { Component } from 'react';

class Card extends Component {
  render() {
    return (
      <div className="Card">
        <img src={this.props.card.imgUrl} alt={`${this.props.card.value} of ${this.props.card.suit.toLowerCase()}`} />
      </div>
    );
  }
}

export default Card;

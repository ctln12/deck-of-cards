import React, { Component } from 'react';

class Card extends Component {
  render() {
    const {imgUrl, name} = this.props;
    return <img className="Card" src={imgUrl} alt={name} />;
  }
}

export default Card;

import React from 'react';
import PropTypes from 'prop-types';

const foodILike = [
  {
    id:1,
    name: "cake",
    image: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
    rating: 4.5
  },
  {
    id:2,
    name: "icecream",
    image: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
    rating: 4.3
  },
  {
    id:3,
    name: "chicken",
    image: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
    rating: 5.0
  },
]

function Food({name, picture, rating}){
  return <div>
    <h2>I like {name}</h2>
    <h4>{rating}/5.0</h4>
    <img src={picture} alt={name}/>
  </div>
}

Food.propTypes = {
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired
}

function App() {
  return (
    <div>
      {foodILike.map(dish => (
        <Food key={dish.id} name={dish.name} picture={dish.image} rating={dish.rating}/>
      ))}
    </div>
  );
}

export default App;

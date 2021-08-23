import React from 'react';

function Food({name, picture}){
  return <div>
    <h2>I like {name}</h2>
    <img src={picture} />
  </div>
}

const foodILike = [
  {
    name: "cake",
    image: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
  },
  {
    name: "icecream",
    image: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
  },
  {
    name: "chicken",
    image: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
  },
]

function App() {
  return (
    <div>
      {foodILike.map(kind => (
        <Food name={kind.name} picture={kind.image}/>
      ))}
    </div>
  );
}

export default App;

import React, { Component } from 'react';
import firebase from '../firebase';
import '../styles/App.css';

function toArray(firebaseObject) {
  let array = []
  for (let item in firebaseObject) {
    array.push({ ...firebaseObject[item], key: item })
  }
  return array;
}

class App extends Component {

  /**
   * annonser is an array of objects, this array is filled
   * when initial fetch is fullfilled, until then it's an
   * empty array
   */
  state = {
    annonser: [],
    favorites: [],
  }

  /**
   * componentDidMount runs when app starts, when page loads,
   * built in function in react. This functions calls the
   * function that fetches ads on load
   */
  componentDidMount() {
    this.getAnnonser();
    this.listenForFavorites();
  }

  listenForFavorites = () => {
    firebase
      .database()
      .ref('/favorites') // Listen for path /favorites only
      .on('value', (snapshot) => {
        const favorites = toArray(snapshot.val()); // .val() == .json()
        this.setState({ favorites: favorites });
      }) // Each time ANY value changes
  }

  /**
   * Regular fetch, but instead of saving to global variable, set
   * the fetched data in state. The ads are nested inside of
   * nested objects (matchningslista.matchningdata)
   */
  getAnnonser = () => {
    fetch('http://api.arbetsformedlingen.se/af/v0/platsannonser/matchning?lanid=1&yrkesomradeid=3&antalrader=30')
      .then(response => response.json())
      .then((annonser) => {
        this.setState({ annonser: annonser.matchningslista.matchningdata });
      });
  }

  pushOneAnnons = (favorit) => {
    firebase
      .database()
      .ref('/favorites')
      .push(favorit);
  }

  render() {
    const { annonser, favorites } = this.state;
    const listOfAnnonser = annonser.map(annons => (
      <div key={annons.annonsid}>
        <p>
          { annons.annonsrubrik }
        </p>
        <button type="button" onClick={() => this.pushOneAnnons(annons)}>
          Logga annons
        </button>
      </div>
    ));

    const listenForFavorites = favorites.map(fav => (
      <p> { fav.annonsrubrik } </p>
    ))

    return (
      <div>
        <h1>Favvisar</h1>
        { listenForFavorites }
        <h1>Annat skit</h1>
        { listOfAnnonser }
      </div>
    );
  }
}

export default App;




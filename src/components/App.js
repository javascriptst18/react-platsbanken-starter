import React, { Component } from 'react';
import firebase, { favorites, googleProvider } from '../firebase';
import '../styles/normalize.css';
import '../styles/App.css';

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
    favorites // Listen for path /favorites only
      .on('child_added', (snapshot) => {
        // Clone the original state
        const updatedFavorites = [...this.state.favorites];
        // Push the new value into the cloned array
        updatedFavorites.push(snapshot.val());
        // Replace array in state
        this.setState({ favorites: updatedFavorites });
      }) // Each time child is added
    
    favorites // Listen for path /favorites only
      .on('child_removed', (snapshot) => {
        // Snapshot is the removed annons, save to variable
        const removedAnnons = snapshot.val();
        // Filter only the one item to be removed
        const filteredFavorites = this.state.favorites.filter(item => {
          return item.annonsid !== removedAnnons.annonsid;
        });
        // Replace state
        this.setState({ favorites: filteredFavorites });
      }) // Each time child is removed

    favorites // Listen for path /favorites only
      .on('child_changed', (snapshot) => {
        const changedAnnons = snapshot.val();
        // Same as filter
        const changedFavorites = this.state.favorites.map(item => {
          if(item.annonsid === changedAnnons.annonsid){
            // But return the snapshot instead of the original value
            return changedAnnons;
          }
          // If no match, return the original value
          return item;
        })
        this.setState({ favorites: changedFavorites });
      }) // Each time child is changed
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
      .ref(`/favorites/${favorit.annonsid}`)
      .set(favorit);
  }

  removeOneAnnons = (favorit) => {
    firebase
      .database()
      .ref(`/favorites/${favorit.annonsid}`)
      .remove();
  }

  login = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
  }

  render() {
    const { annonser, favorites } = this.state;
    const listOfAnnonser = annonser.map(annons => (
      <div key={annons.annonsid} className="annons">
        <p>
          { annons.annonsrubrik }
        </p>
        <button type="button" onClick={() => this.pushOneAnnons(annons)}>
          Fav
        </button>
      </div>
    ));

    const listOfFavorites = favorites.map(fav => (
      <div className="annons"> 
        <p>{ fav.annonsrubrik }</p>
        <button onClick={() => this.removeOneAnnons(fav) }>Unfav</button>
       </div>
    ))

    return (
      <div>
        <button onClick={this.login}>
          Google Login
        </button>
        <section className="favorite-section">
          <h1>Favoriter</h1>
          { listOfFavorites }
        </section>
        <section className="annons-section">
          <h1>Annonser</h1>
          { listOfAnnonser }
        </section>
      </div>
    );
  }
}

export default App;




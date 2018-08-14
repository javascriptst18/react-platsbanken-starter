import React, { Component } from 'react';
import '../styles/App.css';

class App extends Component {
  /**
   * annonser is an array of objects, this array is filled
   * when initial fetch is fullfilled, until then it's an
   * empty array
   */
  state = {
    annonser: [],
    antalrader: 10,
    lanid: 1,
    yrkesomradeid: 3,
    nyckelord: '',
  }

  /**
   * componentDidMount runs when app starts, when page loads,
   * built in function in react. This functions calls the
   * function that fetches ads on load
   */
  componentDidMount() {
    this.getAnnonser();
  }

  /**
   * Regular fetch, but instead of saving to global variable, set
   * the fetched data in state. The ads are nested inside of
   * nested objects (matchningslista.matchningdata)
   */
  getAnnonser = () => {
    fetch(`http://api.arbetsformedlingen.se/af/v0/platsannonser/matchning?lanid=${this.state.lanid}&yrkesomradeid=${this.state.yrkesomradeid}&antalrader=${this.state.antalrader}&nyckelord=${this.state.nyckelord}`)
      .then(response => response.json())
      .then((annonser) => {
        this.setState({ annonser: annonser.matchningslista.matchningdata });
      });
  }

  getOneAnnons = (annons) => {
    console.log(annons);
  }

  changeAntalRader = (event) => {
    this.setState({ antalrader: event.target.value }, () => {
      this.getAnnonser();
    });
  }

  changeLanid = (event) => {
    this.setState({ lanid: event.target.value }, () => {
      this.getAnnonser();
    });
  }

  changeNyckelord = (event) => {
    this.setState({ nyckelord: event.target.value }, () => {
      this.getAnnonser();
    });
  }

  render() {
    /**
     * Create an array of JSX-elements with the headline
     * of each ad. Map or loop through the ads in state and
     * create a new array, then render the array. airbnb
     * demands that we destructure the data on line 42:
     * https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
     *
     * key is needed on every created list item:
     * https://reactjs.org/docs/lists-and-keys.html
     *
     * We need an anonymous callback function that wraps
     * the 'onClick' if we need to send an argument to the
     * function:
     * https://reactjs.org/docs/handling-events.html#passing-arguments-to-event-handlers
     * If we didn't send an argument we could write 'this.getOneAnnons'
     */
    const {
      annonser, antalrader, lanid, nyckelord,
    } = this.state;
    const listOfAnnonser = annonser.map(annons => (
      <div key={annons.annonsid}>
        <p>
          { annons.annonsrubrik }
        </p>
        <button type="button" onClick={() => this.getOneAnnons(annons)}>
          Logga annons
        </button>
      </div>
    ));

    return (
      <div>
        <input type="text" onChange={this.changeNyckelord} value={nyckelord} />
        <select onChange={this.changeAntalRader} value={antalrader}>
          <option value="10">
            10
          </option>
          <option value="20">
            20
          </option>
        </select>
        <select onChange={this.changeLanid} value={lanid}>
          <option value="1">
            Stockholm
          </option>
          <option value="2">
            Whatever
          </option>
          <option value="3">
            Uppsala
          </option>
        </select>
        { listOfAnnonser }
      </div>
    );
  }
}

export default App;

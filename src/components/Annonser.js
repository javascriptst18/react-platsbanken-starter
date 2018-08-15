import React, { Component } from 'react';

class Annonser extends Component {
  /**
   * annonser is an array of objects, this array is filled
   * when initial fetch is fullfilled, until then it's an
   * empty array
   */
  state = {
    annonser: [],
    antalrader: 10,
    lanid: this.props.match.params.lanid || 1,
    yrkesomradeid: 3,
    nyckelord: '',
    yrkesomraden: [],
  }

  /**
   * componentDidMount runs when app starts, when page loads,
   * built in function in react. This functions calls the
   * function that fetches ads on load
   */
  componentDidMount() {
    if(this.props.location.search){
      this.checkforQueryParams();
    } else {
      this.getAnnonser();
    }
    this.getYrkesomraden();
  }

  checkforQueryParams = () => {
    /**
     * Everything after '?' is stored in this.props.location.search
     * to remove the question mark we can use substring to start on index 1 
     * and skip the first char in the string. Every parameter is separated with
     * '&' so we can use split to create an array of every value
     */
    const queryParams = this.props.location.search.substring(1).split('&');
    // Split will create an array that we need to loop, we need to split once more
    for(let query of queryParams){
        /**
         * When we split we can use destructuring to immediatly name
         * index 0 and index 1 to key and value
         */
        const [ key, value ] = query.split('=');
        this.setState({ [key] : parseInt(value, 10) }, this.getAnnonser);
    }
  }

  /**
   * Regular fetch, but instead of saving to global variable, set
   * the fetched data in state. The ads are nested inside of
   * nested objects (matchningslista.matchningdata)
   */
  getAnnonser = () => {
    fetch(`http://api.arbetsformedlingen.se/af/v0/platsannonser/matchning?lanid=${this.state.lanid}&yrkesomradeid=${this.state.yrkesomradeid}&antalrader=${this.state.antalrader}`)
      .then(response => response.json())
      .then((annonser) => {
        this.setState({ annonser: annonser.matchningslista.matchningdata });
      });
  }

  getYrkesomraden = () => {
    fetch('http://api.arbetsformedlingen.se/af/v0/platsannonser/soklista/yrkesomraden')
      .then(response => response.json())
      .then((yrkesomraden) => {
        this.setState({ yrkesomraden: yrkesomraden.soklista.sokdata });
      });
  }

  handleChange = (event) => {
    // <input name="email" onChange={this.handleChange} value={this.state.email} />
    this.setState({ [event.target.name]: event.target.value }, this.updateURL);
  }

  search = () => {
    this.getAnnonser();
  }

  updateURL = () => {
    let queryParams = `?`;
    queryParams += `lanid=${this.state.lanid}`;
    queryParams += `&yrkesomradeid=${this.state.yrkesomradeid}`;
    if(this.state.nyckelord){
      queryParams += `&nyckelord=${this.state.nyckelord}`;
    }
    this.props.history.push(queryParams);
  }

  createDropdown = (yrkesomraden) => {
    return yrkesomraden.map(yrkesomrade => (
      <option key={yrkesomrade.id} value={yrkesomrade.id}>
        {yrkesomrade.namn}
      </option>
    ));
  }

  createListOfAnnonser = (annonser) => {
    return annonser.map(annons => (
      <div key={annons.annonsid}>
        <p>
          {annons.annonsrubrik}
        </p>
      </div>
    ));
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
    const { annonser, antalrader, lanid, nyckelord, yrkesomradeid, yrkesomraden } = this.state;
    const listOfAnnonser = this.createListOfAnnonser(annonser);

    return (
      <div>
        <input type="text" name="nyckelord" onChange={this.handleChange} value={nyckelord} placeholder="Sök nyckelord" />
        <select name="antalrader" onChange={this.handleChange} value={antalrader}>
          <option value="10">
            10
          </option>
          <option value="20">
            20
          </option>
        </select>
        <select name="lanid" onChange={this.handleChange} value={lanid}>
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
        <select name="yrkesomradeid" onChange={this.handleChange} value={yrkesomradeid}>
          {this.createDropdown(yrkesomraden)}
        </select>
        <button onClick={this.search}>Search</button>
        {listOfAnnonser}
      </div>
    );
  }
}

export default Annonser;

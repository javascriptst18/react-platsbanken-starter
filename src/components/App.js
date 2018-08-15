import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Annonser from './Annonser';
import '../styles/App.css';

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <Link to="/"> Home</Link>
          <Link to="/about"> About </Link>
          <Link to="/annonser"> Annonser </Link>
        </nav>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/annonser" component={Annonser} />
        <Route path="/:namn" component={About} />
        <Route component={Home} />
      </div>
    </BrowserRouter>
  )
}

function About(props) {
  console.log(props.location);
  return <h1> About! </h1>;
}

function Home(){
  return <h1>Tjena från home</h1>
}

export default App;

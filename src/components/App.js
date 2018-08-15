import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Annonser from './Annonser';
import Heading from './Heading';
import '../styles/App.css';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Heading> Hello! </Heading>
        <nav>
          <Link to="/"> Home</Link>
          <Link to="/about"> About </Link>
          <Link to="/annonser"> Annonser </Link>
          <Link to="/lan/1"> Stockholm </Link>
        </nav>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/annonser" component={Annonser} />
          <Route path="/lan/:lanid" component={Annonser} />
          <Route path="/yrkesomrade/:yrkesomradeid" component={Annonser} />
          <Route component={Home} />
        </Switch>
        <footer>
          <nav>
            <Link to="/"> Home</Link>
            <Link to="/about"> About </Link>
            <Link to="/annonser"> Annonser </Link>
          </nav>
        </footer>
      </div>
    </BrowserRouter>
  )
}

function About(props) {
  return <h1> About! </h1>;
}

function Home(){
  return <h1> Tjena från home </h1>
}

export default App;

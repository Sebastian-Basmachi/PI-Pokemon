import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPage';
import NavBar from './Components/NavBar/NavBar.jsx';
import Home from './Components/Home/Home';
import Detail from './Components/Detail/Detail';
import PokemonCreator from './Components/PokemonCreator/PokemonCreator';
import Search from './Components/Search/Search';
import Congratulation from './Components/Congratulation/Congratulation';

function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <NavBar/> 
      </Switch>
        <Route path='/pokemons' component={Home}/> 
        <Route path='/pokemon_detail/:idPokemon' component={Detail}/> 
        <Route path='/pokemon_creator' component={PokemonCreator}/> 
        {/* <Route path='/congratulation' component={Congratulation}/>  */}
        <Route path='/pokemon_search' component={Search}/>
    </React.Fragment>
  );
}

export default App;

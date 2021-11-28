import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import {Landing} from './components/Landing/Landing';
import PokemonDetalis from './components/PokemonDetails/PokemonDetails';
import CreatePokemon from './components/CreatePokemon/CreatePokemon';
import NavBar from './components/NavBar/NavBar';
import Favorites from './components/Favorites/Favorites';
import SearchResults from './components/SearchResults/SearchResults';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/pokemons/*" element={<NavBar />} />
      </Routes>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/pokemons" element={<Home />} />
        <Route path="/pokemons/:id" element={<PokemonDetalis />} />
        <Route path="/pokemons/create" element={<CreatePokemon />} />
        <Route path="/pokemons/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
}

export default App;
